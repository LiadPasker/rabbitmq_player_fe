export default class RabbitInjectorSettings {
  private rabbitmq!: RabbitConn;
  private messages_settings!: MessageSettings;

  constructor() {
    this.rabbitmq = new RabbitConn();
    this.messages_settings = new MessageSettings();
  }

  get RabbitConnection() {
    return this.rabbitmq;
  }

  set RabbitConnection(rabbitConn) {
    this.rabbitmq = rabbitConn;
  }

  set MsgSettings(msgSettings) {
    this.messages_settings = msgSettings;
  }

  get MsgSettings() {
    return this.messages_settings;
  }
}

class RabbitConn {
  protocol: string = "amqp";
  host: string = "localhost";
  port: number = 5672;
  user: string = "";
  password: string = "";
  vhost: string = "/";
  locale: string = "en-US";
  exchanges: string[] = [];
  exchange_type: string = "topic";
  reconnect_timeout_ms: number = 5000;
  player_queue_name_prefix: string = "RabbitMQPlayer";
}

class MessageSettings {
  //src_file: string = "";
  msg_delimeter_accept_partial: boolean = true;
  msg_delimeter: string = "";
  parse_times: boolean = true;
  index_time_by_key: string = "";
  time_keys: string[] = [];
  speed_control: string = "*1";
  keys_to_exchange: object[] = [];
}
