# 20232BSET03P2
Inteli - Engenharia de Software | Avaliação 2023-2B P2

a) Criar um fork do repositório para a sua conta do github;

b) Sanitizar e validar dados de entrada para evitar SQL Injection.

c) Corrigir a lógica de votação para que verifique se o registro do animal existe antes de adicionar um voto.

d) Implementar e tratar erros de maneira adequada, sem vazar detalhes de implementação.

e) Implementar todos os métodos que possuem assinatura no código.

f) No readme, descreva as vulnerabilidades identificadas e as medidas adotadas para corrigir cada uma delas.

A vulnerabilidade encontrada foi a parte de Injection SQL, que permitia um invasor manipulase a entrada enviada para os parâmetros **`:animalType`** e **`:id`** de forma maliciosa, inserindo instruções SQL adicionais que podem comprometer a integridade ou segurança do banco de dados. Fiz uso do prepared statements para selecionar o registro correspondente ao ID na tabela apropriada (**`cats`** ou **`dogs`**). Se o registro for encontrado, atualiza o número de votos para esse registro na tabela. Caso contrário, retorna um status 404 indicando que o registro de voto não foi encontrado.


