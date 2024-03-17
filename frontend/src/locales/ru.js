const ru = {
  translation: {
    buttons: {
      channels: {
        send: 'Отправить',
        back: 'Отменить',
        remove: 'Удалить',
        rename: 'Переименовать',
      },
      chat: {
        add: '+',
        out: 'Выйти',
      },
    },
    messages: {
      counter: {
        count_zero: '{{count}} сообщений',
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    modals: {
      addTitle: 'Добавить канал',
      removeTitle: 'Удалить канал',
      removeBody: 'Уверены?',
      renameTitle: 'Переименовать канал',
      channelName: 'Имя канала',
    },
    text: {
      channels: 'Каналы',
      chatTitle: 'Hexlet Chat',
      errorPage: 'Страница не найдена!',
      signInFooterLink: 'Регистрация',
      signInFooterText: 'Нет аккаунта?',
    },
    signInForm: {
      username: 'Ваш ник',
      password: 'Пароль',
      title: 'Войти',
    },
    signUpForm: {
      title: 'Регистрация',
      signUp: 'Зарегистрироваться',
      password: 'Пароль',
      username: 'Имя пользователя',
      confirmPassword: 'Подтвердите пароль',
    },
    errors: {
      login: 'Неверные имя пользователя или пароль',
      required: 'Это обязательное поле',
      username: 'от 3 до 20 символов',
      password: 'Не менее 6 символов',
      confirmPassword: 'Пароли должны совпадать',
      network: 'Ошибка соединения',
      usernameRegistration: 'Пользователь уже существует',
      channelName: 'Должно быть уникальным',
    },
    toast: {
      channelAdd: 'Канал добавлен',
      channelRemove: 'Канал удален',
      channelRename: 'Канал переименован',
    },
  },
};

export default ru;
