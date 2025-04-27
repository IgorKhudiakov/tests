<?php 

class ChatNotificationManager {
    // function notify($message);
    public function notify($message) {
        // ...
    }
}

class ChatMessageRepository {
    // ...
    public function save($message) {
        // ...
    }
}

class ChatMessage {
    // Для текста я бы допустил значение null, для идентификатора чата - нет.
    // В дальнейшем скорее всего записи в базе без идентификатора никак
    // не использовались бы
    // private ?int $chatId;
    private int $chatId;
    private UserInterface $user;
    private string $text;

    // ...

    public function __construct($chatId, $user, $text) {
        // $this->chatId = $chatId;
        // $this->user = $user;
        // $this->text = $text;
        $message = (object) [
            'chatId' => $chatId,
            'user' => $user,
            'text' => $text
        ];
        $ChatNotificationManager = new ChatNotificationManager();
        $ChatNotificationManager->notify($message);
    }

    // ...
}

class Chat {
    public int $id;
    // Здесь не совсем понятно, что имеется ввиду,
    // так как, если мы прогоним все сообщения через
    // класс ChatMessage, мы отправим кучу уведомлений,
    // и будем делать это постоянно.
    // public ChatMessage[] $messages;
    // Если же имелось ввиду то, что сообщения нам надо получить, то
    // либо обращаемся отсюда к базе,
    // либо передаём данные в этот класс и обрабатываем здесь, например:
    public $chatMessages = array($messages);

    // ...

    public function addMessage($user, $text) {
        $message = new ChatMessage($this->id, $user, $text);
        $ChatMessageRepository = new ChatMessageRepository();
        $ChatMessageRepository->save($message);
    }

    // ...
}