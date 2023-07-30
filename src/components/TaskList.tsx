import { TopButtonMenu } from "./TopButtonMenu"
import { useAuth } from "./auth";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { ListItem } from "./ListItem";
import type { Database } from '../../types/supabase'

type Row = Database['public']['Tables']['todos']['Row'];

export const TaskList = () => {
    const { user } = useAuth();
    const [taskList, setTaskList] = useState<Row[]>([]);
    const [errorHasOccured, setErrorHasOccured] = useState<string | null>(null);

    const getTasksFromSupabase = useCallback(async () => {
        const {
            data: todos,
            error } = await supabase
                .from('todos')
                .select('*')
                .order('id', { ascending: false });

        if (error) {
            setErrorHasOccured(error.message);
            return;
        }

        console.log(todos);

        setTaskList(todos);
    }, []);


    useEffect(() => {
        getTasksFromSupabase();
    }, [getTasksFromSupabase]);

    const addTask = async () => {
        const { data, error } = await supabase
            .from('todos')
            .insert([{ user_id: user?.id, task: 'To do...' }])
            .select()

        if (error) {
            setErrorHasOccured(error.message);
            return;
        }

        console.log(data);

        if (data && data[0]) {
            setTaskList(oldArray => [...oldArray, data[0]]);
        }
    };

    const onDelete = async (id: number) => {
        setTaskList(oldArray => oldArray.filter(task => task.id !== id));
    };

    return (
        <>
            {errorHasOccured && (
                <div className="alert alert-error m-10 fixed top-5 z-10 w-1/4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{errorHasOccured}</span>
                </div>
            )
            }

            <h1>To do</h1>
            <div className='absolute right-5 top-5'>
                <TopButtonMenu />
            </div>
            <div className="text-sm text-purple mt-3 mb-3 label">Welcome <span className={"underline"}>{user?.email}</span></div>
            <div className="card text-align-left">
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Change font to jetbrains</span>
                        <input type="checkbox" className="ml-5 checkbox checkbox-primary" defaultChecked={true} />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Integrate supabase</span>
                        <input type="checkbox" className="ml-5 checkbox checkbox-primary" defaultChecked={true} />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Add login</span>
                        <input type="checkbox" className="ml-5 checkbox checkbox-primary" defaultChecked={true} />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Add input debounce </span>
                        <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Read / Write to-do's to supabase</span>
                        <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Create lemonsqueezy shop</span>
                        <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Integrate lemonsqueezy license key paywall</span>
                        <input type="checkbox" className="ml-5 checkbox checkbox-primary" />
                    </label>
                    {
                        <>
                            {taskList.map((task) => (
                                <ListItem task={task} key={task.id} onDelete={onDelete} />
                            ))}
                        </>
                    }
                    <button className='mt-10 w-16 h-16 rounded-full bottom-0 m-auto center' onClick={addTask}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>
            <div>
            </div>
        </>
    )
}