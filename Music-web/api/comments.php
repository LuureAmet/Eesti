<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$songsDir = __DIR__ . '/../public/data/';
if (!is_dir($songsDir)) {
    mkdir($songsDir, 0755, true);
}

$songId = $_GET['song'] ?? 'default';
$songId = preg_replace('/[^a-zA-Z0-9_-]/', '', $songId);
$songFile = $songsDir . $songId . '.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($songFile)) {
        echo file_get_contents($songFile);
    } else {
        echo json_encode(['sections' => [], 'comments' => []]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid payload']);
        exit;
    }

    $default = ['sections' => [], 'comments' => []];
    $fp = fopen($songFile, 'c+');
    if (!$fp) {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to open storage']);
        exit;
    }

    flock($fp, LOCK_EX);
    $currentSize = filesize($songFile);
    $raw = $currentSize > 0 ? fread($fp, $currentSize) : '';
    $current = json_decode($raw, true);
    if (!is_array($current)) {
        $current = $default;
    }

    if (isset($data['sectionId'])) {
        $sectionId = $data['sectionId'];
        $current['sections'] = array_map(function ($section) use ($sectionId, $data) {
            if (($section['id'] ?? null) !== $sectionId) {
                return $section;
            }

            $section['comments'] = $section['comments'] ?? [];

            if (isset($data['parentCommentId'])) {
                $section['comments'] = array_map(function ($comment) use ($data) {
                    if (($comment['id'] ?? null) !== $data['parentCommentId']) {
                        return $comment;
                    }

                    $comment['replies'] = $comment['replies'] ?? [];
                    $comment['replies'][] = [
                        'id' => uniqid('reply_', true),
                        'author' => $data['author'] ?? 'Anonymous',
                        'text' => $data['text'] ?? '',
                        'timestamp' => time(),
                    ];

                    return $comment;
                }, $section['comments']);
            } else {
                $section['comments'][] = [
                    'id' => uniqid('comment_', true),
                    'author' => $data['author'] ?? 'Anonymous',
                    'text' => $data['text'] ?? '',
                    'category' => $data['category'] ?? null,
                    'timestamp' => time(),
                    'replies' => [],
                ];
            }

            return $section;
        }, $current['sections']);
    } else {
        if (isset($data['parentCommentId'])) {
            $current['comments'] = array_map(function ($comment) use ($data) {
                if (($comment['id'] ?? null) !== $data['parentCommentId']) {
                    return $comment;
                }

                $comment['replies'] = $comment['replies'] ?? [];
                $comment['replies'][] = [
                    'id' => uniqid('reply_', true),
                    'author' => $data['author'] ?? 'Anonymous',
                    'text' => $data['text'] ?? '',
                    'timestamp' => time(),
                ];

                return $comment;
            }, $current['comments']);
        } else {
            $current['comments'][] = [
                'id' => uniqid('comment_', true),
                'author' => $data['author'] ?? 'Anonymous',
                'text' => $data['text'] ?? '',
                'timestamp' => time(),
                'replies' => [],
            ];
        }
    }

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($current, JSON_PRETTY_PRINT));
    flock($fp, LOCK_UN);
    fclose($fp);

    echo json_encode(['success' => true]);
    exit;
}

echo json_encode(['error' => 'Method not allowed']);
http_response_code(405);
