# Prisma

Prisma is an ORM which allow use to contact and make queries to our Database.

# Schema

It has it's own filetype called schema.prisma where we need to specify the different model of our DB and specify the config of the Database we use.

# Client

It's the library that we gonna use in the code. This library is generated from our schema, so we need to write the Schema first before using it and using the generator..

# Genetor

`prisma generate` command build/rebuild the client and need to be done EVERYTIME the Schema file change.
