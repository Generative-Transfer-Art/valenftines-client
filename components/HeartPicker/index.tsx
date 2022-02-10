import styles from './HeartPicker.module.scss'
import * as Hearts from 'components/Heart'
import { useCallback, useState } from 'react'
import HeartPickerModal from 'components/HeartPickerModal'
import SendTo from 'components/SendTo'

interface HeartPickerProps{
    heart1: number;
    heart2: number;
    heart3: number;
    setToAddress: (account: string) => void;
    setHeart1: (heartType: number) => void;
    setHeart2: (heartType: number) => void;
    setHeart3: (heartType: number) => void;
}

export default function HeartPicker({heart1, heart2, heart3, setToAddress, setHeart1, setHeart2, setHeart3}: HeartPickerProps) {
    const [presentHeartPicker, setPresentHeartPicker] = useState<boolean>(false)
    const [selectedHeart, setSelectedHeart] = useState<number>(0)
    const [addressGetterOpen, setAddressGetterOpen] = useState(false)

    const setHeart = useCallback((heartType) => {
        if(selectedHeart == 1) {
            setHeart1(heartType)
        } else if(selectedHeart == 2) {
            setHeart2(heartType)
        } else {
            setHeart3(heartType)
        }
        setPresentHeartPicker(false)
        console.log('here')
      }, [selectedHeart])

    const present = useCallback((id) => {
        setSelectedHeart(id)
        setPresentHeartPicker(true)
    }, [selectedHeart, presentHeartPicker])

    return(
        <div>
            { presentHeartPicker ? <HeartPickerModal selectHeart={(h) => setHeart(h)} /> : '' }
            {addressGetterOpen && <SendTo close={() => setAddressGetterOpen(false)} saveAddress={setToAddress} />}
            <div className={styles.heartsWrapper}>
                <div className={styles.sendFromHeart}><Hearts.AddressHeart address={'0x00'} /></div>
                <div className={styles.sendToHeart} onClick={() => setAddressGetterOpen(true)} ><Hearts.SendToHeart /></div>
                
                <div className={styles.heart1} onClick={() => present(1)}>
                    {heart1 == 0 ? <Hearts.SelectMessageHeart /> : <Hearts.TextHeart heartType={heart1}/> }
                </div>
                <div className={styles.heart2} onClick={() => present(2)}>
                    {heart2 == 0 ? <Hearts.SelectMessageHeart /> : <Hearts.TextHeart heartType={heart2}/> }
                </div>
                <div className={styles.heart3} onClick={() => present(3)}>
                    {heart3 == 0 ? <Hearts.SelectMessageHeart /> : <Hearts.TextHeart heartType={heart3}/> }
                </div>
            </div>
        </div>
    )
}