/// <reference types="cypress" />
describe('TechCrunch Website Test', function () {
    beforeEach(() => {
        cy.visit('https://techcrunch.com/');

    })
    it(' Check that each news have authors and photo', () => {
        //Check that "The Latest" header is visible
        cy.get('.river__title').should('have.text', "The Latest");
        //Check that each news have authors and photo
        cy.get('.river').find('.post-block').each(($e1, index, $list) => {
            cy.wrap($e1).get('.post-block__header').find('.river-byline__authors').should('be.visible');
            cy.wrap($e1).get('.post-block__footer').find('.post-block__media').should('be.visible');
        })
    })
    it.only(' Check that the browser title is the same with the news title after going to a news detail  and check links in news content', () => {
        let articleTitle;
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const randomInt = getRandomInt(1, 20); // Generates a random integer between 1 and 20
        cy.get('.river').find('.post-block').eq(randomInt).within(Title => {
            // Get the news article title
            cy.get('.post-block__title').invoke('text').as('Title');
        });
        // Use the newsTitle to locate and click the related news
        cy.get('@Title').then((newsTitle) => {
            cy.contains('.post-block__title', newsTitle).click();
            //Remove the part after this "|" in title because there is |TechCrunch in title
            cy.title().then((browserTitle) => {
                const actualTitle = browserTitle.split('|')[0].trim();
                expect(actualTitle).to.equal(newsTitle);
            });

        });
        cy.get('.article-content').find('a').each(($ele) => {
            //Check anchor element has href attribute and value of them is not undefined
            const message = $ele.text();
            expect($ele, message).to.have.attr("href").not.contain("undefined");
            //values and href attribute shouldnt be empty
            cy.wrap($ele).invoke('text').should('not.be.empty');
            cy.wrap($ele).invoke('attr', 'href').should('not.be.empty')

        });
    
    })

})



