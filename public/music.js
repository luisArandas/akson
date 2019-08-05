/**
 * @author Luis Arandas  http://luisarandas.org
 * @author José Alberto Gomes  http://jasg.net/Home.html
 * @author Rui Penha  http://ruipenha.pt/
 *
 *  All this code was done under the context of a research
 *  between Braga Media Arts and the University of Porto © 2019
 */

class ScalePlaying {
  constructor(type, state) {
    this.type = type;
    this.state = state;
  }
  cMajorPentatonic() {
    //C, D, E, G, A;
    return ['C2', 'D2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5', 'E5', 'G5', 'A5'];
  }
  cMinorPentatonic() {
    //C, D#, F, G, A#;
    return ['C2', 'D#2', 'F2', 'G2', 'A#2', 'C3', 'D#3', 'F3', 'G3', 'A#3', 'C4', 'D#4', 'F4', 'G4', 'A#4', 'C5', 'D#5', 'F5', 'G5', 'A#5'];
  }
  cMajor() {
    //C, D, E, F, G, A, B
    return ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
  }
  cMinor() {
    //C, D, D#, F, G, G#, A#
    return ['C2', 'D2', 'D#2', 'F2', 'G2', 'G#2', 'A#2', 'C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'A#3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5', 'D5', 'D#5', 'F5', 'G5', 'G#5', 'A#5'];
  }
  cHarmonicMinor() {
    //C, D, D#, F, G, G#, B
    return ['C2', 'D2', 'D#2', 'F2', 'G2', 'G#2', 'B2', 'C3', 'D3', 'D#3', 'F3', 'G3', 'G#3', 'B3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'B4', 'C5', 'D5', 'D#5', 'F5', 'G5', 'G#5', 'B5'];
  }
  cMelodicMinor() {
    //C, D, D#, F, G, A, B
    return ['C2', 'D2', 'D#2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'D#3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'D#5', 'F5', 'G5', 'A5', 'B5'];
  }
  cAdonaiMalakh() {
    //C, C#, D, D#, F, G, A, A#
    return ['C2', 'C#2', 'D2', 'D#2', 'F2', 'G2', 'A2', 'A#2', 'C3', 'C#3', 'D3', 'D#3', 'F3', 'G3', 'A3', 'A#3', 'C4', 'C#4', 'D4', 'D#4', 'F4', 'G4', 'A4', 'A#4', 'C5', 'C#5', 'D5', 'D#5', 'F5', 'G5', 'A5', 'A#5'];
  }
  cHungarianMajor() {
    //C, D#, E, F#, G, A, A#
    return ['C2', 'D#2', 'E2', 'F#2', 'G2', 'A2', 'A#2', 'C3', 'D#3', 'E3', 'F#3', 'G3', 'A3', 'A#3', 'C4', 'D#4', 'E4', 'F#4', 'G4', 'A4', 'A#4', 'C5', 'D#5', 'E5', 'F#5', 'G5', 'A5', 'A#5'];
  }
  cHirajoshiJapan() {
    //C, D, D#, G, G#
    return ['C2', 'D2', 'D#2', 'G2', 'G#2', 'C3', 'D3', 'D#3', 'G3', 'G#3', 'C4', 'D4', 'D#4', 'G4', 'G#4', 'C5', 'D5', 'D#5', 'G5', 'G#5'];
  }
  cIonian() {
    //C, D, E, F, G, A, B
    return ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
  }
  cLocrian() {
    //C, Db, Eb, F, Gb, Ab, Bb
    return ['C2', 'C#2', 'D#2', 'F2', 'F#2', 'G#2', 'A#2', 'C3', 'C#3', 'D#3', 'F3', 'F#3', 'G#3', 'A#3', 'C4', 'C#4', 'D#4', 'F4', 'F#4', 'G#4', 'A#4', 'C5', 'C#5', 'D#5', 'F5', 'F#5', 'G#5', 'A#5'];
  }
}
