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
}