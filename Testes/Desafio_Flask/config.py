

# encriptar o passwords do usuário
SECRET_KEY = 'moredevs'

#string conexao
SQLALCHEMY_DATABASE_URI = \
    '{SGBD}://{usuario}:{senha}@{servidor}/{database}'.format(
    SGBD = 'postgresql',
    usuario = "david",
    senha = "123456",
    servidor = "localhost:5433",
    database = "pessoas"
)