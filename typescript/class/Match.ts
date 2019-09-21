import {Place} from "./Place";
import { Tournament } from "./Tournament";

export type Side = "W" | "L";

interface MatchPos {
    round: number;
    id: number;
}

export class Match {
    places: Array<Place | null> = [null, null, null, null];
    side: Side;
    // round: number;
    // id: number;
    pos: MatchPos;
    isDummy: boolean = false;
    tournament: Tournament;

    constructor(side: Side, pos: MatchPos, tournament: Tournament) {
        this.side = side;
        this.pos = pos;
        this.tournament = tournament;
    }

    get top(): number {
        if (this.isDummy) {
            return 0;
        }
        function calcTop(round: number): number {
            if (round === 0) {
                return 0;
            }
            return 0;
        }
        return (this.tournament.matchHeight + this.tournament.vertiInterval) * this.pos.id;
    }

    get left(): number {
        if (this.isDummy) {
            return 0;
        }
        return (this.tournament.matchWidth + this.tournament.horiInterval) * this.pos.round;
    }

    draw(): void {
        let base = document.getElementById("tournament");
        let idString = "match-" + this.side + "-" + this.pos.round + "-" + this.pos.id;
        let tableHTML = "<table class='tour-match' ";
        tableHTML += "id='" + idString + "' ";
        tableHTML += "style='position: absolute; ";
        tableHTML += "left:" + this.left.toString() + "px; ";
        tableHTML += "top:" + this.top + "px;";
        tableHTML += "'>";
        for (let place of this.places) {
            tableHTML += this.makeOneTr(place);
        }
        tableHTML += "</table>";
        if (base !== null) {
            base.insertAdjacentHTML("beforeend", tableHTML);
        }
    }

    private makeOneTr(place: Place |  null): string {
        let nameString = "";
        let pointString = "";
        let missString = "";
        let rankString = "";
        if (place !== null) {
            nameString = place.name;
            if (place.result !== null) {
                pointString = place.result.point.toString();
                missString = place.result.miss.toString();
                rankString = place.result.rank.toString();
            }
        }
        return `<tr>
        <td class="tour-name">${nameString}</td>
        <td class="tour-point">${pointString}-${missString}</td>
        <td class="tour-rank">${rankString}</td>
        </tr>`;
    }
}
