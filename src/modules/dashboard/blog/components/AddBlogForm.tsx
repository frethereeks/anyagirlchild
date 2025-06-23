import { createBlog, updateBlog } from '@/app/action'
import { fileUpload } from '@/lib'
import { useAppDispatch } from '@/lib/features/hooks'
import { triggerModal } from '@/lib/features/reducers/siteSlice'
import { TBlogItemProp } from '@/types'
import { $Enums } from '@prisma/client'
import { Form, Input, notification } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { GrArticle } from 'react-icons/gr'
// import { Editor } from '@tinymce/tinymce-react';
// import { Editor as TinyMCEEditor } from 'tinymce';
import RichTextEditor from 'rich-text-editor'


export default function AddBlogForm({ data }: { data: TBlogItemProp | undefined }) {
    const [form] = Form.useForm<TBlogItemProp>()
    const [loading, setLoading] = useState<boolean>(false)
    const [newImage, setNewImage] = useState<boolean>(false)
    // const editorRef = useRef<TinyMCEEditor | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null)
    const statusRef = useRef<HTMLSelectElement | null>(null)
    const [image, setImage] = useState<{ name: string, value: string }>({
        name: "Click to Upload Image",
        value: ""
    })
    const router = useRouter()
    const dispatch = useAppDispatch()

    // const log = () => {
    //     if (editorRef.current) {
    //         const value = editorRef?.current?.getContent()
    //         console.log({value});
    //     }
    // };

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                id: data?.id,
                title: data?.title,
                text: data?.text,
                // category: data?.category,
                image: "",
                status: data.status,
            })
            setImage((prev) => ({ ...prev, value: data?.image ?? "" }))
            // if (categoryRef.current) categoryRef.current.value = data?.categoryId
            if (statusRef.current) statusRef.current.value = data?.status
        }
        else {
            form.resetFields()
            if (imageRef.current) imageRef.current.value = ""
        }

        return () => {
            setImage(prev => ({ ...prev, value: "" }))
        }
    }, [data, form])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const file = e?.target?.files![0]
        setImage((prev) => ({ ...prev, name: file.name }))
        const data = await fileUpload(file) as unknown as string
        form.setFieldValue("image", file)
        setImage(prev => ({ ...prev, value: data }))
        setLoading(false)
        setNewImage(true)
    }

    const handleSubmit = async (values: TBlogItemProp) => {
        notification.info({ message: `Please wait while your request is being processed...`, key: "123" })
        setLoading(true)
        let res;
        try {
            const formData = new FormData()
            Object.entries(values).map(([key, value]) => {
                if (key === "id" || key === "text" || key === "status") return false;
                formData.append(key, value as string)
            })
            formData.append("id", data?.id as string)
            formData.append("status", statusRef?.current?.value as string)
            formData.append("newImage", newImage as unknown as string)
            // formData.append("text", editorRef?.current?.getContent() as unknown as string)

            if (data?.id || values.id) {
                res = await updateBlog(formData)
            }
            else {
                res = await createBlog(formData)
            }
            if (res?.error) notification.error({ message: res?.message, key: "123" })
            else {
                notification.success({ message: res?.message, key: "123" })
                router.refresh()
                form.resetFields()
                dispatch(triggerModal({ id: undefined, open: false }))
            }
        } catch (error) {
            console.log('error', error)
            notification.error({ message: `Something went wrong. Please check your internet connection and try again.`, key: "123" })
        } finally {
            setLoading(false)
        }
    }

    // const handleEditorChange = React.useCallback((json: RemirrorJSON) => {
    //     // Store the JSON in localStorage
    //     console.log({ json })
    //     setEditorContent(JSON.stringify(json))
    // }, []);


    return (
        <>
            <Form
                form={form}
                onFinish={handleSubmit}
                className={`w-full max-w-xl flex-1 flex flex-col gap-4 overflow-hidden`}
            >
                <h4 className="text-sm md:text-lg font-bold text-text p-4 border-l-4 border-secondary py-2">Create Blog Post</h4>
                <div className="flex flex-col gap-1">
                    <h4 className="w-full text-base pt-4 text-text font-semibold flex items-center gap-2">Cover Picture: <span className="text-xs">({image.name})</span></h4>
                    <Form.Item<TBlogItemProp> name="image" noStyle>
                        <label htmlFor='image' className="relative flex-1 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer">
                            <input ref={imageRef} type="file" onChange={handleFileUpload} name="image" id="image" accept='image/jpeg, image/png' className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer z-20" />
                            <div className="flex-1 relative h-20 md:h-44 w-full rounded-md overflow-hidden bg-text flex-shrink-0">
                                {image.value && <Image src={image?.value} alt={"Preview Image"} className="object-cover object-top" fill />}
                            </div>
                        </label>
                    </Form.Item>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="w-[10rem] text-sm text-text font-semibold">Blog Title:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        {/* <Form.Item<TBlogItemProp> name="title" noStyle className='flex-1' initialValue={data?.firstname}> */}
                        <Form.Item<TBlogItemProp> name="title" noStyle className='flex-1'>
                            <Input style={{ background: "transparent" }} type='text' placeholder={`Blog Title (make it catchy)`} required className='border border-background bg-white rounded-sm p-3' />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="w-[10rem] text-sm text-text font-semibold">Visibility:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2">
                        <Form.Item<TBlogItemProp> name="status" noStyle className='flex-1'>
                            <select ref={statusRef} name="status" id="status" className="border border-text/50 rounded-md text-xs text-text w-full py-2 px-4 bg-white">
                                {
                                    Object.entries($Enums.ViewStatus).map(([key, value]) => (
                                        <option key={key} value={value} className="text-xs text-text font-semibold bg-white px-4">{key}</option>
                                    ))
                                }
                            </select>
                        </Form.Item>
                    </div>
                </div>
                {/* <div className="flex flex-col gap-1 h-[315px]">
                    <h4 className="text-sm text-text font-semibold">Blog Content:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2 relative h-[250px] border border-background">
                        <Form.Item<TBlogItemProp> name="text" noStyle className='flex-1 relative h-[250px]'>
                            <ReactQuill
                                defaultValue={value}
                                onChange={(value) => {
                                    form.setFieldValue("text", value)
                                    setValue(value)
                                }}
                                placeholder="Write a well-detailed and elaborative information about the post"
                                style={{ height: '250px' }}
                                className='w-full h-full absolute left-0 top-0 rounded-md text-sm text-slate-700' theme="snow" />
                        </Form.Item>
                    </div>
                </div> */}
                <div className="flex flex-col gap-1 h-[400px]">
                    <h4 className="text-sm text-text font-semibold">Blog Content:</h4>
                    <div className="flex-1 flex flex-col md:flex-row gap-2 relative h-[400px] border border-background">
                        <Form.Item<TBlogItemProp> name="text" noStyle className='flex-1 relative h-[400px]'>
                            <div className="flex flex-col">
                                <RichTextEditor 
                                    key={"qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"}
                                    lang='EN'
                                    allowedFileTypes={["image/jpg", "image/jpeg", "image/png"]}
                                    initialValue={data?.text ?? ""}
                                    onValueChange={richText => console.log({ richText })}
                                    className='w-full h-full'
                                />
                                {/* <Editor
                                    apiKey='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc'
                                    onInit={(_evt: any, editor: TinyMCEEditor | null) => editorRef.current = editor}
                                    initialValue={data?.text ?? ""}
                                    // ref={editorRef}
                                    init={{
                                        height: 400,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family: Helvetica,Arial,sans-serif; font-size: 14px }'
                                    }}
                                    onGetContent={e => {
                                        e.content = e.content.replace(/<p>\s*(<div.*?>.*?<\/div>)\s*<\/p>/g, '$1');
                                    }}
                                /> */}
                                {/* <button type="button" className="button bg-secondary py-2 w-max" onClick={log}>Log editor content</button> */}
                            </div>
                        </Form.Item>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button disabled={loading} className="button bg-danger font-semibold flex items-center gap-2">
                        {loading ? <span className='animate-spin border-2 border-white border-r-transparent rounded-full h-5 w-5 grid place-items-center'></span> : <GrArticle />}
                        {loading ? 'Processing...' : data ? 'Edit Post' : 'Create Post'}
                    </button>
                </div>
            </Form>
        </>
    )
}


