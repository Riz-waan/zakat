export type settingsPageInput = {
    logout: () => void
}

export type KVDataStore = {
    password: string,
    zakatDate: string,
    history: NetWorthHistory[],
    accounts: (Cash | Account | Commodity)[],
    currentId: number
}

type NetWorthHistory = {
    year: string
    networth: number
}

type Cash = {
    type: 'Cash',
    uniqueId: number,
    currency: string,
    value: number
}

type Account = {
    type: 'Investment' | 'Checking' | 'Savings',
    uniqueId: number,
    bank: string,
    accessToken: string
}

type Commodity = {
    type: 'Gold' | 'Silver'
    valueInGrams: number,
    uniqueId: number
}

export type SettingsAPIReturn = {
    type: 'Investment' | 'Checking' | 'Savings' | 'Cash' | 'Gold' | 'Silver',
    account: string,
    value: number,
    uniqueId: number
}