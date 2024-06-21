//permette di poter settare vari ambienti

import { env } from "./utility/env";

//enum è un modo per creare delle variabili che devono essere fisse
enum Environments {
  LOCAL = "local",
  DEV = "dev",
  PROD = "prod",
}

class Environment {
  private environment: String;

  constructor(environment: String) {
    this.environment = environment;
  }

  public getPort = (): Number => {
    if (this.environment === Environments.DEV) {
      return env.DEV_PORT;
    } else if (this.environment === Environments.PROD) {
      return env.PROD_PORT;
    } else {
      return env.LOCAL_PORT;
    }
  };

  public getDBName = (): String => {
    if (this.environment === Environments.DEV) {
      return env.DEV_DBNAME;
    } else if (this.environment === Environments.PROD) {
      return env.PROD_DBNAME;
    } else {
      return env.LOCAL_DBNAME;
    }
  };
}

export default new Environment(Environments.LOCAL);
