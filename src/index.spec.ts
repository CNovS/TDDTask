import { Scoreboard} from './index';
describe('TDD task', () => {
    let component: Scoreboard;
    const expectedStartedMatchAB = { homeTeam: 'Team A', homeTeamScore: 0, awayTeam: 'Team B', awayTeamScore: 0 };

    beforeEach(() => {
    component = new Scoreboard();
    });

    function startMatchAB() {
        component.startMatch('Team A', 'Team B');
    }

    function finishMatchAB() {
        component.finishMatch('Team A', 'Team B');
    }

    function startMatchCD() {
        component.startMatch('Team C', 'Team D');
    }

    function finishMatchCD() {
        component.finishMatch('Team C', 'Team D');
    }

    function startMatchEF() {
        component.startMatch('Team E', 'Team F');
    }

    function finishMatchEF() {
        component.finishMatch('Team E', 'Team F');
    }

    it('should exist scoreboard as empty array if no matches are started', () => {
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toEqual([]);
    });
    
    describe('startMatch', () => {
        it('should start in the scoreboard with 0 - 0 as score', () => {
            startMatchAB();    
            const scoreboard = component.getScoreboard();
            expect(scoreboard).toHaveLength(1);
            expect(scoreboard).toMatchObject([expectedStartedMatchAB])
        });

        it('should return an empty scoreboard if any team has an empty value when starting a match', () => {  
            component.startMatch('', 'Team B');    
            const scoreboard = component.getScoreboard();
            expect(scoreboard).toHaveLength(0);
            expect(scoreboard).toEqual([]);
        });
    });

    describe('updatedMatch', () => {
        beforeEach(() => {
            startMatchAB();
        });

        it('should update the score of the match with the given score values', () => {  
            const updatedMatchAB = { homeTeam: 'Team A', homeTeamScore: 2, awayTeam: 'Team B', awayTeamScore: 3 };
            component.updateMatchScore(updatedMatchAB);
            const scoreboard = component.getScoreboard();
            expect(scoreboard).toHaveLength(1);
            expect(scoreboard).toMatchObject([updatedMatchAB])
        });

        it('should not update the score of the match if no valid scores are passed', () => {
            const updatedMatchAB = { homeTeam: 'Team A', homeTeamScore: -1, awayTeam: 'Team B', awayTeamScore: 3 };
            component.updateMatchScore(updatedMatchAB);
            const scoreboard = component.getScoreboard();
            expect(scoreboard).toHaveLength(1);
            expect(scoreboard).toMatchObject([expectedStartedMatchAB])
        });

        it('should not update the score of the match if no match is found with the given teams', () => {
            const updatedMatchXB = { homeTeam: 'X', homeTeamScore: 1, awayTeam: 'Team B', awayTeamScore: 2 };
            component.updateMatchScore(updatedMatchXB);
            const scoreboard = component.getScoreboard();
            expect(scoreboard).toHaveLength(1);
            expect(scoreboard).toMatchObject([expectedStartedMatchAB])
        });
    });

    describe('finishMatch', () => {
        beforeEach(() => {
            startMatchAB();
        });

        it('should remove the finished match from the scoreboard', () => {
            finishMatchAB();
            const scoreboard = component.getScoreboard();
            expect(scoreboard).toHaveLength(0);
            expect(scoreboard).toEqual([])
        });

        it('should not remove any match if given one is not in the scoreboard', () => {
            component.finishMatch('Team X', 'Team B');
            const scoreboard = component.getScoreboard();
            expect(scoreboard).toHaveLength(1);
            expect(scoreboard).toMatchObject([expectedStartedMatchAB]);
        });

        it('should not remove any match if the given match names are not valid', () => {
            component.finishMatch('', 'Team B');
            const scoreboard = component.getScoreboard();
            expect(scoreboard).toHaveLength(1);
            expect(scoreboard).toMatchObject([expectedStartedMatchAB]);
        });
     });
   
    describe('getSummary', () => {
        it('should return the summary with the finished match', () => {
            startMatchAB(); 
            const updatedMatchAB = { homeTeam: 'Team A', homeTeamScore: 2, awayTeam: 'Team B', awayTeamScore: 3 };
            component.updateMatchScore(updatedMatchAB);
            const scoreboard = component.getScoreboard();
            finishMatchAB();
            const summary = component.getSummary();
            expect(summary).toHaveLength(1);
            expect(summary).toMatchObject([updatedMatchAB]);
        });

        it('should return the summary with the finished matches ordered by their total score', () => {
            const updatedMatchCD = { homeTeam: 'Team C', homeTeamScore: 2, awayTeam: 'Team D', awayTeamScore: 3 };
            startMatchAB();
            startMatchCD();
            component.updateMatchScore(updatedMatchCD);
            finishMatchAB();
            finishMatchCD();
            const summary = component.getSummary();
            expect(summary).toHaveLength(2);
            expect(summary[0]).toMatchObject(updatedMatchCD);
            expect(summary[1]).toMatchObject(expectedStartedMatchAB);
        });

        it('should return all matches with the same total score, ordered by the most recently started one', async () => {
            const updatedMatchCD = { homeTeam: 'Team C', homeTeamScore: 2, awayTeam: 'Team D', awayTeamScore: 3 };
            const nonUpdatedLastMatchEF = { homeTeam: 'Team E', homeTeamScore: 0, awayTeam: 'Team F', awayTeamScore: 0 };
            startMatchAB();
            startMatchCD();
            component.updateMatchScore(updatedMatchCD);
            finishMatchCD();
            startMatchEF();
            finishMatchEF();
            finishMatchAB();
            const summary = component.getSummary();
            expect(summary).toHaveLength(3);
            expect(summary[0]).toMatchObject(updatedMatchCD);
            expect(summary[1]).toMatchObject(nonUpdatedLastMatchEF);
            expect(summary[2]).toMatchObject(expectedStartedMatchAB);
        });
        
        it('should return empty summary if no matches are finished', () => {
            startMatchAB();
            const summary = component.getSummary();
            expect(summary).toHaveLength(0);
            expect(summary).toEqual([]);
        });

        it('should return empty summary if the match to finish does not exist', () => {
            startMatchAB();
            component.finishMatch('Team X', 'Team B');
            const summary = component.getSummary();
            expect(summary).toHaveLength(0);
            expect(summary).toEqual([]);
        });
    });
});