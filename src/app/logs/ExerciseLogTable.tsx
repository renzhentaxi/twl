"use client"
import { groupBy, map } from 'lodash'
import { useState } from "react"

interface ExerciseLogTableProps {

}

type ExerciseEntry = {
    id: number;
    exercise: string;
    date: string;
    weight: number;
    reps: number;
}
interface EntryRowProps {
    entry: ExerciseEntry;
    dayRowSpan: number;
    exerciseRowSpan: number;
}

function EntryRow(props: EntryRowProps) {
    return <tr>
        {
            props.dayRowSpan > 0 && <td rowSpan={props.dayRowSpan} className='align-top border-2 p-2'>{props.entry.date}</td>
        }
        {
            props.exerciseRowSpan > 0 && <td rowSpan={props.exerciseRowSpan} className='align-top  border-2 p-2'>{props.entry.exercise}</td>
        }
        <td className='border-2 p-2'>{props.entry.reps} x {props.entry.weight} lb</td>
    </tr>
}

export function ExerciseLogTable(props: ExerciseLogTableProps) {
    const data: ExerciseEntry[] = [
        { exercise: "Pull Up", id: 0, weight: 150, reps: 5, date: "6/24/2023" },
        { exercise: "Pull Up", id: 4, weight: 150, reps: 50, date: "6/24/2023" },
        { exercise: "Pec Fly Machine", id: 10, weight: 150, reps: 50, date: "6/24/2023" },
        { exercise: "Pec Fly Machine", id: 2, weight: 150, reps: 10, date: "6/24/2023" },
        { exercise: "Pull Up", id: 6, weight: 150, reps: 10, date: "6/28/2023" },
        { exercise: "Pull Up", id: 12, weight: 150, reps: 10, date: "6/25/2023" },
    ]
    const byDate = groupBy(data, entry => entry.date);
    const byDateAndExericse: Record<string, Record<string, ExerciseEntry[]>> = {}
    for (const [date, entries] of Object.entries(byDate)) {
        byDateAndExericse[date] = groupBy(entries, entry => entry.exercise)
    }
    const processedData: any[] = [];
    for (const byExercise of Object.values(byDateAndExericse)) {
        let dayRowSpan = 0;
        for (const entries of Object.values(byExercise)) {
            const exerciseRowSpan = entries.length;
            dayRowSpan += exerciseRowSpan;
            for (const entry of entries) {
                processedData.push({
                    entry,
                    dayRowSpan: 0,
                    exerciseRowSpan: 0
                })
            }
            const exerciseHead = processedData[processedData.length - exerciseRowSpan];
            exerciseHead.exerciseRowSpan = exerciseRowSpan;
        }
        const dayRowHead = processedData[processedData.length - dayRowSpan];
        dayRowHead.dayRowSpan = dayRowSpan;
    }

    return <div className='flex'>
        <table className='bg-slate-100 w-full mx-2'>
            <thead>
                <tr className='bg-slate-300'>
                    <th className='text-left p-1'>Date</th>
                    <th className='text-left p-1'>Exercise</th>
                    <th className='text-left p-1'>Rep x Weight</th>
                </tr>
            </thead>
            <tbody>
                {processedData.map((data) => <EntryRow key={data.entry.id} entry={data.entry} dayRowSpan={data.dayRowSpan} exerciseRowSpan={data.exerciseRowSpan} />)}
            </tbody>
        </table>
    </div>

}