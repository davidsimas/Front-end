from main import db

class Usuarios(db.Model):
    nickname = db.Column(db.String(15), primary_key = True)
    nome = db.Column(db.String(30), nullable = False)
    senha = db.Column(db.String(30), nullable = False)

    def __repr__(self):
        return '<Name %r>' % self.name