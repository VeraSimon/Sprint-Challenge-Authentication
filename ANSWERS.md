<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
   Sessions are used to maintain a users access to documents within a fixed domain for a specified amount of time.

2. What does bcrypt do to help us store passwords in a secure manner.
   It hashes the password string. Hashing is a one way function used to map sensitive data to a unique output which can not be reversed.

3. What does bcrypt do to slow down attackers?
   bcrypt salts the hash, adding increased complexity to the hashed output, making it more difficult for attackers to use things such as rainbow tables to deduce the hashed data.

4. What are the three parts of the JSON Web Token?
   Header, payload, and signature.
