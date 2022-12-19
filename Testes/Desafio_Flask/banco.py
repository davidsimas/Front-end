import psycopg2


try:
    conn = psycopg2.connect(host = "192.168.1.100",
                            port = "5432",
                        database = "pessoas", 
                            user = "postgres",
                        password = "123456")
    print("Você está conectado.")
except Exception:
    print("Você está sem conexão.")


if conn is not None:
    
    print("Sua Conexão está estabilizada.")

    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE pessoas (id serial,
                                          nome VARCHAR(25) NOT NULL,
                                         idade VARCHAR(3) NOT NULL,
                                        altura VARCHAR(5) NOT NULL,
                                       PRIMARY KEY(id));""")
    print("Sua tabela pessoas foi criada.")

    cursor.execute("""CREATE TABLE usuarios (nome VARCHAR(15) NOT NULL,
                                         nickname VARCHAR(30) NOT NULL,
                                            senha VARCHAR(30) NOT NULL,
                                          PRIMARY KEY(nickname));""")
    print("Sua tabela usuário foi criada.")

    conn.commit()
    cursor.close()
    conn.close()