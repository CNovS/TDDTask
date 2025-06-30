interface Match {
  homeTeam: string;
  homeTeamScore: number;  
  awayTeam: string;
  awayTeamScore: number;
  startTime?: Date;
}
export class Scoreboard {
  private scoreboard: Match[] = []; 
  private summary: Match[] = []; 

  public getScoreboard(): Match[] {
      return this.scoreboard;
    }

  public getSummary(): Match[] {
   return this.summary;
  }

  public startMatch(homeTeam: string, awayTeam: string): void {
    if (homeTeam && awayTeam) {
        const match: Match = {
        homeTeam,
        homeTeamScore: 0,
        awayTeam,
        awayTeamScore: 0,
        startTime: new Date()
      };
      this.scoreboard = [...this.scoreboard, match];
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
      this.summary = this.sortSummary([...this.summary, this.scoreboard[index]]);
      this.scoreboard = this.scoreboard.toSpliced(index, 1);
      }
    } 
  }

  private sortSummary(summary: Match[]): Match[] {
    let sortedSummary = summary.slice().toSorted((a, b) => {
      const totalScoreA = a.homeTeamScore + a.awayTeamScore;
      const totalScoreB = b.homeTeamScore + b.awayTeamScore;
      if (totalScoreA === totalScoreB) {
        if (a.startTime && b.startTime) {
          return a.startTime.getTime() > b.startTime.getTime() ? 1 : -1;
        }
      }
        return totalScoreB - totalScoreA;
      });
    return [...sortedSummary];
  }
}