{/*
    
    // import { BoldExtension, ItalicExtension, UnderlineExtension } from 'remirror/extensions';
// import type { RemirrorJSON } from 'remirror';
// // import { OnChangeJSON } from '@remirror/react';
// import { Remirror, useRemirror, OnChangeJSON } from '@remirror/react';
// import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';

// // const extensions = () => [new BoldExtension(), new ItalicExtension(), new UnderlineExtension()];


// const Editor = ({ onChange }: { onChange: (json: RemirrorJSON) => void }) => {
//     const { manager, state } = useRemirror({
//         // extensions,
//         content: '<p>Hi <strong>Friend</strong></p>',
//         stringHandler: 'html',
//         selection: 'end',
//     });

//     return (
//         <Remirror manager={manager} initialContent={state}>
//             <OnChangeJSON onChange={onChange} />
//         </Remirror>
//     );
// };

    <div className="flex flex-col gap-1 h-[315px]">
    <h4 className="text-sm text-text font-semibold">Blog Content:</h4>
    <div className="flex-1 flex flex-col md:flex-row gap-2 relative h-[250px] border border-background">
        <Form.Item<TBlogItemProp> name="text" noStyle className='flex-1 relative h-[250px]'>
            <Editor onChange={handleEditorChange}/>
        </Form.Item>
    </div>
</div>
<div className="flex flex-col gap-1">
    <h4 className="w-[10rem] text-sm text-text font-semibold">Text:</h4>
    <div className='h-[230px] mb-2 relative'>
        <WysiwygEditor />
    </div>
</div> */}