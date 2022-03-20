import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import locales from '../const/locales.mjs';
import { FlagIcon } from 'react-flag-kit';

const getCountryCode = (locale) => (locale !== 'en' ? locale.toUpperCase() : 'GB');

export const LangSwitch = () => {
    const { locale, asPath, push } = useRouter();
    return (
        <Listbox value={locale} onChange={(newLocale) => push(asPath, undefined, { locale: newLocale })}>
            <div className="relative">
                <Listbox.Button className="relative w-17 py-1 md:py-2 pl-2 md:pl-3 pr-8 md:pr-10 text-left bg-gray-800 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                        <FlagIcon code={getCountryCode(locale)} className="w-6 h-6 inline" />
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-1 md:pr-2 pointer-events-none">
                        <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-50 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {locales.map((option, i) => (
                            <Listbox.Option
                                key={i}
                                className={({ active }) =>
                                    `${active ? 'bg-red' : ''}
                              cursor-default select-none relative py-2 sm:py-1 text-center hover:bg-gray-200 cursor-pointer`
                                }
                                value={option}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span className="block truncate">
                                            <FlagIcon code={getCountryCode(option)} className="w-6 h-6 inline" />
                                        </span>
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};
