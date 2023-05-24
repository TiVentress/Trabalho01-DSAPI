CREATE database loja_dsapi;
USE loja_dsapi;

CREATE table cidades (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
	nome VARCHAR(50)
);

CREATE table clientes (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100),
    altura DOUBLE,
    nascimento DATE,
    cidade_id INT NOT NULL,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);
    
CREATE table pedidos (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    horario DATETIME,
    endereco VARCHAR(200),
    cliente_id INT,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE table categorias (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

CREATE table produtos (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100),
    preco DOUBLE,
    quantidade DOUBLE,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE table pedidos_produtos (
	pedido_id INT,
    produto_id INT,
    preco DOUBLE,
    quantidade DOUBLE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

INSERT INTO cidades(nome) 
VALUES ('Porto Alegre'), ('Alvorada'), ('Cachoeirinha');
INSERT INTO clientes(nome, altura, nascimento, cidade_id)
VALUES ('Tiago', '1.65', '1990/12/04', '2'), ('Natália', '1.60', '2005/01/02', '1'), ('Marco', '1.55', '1986/04/20', '3');
INSERT INTO categorias(nome)
VALUES ('jogos'), ('livros'), ('esportes');
INSERT INTO produtos(nome, preco, quantidade, categoria_id)
VALUES ('Mk 11', '150', '1', '1'), ('Jogos Vorazes', '50', '2', '2'), ('Bola de Volei', '200', '1', '3');