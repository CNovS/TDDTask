interface Match {
  homeTeam: string;
  homeTeamScore: number;  
  awayTeam: string;
  awayTeamScore: number;  
}
export class Scoreboard {
  private scoreboard: Match[] = []; 
  private summary: Match[] = []; 

  public getScoreboard(): Match[] {
      return this.scoreboard;
    }

  public startMatch(homeTeam: string, awayTeam: string): void {
    if (homeTeam && awayTeam) {
        const match: Match = {
        homeTeam,
        homeTeamScore: 0,
        awayTeam,
        awayTeamScore: 0
      };
      this.scoreboard.push(match);
      }
  }

    public updateMatchScore(updatedMatch: Match): void {
      if (updatedMatch.homeTeamScore < 0 || updatedMatch.awayTeamScore < 0) {
        return;
      }
      
      this.scoreboard = this.scoreboard.map(match => {
        if (match.homeTeam === updatedMatch.homeTeam && match.awayTeam === updatedMatch.awayTeam) {
          return {
            ...match,
            homeTeamScore: updatedMatch.homeTeamScore,
            awayTeamScore: updatedMatch.awayTeamScore
          };
        }
        return match;
      });
  }

  public finishMatch(homeTeam: string, awayTeam: string): void {
    if (homeTeam && awayTeam) {
    const index = this.scoreboard.findIndex(match=> match.homeTeam === homeTeam && match.awayTeam === awayTeam);
    if (index !== -1) {
      this.summary.push(this.scoreboard[index]);  
      this.summary = this.summary.toSorted((a, b) => (b.homeTeamScore + b.awayTeamScore) - (a.homeTeamScore + a.awayTeamScore));
      this.scoreboard = this.scoreboard.toSpliced(index, 1);
      }
    } 
  }

  public getSummary(): Match[] {
   return this.summary;
  }
}