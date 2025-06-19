import { MisVisProps } from "@/types";
import { LuTelescope } from "react-icons/lu";
import { PiBinocularsBold } from "react-icons/pi";

export const missionVisionData: MisVisProps[] = [
    {
        id: "2z82lop4z70",
        title: "Mission Statement",
        icon: <PiBinocularsBold className='text-2xl md:text-4xl text-white -rotate-45' />,
        description: "Anya Girlchild Foundation is committed to providing access to education, mentorship, advocacy, and holistic development opportunities for girls from underprivileged backgrounds. Our programs bring out-of-school girls back into education, nurture talent, and equip girls with the skills to overcome barriers and inspire change.",
    },
    {
        id: "2z82lop4z71",
        title: "Vision Statement",
        icon: <LuTelescope className='text-2xl md:text-4xl text-white -rotate-45' />,
        description: "To build a society where every girl, regardless of her background or circumstances, is empowered with education, moral guidance, and mentorship, allowing her to realize her full potential and contribute meaningfully to her community and society at large.",
    },
]