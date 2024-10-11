import decimal

# Configurar la precisión deseada
#decimal.getcontext().prec = 8  # Ajusta la precisión según tus necesidades

# Parámetros iniciales
#alfa = decimal.Decimal('.00000000001')
alfa = decimal.Decimal('0.1')
x0 = decimal.Decimal('0')
f_val = 0
bandera = True
i = 0
# Función derivada
def f(x):
    #return 2*x - 2
    #return (-6*x)+12
    return (2*x)-16
# Bucle principal
while bandera:
    f_aux = f_val
    # Cálculo de la derivada y actualización de x
    f_val = f(x0)
    x1 = x0 - alfa * f_val
    index0 = str(x0).find(".")
    index1 = str(x1).find(".")

    if index0 == -1:
        sub0 = str(x0)

    if index1 == -1:
        sub1 = str(x1)
    
    if index0 != -1:
        sub0 = str(x0)[0:index0] + str(x0)[index0:index0+9]
    
    if index1 != -1:
        sub1 = str(x1)[0:index1] + str(x1)[index1:index1+9]

    if(sub0 == sub1):
        bandera = False
        print(f"Función: 2x-16 Alfa:{alfa}")
        print(f"Ciclo: {i}, Derivada = {f_val}, Valor de x = {x1}")
        print (f"fn={sub0} fn-1={sub1}")

    x0 = x1
    i = i+1