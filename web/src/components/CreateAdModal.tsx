import { FormEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CaretDown, Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios'

import { Input } from './Form/Input'
import { FieldMessage } from './Form/FieldMessage'

import 'react-toastify/dist/ReactToastify.css'

interface Game {
  id: string
  name: string
}

interface FormInputs {
  game: any
  name: string
  yearsPlaying: string
  discord: string
  hoursStart: string
  hoursEnd: string
  useVoiceChannel: boolean
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [gameSelected, setGameSelected] = useState({ value: '', error: '' })
  const [weekDays, setWeekDays] = useState({ value: [] as string[], error: '' })
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>()

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  const clearInputForm = () => {
    setGameSelected({ value: '', error: '' })
    setWeekDays({ value: [], error: '' })
    setUseVoiceChannel(false)

    reset({
      discord: '',
      game: '',
      hoursEnd: '',
      hoursStart: '',
      name: '',
      useVoiceChannel: false,
      yearsPlaying: '',
    })
  }

  const handleCreateAd: SubmitHandler<FormInputs> = async data => {
    console.log(data)

    if (!gameSelected.value || weekDays.value.length === 0) {
      !gameSelected.value &&
        setGameSelected({ ...gameSelected, error: 'Escolha o game' })
      weekDays.value.length === 0 &&
        setWeekDays({ ...weekDays, error: 'Selecione no m??nimo 1 dia' })
      return
    }

    const ad = {
      name: data.name,
      yearsPlaying: +data.yearsPlaying,
      discord: data.discord,
      weekDays: weekDays.value.map(Number),
      hoursStart: data.hoursStart,
      hoursEnd: data.hoursEnd,
      useVoiceChannel,
    }

    try {
      await axios.post(
        `http://localhost:3333/games/${gameSelected.value}/ads`,
        ad
      )

      toast.success('Cadastrado com Sucesso!', { theme: 'colored' })
      clearInputForm()
    } catch (error: any) {
      toast.error(`Ops! ${error?.message}`, { theme: 'colored' })
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!gameSelected.value) {
      setGameSelected({ ...gameSelected, error: 'Escolha o game' })
    }

    if (weekDays.value.length === 0) {
      setWeekDays({ ...weekDays, error: 'Selecione no m??nimo 1 dia' })
    }

    handleSubmit(handleCreateAd).call(event)
  }

  return (
    <Dialog.Portal>
      <ToastContainer />
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="bg-[#2A2634] py-8 px-10 text-white fixed top-0 right-0 w-screen h-screen md:w-[480px] overflow-y-auto shadow-lg shadow-black/25 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-[#2A2634]">
        <Dialog.Title className="text-3xl font-black">
          Publique um an??ncio
        </Dialog.Title>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <Select.Root
              onValueChange={text =>
                setGameSelected({ value: text, error: '' })
              }
            >
              <Select.Trigger
                aria-label="Games"
                className={`flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm ${
                  gameSelected.value ? 'text-white' : 'text-zinc-500'
                }`}
              >
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown size={20} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-zinc-900 py-3 px-4 rounded text-sm overflow-hidden text-white">
                  <Select.SelectViewport>
                    {games.map(game => (
                      <Select.Item
                        key={game.id}
                        value={game.id}
                        className={`py-2 ${
                          game.id === gameSelected.value && 'text-violet-400'
                        }`}
                      >
                        <Select.ItemText>{game.name}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.SelectViewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            {gameSelected.error && <FieldMessage text={gameSelected.error} />}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Seu nome ou nickname
            </label>
            <Input
              register={register('name', { required: true })}
              id="name"
              placeholder={'Como te chamam dentro do game?'}
            />
            {errors.name?.type === 'required' && (
              <FieldMessage text="Preencha este campo" />
            )}
          </div>

          <div className="flex flex-col md:grid grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">
                Joga a quantos anos?
              </label>

              <Input
                register={register('yearsPlaying', {
                  required: {
                    value: true,
                    message: 'Informe o seu tempo de jogo',
                  },
                  max: { value: 99, message: 'entre 0 - 20' },
                })}
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO!"
              />
              {errors.yearsPlaying && (
                <FieldMessage text={errors.yearsPlaying?.message} />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">
                Qual seu Discord?
              </label>
              <Input
                register={register('discord', { required: true })}
                name="discord"
                id="discord"
                placeholder="Usuario#000"
              />
              {errors.discord?.type === 'required' && (
                <FieldMessage text="Informe seu Discord" />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays" className="font-semibold">
                  Quando costuma jogar?
                </label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-5 md:grid-cols-7 gap-2"
                  value={weekDays.value}
                  onValueChange={value => setWeekDays({ value, error: '' })}
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-12 h-12 rounded ${
                      weekDays.value.includes('0')
                        ? 'bg-violet-500'
                        : 'bg-zinc-900'
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-12 h-12 rounded ${
                      weekDays.value.includes('1')
                        ? 'bg-violet-500'
                        : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Ter??a"
                    className={`w-12 h-12 rounded ${
                      weekDays.value.includes('2')
                        ? 'bg-violet-500'
                        : 'bg-zinc-900'
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-12 h-12 rounded ${
                      weekDays.value.includes('3')
                        ? 'bg-violet-500'
                        : 'bg-zinc-900'
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-12 h-12 rounded ${
                      weekDays.value.includes('4')
                        ? 'bg-violet-500'
                        : 'bg-zinc-900'
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-12 h-12 rounded ${
                      weekDays.value.includes('5')
                        ? 'bg-violet-500'
                        : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="S??bado"
                    className={`w-12 h-12 rounded ${
                      weekDays.value.includes('6')
                        ? 'bg-violet-500'
                        : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              {weekDays.error && <FieldMessage text={weekDays.error} />}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hoursStart" className="font-semibold">
                Qual hor??rio do dia?
              </label>
              <div className="flex gap-4">
                <div className="flex flex-col flex-1 gap-2">
                  <Input
                    register={register('hoursStart', { required: true })}
                    type="time"
                    name="hoursStart"
                    id="hoursStart"
                    placeholder="De"
                  />
                  {errors.hoursStart?.type === 'required' && (
                    <FieldMessage text="Hora de in??cio" />
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <Input
                    register={register('hoursEnd', { required: true })}
                    type="time"
                    name="hoursEnd"
                    id="hoursEnd"
                    placeholder="At??"
                  />
                  {errors.hoursEnd?.type === 'required' && (
                    <FieldMessage text="Hora de parar" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              onCheckedChange={check =>
                check === true
                  ? setUseVoiceChannel(true)
                  : setUseVoiceChannel(false)
              }
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check weight="bold" className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex flex-col md:flex-row justify-end gap-4">
            <Dialog.Close
              type="reset"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors"
              onClick={clearInputForm}
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center justify-center gap-3 hover:bg-violet-600 transition-colors"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
