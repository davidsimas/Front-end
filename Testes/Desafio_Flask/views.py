from flask import render_template, request, redirect, session, flash, url_for
from main import app, db
from model.pessoas import Pessoas
from model.usuarios import Usuarios


@app.route("/")
def index():
    pessoa = Pessoas.query.order_by(Pessoas.id)

    return render_template("listar.html", titulo = "Pessoas", pessoas = pessoa)


@app.route("/novo")
def novo():
    if "usuario_logado" not in session or session["usuario_logado"] is None:
        return redirect(url_for("login", proximo = url_for("novo")))
        
    return render_template("novo.html", titulo = "Cadastrar pessoa")


@app.route("/criar", methods = ["POST"])
def criar():
    nome = request.form["nome"]
    idade = request.form["idade"]
    altura = request.form["altura"]

    pessoa = Pessoas.query.filter_by(nome = nome).first()
    if pessoa:
        flash("Pessoa já cadastrada.")

        return redirect(url_for("index"))

    nova_pessoa = Pessoas(nome = nome, idade = idade, altura = altura)
    db.session.add(nova_pessoa)
    db.session.commit()

    return redirect(url_for("index"))


@app.route("/editar/<int:id>")
def editar(id):
    if "usuario_logado" not in session or session["usuario_logado"] is None:
        return redirect(url_for("login", proximo = url_for("editar")))
    # Fazer uma query do banco
    pessoa = Pessoas.query.filter_by(id = id).first()

    return render_template("editar.html", titulo = "Editar Pessoa", pessoas = pessoa)


@app.route("/atualizar", methods = ["POST"])
def atualizar():
    pessoa = Pessoas.query.filter_by(id = request.form["id"]).first()
    pessoa.nome = request.form["nome"]
    pessoa.idade = request.form["idade"]
    pessoa.altura = request.form["altura"]

    db.session.add(pessoa)
    db.session.commit()

    return redirect(url_for("index"))


@app.route("/deletar/<int:id>")
def deletar(id):
    if "usuario_logado" not in session or session["usuario_logado"] is None:
        return redirect(url_for("login", proximo = url_for("editar")))
    
    Pessoas.query.filter_by(id = id).delete()
    db.session.commit()
    flash("Pessoa deletada com sucesso.")

    return redirect(url_for("index"))


@app.route("/logout")
def logout():
    session["usuario_logado"] = None
    flash("Você foi desconectado.")

    return redirect(url_for("login"))


@app.route("/login")
def login():
        proximo = request.args.get("proximo")

        return render_template("login.html", proximo = proximo)


@app.route("/autenticar", methods = ["POST"])
def autenticar():
    usuario = Usuarios.query.filter_by(nickname = request.form["usuario"]).first()
    if usuario:
        if request.form["senha"] == usuario.senha:

            session["usuario_logado"] = usuario.nickname            
            flash(usuario.nickname + " Logado com sucesso")
            proxima_pagina = request.form["proximo"]

            return redirect(proxima_pagina)
    else:
        flash("Usuário ou senha incorretos tente novamente.")

        return redirect(url_for("login"))