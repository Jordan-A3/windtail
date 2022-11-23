import matplotlib
from reliability.Distributions import Weibull_Distribution
from reliability.Fitters import Fit_Weibull_2P
import matplotlib.pyplot as plt

def weibullBot(windSpeed):
    matplotlib.use('Agg')

    fit = Fit_Weibull_2P(failures=windSpeed, show_probability_plot=False, print_results=False)

    dist = Weibull_Distribution(alpha=fit.alpha, beta=fit.beta)
    dist.PDF()  # this creates the plot of the PDF
    plt.show()

    weibull_stats = {
        "K": fit.alpha,
        "A": fit.beta
    }

    return weibull_stats