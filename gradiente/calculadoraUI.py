import tkinter as tk
import decimal

'''
PENDIENTES DEL CÓDIGO:
1. Validar los valores para m,b,alfa y coordenadas. Los valores ingresados
no pueden tener más de 4 decimales, no se debe de aplicar redondeos.

2. Cambiar la impresión en consola por una impresión dentro de la interfaz.

3. Manejar cuando la resolución de una función tiende hacia infinito

*Tal vez sería bueno limitar la cantidad de coordenadas que el usuarios puede ingresar,
que no genere n-filas

*También por tema de "experiencia" mostrar la formula con la se esta trabajando
'''




def agregar_fila():
    # Crear una nueva fila con etiquetas y campos de entrada
    nueva_fila = tk.Frame(ventana)
    label_x = tk.Label(nueva_fila, text="x:")
    entry_x = tk.Entry(nueva_fila)
    label_y = tk.Label(nueva_fila, text="y:")
    entry_y = tk.Entry(nueva_fila)
    nueva_fila.pack()
    label_x.pack(side="left")
    entry_x.pack(side="left")
    label_y.pack(side="left")
    entry_y.pack(side="left")

    # Agregar la fila al contenedor
    contenedor_filas.append(nueva_fila)

def eliminar_fila():
    # Eliminar la última fila agregada
    if contenedor_filas:
        ultima_fila = contenedor_filas.pop()
        ultima_fila.destroy()

def calcular_regresion():
    try:
        if(entry_alfa.get() == "" or entry_m.get()=="" or entry_b.get()==""):
            print("Debe de ingresar valores para alfa, m y/o b")
            return
        else:
            alfa = decimal.Decimal(entry_alfa.get())
            m_val = decimal.Decimal(entry_m.get())
            b_val = decimal.Decimal(entry_b.get())        
    except ValueError:
            print("Error: Ingrese solo valores numéricos para alfa, m y/o b.")
            return    

    suma_m = decimal.Decimal('0')
    suma_b = decimal.Decimal('0')
    i=0
    decimales = 9

    # Obtener los valores de los campos de entrada
    coordenadas = []
    for fila in contenedor_filas:
        try:
            if(fila.children['!entry'].get() == "" or fila.children['!entry2'].get()==""):
                print("Debe de ingresar valores para las coordenadas")
                return
            else:
                x = decimal.Decimal(fila.children['!entry'].get())
                y = decimal.Decimal(fila.children['!entry2'].get())
                coordenadas.append([x, y])
        except ValueError:
            # Manejar el error si el usuario ingresa un valor no numérico
            print("Error: Ingrese solo valores numéricos para las coordenadas.")
            return

    #calculo de la función derivada hasta que coincidan los valores de m(pendiente) y b(intersección con y)
    n = decimal.Decimal(len(coordenadas))
    while True:
        for coordenada in coordenadas:
            suma_m = suma_m + coordenada[0] * coordenada[1]-((m_val*coordenada[0])+b_val)
            suma_b = suma_b + coordenada[1]-((m_val*coordenada[0])+b_val)
        suma_m = suma_m * (-2/n)
        suma_b = suma_b * (-2/n)
        print(f"Ciclo: {i}")
        
        #guardar el valor anterior de la sumatoria
        m_aux = m_val 
        b_aux = b_val

        #calcular pendiente 
        m_val = m_aux - alfa * suma_m
        #calcular intersección con eje y
        b_val = b_aux - alfa * suma_b

        i = i+1

        #Formateo de valores para tomar en cuenta los primeros 8 decimales sin sufrir un redondeo en los valores
        index_m0 = str(m_aux).find(".")
        index_m1 = str(m_val).find(".")
        index_b0 = str(b_aux).find(".")
        index_b1 = str(b_val).find(".")

        if index_m0 == -1:
            sub_m0 = str(m_aux)
        if index_m1 == -1:
            sub_m1 = str(m_val)
        if index_m0 != -1:
            sub_m0 = str(m_aux)[0:index_m0] + str(m_aux)[index_m0:index_m0+decimales]
        if index_m1 != -1:
            sub_m1 = str(m_val)[0:index_m1] + str(m_val)[index_m1:index_m1+decimales]

        if index_b0 == -1:
            sub_b0 = str(b_aux)
        if index_b1 == -1:
            sub_b1 = str(b_val)
        if index_b0 != -1:
            sub_b0 = str(b_aux)[0:index_b0] + str(b_aux)[index_b0:index_b0+decimales]
        if index_b1 != -1:
            sub_b1 = str(b_val)[0:index_b1] + str(b_val)[index_b1:index_b1+decimales]

        #Se imprimen los valores en consola cuando mn = mn-1 && bn=bn-1
        if(sub_m0 == sub_m1 and sub_b0 == sub_b1):
            print(f"Sumatoria en m: {suma_m}")
            print(f"Sumatoria en b: {suma_b}")
            print(f"valor anterior de m-> {sub_m0} valor nuevo-> {sub_m1}")
            print(f"valor anterior de b-> {sub_b0} valor nuevo-> {sub_b1}")
            break

# Crear la ventana principal
ventana = tk.Tk()
ventana.title("Regresión Lineal")

# Contenedor para almacenar las filas
contenedor_filas = []

# Botones para agregar y eliminar filas
boton_agregar = tk.Button(ventana, text="Agregar fila", command=agregar_fila)
boton_eliminar = tk.Button(ventana, text="Eliminar fila", command=eliminar_fila)
boton_calcular = tk.Button(ventana, text="Calcular", command=calcular_regresion)

# Empaquetar los elementos
boton_agregar.pack()
boton_eliminar.pack()
boton_calcular.pack()

#inputs por defecto
fila_iniciales = tk.Frame(ventana)
label_m = tk.Label(fila_iniciales, text="m:")
entry_m = tk.Entry(fila_iniciales)
label_b = tk.Label(fila_iniciales, text="b:")
entry_b = tk.Entry(fila_iniciales)
label_alfa = tk.Label(fila_iniciales, text="alfa:")
entry_alfa = tk.Entry(fila_iniciales)
fila_iniciales.pack()
label_m.pack(side="left")
entry_m.pack(side="left")
label_b.pack(side="left")
entry_b.pack(side="left")
label_alfa.pack(side="left")
entry_alfa.pack(side="left")

# Agregar la primera fila por defecto
agregar_fila()

# Iniciar el bucle principal de la ventana
ventana.mainloop()