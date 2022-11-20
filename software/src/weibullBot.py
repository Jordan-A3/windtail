import weibull
import matplotlib
import matplotlib.pyplot as plt

def weibullBot(windSpeed):
    matplotlib.use('Agg')
    analysis = weibull.Analysis(windSpeed)

    analysis.fit(method='mle')
    analysis.pdf(show=False, file_name='src/graphic/prob.png', watermark_text="3° S.E.R")
    plt.clf()

    weibull_stats = {
        "K": analysis.eta,
        "A": analysis.beta
    }

    return weibull_stats