import { ExerciseLogEntryForm } from "./ExerciseLogEntryForm"
import { ExerciseLogTable } from "./ExerciseLogTable"

export default function Logs() {
    return <div>Logs

        <ExerciseLogTable />
        <div> New Log</div>
        <ExerciseLogEntryForm />
        <div></div>
    </div>
}