from main import db

class Pessoas(db.Model):
    
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    nome = db.Column(db.String(25), nullable = False)
    idade = db.Column(db.String(3), nullable = False)
    altura = db.Column(db.String(5), nullable = False)

    def __repr__(self):
        return '<Name %r>' % self.name