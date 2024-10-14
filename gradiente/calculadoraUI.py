import tkinter as tk
import decimal

def limitar_decimales(entry_text):
    if entry_text == "" or entry_text == "-":
        return True
    try:
        value = decimal.Decimal(entry_text)
        if value.as_tuple().exponent < -4:
            return False
        return True
    except decimal.InvalidOperation:
        return False

def limitar_decimales_especiales(entry_text):
    if entry_text == "" or entry_text == "-":
        return True
    try:
        value = decimal.Decimal(entry_text)
        if value.as_tuple().exponent < -20:
            return False
        return True
    except decimal.InvalidOperation:
        return False

def agregar_fila():
    if len(contenedor_filas) >= 5:
        resultado_label.config(text="No se pueden agregar más de 5 filas.")
        return

    # Crear una nueva fila con etiquetas y campos de entrada
    nueva_fila = tk.Frame(frame_filas, bg='#f8f9fa', pady=5)
    label_x = tk.Label(nueva_fila, text="x:", bg='#f8f9fa', font=('Arial', 12))
    entry_x = tk.Entry(nueva_fila, validate="key", validatecommand=(validacion_decimales, '%P'), font=('Arial', 12), width=10)
    label_y = tk.Label(nueva_fila, text="y:", bg='#f8f9fa', font=('Arial', 12))
    entry_y = tk.Entry(nueva_fila, validate="key", validatecommand=(validacion_decimales, '%P'), font=('Arial', 12), width=10)
    
    nueva_fila.pack(pady=2)
    label_x.pack(side="left", padx=5)
    entry_x.pack(side="left", padx=5)
    label_y.pack(side="left", padx=5)
    entry_y.pack(side="left", padx=5)

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
            resultado_label.config(text="Debe ingresar valores para alfa, m y/o b.")
            return
        else:
            alfa = decimal.Decimal(entry_alfa.get())
            m_val = decimal.Decimal(entry_m.get())
            b_val = decimal.Decimal(entry_b.get())  
                
    except ValueError:
            resultado_label.config(text="Ingrese solo valores numéricos para alfa, m y/o b.")
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
                resultado_label.config(text="Debe ingresar valores para las coordenadas.")
                return
            else:
                x = decimal.Decimal(fila.children['!entry'].get())
                y = decimal.Decimal(fila.children['!entry2'].get())
                coordenadas.append([x, y])
        except ValueError:
            # Manejar el error si el usuario ingresa un valor no numérico
            resultado_label.config(text="Ingrese solo valores numéricos para las coordenadas.")
            return

    #calculo de la función derivada hasta que coincidan los valores de m(pendiente) y b(intersección con y)
    n = decimal.Decimal(len(coordenadas))
    while True:
        for coordenada in coordenadas:
            suma_m += coordenada[0] * (coordenada[1] - ((m_val * coordenada[0]) + b_val))
            suma_b += coordenada[1] - ((m_val * coordenada[0]) + b_val)
        suma_m *= (-2 / n)
        suma_b *= (-2 / n)
        
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
            resultado_texto = (f"Resultados finales después de {i} iteraciones:\n\n"
                               f"Sumatoria en m: {suma_m}\n"
                               f"Sumatoria en b: {suma_b}\n\n"
                               f"Pendiente anterior (m): {sub_m0} -> Nueva (m): {sub_m1}\n"
                               f"Intersección anterior (b): {sub_b0} -> Nueva (b): {sub_b1}")
            resultado_label.config(text=resultado_texto)
            break

        if i >= 500000:
            resultado_texto = (f"Valores tienden a infinito, resultados después de {i} iteraciones:\n\n"
                               f"Sumatoria en m: {suma_m}\n"
                               f"Sumatoria en b: {suma_b}\n\n"
                               f"Pendiente (m): {m_val}\n"
                               f"Intersección (b): {b_val}")
            resultado_label.config(text=resultado_texto)
            break

# Crear la ventana principal
ventana = tk.Tk()
ventana.title("Regresión Lineal")

# Establecer el color de fondo
ventana.config(bg='#e9ecef')

# Crear un frame para la fórmula
frame_formula = tk.Frame(ventana, bg='#e9ecef')
frame_formula.pack(side="left", padx=80, pady=20)

# Mostrar la etiqueta de la fórmula
titulo_formula = tk.Label(frame_formula, text="Fórmula:", bg='#e9ecef', font=('Arial', 18, 'bold'))
titulo_formula.pack()

# Mostrar la fórmula en un Label
formula_texto = "y = m * x + b"  # Fórmula a mostrar
label_formula = tk.Label(frame_formula, text=formula_texto, bg='#e9ecef', font=('Arial', 16), fg='#007bff')
label_formula.pack()

# Contenedor para almacenar las filas
contenedor_filas = []

# Validación para limitar los decimales
validacion_decimales = ventana.register(limitar_decimales)
validacion_decimales_especiales = ventana.register(limitar_decimales_especiales)

# Frame para contener los botones y las entradas
frame_principal = tk.Frame(ventana, bg='#e9ecef')
frame_principal.pack(pady=(50, 10))

# Inputs por defecto (alfa, m, b)
fila_iniciales = tk.Frame(ventana, bg='#f8f9fa', pady=5)
label_m = tk.Label(fila_iniciales, text="m:", bg='#f8f9fa', font=('Arial', 12))
entry_m = tk.Entry(fila_iniciales, validate="key", validatecommand=(validacion_decimales, '%P'), font=('Arial', 12), width=10)
label_b = tk.Label(fila_iniciales, text="b:", bg='#f8f9fa', font=('Arial', 12))
entry_b = tk.Entry(fila_iniciales, validate="key", validatecommand=(validacion_decimales, '%P'), font=('Arial', 12), width=10)
label_alfa = tk.Label(fila_iniciales, text="alfa:", bg='#f8f9fa', font=('Arial', 12))
entry_alfa = tk.Entry(fila_iniciales, validate="key", validatecommand=(validacion_decimales_especiales, '%P'), font=('Arial', 12), width=10)

# Empaquetar inputs
fila_iniciales.pack(pady=10)
label_m.pack(side="left", padx=5)
entry_m.pack(side="left", padx=5)
label_b.pack(side="left", padx=5)
entry_b.pack(side="left", padx=5)
label_alfa.pack(side="left", padx=5)
entry_alfa.pack(side="left", padx=5)

# Contenedor para filas dinámicas
frame_filas = tk.Frame(ventana, bg='#f8f9fa')
frame_filas.pack(pady=10)

# Botones para agregar y eliminar filas
boton_agregar = tk.Button(frame_principal, text="Agregar fila", command=agregar_fila, font=('Arial', 12), bg='#007bff', fg='white', width=12)
boton_eliminar = tk.Button(frame_principal, text="Eliminar fila", command=eliminar_fila, font=('Arial', 12), bg='#dc3545', fg='white', width=12)
boton_calcular = tk.Button(frame_principal, text="Calcular", command=calcular_regresion, font=('Arial', 12), bg='#28a745', fg='white', width=12)

# Empaquetar los botones
boton_agregar.grid(row=0, column=0, padx=10)
boton_eliminar.grid(row=0, column=1, padx=10)
boton_calcular.grid(row=0, column=2, padx=10)

# Fila por defecto
agregar_fila()

# Etiqueta para mostrar resultados debajo de todas las filas
resultado_label = tk.Label(ventana, text="", bg='#e9ecef', font=('Arial', 12), pady=10)
resultado_label.pack()

# Iniciar el loop principal de la ventana
ventana.mainloop()