## Setup
You will need to create a `.env` file with the following information:

    S_PORT=number, port to run server
    DB_HOST=string, sql database host
    DB_USER=string, sql database user
    DB_PW=string, sql database password
    DB_DATABASE=string, sql database database

You will need to run the `schema.sql` file from project root in your database

## Scripts

`start`: starts the server, use this for production
`dev`: runs the server with nodemon for hot reload
`test`: runs all unit tests, this is for ci/cd mostly
`test-watch`: hot reloads tests on changes, useful for development

## Endpoints

### HTTP POST `/todo/new`
Adds a new todo list
Body:

    {
	    "name":  string,
	    "description":  string
    }
Returns:

    {
	    "insertedId":  number,
	    "affectedRows":  number
    }
---
### HTTP POST `/todo/item`
Adds an item to a todo list
Body:

    {
	    "name":  string (todo name),
	    "details":  string
    }
Returns:

    {
	    "insertedId":  number,
	    "affectedRows":  number
    }

---
### HTTP GET `/todo/:name`
Gets a todo list and all associated items
Returns:

    {
	    "todo":  {
	    "id":  number,
	    "created_at":  date,
	    "name":  string,
	    "description":  string
	    },
	    "items":  [
			    {
				    "id":  number,
				    "created_at":  date,
				    "details":  string,
				    "todos_name":  string
			    }
		    ]
    }
   ---
   ### HTTP DELETE `/todo/:name`
   Deletes (completes) a todo list item
   Body:
   
    {
	    "id":  number
    }

Returns:

    {
	    "affectedRows":  number
    }

