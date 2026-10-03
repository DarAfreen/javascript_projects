import mysql.connector

config = {
    'host': 'localhost',  # Hostname or IP address of the MySQL server
    'port': 3307,         # Port number
    'user': 'root',
    'password': '',
    'database': '1manage'
}

try:
    # Establish connection
    mydb = mysql.connector.connect(**config)
    print("Connected to MySQL database!")
except mysql.connector.Error as error:
    print("Error connecting to MySQL:", error)


def addbook():
    bname = input("Enter book name: ")
    bcode = input("Enter book code:")
    total = input("Total books: ")
    sub = input("Enter subject:")
    data = (bname,bcode,total,sub)
    sql = "insert into book values(%s,%s,%s,%s)"
    c = mydb.cursor()
    c.execute(sql,data)
    mydb.commit()
    print("-------------------")
    print("Data entered successfully")
    main()



def issuesb():
    name = input("Enter name:")
    rno = input("Enter rno:")
    code = input("Enter book code:") 
    date = input("Enter date:")
    sql = "insert into issues values(%s,%s,%s,%s)"  
    data = (name, rno, code, date)
    c = mydb.cursor()
    c.execute(sql,data)
    mydb.commit()
    print("--------------")
    print("book issued to :",name)
    bookup(code,-1)

def submittb():
    name = input("Enter name:")
    rno = input("Enter rno:")
    code = input("Enter book code:") 
    date = input("Enter date:")
    sql = "insert into submitt values(%s,%s,%s,%s)"  
    data = (name, rno, code, date)  # Corrected 'data' to 'date'
    c = mydb.cursor()
    c.execute(sql, data)
    mydb.commit()
    print("--------------")
    print("book submitted from:", name)
    bookup(code, 1)



def bookup(code,u):
    sql = "select TOTAL from book where BCODE = %s"
    data = (code,)
    c = mydb.cursor()
    c.execute(sql,data)
    myresult = c.fetchone()
    if myresult is not None:  # Check if myresult is not None before accessing its elements
        t = myresult[0] + u
        sql = "update book set TOTAL = %s where BCODE = %s"
        d = (t,code)
        c.execute(sql,d)
        mydb.commit()
    else:
        print("Book with code", code, "not found.")
    main()



def dbook():
    ac =  input("Enter book code:")
    sql = "delete from book where BCODE = %s"
    data = (ac,)
    c = mydb.cursor()
    c.execute(sql,data)
    mydb.commit()
    main()



def dispbook():
    sql = "select * from book"
    c = mydb.cursor()
    c.execute(sql)
    myresult = c.fetchall()
    for i in myresult:
        print("book name:",i[0])  
        print("book code:",i[1])
        print("Total:",i[2])
        print("----------------")
        main()




def main ():
    print("""............LIBRARY MANAGEMENT............
          1. Add book
          2. Issues book
          3. Submitt book
          4. Delete book
          5. Display book
            """)    
    choice = input("Enter task no:") 
    print("-----------------")
    if(choice == '1'):
        addbook()
    elif(choice == '2'):
        issuesb()
    elif(choice == '3'):
        submittb()
    elif(choice == '4'):
        dbook()
    elif(choice == '5'):
        dispbook()
    else:
        print("wrong choice")
        main()


def password():
    import random
    ps = random.randint(000000,100000) 

    user = input("Enter Username:")
    print("Your password is:",ps) 

    verify = input("Enter password")

    if verify == str(ps):
        main()
    else:
        verify != str(ps)
        print("wrong password")
        password()

password()

               



