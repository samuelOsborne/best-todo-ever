import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Database } from "../../types/supabase";
import { supabase } from "../services/supabase";

type Row = Database['public']['Tables']['todos']['Row'];

export interface ListItemProps {
    task: Row;
    onDelete: (id: number) => void;
}

/** Notes:
 * - ListItem is a component that renders a single task
 * - ListItem just needs to update the task value, not create it and send to supabase
 */

export const ListItem = (props: ListItemProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [inputValue, setInputValue] = useState(props.task.task);
    const [debouncedValue] = useDebounce(inputValue, 1000);

    const handleCheckboxChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
            setIsChecked(event.target.checked)

            console.log("Sending checkbox to supabase")

            // Update the task with the same id
            const { data, error } = await supabase
                .from('todos')
                .update({ is_complete: event.target.checked })
                .eq('id', props.task.id)
                .select()

            if (error) console.log(error)
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;

        setInputValue(value);
    };

    const sendInputToSupabase = useCallback(async (input: string | null) => {
        console.log("Sending input to supabase")

        // Update the task with the same id
        const { data, error } = await supabase
            .from('todos')
            .update({ task: input })
            .eq('id', props.task.id)
            .select()

        if (error) console.log(error)

    }, [props.task.id]);

    useEffect(() => {
        // check if editing a task or creating a new one
        if (debouncedValue && debouncedValue === props.task.task) return;
        sendInputToSupabase(debouncedValue);

    }, [debouncedValue, props.task.task, sendInputToSupabase])

    const deleteItem = async () => {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', props.task.id);

        if (error) {
            console.log(error);
        }

        props.onDelete(props.task.id);
    };

    return (
        <>
            <label className="label items-center">
                <div onClick={deleteItem} className="cursor-pointer mr-5" style={{ height: 15 }}>
                    <svg style={{ width: "100%", height: '100%' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </div>
                <textarea
                    className="cursor-pointer textarea textarea-ghost textarea-xs w-full max-w-xs overflow-y-auto scrollbar-hide"
                    placeholder={inputValue ?? 'To do...'}
                    value={inputValue ?? ''} onChange={handleInputChange}>
                    {props.task.task}
                </textarea>
                <input type="checkbox"
                    className="ml-5 checkbox checkbox-primary"
                    checked={props.task.is_complete ? props.task.is_complete : isChecked}
                    onChange={handleCheckboxChange} />
            </label>
        </>
    )
}