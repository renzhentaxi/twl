"use client"

import { useState } from "react"

function IntegerInput({ id }: { id: string }) {
    const [value, setValue] = useState(1);

    return <input id={id} type="number" required value={value}
        onChange={(e) => {
            e.preventDefault()
            const asInt = parseInt(e.target.value);
            if (!isNaN(asInt)) { setValue(asInt) }
            else {
                setValue(0)
            }
        }
        }></input>
}

type Suggestion = {
    display: string;
    value: string;
}
interface InputWithSuggestionProps {
    id: string;
    label: string;
    suggestions: string[];
}

function InputWithSuggestion(props: InputWithSuggestionProps) {
    const [value, setValue] = useState<string>();
    return <>
        <label htmlFor={props.id}>{props.label}</label>
        <input id={props.id} type="text" value={value} onChange={(e) => setValue(e.target.value)}></input>

        {/* only show suggestion if field is not filled */}

        {!value &&
            <div className="flex gap-2 col-span-2 justify-left flex-wrap">
                {props.suggestions.map(suggestion => <button key={suggestion} className="bg-slate-400 p-2 rounded-md  flex-grow"
                    onClick={() => setValue(suggestion)}
                >{suggestion}</button>)}
            </div>

        }
    </>
}

export function ExerciseLogEntryForm() {
    return <div className="grid grid-cols-2 gap-2 bg-slate-300 p-2">

        <InputWithSuggestion label="Exercise:" suggestions={["Pull Up", "Dip", "Pec Fly Machine", "Barbell Bicep Curl"]} id="exercise" />
        <InputWithSuggestion label="Weight:" id="weight" suggestions={["5", "20", "30"]} />
        <InputWithSuggestion label="Rep:" id="rep" suggestions={["8", "10", "12", "14", "40", "20"]} />

        <button>Back</button>
        <button>Done</button>
    </div>
}