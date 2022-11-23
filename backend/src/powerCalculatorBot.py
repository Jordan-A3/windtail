import matplotlib.pyplot as plt
import matplotlib
import pandas as pd
import csv

def powerCalculatorBot(Vi, Vn, Vf, Pn, Vv):
    matplotlib.use('Agg')

    Va = (Vi + Vn) / 2
    A = Pn * Vi * ((Va - 2 * Vn * (Va / Vn) ** 3) / (2 * (Vn - Va) ** 2))
    B = Pn * ((Vn - 3 * Va + 4 * Va * (Va / Vn) ** 3) / (2 * (Vn - Va) ** 2))
    C = Pn * ((1 - 2 * (Va / Vn) ** 3) / (2 * (Vn - Va) ** 2))

    result = {
        "Va": format(Va, '.5f'),
        "A": format(A, '.5f'),
        "B": format(B, '.5f'),
        "C": format(C, '.5f')
    }

    Pvs = []

    with open('./windpower.csv', 'w') as csvfile:
        for v in Vv:
            if(Vi <= v <= Vn):
                Pv = "{:.0f}".format(A + (B * v) + (C * (v ** 2)))
            if(Vn <= v <= Vf):
                Pv = Pn
            if(v > Vf):
                Pv = 0
            if Pv == '-0':
                Pv = '0'
                Pvs.append(Pv)
            else:
                Pvs.append(Pv)
            csv.writer(csvfile, delimiter=',').writerow([v, Pv])

    Pvs.sort(key=int)
    Vv.sort()

    windPower = pd.read_csv('windpower.csv')
    windPower.columns = ["Velocidade do vento", "Potencia"]

    xs = windPower['Velocidade do vento']
    zs = windPower['Potencia']

    # plt.plot(xs, zs)

    plt.scatter(xs, zs, s=0.5)

    plt.savefig('graphic/power2d.png')

    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    ax.set_xlabel("Velocidade do vento")
    ax.set_zlabel("Potencia")

    ax.scatter(xs, xs, zs, s=0.5)

    plt.savefig('graphic/power3d.png')

    plt.clf()

    print('''
    Resultado de Va = {:.5f}
    Resultado de A = {:.5f}
    Resultado de B = {:.5f}
    Resultado de C = {:.5f}
    '''.format(Va, A, B, C))

    return result

