import { Scoreboard} from './index';
describe('TDD task', () => {
    let component: Scoreboard;
    beforeEach(() => {
    component = new Scoreboard();
    });

    it('should exist scoreboard as empty array if no matches are started', () => {
        const scoreboard = component.getScoreboard();
        expect(scoreboard).toEqual([]);
    });
    //Start
    it.todo('should start in the scoreboard with 0 - 0 as score');
    it.todo('should return an empty scoreboard if no matches are started');
    it.todo('should return an empty scoreboard if any team has empty value when starting a match');
    //Update
    it.todo('should update the score of the match with the given score values');
    it.todo('should not update the score of the match if no valid scores are passed');
    //Finish
    it.todo('should remove the finished match from the scoreboard');
    //Summary
    it.todo('should return the summary with the finished matches ordered by their total score');
    it.todo('should return all matches with the same total score, ordered by the most recently started one');
    it.todo('should return empty summary if no matches are finished');
    it.todo('should return empty summary if the match to finish does not exist');
});