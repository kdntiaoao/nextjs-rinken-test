export type AnsweringType = {
  /** 最初の問題番号 */
  firstNumber: number
  /** 最終の問題番号 */
  lastNumber: number
  /** 現在の問題番号 */
  currentNumber: number
  /** 正解数 */
  correctCount: number
  /** 履歴 */
  selectedAnswers: number[][]
}
