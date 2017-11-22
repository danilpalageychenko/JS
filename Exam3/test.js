const exam = require('./');
const NewsFeedModule = exam.task;

describe('Exam 3', () => {
    const newsFeed = NewsFeedModule.getInstance();

    beforeEach(() => {
        newsFeed._articles = [];
        newsFeed._isBusy = false;
    });

    /* SINGLETON */
    it('Task should has .getInstance method', () => {
        expect(NewsFeedModule.getInstance).toBeTruthy();
    });

    it('Task method .getInstance should always return the same instance', () => {
        const instance1 = NewsFeedModule.getInstance();
        const instance2 = NewsFeedModule.getInstance();

        expect(instance1).toBe(instance2);
    });

    /* INIT */
    it('Should initialize articles array on init method call', () => {
        const news = [ 
            { title: 'Lorem 1', content: 'Lorem Ipsum 1' },
            { title: 'Lorem 2', content: 'Lorem Ipsum 2' }
        ];

        newsFeed.init(news);

        expect(newsFeed._articles).toEqual(news);
    });

    it('Should return false on init call without arguments', () => {
        expect(newsFeed.init()).toBe(false);
    });

    it('Should return false if one of the passed articles does\'n has required fields', () => {
        const news = [ { } ];
        expect(newsFeed.init(news)).toBe(false);
    });

    /* ADD */
    it('Should extend articles array with passed article', (done) => {
        const article = { title: 'Lorem', content: 'Lorem Ipsum' };

        newsFeed.addArticle(article, () => {
            expect(newsFeed._articles).toEqual([ article ]);
            done();
        });
    });

    it('Should return false if passed article doesn\'t has required fields', () => {
        const article = { };
        expect(newsFeed.addArticle(article)).toBe(false);
    });

    it('Should set _isBusy to true on addArticle call', (done) => {
        const article = { title: 'Lorem', content: 'Lorem Ipsum' };
        newsFeed.addArticle(article, () => {
            done();
        });
        expect(newsFeed._isBusy).toBe(true);
    });

    it('Should set _isBusy to false on addArticle work end', (done) => {
        const article = { title: 'Lorem', content: 'Lorem Ipsum' };
        newsFeed.addArticle(article, () => {
            expect(newsFeed._isBusy).toBe(false);
            done();
        });
    });

    /* REMOVE */
    it('Should remove article by ref on removeArticle call', (done) => {
        const article = { title: 'Lorem 1', content: 'Lorem Ipsum 1' };
        const news = [ article ];

        newsFeed.init(news);
        newsFeed.removeArticle(article, (removedArticle) => {
            expect(article).toBe(removedArticle);
            expect(newsFeed._articles).toEqual([]);
            done();
        });
    });

    it('Should not remove any article if ref to a passed object isn\'t present in _articles', (done) => {
        newsFeed.removeArticle({ title: 'Lorem 1', content: 'Ipsum 1' }, (removedArticle) => {
            expect(removedArticle).toBeNull();
            done();
        })
    });

    it('Should return false on removeArticle call without article object ref', () => {
        expect(newsFeed.removeArticle(undefined)).toBe(false);
    });

    it('Should set _isBusy to true on removeArticle call', (done) => {
        const article = { title: 'Lorem 1', content: 'Lorem Ipsum 1' };
        newsFeed.removeArticle(article, () => { done(); });
        expect(newsFeed._isBusy).toBe(true);
    });

    it('Should set _isBusy to false on removeArticle work end', (done) => {
        const article = { title: 'Lorem 1', content: 'Lorem Ipsum 1' };
        newsFeed.removeArticle(article, () => {
            expect(newsFeed._isBusy).toBe(false);
            done();
        });
        
    });

    /* FIND */
    it('Should execute callback with first find element on find method call', (done) => {
        const article = { title: 'Lorem 1', content: 'Lorem Ipsum 1' };
        const news = [ article ];

        newsFeed.init(news);
        newsFeed.find((item) => item.title === article.title && item.content === article.content, (foundArticle) => {
            expect(foundArticle).toEqual(article);
            done();
        });
    });

    it('Should execute callback with null if element wasn\'t found on find method call', (done) => {
        const article = { title: 'Lorem 1', content: 'Lorem Ipsum 1' };
        const news = [ article ];

        newsFeed.init(news);
        newsFeed.find((item) => item.title === 'Not Lorem' && item.content === 'Not Ipsum', (foundArticle) => {
            expect(foundArticle).toBe(null);
            done();
        }, true);
    });

    it('Should return false if functor wasn\'t passed on find method call', () => {
        expect(newsFeed.find(undefined)).toBe(false);
    });

    it('Should set _isBusy to true on find method call', (done) => {
        newsFeed.find(() => false, () => {
            done();
        });
        expect(newsFeed._isBusy).toBe(true);
    });

    it('Should set _isBusy to false on find method work end', (done) => {
        newsFeed.find(() => false, () => {
            expect(newsFeed._isBusy).toBe(false);
            done();
        });
    });

    /* QUERY */
    it('Should return sorted articles list that correspond to the query', () => {
        newsFeed.init([
            {
                /* 4 hits */
                title: 'hit hit',
                content: 'hit hit'
            },
            {
                /* 5 hits */
                title: 'hit hit hit',
                content: 'hit hit'
            },
            {
                /* no hits */
                title: 'no',
                content: 'no'
            },
        ]);
        expect(newsFeed.query('hit')).toEqual([
            {
                /* 5 hits */
                title: 'hit hit hit',
                content: 'hit hit'
            },
            {
                title: 'hit hit',
                content: 'hit hit'
            }
        ]);

    });

    it('Should return empty array if query does not correspond to any article', () => {
        newsFeed.init([
            {
                /* no hits */
                title: 'no',
                content: 'no'
            }
        ]);
        expect(newsFeed.query('query')).toEqual([]);
    });
});