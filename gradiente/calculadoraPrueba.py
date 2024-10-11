import decimal
i=0
decimales = 9 #se toma el numero de decimales-1, por ejemplo si decimales=9, se tomaran 8 decimales
coordenadas = [[10,100],[15,90],[20,80],[25,60],[30,90]]

n = decimal.Decimal(len(coordenadas))
alfa = decimal.Decimal('0.000000000001')
m_val = decimal.Decimal('0')
b_val = decimal.Decimal('0')
suma_m = decimal.Decimal('0')
suma_b = decimal.Decimal('0')


while True:
    for coordenada in coordenadas:
        suma_m = suma_m + decimal.Decimal(coordenada[0]) * (decimal.Decimal(coordenada[1])-((m_val*decimal.Decimal(coordenada[0]))+b_val))
        suma_b = suma_b + (decimal.Decimal(coordenada[1])-((m_val*decimal.Decimal(coordenada[0]))+b_val))
    suma_m = suma_m * (-2/n)
    suma_b = suma_b * (-2/n)
    print(f"Ciclo: {i}")
    
    m_aux = m_val
    b_aux = b_val

    #calcular pendiente 
    m_val = m_aux - alfa * suma_m
    #calcular intersección con eje y
    b_val = b_aux - alfa * suma_b

    i = i+1

    #Formateo de valores
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

    if(sub_m0 == sub_m1 and sub_b0 == sub_b1):
        print(f"Sumatoria en m: {suma_m}")
        print(f"Sumatoria en b: {suma_b}")
        print(f"valor anterior de m-> {sub_m0} valor nuevo-> {sub_m1}")
        print(f"valor anterior de b-> {sub_b0} valor nuevo-> {sub_b1}")
        break

     