

# encriptar o passwords do usuário
SECRET_KEY = 'moredevs'

#string conexao
SQLALCHEMY_DATABASE_URI = \
    '{SGBD}://{usuario}:{senha}@{servidor}/{database}'.format(
    SGBD = 'postgresql',
    usuario = "postgres",
    senha = "123456",
    servidor = "192.168.1.100:5432",
    database = "pessoas"
)