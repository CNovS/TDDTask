interface Match {
  homeTeam: string;
  homeTeamScore: number;  
  awayTeam: string;
  awayTeamScore: number;  
}
export class Scoreboard {
  private scoreboard: Match[] = []; 

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
}