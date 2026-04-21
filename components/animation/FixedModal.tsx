"use client"

import { motion,AnimatePresence } from "framer-motion"
type ModalProps={
    isOpen:boolean,
    onClose:()=>void,
    children:React.ReactNode
}
export default function FixedModal({isOpen,onClose,children}:ModalProps) {
  return (
    <AnimatePresence>
        {isOpen&&(
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.25}}
            onClick={onClose}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
                <motion.div 
                initial={{ scale: 0.85, y: -40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: -40 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md"
                onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  )
}
