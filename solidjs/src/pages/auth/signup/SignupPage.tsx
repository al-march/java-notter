import { Component } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import { Link } from 'solid-app-router';
import { PagesPathEnum } from '@root/src/pages/pages.type';

export const SignupPage: Component = (props) => {
    return (
        <Page full>
            <div class="hero h-full bg-base-200">
                <div class="flex-col hero-content max-w-3xl lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Signup now!</h1>
                        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" class="input input-bordered"/>
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" class="input input-bordered"/>
                                <label class="label">
                                    <Link href={`/${PagesPathEnum.SIGNIN}`} class="label-text-alt link link-hover">Уже зарегистрированы?</Link>
                                </label>
                            </div>
                            <div class="form-control mt-6">
                                <button class="btn btn-primary">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};