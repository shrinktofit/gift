declare module "cc.core" {
    export namespace renderer {
        export function createIA(device: any, data: any): any;
        export const addStage: (name: any) => void;
        /**
         * @hidden
         */
        export enum RenderQueue {
            OPAQUE = 0,
            TRANSPARENT = 1,
            OVERLAY = 2
        }
        export enum PassStage {
            DEFAULT = 1,
            FORWARD = 2,
            SHADOWCAST = 4
        }
        export function getDefaultFromType(type: GFXType): keyof number[] | "default-texture" | "default-cube-texture";
        export function assignDefines(target: IDefineMap, source: IDefineMap): boolean;
        export const genHandle: (bt: GFXBindingType, binding: number, type: GFXType, offset?: number) => number;
        export const getBindingTypeFromHandle: (handle: number) => number;
        export const getTypeFromHandle: (handle: number) => number;
        export const getBindingFromHandle: (handle: number) => number;
        export const getOffsetFromHandle: (handle: number) => number;
        export const customizeType: (handle: number, type: GFXType) => number;
        export type MaterialProperty = number | math.Vec2 | math.Vec3 | math.Vec4 | math.Color | math.Mat3 | math.Mat4 | math.Quat;
        export const type2reader: {
            0: (a: Float32Array, v: any, idx?: number) => void;
            5: (a: Float32Array, v: any, idx?: number) => number;
            6: (a: Float32Array, v: any, idx?: number) => any;
            7: (a: Float32Array, v: any, idx?: number) => any;
            8: (a: Float32Array, v: any, idx?: number) => any;
            13: (a: Float32Array, v: any, idx?: number) => number;
            14: (a: Float32Array, v: any, idx?: number) => any;
            15: (a: Float32Array, v: any, idx?: number) => any;
            16: (a: Float32Array, v: any, idx?: number) => any;
            21: (a: Float32Array, v: any, idx?: number) => any;
            25: (a: Float32Array, v: any, idx?: number) => any;
        };
        export const type2writer: {
            0: (a: Float32Array, v: any, idx?: number) => void;
            5: (a: Float32Array, v: any, idx?: number) => any;
            6: (a: Float32Array, v: any, idx?: number) => Float32Array;
            7: (a: Float32Array, v: any, idx?: number) => Float32Array;
            8: (a: Float32Array, v: any, idx?: number) => Float32Array;
            13: (a: Float32Array, v: any, idx?: number) => any;
            14: (a: Float32Array, v: any, idx?: number) => Float32Array;
            15: (a: Float32Array, v: any, idx?: number) => Float32Array;
            16: (a: Float32Array, v: any, idx?: number) => Float32Array;
            21: (a: Float32Array, v: any, idx?: number) => Float32Array;
            25: (a: Float32Array, v: any, idx?: number) => Float32Array;
        };
        export interface IDefineMap {
            [name: string]: number | boolean | string;
        }
        export interface IPassInfoFull extends __private.cocos_core_assets_effect_asset_IPassInfo {
            idxInTech: number;
            defines: IDefineMap;
            stateOverrides?: PassOverrides;
        }
        export type PassOverrides = __private.RecursivePartial<__private.cocos_core_assets_effect_asset_IPassStates>;
        export interface IBlock {
            view: Float32Array;
            dirty: boolean;
        }
        export interface IMacroPatch {
            name: string;
            value: boolean | number | string;
        }
        export interface IPassResources {
            bindingLayout: GFXBindingLayout;
            pipelineLayout: GFXPipelineLayout;
            pipelineState: GFXPipelineState;
        }
        export interface IPassDynamics {
            [type: number]: {
                dirty: boolean;
                value: number[];
            };
        }
        export interface IPSOHashInfo {
            program: string;
            defines: IDefineMap;
            stage: RenderPassStage;
            primitive: GFXPrimitiveMode;
            rasterizerState: GFXRasterizerState;
            depthStencilState: GFXDepthStencilState;
            blendState: GFXBlendState;
            dynamicStates: GFXDynamicState[];
        }
        /**
         * @zh
         * 渲染 pass，储存实际描述绘制过程的各项资源。
         */
        export class Pass {
            /**
             * @zh
             * 根据 handle 获取 unform 的绑定类型（UBO 或贴图等）。
             */
            static getBindingTypeFromHandle: (handle: number) => number;
            /**
             * @zh
             * 根据 handle 获取 UBO member 的具体类型。
             */
            static getTypeFromHandle: (handle: number) => number;
            /**
             * @zh
             * 根据 handle 获取 binding。
             */
            static getBindingFromHandle: (handle: number) => number;
            static fillinPipelineInfo(target: Pass, info: PassOverrides): void;
            /**
             * @zh
             * 根据指定 PSO 信息计算 hash
             * @param psoInfo 用于计算 PSO hash 的最小必要信息
             */
            static getPSOHash(psoInfo: IPSOHashInfo): number;
            protected static getOffsetFromHandle: (handle: number) => number;
            protected _buffers: Record<number, GFXBuffer>;
            protected _samplers: Record<number, GFXSampler>;
            protected _textureViews: Record<number, GFXTextureView>;
            protected _resources: IPassResources[];
            protected _phase: number;
            protected _idxInTech: number;
            protected _programName: string;
            protected _priority: __private.cocos_core_pipeline_define_RenderPriority;
            protected _primitive: GFXPrimitiveMode;
            protected _stage: RenderPassStage;
            protected _bindings: IGFXBinding[];
            protected _inputState: GFXInputState;
            protected _bs: GFXBlendState;
            protected _dss: GFXDepthStencilState;
            protected _rs: GFXRasterizerState;
            protected _dynamicStates: GFXDynamicState[];
            protected _dynamics: IPassDynamics;
            protected _customizations: string[];
            protected _handleMap: Record<string, number>;
            protected _blocks: IBlock[];
            protected _shaderInfo: IProgramInfo;
            protected _defines: IDefineMap;
            protected _properties: Record<string, __private.cocos_core_assets_effect_asset_IPropertyInfo>;
            protected _hash: number;
            protected _device: GFXDevice;
            protected _renderPass: GFXRenderPass | null;
            protected _shader: GFXShader | null;
            protected _batchedBuffer: __private.cocos_core_pipeline_batched_buffer_BatchedBuffer | null;
            protected _instancedBuffer: __private.cocos_core_pipeline_instanced_buffer_InstancedBuffer | null;
            constructor(device: GFXDevice);
            /**
             * @zh
             * 根据指定参数初始化当前 pass，shader 会在这一阶段就尝试编译。
             */
            initialize(info: IPassInfoFull): void;
            /**
             * @en
             * Get the handle of a UBO member, or specific channels of it.
             * @zh
             * 获取指定 UBO 成员，或其更具体分量的读写句柄。默认以成员自身的类型为目标读写类型（即读写时必须传入与成员类型相同的变量）。
             * @param name Name of the target UBO member.
             * @param offset Channel offset into the member.
             * @param targetType Target type of the handle, i.e. the type of data when read/write to it.
             * @example
             * ```
             * // say 'pbrParams' is a uniform vec4
             * const hParams = pass.getHandle('pbrParams'); // get the default handle
             * pass.setUniform(hAlbedo, cc.v3(1, 0, 0)); // wrong! pbrParams.w is NaN now
             *
             * // say 'albedoScale' is a uniform vec4, and we only want to modify the w component in the form of a single float
             * const hThreshold = pass.getHandle('albedoScale', 3, cc.GFXType.FLOAT);
             * pass.setUniform(hThreshold, 0.5); // now, albedoScale.w = 0.5
             * ```
             */
            getHandle(name: string, offset?: number, targetType?: GFXType): number | undefined;
            /**
             * @zh
             * 获取指定 uniform 的 binding。
             * @param name 目标 uniform 名。
             */
            getBinding(name: string): number | undefined;
            /**
             * @zh
             * 设置指定普通向量类 uniform 的值，如果需要频繁更新请尽量使用此接口。
             * @param handle 目标 uniform 的 handle。
             * @param value 目标值。
             */
            setUniform(handle: number, value: MaterialProperty): void;
            /**
             * @zh
             * 获取指定普通向量类 uniform 的值。
             * @param handle 目标 uniform 的 handle。
             * @param out 输出向量。
             */
            getUniform(handle: number, out: MaterialProperty): any;
            /**
             * @zh
             * 设置指定数组类 uniform 的值，如果需要频繁更新请尽量使用此接口。
             * @param handle 目标 uniform 的 handle。
             * @param value 目标值。
             */
            setUniformArray(handle: number, value: MaterialProperty[]): void;
            /**
             * @zh
             * 绑定实际 [[GFXBuffer]] 到指定 binding。
             * @param binding 目标 UBO 的 binding。
             * @param value 目标 buffer。
             */
            bindBuffer(binding: number, value: GFXBuffer): void;
            /**
             * @zh
             * 绑定实际 [[GFXTextureView]] 到指定 binding。
             * @param binding 目标贴图类 uniform 的 binding。
             * @param value 目标 texture view。
             */
            bindTextureView(binding: number, value: GFXTextureView): void;
            /**
             * @zh
             * 绑定实际 [[GFXSampler]] 到指定 binding。
             * @param binding 目标贴图类 uniform 的 binding。
             * @param value 目标 sampler。
             */
            bindSampler(binding: number, value: GFXSampler): void;
            /**
             * @zh
             * 设置运行时 pass 内可动态更新的管线状态属性。
             * @param state 目标管线状态。
             * @param value 目标值。
             */
            setDynamicState(state: GFXDynamicState, value: any): void;
            /**
             * @zh
             * 重载当前所有管线状态。
             * @param original 原始管线状态。
             * @param value 管线状态重载值。
             */
            overridePipelineStates(original: __private.cocos_core_assets_effect_asset_IPassInfo, overrides: PassOverrides): void;
            /**
             * @zh
             * 更新当前 Uniform 数据。
             */
            update(): void;
            /**
             * @zh
             * 销毁当前 pass。
             */
            destroy(): void;
            /**
             * @zh
             * 重置指定（非数组） Uniform  为 Effect 默认值。
             */
            resetUniform(name: string): void;
            /**
             * @zh
             * 重置指定贴图为 Effect 默认值。
             */
            resetTexture(name: string): void;
            /**
             * @zh
             * 重置所有 UBO 为默认值。
             */
            resetUBOs(): void;
            /**
             * @zh
             * 重置所有 texture 和 sampler 为初始默认值。
             */
            resetTextures(): void;
            /**
             * @zh
             * 尝试编译 shader 并获取相关资源引用。
             * @param defineOverrides shader 预处理宏定义重载
             */
            tryCompile(): boolean | null;
            /**
             * @zh
             * 根据当前 pass 持有的信息创建 [[GFXPipelineState]]。
             */
            createPipelineState(patches?: IMacroPatch[]): GFXPipelineState | null;
            /**
             * @zh
             * 销毁指定的 [[GFXPipelineState]]，如果它是这个 pass 创建的。
             */
            destroyPipelineState(pipelineStates: GFXPipelineState): void;
            beginChangeStatesSilently(): void;
            endChangeStatesSilently(): void;
            protected _doInit(info: IPassInfoFull, copyDefines?: boolean): void;
            protected _dynamicBatchingSync(): void;
            protected _getShaderWithBuiltinMacroPatches(patches: IMacroPatch[]): IShaderResources | null;
            get priority(): __private.cocos_core_pipeline_define_RenderPriority;
            get primitive(): GFXPrimitiveMode;
            get stage(): RenderPassStage;
            get inputState(): GFXInputState;
            get rasterizerState(): GFXRasterizerState;
            get depthStencilState(): GFXDepthStencilState;
            get blendState(): GFXBlendState;
            get dynamicStates(): GFXDynamicState[];
            get customizations(): string[];
            get phase(): number;
            get device(): GFXDevice;
            get shaderInfo(): IProgramInfo;
            get program(): string;
            get properties(): Record<string, __private.cocos_core_assets_effect_asset_IPropertyInfo>;
            get defines(): IDefineMap;
            get idxInTech(): number;
            get bindings(): IGFXBinding[];
            get shader(): GFXShader;
            get renderPass(): GFXRenderPass;
            get dynamics(): IPassDynamics;
            get batchedBuffer(): __private.cocos_core_pipeline_batched_buffer_BatchedBuffer | null;
            get instancedBuffer(): __private.cocos_core_pipeline_instanced_buffer_InstancedBuffer | null;
            get blocks(): IBlock[];
            get hash(): number;
        }
        export interface IDefineRecord extends __private.cocos_core_assets_effect_asset_IDefineInfo {
            _map: (value: any) => number;
            _offset: number;
        }
        export interface IBlockInfoRT extends __private.cocos_core_assets_effect_asset_IBlockInfo, IGFXBinding {
            size: number;
        }
        export interface ISamplerInfoRT extends __private.cocos_core_assets_effect_asset_ISamplerInfo, IGFXBinding {
        }
        export interface IProgramInfo extends __private.cocos_core_assets_effect_asset_IShaderInfo {
            blocks: IBlockInfoRT[];
            samplers: ISamplerInfoRT[];
            defines: IDefineRecord[];
            handleMap: Record<string, number>;
            offsets: number[][];
            globalsInited: boolean;
            localsInited: boolean;
            uber: boolean;
        }
        export interface IMacroInfo {
            name: string;
            value: string;
            isDefault: boolean;
        }
        export interface IShaderResources {
            shader: GFXShader;
            bindings: IGFXBinding[];
            inputState: GFXInputState;
        }
        /**
         * @zh
         * 维护 shader 资源实例的全局管理器。
         */
        export class ProgramLib {
            protected _templates: Record<string, IProgramInfo>;
            protected _cache: Record<string, IShaderResources>;
            constructor();
            /**
             * @zh
             * 根据 effect 信息注册 shader 模板。
             */
            define(prog: __private.cocos_core_assets_effect_asset_IShaderInfo): void;
            getTemplate(name: string): IProgramInfo;
            /**
             * @en
             * Does this library has the specified program?
             * @zh
             * 当前是否有已注册的指定名字的 shader？
             * @param name 目标 shader 名
             */
            hasProgram(name: string): boolean;
            /**
             * @zh
             * 根据 shader 名和预处理宏列表获取 shader key。
             * @param name 目标 shader 名
             * @param defines 目标预处理宏列表
             */
            getKey(name: string, defines: IDefineMap): string;
            /**
             * @zh
             * 销毁所有完全满足指定预处理宏特征的 shader 实例。
             * @param defines 用于筛选的预处理宏列表
             */
            destroyShaderByDefines(defines: IDefineMap): void;
            /**
             * @zh
             * 获取指定 shader 的渲染资源实例
             * @param device 渲染设备 [[GFXDevice]]
             * @param name shader 名字
             * @param defines 预处理宏列表
             * @param pipeline 实际渲染命令执行时所属的 [[RenderPipeline]]
             */
            getGFXShader(device: GFXDevice, name: string, defines: IDefineMap, pipeline: RenderPipeline): IShaderResources;
        }
        export const programLib: ProgramLib;
        export function genSamplerHash(info: Array<number | undefined>): number;
        export enum SamplerInfoIndex {
            minFilter = 0,
            magFilter = 1,
            mipFilter = 2,
            addressU = 3,
            addressV = 4,
            addressW = 5,
            maxAnisotropy = 6,
            cmpFunc = 7,
            minLOD = 8,
            maxLOD = 9,
            mipLODBias = 10,
            total = 11
        }
        /**
         * @zh
         * 维护 sampler 资源实例的全局管理器。
         */
        export class SamplerLib {
            protected _cache: Record<number, GFXSampler>;
            /**
             * @zh
             * 获取指定属性的 sampler 资源。
             * @param device 渲染设备 [GFXDevice]
             * @param info 目标 sampler 属性
             */
            getSampler(device: GFXDevice, hash: number): GFXSampler;
        }
        export const samplerLib: SamplerLib;
        export function nearestPOT(num: number): number;
        export interface ITextureBuffer {
            texture: GFXTexture;
            texView: GFXTextureView;
            size: number;
            start: number;
            end: number;
        }
        export interface ITextureBufferHandle {
            chunkIdx: number;
            start: number;
            end: number;
            texture: GFXTexture;
            texView: GFXTextureView;
        }
        export interface ITextureBufferPoolInfo {
            format: GFXFormat;
            inOrderFree?: boolean;
            alignment?: number;
            roundUpFn?: (size: number, formatSize: number) => number;
        }
        export class TextureBufferPool {
            constructor(device: GFXDevice);
            initialize(info: ITextureBufferPoolInfo): void;
            destroy(): void;
            alloc(size: number, chunkIdx?: number): ITextureBufferHandle;
            free(handle: ITextureBufferHandle): void;
            createChunk(length: number): number;
            update(handle: ITextureBufferHandle, buffer: ArrayBuffer): void;
        }
        export interface IMaterialInstanceInfo {
            parent: Material;
            owner?: RenderableComponent;
            subModelIdx?: number;
        }
        /**
         * @zh
         * 材质实例，当有材质修改需求时，根据材质资源创建的，可任意定制的实例。
         */
        export class MaterialInstance extends Material {
            get parent(): Material;
            get owner(): RenderableComponent | null;
            protected _passes: PassInstance[];
            constructor(info: IMaterialInstanceInfo);
            recompileShaders(overrides: IDefineMap, passIdx?: number): void;
            overridePipelineStates(overrides: any, passIdx?: number): void;
            destroy(): boolean;
            onPassStateChange(dontNotify: boolean): void;
            protected _createPasses(): PassInstance[];
        }
        export class PassInstance extends Pass {
            get parent(): Pass;
            constructor(parent: Pass, owner: MaterialInstance);
            overridePipelineStates(original: __private.cocos_core_assets_effect_asset_IPassInfo, overrides: PassOverrides): void;
            tryCompile(defineOverrides?: IDefineMap): boolean | null;
            beginChangeStatesSilently(): void;
            endChangeStatesSilently(): void;
            protected _dynamicBatchingSync(): void;
            protected _onStateChange(): void;
        }
        export function selectJointsMediumFormat(device: GFXDevice): GFXFormat;
        function uploadJointDataLBS(out: Float32Array, base: number, mat: math.Mat4, firstBone: boolean): void;
        export const uploadJointData: typeof uploadJointDataLBS;
        export const MINIMUM_JOINT_TEXTURE_SIZE: number;
        export const jointTextureSamplerHash: number;
        export interface IJointTextureHandle {
            pixelOffset: number;
            refCount: number;
            clipHash: number;
            skeletonHash: number;
            readyToBeDeleted: boolean;
            handle: ITextureBufferHandle;
            bounds: Map<number, geometry.aabb[]>;
        }
        export interface IChunkContent {
            skeleton: number;
            clips: number[];
        }
        export interface ICustomJointTextureLayout {
            textureLength: number;
            contents: IChunkContent[];
        }
        export class JointTexturePool {
            get pixelsPerJoint(): number;
            constructor(device: GFXDevice);
            clear(): void;
            registerCustomTextureLayouts(layouts: ICustomJointTextureLayout[]): void;
            /**
             * @en
             * Get joint texture for the default pose.
             * @zh
             * 获取默认姿势的骨骼贴图。
             */
            getDefaultPoseTexture(skeleton: Skeleton, mesh: Mesh, skinningRoot: Node): IJointTextureHandle | null;
            /**
             * @en
             * Get joint texture for the specified animation clip.
             * @zh
             * 获取指定动画片段的骨骼贴图。
             */
            getSequencePoseTexture(skeleton: Skeleton, clip: AnimationClip, mesh: Mesh, skinningRoot: Node): IJointTextureHandle | null;
            releaseHandle(handle: IJointTextureHandle): void;
            releaseSkeleton(skeleton: Skeleton): void;
            releaseAnimationClip(clip: AnimationClip): void;
        }
        export interface IAnimInfo {
            buffer: GFXBuffer;
            data: Float32Array;
            dirty: boolean;
        }
        export class JointAnimationInfo {
            constructor(device: GFXDevice);
            getData(nodeID?: string): IAnimInfo;
            destroy(nodeID: string): void;
            switchClip(info: IAnimInfo, clip: AnimationClip | null): IAnimInfo;
            clear(): void;
        }
        export function getWorldMatrix(transform: IJointTransform | null, stamp: number): Readonly<math.Mat4>;
        export function getTransform(node: Node, root: Node): IJointTransform | null;
        export function deleteTransform(node: Node): void;
        export interface IJointTransform {
            node: Node;
            local: math.Mat4;
            world: math.Mat4;
            stamp: number;
            parent: IJointTransform | null;
        }
        /**
         * @en
         * The skinning model that is using real-time pose calculation.
         * @zh
         * 实时计算动画的蒙皮模型。
         */
        export class SkinningModel extends __private.cocos_core_renderer_models_morph_model_MorphModel {
            uploadAnimation: null;
            constructor();
            destroy(): void;
            bindSkeleton(skeleton?: Skeleton | null, skinningRoot?: Node | null, mesh?: Mesh | null): void;
            updateTransform(stamp: number): void;
            updateUBOs(stamp: number): boolean;
            initSubModel(idx: number, subMeshData: __private.cocos_core_assets_mesh_RenderingSubMesh, mat: Material): void;
            protected createPipelineState(pass: Pass, subModelIdx: number, patches?: IMacroPatch[]): any;
        }
        /**
         * @en
         * The skinning model that is using baked animation.
         * @zh
         * 预烘焙动画的蒙皮模型。
         */
        export class BakedSkinningModel extends __private.cocos_core_renderer_models_morph_model_MorphModel {
            uploadedAnim: AnimationClip | null | undefined;
            constructor();
            destroy(): void;
            bindSkeleton(skeleton?: Skeleton | null, skinningRoot?: Node | null, mesh?: Mesh | null): void;
            updateTransform(stamp: number): void;
            updateUBOs(stamp: number): boolean;
            createBoundingShape(minPos?: math.Vec3, maxPos?: math.Vec3): void;
            uploadAnimation(anim: AnimationClip | null): void;
            protected _applyJointTexture(texture?: IJointTextureHandle | null): void;
            protected createPipelineState(pass: Pass, subModelIdx: number, patches?: IMacroPatch[]): any;
            protected updateInstancedAttributeList(pso: GFXPipelineState, pass: Pass): void;
        }
        export class Ambient {
            static SUN_ILLUM: number;
            static SKY_ILLUM: number;
            set enabled(val: boolean);
            get enabled(): boolean;
            get skyColor(): Float32Array;
            set skyColor(color: Float32Array);
            set skyIllum(illum: number);
            get skyIllum(): number;
            get groundAlbedo(): Float32Array;
            set groundAlbedo(color: Float32Array);
            protected _enabled: boolean;
            protected _skyColor: Float32Array;
            protected _skyIllum: number;
            protected _groundAlbedo: Float32Array;
            protected _scene: RenderScene;
            constructor(scene: RenderScene);
            update(): void;
        }
        export enum CameraFOVAxis {
            VERTICAL = 0,
            HORIZONTAL = 1
        }
        export enum CameraProjection {
            ORTHO = 0,
            PERSPECTIVE = 1
        }
        export enum CameraAperture {
            F1_8 = 0,
            F2_0 = 1,
            F2_2 = 2,
            F2_5 = 3,
            F2_8 = 4,
            F3_2 = 5,
            F3_5 = 6,
            F4_0 = 7,
            F4_5 = 8,
            F5_0 = 9,
            F5_6 = 10,
            F6_3 = 11,
            F7_1 = 12,
            F8_0 = 13,
            F9_0 = 14,
            F10_0 = 15,
            F11_0 = 16,
            F13_0 = 17,
            F14_0 = 18,
            F16_0 = 19,
            F18_0 = 20,
            F20_0 = 21,
            F22_0 = 22
        }
        export enum CameraISO {
            ISO100 = 0,
            ISO200 = 1,
            ISO400 = 2,
            ISO800 = 3
        }
        export enum CameraShutter {
            D1 = 0,
            D2 = 1,
            D4 = 2,
            D8 = 3,
            D15 = 4,
            D30 = 5,
            D60 = 6,
            D125 = 7,
            D250 = 8,
            D500 = 9,
            D1000 = 10,
            D2000 = 11,
            D4000 = 12
        }
        export interface ICameraInfo {
            name: string;
            node: Node;
            projection: number;
            targetDisplay?: number;
            window?: GFXWindow | null;
            priority: number;
            pipeline?: string;
            flows?: string[];
        }
        export const SKYBOX_FLAG: number;
        export class Camera {
            isWindowSize: boolean;
            screenScale: number;
            viewport: math.Rect;
            clearStencil: number;
            clearDepth: number;
            clearFlag: GFXClearFlag;
            constructor();
            initialize(info: ICameraInfo): void;
            destroy(): void;
            attachToScene(scene: RenderScene): void;
            detachFromScene(): void;
            resize(width: number, height: number): void;
            setFixedSize(width: number, height: number): void;
            update(forceUpdate?: boolean): void;
            getSplitFrustum(out: geometry.frustum, nearClip: number, farClip: number): void;
            set node(val: Node);
            get node(): Node;
            set enabled(val: boolean);
            get enabled(): boolean;
            get view(): RenderView;
            set orthoHeight(val: number);
            get orthoHeight(): number;
            set projectionType(val: CameraProjection);
            get projectionType(): CameraProjection;
            set fovAxis(axis: CameraFOVAxis);
            get fovAxis(): CameraFOVAxis;
            set fov(fov: number);
            get fov(): number;
            set nearClip(nearClip: number);
            get nearClip(): number;
            set farClip(farClip: number);
            get farClip(): number;
            set clearColor(val: IGFXColor);
            get clearColor(): IGFXColor;
            get scene(): RenderScene | null;
            get name(): string | null;
            get width(): number;
            get height(): number;
            get aspect(): number;
            set matView(val: math.Mat4);
            get matView(): math.Mat4;
            set matViewInv(val: math.Mat4 | null);
            get matViewInv(): math.Mat4 | null;
            set matProj(val: math.Mat4);
            get matProj(): math.Mat4;
            set matProjInv(val: math.Mat4);
            get matProjInv(): math.Mat4;
            set matViewProj(val: math.Mat4);
            get matViewProj(): math.Mat4;
            set matViewProjInv(val: math.Mat4);
            get matViewProjInv(): math.Mat4;
            set frustum(val: geometry.frustum);
            get frustum(): geometry.frustum;
            set forward(val: math.Vec3);
            get forward(): math.Vec3;
            set position(val: math.Vec3);
            get position(): math.Vec3;
            set visibility(vis: number);
            get visibility(): number;
            get priority(): number;
            set priority(val: number);
            set aperture(val: CameraAperture);
            get aperture(): CameraAperture;
            get apertureValue(): number;
            set shutter(val: CameraShutter);
            get shutter(): CameraShutter;
            get shutterValue(): number;
            set iso(val: CameraISO);
            get iso(): CameraISO;
            get isoValue(): number;
            set ec(val: number);
            get ec(): number;
            get exposure(): number;
            set flows(val: string[]);
            changeTargetWindow(window?: GFXWindow | null): void;
            /**
             * transform a screen position to a world space ray
             */
            screenPointToRay(out: geometry.ray, x: number, y: number): geometry.ray;
            /**
             * transform a screen position to world space
             */
            screenToWorld(out: math.Vec3, screenPos: math.Vec3): math.Vec3;
            /**
             * transform a world space position to screen space
             */
            worldToScreen(out: math.Vec3, worldPos: math.Vec3): math.Vec3;
        }
        export const CameraVisFlags: {};
        export const VisibilityFlags: {};
        export class DirectionalLight extends Light {
            protected _dir: math.Vec3;
            protected _illum: number;
            set direction(dir: math.Vec3);
            get direction(): math.Vec3;
            set illuminance(illum: number);
            get illuminance(): number;
            constructor();
            update(): void;
        }
        export function ColorTemperatureToRGB(rgb: math.Vec3, kelvin: number): void;
        export enum LightType {
            DIRECTIONAL = 0,
            SPHERE = 1,
            SPOT = 2,
            UNKNOWN = 3
        }
        export const nt2lm: (size: number) => number;
        export class Light {
            set color(color: math.Vec3);
            get color(): math.Vec3;
            set useColorTemperature(enable: boolean);
            get useColorTemperature(): boolean;
            set colorTemperature(val: number);
            get colorTemperature(): number;
            get colorTemperatureRGB(): math.Vec3;
            set node(n: Node | null);
            get node(): Node | null;
            get type(): LightType;
            get name(): string | null;
            get scene(): RenderScene | null;
            protected _color: math.Vec3;
            protected _useColorTemp: boolean;
            protected _colorTemp: number;
            protected _colorTempRGB: math.Vec3;
            protected _scene: RenderScene | null;
            protected _node: Node | null;
            protected _type: LightType;
            protected _name: string | null;
            constructor();
            initialize(name: string, node: Node): void;
            attachToScene(scene: RenderScene): void;
            detachFromScene(): void;
            destroy(): void;
            update(): void;
        }
        export interface IInstancedAttribute {
            name: string;
            format: GFXFormat;
            isNormalized?: boolean;
            view: ArrayBufferView;
        }
        export interface IInstancedAttributeBlock {
            buffer: Uint8Array;
            list: IInstancedAttribute[];
        }
        export enum ModelType {
            DEFAULT = 0,
            SKINNING = 1,
            BAKED_SKINNING = 2,
            UI_BATCH = 3,
            PARTICLE_BATCH = 4,
            LINE = 5
        }
        /**
         * A representation of a model
         */
        export class Model {
            get subModels(): SubModel[];
            get subModelNum(): number;
            get inited(): boolean;
            get worldBounds(): geometry.aabb | null;
            get modelBounds(): geometry.aabb | null;
            get lightBuffer(): GFXBuffer | null;
            get localBuffer(): GFXBuffer | null;
            get updateStamp(): number;
            type: ModelType;
            scene: RenderScene | null;
            node: Node;
            transform: Node;
            enabled: boolean;
            visFlags: number;
            castShadow: boolean;
            isDynamicBatching: boolean;
            instancedAttributes: IInstancedAttributeBlock;
            protected _device: GFXDevice;
            protected _worldBounds: geometry.aabb | null;
            protected _modelBounds: geometry.aabb | null;
            protected _subModels: SubModel[];
            protected _implantPSOs: GFXPipelineState[];
            protected _matPSORecord: Map<Material, GFXPipelineState[]>;
            protected _matRefCount: Map<Material, number>;
            protected _localData: Float32Array;
            protected _localBuffer: GFXBuffer | null;
            protected _lightBuffer: GFXBuffer | null;
            protected _inited: boolean;
            protected _updateStamp: number;
            protected _transformUpdated: boolean;
            /**
             * Setup a default empty model
             */
            constructor();
            initialize(node: Node): void;
            destroy(): void;
            attachToScene(scene: RenderScene): void;
            detachFromScene(): void;
            getSubModel(idx: number): SubModel;
            updateTransform(stamp: number): void;
            updateUBOs(stamp: number): void;
            /**
             * Create the bounding shape of this model
             * @param minPos the min position of the model
             * @param maxPos the max position of the model
             */
            createBoundingShape(minPos?: math.Vec3, maxPos?: math.Vec3): void;
            initSubModel(idx: number, subMeshData: __private.cocos_core_assets_mesh_RenderingSubMesh, mat: Material): void;
            setSubModelMesh(idx: number, subMeshData: __private.cocos_core_assets_mesh_RenderingSubMesh): void;
            setSubModelMaterial(idx: number, mat: Material | null): void;
            onGlobalPipelineStateChanged(): void;
            insertImplantPSO(pso: GFXPipelineState): void;
            removeImplantPSO(pso: GFXPipelineState): void;
            protected createPipelineStates(mat: Material, subModelIdx: number): GFXPipelineState[];
            protected destroyPipelineStates(mat: Material, pso: GFXPipelineState[]): void;
            protected createPipelineState(pass: Pass, subModelIdx: number, patches?: IMacroPatch[]): GFXPipelineState;
            protected updateInstancedAttributeList(pso: GFXPipelineState, pass: Pass): void;
            protected getInstancedAttributeIndex(name: string): number;
            protected initLocalBindings(mat: Material | null): void;
        }
        export interface IShadowRenderData {
            psos: GFXPipelineState[];
            cmdBuffer: GFXCommandBuffer;
        }
        export class PlanarShadows {
            set enabled(enable: boolean);
            get enabled(): boolean;
            set normal(val: math.Vec3);
            get normal(): math.Vec3;
            set distance(val: number);
            get distance(): number;
            set shadowColor(color: math.Color);
            get matLight(): math.Mat4;
            get data(): Float32Array;
            get cmdBuffs(): memop.CachedArray<GFXCommandBuffer>;
            get cmdBuffCount(): number;
            protected _scene: RenderScene;
            protected _enabled: boolean;
            protected _normal: math.Vec3;
            protected _distance: number;
            protected _matLight: math.Mat4;
            protected _data: Float32Array;
            protected _globalBindings: __private.cocos_core_pipeline_define_IInternalBindingInst;
            protected _cmdBuffs: memop.CachedArray<GFXCommandBuffer>;
            protected _cmdBuffCount: number;
            protected _record: Map<Model, IShadowRenderData>;
            protected _material: Material;
            constructor(scene: RenderScene);
            updateSphereLight(light: SphereLight): void;
            updateDirLight(light: DirectionalLight): void;
            updateCommandBuffers(frstm: geometry.frustum, stamp: number): void;
            createShadowData(model: Model): IShadowRenderData;
            destroyShadowData(model: Model): void;
            onGlobalPipelineStateChanged(): void;
            destroy(): void;
        }
        export interface IRenderSceneInfo {
            name: string;
        }
        export interface ISceneNodeInfo {
            name: string;
            isStatic?: boolean;
        }
        export interface IRaycastResult {
            node: Node;
            distance: number;
        }
        export class RenderScene {
            get root(): __private.cocos_core_root_Root;
            get name(): string;
            get cameras(): Camera[];
            get ambient(): Ambient;
            get skybox(): Skybox;
            get planarShadows(): PlanarShadows;
            get mainLight(): DirectionalLight | null;
            get sphereLights(): SphereLight[];
            get spotLights(): SpotLight[];
            get models(): Model[];
            get rayResultCanvas(): IRaycastResult[];
            get rayResultModels(): IRaycastResult[];
            get rayResultAll(): IRaycastResult[];
            get rayResultSingleModel(): IRaycastResult[];
            static registerCreateFunc(root: __private.cocos_core_root_Root): void;
            constructor(root: __private.cocos_core_root_Root);
            initialize(info: IRenderSceneInfo): boolean;
            destroy(): void;
            addCamera(cam: Camera): void;
            removeCamera(camera: Camera): void;
            removeCameras(): void;
            setMainLight(dl: DirectionalLight): void;
            unsetMainLight(dl: DirectionalLight): void;
            addSphereLight(pl: SphereLight): void;
            removeSphereLight(pl: SphereLight): void;
            addSpotLight(sl: SpotLight): void;
            removeSpotLight(sl: SpotLight): void;
            removeSphereLights(): void;
            removeSpotLights(): void;
            addModel(m: Model): void;
            removeModel(model: Model): void;
            removeModels(): void;
            onGlobalPipelineStateChanged(): void;
            generateModelId(): number;
            /**
             * @en
             * Cast a ray into the scene, record all the intersected models and ui2d nodes in the result array
             * @param worldRay the testing ray
             * @param mask the layer mask to filter the models
             * @param distance the max distance , Infinity by default
             * @returns boolean , ray is hit or not
             * @note getter of this.rayResultAll can get recently result
             * @zh
             * 传入一条射线检测场景中所有的 3D 模型和 UI2D Node
             * @param worldRay 世界射线
             * @param mask mask 用于标记所有要检测的层，默认为 Default | UI2D
             * @param distance 射线检测的最大距离, 默认为 Infinity
             * @returns boolean , 射线是否有击中
             * @note 通过 this.rayResultAll 可以获取到最近的结果
             */
            raycastAll(worldRay: geometry.ray, mask?: number, distance?: number): boolean;
            /**
             * @en
             * Cast a ray into the scene, record all the intersected models in the result array
             * @param worldRay the testing ray
             * @param mask the layer mask to filter the models
             * @param distance the max distance , Infinity by default
             * @returns boolean , ray is hit or not
             * @note getter of this.rayResultModels can get recently result
             * @zh
             * 传入一条射线检测场景中所有的 3D 模型。
             * @param worldRay 世界射线
             * @param mask 用于标记所有要检测的层，默认为 Default
             * @param distance 射线检测的最大距离, 默认为 Infinity
             * @returns boolean , 射线是否有击中
             * @note 通过 this.rayResultModels 可以获取到最近的结果
             */
            raycastAllModels(worldRay: geometry.ray, mask?: number, distance?: number): boolean;
            /**
             * @en
             * Before you raycast the model, make sure the model is not null
             * @param worldRay the testing ray
             * @param model the testing model
             * @param mask the layer mask to filter the models
             * @param distance the max distance , Infinity by default
             * @returns boolean , ray is hit or not
             * @zh
             * 传入一条射线和一个 3D 模型进行射线检测。
             * @param worldRay 世界射线
             * @param model 进行检测的模型
             * @param mask 用于标记所有要检测的层，默认为 Default
             * @param distance 射线检测的最大距离, 默认为 Infinity
             * @returns boolean , 射线是否有击中
             */
            raycastSingleModel(worldRay: geometry.ray, model: Model, mask?: number, distance?: number): boolean;
            /**
             * @en
             * Cast a ray into the scene, detect all canvas and its children
             * @param worldRay the testing ray
             * @param mask the layer mask to filter all ui2d aabb
             * @param distance the max distance , Infinity by default
             * @returns boolean , ray is hit or not
             * @note getter of this.rayResultCanvas can get recently result
             * @zh
             * 传入一条射线检测场景中所有的 Canvas 以及 Canvas 下的 Node
             * @param worldRay 世界射线
             * @param mask 用于标记所有要检测的层，默认为 UI_2D
             * @param distance 射线检测的最大距离, 默认为 Infinity
             * @returns boolean , 射线是否有击中
             * @note 通过 this.rayResultCanvas 可以获取到最近的结果
             */
            raycastAllCanvas(worldRay: geometry.ray, mask?: number, distance?: number): boolean;
        }
        export class Skybox extends Model {
            set useIBL(val: boolean);
            get useIBL(): boolean;
            set isRGBE(val: boolean);
            get isRGBE(): boolean;
            set envmap(val: TextureCube | null);
            get envmap(): TextureCube | null;
            protected _default: TextureCube;
            protected _envmap: TextureCube;
            protected _isRGBE: boolean;
            protected _useIBL: boolean;
            protected _globalBinding: __private.cocos_core_pipeline_define_IInternalBindingInst;
            constructor(scene: RenderScene);
            protected _updatePipeline(): void;
            protected _updateGlobalBinding(): void;
        }
        export class SphereLight extends Light {
            protected _needUpdate: boolean;
            get position(): math.Vec3;
            set size(size: number);
            get size(): number;
            set range(range: number);
            get range(): number;
            set luminance(lum: number);
            get luminance(): number;
            get aabb(): geometry.aabb;
            protected _size: number;
            protected _range: number;
            protected _luminance: number;
            protected _pos: math.Vec3;
            protected _aabb: geometry.aabb;
            constructor();
            update(): void;
        }
        export class SpotLight extends Light {
            protected _dir: math.Vec3;
            protected _size: number;
            protected _range: number;
            protected _luminance: number;
            protected _spotAngle: number;
            protected _pos: math.Vec3;
            protected _aabb: geometry.aabb;
            protected _frustum: geometry.frustum;
            protected _angle: number;
            protected _needUpdate: boolean;
            get position(): math.Vec3;
            set size(size: number);
            get size(): number;
            set range(range: number);
            get range(): number;
            set luminance(lum: number);
            get luminance(): number;
            get direction(): math.Vec3;
            get spotAngle(): number;
            set spotAngle(val: number);
            get aabb(): geometry.aabb;
            get frustum(): geometry.frustum;
            constructor();
            update(): void;
        }
        export class SubModel {
            priority: __private.cocos_core_pipeline_define_RenderPriority;
            protected _psos: GFXPipelineState[] | null;
            protected _subMeshObject: __private.cocos_core_assets_mesh_RenderingSubMesh | null;
            protected _material: Material | null;
            protected _inputAssembler: GFXInputAssembler | null;
            protected _cmdBuffers: GFXCommandBuffer[];
            set psos(val: GFXPipelineState[] | null);
            get psos(): GFXPipelineState[] | null;
            set subMeshData(sm: __private.cocos_core_assets_mesh_RenderingSubMesh);
            get subMeshData(): __private.cocos_core_assets_mesh_RenderingSubMesh;
            set material(material: Material | null);
            get material(): Material | null;
            get passes(): import("cocos/core/renderer").Pass[];
            get inputAssembler(): GFXInputAssembler | null;
            get commandBuffers(): GFXCommandBuffer[];
            initialize(subMesh: __private.cocos_core_assets_mesh_RenderingSubMesh, mat: Material, psos: GFXPipelineState[]): void;
            destroy(): void;
            updateCommandBuffer(): void;
            protected recordCommandBuffer(index: number): void;
        }
        export namespace __private {
            export interface cocos_core_assets_effect_asset_IPassStates {
                priority?: number;
                primitive?: GFXPrimitiveMode;
                stage?: RenderPassStage;
                rasterizerState?: GFXRasterizerState;
                depthStencilState?: GFXDepthStencilState;
                blendState?: GFXBlendState;
                dynamicStates?: GFXDynamicState[];
                customizations?: string[];
                phase?: string | number;
            }
            export interface cocos_core_assets_effect_asset_IPropertyInfo {
                type: number;
                handleInfo?: [string, number, number];
                samplerHash?: number;
                value?: number[] | string;
            }
            export interface cocos_core_assets_effect_asset_IPassInfo extends cocos_core_assets_effect_asset_IPassStates {
                program: string;
                switch?: string;
                properties?: Record<string, cocos_core_assets_effect_asset_IPropertyInfo>;
            }
            export type RecursivePartial<T> = {
                [P in keyof T]?: T[P] extends Array<infer U> ? Array<RecursivePartial<U>> : T[P] extends ReadonlyArray<infer V> ? ReadonlyArray<RecursivePartial<V>> : RecursivePartial<T[P]>;
            };
            /**
             * @zh
             * 渲染优先级。
             */
            export enum cocos_core_pipeline_define_RenderPriority {
                MIN = 0,
                MAX = 255,
                DEFAULT = 128
            }
            export class cocos_core_pipeline_define_UBOLocalBatched {
                static BATCHING_COUNT: number;
                static MAT_WORLDS_OFFSET: number;
                static COUNT: number;
                static SIZE: number;
                static BLOCK: GFXUniformBlock;
                view: Float32Array;
            }
            export interface cocos_core_pipeline_batched_buffer_IBatchedItem {
                vbs: GFXBuffer[];
                vbDatas: Uint8Array[];
                vbIdx: GFXBuffer;
                vbIdxData: Float32Array;
                vbCount: number;
                mergeCount: number;
                ia: GFXInputAssembler;
                ubo: GFXBuffer;
                uboData: cocos_core_pipeline_define_UBOLocalBatched;
                pso: GFXPipelineState;
            }
            /**
             * @zh
             * 渲染对象。
             */
            export interface cocos_core_pipeline_define_IRenderObject {
                model: Model;
                depth: number;
            }
            export class cocos_core_pipeline_batched_buffer_BatchedBuffer {
                batches: cocos_core_pipeline_batched_buffer_IBatchedItem[];
                pass: Pass;
                constructor(pass: Pass);
                destroy(): void;
                merge(subModel: SubModel, ro: cocos_core_pipeline_define_IRenderObject, pso: GFXPipelineState): void;
                clear(): void;
                clearUBO(): void;
            }
            export interface cocos_core_pipeline_instanced_buffer_IInstancedItem {
                count: number;
                capacity: number;
                vb: GFXBuffer;
                data: Uint8Array;
                ia: GFXInputAssembler;
            }
            export class cocos_core_pipeline_instanced_buffer_InstancedBuffer {
                instances: cocos_core_pipeline_instanced_buffer_IInstancedItem[];
                pso: GFXPipelineState | null;
                pass: Pass;
                constructor(pass: Pass);
                destroy(): void;
                merge(subModel: SubModel, attrs: IInstancedAttributeBlock, pso: GFXPipelineState): void;
                uploadBuffers(): void;
                clear(): void;
            }
            export interface cocos_core_assets_effect_asset_IDefineInfo {
                name: string;
                type: string;
                range?: number[];
                options?: string[];
                default?: string;
            }
            export interface cocos_core_assets_effect_asset_IBlockInfo extends GFXUniformBlock {
                defines: string[];
            }
            export interface cocos_core_assets_effect_asset_ISamplerInfo extends GFXUniformSampler {
                defines: string[];
            }
            export interface cocos_core_assets_effect_asset_IBuiltin {
                name: string;
                defines: string[];
            }
            export interface cocos_core_assets_effect_asset_IBuiltinInfo {
                blocks: cocos_core_assets_effect_asset_IBuiltin[];
                samplers: cocos_core_assets_effect_asset_IBuiltin[];
            }
            export interface cocos_core_assets_effect_asset_IAttributeInfo extends IGFXAttribute {
                defines: string[];
            }
            export interface cocos_core_assets_effect_asset_IShaderInfo {
                name: string;
                hash: number;
                glsl3: {
                    vert: string;
                    frag: string;
                };
                glsl1: {
                    vert: string;
                    frag: string;
                };
                builtins: {
                    globals: cocos_core_assets_effect_asset_IBuiltinInfo;
                    locals: cocos_core_assets_effect_asset_IBuiltinInfo;
                };
                defines: cocos_core_assets_effect_asset_IDefineInfo[];
                blocks: cocos_core_assets_effect_asset_IBlockInfo[];
                samplers: cocos_core_assets_effect_asset_ISamplerInfo[];
                attributes: cocos_core_assets_effect_asset_IAttributeInfo[];
            }
            /**
             * 允许存储索引的数组视图。
             */
            export type cocos_core_assets_mesh_IBArray = Uint8Array | Uint16Array | Uint32Array;
            /**
             * 几何信息。
             */
            export interface cocos_core_assets_mesh_IGeometricInfo {
                /**
                 * 顶点位置。
                 */
                positions: Float32Array;
                /**
                 * 索引数据。
                 */
                indices?: cocos_core_assets_mesh_IBArray;
                /**
                 * 是否将图元按双面对待。
                 */
                doubleSided?: boolean;
                /**
                 * 此几何体的轴对齐包围盒。
                 */
                boundingBox: {
                    max: math.Vec3;
                    min: math.Vec3;
                };
            }
            export interface cocos_core_assets_mesh_IFlatBuffer {
                stride: number;
                count: number;
                buffer: Uint8Array;
            }
            /**
             * 渲染子网格。
             */
            export class cocos_core_assets_mesh_RenderingSubMesh {
                /**
                 * 使用的所有顶点缓冲区。
                 */
                vertexBuffers: GFXBuffer[];
                /**
                 * 所有顶点属性。
                 */
                attributes: IGFXAttribute[];
                /**
                 * 图元类型。
                 */
                primitiveMode: GFXPrimitiveMode;
                /**
                 * 使用的索引缓冲区，若未使用则无需指定。
                 */
                indexBuffer?: GFXBuffer;
                /**
                 * 间接绘制缓冲区。
                 */
                indirectBuffer?: GFXBuffer;
                get geometricInfo(): cocos_core_assets_mesh_IGeometricInfo;
                get flatBuffers(): cocos_core_assets_mesh_IFlatBuffer[];
                get jointMappedBuffers(): GFXBuffer[];
                mesh?: Mesh;
                subMeshIdx?: number;
                constructor(vertexBuffers: GFXBuffer[], attributes: IGFXAttribute[], primitiveMode: GFXPrimitiveMode);
                destroy(): void;
                /**
                 * Adds a vertex attribute input called 'a_vertexId' into this sub-mesh.
                 * This is useful if you want to simulate `gl_VertexId` in WebGL context prior to 2.0.
                 * Once you call this function, the vertex attribute is permanently added.
                 * Subsequent calls to this function take no effect.
                 * @param device Device used to create related rendering resources.
                 */
                enableVertexIdChannel(device: GFXDevice): void;
            }
            /**
             * This rendering instance of a morph resource.
             */
            export interface cocos_core_assets_morph_MorphRenderingInstance {
                /**
                 * Sets weights of targets of specified sub mesh.
                 * @param subMeshIndex
                 * @param weights
                 */
                setWeights(subMeshIndex: number, weights: number[]): void;
                /**
                 * Adapts pipeline state to do the rendering.
                 * @param subMeshIndex
                 * @param pipelineState
                 */
                adaptPipelineState(subMeshIndex: number, pipelineState: GFXPipelineState): void;
                requiredPatches(subMeshIndex: number): IMacroPatch[] | undefined;
                /**
                 * Destroy the rendering instance.
                 */
                destroy(): void;
            }
            export class cocos_core_renderer_models_morph_model_MorphModel extends Model {
                protected createPipelineState(pass: Pass, subModelIndex: number, patches?: IMacroPatch[]): any;
                initSubModel(subModelIndex: number, subMeshData: cocos_core_assets_mesh_RenderingSubMesh, material: Material): void;
                setSubModelMaterial(subModelIndex: number, material: Material | null): void;
                setMorphRendering(morphRendering: cocos_core_assets_morph_MorphRenderingInstance): void;
            }
            export interface cocos_core_pipeline_define_IInternalBindingDesc {
                type: GFXBindingType;
                blockInfo?: GFXUniformBlock;
                samplerInfo?: GFXUniformSampler;
                defaultValue?: ArrayBuffer | string;
            }
            export interface cocos_core_pipeline_define_IInternalBindingInst extends cocos_core_pipeline_define_IInternalBindingDesc {
                buffer?: GFXBuffer;
                sampler?: GFXSampler;
                textureView?: GFXTextureView;
            }
            export interface cocos_core_renderer_ui_ui_material_IUIMaterialInfo {
                material: Material;
            }
            export class cocos_core_renderer_ui_ui_material_UIMaterial {
                get material(): Material;
                get pass(): Pass;
                protected _material: Material | null;
                protected _pass: Pass | null;
                constructor();
                initialize(info: cocos_core_renderer_ui_ui_material_IUIMaterialInfo): boolean;
                increase(): number;
                decrease(): number;
                getPipelineState(): GFXPipelineState;
                revertPipelineState(pso: GFXPipelineState): void;
                destroy(): void;
            }
            /**
             * @zh
             * UI 渲染流程
             */
            export class cocos_core_renderer_ui_ui_UI {
                get renderScene(): RenderScene;
                get currBufferBatch(): MeshBuffer | null;
                set currBufferBatch(value: MeshBuffer | null);
                set currStaticRoot(value: UIStaticBatchComponent | null);
                device: GFXDevice;
                constructor(_root: cocos_core_root_Root);
                initialize(): boolean;
                destroy(): void;
                getRenderSceneGetter(): () => any;
                _getUIMaterial(mat: Material): cocos_core_renderer_ui_ui_material_UIMaterial;
                _removeUIMaterial(hash: number): void;
                /**
                 * @en
                 * Add the managed CanvasComponent.
                 *
                 * @zh
                 * 添加屏幕组件管理。
                 *
                 * @param comp - 屏幕组件。
                 */
                addScreen(comp: CanvasComponent): void;
                /**
                 * @en
                 * Get the CanvasComponent by number.
                 *
                 * @zh
                 * 通过屏幕编号获得屏幕组件。
                 *
                 * @param visibility - 屏幕编号。
                 */
                getScreen(visibility: number): CanvasComponent | null;
                /**
                 * @zh
                 * Removes the CanvasComponent from the list.
                 *
                 * @param comp - 被移除的屏幕。
                 */
                removeScreen(comp: CanvasComponent): void;
                update(dt: number): void;
                sortScreens(): void;
                render(): void;
                /**
                 * @en
                 * Render component data submission process of UI.
                 * The submitted vertex data is the UI for world coordinates.
                 * For example: The UI components except Graphics and UIModelComponent.
                 *
                 * @zh
                 * UI 渲染组件数据提交流程（针对提交的顶点数据是世界坐标的提交流程，例如：除 graphics 和 uimodel 的大部分 ui 组件）。
                 * 此处的数据最终会生成需要提交渲染的 model 数据。
                 *
                 * @param comp - 当前执行组件。
                 * @param frame - 当前执行组件贴图。
                 * @param assembler - 当前组件渲染数据组装器。
                 */
                commitComp(comp: UIRenderComponent, frame: GFXTextureView | null | undefined, assembler: any, sampler?: GFXSampler | null): void;
                /**
                 * @en
                 * Render component data submission process of UI.
                 * The submitted vertex data is the UI for local coordinates.
                 * For example: The UI components of Graphics and UIModelComponent.
                 *
                 * @zh
                 * UI 渲染组件数据提交流程（针对例如： graphics 和 uimodel 等数据量较为庞大的 ui 组件）。
                 *
                 * @param comp - 当前执行组件。
                 * @param model - 提交渲染的 model 数据。
                 * @param mat - 提交渲染的材质。
                 */
                commitModel(comp: UIComponent, model: Model | null, mat: Material | null): void;
                /**
                 * @en
                 * Submit separate render data.
                 * This data does not participate in the batch.
                 *
                 * @zh
                 * 提交独立渲染数据.
                 * @param comp 静态组件
                 */
                commitStaticBatch(comp: UIStaticBatchComponent): void;
                /**
                 * @en
                 * End a section of render data and submit according to the batch condition.
                 *
                 * @zh
                 * 根据合批条件，结束一段渲染数据并提交。
                 */
                autoMergeBatches(): void;
                /**
                 * @en
                 * Force changes to current batch data and merge
                 *
                 * @zh
                 * 强行修改当前批次数据并合并。
                 *
                 * @param material - 当前批次的材质。
                 * @param sprite - 当前批次的精灵帧。
                 */
                forceMergeBatches(material: Material, sprite: GFXTextureView | null): void;
                /**
                 * @en
                 * Forced to merge the data of the previous batch to start a new batch.
                 *
                 * @zh
                 * 强制合并上一个批次的数据，开启新一轮合批。
                 */
                finishMergeBatches(): void;
            }
            export class cocos_core_renderer_data_pool_manager_DataPoolManager {
                jointTexturePool: JointTexturePool;
                jointAnimationInfo: JointAnimationInfo;
                constructor(device: GFXDevice);
                releaseSkeleton(skeleton: Skeleton): void;
                releaseAnimationClip(clip: AnimationClip): void;
                clear(): void;
            }
            /**
             * @zh
             * Root描述信息
             */
            export interface cocos_core_root_IRootInfo {
                enableHDR?: boolean;
            }
            /**
             * @zh
             * 渲染视图描述信息。
             */
            export interface cocos_core_pipeline_render_view_IRenderViewInfo {
                camera: Camera;
                name: string;
                priority: number;
                flows?: string[];
            }
            /**
             * @zh
             * Root类
             */
            export class cocos_core_root_Root {
                get device(): GFXDevice;
                get mainWindow(): GFXWindow | null;
                set curWindow(window: GFXWindow | null);
                get curWindow(): GFXWindow | null;
                set tempWindow(window: GFXWindow | null);
                get tempWindow(): GFXWindow | null;
                get windows(): GFXWindow[];
                get pipeline(): RenderPipeline;
                get ui(): cocos_core_renderer_ui_ui_UI;
                get scenes(): RenderScene[];
                get views(): RenderView[];
                get cumulativeTime(): number;
                get frameTime(): number;
                get frameCount(): number;
                get fps(): number;
                set fixedFPS(fps: number);
                get fixedFPS(): number;
                get dataPoolManager(): cocos_core_renderer_data_pool_manager_DataPoolManager;
                _createSceneFun: any;
                _createViewFun: any;
                /**
                 * 构造函数
                 * @param device GFX设备
                 */
                constructor(device: GFXDevice);
                /**
                 * @zh
                 * 初始化函数
                 * @param info Root描述信息
                 */
                initialize(info: cocos_core_root_IRootInfo): boolean;
                destroy(): void;
                /**
                 * @zh
                 * 重置大小
                 * @param width 屏幕宽度
                 * @param height 屏幕高度
                 */
                resize(width: number, height: number): void;
                setRenderPipeline(rppl: RenderPipeline): boolean;
                /**
                 * @zh
                 * 激活指定窗口为当前窗口
                 * @param window GFX窗口
                 */
                activeWindow(window: GFXWindow): void;
                /**
                 * @zh
                 * 重置累计时间
                 */
                resetCumulativeTime(): void;
                /**
                 * @zh
                 * 每帧执行函数
                 * @param deltaTime 间隔时间
                 */
                frameMove(deltaTime: number): void;
                /**
                 * @zh
                 * 创建窗口
                 * @param info GFX窗口描述信息
                 */
                createWindow(info: IGFXWindowInfo): GFXWindow | null;
                /**
                 * @zh
                 * 销毁指定的窗口
                 * @param window GFX窗口
                 */
                destroyWindow(window: GFXWindow): void;
                /**
                 * @zh
                 * 销毁全部窗口
                 */
                destroyWindows(): void;
                /**
                 * @zh
                 * 创建渲染场景
                 * @param info 渲染场景描述信息
                 */
                createScene(info: IRenderSceneInfo): RenderScene;
                /**
                 * @zh
                 * 销毁指定的渲染场景
                 * @param scene 渲染场景
                 */
                destroyScene(scene: RenderScene): void;
                /**
                 * @zh
                 * 销毁全部场景
                 */
                destroyScenes(): void;
                /**
                 * @zh
                 * 创建渲染视图
                 * @param info 渲染视图描述信息
                 */
                createView(info: cocos_core_pipeline_render_view_IRenderViewInfo): RenderView;
                /**
                 * @zh
                 * 销毁指定的渲染视图
                 * @param view 渲染视图
                 */
                destroyView(view: RenderView): void;
                /**
                 * @zh
                 * 销毁全部渲染视图
                 */
                destroyViews(): void;
                createModel<T extends Model>(mClass: new () => T): T;
                destroyModel(m: Model): void;
                createCamera(): Camera;
                destroyCamera(c: Camera): void;
                createLight<T extends Light>(lClass: new () => T): T;
                destroyLight(l: Light): void;
                sortViews(): void;
            }
        }
    }
    export const cclegacy: {
        [x: string]: any;
    };
    export namespace primitives {
        /**
         * @en
         * This function generates a box with specified extents and centered at origin,
         * but may be repositioned through the `center` option.
         * @zh
         * 生成一个立方体，其大小是定义的范围且中心在原点。
         * @param options 参数选项。
         */
        export function box(options?: __private.cocos_core_primitive_box_IBoxOptions): IGeometry;
        /**
         * @en
         * Generate a cone with radius 0.5, height 1, centered at origin,
         * but may be repositioned through the `center` option.
         * @zh
         * 生成一个圆锥。
         * @param radius 圆锥半径。
         * @param height 圆锥高度。
         * @param opts 圆锥参数选项。
         */
        export function cone(radius?: number, height?: number, opts?: renderer.__private.RecursivePartial<__private.cocos_core_primitive_cone_IConeOptions>): IGeometry;
        /**
         * @en
         * Generate a cylinder with radiusTop radiusBottom 0.5, height 2 and centered at origin,
         * but may be repositioned through the `center` option.
         * @zh
         * 生成一个圆柱。
         * @param radiusTop 顶部半径。
         * @param radiusBottom 底部半径。
         * @param opts 圆柱参数选项。
         */
        export function cylinder(radiusTop?: number, radiusBottom?: number, height?: number, opts?: renderer.__private.RecursivePartial<__private.cocos_core_primitive_cylinder_ICylinderOptions>): IGeometry;
        /**
         * @en
         * This function generates a plane on XOZ plane with positive Y direction.
         * @zh
         * 生成一个平面，其位于XOZ平面，方向为Y轴正方向。
         * @param options 平面参数选项。
         */
        export function plane(options?: __private.cocos_core_primitive_plane_IPlaneOptions): IGeometry;
        /**
         * @en
         * Generate a quad with width and height both to 1, centered at origin.
         * @zh
         * 生成一个四边形，宽高都为1，中心在原点。
         * @param options 参数选项。
         */
        export function quad(options?: IGeometryOptions): IGeometry;
        /**
         * @en
         * Generate a shpere with radius 0.5.
         * @zh
         * 生成一个球。
         * @param radius 球半径。
         * @param options 参数选项。
         */
        export function sphere(radius?: number, opts?: renderer.__private.RecursivePartial<__private.cocos_core_primitive_sphere_ISphereOptions>): IGeometry;
        /**
         * @en
         * Generate a torus with raidus 0.4, tube 0.1 and centered at origin.
         * @zh
         * 生成一个环面。
         * @param radius 环面半径。
         * @param tube 管形大小。
         * @param opts 参数选项。
         */
        export function torus(radius?: number, tube?: number, opts?: renderer.__private.RecursivePartial<__private.cocos_core_primitive_torus_ITorusOptions>): {
            positions: number[];
            normals: number[];
            uvs: number[];
            indices: number[];
            minPos: math.Vec3;
            maxPos: math.Vec3;
            boundingRadius: number;
        };
        /**
         * Generate a capsule with radiusTop radiusBottom 0.5, height 2, centered at origin,
         * but may be repositioned through the `center` option.
         * @zh
         * 生成一个胶囊体。
         * @param radiusTop 顶部半径。
         * @param radiusBottom 底部半径。
         * @param opts 胶囊体参数选项。
         */
        export function capsule(radiusTop?: number, radiusBottom?: number, height?: number, opts?: renderer.__private.RecursivePartial<__private.cocos_core_primitive_capsule_ICapsuteOptions>): {
            positions: number[];
            normals: number[];
            uvs: number[];
            indices: number[];
            minPos: math.Vec3;
            maxPos: math.Vec3;
            boundingRadius: number;
        };
        /**
         * @en
         * Generate a circle with radius 1, centered at origin,
         * but may be repositioned through the `center` option.
         * @zh
         * 生成一个圆，其半径是单位1，中心点在原点。
         * @param options 参数选项。
         */
        export function circle(options?: renderer.__private.RecursivePartial<__private.cocos_core_primitive_circle_ICircleOptions> | __private.cocos_core_primitive_circle_ICircleOptions): IGeometry;
        /**
         * @en
         * Translate the geometry.
         * @zh
         * 平移几何体。
         * @param geometry 几何体信息。
         * @param offset 偏移量。
         */
        export function translate(geometry: IGeometry, offset: {
            x?: number;
            y?: number;
            z?: number;
        }): IGeometry;
        /**
         * @en
         * Scale the geometry.
         * @zh
         * 缩放几何体。
         * @param geometry 几何体信息。
         * @param value 缩放量。
         */
        export function scale(geometry: IGeometry, value: {
            x?: number;
            y?: number;
            z?: number;
        }): IGeometry;
        /**
         * @en
         * Converts geometry to wireframe mode. Only geometry with triangle topology is supported.
         * @zh
         * 将几何体转换为线框模式，仅支持三角形拓扑的几何体。
         * @param geometry 几何体信息。
         */
        export function wireframed(geometry: IGeometry): IGeometry;
        /**
         * @deprecated
         */
        export function wireframe(indices: number[]): number[];
        /**
         * @deprecated
         */
        export function invWinding(indices: number[]): number[];
        /**
         * @deprecated
         */
        export function toWavefrontOBJ(primitive: IGeometry, scale?: number): string;
        /**
         * @deprecated
         */
        export function normals(positions: number[], nms: number[], length?: number): any[];
        /**
         * @en
         * Apply the options to default.
         * @zh
         * 应用默认的几何参数选项。
         */
        export function applyDefaultGeometryOptions<GeometryOptions = IGeometryOptions>(options?: renderer.__private.RecursivePartial<IGeometryOptions>): GeometryOptions;
        /**
         * @en
         * The definition of the parameter for building a primitive geometry.
         * @zh
         * 几何体参数选项。
         */
        export interface IGeometryOptions {
            /**
             * @en
             * Whether to include normal. Default to true.
             * @zh
             * 是否包含法线。默认为true。
             */
            includeNormal: boolean;
            /**
             * @en
             * Whether to include uv. Default to true.
             * @zh
             * 是否包含UV。默认为true。
             */
            includeUV: boolean;
        }
        /**
         * @en
         * The definition of the geometry, this struct can build a mesh.
         * @zh
         * 几何体信息。
         */
        export interface IGeometry {
            /**
             * @en
             * Vertex positions.
             * @zh
             * 顶点位置。
             */
            positions: number[];
            /**
             * @en
             * Vertex normals.
             * @zh
             * 顶点法线。
             */
            normals?: number[];
            /**
             * @en
             * Texture coordinates.
             * @zh
             * 纹理坐标。
             */
            uvs?: number[];
            /**
             * @en
             * Vertex colors.
             * @zh
             * 顶点颜色。
             */
            colors?: number[];
            /**
             * @en
             * specify vertex attributes, use (positions|normals|uvs|colors) as keys
             * @zh
             * 顶点属性。
             */
            attributes?: IGFXAttribute[];
            customAttributes?: Array<{
                attr: IGFXAttribute;
                values: number[];
            }>;
            /**
             * @en
             * Bounding sphere radius.
             * @zh
             * 包围球半径。
             */
            boundingRadius?: number;
            /**
             * @en
             * Min position.
             * @zh
             * 最小位置。
             */
            minPos?: {
                x: number;
                y: number;
                z: number;
            };
            /**
             * @en
             * Max position.
             * @zh
             * 最大位置。
             */
            maxPos?: {
                x: number;
                y: number;
                z: number;
            };
            /**
             * @en
             * Geometry indices, if one needs indexed-draw.
             * @zh
             * 几何索引，当使用索引绘制时。
             */
            indices?: number[];
            /**
             * @en
             * Topology of the geometry vertices. Default is TRIANGLE_LIST.
             * @zh
             * 几何顶点的拓扑图元。默认值是TRIANGLE_LIST。
             */
            primitiveMode?: GFXPrimitiveMode;
            /**
             * @en
             * whether rays casting from the back face of this geometry could collide with it
             * @zh
             * 是否是双面，用于判断来自于几何体背面的射线检测。
             */
            doubleSided?: boolean;
        }
        export namespace __private {
            /**
             * @en
             * The definition of the parameter for building a box.
             * @zh
             * 立方体参数选项。
             */
            export interface cocos_core_primitive_box_IBoxOptions extends renderer.__private.RecursivePartial<IGeometryOptions> {
                /**
                 * @en
                 * Box extent on X-axis.
                 * @zh
                 * 立方体宽度。
                 */
                width?: number;
                /**
                 * @en
                 * Box extent on Y-axis.
                 * @zh
                 * 立方体高度。
                 */
                height?: number;
                /**
                 * @en
                 * Box extent on Z-axis.
                 * @zh
                 * 立方体长度。
                 */
                length?: number;
                /**
                 * @en
                 * Segment count on X-axis.
                 * @zh
                 * 宽度线段数。
                 */
                widthSegments?: number;
                /**
                 * @en
                 * Segment count on Y-axis.
                 * @zh
                 * 高度线段数。
                 */
                heightSegments?: number;
                /**
                 * @en
                 * Segment count on Z-axis.
                 * @zh
                 * 长度线段数。
                 */
                lengthSegments?: number;
            }
            /**
             * @en
             * The definition of the parameter for building a cylinder.
             * @zh
             * 圆柱参数选项。
             */
            export interface cocos_core_primitive_cylinder_ICylinderOptions extends IGeometryOptions {
                radialSegments: number;
                heightSegments: number;
                capped: boolean;
                arc: number;
            }
            export type cocos_core_primitive_cone_IConeOptions = cocos_core_primitive_cylinder_ICylinderOptions;
            /**
             * @en
             * The definition of the parameter for building a plane.
             * @zh
             * 平面参数选项。
             */
            export interface cocos_core_primitive_plane_IPlaneOptions extends renderer.__private.RecursivePartial<IGeometryOptions> {
                /**
                 * Plane extent on X-axis.
                 */
                width: number;
                /**
                 * Plane extent on Z-axis.
                 */
                length: number;
                /**
                 * Segment count on X-axis.
                 */
                widthSegments: number;
                /**
                 * Segment count on Z-axis.
                 */
                lengthSegments: number;
            }
            /**
             * @zh
             * 球参数选项。
             */
            export interface cocos_core_primitive_sphere_ISphereOptions extends IGeometryOptions {
                segments: number;
            }
            /**
             * @zh
             * 环面参数选项。
             */
            export interface cocos_core_primitive_torus_ITorusOptions extends IGeometryOptions {
                radialSegments: number;
                tubularSegments: number;
                arc: number;
            }
            /**
             * @en
             * The definition of the parameter for building a capsule.
             * @zh
             * 胶囊体参数选项。
             */
            export interface cocos_core_primitive_capsule_ICapsuteOptions {
                sides: number;
                heightSegments: number;
                capped: boolean;
                arc: number;
            }
            /**
             * @en
             * The definition of the parameter for building a circle.
             * @zh
             * 圆形参数选项。
             */
            export interface cocos_core_primitive_circle_ICircleOptions extends IGeometryOptions {
                segments: number;
            }
        }
    }
    export namespace math {
        export namespace bits {
            /**
             * @en Returns -1, 0, +1 depending on sign of x.
             * @zh 根据x的符号返回 -1，0，+1。
             */
            export function sign(v: number): number;
            /**
             * @en Computes absolute value of integer.
             * @zh 计算整数的绝对值。
             */
            export function abs(v: number): number;
            /**
             * @en Computes minimum of integers x and y.
             * @zh 计算整数x和y中的最小值。
             */
            export function min(x: number, y: number): number;
            /**
             * @en Computes maximum of integers x and y.
             * @zh 计算整数x和y中的最大值。
             */
            export function max(x: number, y: number): number;
            /**
             * @en Checks if a number is a power of two.
             * @zh 检查一个数字是否是2的幂。
             */
            export function isPow2(v: number): boolean;
            /**
             * Computes log base 2 of v.
             */
            export function log2(v: number): number;
            /**
             * Computes log base 10 of v.
             */
            export function log10(v: number): 1 | 0 | 2 | 4 | 8 | 3 | 5 | 6 | 7 | 9;
            /**
             * Counts number of bits.
             */
            export function popCount(v: number): number;
            /**
             * @en Counts number of trailing zeros.
             * @zh 计算数字后面零的数量。
             */
            export function countTrailingZeros(v: number): number;
            /**
             * Rounds to next power of 2.
             */
            export function nextPow2(v: number): number;
            /**
             * Rounds down to previous power of 2.
             */
            export function prevPow2(v: number): number;
            /**
             * Computes parity of word.
             */
            export function parity(v: number): number;
            /**
             * Reverse bits in a 32 bit word.
             */
            export function reverse(v: number): number;
            /**
             * Interleave bits of 2 coordinates with 16 bits. Useful for fast quadtree codes.
             */
            export function interleave2(x: number, y: number): number;
            /**
             * Extracts the nth interleaved component.
             */
            export function deinterleave2(v: number, n: number): number;
            /**
             * Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes.
             */
            export function interleave3(x: number, y: number, z: number): number;
            /**
             * Extracts nth interleaved component of a 3-tuple.
             */
            export function deinterleave3(v: number, n: number): number;
            /**
             * Computes next combination in colexicographic order (this is
             * mistakenly called nextPermutation on the bit twiddling hacks page).
             */
            export function nextCombination(v: number): number;
            /**
             * 数学库
             * @category core/math
             */
            /**
             * Bit twiddling hacks for JavaScript.
             *
             * Author: Mikola Lysenko
             *
             * Ported from Stanford bit twiddling hack library:
             *    http://graphics.stanford.edu/~seander/bithacks.html
             */
            export const INT_BITS = 32;
            export const INT_MAX = 2147483647;
            export const INT_MIN: number;
        }
        /**
         * 二维向量。
         */
        export class Vec2 extends ValueType {
            static ZERO: Readonly<Vec2>;
            static ONE: Readonly<Vec2>;
            static NEG_ONE: Readonly<Vec2>;
            static UNIT_X: Readonly<Vec2>;
            static UNIT_Y: Readonly<Vec2>;
            /**
             * @zh 获得指定向量的拷贝
             */
            static clone<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out): Vec2;
            /**
             * @zh 复制目标向量
             */
            static copy<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out): Out;
            /**
             * @zh 设置向量值
             */
            static set<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, x: number, y: number): Out;
            /**
             * @zh 逐元素向量加法
             */
            static add<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量减法
             */
            static subtract<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量乘法
             */
            static multiply<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量除法
             */
            static divide<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量向上取整
             */
            static ceil<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out): Out;
            /**
             * @zh 逐元素向量向下取整
             */
            static floor<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out): Out;
            /**
             * @zh 逐元素向量最小值
             */
            static min<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量最大值
             */
            static max<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量四舍五入取整
             */
            static round<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out): Out;
            /**
             * @zh 向量标量乘法
             */
            static multiplyScalar<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: number): Out;
            /**
             * @zh 逐元素向量乘加: A + B * scale
             */
            static scaleAndAdd<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: Out, scale: number): Out;
            /**
             * @zh 求两向量的欧氏距离
             */
            static distance<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out, b: Out): number;
            /**
             * @zh 求两向量的欧氏距离平方
             */
            static squaredDistance<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out, b: Out): number;
            /**
             * @zh 求向量长度
             */
            static len<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out): number;
            /**
             * @zh 求向量长度平方
             */
            static lengthSqr<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out): number;
            /**
             * @zh 逐元素向量取负
             */
            static negate<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out): Out;
            /**
             * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
             */
            static inverse<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out): Out;
            /**
             * @zh 逐元素向量取倒数，接近 0 时返回 0
             */
            static inverseSafe<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out): Out;
            /**
             * @zh 归一化向量
             */
            static normalize<Out extends __private.cocos_core_math_type_define_IVec2Like, Vec2Like extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Vec2Like): Out;
            /**
             * @zh 向量点积（数量积）
             */
            static dot<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out, b: Out): number;
            /**
             * @zh 向量叉积（向量积），注意二维向量的叉积为与 Z 轴平行的三维向量
             */
            static cross<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Vec3, a: Out, b: Out): Vec3;
            /**
             * @zh 逐元素向量线性插值： A + t * (B - A)
             */
            static lerp<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, a: Out, b: Out, t: number): Out;
            /**
             * @zh 生成一个在单位圆上均匀分布的随机向量
             * @param scale 生成的向量长度
             */
            static random<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, scale?: number): Out;
            /**
             * @zh 向量与三维矩阵乘法，默认向量第三位为 1。
             */
            static transformMat3<Out extends __private.cocos_core_math_type_define_IVec2Like, MatLike extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out, m: __private.cocos_core_math_type_define_IMat3Like): Out;
            /**
             * @zh 向量与四维矩阵乘法，默认向量第三位为 0，第四位为 1。
             */
            static transformMat4<Out extends __private.cocos_core_math_type_define_IVec2Like, MatLike extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, m: __private.cocos_core_math_type_define_IMat4Like): Out;
            /**
             * @zh 返回向量的字符串表示
             */
            static str<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out): string;
            /**
             * @zh 向量转数组
             * @param ofs 数组起始偏移量
             */
            static toArray<Out extends __private.IWritableArrayLike<number>>(out: Out, v: __private.cocos_core_math_type_define_IVec2Like, ofs?: number): Out;
            /**
             * @zh 数组转向量
             * @param ofs 数组起始偏移量
             */
            static fromArray<Out extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, arr: __private.IWritableArrayLike<number>, ofs?: number): Out;
            /**
             * @zh 向量等价判断
             */
            static strictEquals<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out, b: Out): boolean;
            /**
             * @zh 排除浮点数误差的向量近似等价判断
             */
            static equals<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out, b: Out, epsilon?: number): boolean;
            /**
             * @zh 求两向量夹角弧度
             */
            static angle<Out extends __private.cocos_core_math_type_define_IVec2Like>(a: Out, b: Out): number;
            /**
             * x 分量。
             */
            x: number;
            /**
             * y 分量。
             */
            y: number;
            constructor(other: Vec2);
            constructor(x?: number, y?: number);
            /**
             * @zh 克隆当前向量。
             */
            clone(): Vec2;
            /**
             * @zh 设置当前向量使其与指定向量相等。
             * @param other 相比较的向量。
             * @return `this`
             */
            set(other: Vec2): any;
            /**
             * @zh 设置当前向量的具体分量值。
             * @param x 要设置的 x 分量的值
             * @param y 要设置的 y 分量的值
             * @return `this`
             */
            set(x?: number, y?: number): any;
            /**
             * @zh 判断当前向量是否在误差范围内与指定向量相等。
             * @param other 相比较的向量。
             * @param epsilon 允许的误差，应为非负数。
             * @return 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
             */
            equals(other: Vec2, epsilon?: number): boolean;
            /**
             * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
             * @param x 相比较的向量的 x 分量。
             * @param y 相比较的向量的 y 分量。
             * @param epsilon 允许的误差，应为非负数。
             * @return 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
             */
            equals2f(x: number, y: number, epsilon?: number): boolean;
            /**
             * @zh 判断当前向量是否与指定向量相等。
             * @param other 相比较的向量。
             * @return 两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
             */
            strictEquals(other: Vec2): boolean;
            /**
             * @zh 判断当前向量是否与指定分量的向量相等。
             * @param x 指定向量的 x 分量。
             * @param y 指定向量的 y 分量。
             * @return 两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
             */
            strictEquals2f(x: number, y: number): boolean;
            /**
             * @zh 返回当前向量的字符串表示。
             * @returns 当前向量的字符串表示。
             */
            toString(): string;
            /**
             * @zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
             * @param to 目标向量。
             * @param ratio 插值比率，范围为 [0,1]。
             */
            lerp(to: Vec2, ratio: number): this;
            /**
             * @zh 设置当前向量的值，使其各个分量都处于指定的范围内。
             * @param minInclusive 每个分量都代表了对应分量允许的最小值。
             * @param maxInclusive 每个分量都代表了对应分量允许的最大值。
             * @return `this`
             */
            clampf(minInclusive: Vec2, maxInclusive: Vec2): this;
            /**
             * @zh 向量加法。将当前向量与指定向量的相加
             * @param other 指定的向量。
             */
            add(other: Vec2): this;
            /**
             * @zh 向量加法。将当前向量与指定分量的向量相加
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             */
            add2f(x: number, y: number): this;
            /**
             * @zh 向量减法。将当前向量减去指定向量
             * @param other 减数向量。
             */
            subtract(other: Vec2): this;
            /**
             * @zh 向量减法。将当前向量减去指定分量的向量
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             */
            subtract2f(x: number, y: number): this;
            /**
             * @zh 向量数乘。将当前向量数乘指定标量
             * @param scalar 标量乘数。
             */
            multiplyScalar(scalar: number): this;
            /**
             * @zh 向量乘法。将当前向量乘以与指定向量的结果赋值给当前向量。
             * @param other 指定的向量。
             */
            multiply(other: Vec2): this;
            /**
             * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             */
            multiply2f(x: number, y: number): this;
            /**
             * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
             * @param other 指定的向量
             */
            divide(other: Vec2): this;
            /**
             * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             */
            divide2f(x: number, y: number): this;
            /**
             * @zh 将当前向量的各个分量取反
             */
            negative(): this;
            /**
             * @zh 向量点乘。
             * @param other 指定的向量。
             * @return 当前向量与指定向量点乘的结果。
             */
            dot(other: Vec2): number;
            /**
             * @zh 向量叉乘。
             * @param other 指定的向量。
             * @return `out`
             */
            cross(other: Vec2): number;
            /**
             * 计算向量的长度（模）。
             * @return 向量的长度（模）。
             */
            length(): number;
            /**
             * 计算向量长度（模）的平方。
             * @return 向量长度（模）的平方。
             */
            lengthSqr(): number;
            /**
             * @zh 将当前向量归一化。
             */
            normalize(): this;
            /**
             * @zh 获取当前向量和指定向量之间的角度。
             * @param other 指定的向量。
             * @return 当前向量和指定向量之间的角度（弧度制）；若当前向量和指定向量中存在零向量，将返回 0。
             */
            angle(other: Vec2): number;
            /**
             * @zh 获取当前向量和指定向量之间的有符号角度。<br/>
             * 有符号角度的取值范围为 (-180, 180]，当前向量可以通过逆时针旋转有符号角度与指定向量同向。<br/>
             * @param other 指定的向量。
             * @return 当前向量和指定向量之间的有符号角度（弧度制）；若当前向量和指定向量中存在零向量，将返回 0。
             */
            signAngle(other: Vec2): number;
            /**
             * @zh 将当前向量的旋转
             * @param radians 旋转角度（弧度制）。
             */
            rotate(radians: number): this;
            /**
             * @zh 计算当前向量在指定向量上的投影向量。
             * @param other 指定的向量。
             */
            project(other: Vec2): this;
            /**
             * @zh 将当前向量视为 z 分量为 0、w 分量为 1 的四维向量，<br/>
             * 应用四维矩阵变换到当前矩阵<br/>
             * @param matrix 变换矩阵。
             */
            transformMat4(matrix: Mat4): this;
        }
        export function v2(other: Vec2): Vec2;
        export function v2(x?: number, y?: number): Vec2;
        /**
         * 三维向量。
         */
        export class Vec3 extends ValueType {
            static UNIT_X: Readonly<Vec3>;
            static UNIT_Y: Readonly<Vec3>;
            static UNIT_Z: Readonly<Vec3>;
            static RIGHT: Readonly<Vec3>;
            static UP: Readonly<Vec3>;
            static FORWARD: Readonly<Vec3>;
            static ZERO: Readonly<Vec3>;
            static ONE: Readonly<Vec3>;
            static NEG_ONE: Readonly<Vec3>;
            /**
             * @zh 将目标赋值为零向量
             */
            static zero<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out): Out;
            /**
             * @zh 获得指定向量的拷贝
             */
            static clone<Out extends __private.cocos_core_math_type_define_IVec3Like>(a: Out): Vec3;
            /**
             * @zh 复制目标向量
             */
            static copy<Out extends __private.cocos_core_math_type_define_IVec3Like, Vec3Like extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Vec3Like): Out;
            /**
             * @zh 设置向量值
             */
            static set<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, x: number, y: number, z: number): Out;
            /**
             * @zh 逐元素向量加法
             */
            static add<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量减法
             */
            static subtract<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量乘法 (分量积)
             */
            static multiply<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量除法
             */
            static divide<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量向上取整
             */
            static ceil<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量向下取整
             */
            static floor<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量最小值
             */
            static min<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量最大值
             */
            static max<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量四舍五入取整
             */
            static round<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 向量标量乘法
             */
            static multiplyScalar<Out extends __private.cocos_core_math_type_define_IVec3Like, Vec3Like extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Vec3Like, b: number): Out;
            /**
             * @zh 逐元素向量乘加: A + B * scale
             */
            static scaleAndAdd<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like, scale: number): Out;
            /**
             * @zh 求两向量的欧氏距离
             */
            static distance(a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): number;
            /**
             * @zh 求两向量的欧氏距离平方
             */
            static squaredDistance(a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): number;
            /**
             * @zh 求向量长度
             */
            static len(a: __private.cocos_core_math_type_define_IVec3Like): number;
            /**
             * @zh 求向量长度平方
             */
            static lengthSqr(a: __private.cocos_core_math_type_define_IVec3Like): number;
            /**
             * @zh 逐元素向量取负
             */
            static negate<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
             */
            static invert<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量取倒数，接近 0 时返回 0
             */
            static invertSafe<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 归一化向量
             */
            static normalize<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 向量点积（数量积）
             */
            static dot<Out extends __private.cocos_core_math_type_define_IVec3Like>(a: Out, b: __private.cocos_core_math_type_define_IVec3Like): number;
            /**
             * @zh 向量叉积（向量积）
             */
            static cross<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 逐元素向量线性插值： A + t * (B - A)
             */
            static lerp<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like, t: number): Out;
            /**
             * @zh 生成一个在单位球体上均匀分布的随机向量
             * @param scale 生成的向量长度
             */
            static random<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, scale?: number): Out;
            /**
             * @zh 向量与四维矩阵乘法，默认向量第四位为 1。
             */
            static transformMat4<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, m: __private.cocos_core_math_type_define_IMat4Like): Out;
            /**
             * @zh 向量与四维矩阵乘法，默认向量第四位为 0。
             */
            static transformMat4Normal<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, m: __private.cocos_core_math_type_define_IMat4Like): Out;
            /**
             * @zh 向量与三维矩阵乘法
             */
            static transformMat3<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, m: __private.cocos_core_math_type_define_IMat3Like): Out;
            /**
             * @zh 向量仿射变换
             */
            static transformAffine<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, v: __private.cocos_core_math_type_define_IVec3Like, m: __private.cocos_core_math_type_define_IMat4Like): Out;
            /**
             * @zh 向量四元数乘法
             */
            static transformQuat<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, q: __private.cocos_core_math_type_define_IQuatLike): Out;
            /**
             * @zh 以缩放 -> 旋转 -> 平移顺序变换向量
             */
            static transformRTS<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, r: __private.cocos_core_math_type_define_IQuatLike, t: __private.cocos_core_math_type_define_IVec3Like, s: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 以平移 -> 旋转 -> 缩放顺序逆变换向量
             */
            static transformInverseRTS<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, r: __private.cocos_core_math_type_define_IQuatLike, t: __private.cocos_core_math_type_define_IVec3Like, s: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 绕 X 轴旋转向量指定弧度
             * @param v 待旋转向量
             * @param o 旋转中心
             * @param a 旋转弧度
             */
            static rotateX<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, v: __private.cocos_core_math_type_define_IVec3Like, o: __private.cocos_core_math_type_define_IVec3Like, a: number): Out;
            /**
             * @zh 绕 Y 轴旋转向量指定弧度
             * @param v 待旋转向量
             * @param o 旋转中心
             * @param a 旋转弧度
             */
            static rotateY<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, v: __private.cocos_core_math_type_define_IVec3Like, o: __private.cocos_core_math_type_define_IVec3Like, a: number): Out;
            /**
             * @zh 绕 Z 轴旋转向量指定弧度
             * @param v 待旋转向量
             * @param o 旋转中心
             * @param a 旋转弧度
             */
            static rotateZ<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, v: __private.cocos_core_math_type_define_IVec3Like, o: __private.cocos_core_math_type_define_IVec3Like, a: number): Out;
            /**
             * @zh 向量转数组
             * @param ofs 数组起始偏移量
             */
            static toArray<Out extends __private.IWritableArrayLike<number>>(out: Out, v: __private.cocos_core_math_type_define_IVec3Like, ofs?: number): Out;
            /**
             * @zh 数组转向量
             * @param ofs 数组起始偏移量
             */
            static fromArray<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, arr: __private.IWritableArrayLike<number>, ofs?: number): Out;
            /**
             * @zh 向量等价判断
             */
            static strictEquals(a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): boolean;
            /**
             * @zh 排除浮点数误差的向量近似等价判断
             */
            static equals(a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like, epsilon?: number): boolean;
            /**
             * @zh 求两向量夹角弧度
             */
            static angle(a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): number;
            /**
             * @zh 计算向量在指定平面上的投影
             * @param a 待投影向量
             * @param n 指定平面的法线
             */
            static projectOnPlane<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, n: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * @zh 计算向量在指定向量上的投影
             * @param a 待投影向量
             * @param n 目标向量
             */
            static project<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: __private.cocos_core_math_type_define_IVec3Like, b: __private.cocos_core_math_type_define_IVec3Like): Out;
            /**
             * x 分量。
             */
            x: number;
            /**
             * y 分量。
             */
            y: number;
            /**
             * z 分量。
             */
            z: number;
            constructor(v: Vec3);
            constructor(x?: number, y?: number, z?: number);
            /**
             * @zh 克隆当前向量。
             */
            clone(): Vec3;
            /**
             * @zh 设置当前向量使其与指定向量相等。
             * @param other 相比较的向量。
             * @returns `this`
             */
            set(other: Vec3): any;
            /**
             * @zh 设置当前向量的具体分量值。
             * @param x 要设置的 x 分量的值
             * @param y 要设置的 y 分量的值
             * @param z 要设置的 z 分量的值
             * @returns `this`
             */
            set(x?: number, y?: number, z?: number): any;
            /**
             * @zh 判断当前向量是否在误差范围内与指定向量相等。
             * @param other 相比较的向量。
             * @param epsilon 允许的误差，应为非负数。
             * @returns 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
             */
            equals(other: Vec3, epsilon?: number): boolean;
            /**
             * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
             * @param x 相比较的向量的 x 分量。
             * @param y 相比较的向量的 y 分量。
             * @param z 相比较的向量的 z 分量。
             * @param epsilon 允许的误差，应为非负数。
             * @returns 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
             */
            equals3f(x: number, y: number, z: number, epsilon?: number): boolean;
            /**
             * @zh 判断当前向量是否与指定向量相等。
             * @param other 相比较的向量。
             * @returns 两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
             */
            strictEquals(other: Vec3): boolean;
            /**
             * @zh 判断当前向量是否与指定分量的向量相等。
             * @param x 指定向量的 x 分量。
             * @param y 指定向量的 y 分量。
             * @param z 指定向量的 z 分量。
             * @returns 两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
             */
            strictEquals3f(x: number, y: number, z: number): boolean;
            /**
             * @zh 返回当前向量的字符串表示。
             * @returns 当前向量的字符串表示。
             */
            toString(): string;
            /**
             * @zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
             * @param to 目标向量。
             * @param ratio 插值比率，范围为 [0,1]。
             */
            lerp(to: Vec3, ratio: number): this;
            /**
             * @zh 向量加法。将当前向量与指定向量的相加
             * @param other 指定的向量。
             */
            add(other: Vec3): this;
            /**
             * @zh 向量加法。将当前向量与指定分量的向量相加
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             * @param z 指定的向量的 z 分量。
             */
            add3f(x: number, y: number, z: number): this;
            /**
             * @zh 向量减法。将当前向量减去指定向量的结果。
             * @param other 减数向量。
             */
            subtract(other: Vec3): this;
            /**
             * @zh 向量减法。将当前向量减去指定分量的向量
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             * @param z 指定的向量的 z 分量。
             */
            subtract3f(x: number, y: number, z: number): this;
            /**
             * @zh 向量数乘。将当前向量数乘指定标量
             * @param scalar 标量乘数。
             */
            multiplyScalar(scalar: number): this;
            /**
             * @zh 向量乘法。将当前向量乘以与指定向量的结果赋值给当前向量。
             * @param other 指定的向量。
             */
            multiply(other: Vec3): this;
            /**
             * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             * @param z 指定的向量的 z 分量。
             */
            multiply3f(x: number, y: number, z: number): this;
            /**
             * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
             * @param other 指定的向量
             */
            divide(other: Vec3): this;
            /**
             * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             * @param z 指定的向量的 z 分量。
             */
            divide3f(x: number, y: number, z: number): this;
            /**
             * @zh 将当前向量的各个分量取反
             */
            negative(): this;
            /**
             * @zh 设置当前向量的值，使其各个分量都处于指定的范围内。
             * @param minInclusive 每个分量都代表了对应分量允许的最小值。
             * @param maxInclusive 每个分量都代表了对应分量允许的最大值。
             * @returns `this`
             */
            clampf(minInclusive: Vec3, maxInclusive: Vec3): this;
            /**
             * @zh 向量点乘。
             * @param other 指定的向量。
             * @returns 当前向量与指定向量点乘的结果。
             */
            dot(other: Vec3): number;
            /**
             * @zh 向量叉乘。将当前向量左叉乘指定向量
             * @param other 指定的向量。
             */
            cross(other: Vec3): this;
            /**
             * @zh 计算向量的长度（模）。
             * @returns 向量的长度（模）。
             */
            length(): number;
            /**
             * @zh 计算向量长度（模）的平方。
             * @returns 向量长度（模）的平方。
             */
            lengthSqr(): number;
            /**
             * @zh 将当前向量归一化
             */
            normalize(): this;
            /**
             * @zh 将当前向量视为 w 分量为 1 的四维向量，应用四维矩阵变换到当前矩阵
             * @param matrix 变换矩阵。
             */
            transformMat4(matrix: Mat4): this;
        }
        export function v3(other: Vec3): Vec3;
        export function v3(x?: number, y?: number, z?: number): Vec3;
        /**
         * 四维向量。
         */
        export class Vec4 extends ValueType {
            static ZERO: Readonly<Vec4>;
            static ONE: Readonly<Vec4>;
            static NEG_ONE: Readonly<Vec4>;
            /**
             * @zh 获得指定向量的拷贝
             */
            static clone<Out extends __private.cocos_core_math_type_define_IVec4Like>(a: Out): Vec4;
            /**
             * @zh 复制目标向量
             */
            static copy<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out): Out;
            /**
             * @zh 设置向量值
             */
            static set<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, x: number, y: number, z: number, w: number): Out;
            /**
             * @zh 逐元素向量加法
             */
            static add<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量减法
             */
            static subtract<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量乘法
             */
            static multiply<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量除法
             */
            static divide<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量向上取整
             */
            static ceil<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out): Out;
            /**
             * @zh 逐元素向量向下取整
             */
            static floor<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out): Out;
            /**
             * @zh 逐元素向量最小值
             */
            static min<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量最大值
             */
            static max<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素向量四舍五入取整
             */
            static round<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out): Out;
            /**
             * @zh 向量标量乘法
             */
            static multiplyScalar<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: number): Out;
            /**
             * @zh 逐元素向量乘加: A + B * scale
             */
            static scaleAndAdd<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: Out, scale: number): Out;
            /**
             * @zh 求两向量的欧氏距离
             */
            static distance<Out extends __private.cocos_core_math_type_define_IVec4Like>(a: Out, b: Out): number;
            /**
             * @zh 求两向量的欧氏距离平方
             */
            static squaredDistance<Out extends __private.cocos_core_math_type_define_IVec4Like>(a: Out, b: Out): number;
            /**
             * @zh 求向量长度
             */
            static len<Out extends __private.cocos_core_math_type_define_IVec4Like>(a: Out): number;
            /**
             * @zh 求向量长度平方
             */
            static lengthSqr<Out extends __private.cocos_core_math_type_define_IVec4Like>(a: Out): number;
            /**
             * @zh 逐元素向量取负
             */
            static negate<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out): Out;
            /**
             * @zh 逐元素向量取倒数，接近 0 时返回 Infinity
             */
            static inverse<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out): Out;
            /**
             * @zh 逐元素向量取倒数，接近 0 时返回 0
             */
            static inverseSafe<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out): Out;
            /**
             * @zh 归一化向量
             */
            static normalize<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out): Out;
            /**
             * @zh 向量点积（数量积）
             */
            static dot<Out extends __private.cocos_core_math_type_define_IVec4Like>(a: Out, b: Out): number;
            /**
             * @zh 逐元素向量线性插值： A + t * (B - A)
             */
            static lerp<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, a: Out, b: Out, t: number): Out;
            /**
             * @zh 生成一个在单位球体上均匀分布的随机向量
             * @param scale 生成的向量长度
             */
            static random<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, scale?: number): Out;
            /**
             * @zh 向量矩阵乘法
             */
            static transformMat4<Out extends __private.cocos_core_math_type_define_IVec4Like, MatLike extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, m: MatLike): Out;
            /**
             * @zh 向量仿射变换
             */
            static transformAffine<Out extends __private.cocos_core_math_type_define_IVec4Like, VecLike extends __private.cocos_core_math_type_define_IVec4Like, MatLike extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, v: VecLike, m: MatLike): Out;
            /**
             * @zh 向量四元数乘法
             */
            static transformQuat<Out extends __private.cocos_core_math_type_define_IVec4Like, QuatLike extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out, q: QuatLike): Out;
            /**
             * @zh 向量转数组
             * @param ofs 数组起始偏移量
             */
            static toArray<Out extends __private.IWritableArrayLike<number>>(out: Out, v: __private.cocos_core_math_type_define_IVec4Like, ofs?: number): Out;
            /**
             * @zh 数组转向量
             * @param ofs 数组起始偏移量
             */
            static fromArray<Out extends __private.cocos_core_math_type_define_IVec4Like>(out: Out, arr: __private.IWritableArrayLike<number>, ofs?: number): Out;
            /**
             * @zh 向量等价判断
             */
            static strictEquals<Out extends __private.cocos_core_math_type_define_IVec4Like>(a: Out, b: Out): boolean;
            /**
             * @zh 排除浮点数误差的向量近似等价判断
             */
            static equals<Out extends __private.cocos_core_math_type_define_IVec4Like>(a: Out, b: Out, epsilon?: number): boolean;
            /**
             * x 分量。
             */
            x: number;
            /**
             * y 分量。
             */
            y: number;
            /**
             * z 分量。
             */
            z: number;
            /**
             * w 分量。
             */
            w: number;
            constructor(other: Vec4);
            constructor(x?: number, y?: number, z?: number, w?: number);
            /**
             * @zh 克隆当前向量。
             */
            clone(): Vec4;
            /**
             * @zh 设置当前向量使其与指定向量相等。
             * @param other 相比较的向量。
             * @returns `this`
             */
            set(other: Vec4): any;
            /**
             * @zh 设置当前向量的具体分量值。
             * @param x 要设置的 x 分量的值
             * @param y 要设置的 y 分量的值
             * @param z 要设置的 z 分量的值
             * @param w 要设置的 w 分量的值
             * @returns `this`
             */
            set(x?: number, y?: number, z?: number, w?: number): any;
            /**
             * @zh 判断当前向量是否在误差范围内与指定向量相等。
             * @param other 相比较的向量。
             * @param epsilon 允许的误差，应为非负数。
             * @returns 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
             */
            equals(other: Vec4, epsilon?: number): boolean;
            /**
             * @zh 判断当前向量是否在误差范围内与指定分量的向量相等。
             * @param x 相比较的向量的 x 分量。
             * @param y 相比较的向量的 y 分量。
             * @param z 相比较的向量的 z 分量。
             * @param w 相比较的向量的 w 分量。
             * @param epsilon 允许的误差，应为非负数。
             * @returns 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
             */
            equals4f(x: number, y: number, z: number, w: number, epsilon?: number): boolean;
            /**
             * @zh 判断当前向量是否与指定向量相等。
             * @param other 相比较的向量。
             * @returns 两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
             */
            strictEquals(other: Vec4): boolean;
            /**
             * @zh 判断当前向量是否与指定分量的向量相等。
             * @param x 指定向量的 x 分量。
             * @param y 指定向量的 y 分量。
             * @param z 指定向量的 z 分量。
             * @param w 指定向量的 w 分量。
             * @returns 两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
             */
            strictEquals4f(x: number, y: number, z: number, w: number): boolean;
            /**
             * @zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
             * @param to 目标向量。
             * @param ratio 插值比率，范围为 [0,1]。
             */
            lerp(to: Vec4, ratio: number): this;
            /**
             * @zh 返回当前向量的字符串表示。
             * @returns 当前向量的字符串表示。
             */
            toString(): string;
            /**
             * @zh 设置当前向量的值，使其各个分量都处于指定的范围内。
             * @param minInclusive 每个分量都代表了对应分量允许的最小值。
             * @param maxInclusive 每个分量都代表了对应分量允许的最大值。
             * @returns `this`
             */
            clampf(minInclusive: Vec4, maxInclusive: Vec4): this;
            /**
             * @zh 向量加法。将当前向量与指定向量的相加
             * @param other 指定的向量。
             */
            add(other: Vec4): this;
            /**
             * @zh 向量加法。将当前向量与指定分量的向量相加
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             * @param z 指定的向量的 z 分量。
             * @param w 指定的向量的 w 分量。
             */
            add4f(x: number, y: number, z: number, w: number): this;
            /**
             * @zh 向量减法。将当前向量减去指定向量
             * @param other 减数向量。
             */
            subtract(other: Vec4): this;
            /**
             * @zh 向量减法。将当前向量减去指定分量的向量
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             * @param z 指定的向量的 z 分量。
             * @param w 指定的向量的 w 分量。
             */
            subtract4f(x: number, y: number, z: number, w: number): this;
            /**
             * @zh 向量数乘。将当前向量数乘指定标量
             * @param scalar 标量乘数。
             */
            multiplyScalar(scalar: number): this;
            /**
             * @zh 向量乘法。将当前向量乘以指定向量
             * @param other 指定的向量。
             */
            multiply(other: Vec4): this;
            /**
             * @zh 向量乘法。将当前向量与指定分量的向量相乘的结果赋值给当前向量。
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             * @param z 指定的向量的 z 分量。
             * @param w 指定的向量的 w 分量。
             */
            multiply4f(x: number, y: number, z: number, w: number): this;
            /**
             * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
             * @param other 指定的向量
             */
            divide(other: Vec4): this;
            /**
             * @zh 向量逐元素相除。将当前向量与指定分量的向量相除的结果赋值给当前向量。
             * @param x 指定的向量的 x 分量。
             * @param y 指定的向量的 y 分量。
             * @param z 指定的向量的 z 分量。
             * @param w 指定的向量的 w 分量。
             */
            divide4f(x: number, y: number, z: number, w: number): this;
            /**
             * @zh 将当前向量的各个分量取反
             */
            negative(): this;
            /**
             * @zh 向量点乘。
             * @param other 指定的向量。
             * @returns 当前向量与指定向量点乘的结果。
             */
            dot(vector: Vec4): number;
            /**
             * @zh 向量叉乘。视当前向量和指定向量为三维向量（舍弃 w 分量），将当前向量左叉乘指定向量
             * @param other 指定的向量。
             */
            cross(vector: Vec4): this;
            /**
             * @zh 计算向量的长度（模）。
             * @returns 向量的长度（模）。
             */
            length(): number;
            /**
             * @zh 计算向量长度（模）的平方。
             * @returns 向量长度（模）的平方。
             */
            lengthSqr(): number;
            /**
             * @zh 将当前向量归一化
             */
            normalize(): this;
            /**
             * @zh 应用四维矩阵变换到当前矩阵
             * @param matrix 变换矩阵。
             */
            transformMat4(matrix: Mat4): this;
        }
        export function v4(other: Vec4): Vec4;
        export function v4(x?: number, y?: number, z?: number, w?: number): Vec4;
        /**
         * 四元数。
         */
        export class Quat extends ValueType {
            static IDENTITY: Readonly<Quat>;
            /**
             * @zh 获得指定四元数的拷贝
             */
            static clone<Out extends __private.cocos_core_math_type_define_IQuatLike>(a: Out): Quat;
            /**
             * @zh 复制目标四元数
             */
            static copy<Out extends __private.cocos_core_math_type_define_IQuatLike, QuatLike extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: QuatLike): Out;
            /**
             * @zh 设置四元数值
             */
            static set<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, x: number, y: number, z: number, w: number): Out;
            /**
             * @zh 将目标赋值为单位四元数
             */
            static identity<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out): Out;
            /**
             * @zh 设置四元数为两向量间的最短路径旋转，默认两向量都已归一化
             */
            static rotationTo<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: VecLike, b: VecLike): Out;
            /**
             * @zh 获取四元数的旋转轴和旋转弧度
             * @param outAxis 旋转轴输出
             * @param q 源四元数
             * @return 旋转弧度
             */
            static getAxisAngle<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(outAxis: VecLike, q: Out): number;
            /**
             * @zh 四元数乘法
             */
            static multiply<Out extends __private.cocos_core_math_type_define_IQuatLike, QuatLike_1 extends __private.cocos_core_math_type_define_IQuatLike, QuatLike_2 extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: QuatLike_1, b: QuatLike_2): Out;
            /**
             * @zh 四元数标量乘法
             */
            static multiplyScalar<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out, b: number): Out;
            /**
             * @zh 四元数乘加：A + B * scale
             */
            static scaleAndAdd<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out, b: Out, scale: number): Out;
            /**
             * @zh 绕 X 轴旋转指定四元数
             * @param rad 旋转弧度
             */
            static rotateX<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out, rad: number): Out;
            /**
             * @zh 绕 Y 轴旋转指定四元数
             * @param rad 旋转弧度
             */
            static rotateY<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out, rad: number): Out;
            /**
             * @zh 绕 Z 轴旋转指定四元数
             * @param rad 旋转弧度
             */
            static rotateZ<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out, rad: number): Out;
            /**
             * @zh 绕世界空间下指定轴旋转四元数
             * @param axis 旋转轴，默认已归一化
             * @param rad 旋转弧度
             */
            static rotateAround<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, rot: Out, axis: VecLike, rad: number): Out;
            /**
             * @zh 绕本地空间下指定轴旋转四元数
             * @param axis 旋转轴
             * @param rad 旋转弧度
             */
            static rotateAroundLocal<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, rot: Out, axis: VecLike, rad: number): Out;
            /**
             * @zh 根据 xyz 分量计算 w 分量，默认已归一化
             */
            static calculateW<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out): Out;
            /**
             * @zh 四元数点积（数量积）
             */
            static dot<Out extends __private.cocos_core_math_type_define_IQuatLike>(a: Out, b: Out): number;
            /**
             * @zh 逐元素线性插值： A + t * (B - A)
             */
            static lerp<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out, b: Out, t: number): Out;
            /**
             * @zh 四元数球面插值
             */
            static slerp<Out extends __private.cocos_core_math_type_define_IQuatLike, QuatLike_1 extends __private.cocos_core_math_type_define_IQuatLike, QuatLike_2 extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: QuatLike_1, b: QuatLike_2, t: number): Out;
            /**
             * @zh 带两个控制点的四元数球面插值
             */
            static sqlerp<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out, b: Out, c: Out, d: Out, t: number): Out;
            /**
             * @zh 四元数求逆
             */
            static invert<Out extends __private.cocos_core_math_type_define_IQuatLike, QuatLike extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: QuatLike): Out;
            /**
             * @zh 求共轭四元数，对单位四元数与求逆等价，但更高效
             */
            static conjugate<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out): Out;
            /**
             * @zh 求四元数长度
             */
            static len<Out extends __private.cocos_core_math_type_define_IQuatLike>(a: Out): number;
            /**
             * @zh 求四元数长度平方
             */
            static lengthSqr<Out extends __private.cocos_core_math_type_define_IQuatLike>(a: Out): number;
            /**
             * @zh 归一化四元数
             */
            static normalize<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, a: Out): Out;
            /**
             * @zh 根据本地坐标轴朝向计算四元数，默认三向量都已归一化且相互垂直
             */
            static fromAxes<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, xAxis: VecLike, yAxis: VecLike, zAxis: VecLike): Out;
            /**
             * @zh 根据视口的前方向和上方向计算四元数
             * @param view 视口面向的前方向，必须归一化
             * @param up 视口的上方向，必须归一化，默认为 (0, 1, 0)
             */
            static fromViewUp<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, view: VecLike, up?: Vec3): Out;
            /**
             * @zh 根据旋转轴和旋转弧度计算四元数
             */
            static fromAxisAngle<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, axis: VecLike, rad: number): Out;
            /**
             * @zh 根据三维矩阵信息计算四元数，默认输入矩阵不含有缩放信息
             */
            static fromMat3<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, m: Mat3): Out;
            /**
             * @zh 根据欧拉角信息计算四元数，旋转顺序为 YZX
             */
            static fromEuler<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, x: number, y: number, z: number): Out;
            /**
             * @zh 返回定义此四元数的坐标系 X 轴向量
             */
            static toAxisX<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: VecLike, q: Out): VecLike;
            /**
             * @zh 返回定义此四元数的坐标系 Y 轴向量
             */
            static toAxisY<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: VecLike, q: Out): VecLike;
            /**
             * @zh 返回定义此四元数的坐标系 Z 轴向量
             */
            static toAxisZ<Out extends __private.cocos_core_math_type_define_IQuatLike, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: VecLike, q: Out): VecLike;
            /**
             * @zh 根据四元数计算欧拉角，返回角度 x, y 在 [-180, 180] 区间内, z 默认在 [-90, 90] 区间内，旋转顺序为 YZX
             * @param outerZ z 取值范围区间改为 [-180, -90] U [90, 180]
             */
            static toEuler<Out extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, q: __private.cocos_core_math_type_define_IQuatLike, outerZ?: boolean): Out;
            /**
             * @zh 四元数转数组
             * @param ofs 数组内的起始偏移量
             */
            static toArray<Out extends __private.IWritableArrayLike<number>>(out: Out, q: __private.cocos_core_math_type_define_IQuatLike, ofs?: number): Out;
            /**
             * @zh 数组转四元数
             * @param ofs 数组起始偏移量
             */
            static fromArray<Out extends __private.cocos_core_math_type_define_IQuatLike>(out: Out, arr: __private.IWritableArrayLike<number>, ofs?: number): Out;
            /**
             * @zh 四元数等价判断
             */
            static strictEquals<Out extends __private.cocos_core_math_type_define_IQuatLike>(a: Out, b: Out): boolean;
            /**
             * @zh 排除浮点数误差的四元数近似等价判断
             */
            static equals<Out extends __private.cocos_core_math_type_define_IQuatLike>(a: Out, b: Out, epsilon?: number): boolean;
            /**
             * x 分量。
             */
            x: number;
            /**
             * y 分量。
             */
            y: number;
            /**
             * z 分量。
             */
            z: number;
            /**
             * w 分量。
             */
            w: number;
            constructor(other: Quat);
            constructor(x?: number, y?: number, z?: number, w?: number);
            /**
             * @zh 克隆当前四元数。
             */
            clone(): Quat;
            /**
             * @zh 设置当前四元数使其与指定四元数相等。
             * @param other 相比较的四元数。
             * @returns `this`
             */
            set(other: Quat): Quat;
            /**
             * @zh 设置当前四元数指定元素值。
             * @param x 四元数 x 元素值
             * @param y 四元数 y 元素值
             * @param z 四元数 z 元素值
             * @param w 四元数 w 元素值
             * @returns `this`
             */
            set(x?: number, y?: number, z?: number, w?: number): Quat;
            /**
             * @zh 判断当前向量是否在误差范围内与指定向量相等。
             * @param other 相比较的向量。
             * @param epsilon 允许的误差，应为非负数。
             * @returns 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
             */
            equals(other: Quat, epsilon?: number): boolean;
            /**
             * @zh 判断当前四元数是否与指定四元数相等。
             * @param other 相比较的四元数。
             * @returns 两四元数的各分量都相等时返回 `true`；否则返回 `false`。
             */
            strictEquals(other: Quat): boolean;
            /**
             * @zh 将当前四元数转化为欧拉角（x-y-z）并赋值给出口向量。
             * @param out 出口向量。
             */
            getEulerAngles(out: Vec3): Vec3;
            /**
             * @zh 根据指定的插值比率，从当前四元数到目标四元数之间做插值。
             * @param to 目标四元数。
             * @param ratio 插值比率，范围为 [0,1]。
             */
            lerp(to: Quat, ratio: number): this;
            /**
             * @zh 求四元数长度
             */
            length(): number;
            /**
             * @zh 求四元数长度平方
             */
            lengthSqr(): number;
        }
        export function quat(other: Quat): Quat;
        export function quat(x?: number, y?: number, z?: number, w?: number): Quat;
        /**
         * 表示三维（3x3）矩阵。
         */
        export class Mat3 extends ValueType {
            static IDENTITY: Readonly<Mat3>;
            /**
             * @zh 获得指定矩阵的拷贝
             */
            static clone<Out extends __private.cocos_core_math_type_define_IMat3Like>(a: Out): Mat3;
            /**
             * @zh 复制目标矩阵
             */
            static copy<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out): Out;
            /**
             * @zh 设置矩阵值
             */
            static set<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): Out;
            /**
             * @zh 将目标赋值为单位矩阵
             */
            static identity<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out): Out;
            /**
             * @zh 转置矩阵
             */
            static transpose<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out): Out;
            /**
             * @zh 矩阵求逆，注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
             */
            static invert<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out): Out;
            /**
             * @zh 矩阵行列式
             */
            static determinant<Out extends __private.cocos_core_math_type_define_IMat3Like>(a: Out): number;
            /**
             * @zh 矩阵乘法
             */
            static multiply<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 取四阶矩阵的前三阶，与三阶矩阵相乘
             */
            static multiplyMat4<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out, b: __private.cocos_core_math_type_define_IMat4Like): Out;
            /**
             * @zh 在给定矩阵变换基础上加入变换
             * @deprecated 将在 1.2 移除，请转用 `Mat3.transform` 方法。
             */
            static transfrom<Out extends __private.cocos_core_math_type_define_IMat3Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Out, v: VecLike): void;
            /**
             * @zh 在给定矩阵变换基础上加入变换
             */
            static transform<Out extends __private.cocos_core_math_type_define_IMat3Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Out, v: VecLike): Out;
            /**
             * @zh 在给定矩阵变换基础上加入新缩放变换
             */
            static scale<Out extends __private.cocos_core_math_type_define_IMat3Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Out, v: VecLike): Out;
            /**
             * @zh 在给定矩阵变换基础上加入新旋转变换
             * @param rad 旋转弧度
             */
            static rotate<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out, rad: number): Out;
            /**
             * @zh 取四阶矩阵的前三阶
             */
            static fromMat4<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: __private.cocos_core_math_type_define_IMat4Like): Out;
            /**
             * @zh 根据视口前方向和上方向计算矩阵
             * @param view 视口面向的前方向，必须归一化
             * @param up 视口的上方向，必须归一化，默认为 (0, 1, 0)
             */
            static fromViewUp<Out extends __private.cocos_core_math_type_define_IMat3Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, view: VecLike, up?: Vec3): Out;
            /**
             * @zh 计算位移矩阵
             */
            static fromTranslation<Out extends __private.cocos_core_math_type_define_IMat3Like, VecLike extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, v: VecLike): Out;
            /**
             * @zh 计算缩放矩阵
             */
            static fromScaling<Out extends __private.cocos_core_math_type_define_IMat3Like, VecLike extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, v: VecLike): Out;
            /**
             * @zh 计算旋转矩阵
             */
            static fromRotation<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, rad: number): Out;
            /**
             * @zh 根据四元数旋转信息计算矩阵
             */
            static fromQuat<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, q: __private.cocos_core_math_type_define_IQuatLike): Out;
            /**
             * @zh 计算指定四维矩阵的逆转置三维矩阵
             */
            static inverseTransposeMat4<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: __private.cocos_core_math_type_define_IMat4Like): Out | null;
            /**
             * @zh 矩阵转数组
             * @param ofs 数组内的起始偏移量
             */
            static toArray<Out extends __private.IWritableArrayLike<number>>(out: Out, m: __private.cocos_core_math_type_define_IMat3Like, ofs?: number): Out;
            /**
             * @zh 数组转矩阵
             * @param ofs 数组起始偏移量
             */
            static fromArray<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, arr: __private.IWritableArrayLike<number>, ofs?: number): Out;
            /**
             * @zh 逐元素矩阵加法
             */
            static add<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素矩阵减法
             */
            static subtract<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 矩阵标量乘法
             */
            static multiplyScalar<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out, b: number): Out;
            /**
             * @zh 逐元素矩阵标量乘加: A + B * scale
             */
            static multiplyScalarAndAdd<Out extends __private.cocos_core_math_type_define_IMat3Like>(out: Out, a: Out, b: Out, scale: number): Out;
            /**
             * @zh 矩阵等价判断
             */
            static strictEquals<Out extends __private.cocos_core_math_type_define_IMat3Like>(a: Out, b: Out): boolean;
            /**
             * @zh 排除浮点数误差的矩阵近似等价判断
             */
            static equals<Out extends __private.cocos_core_math_type_define_IMat3Like>(a: Out, b: Out, epsilon?: number): boolean;
            /**
             * 矩阵第 0 列第 0 行的元素。
             */
            m00: number;
            /**
             * 矩阵第 0 列第 1 行的元素。
             */
            m01: number;
            /**
             * 矩阵第 0 列第 2 行的元素。
             */
            m02: number;
            /**
             * 矩阵第 1 列第 0 行的元素。
             */
            m03: number;
            /**
             * 矩阵第 1 列第 1 行的元素。
             */
            m04: number;
            /**
             * 矩阵第 1 列第 2 行的元素。
             */
            m05: number;
            /**
             * 矩阵第 2 列第 0 行的元素。
             */
            m06: number;
            /**
             * 矩阵第 2 列第 1 行的元素。
             */
            m07: number;
            /**
             * 矩阵第 2 列第 2 行的元素。
             */
            m08: number;
            constructor(other: Mat3);
            constructor(m00?: number, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number, m06?: number, m07?: number, m08?: number);
            /**
             * @zh 克隆当前矩阵。
             */
            clone(): Mat3;
            /**
             * @zh 设置当前矩阵使其与指定矩阵相等。
             * @param other 相比较的矩阵。
             * @return this
             */
            set(other: Mat3): any;
            /**
             * 设置当前矩阵指定元素值。
             * @return this
             */
            set(m00?: number, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number, m06?: number, m07?: number, m08?: number): any;
            /**
             * @zh 判断当前矩阵是否在误差范围内与指定矩阵相等。
             * @param other 相比较的矩阵。
             * @param epsilon 允许的误差，应为非负数。
             * @return 两矩阵的各元素都分别相等时返回 `true`；否则返回 `false`。
             */
            equals(other: Mat3, epsilon?: number): boolean;
            /**
             * @zh 判断当前矩阵是否与指定矩阵相等。
             * @param other 相比较的矩阵。
             * @return 两矩阵的各元素都分别相等时返回 `true`；否则返回 `false`。
             */
            strictEquals(other: Mat3): boolean;
            /**
             * 返回当前矩阵的字符串表示。
             * @return 当前矩阵的字符串表示。
             */
            toString(): string;
            /**
             * 将当前矩阵设为单位矩阵。
             * @return `this`
             */
            identity(): this;
            /**
             * @zh 计算当前矩阵的转置矩阵。
             */
            transpose(): this;
            /**
             * @zh 计算当前矩阵的逆矩阵。注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
             */
            invert(): this;
            /**
             * 计算当前矩阵的行列式。
             * @return 当前矩阵的行列式。
             */
            determinant(): number;
            /**
             * @zh 矩阵加法。将当前矩阵与指定矩阵的相加，结果返回给当前矩阵。
             * @param mat 相加的矩阵
             */
            add(mat: Mat3): this;
            /**
             * @zh 计算矩阵减法。将当前矩阵减去指定矩阵的结果赋值给当前矩阵。
             * @param mat 减数矩阵。
             */
            subtract(mat: Mat3): this;
            /**
             * @zh 矩阵乘法。将当前矩阵左乘指定矩阵的结果赋值给当前矩阵。
             * @param mat 指定的矩阵。
             */
            multiply(mat: Mat3): this;
            /**
             * @zh 矩阵数乘。将当前矩阵与指定标量的数乘结果赋值给当前矩阵。
             * @param scalar 指定的标量。
             */
            multiplyScalar(scalar: number): this;
            /**
             * @zh 将当前矩阵左乘缩放矩阵的结果赋值给当前矩阵，缩放矩阵由各个轴的缩放给出。
             * @param vec 各个轴的缩放。
             */
            scale(vec: Vec3): this;
            /**
             * @zh 将当前矩阵左乘旋转矩阵的结果赋值给当前矩阵，旋转矩阵由旋转轴和旋转角度给出。
             * @param mat 矩阵
             * @param rad 旋转角度（弧度制）
             */
            rotate(rad: number): this;
            /**
             * @zh 重置当前矩阵的值，使其表示指定四元数表示的旋转变换。
             * @param q 四元数表示的旋转变换。
             * @returns this
             */
            fromQuat(q: Quat): this;
        }
        /**
         * 表示四维（4x4）矩阵。
         */
        export class Mat4 extends ValueType {
            static IDENTITY: Readonly<Mat4>;
            /**
             * @zh 获得指定矩阵的拷贝
             */
            static clone<Out extends __private.cocos_core_math_type_define_IMat4Like>(a: Out): Mat4;
            /**
             * @zh 复制目标矩阵
             */
            static copy<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out): Out;
            /**
             * @zh 设置矩阵值
             */
            static set<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): Out;
            /**
             * @zh 将目标赋值为单位矩阵
             */
            static identity<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out): Out;
            /**
             * @zh 转置矩阵
             */
            static transpose<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out): Out;
            /**
             * @zh 矩阵求逆，注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
             */
            static invert<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out): Out;
            /**
             * @zh 矩阵行列式
             */
            static determinant<Out extends __private.cocos_core_math_type_define_IMat4Like>(a: Out): number;
            /**
             * @zh 矩阵乘法
             */
            static multiply<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 在给定矩阵变换基础上加入变换
             */
            static transform<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Out, v: VecLike): Out;
            /**
             * @zh 在给定矩阵变换基础上加入新位移变换
             */
            static translate<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Out, v: VecLike): Out;
            /**
             * @zh 在给定矩阵变换基础上加入新缩放变换
             */
            static scale<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Out, v: VecLike): Out;
            /**
             * @zh 在给定矩阵变换基础上加入新旋转变换
             * @param rad 旋转角度
             * @param axis 旋转轴
             */
            static rotate<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, a: Out, rad: number, axis: VecLike): Out | null;
            /**
             * @zh 在给定矩阵变换基础上加入绕 X 轴的旋转变换
             * @param rad 旋转角度
             */
            static rotateX<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, rad: number): Out;
            /**
             * @zh 在给定矩阵变换基础上加入绕 Y 轴的旋转变换
             * @param rad 旋转角度
             */
            static rotateY<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, rad: number): Out;
            /**
             * @zh 在给定矩阵变换基础上加入绕 Z 轴的旋转变换
             * @param rad 旋转角度
             */
            static rotateZ<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, rad: number): Out;
            /**
             * @zh 计算位移矩阵
             */
            static fromTranslation<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, v: VecLike): Out;
            /**
             * @zh 计算缩放矩阵
             */
            static fromScaling<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, v: VecLike): Out;
            /**
             * @zh 计算旋转矩阵
             */
            static fromRotation<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, rad: number, axis: VecLike): Out | null;
            /**
             * @zh 计算绕 X 轴的旋转矩阵
             */
            static fromXRotation<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, rad: number): Out;
            /**
             * @zh 计算绕 Y 轴的旋转矩阵
             */
            static fromYRotation<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, rad: number): Out;
            /**
             * @zh 计算绕 Z 轴的旋转矩阵
             */
            static fromZRotation<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, rad: number): Out;
            /**
             * @zh 根据旋转和位移信息计算矩阵
             */
            static fromRT<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, q: Quat, v: VecLike): Out;
            /**
             * @zh 提取矩阵的位移信息, 默认矩阵中的变换以 S->R->T 的顺序应用
             */
            static getTranslation<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: VecLike, mat: Out): VecLike;
            /**
             * @zh 提取矩阵的缩放信息, 默认矩阵中的变换以 S->R->T 的顺序应用
             */
            static getScaling<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: VecLike, mat: Out): VecLike;
            /**
             * @zh 提取矩阵的旋转信息, 默认输入矩阵不含有缩放信息，如考虑缩放应使用 `toRTS` 函数。
             */
            static getRotation<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Quat, mat: Out): Quat;
            /**
             * @zh 提取旋转、位移、缩放信息， 默认矩阵中的变换以 S->R->T 的顺序应用
             */
            static toRTS<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(m: Out, q: Quat, v: VecLike, s: VecLike): void;
            /**
             * @zh 根据旋转、位移、缩放信息计算矩阵，以 S->R->T 的顺序应用
             */
            static fromRTS<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, q: Quat, v: VecLike, s: VecLike): Out;
            /**
             * @zh 根据指定的旋转、位移、缩放及变换中心信息计算矩阵，以 S->R->T 的顺序应用
             * @param q 旋转值
             * @param v 位移值
             * @param s 缩放值
             * @param o 指定变换中心
             */
            static fromRTSOrigin<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, q: Quat, v: VecLike, s: VecLike, o: VecLike): Out;
            /**
             * @zh 根据指定的旋转信息计算矩阵
             */
            static fromQuat<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, q: Quat): Out;
            /**
             * @zh 根据指定的视锥体信息计算矩阵
             * @param left 左平面距离
             * @param right 右平面距离
             * @param bottom 下平面距离
             * @param top 上平面距离
             * @param near 近平面距离
             * @param far 远平面距离
             */
            static frustum<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, left: number, right: number, bottom: number, top: number, near: number, far: number): Out;
            /**
             * @zh 计算透视投影矩阵
             * @param fovy 纵向视角高度
             * @param aspect 长宽比
             * @param near 近平面距离
             * @param far 远平面距离
             */
            static perspective<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, fov: number, aspect: number, near: number, far: number, isFOVY?: boolean): Out;
            /**
             * @zh 计算正交投影矩阵
             * @param left 左平面距离
             * @param right 右平面距离
             * @param bottom 下平面距离
             * @param top 上平面距离
             * @param near 近平面距离
             * @param far 远平面距离
             */
            static ortho<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, left: number, right: number, bottom: number, top: number, near: number, far: number): Out;
            /**
             * @zh 根据视点计算矩阵，注意 `eye - center` 不能为零向量或与 `up` 向量平行
             * @param eye 当前位置
             * @param center 目标视点
             * @param up 视口上方向
             */
            static lookAt<Out extends __private.cocos_core_math_type_define_IMat4Like, VecLike extends __private.cocos_core_math_type_define_IVec3Like>(out: Out, eye: VecLike, center: VecLike, up: VecLike): Out;
            /**
             * @zh 计算逆转置矩阵
             */
            static inverseTranspose<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out): Out | null;
            /**
             * @zh 矩阵转数组
             * @param ofs 数组内的起始偏移量
             */
            static toArray<Out extends __private.IWritableArrayLike<number>>(out: Out, m: __private.cocos_core_math_type_define_IMat4Like, ofs?: number): Out;
            /**
             * @zh 数组转矩阵
             * @param ofs 数组起始偏移量
             */
            static fromArray<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, arr: __private.IWritableArrayLike<number>, ofs?: number): Out;
            /**
             * @zh 逐元素矩阵加法
             */
            static add<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐元素矩阵减法
             */
            static subtract<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 矩阵标量乘法
             */
            static multiplyScalar<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, b: number): Out;
            /**
             * @zh 逐元素矩阵标量乘加: A + B * scale
             */
            static multiplyScalarAndAdd<Out extends __private.cocos_core_math_type_define_IMat4Like>(out: Out, a: Out, b: Out, scale: number): Out;
            /**
             * @zh 矩阵等价判断
             */
            static strictEquals<Out extends __private.cocos_core_math_type_define_IMat4Like>(a: Out, b: Out): boolean;
            /**
             * @zh 排除浮点数误差的矩阵近似等价判断
             */
            static equals<Out extends __private.cocos_core_math_type_define_IMat4Like>(a: Out, b: Out, epsilon?: number): boolean;
            /**
             * 矩阵第 0 列第 0 行的元素。
             */
            m00: number;
            /**
             * 矩阵第 0 列第 1 行的元素。
             */
            m01: number;
            /**
             * 矩阵第 0 列第 2 行的元素。
             */
            m02: number;
            /**
             * 矩阵第 0 列第 3 行的元素。
             */
            m03: number;
            /**
             * 矩阵第 1 列第 0 行的元素。
             */
            m04: number;
            /**
             * 矩阵第 1 列第 1 行的元素。
             */
            m05: number;
            /**
             * 矩阵第 1 列第 2 行的元素。
             */
            m06: number;
            /**
             * 矩阵第 1 列第 3 行的元素。
             */
            m07: number;
            /**
             * 矩阵第 2 列第 0 行的元素。
             */
            m08: number;
            /**
             * 矩阵第 2 列第 1 行的元素。
             */
            m09: number;
            /**
             * 矩阵第 2 列第 2 行的元素。
             */
            m10: number;
            /**
             * 矩阵第 2 列第 3 行的元素。
             */
            m11: number;
            /**
             * 矩阵第 3 列第 0 行的元素。
             */
            m12: number;
            /**
             * 矩阵第 3 列第 1 行的元素。
             */
            m13: number;
            /**
             * 矩阵第 3 列第 2 行的元素。
             */
            m14: number;
            /**
             * 矩阵第 3 列第 3 行的元素。
             */
            m15: number;
            constructor(other: Mat4);
            constructor(m00?: number, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number, m06?: number, m07?: number, m08?: number, m09?: number, m10?: number, m11?: number, m12?: number, m13?: number, m14?: number, m15?: number);
            /**
             * @zh 克隆当前矩阵。
             */
            clone(): Mat4;
            /**
             * @zh 设置当前矩阵使其与指定矩阵相等。
             * @param other 相比较的矩阵。
             * @return this
             */
            set(other: Mat4): any;
            /**
             * 设置当前矩阵指定元素值。
             * @return this
             */
            set(m00?: number, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number, m06?: number, m07?: number, m08?: number, m09?: number, m10?: number, m11?: number, m12?: number, m13?: number, m14?: number, m15?: number): any;
            /**
             * @zh 判断当前矩阵是否在误差范围内与指定矩阵相等。
             * @param other 相比较的矩阵。
             * @param epsilon 允许的误差，应为非负数。
             * @return 两矩阵的各元素都分别相等时返回 `true`；否则返回 `false`。
             */
            equals(other: Mat4, epsilon?: number): boolean;
            /**
             * @zh 判断当前矩阵是否与指定矩阵相等。
             * @param other 相比较的矩阵。
             * @return 两矩阵的各元素都分别相等时返回 `true`；否则返回 `false`。
             */
            strictEquals(other: Mat4): boolean;
            /**
             * 返回当前矩阵的字符串表示。
             * @return 当前矩阵的字符串表示。
             */
            toString(): string;
            /**
             * 将当前矩阵设为单位矩阵。
             * @return `this`
             */
            identity(): this;
            /**
             * @zh 计算当前矩阵的转置矩阵。
             */
            transpose(): this;
            /**
             * @zh 计算当前矩阵的逆矩阵。注意，在矩阵不可逆时，会返回一个全为 0 的矩阵。
             */
            invert(): this;
            /**
             * 计算当前矩阵的行列式。
             * @return 当前矩阵的行列式。
             */
            determinant(): number;
            /**
             * @zh 矩阵加法。将当前矩阵与指定矩阵的相加，结果返回给当前矩阵。
             * @param mat 相加的矩阵
             */
            add(mat: Mat4): this;
            /**
             * @zh 计算矩阵减法。将当前矩阵减去指定矩阵的结果赋值给当前矩阵。
             * @param mat 减数矩阵。
             */
            subtract(mat: Mat4): this;
            /**
             * @zh 矩阵乘法。将当前矩阵左乘指定矩阵的结果赋值给当前矩阵。
             * @param mat 指定的矩阵。
             */
            multiply(mat: Mat4): this;
            /**
             * @zh 矩阵数乘。将当前矩阵与指定标量的数乘结果赋值给当前矩阵。
             * @param scalar 指定的标量。
             */
            multiplyScalar(scalar: number): this;
            /**
             * @zh 将当前矩阵左乘位移矩阵的结果赋值给当前矩阵，位移矩阵由各个轴的位移给出。
             * @param vec 位移向量。
             */
            translate(vec: Vec3): this;
            /**
             * @zh 将当前矩阵左乘缩放矩阵的结果赋值给当前矩阵，缩放矩阵由各个轴的缩放给出。
             * @param vec 各个轴的缩放。
             */
            scale(vec: Vec3): this;
            /**
             * @zh 将当前矩阵左乘旋转矩阵的结果赋值给当前矩阵，旋转矩阵由旋转轴和旋转角度给出。
             * @param mat 矩阵
             * @param rad 旋转角度（弧度制）
             * @param axis 旋转轴
             */
            rotate(rad: number, axis: Vec3): this | null;
            /**
             * @zh 从当前矩阵中计算出位移变换的部分，并以各个轴上位移的形式赋值给出口向量。
             * @param out 返回向量，当未指定时将创建为新的向量。
             */
            getTranslation(out: Vec3): Vec3;
            /**
             * @zh 从当前矩阵中计算出缩放变换的部分，并以各个轴上缩放的形式赋值给出口向量。
             * @param out 返回值，当未指定时将创建为新的向量。
             */
            getScale(out: Vec3): Vec3;
            /**
             * @zh 从当前矩阵中计算出旋转变换的部分，并以四元数的形式赋值给出口四元数。
             * @param out 返回值，当未指定时将创建为新的四元数。
             */
            getRotation(out: Quat): Quat;
            /**
             * @zh 重置当前矩阵的值，使其表示指定的旋转、缩放、位移依次组合的变换。
             * @param q 四元数表示的旋转变换。
             * @param v 位移变换，表示为各个轴的位移。
             * @param s 缩放变换，表示为各个轴的缩放。
             * @return `this`
             */
            fromRTS(q: Quat, v: Vec3, s: Vec3): this;
            /**
             * @zh 重置当前矩阵的值，使其表示指定四元数表示的旋转变换。
             * @param q 四元数表示的旋转变换。
             * @return `this`
             */
            fromQuat(q: Quat): this;
        }
        export function mat4(other: Mat4): Mat4;
        export function mat4(m00?: number, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number): Mat4;
        /**
         * 二维仿射变换矩阵，描述了平移、缩放和缩放。
         */
        export class AffineTransform {
            /**
             * 创建单位二维仿射变换矩阵，它不进行任何变换。
             */
            static identity(): AffineTransform;
            /**
             * 克隆指定的二维仿射变换矩阵。
             * @param affineTransform 指定的二维仿射变换矩阵。
             */
            static clone(affineTransform: AffineTransform): AffineTransform;
            /**
             * 将两个矩阵相乘的结果赋值给出口矩阵。
             * @param out 出口矩阵。
             * @param t1 左矩阵。
             * @param t2 右矩阵。
             */
            static concat(out: AffineTransform, t1: AffineTransform, t2: AffineTransform): void;
            /**
             * 将矩阵求逆的结果赋值给出口矩阵。
             * @param out 出口矩阵。
             * @param t 求逆的矩阵。
             */
            static invert(out: AffineTransform, t: AffineTransform): void;
            /**
             * 将四维矩阵转换为二维仿射变换矩阵并赋值给出口矩阵。
             * @param out 出口矩阵。
             * @param mat 四维矩阵。
             */
            static fromMat4(out: AffineTransform, mat: Mat4): void;
            /**
             * 应用二维仿射变换矩阵到二维向量上，并将结果赋值给出口向量。
             * @param out 出口向量。
             * @param point 应用变换的向量。
             * @param t 二维仿射变换矩阵。
             */
            static transformVec2(out: Vec2, point: Vec2, t: AffineTransform): any;
            /**
             * 应用二维仿射变换矩阵到二维向量上，并将结果赋值给出口向量。
             * @param out 出口向量。
             * @param x 应用变换的向量的 x 分量。
             * @param y 应用变换的向量的 y 分量。
             * @param t 二维仿射变换矩阵。
             */
            static transformVec2(out: Vec2, x: number, y: number, t: AffineTransform): any;
            /**
             * 应用二维仿射变换矩阵到二维尺寸上，并将结果赋值给出口尺寸。
             * @param out 出口尺寸。
             * @param size 应用变换的尺寸。
             * @param t 二维仿射变换矩阵。
             */
            static transformSize(out: Size, size: Size, t: AffineTransform): void;
            /**
             * 应用二维仿射变换矩阵到矩形上，并将结果赋值给出口矩形。
             * @param out 出口矩形。
             * @param rect 应用变换的矩形。
             * @param t 二维仿射变换矩阵。
             */
            static transformRect(out: Rect, rect: Rect, t: AffineTransform): void;
            /**
             * 应用二维仿射变换矩阵到矩形上, 并转换为有向包围盒。
             * 这个函数不创建任何内存，你需要先创建包围盒的四个 Vector 对象用来存储结果，并作为前四个参数传入函数。
             */
            static transformObb(out_bl: Vec2, out_tl: Vec2, out_tr: Vec2, out_br: Vec2, rect: Rect, anAffineTransform: AffineTransform): void;
            a: number;
            b: number;
            c: number;
            d: number;
            tx: number;
            ty: number;
            /**
             * 构造二维放射变换矩阵。
             * @param a a 元素。
             * @param b b 元素。
             * @param c c 元素。
             * @param d d 元素。
             * @param tx tx 元素。
             * @param ty ty 元素。
             */
            constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        }
        /**
         * 二维尺寸。
         */
        export class Size extends ValueType {
            static ZERO: Readonly<Size>;
            static ONE: Readonly<Size>;
            /**
             * 根据指定的插值比率，从当前尺寸到目标尺寸之间做插值。
             * @param out 本方法将插值结果赋值给此参数
             * @param from 起始尺寸。
             * @param to 目标尺寸。
             * @param ratio 插值比率，范围为 [0,1]。
             * @returns 当前尺寸的宽和高到目标尺寸的宽和高分别按指定插值比率进行线性插值构成的向量。
             */
            static lerp<Out extends __private.cocos_core_math_type_define_ISizeLike>(out: Out, from: Out, to: Out, ratio: number): Out;
            set x(val: number);
            get x(): number;
            set y(val: number);
            get y(): number;
            /**
             * 宽度。
             */
            width: number;
            /**
             * 高度。
             */
            height: number;
            /**
             * 构造与指定尺寸相等的尺寸。
             * @param other 相比较的尺寸。
             */
            constructor(other: Size);
            /**
             * 构造具有指定宽度和高度的尺寸。
             * @param [width=0] 指定的宽度。
             * @param [height=0] 指定的高度。
             */
            constructor(width?: number, height?: number);
            /**
             * 克隆当前尺寸。
             */
            clone(): Size;
            /**
             * 设置当前尺寸使其与指定的尺寸相等。
             * @param other 相比较的尺寸。
             * @returns `this`
             */
            set(other: Size): any;
            /**
             * 设置当前尺寸的具体参数。
             * @param width 要设置的 width 值
             * @param height 要设置的 height 值
             * @returns `this`
             */
            set(width?: number, height?: number): any;
            /**
             * 判断当前尺寸是否与指定尺寸的相等。
             * @param other 相比较的尺寸。
             * @returns 两尺寸的宽和高都分别相等时返回 `true`；否则返回 `false`。
             */
            equals(other: Size): boolean;
            /**
             * 根据指定的插值比率，从当前尺寸到目标尺寸之间做插值。
             * @param to 目标尺寸。
             * @param ratio 插值比率，范围为 [0,1]。
             */
            lerp(to: Size, ratio: number): this;
            /**
             * 返回当前尺寸的字符串表示。
             * @returns 当前尺寸的字符串表示。
             */
            toString(): string;
        }
        /**
         * 等价于 `new Size(other)`。
         * @param other 相比较的尺寸。
         * @returns `new Size(other)`
         */
        export function size(other: Size): Size;
        /**
         * 等价于 `new Size(x, y)`。
         * @param [x=0] 指定的宽度。
         * @param [y=0] 指定的高度。
         * @returns `new Size(x, y)`
         */
        export function size(width?: number, height?: number): Size;
        /**
         * 轴对齐矩形。
         * 矩形内的所有点都大于等于矩形的最小点 (xMin, yMin) 并且小于等于矩形的最大点 (xMax, yMax)。
         * 矩形的宽度定义为 xMax - xMin；高度定义为 yMax - yMin。
         */
        export class Rect extends ValueType {
            /**
             * 由任意两个点创建一个矩形，目标矩形即是这两个点各向 x、y 轴作线所得到的矩形。
             * @param v1 指定的点。
             * @param v2 指定的点。
             * @returns 目标矩形。
             */
            static fromMinMax<Out extends __private.cocos_core_math_type_define_IRectLike, VecLike extends __private.cocos_core_math_type_define_IVec2Like>(out: Out, v1: VecLike, v2: VecLike): Out;
            /**
             * 根据指定的插值比率，从当前矩形到目标矩形之间做插值。
             * @param out 本方法将插值结果赋值给此参数
             * @param from 起始矩形。
             * @param to 目标矩形。
             * @param ratio 插值比率，范围为 [0,1]。
             */
            static lerp<Out extends __private.cocos_core_math_type_define_IRectLike>(out: Out, from: Out, to: Out, ratio: number): Out;
            /**
             * 计算当前矩形与指定矩形重叠部分的矩形，将其赋值给出口矩形。
             * @param out 出口矩形。
             * @param one 指定的一个矩形。
             * @param other 指定的另一个矩形。
             */
            static intersection<Out extends __private.cocos_core_math_type_define_IRectLike>(out: Out, one: Out, other: Out): Out;
            /**
             * 创建同时包含当前矩形和指定矩形的最小矩形，将其赋值给出口矩形。
             * @param out 出口矩形。
             * @param one 指定的一个矩形。
             * @param other 指定的另一个矩形。
             */
            static union<Out extends __private.cocos_core_math_type_define_IRectLike>(out: Out, one: Out, other: Out): Out;
            get xMin(): number;
            set xMin(value: number);
            get yMin(): number;
            set yMin(value: number);
            get xMax(): number;
            set xMax(value: number);
            get yMax(): number;
            set yMax(value: number);
            get center(): Vec2;
            set center(value: Vec2);
            get origin(): any;
            set origin(value: any);
            get size(): Size;
            set size(value: Size);
            set z(val: number);
            get z(): number;
            set w(val: number);
            get w(): number;
            /**
             * 获取或设置矩形最小点的 x 坐标。
             */
            x: number;
            /**
             * 获取或设置矩形最小点的 y 坐标。
             */
            y: number;
            /**
             * 获取或设置矩形的宽度。
             */
            width: number;
            /**
             * 获取或设置矩形的高度。
             */
            height: number;
            /**
             * 构造与指定矩形相等的矩形。
             * @param other 相比较的矩形。
             */
            constructor(other: Rect);
            /**
             * 构造具有指定的最小值和尺寸的矩形。
             * @param x 矩形在 x 轴上的最小值。
             * @param y 矩形在 y 轴上的最小值。
             * @param width 矩形的宽度。
             * @param height 矩形的高度。
             */
            constructor(x?: number, y?: number, width?: number, height?: number);
            /**
             * 克隆当前矩形。
             */
            clone(): Rect;
            /**
             * 设置当前矩形使其与指定矩形相等。
             * @param other 相比较的矩形。
             * @returns `this`
             */
            set(other: Rect): any;
            /**
             * 设置当前矩形使其与指定参数的矩形相等。
             * @param x 指定矩形的 x 参数
             * @param y 指定矩形的 y 参数
             * @param width 指定矩形的 width 参数
             * @param height 指定矩形的 height 参数
             * @returns `this`
             */
            set(x?: number, y?: number, width?: number, height?: number): any;
            /**
             * 判断当前矩形是否与指定矩形相等。
             * @param other 相比较的矩形。
             * @returns 两矩阵的最小值和最大值都分别相等时返回 `true`；否则返回 `false`。
             */
            equals(other: Rect): boolean;
            /**
             * 根据指定的插值比率，从当前矩形到目标矩形之间做插值。
             * @param to 目标矩形。
             * @param ratio 插值比率，范围为 [0,1]。
             */
            lerp(to: Rect, ratio: number): this;
            /**
             * 返回当前矩形的字符串表示。
             * @returns 当前矩形的字符串表示。
             */
            toString(): string;
            /**
             * 判断当前矩形是否与指定矩形相交。
             * @param other 相比较的矩形。
             * @returns 相交则返回 `true`，否则返回 `false`。
             */
            intersects(other: Rect): boolean;
            /**
             * 判断当前矩形是否包含指定的点。
             * @param point 指定的点。
             * @returns 指定的点包含在矩形内则返回 `true`，否则返回 `false`。
             */
            contains(point: Vec2): boolean;
            /**
             * 判断当前矩形是否包含指定矩形。
             * @param other 指定的矩形。
             * @returns 指定矩形所有的点都包含在当前矩形内则返回 `true`，否则返回 `false`。
             */
            containsRect(other: Rect): boolean;
            /**
             * 应用矩阵变换到当前矩形：
             * 应用矩阵变换到当前矩形的最小点得到新的最小点，
             * 将当前矩形的尺寸视为二维向量应用矩阵变换得到新的尺寸；
             * 并将如此构成的新矩形。
             * @param matrix 变换矩阵。
             */
            transformMat4(mat: Mat4): this;
        }
        /**
         * 构造与指定矩形相等的矩形。等价于 `new Rect(rect)`。
         * @param rect 相比较的矩形。
         * @returns `new Rect(rect)`
         */
        export function rect(rect: Rect): Rect;
        /**
         * 构造具有指定的最小值和尺寸的矩形，等价于`new Rect(x, y, width, height)`。
         * @param x 矩形在 x 轴上的最小值。
         * @param y 矩形在 y 轴上的最小值。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @returns `new Rect(x, y, width, height)`
         */
        export function rect(x?: number, y?: number, width?: number, height?: number): Rect;
        /**
         * @zh 通过 Red、Green、Blue 颜色通道表示颜色，并通过 Alpha 通道表示不透明度。<br/>
         * 每个通道都为取值范围 [0, 255] 的整数。<br/>
         */
        export class Color extends ValueType {
            static WHITE: Readonly<Color>;
            static GRAY: Readonly<Color>;
            static BLACK: Readonly<Color>;
            static TRANSPARENT: Readonly<Color>;
            static RED: Readonly<Color>;
            static GREEN: Readonly<Color>;
            static BLUE: Readonly<Color>;
            static CYAN: Readonly<Color>;
            static MAGENTA: Readonly<Color>;
            static YELLOW: Readonly<Color>;
            /**
             * @zh 获得指定颜色的拷贝
             */
            static clone<Out extends __private.cocos_core_math_type_define_IColorLike>(a: Out): Color;
            /**
             * @zh 复制目标颜色
             */
            static copy<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, a: Out): Out;
            /**
             * @zh 设置颜色值
             */
            static set<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, r: number, g: number, b: number, a: number): Out;
            /**
             * @zh 从十六进制颜色字符串中读入颜色到 out 中
             */
            static fromHEX<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, hexString: string): Out;
            /**
             * @zh 逐通道颜色加法
             */
            static add<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐通道颜色减法
             */
            static subtract<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐通道颜色乘法
             */
            static multiply<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 逐通道颜色除法
             */
            static divide<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, a: Out, b: Out): Out;
            /**
             * @zh 全通道统一缩放颜色
             */
            static scale<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, a: Out, b: number): Out;
            /**
             * @zh 逐通道颜色线性插值：A + t * (B - A)
             */
            static lerp<Out extends __private.cocos_core_math_type_define_IColorLike>(out: Out, from: Out, to: Out, ratio: number): Out;
            /**
             * @zh 颜色转数组
             * @param ofs 数组起始偏移量
             */
            static toArray<Out extends __private.IWritableArrayLike<number>>(out: Out, a: __private.cocos_core_math_type_define_IColorLike, ofs?: number): Out;
            /**
             * @zh 数组转颜色
             * @param ofs 数组起始偏移量
             */
            static fromArray<Out extends __private.cocos_core_math_type_define_IColorLike>(arr: __private.IWritableArrayLike<number>, out: Out, ofs?: number): Out;
            /**
             * @zh 颜色等价判断
             */
            static strictEquals<Out extends __private.cocos_core_math_type_define_IColorLike>(a: Out, b: Out): boolean;
            /**
             * @zh 排除浮点数误差的颜色近似等价判断
             */
            static equals<Out extends __private.cocos_core_math_type_define_IColorLike>(a: Out, b: Out, epsilon?: number): boolean;
            /**
             * @zh 获取指定颜色的整型数据表示
             */
            static hex<Out extends __private.cocos_core_math_type_define_IColorLike>(a: Out): number;
            get r(): number;
            set r(red: number);
            get g(): number;
            set g(green: number);
            get b(): number;
            set b(blue: number);
            get a(): number;
            set a(alpha: number);
            get x(): number;
            set x(value: number);
            get y(): number;
            set y(value: number);
            get z(): number;
            set z(value: number);
            get w(): number;
            set w(value: number);
            _val: number;
            /**
             * 构造与指定颜色相等的颜色。
             * @param other 指定的颜色。
             */
            constructor(other: Color);
            /**
             * @zh 用十六进制颜色字符串中构造颜色。
             * @param hexString 十六进制颜色字符串。
             */
            constructor(hexString: string);
            /**
             * @zh 构造具有指定通道的颜色。
             * @param [r=0] 指定的 Red 通道。
             * @param [g=0] 指定的 Green 通道。
             * @param [b=0] 指定的 Blue 通道。
             * @param [a=255] 指定的 Alpha 通道。
             */
            constructor(r?: number, g?: number, b?: number, a?: number);
            /**
             * @zh 克隆当前颜色。
             */
            clone(): Color;
            /**
             * @zh 判断当前颜色是否与指定颜色相等。
             * @param other 相比较的颜色。
             * @returns 两颜色的各通道都相等时返回 `true`；否则返回 `false`。
             */
            equals(other: Color): boolean;
            /**
             * @zh 根据指定的插值比率，从当前颜色到目标颜色之间做插值。
             * @param to 目标颜色。
             * @param ratio 插值比率，范围为 [0,1]。
             */
            lerp(to: Color, ratio: number): this;
            /**
             * @zh 返回当前颜色的字符串表示。
             * @returns 当前颜色的字符串表示。
             */
            toString(): string;
            /**
             * @zh 将当前颜色转换为 CSS 格式。
             * @param opt 格式选项。
             * @returns 当前颜色的 CSS 格式。
             */
            toCSS(opt: "rgba" | "rgb" | "#rrggbb" | "#rrggbbaa"): string;
            /**
             * @zh 从十六进制颜色字符串中读入当前颜色。<br/>
             * 十六进制颜色字符串应该以可选的 "#" 开头，紧跟最多 8 个代表十六进制数字的字符；<br/>
             * 每两个连续字符代表的数值依次作为 Red、Green、Blue 和 Alpha 通道；<br/>
             * 缺省的颜色通道将视为 0；缺省的透明通道将视为 255。<br/>
             * @param hexString 十六进制颜色字符串。
             * @returns `this`
             */
            fromHEX(hexString: string): this;
            /**
             * @zh 转换当前颜色为十六进制颜色字符串。
             * @param fmt 格式选项。
             * - `'#rrggbbaa'` 获取Red、Green、Blue、Alpha通道的十六进制值（**两位**，高位补 0）并依次连接；
             * - `'#rrggbb` 与 `'#rrggbbaa'` 类似但不包括 Alpha 通道。
             * @returns 十六进制颜色字符串。
             * @example
             * ```
             * const color = new Color(255, 14, 0, 255);
             * color.toHex("rrggbbaa"); // "FF0E00FF"
             * color.toHex("rrggbb"); // "FF0E00"
             * ```
             */
            toHEX(fmt: "#rrggbb" | "#rrggbbaa"): string;
            /**
             * @zh 将当前颜色转换为 RGB 整数值。
             * @returns RGB 整数值。从最低有效位开始，每8位分别是 Red、Green、Blue 通道的值。
             * @example
             * ```
             * const color = Color.YELLOW;
             * color.toRGBValue();
             * ```
             */
            toRGBValue(): number;
            /**
             * @zh 从 HSV 颜色中读入当前颜色。
             * @param h H 通道。
             * @param s S 通道。
             * @param v V 通道。
             * @returns `this`
             * @example
             * ```
             * const color = Color.YELLOW;
             * color.fromHSV(0, 0, 1); // Color {r: 255, g: 255, b: 255, a: 255};
             * ```
             */
            fromHSV(h: number, s: number, v: number): this;
            /**
             * @zh 转换当前颜色为 HSV 颜色。
             * @returns HSV 颜色。成员 `h`、`s`、`v` 分别代表 HSV 颜色的 H、S、V 通道。
             * @example
             * ```
             * const color = cc.Color.YELLOW;
             * color.toHSV(); // {h: 0.1533864541832669, s: 0.9843137254901961, v: 1}
             * ```
             */
            toHSV(): {
                h: number;
                s: number;
                v: number;
            };
            /**
             * @zh 设置当前颜色使其与指定颜色相等。
             * @param other 相比较的颜色。
             * @overload 重载
             * @param [r=0] 指定的 Red 通道，[0-255]。
             * @param [g=0] 指定的 Green 通道。
             * @param [b=0] 指定的 Blue 通道。
             * @param [a=255] 指定的 Alpha 通道。
             * @returns 当前颜色。
             */
            set(other: Color, g?: number, b?: number, a?: number): Color;
            /**
             * @zh 将当前颜色乘以与指定颜色
             * @param other 指定的颜色。
             */
            multiply(other: Color): this;
            _set_r_unsafe(red: any): this;
            _set_g_unsafe(green: any): this;
            _set_b_unsafe(blue: any): this;
            _set_a_unsafe(alpha: any): this;
        }
        export function color(other: Color | string): Color;
        export function color(r?: number, g?: number, b?: number, a?: number): Color;
        /**
         * @en Tests whether or not the arguments have approximately the same value, within an absolute<br/>
         * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less<br/>
         * than or equal to 1.0, and a relative tolerance is used for larger values)
         * @zh 在glMatrix的绝对或相对容差范围内，测试参数是否具有近似相同的值。<br/>
         * EPSILON(小于等于1.0的值采用绝对公差，大于1.0的值采用相对公差)
         * @param a The first number to test.
         * @param b The second number to test.
         * @return True if the numbers are approximately equal, false otherwise.
         */
        export function equals(a: number, b: number): boolean;
        /**
         * @en Tests whether or not the arguments have approximately the same value by given maxDiff<br/>
         * @zh 通过给定的最大差异，测试参数是否具有近似相同的值。
         * @param a The first number to test.
         * @param b The second number to test.
         * @param maxDiff Maximum difference.
         * @return True if the numbers are approximately equal, false otherwise.
         */
        export function approx(a: number, b: number, maxDiff: number): boolean;
        /**
         * @en Clamps a value between a minimum float and maximum float value.<br/>
         * @zh 返回最小浮点数和最大浮点数之间的一个数值。可以使用 clamp 函数将不断变化的数值限制在范围内。
         * @param val
         * @param min
         * @param max
         */
        export function clamp(val: number, min: number, max: number): number;
        /**
         * @en Clamps a value between 0 and 1.<br/>
         * @zh 将值限制在0和1之间。
         * @param val
         */
        export function clamp01(val: number): number;
        /**
         * @param from
         * @param to
         * @param ratio - The interpolation coefficient.
         */
        export function lerp(from: number, to: number, ratio: number): number;
        /**
         * @en Convert Degree To Radian<br/>
         * @zh 把角度换算成弧度。
         * @param {Number} a Angle in Degrees
         */
        export function toRadian(a: number): number;
        /**
         * @en Convert Radian To Degree<br/>
         * @zh 把弧度换算成角度。
         * @param {Number} a Angle in Radian
         */
        export function toDegree(a: number): number;
        /**
         * @en Returns a floating-point random number between min (inclusive) and max (exclusive).<br/>
         * @zh 返回最小(包含)和最大(不包含)之间的浮点随机数。
         * @method randomRange
         * @param min
         * @param max
         * @return The random number.
         */
        export function randomRange(min: number, max: number): number;
        /**
         * @en Returns a random integer between min (inclusive) and max (exclusive).<br/>
         * @zh 返回最小(包含)和最大(不包含)之间的随机整数。
         * @param min
         * @param max
         * @return The random integer.
         */
        export function randomRangeInt(min: number, max: number): number;
        /**
         * Linear congruential generator using Hull-Dobell Theorem.
         *
         * @param seed The random seed.
         * @return The pseudo random.
         */
        export function pseudoRandom(seed: number): number;
        /**
         * Returns a floating-point pseudo-random number between min (inclusive) and max (exclusive).
         *
         * @param seed
         * @param min
         * @param max
         * @return The random number.
         */
        export function pseudoRandomRange(seed: number, min: number, max: number): number;
        /**
         * @en Returns a pseudo-random integer between min (inclusive) and max (exclusive).<br/>
         * @zh 返回最小(包含)和最大(不包含)之间的浮点伪随机数。
         * @param seed
         * @param min
         * @param max
         * @return The random integer.
         */
        export function pseudoRandomRangeInt(seed: number, min: number, max: number): number;
        /**
         * Returns the next power of two for the value.<br/>
         *
         * @param val
         * @return The the next power of two.
         */
        export function nextPow2(val: number): number;
        /**
         * @en Returns float remainder for t / length.<br/>
         * @zh 返回t / length的浮点余数。
         * @param t Time start at 0.
         * @param length Time of one cycle.
         * @return The Time wrapped in the first cycle.
         */
        export function repeat(t: number, length: number): number;
        /**
         * Returns time wrapped in ping-pong mode.
         *
         * @param t Time start at 0.
         * @param length Time of one cycle.
         * @return The time wrapped in the first cycle.
         */
        export function pingPong(t: number, length: number): number;
        /**
         * @en Returns ratio of a value within a given range.<br/>
         * @zh 返回给定范围内的值的比率。
         * @param from Start value.
         * @param to End value.
         * @param value Given value.
         * @return The ratio between [from, to].
         */
        export function inverseLerp(from: number, to: number, value: number): number;
        /**
         * @zh 对所有分量的绝对值进行比较大小，返回绝对值最大的分量。
         * @param v 类 Vec3 结构
         * @returns 绝对值最大的分量
         */
        export function absMaxComponent(v: __private.cocos_core_math_type_define_IVec3Like): number;
        /**
         * @zh 对 a b 的绝对值进行比较大小，返回绝对值最大的值。
         * @param a number
         * @param b number
         */
        export function absMax(a: number, b: number): number;
        export const EPSILON = 0.000001;
        /**
         * @method random
         */
        export const random: () => number;
        export namespace __private {
            export interface cocos_core_math_type_define_IVec2Like {
                x: number;
                y: number;
            }
            export interface cocos_core_math_type_define_IMat3Like {
                m00: number;
                m01: number;
                m02: number;
                m03: number;
                m04: number;
                m05: number;
                m06: number;
                m07: number;
                m08: number;
            }
            export interface cocos_core_math_type_define_IMat4Like {
                m00: number;
                m01: number;
                m02: number;
                m03: number;
                m04: number;
                m05: number;
                m06: number;
                m07: number;
                m08: number;
                m09: number;
                m10: number;
                m11: number;
                m12: number;
                m13: number;
                m14: number;
                m15: number;
            }
            export interface IWritableArrayLike<T> {
                length: number;
                [index: number]: T;
            }
            export interface cocos_core_math_type_define_IVec3Like {
                x: number;
                y: number;
                z: number;
            }
            export interface cocos_core_math_type_define_IQuatLike {
                x: number;
                y: number;
                z: number;
                w: number;
            }
            export interface cocos_core_math_type_define_IVec4Like {
                x: number;
                y: number;
                z: number;
                w: number;
            }
            export interface cocos_core_math_type_define_ISizeLike {
                width: number;
                height: number;
            }
            export interface cocos_core_math_type_define_IRectLike {
                x: number;
                y: number;
                width: number;
                height: number;
            }
            /**
             * @category core/math
             */
            /**
             * @hidden
             */
            export interface cocos_core_math_type_define_IColorLike {
                r: number;
                g: number;
                b: number;
                a: number;
                _val: number;
            }
        }
    }
    export namespace memop {
        /**
         * 可以自动分配内存的数据结构
         * @category memop
         */
        /**
         * @zh 对象池。
         */
        export class Pool<T> {
            /**
             * 构造函数。
             * @param fn 元素构造函数。
             * @param size 初始大小。
             */
            constructor(fn: () => T, size: number);
            /**
             * @zh 从对象池中取出一个对象。
             */
            alloc(): T;
            /**
             * @zh 将一个对象放回对象池中。
             * @param obj 释放的对象。
             */
            free(obj: T): void;
            /**
             * 清除对象池。
             * @param fn 清除回调，对每个释放的对象调用一次。
             */
            clear(fn: (obj: T) => void): void;
        }
        /**
         * @category memop
         */
        /**
         * @zh 循环对象池。
         */
        export class RecyclePool<T = any> {
            /**
             * 构造函数。
             * @param fn 对象构造函数。
             * @param size 初始大小。
             */
            constructor(fn: () => T, size: number);
            get length(): number;
            get data(): T[];
            /**
             * @zh 清空对象池。
             */
            reset(): void;
            /**
             * @zh 设置对象池大小。
             * @param size 对象池大小。
             */
            resize(size: number): void;
            /**
             * @zh 从对象池中取出一个对象。
             */
            add(): T;
            /**
             * @zh 释放对象池中的一个元素。
             * @param idx 释放对象的索引。
             */
            removeAt(idx: number): void;
        }
        /**
         * @category memop
         */
        /**
         * @zh
         * 缓存数组
         * 该数据结构内存只增不减，适用于处理内存常驻递增的分配策略
         */
        export class CachedArray<T> {
            /**
             * @zh
             * 实际存储的数据内容
             */
            array: T[];
            /**
             * @zh
             * 数组长度
             */
            length: number;
            /**
             * 构造函数
             * @param length 数组初始化长度
             * @param compareFn 比较函数
             */
            constructor(length: number, compareFn?: (a: T, b: T) => number);
            /**
             * @zh
             * 向数组中添加一个元素
             * @param item 数组元素
             */
            push(item: T): void;
            /**
             * @zh
             * 弹出数组最后一个元素
             * @param item 数组元素
             */
            pop(): T | undefined;
            /**
             * @zh
             * 得到数组中指定索引的元素
             * @param item 数组元素
             */
            get(idx: number): T;
            /**
             * @zh
             * 清空数组所有元素
             */
            clear(): void;
            /**
             * @zh
             * 排序数组
             */
            sort(): void;
            /**
             * @zh
             * 连接一个指定数组中的所有元素到当前数组末尾
             */
            concat(array: T[]): void;
            /**
             * @zh 删除指定位置的元素并将最后一个元素移动至该位置。
             * @param idx 数组索引。
             */
            fastRemove(idx: number): void;
            /**
             * @zh 返回某个数组元素对应的下标。
             * @param val 数组元素。
             */
            indexOf(val: T): number;
        }
    }
    export namespace geometry {
        export const enums: {
            SHAPE_RAY: number;
            SHAPE_LINE: number;
            SHAPE_SPHERE: number;
            SHAPE_AABB: number;
            SHAPE_OBB: number;
            SHAPE_PLANE: number;
            SHAPE_TRIANGLE: number;
            SHAPE_FRUSTUM: number;
            SHAPE_FRUSTUM_ACCURATE: number;
            SHAPE_CAPSULE: number;
        };
        export namespace distance {
            /**
             * @en
             * the distance between a point and a plane
             * @zh
             * 计算点和平面之间的距离。
             * @param {Vec3} point 点。
             * @param {plane} plane 平面。
             * @return 距离。
             */
            export function point_plane(point: math.Vec3, plane_: plane): number;
            /**
             * @en
             * the closest point on plane to a given point
             * @zh
             * 计算平面上最接近给定点的点。
             * @param out 最近点。
             * @param point 给定点。
             * @param plane 平面。
             * @return 最近点。
             */
            export function pt_point_plane(out: math.Vec3, point: math.Vec3, plane_: plane): math.Vec3;
            /**
             * @en
             * the closest point on aabb to a given point
             * @zh
             * 计算 aabb 上最接近给定点的点。
             * @param {Vec3} out 最近点。
             * @param {Vec3} point 给定点。
             * @param {aabb} aabb 轴对齐包围盒。
             * @return {Vec3} 最近点。
             */
            export function pt_point_aabb(out: math.Vec3, point: math.Vec3, aabb_: aabb): math.Vec3;
            /**
             * @en
             * the closest point on obb to a given point
             * @zh
             * 计算 obb 上最接近给定点的点。
             * @param {Vec3} out 最近点。
             * @param {Vec3} point 给定点。
             * @param {obb} obb 方向包围盒。
             * @return {Vec3} 最近点。
             */
            export function pt_point_obb(out: math.Vec3, point: math.Vec3, obb_: obb): math.Vec3;
            /**
             * @en
             * Calculate the nearest point on the line to the given point.
             * @zh
             * 计算给定点距离直线上最近的一点。
             * @param out 最近点
             * @param point 给定点
             * @param linePointA 线上的某点 A
             * @param linePointB 线上的某点 B
             */
            export function pt_point_line(out: math.Vec3, point: math.Vec3, linePointA: math.Vec3, linePointB: math.Vec3): void;
        }
        /**
         * @en
         * Algorithm of intersect detect for basic geometry.
         * @zh
         * 基础几何的相交性检测算法。
         */
        export const intersect: {
            ray_sphere: (ray: ray, sphere: sphere) => number;
            ray_aabb: (ray: ray, aabb: aabb) => number;
            ray_obb: (ray: ray, obb: obb) => number;
            ray_plane: (ray: ray, plane: plane) => number;
            ray_triangle: (ray: ray, triangle: triangle, doubleSided?: boolean | undefined) => number;
            ray_capsule: (ray: ray, capsule: capsule) => number;
            ray_subMesh: (ray: ray, submesh: renderer.__private.cocos_core_assets_mesh_RenderingSubMesh, option?: IRaySubMeshOptions | undefined) => boolean | undefined;
            ray_mesh: (ray: ray, mesh: Mesh, option?: IRayMeshOptions | undefined) => boolean;
            ray_model: (r: ray, model: renderer.Model, option?: IRayModelOptions | undefined) => boolean;
            line_sphere: typeof __private.cocos_core_geometry_intersect_line_sphere;
            line_aabb: typeof __private.cocos_core_geometry_intersect_line_aabb;
            line_obb: typeof __private.cocos_core_geometry_intersect_line_obb;
            line_plane: (line: line, plane: plane) => number;
            line_triangle: (line: line, triangle: triangle, outPt?: math.Vec3 | undefined) => number;
            sphere_sphere: (sphere0: sphere, sphere1: sphere) => boolean;
            sphere_aabb: (sphere: sphere, aabb: aabb) => boolean;
            sphere_obb: (sphere: sphere, obb: obb) => boolean;
            sphere_plane: (sphere: sphere, plane: plane) => number;
            sphere_frustum: (sphere: sphere, frustum: frustum) => number;
            sphere_frustum_accurate: (sphere: sphere, frustum: frustum) => number;
            sphere_capsule: (sphere: sphere, capsule: capsule) => boolean;
            aabb_aabb: (aabb1: aabb, aabb2: aabb) => boolean;
            aabb_obb: (aabb: aabb, obb: obb) => number;
            aabb_plane: (aabb: aabb, plane: plane) => number;
            aabb_frustum: (aabb: aabb, frustum: frustum) => number;
            aabb_frustum_accurate: (aabb: aabb, frustum: frustum) => number;
            obb_obb: (obb1: obb, obb2: obb) => number;
            obb_plane: (obb: obb, plane: plane) => number;
            obb_frustum: (obb: obb, frustum: frustum) => number;
            obb_frustum_accurate: (obb: obb, frustum: frustum) => number;
            obb_point: (obb: obb, point: math.Vec3) => boolean;
            obb_capsule: (obb: obb, capsule: capsule) => boolean | 1 | 0;
            capsule_capsule: (capsuleA: capsule, capsuleB: capsule) => boolean;
            /**
             * @zh
             * g1 和 g2 的相交性检测，可填入基础几何中的形状。
             * @param g1 几何1
             * @param g2 几何2
             * @param outPt 可选，相交点。（注：仅部分形状的检测带有这个返回值）
             */
            resolve(g1: any, g2: any, outPt?: null): any;
        };
        /**
         * @en
         * Basic Geometry: line.
         * @zh
         * 基础几何 line。
         */
        export class line {
            /**
             * @en
             * create a new line
             * @zh
             * 创建一个新的 line。
             * @param sx 起点的 x 部分。
             * @param sy 起点的 y 部分。
             * @param sz 起点的 z 部分。
             * @param ex 终点的 x 部分。
             * @param ey 终点的 y 部分。
             * @param ez 终点的 z 部分。
             * @return
             */
            static create(sx: number, sy: number, sz: number, ex: number, ey: number, ez: number): line;
            /**
             * @en
             * Creates a new line initialized with values from an existing line
             * @zh
             * 克隆一个新的 line。
             * @param a 克隆的来源。
             * @return 克隆出的对象。
             */
            static clone(a: line): line;
            /**
             * @en
             * Copy the values from one line to another
             * @zh
             * 复制一个线的值到另一个。
             * @param out 接受操作的对象。
             * @param a 复制的来源。
             * @return 接受操作的对象。
             */
            static copy(out: line, a: line): line;
            /**
             * @en
             * create a line from two points
             * @zh
             * 用两个点创建一个线。
             * @param out 接受操作的对象。
             * @param start 起点。
             * @param end 终点。
             * @return out 接受操作的对象。
             */
            static fromPoints(out: line, start: math.Vec3, end: math.Vec3): line;
            /**
             * @en
             * Set the components of a Vec3 to the given values
             * @zh
             * 将给定线的属性设置为给定值。
             * @param out 接受操作的对象。
             * @param sx 起点的 x 部分。
             * @param sy 起点的 y 部分。
             * @param sz 起点的 z 部分。
             * @param ex 终点的 x 部分。
             * @param ey 终点的 y 部分。
             * @param ez 终点的 z 部分。
             * @return out 接受操作的对象。
             */
            static set(out: line, sx: number, sy: number, sz: number, ex: number, ey: number, ez: number): line;
            /**
             * @zh
             * 计算线的长度。
             * @param a 要计算的线。
             * @return 长度。
             */
            static len(a: line): number;
            /**
             * @zh
             * 起点。
             */
            s: math.Vec3;
            /**
             * @zh
             * 终点。
             */
            e: math.Vec3;
            get type(): number;
            /**
             * 构造一条线。
             * @param sx 起点的 x 部分。
             * @param sy 起点的 y 部分。
             * @param sz 起点的 z 部分。
             * @param ex 终点的 x 部分。
             * @param ey 终点的 y 部分。
             * @param ez 终点的 z 部分。
             */
            constructor(sx?: number, sy?: number, sz?: number, ex?: number, ey?: number, ez?: number);
            /**
             * @zh
             * 计算线的长度。
             * @param a 要计算的线。
             * @return 长度。
             */
            length(): number;
        }
        /**
         * @en
         * Basic Geometry: plane.
         * @zh
         * 基础几何 plane。
         */
        export class plane {
            /**
             * @en
             * create a new plane
             * @zh
             * 创建一个新的 plane。
             * @param nx 法向分量的 x 部分。
             * @param ny 法向分量的 y 部分。
             * @param nz 法向分量的 z 部分。
             * @param d 与原点的距离。
             * @return
             */
            static create(nx: number, ny: number, nz: number, d: number): plane;
            /**
             * @en
             * clone a new plane
             * @zh
             * 克隆一个新的 plane。
             * @param p 克隆的来源。
             * @return 克隆出的对象。
             */
            static clone(p: plane): plane;
            /**
             * @en
             * copy the values from one plane to another
             * @zh
             * 复制一个平面的值到另一个。
             * @param out 接受操作的对象。
             * @param p 复制的来源。
             * @return 接受操作的对象。
             */
            static copy(out: plane, p: plane): plane;
            /**
             * @en
             * create a plane from three points
             * @zh
             * 用三个点创建一个平面。
             * @param out 接受操作的对象。
             * @param a 点 a。
             * @param b 点 b。
             * @param c 点 c。
             * @return out 接受操作的对象。
             */
            static fromPoints(out: plane, a: math.Vec3, b: math.Vec3, c: math.Vec3): plane;
            /**
             * @en
             * Set the components of a plane to the given values
             * @zh
             * 将给定平面的属性设置为给定值。
             * @param out 接受操作的对象。
             * @param nx 法向分量的 x 部分。
             * @param ny 法向分量的 y 部分。
             * @param nz 法向分量的 z 部分。
             * @param d 与原点的距离。
             * @return out 接受操作的对象。
             */
            static set(out: plane, nx: number, ny: number, nz: number, d: number): plane;
            /**
             * @en
             * create plane from normal and point
             * @zh
             * 用一条法线和一个点创建平面。
             * @param out 接受操作的对象。
             * @param normal 平面的法线。
             * @param point 平面上的一点。
             * @return out 接受操作的对象。
             */
            static fromNormalAndPoint(out: plane, normal: math.Vec3, point: math.Vec3): plane;
            /**
             * @en
             * normalize a plane
             * @zh
             * 归一化一个平面。
             * @param out 接受操作的对象。
             * @param a 操作的源数据。
             * @return out 接受操作的对象。
             */
            static normalize(out: plane, a: plane): plane;
            /**
             * @en
             * The normal of the plane.
             * @zh
             * 法线向量。
             */
            n: math.Vec3;
            /**
             * @en
             * The distance from the origin to the plane.
             * @zh
             * 原点到平面的距离。
             */
            d: number;
            get type(): number;
            protected readonly _type: number;
            /**
             * @en
             * Construct a plane.
             * @zh
             * 构造一个平面。
             * @param nx 法向分量的 x 部分。
             * @param ny 法向分量的 y 部分。
             * @param nz 法向分量的 z 部分。
             * @param d 与原点的距离。
             */
            constructor(nx?: number, ny?: number, nz?: number, d?: number);
            /**
             * @en
             * transform this plane.
             * @zh
             * 变换一个平面。
             * @param mat
             */
            transform(mat: math.Mat4): void;
        }
        /**
         * @en
         * Basic Geometry: ray.
         * @zh
         * 基础几何 射线。
         */
        export class ray {
            /**
             * @en
             * create a new ray
             * @zh
             * 创建一条射线。
             * @param {number} ox 起点的 x 部分。
             * @param {number} oy 起点的 y 部分。
             * @param {number} oz 起点的 z 部分。
             * @param {number} dx 方向的 x 部分。
             * @param {number} dy 方向的 y 部分。
             * @param {number} dz 方向的 z 部分。
             * @return {ray} 射线。
             */
            static create(ox?: number, oy?: number, oz?: number, dx?: number, dy?: number, dz?: number): ray;
            /**
             * @en
             * Creates a new ray initialized with values from an existing ray
             * @zh
             * 从一条射线克隆出一条新的射线。
             * @param {ray} a 克隆的目标。
             * @return {ray} 克隆出的新对象。
             */
            static clone(a: ray): ray;
            /**
             * @en
             * Copy the values from one ray to another
             * @zh
             * 将从一个 ray 的值复制到另一个 ray。
             * @param {ray} out 接受操作的 ray。
             * @param {ray} a 被复制的 ray。
             * @return {ray} out 接受操作的 ray。
             */
            static copy(out: ray, a: ray): ray;
            /**
             * @en
             * create a ray from two points
             * @zh
             * 用两个点创建一条射线。
             * @param {ray} out 接受操作的射线。
             * @param {Vec3} origin 射线的起点。
             * @param {Vec3} target 射线上的一点。
             * @return {ray} out 接受操作的射线。
             */
            static fromPoints(out: ray, origin: math.Vec3, target: math.Vec3): ray;
            /**
             * @en
             * Set the components of a ray to the given values
             * @zh
             * 将给定射线的属性设置为给定的值。
             * @param {ray} out 接受操作的射线。
             * @param {number} ox 起点的 x 部分。
             * @param {number} oy 起点的 y 部分。
             * @param {number} oz 起点的 z 部分。
             * @param {number} dx 方向的 x 部分。
             * @param {number} dy 方向的 y 部分。
             * @param {number} dz 方向的 z 部分。
             * @return {ray} out 接受操作的射线。
             */
            static set(out: ray, ox: number, oy: number, oz: number, dx: number, dy: number, dz: number): ray;
            /**
             * @en
             * The origin of the ray.
             * @zh
             * 起点。
             */
            o: math.Vec3;
            /**
             * @en
             * The direction of the ray.
             * @zh
             * 方向。
             */
            d: math.Vec3;
            get type(): number;
            protected readonly _type: number;
            /**
             * @en
             * Construct a ray;
             * @zh
             * 构造一条射线。
             * @param {number} ox 起点的 x 部分。
             * @param {number} oy 起点的 y 部分。
             * @param {number} oz 起点的 z 部分。
             * @param {number} dx 方向的 x 部分。
             * @param {number} dy 方向的 y 部分。
             * @param {number} dz 方向的 z 部分。
             */
            constructor(ox?: number, oy?: number, oz?: number, dx?: number, dy?: number, dz?: number);
            /**
             * @en
             * Compute a point with the distance between the origin.
             * @zh
             * 根据给定距离计算出射线上的一点。
             * @param out 射线上的另一点。
             * @param distance 给定距离。
             */
            computeHit(out: math.__private.cocos_core_math_type_define_IVec3Like, distance: number): void;
        }
        /**
         * @en
         * Basic Geometry: triangle.
         * @zh
         * 基础几何 三角形。
         */
        export class triangle {
            /**
             * @en
             * create a new triangle
             * @zh
             * 创建一个新的 triangle。
             * @param {number} ax a 点的 x 部分。
             * @param {number} ay a 点的 y 部分。
             * @param {number} az a 点的 z 部分。
             * @param {number} bx b 点的 x 部分。
             * @param {number} by b 点的 y 部分。
             * @param {number} bz b 点的 z 部分。
             * @param {number} cx c 点的 x 部分。
             * @param {number} cy c 点的 y 部分。
             * @param {number} cz c 点的 z 部分。
             * @return {triangle} 一个新的 triangle。
             */
            static create(ax?: number, ay?: number, az?: number, bx?: number, by?: number, bz?: number, cx?: number, cy?: number, cz?: number): triangle;
            /**
             * @en
             * clone a new triangle
             * @zh
             * 克隆一个新的 triangle。
             * @param {triangle} t 克隆的目标。
             * @return {triangle} 克隆出的新对象。
             */
            static clone(t: triangle): triangle;
            /**
             * @en
             * copy the values from one triangle to another
             * @zh
             * 将一个 triangle 的值复制到另一个 triangle。
             * @param {triangle} out 接受操作的 triangle。
             * @param {triangle} t 被复制的 triangle。
             * @return {triangle} out 接受操作的 triangle。
             */
            static copy(out: triangle, t: triangle): triangle;
            /**
             * @en
             * Create a triangle from three points
             * @zh
             * 用三个点创建一个 triangle。
             * @param {triangle} out 接受操作的 triangle。
             * @param {Vec3} a a 点。
             * @param {Vec3} b b 点。
             * @param {Vec3} c c 点。
             * @return {triangle} out 接受操作的 triangle。
             */
            static fromPoints(out: triangle, a: math.Vec3, b: math.Vec3, c: math.Vec3): triangle;
            /**
             * @en
             * Set the components of a triangle to the given values
             * @zh
             * 将给定三角形的属性设置为给定值。
             * @param {triangle} out 给定的三角形。
             * @param {number} ax a 点的 x 部分。
             * @param {number} ay a 点的 y 部分。
             * @param {number} az a 点的 z 部分。
             * @param {number} bx b 点的 x 部分。
             * @param {number} by b 点的 y 部分。
             * @param {number} bz b 点的 z 部分。
             * @param {number} cx c 点的 x 部分。
             * @param {number} cy c 点的 y 部分。
             * @param {number} cz c 点的 z 部分。
             * @return {triangle}
             * @function
             */
            static set(out: triangle, ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number): triangle;
            /**
             * @en
             * Point a.
             * @zh
             * 点 a。
             */
            a: math.Vec3;
            /**
             * @en
             * Point b.
             * @zh
             * 点 b。
             */
            b: math.Vec3;
            /**
             * @en
             * Point c.
             * @zh
             * 点 c。
             */
            c: math.Vec3;
            get type(): number;
            protected readonly _type: number;
            /**
             * @en
             * Construct a triangle.
             * @zh
             * 构造一个三角形。
             * @param {number} ax a 点的 x 部分。
             * @param {number} ay a 点的 y 部分。
             * @param {number} az a 点的 z 部分。
             * @param {number} bx b 点的 x 部分。
             * @param {number} by b 点的 y 部分。
             * @param {number} bz b 点的 z 部分。
             * @param {number} cx c 点的 x 部分。
             * @param {number} cy c 点的 y 部分。
             * @param {number} cz c 点的 z 部分。
             */
            constructor(ax?: number, ay?: number, az?: number, bx?: number, by?: number, bz?: number, cx?: number, cy?: number, cz?: number);
        }
        /**
         * @en
         * Basic Geometry: sphere.
         * @zh
         * 基础几何 轴对齐球。
         */
        export class sphere {
            /**
             * @en
             * create a new sphere
             * @zh
             * 创建一个新的 sphere 实例。
             * @param cx 形状的相对于原点的 X 坐标。
             * @param cy 形状的相对于原点的 Y 坐标。
             * @param cz 形状的相对于原点的 Z 坐标。
             * @param r 球体的半径
             * @return {sphere} 返回一个 sphere。
             */
            static create(cx: number, cy: number, cz: number, r: number): sphere;
            /**
             * @en
             * clone a new sphere
             * @zh
             * 克隆一个新的 sphere 实例。
             * @param {sphere} p 克隆的目标。
             * @return {sphere} 克隆出的示例。
             */
            static clone(p: sphere): sphere;
            /**
             * @en
             * copy the values from one sphere to another
             * @zh
             * 将从一个 sphere 的值复制到另一个 sphere。
             * @param {sphere} out 接受操作的 sphere。
             * @param {sphere} a 被复制的 sphere。
             * @return {sphere} out 接受操作的 sphere。
             */
            static copy(out: sphere, p: sphere): sphere;
            /**
             * @en
             * create a new bounding sphere from two corner points
             * @zh
             * 从两个点创建一个新的 sphere。
             * @param out - 接受操作的 sphere。
             * @param minPos - sphere 的最小点。
             * @param maxPos - sphere 的最大点。
             * @returns {sphere} out 接受操作的 sphere。
             */
            static fromPoints(out: sphere, minPos: math.Vec3, maxPos: math.Vec3): sphere;
            /**
             * @en
             * Set the components of a sphere to the given values
             * @zh
             * 将球体的属性设置为给定的值。
             * @param {sphere} out 接受操作的 sphere。
             * @param cx 形状的相对于原点的 X 坐标。
             * @param cy 形状的相对于原点的 Y 坐标。
             * @param cz 形状的相对于原点的 Z 坐标。
             * @param {number} r 半径。
             * @return {sphere} out 接受操作的 sphere。
             * @function
             */
            static set(out: sphere, cx: number, cy: number, cz: number, r: number): sphere;
            /**
             * @en
             * The center of this sphere.
             * @zh
             * 本地坐标的中心点。
             */
            center: math.Vec3;
            /**
             * @en
             * The radius of this sphere.
             * @zh
             * 半径。
             */
            radius: number;
            get type(): number;
            protected readonly _type: number;
            /**
             * @en
             * Construct a sphere.
             * @zh
             * 构造一个球。
             * @param cx 该球的世界坐标的 X 坐标。
             * @param cy 该球的世界坐标的 Y 坐标。
             * @param cz 该球的世界坐标的 Z 坐标。
             * @param {number} r 半径。
             */
            constructor(cx?: number, cy?: number, cz?: number, r?: number);
            /**
             * @en
             * Get a clone.
             * @zh
             * 获得克隆。
             */
            clone(): sphere;
            /**
             * @en
             * Copy a sphere.
             * @zh
             * 拷贝对象。
             * @param a 拷贝的目标。
             */
            copy(a: sphere): sphere;
            /**
             * @en
             * Get the bounding points of this shape
             * @zh
             * 获取此形状的边界点。
             * @param {Vec3} minPos 最小点。
             * @param {Vec3} maxPos 最大点。
             */
            getBoundary(minPos: math.Vec3, maxPos: math.Vec3): void;
            /**
             * @en
             * Transform this shape
             * @zh
             * 将 out 根据这个 sphere 的数据进行变换。
             * @param m 变换的矩阵。
             * @param pos 变换的位置部分。
             * @param rot 变换的旋转部分。
             * @param scale 变换的缩放部分。
             * @param out 变换的目标。
             */
            transform(m: math.Mat4, pos: math.Vec3, rot: math.Quat, scale: math.Vec3, out: sphere): void;
            /**
             * @en
             * Translate and rotate this sphere.
             * @zh
             * 将 out 根据这个 sphere 的数据进行变换。
             * @param m 变换的矩阵。
             * @param rot 变换的旋转部分。
             * @param out 变换的目标。
             */
            translateAndRotate(m: math.Mat4, rot: math.Quat, out: sphere): void;
            /**
             * @en
             * Scaling this sphere.
             * @zh
             * 将 out 根据这个 sphere 的数据进行缩放。
             * @param scale 缩放值。
             * @param out 缩放的目标。
             */
            setScale(scale: math.Vec3, out: sphere): void;
        }
        /**
         * @en
         * Basic Geometry: Axis-aligned bounding box, using center and half extents structure.
         * @zh
         * 基础几何  轴对齐包围盒，使用中心点和半长宽高的结构。
         */
        export class aabb {
            /**
             * @en
             * create a new aabb
             * @zh
             * 创建一个新的 aabb 实例。
             * @param px - aabb 的原点的 X 坐标。
             * @param py - aabb 的原点的 Y 坐标。
             * @param pz - aabb 的原点的 Z 坐标。
             * @param hw - aabb 宽度的一半。
             * @param hh - aabb 高度的一半。
             * @param hl - aabb 长度的一半。
             * @returns 返回新创建的 aabb 实例。
             */
            static create(px?: number, py?: number, pz?: number, hw?: number, hh?: number, hl?: number): aabb;
            /**
             * @en
             * clone a new aabb
             * @zh
             * 克隆一个 aabb。
             * @param a - 克隆的目标。
             * @returns 克隆出的 aabb。
             */
            static clone(a: aabb): aabb;
            /**
             * @en
             * copy the values from one aabb to another
             * @zh
             * 将从一个 aabb 的值复制到另一个 aabb。
             * @param {aabb} out 接受操作的 aabb。
             * @param {aabb} a 被复制的 aabb。
             * @return {aabb} out 接受操作的 aabb。
             */
            static copy(out: aabb, a: aabb): aabb;
            /**
             * @en
             * create a new aabb from two corner points
             * @zh
             * 从两个点创建一个新的 aabb。
             * @param out - 接受操作的 aabb。
             * @param minPos - aabb 的最小点。
             * @param maxPos - aabb 的最大点。
             * @returns {aabb} out 接受操作的 aabb。
             */
            static fromPoints(out: aabb, minPos: math.Vec3, maxPos: math.Vec3): aabb;
            /**
             * @en
             * Set the components of a aabb to the given values
             * @zh
             * 将 aabb 的属性设置为给定的值。
             * @param {aabb} out 接受操作的 aabb。
             * @param px - aabb 的原点的 X 坐标。
             * @param py - aabb 的原点的 Y 坐标。
             * @param pz - aabb 的原点的 Z 坐标。
             * @param hw - aabb 宽度的一半。
             * @param hh - aabb 高度的一半。
             * @param hl - aabb 长度度的一半。
             * @return {aabb} out 接受操作的 aabb。
             */
            static set(out: aabb, px: number, py: number, pz: number, hw: number, hh: number, hl: number): aabb;
            /**
             * @en
             * Merge tow aabb.
             * @zh
             * 合并两个 aabb 到 out。
             * @param out 接受操作的 aabb。
             * @param a 输入的 aabb。
             * @param b 输入的 aabb。
             * @returns {aabb} out 接受操作的 aabb。
             */
            static merge(out: aabb, a: aabb, b: aabb): aabb;
            /**
             * @en
             * Transform this aabb.
             * @zh
             * 变换一个 aabb 到 out 中。
             * @param out 接受操作的 aabb。
             * @param a 输入的源 aabb。
             * @param matrix 矩阵。
             * @returns {aabb} out 接受操作的 aabb。
             */
            static transform(out: aabb, a: aabb, matrix: math.Mat4): aabb;
            /**
             * @zh
             * 本地坐标的中心点。
             */
            center: math.Vec3;
            /**
             * @zh
             * 长宽高的一半。
             */
            halfExtents: math.Vec3;
            get type(): number;
            protected readonly _type: number;
            constructor(px?: number, py?: number, pz?: number, hw?: number, hh?: number, hl?: number);
            /**
             * @en
             * Get the bounding points of this shape
             * @zh
             * 获取 aabb 的最小点和最大点。
             * @param {Vec3} minPos 最小点。
             * @param {Vec3} maxPos 最大点。
             */
            getBoundary(minPos: math.Vec3, maxPos: math.Vec3): void;
            /**
             * @en
             * Transform this shape
             * @zh
             * 将 out 根据这个 aabb 的数据进行变换。
             * @param m 变换的矩阵。
             * @param pos 变换的位置部分。
             * @param rot 变换的旋转部分。
             * @param scale 变换的缩放部分。
             * @param out 变换的目标。
             */
            transform(m: math.Mat4, pos: math.Vec3 | null, rot: math.Quat | null, scale: math.Vec3 | null, out: aabb): void;
            /**
             * @zh
             * 获得克隆。
             * @returns {aabb}
             */
            clone(): aabb;
            /**
             * @zh
             * 拷贝对象。
             * @param a 拷贝的目标。
             * @returns {aabb}
             */
            copy(a: aabb): aabb;
        }
        /**
         * @en
         * Basic Geometry: directional bounding box.
         * @zh
         * 基础几何  方向包围盒。
         */
        export class obb {
            /**
             * @en
             * create a new obb
             * @zh
             * 创建一个新的 obb 实例。
             * @param cx 形状的相对于原点的 X 坐标。
             * @param cy 形状的相对于原点的 Y 坐标。
             * @param cz 形状的相对于原点的 Z 坐标。
             * @param hw - obb 宽度的一半。
             * @param hh - obb 高度的一半。
             * @param hl - obb 长度的一半。
             * @param ox_1 方向矩阵参数。
             * @param ox_2 方向矩阵参数。
             * @param ox_3 方向矩阵参数。
             * @param oy_1 方向矩阵参数。
             * @param oy_2 方向矩阵参数。
             * @param oy_3 方向矩阵参数。
             * @param oz_1 方向矩阵参数。
             * @param oz_2 方向矩阵参数。
             * @param oz_3 方向矩阵参数。
             * @return 返回一个 obb。
             */
            static create(cx: number, cy: number, cz: number, hw: number, hh: number, hl: number, ox_1: number, ox_2: number, ox_3: number, oy_1: number, oy_2: number, oy_3: number, oz_1: number, oz_2: number, oz_3: number): obb;
            /**
             * @en
             * clone a new obb
             * @zh
             * 克隆一个 obb。
             * @param a 克隆的目标。
             * @returns 克隆出的新对象。
             */
            static clone(a: obb): obb;
            /**
             * @en
             * copy the values from one obb to another
             * @zh
             * 将从一个 obb 的值复制到另一个 obb。
             * @param {obb} out 接受操作的 obb。
             * @param {obb} a 被复制的 obb。
             * @return {obb} out 接受操作的 obb。
             */
            static copy(out: obb, a: obb): obb;
            /**
             * @en
             * create a new obb from two corner points
             * @zh
             * 用两个点创建一个新的 obb。
             * @param out - 接受操作的 obb。
             * @param minPos - obb 的最小点。
             * @param maxPos - obb 的最大点。
             * @returns {obb} out 接受操作的 obb。
             */
            static fromPoints(out: obb, minPos: math.Vec3, maxPos: math.Vec3): obb;
            /**
             * @en
             * Set the components of a obb to the given values
             * @zh
             * 将给定 obb 的属性设置为给定的值。
             * @param cx - obb 的原点的 X 坐标。
             * @param cy - obb 的原点的 Y 坐标。
             * @param cz - obb 的原点的 Z 坐标。
             * @param hw - obb 宽度的一半。
             * @param hh - obb 高度的一半。
             * @param hl - obb 长度的一半。
             * @param ox_1 方向矩阵参数。
             * @param ox_2 方向矩阵参数。
             * @param ox_3 方向矩阵参数。
             * @param oy_1 方向矩阵参数。
             * @param oy_2 方向矩阵参数。
             * @param oy_3 方向矩阵参数。
             * @param oz_1 方向矩阵参数。
             * @param oz_2 方向矩阵参数。
             * @param oz_3 方向矩阵参数。
             * @return {obb} out
             */
            static set(out: obb, cx: number, cy: number, cz: number, hw: number, hh: number, hl: number, ox_1: number, ox_2: number, ox_3: number, oy_1: number, oy_2: number, oy_3: number, oz_1: number, oz_2: number, oz_3: number): obb;
            /**
             * @zh
             * 本地坐标的中心点。
             */
            center: math.Vec3;
            /**
             * @zh
             * 长宽高的一半。
             */
            halfExtents: math.Vec3;
            /**
             * @zh
             * 方向矩阵。
             */
            orientation: math.Mat3;
            get type(): number;
            protected readonly _type: number;
            constructor(cx?: number, cy?: number, cz?: number, hw?: number, hh?: number, hl?: number, ox_1?: number, ox_2?: number, ox_3?: number, oy_1?: number, oy_2?: number, oy_3?: number, oz_1?: number, oz_2?: number, oz_3?: number);
            /**
             * @en
             * Get the bounding points of this shape
             * @zh
             * 获取 obb 的最小点和最大点。
             * @param {Vec3} minPos 最小点。
             * @param {Vec3} maxPos 最大点。
             */
            getBoundary(minPos: math.Vec3, maxPos: math.Vec3): void;
            /**
             * Transform this shape
             * @zh
             * 将 out 根据这个 obb 的数据进行变换。
             * @param m 变换的矩阵。
             * @param pos 变换的位置部分。
             * @param rot 变换的旋转部分。
             * @param scale 变换的缩放部分。
             * @param out 变换的目标。
             */
            transform(m: math.Mat4, pos: math.Vec3, rot: math.Quat, scale: math.Vec3, out: obb): void;
            /**
             * @zh
             * 将 out 根据这个 obb 的数据进行变换。
             * @param m 变换的矩阵。
             * @param rot 变换的旋转部分。
             * @param out 变换的目标。
             */
            translateAndRotate(m: math.Mat4, rot: math.Quat, out: obb): void;
            /**
             * @zh
             *  将 out 根据这个 obb 的数据进行缩放。
             * @param scale 缩放值。
             * @param out 缩放的目标。
             */
            setScale(scale: math.Vec3, out: obb): void;
        }
        /**
         * @en
         * Basic Geometry: capsule.
         * @zh
         * 基础几何，胶囊体。
         */
        export class capsule {
            get type(): number;
            protected readonly _type: number;
            /**
             * @en
             * Capsule sphere radius.
             * @zh
             * 胶囊体球部半径。
             */
            radius: number;
            /**
             * @en
             * The distance between the center point of the capsule and the center of the sphere.
             * @zh
             * 胶囊体中心点和球部圆心的距离。
             */
            halfHeight: number;
            /**
             * @en
             * Local orientation of capsule [0,1,2] => [x,y,z].
             * @zh
             * 胶囊体的本地朝向，映射关系 [0,1,2] => [x,y,z]。
             */
            axis: number;
            /**
             * @en
             * The origin of the capsule.
             * @zh
             * 胶囊体的原点。
             */
            readonly center: math.Vec3;
            /**
             * @en
             * The rotation of the capsule.
             * @zh
             * 胶囊体的旋转。
             */
            readonly rotation: math.Quat;
            /** cache, local center of ellipse */
            readonly ellipseCenter0: math.Vec3;
            readonly ellipseCenter1: math.Vec3;
            constructor(radius?: number, halfHeight?: number, axis?: number);
            /**
             * @en
             * Transform this capsule.
             * @zh
             * 变换此胶囊体。
             */
            transform(m: math.Mat4, pos: math.__private.cocos_core_math_type_define_IVec3Like, rot: math.__private.cocos_core_math_type_define_IQuatLike, scale: math.__private.cocos_core_math_type_define_IVec3Like, out: capsule): void;
            updateCache(): void;
            updateLocalCenter(): void;
        }
        /**
         * @en
         * Basic Geometry: frustum.
         * @zh
         * 基础几何 截头锥体。
         */
        export class frustum {
            set accurate(b: boolean);
            /**
             * @en
             * Create a ortho frustum.
             * @zh
             * 创建一个正交视锥体。
             * @param out 正交视锥体。
             * @param width 正交视锥体的宽度。
             * @param height 正交视锥体的高度。
             * @param near 正交视锥体的近平面值。
             * @param far 正交视锥体的远平面值。
             * @param transform 正交视锥体的变换矩阵。
             * @return {frustum} frustum.
             */
            static createOrtho: (out: frustum, width: number, height: number, near: number, far: number, transform: math.Mat4) => void;
            /**
             * @en
             * create a new frustum.
             * @zh
             * 创建一个新的截锥体。
             * @return {frustum} frustum.
             */
            static create(): frustum;
            /**
             * @en
             * Clone a frustum.
             * @zh
             * 克隆一个截锥体。
             */
            static clone(f: frustum): frustum;
            /**
             * @en
             * Copy the values from one frustum to another.
             * @zh
             * 从一个截锥体拷贝到另一个截锥体。
             */
            static copy(out: frustum, f: frustum): frustum;
            get type(): number;
            protected _type: number;
            planes: plane[];
            vertices: math.Vec3[];
            constructor();
            /**
             * @en
             * Update the frustum information according to the given transform matrix.
             * Note that the resulting planes are not normalized under normal mode.
             * @zh
             * 根据给定的变换矩阵更新截锥体信息，注意得到的平面不是在标准模式下归一化的。
             * @param {Mat4} m the view-projection matrix
             * @param {Mat4} inv the inverse view-projection matrix
             */
            update(m: math.Mat4, inv: math.Mat4): void;
            /**
             * @en
             * Transform this frustum.
             * @zh
             * 变换此截锥体。
             * @param mat 变换矩阵。
             */
            transform(mat: math.Mat4): void;
        }
        /**
         * @en
         * A key frame in the curve.
         * @zh
         * 曲线中的一个关键帧。
         */
        export class Keyframe {
            /**
             * @zh 当前帧时间。
             */
            time: number;
            /**
             * @zh 当前帧的值。
             */
            value: number;
            /**
             * @zh 左切线。
             */
            inTangent: number;
            /**
             * @zh 右切线。
             */
            outTangent: number;
        }
        /**
         * @en
         * Describe a curve in which three times Hermite interpolation is used for each adjacent key frame.
         * @zh
         * 描述一条曲线，其中每个相邻关键帧采用三次hermite插值计算。
         */
        export class AnimationCurve {
            /**
             * @en
             * The key frame of the curve.
             * @zh
             * 曲线的关键帧。
             */
            keyFrames: Keyframe[] | null;
            /**
             * @en
             * Loop mode [[WrapMode]] when the sampling time exceeds the left end.
             * @zh
             * 当采样时间超出左端时采用的循环模式[[WrapMode]]。
             */
            preWrapMode: number;
            /**
             * @en
             * Cycle mode [[WrapMode]] when the sampling time exceeds the right end.
             * @zh
             * 当采样时间超出右端时采用的循环模式[[WrapMode]]。
             */
            postWrapMode: number;
            /**
             * 构造函数。
             * @param keyFrames 关键帧。
             */
            constructor(keyFrames?: Keyframe[] | null);
            /**
             * @en
             * Add a keyframe.
             * @zh
             * 添加一个关键帧。
             * @param keyFrame 关键帧。
             */
            addKey(keyFrame: Keyframe): void;
            /**
             * @ignore
             * @param time
             */
            evaluate_slow(time: number): number;
            /**
             * @en
             * Calculate the curve interpolation at a given point in time.
             * @zh
             * 计算给定时间点的曲线插值。
             * @param time 时间。
             */
            evaluate(time: number): number;
            /**
             * @ignore
             * @param optKey
             * @param leftIndex
             * @param rightIndex
             */
            calcOptimizedKey(optKey: __private.cocos_core_geometry_curve_OptimizedKey, leftIndex: number, rightIndex: number): void;
        }
        export enum ERaycastMode {
            ALL = 0,
            CLOSEST = 1,
            ANY = 2
        }
        export interface IRaySubMeshResult {
            distance: number;
            vertexIndex0: number;
            vertexIndex1: number;
            vertexIndex2: number;
        }
        export interface IRaySubMeshOptions {
            /**
             * @zh
             * 检测模式：[0,1,2]=>[ALL,CLOSEST,ANY]
             */
            mode: ERaycastMode;
            /**
             * @zh
             * 检测的最大距离
             */
            distance: number;
            result?: IRaySubMeshResult[];
            doubleSided?: boolean;
            doNotZeroMin?: boolean;
        }
        export interface IRayMeshOptions extends IRaySubMeshOptions {
            subIndices?: number[];
        }
        export interface IRayModelOptions extends IRayMeshOptions {
            doNotTransformRay?: boolean;
        }
        export namespace __private {
            /**
             * @en
             * line-sphere intersect detect.
             * @zh
             * 线段与球的相交性检测
             * @param line 线段
             * @param sphere 球
             * @return {number} 0 或 非0
             */
            function cocos_core_geometry_intersect_line_sphere(line: line, sphere: sphere): number;
            /**
             * @en
             * line-aabb intersect detect.
             * @zh
             * 线段与轴对齐包围盒的相交性检测
             * @param line 线段
             * @param aabb 轴对齐包围盒
             * @return {number} 0 或 非0
             */
            function cocos_core_geometry_intersect_line_aabb(line: line, aabb: aabb): number;
            /**
             * @en
             * line-obb intersect detect.
             * @zh
             * 线段与方向包围盒的相交性检测
             * @param line 线段
             * @param obb 方向包围盒
             * @return {number} 0 或 非0
             */
            function cocos_core_geometry_intersect_line_obb(line: line, obb: obb): number;
            export class cocos_core_geometry_curve_OptimizedKey {
                index: number;
                time: number;
                endTime: number;
                coefficient: Float32Array;
                constructor();
                evaluate(T: number): number;
            }
        }
    }
    export function BitMask<T>(obj: T): T;
    export namespace BitMask {
        export var isBitMask: (BitMaskType: any) => any;
        export var getList: (BitMaskDef: any) => any;
    }
    /**
     * @en
     * Define an enum type. <br/>
     * If a enum item has a value of -1, it will be given an Integer number according to it's order in the list.<br/>
     * Otherwise it will use the value specified by user who writes the enum definition.
     *
     * @zh
     * 定义一个枚举类型。<br/>
     * 用户可以把枚举值设为任意的整数，如果设为 -1，系统将会分配为上一个枚举值 + 1。
     *
     * @param obj - a JavaScript literal object containing enum names and values, or a TypeScript enum type
     * @return the defined enum type
     */
    export function Enum<T>(obj: T): T;
    export namespace Enum {
        export var isEnum: (enumType: any) => any;
        export var getList: (enumDef: any) => any;
    }
    /**
     * 所有值类型的基类。
     */
    export class ValueType {
        /**
         * 克隆当前值。克隆的结果值应与当前值相等，即满足 `this.equals(this, value.clone())`。
         *
         * 本方法的基类版本简单地返回 `this`；
         * 派生类**必须**重写本方法，并且返回的对象不应当为 `this`，即满足 `this !== this.clone()`。
         * @returns 克隆结果值。
         */
        clone(): ValueType;
        /**
         * 判断当前值是否与指定值相等。此判断应当具有交换性，即满足 `this.equals(other) === other.equals(this)`。
         * 本方法的基类版本简单地返回 `false`。
         * @param other 相比较的值。
         * @returns 相等则返回 `true`，否则返回 `false`。
         */
        equals(other: this): boolean;
        /**
         * 赋值当前值使其与指定值相等，即在 `this.set(other)` 之后应有 `this.equals(other)`。
         * 本方法的基类版本简单地返回 `this`，派生类**必须**重写本方法。
         * @param other 相比较的值。
         */
        set(other: this): void;
        /**
         * 返回当前值的字符串表示。
         * 本方法的基类版本返回空字符串。
         * @returns 当前值的字符串表示。
         */
        toString(): string;
    }
    export namespace js {
        export namespace array {
            /**
             * Removes the array item at the specified index.
             */
            export function removeAt<T>(array: T[], index: number): void;
            /**
             * Removes the array item at the specified index.
             * It's faster but the order of the array will be changed.
             */
            export function fastRemoveAt<T>(array: T[], index: number): void;
            /**
             * Removes the first occurrence of a specific object from the array.
             */
            export function remove<T>(array: T[], value: T): boolean;
            /**
             * Removes the first occurrence of a specific object from the array.
             * It's faster but the order of the array will be changed.
             */
            export function fastRemove<T>(array: T[], value: T): void;
            export function removeIf<T>(array: T[], predicate: (value: T) => boolean): T | undefined;
            /**
             * Verify array's Type.
             */
            export function verifyType<T>(array: T[], type: Function): boolean;
            /**
             * Removes from array all values in minusArr. For each Value in minusArr, the first matching instance in array will be removed.
             * @param array Source Array
             * @param minusArr minus Array
             */
            export function removeArray<T>(array: T[], minusArr: T[]): void;
            /**
             * Inserts some objects at index.
             */
            export function appendObjectsAt<T>(array: T[], addObjs: T[], index: number): T[];
            /**
             * Exact same function as Array.prototype.indexOf.<br>
             * HACK: ugliy hack for Baidu mobile browser compatibility,
             * stupid Baidu guys modify Array.prototype.indexOf for all pages loaded,
             * their version changes strict comparison to non-strict comparison,
             * it also ignores the second parameter of the original API, and this will cause event handler enter infinite loop.<br>
             * Baidu developers, if you ever see this documentation,
             * here is the standard: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf, Seriously!
             *
             * @method indexOf
             * @param searchElement - Element to locate in the array.
             * @param [fromIndex=0] - The index to start the search at
             * @return the first index at which a given element can be found in the array, or -1 if it is not present.
             */
            export function indexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
            /**
             * Determines whether the array contains a specific value.
             */
            export function contains<T>(array: T[], value: T): boolean;
            /**
             * Copy an array's item to a new array (its performance is better than Array.slice)
             */
            export function copy<T>(array: T[]): any[];
            /**
             * @class js.array.MutableForwardIterator
             * @example
             * ```
             * var array = [0, 1, 2, 3, 4];
             * var iterator = new cc.js.array.MutableForwardIterator(array);
             * for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
             *     var item = array[iterator.i];
             *     ...
             * }
             * ```
             */
            export class MutableForwardIterator<T> {
                array: T[];
                i: number;
                constructor(array: T[]);
                get length(): number;
                set length(value: number);
                remove(value: T): void;
                removeAt(i: number): void;
                fastRemove(value: T): void;
                fastRemoveAt(i: number): void;
                push(item: T): void;
            }
        }
        /**
         * ID generator for runtime.
         */
        export class IDGenerator {
            static global: IDGenerator;
            id: number;
            prefix: string;
            /**
             * @param [category] You can specify a unique category to avoid id collision with other instance of IdGenerator.
             */
            constructor(category?: string);
            getNewId(): string;
        }
        /**
         * @en
         * A fixed-length object pool designed for general type.<br>
         * The implementation of this object pool is very simple,
         * it can helps you to improve your game performance for objects which need frequent release and recreate operations<br/>
         * @zh
         * 长度固定的对象缓存池，可以用来缓存各种对象类型。<br/>
         * 这个对象池的实现非常精简，它可以帮助您提高游戏性能，适用于优化对象的反复创建和销毁。
         * @class js.Pool
         * @example
         * ```
         *
         * Example 1:
         *
         * function Details () {
         *     this.uuidList = [];
         * };
         * Details.prototype.reset = function () {
         *     this.uuidList.length = 0;
         * };
         * Details.pool = new js.Pool(function (obj) {
         *     obj.reset();
         * }, 5);
         * Details.pool.get = function () {
         *     return this._get() || new Details();
         * };
         *
         * var detail = Details.pool.get();
         * ...
         * Details.pool.put(detail);
         *
         * Example 2:
         *
         * function Details (buffer) {
         *    this.uuidList = buffer;
         * };
         * ...
         * Details.pool.get = function (buffer) {
         *     var cached = this._get();
         *     if (cached) {
         *         cached.uuidList = buffer;
         *         return cached;
         *     }
         *     else {
         *         return new Details(buffer);
         *     }
         * };
         *
         * var detail = Details.pool.get( [] );
         * ...
         * ```
         */
        export class Pool<T> {
            /**
             * @en
             * The current number of available objects, the default is 0, it will gradually increase with the recycle of the object,
             * the maximum will not exceed the size specified when the constructor is called.
             * @zh
             * 当前可用对象数量，一开始默认是 0，随着对象的回收会逐渐增大，最大不会超过调用构造函数时指定的 size。
             * @default 0
             */
            count: number;
            /**
             * @en
             * Get and initialize an object from pool. This method defaults to null and requires the user to implement it.
             * @zh
             * 获取并初始化对象池中的对象。这个方法默认为空，需要用户自己实现。
             * @param args - parameters to used to initialize the object
             */
            get(): T | null;
            /**
             * 使用构造函数来创建一个指定对象类型的对象池，您可以传递一个回调函数，用于处理对象回收时的清理逻辑。
             * @method constructor
             * @param {Function} [cleanupFunc] - the callback method used to process the cleanup logic when the object is recycled.
             * @param {Object} cleanupFunc.obj
             * @param {Number} size - initializes the length of the array
             */
            constructor(cleanup: __private.cocos_core_utils_pool_CleanUpFunction<T>, size: number);
            /**
             * 使用构造函数来创建一个指定对象类型的对象池，您可以传递一个回调函数，用于处理对象回收时的清理逻辑。
             * @method constructor
             * @param {Function} [cleanupFunc] - the callback method used to process the cleanup logic when the object is recycled.
             * @param {Object} cleanupFunc.obj
             * @param {Number} size - initializes the length of the array
             */
            constructor(size: number);
            /**
             * @en
             * Get an object from pool, if no available object in the pool, null will be returned.
             * @zh
             * 获取对象池中的对象，如果对象池没有可用对象，则返回空。
             */
            _get(): T | null;
            /**
             * @en Put an object into the pool.
             * @zh 向对象池返还一个不再需要的对象。
             */
            put(obj: T): void;
            /**
             * @en Resize the pool.
             * @zh 设置对象池容量。
             */
            resize(length: number): void;
        }
        /**
         * Check the object whether is number or not
         * If a number is created by using 'new Number(10086)', the typeof it will be "object"...
         * Then you can use this function if you care about this case.
         */
        export function isNumber(object: any): boolean;
        /**
         * Check the object whether is string or not.
         * If a string is created by using 'new String("blabla")', the typeof it will be "object"...
         * Then you can use this function if you care about this case.
         */
        export function isString(object: any): boolean;
        /**
         * @en
         * A simple wrapper of `Object.create(null)` which ensures the return object have no prototype (and thus no inherited members).
         * So we can skip `hasOwnProperty` calls on property lookups.
         * It is a worthwhile optimization than the `{}` literal when `hasOwnProperty` calls are necessary.
         * @zh
         * 该方法是对 `Object.create(null)` 的简单封装。
         * `Object.create(null)` 用于创建无 prototype （也就无继承）的空对象。
         * 这样我们在该对象上查找属性时，就不用进行 `hasOwnProperty` 判断。
         * 在需要频繁判断 `hasOwnProperty` 时，使用这个方法性能会比 `{}` 更高。
         *
         * @param [forceDictMode=false] Apply the delete operator to newly created map object.
         * This causes V8 to put the object in "dictionary mode" and disables creation of hidden classes
         * which are very expensive for objects that are constantly changing shape.
         */
        export function createMap(forceDictMode?: boolean): any;
        /**
         * Get class name of the object, if object is just a {} (and which class named 'Object'), it will return "".
         * (modified from <a href="http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class">the code from this stackoverflow post</a>)
         * @param objOrCtor instance or constructor
         */
        export function getClassName(objOrCtor: Object | Function): string;
        /**
         * Defines a polyfill field for obsoleted codes.
         * @param object - YourObject or YourClass.prototype
         * @param obsoleted - "OldParam" or "YourClass.OldParam"
         * @param newExpr - "NewParam" or "YourClass.NewParam"
         * @param  [writable=false]
         */
        export function obsolete(object: any, obsoleted: string, newExpr: string, writable?: boolean): void;
        /**
         * Defines all polyfill fields for obsoleted codes corresponding to the enumerable properties of props.
         * @method obsoletes
         * @param {any} obj - YourObject or YourClass.prototype
         * @param {any} objName - "YourObject" or "YourClass"
         * @param {Object} props
         * @param {Boolean} [writable=false]
         */
        export function obsoletes(obj: any, objName: any, props: any, writable: any): void;
        /**
         * A string tool to construct a string with format string.
         * @param msg - A JavaScript string containing zero or more substitution strings (%s).
         * @param subst - JavaScript objects with which to replace substitution strings within msg.
         * This gives you additional control over the format of the output.
         * @example
         * ```
         * cc.js.formatStr("a: %s, b: %s", a, b);
         * cc.js.formatStr(a, b, c);
         * ```
         */
        export function formatStr(msg: string | any, ...subst: any[]): any;
        export function shiftArguments(): any[];
        /**
         * Get property descriptor in object and all its ancestors.
         */
        export function getPropertyDescriptor(object: any, propertyName: string): PropertyDescriptor | null;
        /**
         * Copy all properties not defined in object from arguments[1...n].
         * @param object Object to extend its properties.
         * @param sources Source object to copy properties from.
         * @return The result object.
         */
        export function addon(object?: any, ...sources: any[]): any;
        /**
         * Copy all properties from arguments[1...n] to object.
         * @return The result object.
         */
        export function mixin(object?: any, ...sources: any[]): any;
        /**
         * Derive the class from the supplied base class.
         * Both classes are just native javascript constructors, not created by cc.Class, so
         * usually you will want to inherit using [[Class]] instead.
         * @param base The baseclass to inherit.
         * @return The result class.
         */
        export function extend(cls: Function, base: Function): Function | undefined;
        /**
         * Get super class.
         * @param constructor The constructor of subclass.
         */
        export function getSuper(constructor: Function): any;
        /**
         * Checks whether subclass is child of superclass or equals to superclass.
         */
        export function isChildClassOf(subclass: Function, superclass: Function): boolean;
        /**
         * Removes all enumerable properties from object.
         */
        export function clear(object: {}): void;
        /**
         * Register the class by specified id, if its classname is not defined, the class name will also be set.
         * @method _setClassId
         * @param {String} classId
         * @param {Function} constructor
         * @private
         */
        export function _setClassId(id: any, constructor: any): void;
        /**
         * Register the class by specified name manually
         * @method setClassName
         * @param {String} className
         * @param {Function} constructor
         */
        export function setClassName(className: any, constructor: any): void;
        /**
         * Unregister a class from fireball.
         *
         * If you dont need a registered class anymore, you should unregister the class so that Fireball will not keep its reference anymore.
         * Please note that its still your responsibility to free other references to the class.
         *
         * @method unregisterClass
         * @param {Function} ...constructor - the class you will want to unregister, any number of classes can be added
         */
        export function unregisterClass(...constructors: Function[]): void;
        /**
         * Get the registered class by id
         * @method _getClassById
         * @param {String} classId
         * @return {Function} constructor
         * @private
         */
        export function _getClassById(classId: any): any;
        /**
         * Get the registered class by name
         * @method getClassByName
         * @param {String} classname
         * @return {Function} constructor
         */
        export function getClassByName(classname: any): any;
        /**
         * Get class id of the object
         * @method _getClassId
         * @param {Object|Function} obj - instance or constructor
         * @param {Boolean} [allowTempId = true]   - can return temp id in editor
         * @return {String}
         * @private
         */
        export function _getClassId(obj: any, allowTempId?: Boolean): any;
        /**
         * Define value, just help to call Object.defineProperty.<br>
         * The configurable will be true.
         * @param [writable=false]
         * @param [enumerable=false]
         */
        export const value: (object: Object, propertyName: string, value_: any, writable?: boolean | undefined, enumerable?: boolean | undefined) => void;
        /**
         * Define get set accessor, just help to call Object.defineProperty(...).
         * @param [setter=null]
         * @param [enumerable=false]
         * @param [configurable=false]
         */
        export const getset: (object: {}, propertyName: string, getter: __private.Getter, setter?: boolean | __private.Setter | undefined, enumerable?: boolean, configurable?: boolean) => void;
        /**
         * Define get accessor, just help to call Object.defineProperty(...).
         * @param [enumerable=false]
         * @param [configurable=false]
         */
        export const get: (object: Object, propertyName: string, getter: __private.Getter, enumerable?: boolean | undefined, configurable?: boolean | undefined) => void;
        /**
         * Define set accessor, just help to call Object.defineProperty(...).
         * @param [enumerable=false]
         * @param [configurable=false]
         */
        export const set: (object: Object, propertyName: string, setter: __private.Setter, enumerable?: boolean | undefined, configurable?: boolean | undefined) => void;
        export const _idToClass: {};
        export const _nameToClass: {};
        export namespace __private {
            export type cocos_core_utils_pool_CleanUpFunction<T> = (value: T) => boolean | void;
            export type Getter = () => any;
            export type Setter = (value: any) => void;
        }
    }
    export namespace misc {
        /**
         * misc utilities
         * @class misc
         * @static
         */
        /**
         * @method propertyDefine
         * @param {Function} ctor
         * @param {Array} sameNameGetSets
         * @param {Object} diffNameGetSets
         */
        export function propertyDefine(ctor: any, sameNameGetSets: any, diffNameGetSets: any): void;
        /**
         * @method nextPOT
         * @param {Number} x
         * @return {Number}
         */
        export function nextPOT(x: any): any;
        export function pushToMap(map: any, key: any, value: any, pushFront: any): void;
        export function contains(refNode: any, otherNode: any): any;
        export function isDomNode(obj: any): boolean;
        export function callInNextTick(callback: any, p1?: any, p2?: any): void;
        export function tryCatchFunctor_EDITOR(funcName: any): Function;
        export function isPlainEmptyObj_DEV(obj: any): boolean;
        export function cloneable_DEV(obj: any): any;
        export const BUILTIN_CLASSID_RE: RegExp;
        export const BASE64_VALUES: any[];
    }
    export namespace path {
        /**
         * @en Join strings to be a path.
         * @zh 拼接字符串为路径。
         * @example {@link cocos/core/utils/CCPath/join.js}
         */
        export function join(...segments: string[]): string;
        /**
         * @en Get the ext name of a path including '.', like '.png'.
         * @zh 返回 Path 的扩展名，包括 '.'，例如 '.png'。
         * @example {@link cocos/core/utils/CCPath/extname.js}
         */
        export function extname(path: string): string;
        /**
         * @en Get the main name of a file name.
         * @zh 获取文件名的主名称。
         * @deprecated
         */
        export function mainFileName(fileName: string): string;
        /**
         * @en Get the file name of a file path.
         * @zh 获取文件路径的文件名。
         * @example {@link cocos/core/utils/CCPath/basename.js}
         */
        export function basename(path: string, extName?: string): string;
        /**
         * @en Get dirname of a file path.
         * @zh 获取文件路径的目录名。
         * @example {@link cocos/core/utils/CCPath/dirname.js}
         */
        export function dirname(path: string): string;
        /**
         * @en Change extname of a file path.
         * @zh 更改文件路径的扩展名。
         * @example {@link cocos/core/utils/CCPath/changeExtname.js}
         */
        export function changeExtname(path: string, extName?: string): string;
        /**
         * @en Change file name of a file path.
         * @zh 更改文件路径的文件名。
         * @example {@link cocos/core/utils/CCPath/changeBasename.js}
         */
        export function changeBasename(path: string, baseName: string, isSameExt?: boolean): string;
        export function _normalize(url: any): any;
        export function stripSep(path: string): string;
        export function getSeperator(): "/" | "\\";
    }
    export function setDefaultLogTimes(times: number): void;
    export interface IReplacement {
        /** 废弃属性的名称 */
        name: string;
        /** 警告的次数 */
        logTimes?: number;
        /** 替换属性的名称 */
        newName?: string;
        /** 废弃属性的所属对象 */
        target?: object;
        /** 废弃属性的所属对象的名称 */
        targetName?: string;
        /** 自定义替换属性（函数） */
        customFunction?: Function;
        /** 自定义替换属性的 setter */
        customSetter?: (v: any) => void;
        /** 自定义替换属性的 getter */
        customGetter?: () => any;
    }
    export interface IRemoveItem {
        /** 废弃属性的名称 */
        name: string;
        /** 警告的次数 */
        logTimes?: number;
        /** 额外建议 */
        suggest?: string;
    }
    export interface IMarkItem {
        /** 废弃属性的名称 */
        name: string;
        /** 警告的次数 */
        logTimes?: number;
        /** 额外建议 */
        suggest?: string;
    }
    export let replaceProperty: (owner: object, ownerName: string, properties: IReplacement[]) => void;
    export let removeProperty: (owner: object, ownerName: string, properties: IRemoveItem[]) => void;
    export let markAsWarning: (owner: object, ownerName: string, properties: IMarkItem[]) => void;
    export function isUnicodeCJK(ch: string): boolean;
    export function isUnicodeSpace(ch: string): boolean;
    export function safeMeasureText(ctx: CanvasRenderingContext2D, string: string): number;
    export function fragmentText(stringToken: string, allWidth: number, maxWidth: number, measureText: (string: string) => number): string[];
    /**
     * @hide
     */
    export const BASELINE_RATIO = 0.26;
    /**
     * A utils class for parsing HTML texts. The parsed results will be an object array.
     */
    export interface IHtmlTextParserResultObj {
        text?: string;
        style?: IHtmlTextParserStack;
    }
    export interface IHtmlTextParserStack {
        color?: string;
        size?: number;
        event?: Map<string, string>;
        isNewLine?: boolean;
        isImage?: boolean;
        src?: string;
        imageWidth?: number;
        imageHeight?: number;
        underline?: boolean;
        italic?: boolean;
        bold?: boolean;
        outline?: {
            color: string;
            width: number;
        };
    }
    export class HtmlTextParser {
        constructor();
        parse(htmlString: string): IHtmlTextParserResultObj[];
    }
    export class PrefabInfo {
        root: null;
        asset: null;
        fileId: string;
        sync: boolean;
        _synced: {
            default: boolean;
            serializable: boolean;
        };
    }
    export class BatchingUtility {
        /**
         * Collect the ModelComponents under `staticModelRoot`,
         * merge all the meshes statically into one (while disabling each component),
         * and attach it to a new ModelComponent on `batchedRoot`.
         * The world transform of each model is guaranteed to be preserved.
         *
         * For a more fine-grained controll over the process, use `Mesh.merge` directly.
         * @param staticModelRoot root of all the static models to be batched
         * @param batchedRoot the target output node
         */
        static batchStaticModel(staticModelRoot: Node, batchedRoot: Node): boolean;
        /**
         * Undoes everything `batchStaticModel` did.
         *
         * @param staticModelRoot root of all the static models to be batched
         * @param batchedRoot the target output node
         */
        static unbatchStaticModel(staticModelRoot: Node, batchedRoot: Node): boolean;
    }
    export function murmurhash2_32_gc(input: string | Uint8Array, seed: number): number;
    /**
     * @en
     * Conversion of non-UI nodes to UI Node (Local) Space coordinate system.
     * @zh
     * 非 UI 节点转换到 UI 节点(局部) 空间坐标系。
     * @deprecated 将在 1.2 移除，请使用 CameraComponent 的 `convertToUINode`。
     * @param mainCamera 主相机。
     * @param wpos 世界空间位置。
     * @param uiNode UI节点。
     * @param out 返回局部坐标。
     */
    export function WorldNode3DToLocalNodeUI(mainCamera: CameraComponent, wpos: math.Vec3, uiNode: Node, out?: math.Vec3): math.Vec3;
    /**
     * @en
     * Conversion of non-UI nodes to UI Node (World) Space coordinate system.
     * @zh
     * 非 UI 节点转换到 UI 节点(世界) 空间坐标系。
     * @deprecated 将在 1.2 移除，请使用 CameraComponent 的 `convertToUINode`。
     * @param mainCamera 主相机。
     * @param wpos 世界空间位置。
     * @param out 返回世界坐标。
     */
    export function WorldNode3DToWorldNodeUI(mainCamera: CameraComponent, wpos: math.Vec3, out?: math.Vec3): math.Vec3;
    /**
     * @deprecated 将在 1.2 移除，请使用 CameraComponent 的 `convertToUINode`。
     */
    export const convertUtils: {
        WorldNode3DToLocalNodeUI: typeof WorldNode3DToLocalNodeUI;
        WorldNode3DToWorldNodeUI: typeof WorldNode3DToWorldNodeUI;
    };
    export namespace _decorator {
        /**
         * @zh 标注属性为 cc 属性。
         * @param options 选项。
         */
        export function property(options?: IPropertyOptions): PropertyDecorator;
        /**
         * @zh 标注属性为 cc 属性。<br/>
         * 等价于`@property({type})`。
         * @param type cc 属性的类型。
         */
        export function property(type: PropertyType): PropertyDecorator;
        /**
         * @zh 标注属性为 cc 属性。<br/>
         * 等价于`@property()`。
         */
        export function property(target: Object, propertyKey: string | symbol): void;
        /**
         * @en
         * NOTE:<br>
         * The old mixins implemented in cc.Class(ES5) behaves exact the same as multiple inheritance.
         * But since ES6, class constructor can't be function-called and class methods become non-enumerable,
         * so we can not mix in ES6 Classes.<br>
         * See:<br>
         * [https://esdiscuss.org/topic/traits-are-now-impossible-in-es6-until-es7-since-rev32](https://esdiscuss.org/topic/traits-are-now-impossible-in-es6-until-es7-since-rev32)<br>
         * One possible solution (but IDE unfriendly):<br>
         * [http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/)<br>
         * <br>
         * NOTE:<br>
         * You must manually call mixins constructor, this is different from cc.Class(ES5).
         * @zh
         * *注意：<br>
         * 在cc.Class（ES5）中实现的旧mixin的行为与多重继承完全相同。
         * 但是从ES6开始，类构造函数不能被函数调用，类方法变得不可枚举，
         * 所以我们不能混合使用ES6类。<br>
         * 参看：<br>
         * [https://esdiscuss.org/topic/traits-are-now-impossible-in-es6-until-es7-since-rev32](https://esdiscuss.org/topic/traits-are-now-impossible-in-ES6-直到-ES7，因为-rev32）点击
         * 一种可能的解决方案（但对 IDE 不友好）：<br>
         * [http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/）结果
         * <br>
         * 注意：<br>
         * 您必须手动调用mixins构造函数，这与cc.Class（ES5）不同。
         *
         * @method mixins
         * @param {Function} ...ctor - constructors to mix, only support ES5 constructors or classes defined by using `cc.Class`,
         *                             not support ES6 Classes.
         * @example
         * ```typescript
         * const {ccclass, mixins} = cc._decorator;
         *
         * class Animal { ... }
         *
         * const Fly = cc.Class({
         *     constructor () { ... }
         * });
         *
         *  @ccclass
         *  @mixins(cc.EventTarget, Fly)
         * class Bird extends Animal {
         *     constructor () {
         *         super();
         *
         *         // You must manually call mixins constructor, this is different from cc.Class(ES5)
         *         cc.EventTarget.call(this);
         *         Fly.call(this);
         *     }
         *     // ...
         * }
         * ```
         */
        export function mixins(...constructors: Function[]): (ctor: any) => void;
        /**
         * 标记该属性的类型。
         * @param type 指定类型。
         */
        export function type(type: Function): PropertyDecorator;
        export function type(type: [Function]): PropertyDecorator;
        export function type<T>(type: __private.cocos_core_data_utils_attribute_PrimitiveType<T>): PropertyDecorator;
        export function type<T>(type: [__private.cocos_core_data_utils_attribute_PrimitiveType<T>]): PropertyDecorator;
        /**
         * 将标准写法的 [ES6 Class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 声明为 CCClass，具体用法请参阅[类型定义](/docs/creator/scripting/class/)。
         *
         * @method ccclass
         * @param {String} [name] - The class name used for serialization.
         * @example
         * ```typescript
         * const {ccclass} = cc._decorator;
         *
         * // define a CCClass, omit the name
         *  @ccclass
         * class NewScript extends cc.Component {
         *     // ...
         * }
         *
         * // define a CCClass with a name
         *  @ccclass('LoginData')
         * class LoginData {
         *     // ...
         * }
         * ```
         */
        export const ccclass: (target: any) => any;
        export type SimplePropertyType = Function | string | typeof CCString | typeof CCInteger | typeof CCFloat | typeof CCBoolean;
        export type PropertyType = SimplePropertyType | SimplePropertyType[];
        /**
         * @zh cc 属性选项。
         */
        export interface IPropertyOptions extends __private.cocos_core_data_utils_attribute_defines_IExposedAttributes {
        }
        /**
         * Makes a CCClass that inherit from component execute in edit mode.<br/>
         * By default, all components are only executed in play mode,<br/>
         * which means they will not have their callback functions executed while the Editor is in edit mode.<br/>
         * 允许继承自 Component 的 CCClass 在编辑器里执行。<br/>
         * 默认情况下，所有 Component 都只会在运行时才会执行，也就是说它们的生命周期回调不会在编辑器里触发。
         *
         * @method executeInEditMode
         * @example
         * ```typescript
         * const {ccclass, executeInEditMode} = cc._decorator;
         *
         *  @ccclass
         *  @executeInEditMode
         * class NewScript extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const executeInEditMode: any;
        /**
         * 为声明为 CCClass 的组件添加依赖的其它组件。当组件添加到节点上时，如果依赖的组件不存在，引擎将会自动将依赖组件添加到同一个节点，防止脚本出错。该设置在运行时同样有效。
         *
         * @method requireComponent
         * @param {Component} requiredComponent
         * @example
         * ```typescript
         * const {ccclass, requireComponent} = cc._decorator;
         *
         *  @ccclass
         *  @requireComponent(cc.SpriteComponent)
         * class SpriteCtrl extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const requireComponent: any;
        /**
         * 将当前组件添加到组件菜单中，方便用户查找。例如 "Rendering/CameraCtrl"。
         *
         * @method menu
         * @param {String} path - The path is the menu represented like a pathname.
         *                        For example the menu could be "Rendering/CameraCtrl".
         * @example
         * ```typescript
         * const {ccclass, menu} = cc._decorator;
         *
         *  @ccclass
         *  @menu("Rendering/CameraCtrl")
         * class NewScript extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const menu: any;
        /**
         * 设置脚本生命周期方法调用的优先级。优先级小于 0 的组件将会优先执行，优先级大于 0 的组件将会延后执行。优先级仅会影响 onLoad, onEnable, start, update 和 lateUpdate，而 onDisable 和 onDestroy 不受影响。
         *
         * @method executionOrder
         * @param {Number} order - The execution order of lifecycle methods for Component. Those less than 0 will execute before while those greater than 0 will execute after.
         * @example
         * ```typescript
         * const {ccclass, executionOrder} = cc._decorator;
         *
         *  @ccclass
         *  @executionOrder(1)
         * class CameraCtrl extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const executionOrder: any;
        /**
         * 防止多个相同类型（或子类型）的组件被添加到同一个节点。
         *
         * @method disallowMultiple
         * @example
         * ```typescript
         * const {ccclass, disallowMultiple} = cc._decorator;
         *
         *  @ccclass
         *  @disallowMultiple
         * class CameraCtrl extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const disallowMultiple: any;
        /**
         * 当指定了 "executeInEditMode" 以后，playOnFocus 可以在选中当前组件所在的节点时，提高编辑器的场景刷新频率到 60 FPS，否则场景就只会在必要的时候进行重绘。
         *
         * @method playOnFocus
         * @example
         * ```typescript
         * const {ccclass, playOnFocus, executeInEditMode} = cc._decorator;
         *
         *  @ccclass
         *  @executeInEditMode
         *  @playOnFocus
         * class CameraCtrl extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const playOnFocus: any;
        /**
         * 自定义当前组件在 **属性检查器** 中渲染时所用的网页 url。
         *
         * @method inspector
         * @param {String} url
         * @example
         * ```typescript
         * const {ccclass, inspector} = cc._decorator;
         *
         *  @ccclass
         *  @inspector("packages://inspector/inspectors/comps/camera-ctrl.js")
         * class NewScript extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const inspector: any;
        /**
         * 自定义当前组件在编辑器中显示的图标 url。
         *
         * @method icon
         * @param {String} url
         * @private
         * @example
         * ```typescript
         * const {ccclass, icon} = cc._decorator;
         *
         *  @ccclass
         *  @icon("xxxx.png")
         * class NewScript extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const icon: any;
        /**
         * 指定当前组件的帮助文档的 url，设置过后，在 **属性检查器** 中就会出现一个帮助图标，用户点击将打开指定的网页。
         *
         * @method help
         * @param {String} url
         * @example
         * ```typescript
         * const {ccclass, help} = cc._decorator;
         *
         *  @ccclass
         *  @help("app://docs/html/components/spine.html")
         * class NewScript extends cc.Component {
         *     // ...
         * }
         * ```
         */
        export const help: any;
        /**
         * 将该属性标记为 cc 整数。
         */
        export const integer: PropertyDecorator;
        /**
         * 将该属性标记为 cc 浮点数。
         */
        export const float: PropertyDecorator;
        /**
         * 将该属性标记为 cc 布尔值。
         */
        export const boolean: PropertyDecorator;
        /**
         * 将该属性标记为 cc 字符串。
         */
        export const string: PropertyDecorator;
        export namespace __private {
            export class cocos_core_data_utils_attribute_PrimitiveType<T> {
                name: string;
                default: T;
                constructor(name: string, defaultValue: T);
                toString(): string;
            }
            export interface cocos_core_data_utils_attribute_defines_IExposedAttributes {
                /**
                 * 指定属性的类型。
                 */
                type?: any;
                /**
                 *
                 */
                url?: string;
                /**
                 * 控制是否在编辑器中显示该属性。
                 */
                visible?: boolean | (() => boolean);
                /**
                 * 该属性在编辑器中的显示名称。
                 */
                displayName?: string;
                /**
                 *
                 */
                displayOrder?: number;
                /**
                 * 该属性在编辑器中的工具提示内容。
                 */
                tooltip?: string;
                /**
                 *
                 */
                multiline?: boolean;
                /**
                 * 指定该属性是否为可读的。
                 */
                readonly?: boolean;
                /**
                 * 当该属性为数值类型时，指定了该属性允许的最小值。
                 */
                min?: number;
                /**
                 * 当该属性为数值类型时，指定了该属性允许的最大值。
                 */
                max?: number;
                /**
                 * 当该属性为数值类型时并在编辑器中提供了滑动条时，指定了滑动条的步长。
                 */
                step?: number;
                /**
                 * 当该属性为数值类型时，指定了该属性允许的范围。
                 */
                range?: number[];
                /**
                 * 当该属性为数值类型时，是否在编辑器中提供滑动条来调节值。
                 */
                slide?: boolean;
                /**
                 * 该属性是否参与序列化和反序列化。
                 */
                serializable?: boolean;
                /**
                 * 该属性的曾用名。
                 */
                formerlySerializedAs?: string;
                /**
                 * 该属性是否仅仅在编辑器环境中生效。
                 */
                editorOnly?: boolean;
                /**
                 * 是否覆盖基类中的同名属性。
                 */
                override?: boolean;
                /**
                 *
                 */
                animatable?: boolean;
                /**
                 *
                 */
                unit?: string;
                /**
                 * 转换为弧度
                 */
                radian?: boolean;
            }
        }
    }
    /**
     * @en Defines a CCClass using the given specification
     * @zh 定义一个 CCClass，传入参数必须是一个包含类型参数的字面量对象
     *
     * @method Class
     *
     * @param {Object} [options]
     * @param {String} [options.name] - The class name used for serialization.
     * @param {Function} [options.extends] - The base class.
     * @param {Function} [options.ctor] - The constructor.
     * @param {Function} [options.__ctor__] - The same as ctor, but less encapsulated.
     * @param {Object} [options.properties] - The property definitions.
     * @param {Object} [options.statics] - The static members.
     * @param {Function[]} [options.mixins]
     *
     * @param {Object} [options.editor] - attributes for Component listed below.
     * @param {Boolean} [options.editor.executeInEditMode=false] - Allows the current component to run in edit mode. By default, all components are executed only at runtime, meaning that they will not have their callback functions executed while the Editor is in edit mode.
     * @param {Function} [options.editor.requireComponent] - Automatically add required component as a dependency.
     * @param {String} [options.editor.menu] - The menu path to register a component to the editors "Component" menu. Eg. "Rendering/Camera".
     * @param {Number} [options.editor.executionOrder=0] - The execution order of lifecycle methods for Component. Those less than 0 will execute before while those greater than 0 will execute after. The order will only affect onLoad, onEnable, start, update and lateUpdate while onDisable and onDestroy will not be affected.
     * @param {Boolean} [options.editor.disallowMultiple] - If specified to a type, prevents Component of the same type (or subtype) to be added more than once to a Node.
     * @param {Boolean} [options.editor.playOnFocus=false] - This property is only available when executeInEditMode is set. If specified, the editor's scene view will keep updating this node in 60 fps when it is selected, otherwise, it will update only if necessary.
     * @param {String} [options.editor.inspector] - Customize the page url used by the current component to render in the Properties.
     * @param {String} [options.editor.icon] - Customize the icon that the current component displays in the editor.
     * @param {String} [options.editor.help] - The custom documentation URL
     *
     * @param {Function} [options.update] - lifecycle method for Component, see {{#crossLink "Component/update:method"}}{{/crossLink}}
     * @param {Function} [options.lateUpdate] - lifecycle method for Component, see {{#crossLink "Component/lateUpdate:method"}}{{/crossLink}}
     * @param {Function} [options.onLoad] - lifecycle method for Component, see {{#crossLink "Component/onLoad:method"}}{{/crossLink}}
     * @param {Function} [options.start] - lifecycle method for Component, see {{#crossLink "Component/start:method"}}{{/crossLink}}
     * @param {Function} [options.onEnable] - lifecycle method for Component, see {{#crossLink "Component/onEnable:method"}}{{/crossLink}}
     * @param {Function} [options.onDisable] - lifecycle method for Component, see {{#crossLink "Component/onDisable:method"}}{{/crossLink}}
     * @param {Function} [options.onDestroy] - lifecycle method for Component, see {{#crossLink "Component/onDestroy:method"}}{{/crossLink}}
     * @param {Function} [options.onFocusInEditor] - lifecycle method for Component, see {{#crossLink "Component/onFocusInEditor:method"}}{{/crossLink}}
     * @param {Function} [options.onLostFocusInEditor] - lifecycle method for Component, see {{#crossLink "Component/onLostFocusInEditor:method"}}{{/crossLink}}
     * @param {Function} [options.resetInEditor] - lifecycle method for Component, see {{#crossLink "Component/resetInEditor:method"}}{{/crossLink}}
     * @param {Function} [options.onRestore] - for Component only, see {{#crossLink "Component/onRestore:method"}}{{/crossLink}}
     * @param {Function} [options._getLocalBounds] - for Component only, see {{#crossLink "Component/_getLocalBounds:method"}}{{/crossLink}}
     *
     * @return {Function} - the created class
     *
     * @example
     * ```typescript
     * // define base class
     * var Node = cc.Class();
     * // define sub class
     * var Sprite = cc.Class({
     *     name: 'Sprite',
     *     extends: Node,
     *
     *     ctor: function () {
     *         this.url = "";
     *         this.id = 0;
     *     },
     *
     *     statics: {
     *         // define static members
     *         count: 0,
     *         getBounds: function (spriteList) {
     *             // compute bounds...
     *         }
     *     },
     *
     *     properties {
     *         width: {
     *             default: 128,
     *             type: 'Integer',
     *             tooltip: 'The width of sprite'
     *         },
     *         height: 128,
     *         size: {
     *             get: function () {
     *                 return cc.v2(this.width, this.height);
     *             }
     *         }
     *     },
     *
     *     load: function () {
     *         // load this.url...
     *     };
     * });
     *
     * // instantiate
     *
     * var obj = new Sprite();
     * obj.url = 'sprite.png';
     * obj.load();
     * ```
     */
    function CCClass(options: any): any;
    export namespace CCClass {
        export var _isCCClass: (constructor: any) => any;
        export var fastDefine: (className: any, constructor: any, serializableFields: any) => void;
        export var Attr: typeof __private.cocos_core_data_utils_attribute;
        export var attr: typeof __private.cocos_core_data_utils_attribute.attr;
        export var getInheritanceChain: (constructor: any) => any[];
        export var isArray: (defaultVal: any) => boolean;
        export var getDefault: (defaultVal: any) => any;
        export var escapeForJS: (s: any) => string;
        export var IDENTIFIER_RE: RegExp;
        export var getNewValueTypeCode: (value: any) => string;
        export namespace __private {
            export namespace cocos_core_data_utils_attribute {
                export function createAttrsSingle(owner: Object, ownerConstructor: Function, superAttrs?: any): any;
                export function createAttrs(subclass: any): any;
                export function attr(constructor: any, propertyName: string): {
                    [propertyName: string]: any;
                };
                export function attr(constructor: any, propertyName: string, newAttributes: Object): void;
                export function getClassAttrs(constructor: any): any;
                export function getClassAttrsProto(constructor: Function): any;
                export function setClassAttr(ctor: any, propName: any, key: any, value: any): void;
                export class PrimitiveType<T> {
                    name: string;
                    default: T;
                    constructor(name: string, defaultValue: T);
                    toString(): string;
                }
                export function getTypeChecker(type: string, attributeName: string): (constructor: Function, mainPropertyName: string) => void;
                export function getObjTypeChecker(typeCtor: any): (classCtor: any, mainPropName: any) => void;
            }
            /**
             * Tag the class with any meta attributes, then return all current attributes assigned to it.
             * This function holds only the attributes, not their implementations.
             * @param constructor The class or instance. If instance, the attribute will be dynamic and only available for the specified instance.
             * @param propertyName The name of property or function, used to retrieve the attributes.
             * @param [newAttributes] The attribute table to mark, new attributes will merged with existed attributes.
             * Attribute whose key starts with '_' will be ignored.
             * @private
             */
            export function cocos_core_data_utils_attribute_attr(constructor: any, propertyName: string): {
                [propertyName: string]: any;
            };
            export function cocos_core_data_utils_attribute_attr(constructor: any, propertyName: string, newAttributes: Object): void;
        }
    }
    /**
     * @en
     * The base class of most of all the objects in Fireball.
     * @zh
     * 大部分对象的基类。
     * @class Object
     *
     * @main
     * @private
     */
    export class CCObject {
        static _deferredDestroy(): void;
        _objFlags: number;
        protected _name: string;
        constructor(name?: string);
        get name(): string;
        set name(value: string);
        get isValid(): boolean;
        /**
         * @en
         * Destroy this Object, and release all its own references to other objects.<br/>
         * Actual object destruction will delayed until before rendering.
         * From the next frame, this object is not usable any more.
         * You can use cc.isValid(obj) to check whether the object is destroyed before accessing it.
         * @zh
         * 销毁该对象，并释放所有它对其它对象的引用。<br/>
         * 实际销毁操作会延迟到当前帧渲染前执行。从下一帧开始，该对象将不再可用。
         * 您可以在访问对象之前使用 cc.isValid(obj) 来检查对象是否已被销毁。
         * @return {Boolean} whether it is the first time the destroy being called
         * @example
         * ```
         * obj.destroy();
         * ```
         */
        destroy(): boolean;
        /**
         * Clear all references in the instance.
         *
         * NOTE: this method will not clear the getter or setter functions which defined in the instance of CCObject.
         *       You can override the _destruct method if you need, for example:
         *       _destruct: function () {
         *           for (var key in this) {
         *               if (this.hasOwnProperty(key)) {
         *                   switch (typeof this[key]) {
         *                       case 'string':
         *                           this[key] = '';
         *                           break;
         *                       case 'object':
         *                       case 'function':
         *                           this[key] = null;
         *                           break;
         *               }
         *           }
         *       }
         *
         */
        _destruct(): void;
        _destroyImmediate(): void;
    }
    /**
     * @module cc
     */
    /**
     * @en
     * Checks whether the object is non-nil and not yet destroyed.<br>
     * When an object's `destroy` is called, it is actually destroyed after the end of this frame.
     * So `isValid` will return false from the next frame, while `isValid` in the current frame will still be true.
     * If you want to determine whether the current frame has called `destroy`, use `cc.isValid(obj, true)`,
     * but this is often caused by a particular logical requirements, which is not normally required.
     *
     * @zh
     * 检查该对象是否不为 null 并且尚未销毁。<br>
     * 当一个对象的 `destroy` 调用以后，会在这一帧结束后才真正销毁。<br>
     * 因此从下一帧开始 `isValid` 就会返回 false，而当前帧内 `isValid` 仍然会是 true。<br>
     * 如果希望判断当前帧是否调用过 `destroy`，请使用 `cc.isValid(obj, true)`，不过这往往是特殊的业务需求引起的，通常情况下不需要这样。
     *
     * @method isValid
     * @param value
     * @param [strictMode=false] - If true, Object called destroy() in this frame will also treated as invalid.
     * @return whether is valid
     * @example
     * ```
     * import * as cc from 'cc';
     * var node = new cc.Node();
     * cc.log(cc.isValid(node));    // true
     * node.destroy();
     * cc.log(cc.isValid(node));    // true, still valid in this frame
     * // after a frame...
     * cc.log(cc.isValid(node));    // false, destroyed in the end of last frame
     * ```
     */
    export function isValid(value: any, strictMode?: boolean): boolean;
    /**
     * @module cc
     */
    /**
     * @en Deserialize json to cc.Asset
     * @zh 将 JSON 反序列化为对象实例。
     *
     * 当指定了 target 选项时，如果 target 引用的其它 asset 的 uuid 不变，则不会改变 target 对 asset 的引用，
     * 也不会将 uuid 保存到 result 对象中。
     *
     * @method deserialize
     * @param {String|Object} data - the serialized cc.Asset json string or json object.
     * @param {Details} [details] - additional loading result
     * @param {Object} [options]
     * @return {object} the main data(asset)
     */
    function deserialize(data: any, details: any, options: any): any;
    export namespace deserialize {
        export var reportMissingClass: (id: any) => void;
    }
    /**
     * @en Clones the object `original` and returns the clone, or instantiate a node from the Prefab.
     * @zh 克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点。
     *
     * （Instantiate 时，function 和 dom 等非可序列化对象会直接保留原有引用，Asset 会直接进行浅拷贝，可序列化类型会进行深拷贝。）
     *
     * @method instantiate
     * @param {Prefab|Node|Object} original - An existing object that you want to make a copy of.
     * @return {Node|Object} the newly instantiated object
     * @example
     * ```typescript
     * // instantiate node from prefab
     * var scene = cc.director.getScene();
     * var node = cc.instantiate(prefabAsset);
     * node.parent = scene;
     * // clone node
     * var scene = cc.director.getScene();
     * var node = cc.instantiate(targetNode);
     * node.parent = scene;
     * ```
     */
    function instantiate(original: any, internal_force?: any): any;
    export namespace instantiate {
        export var _clone: typeof __private.cocos_core_data_instantiate_doInstantiate;
        export namespace __private {
            /**
             * @en
             * Do instantiate object, the object to instantiate must be non-nil.
             * @zh
             * 这是一个通用的 instantiate 方法，可能效率比较低。
             * 之后可以给各种类型重写快速实例化的特殊实现，但应该在单元测试中将结果和这个方法的结果进行对比。
             * 值得注意的是，这个方法不可重入。
             *
             * @param {Object} obj - 该方法仅供内部使用，用户需负责保证参数合法。什么参数是合法的请参考 cc.instantiate 的实现。
             * @param {Node} [parent] - 只有在该对象下的场景物体会被克隆。
             * @return {Object}
             * @private
             */
            function cocos_core_data_instantiate_doInstantiate(obj: any, parent?: any): any;
        }
    }
    /**
     * 指定编辑器以整数形式对待该属性或数组元素。
     * 例如：
     * ```ts
     * import { CCInteger, _decorator } from "Cocos3D";
     *
     * // 在 cc 类定义中:
     *
     * \@_decorator.property({type: CCInteger})
     * count = 0;
     *
     * \@_decorator.property({type: [CCInteger]})
     * array = [];
     * ```
     */
    export const CCInteger: _decorator.__private.cocos_core_data_utils_attribute_PrimitiveType<number>;
    /**
     * 指定编辑器以浮点数形式对待该属性或数组元素。
     * 例如：
     * ```ts
     * import { CCFloat, _decorator } from "Cocos3D";
     *
     * // 在 cc 类定义中:
     *
     * \@_decorator.property({type: CCFloat})
     * x = 0;
     *
     * \@_decorator.property({type: [CCFloat]})
     * array = [];
     * ```
     */
    export const CCFloat: _decorator.__private.cocos_core_data_utils_attribute_PrimitiveType<number>;
    /**
     * 指定编辑器以布尔值形式对待该属性或数组元素。
     * 例如：
     * ```ts
     * import { CCBoolean, _decorator } from "Cocos3D";
     *
     * // 在 cc 类定义中:
     *
     * \@_decorator.property({type: CCBoolean})
     * isTrue = false;
     *
     * \@_decorator.property({type: [CCBoolean]})
     * array = [];
     * ```
     */
    export const CCBoolean: _decorator.__private.cocos_core_data_utils_attribute_PrimitiveType<boolean>;
    /**
     * 指定编辑器以字符串形式对待该属性或数组元素。
     * 例如：
     * ```ts
     * import { CCString, _decorator } from "Cocos3D";
     *
     * // 在 cc 类定义中:
     *
     * \@_decorator.property({type: CCString})
     * name = '';
     *
     * \@_decorator.property({type: [CCString]})
     * array = [];
     * ```
     */
    export const CCString: _decorator.__private.cocos_core_data_utils_attribute_PrimitiveType<string>;
    export class CompactValueTypeArray {
        static StorageUnit: typeof __private.cocos_core_data_utils_compact_value_type_array_StorageUnit;
        static ElementType: typeof __private.cocos_core_data_utils_compact_value_type_array_ElementType;
        /**
         * Returns the length in bytes that a buffer needs to encode the specified value array in form of CVTA.
         * @param values The value array.
         * @param unit Target element type.
         */
        static lengthFor(values: any[], elementType: __private.cocos_core_data_utils_compact_value_type_array_ElementType, unit: __private.cocos_core_data_utils_compact_value_type_array_StorageUnit): number;
        /**
         * Compresses the specified value array in form of CVTA into target buffer.
         * @param values The value array.
         * @param unit Target element type.
         * @param arrayBuffer Target buffer.
         * @param byteOffset Offset into target buffer.
         */
        static compress(values: any[], elementType: __private.cocos_core_data_utils_compact_value_type_array_ElementType, unit: __private.cocos_core_data_utils_compact_value_type_array_StorageUnit, arrayBuffer: ArrayBuffer, byteOffset: number, presumedByteOffset: number): CompactValueTypeArray;
        /**
         * Decompresses this CVTA.
         * @param arrayBuffer The buffer this CVTA stored in.
         */
        decompress<T>(arrayBuffer: ArrayBuffer): T[];
    }
    /**
     * 事件相关
     * @category event
     */
    /**
     * @en
     * Base class of all kinds of events.
     *
     * @zh
     * 所有事件对象的基类，包含事件相关基本信息。
     */
    export class Event {
        /**
         * @en
         * Code for event without type.
         *
         * @zh
         * 没有类型的事件。
         */
        static NO_TYPE: string;
        /**
         * @en
         * The type code of Touch event.
         *
         * @zh
         * 触摸事件类型。
         */
        static TOUCH: string;
        /**
         * @en
         * The type code of Mouse event.
         *
         * @zh
         * 鼠标事件类型。
         */
        static MOUSE: string;
        /**
         * @en
         * The type code of Keyboard event.
         *
         * @zh
         * 键盘事件类型。
         */
        static KEYBOARD: string;
        /**
         * @en
         * The type code of Acceleration event.
         *
         * @zh
         * 加速器事件类型。
         */
        static ACCELERATION: string;
        /**
         * @en
         * Events not currently dispatched are in this phase.
         *
         * @zh
         * 尚未派发事件阶段。
         */
        static NONE: number;
        /**
         * @en
         * The capturing phase comprises the journey from the root to the last node before the event target's node
         * [markdown](http://www.w3.org/TR/DOM-Level-3-Events/#event-flow)
         *
         * @zh
         * 捕获阶段，包括事件目标节点之前从根节点到最后一个节点的过程。
         */
        static CAPTURING_PHASE: number;
        /**
         * @en
         * The target phase comprises only the event target node
         * [markdown] (http://www.w3.org/TR/DOM-Level-3-Events/#event-flow)
         *
         * @zh
         * 目标阶段仅包括事件目标节点。
         */
        static AT_TARGET: number;
        /**
         * @en
         * The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the hierarchy
         * [markdown] (http://www.w3.org/TR/DOM-Level-3-Events/#event-flow)
         *
         * @zh
         * 冒泡阶段， 包括回程遇到到层次根节点的任何后续节点。
         */
        static BUBBLING_PHASE: number;
        /**
         * @en
         * The name of the event (case-sensitive), e.g. "click", "fire", or "submit".
         *
         * @zh
         * 事件类型。
         */
        type: string;
        /**
         * @en
         * Indicate whether the event bubbles up through the hierarchy or not.
         *
         * @zh
         * 表示该事件是否进行冒泡。
         */
        bubbles: boolean;
        /**
         * @en
         * A reference to the target to which the event was originally dispatched.
         *
         * @zh
         * 最初事件触发的目标。
         */
        target: Object | null;
        /**
         * @en
         * A reference to the currently registered target for the event.
         *
         * @zh
         * 当前目标。
         */
        currentTarget: Object | null;
        /**
         * @en
         * Indicates which phase of the event flow is currently being evaluated.
         * Returns an integer value represented by 4 constants:
         *  - Event.NONE = 0
         *  - Event.CAPTURING_PHASE = 1
         *  - Event.AT_TARGET = 2
         *  - Event.BUBBLING_PHASE = 3
         * The phases are explained in the [section 3.1, Event dispatch and DOM event flow]
         * [markdown](http://www.w3.org/TR/DOM-Level-3-Events/#event-flow), of the DOM Level 3 Events specification.
         *
         * @zh
         * 事件阶段。
         */
        eventPhase: number;
        /**
         * @en
         * Stops propagation for current event.
         *
         * @zh
         * 停止传递当前事件。
         */
        propagationStopped: boolean;
        /**
         * @en
         * Stops propagation for current event immediately,
         * the event won't even be dispatched to the listeners attached in the current target.
         *
         * @zh
         * 立即停止当前事件的传递，事件甚至不会被分派到所连接的当前目标。
         */
        propagationImmediateStopped: boolean;
        /**
         * @param type - The name of the event (case-sensitive), e.g. "click", "fire", or "submit"
         * @param bubbles - A boolean indicating whether the event bubbles up through the tree or not
         */
        constructor(type: string, bubbles?: boolean);
        /**
         * @en
         * Reset the event for being stored in the object pool.
         *
         * @zh
         * 重置事件对象以便在对象池中存储。
         */
        unuse(): void;
        /**
         * @en
         * Reinitialize the event for being used again after retrieved from the object pool.
         * @zh
         * 重新初始化让对象池中取出的事件可再次使用。
         * @param type - The name of the event (case-sensitive), e.g. "click", "fire", or "submit"
         * @param bubbles - A boolean indicating whether the event bubbles up through the tree or not
         */
        reuse(type: string, bubbles?: boolean): void;
        /**
         * @en
         * Checks whether the event has been stopped.
         *
         * @zh
         * 检查该事件是否已经停止传递。
         */
        isStopped(): boolean;
        /**
         * @en
         * Gets current target of the event                                                            <br/>
         * note: It only be available when the event listener is associated with node.                <br/>
         * It returns 0 when the listener is associated with fixed priority.
         * @zh
         * 获取当前目标节点
         * @returns - The target with which the event associates.
         */
        getCurrentTarget(): Object | null;
        /**
         * @en
         * Gets the event type.
         * @zh
         * 获取事件类型。
         */
        getType(): string;
    }
    /**
     * !#en
     * EventTarget is an object to which an event is dispatched when something has occurred.
     * Entity are the most common event targets, but other objects can be event targets too.
     *
     * Event targets are an important part of the Fireball event model.
     * The event target serves as the focal point for how events flow through the scene graph.
     * When an event such as a mouse click or a keypress occurs, Fireball dispatches an event object
     * into the event flow from the root of the hierarchy. The event object then makes its way through
     * the scene graph until it reaches the event target, at which point it begins its return trip through
     * the scene graph. This round-trip journey to the event target is conceptually divided into three phases:
     * - The capture phase comprises the journey from the root to the last node before the event target's node
     * - The target phase comprises only the event target node
     * - The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the tree
     * See also: http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
     *
     * Event targets can implement the following methods:
     *  - _getCapturingTargets
     *  - _getBubblingTargets
     *
     * If a class cannot extend from EventTarget, it can consider implements IEventTarget interface.
     *
     * !#zh
     * 事件目标是具有注册监听器、派发事件能力的类，Node 是最常见的事件目标，
     * 但是其他类也可以继承自事件目标以获得管理监听器和派发事件的能力。
     * 如果无法继承自 EventTarget，也可以考虑自实现 IEventTarget
     */
    export class EventTarget extends __private.cocos_core_event_callbacks_invoker_CallbacksInvoker {
        /**
         * @en
         * Register an callback of a specific event type on the EventTarget.
         * This type of event should be triggered via `emit`.
         * @zh
         * 注册事件目标的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         * @return - Just returns the incoming callback so you can save the anonymous function easier.
         * @example
         * eventTarget.on('fire', function () {
         *     cc.log("fire in the hole");
         * }, node);
         */
        on(type: string, callback: Function, target?: Object): Function | undefined;
        /**
         * @en
         * Removes the listeners previously registered with the same type, callback, target and or useCapture,
         * if only type is passed as parameter, all listeners registered with that type will be removed.
         * @zh
         * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
         *
         * @param type - A string representing the event type being removed.
         * @param callback - The callback to remove.
         * @param target - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
         * @example
         * // register fire eventListener
         * var callback = eventTarget.on('fire', function () {
         *     cc.log("fire in the hole");
         * }, target);
         * // remove fire event listener
         * eventTarget.off('fire', callback, target);
         * // remove all fire event listeners
         * eventTarget.off('fire');
         */
        off(type: string, callback?: Function, target?: Object): void;
        /**
         * @en Removes all callbacks previously registered with the same target (passed as parameter).
         * This is not for removing all listeners in the current event target,
         * and this is not for removing all listeners the target parameter have registered.
         * It's only for removing all listeners (callback and target couple) registered on the current event target by the target parameter.
         * @zh 在当前 EventTarget 上删除指定目标（target 参数）注册的所有事件监听器。
         * 这个函数无法删除当前 EventTarget 的所有事件监听器，也无法删除 target 参数所注册的所有事件监听器。
         * 这个函数只能删除 target 参数在当前 EventTarget 上注册的所有事件监听器。
         * @param target - The target to be searched for all related listeners
         */
        targetOff(keyOrTarget?: string | Object): void;
        /**
         * @en
         * Register an callback of a specific event type on the EventTarget,
         * the callback will remove itself after the first time it is triggered.
         * @zh
         * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
         *
         * @param type - A string representing the event type to listen for.
         * @param callback - The callback that will be invoked when the event is dispatched.
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param target - The target (this object) to invoke the callback, can be null
         * @example
         * eventTarget.once('fire', function () {
         *     cc.log("this is the callback and will be invoked only once");
         * }, node);
         */
        once(type: string, callback: Function, target?: Object): Function | undefined;
    }
    /**
     * 原生资源的基类。内部使用。
     * @private
     */
    export class RawAsset extends CCObject {
        /**
         * 内部使用。
         */
        static isRawAssetType(ctor: Function): boolean;
        /**
         * 内部使用。
         */
        _uuid: string;
        constructor(...args: ConstructorParameters<typeof CCObject>);
    }
    /**
     * @en
     * Base class for handling assets used in Creator.<br/>
     *
     * You may want to override:<br/>
     * - createNode<br/>
     * - getset functions of _nativeAsset<br/>
     * - cc.Object._serialize<br/>
     * - cc.Object._deserialize<br/>
     * @zh
     * Creator 中的资源基类。<br/>
     *
     * 您可能需要重写：<br/>
     * - createNode <br/>
     * - _nativeAsset 的 getset 方法<br/>
     * - cc.Object._serialize<br/>
     * - cc.Object._deserialize<br/>
     *
     * @class Asset
     * @extends RawAsset
     */
    export class Asset extends RawAsset implements __private.cocos_core_event_event_target_factory_IEventTarget {
        /**
         * @en Indicates whether its dependent raw assets can support deferred load if the owner scene (or prefab) is marked as `asyncLoadAssets`.
         * @zh 当场景或 Prefab 被标记为 `asyncLoadAssets`，禁止延迟加载该资源所依赖的其它 RawAsset。
         *
         * @property {Boolean} preventDeferredLoadDependents
         * @default false
         * @static
         */
        static preventDeferredLoadDependents: boolean;
        /**
         * @en Indicates whether its native object should be preloaded from native url.
         * @zh 禁止预加载原生对象。
         *
         * @property {Boolean} preventPreloadNativeObject
         * @default false
         * @static
         */
        static preventPreloadNativeObject: boolean;
        /**
         * 应 AssetDB 要求提供这个方法。
         * @method deserialize
         * @param {String} data
         * @return {Asset}
         */
        static deserialize(data: any): any;
        /**
         * @en
         * Whether the asset is loaded or not
         * @zh
         * 该资源是否已经成功加载。
         */
        loaded: boolean;
        /**
         * @en
         * Serializable url for native asset. For internal usage.
         * @zh
         * 用于本机资产的可序列化URL。供内部使用。
         * @default ""
         */
        _native: string;
        constructor(...args: ConstructorParameters<typeof RawAsset>);
        /**
         * @en
         * IEventTarget implementations, they will be overwrote with the same implementation in EventTarget by applyMixins
         * @zh
         * IEventTarget 实现，它们将被 applyMixins 在 EventTarget 中用相同的实现覆盖
         */
        _callbackTable: any;
        on(type: string, callback: Function, target?: Object | undefined): Function | undefined;
        off(type: string, callback?: Function | undefined, target?: Object | undefined): void;
        targetOff(keyOrTarget?: string | Object | undefined): void;
        once(type: string, callback: Function, target?: Object | undefined): Function | undefined;
        dispatchEvent(event: Event): void;
        hasEventListener(key: string, callback?: Function | undefined, target?: Object | undefined): boolean;
        removeAll(keyOrTarget?: string | Object | undefined): void;
        emit(key: string, ...args: any[]): void;
        get nativeUrl(): string;
        get _nativeAsset(): any;
        set _nativeAsset(obj: any);
        /**
         * @en
         * Returns the string representation of the object.<br>
         * The `Asset` object overrides the `toString()` method of the `Object` object.<br>
         * JavaScript calls the toString() method automatically<br>
         * when an asset is to be represented as a text value or when a texture is referred to in a string concatenation.<br>
         * <br>
         * For assets of the native type, it will return `this.nativeUrl`.<br>
         * Otherwise, an empty string is returned.<br>
         * This method may be overwritten by subclasses.
         * @zh
         * 返回对象的字符串表示形式。<br>
         * `Asset` 对象将会重写 `Object` 对象的 `toString()` 方法。<br>
         * 当资源要表示为文本值时或在字符串连接时引用时，<br>
         * JavaScript 会自动调用 toString() 方法。<br>
         * <br>
         * 对于原始类型的资源，它将返回`this.nativeUrl`。<br>
         * 否则，返回空字符串。<br>
         * 子类可能会覆盖此方法。
         * @method toString
         * @return {String}
         */
        toString(): string;
        /**
         * 应 AssetDB 要求提供这个方法。
         * 返回一个序列化后的对象
         *
         * @method serialize
         * @return {String}
         * @private
         */
        serialize(): void;
        /**
         * @en
         * Set native file name for this asset.
         * @zh
         * 为此资源设置原始文件名。
         * @seealso nativeUrl
         *
         * @param filename
         * @param inLibrary
         * @private
         */
        _setRawAsset(filename: string, inLibrary?: boolean): void;
        /**
         * @en
         * Create a new node using this asset in the scene.<br/>
         * If this type of asset dont have its corresponding node type, this method should be null.
         * @zh
         * 使用该资源在场景中创建一个新节点。<br/>
         * 如果这类资源没有相应的节点类型，该方法应该是空的。
         */
        createNode?(callback: __private.cocos_core_assets_asset_CreateNodeCallback): void;
    }
    /**
     * @en Class for prefab handling.
     * @zh 预制资源类。
     */
    export class Prefab extends Asset {
        static OptimizationPolicy: {
            /**
             * 根据创建次数自动调整优化策略。初次创建实例时，行为等同 SINGLE_INSTANCE，多次创建后将自动采用 MULTI_INSTANCE。
             * @property {Number} AUTO
             */
            AUTO: number;
            /**
             * 优化单次创建性能。<br>
             * 该选项会跳过针对这个 prefab 的代码生成优化操作。当该 prefab 加载后，一般只会创建一个实例时，请选择此项。
             * @property {Number} SINGLE_INSTANCE
             */
            SINGLE_INSTANCE: number;
            /**
             * 优化多次创建性能。<br>
             * 该选项会启用针对这个 prefab 的代码生成优化操作。当该 prefab 加载后，一般会创建多个实例时，请选择此项。如果该 prefab 在场景中的节点启用了自动关联，并且在场景中有多份实例，也建议选择此项。
             * @property {Number} MULTI_INSTANCE
             */
            MULTI_INSTANCE: number;
        };
        static OptimizationPolicyThreshold: number;
        /**
         * @property {Node} data - the main cc.Node in the prefab
         */
        data: any;
        /**
         * @zh
         * 设置实例化这个 prefab 时所用的优化策略。根据使用情况设置为合适的值，能优化该 prefab 实例化所用的时间。
         * @en
         * Indicates the optimization policy for instantiating this prefab.
         * Set to a suitable value based on usage, can optimize the time it takes to instantiate this prefab.
         *
         * @property {Prefab.OptimizationPolicy} optimizationPolicy
         * @default Prefab.OptimizationPolicy.AUTO
         * @since 1.10.0
         * @example
         * ```typescript
         * prefab.optimizationPolicy = cc.Prefab.OptimizationPolicy.MULTI_INSTANCE;
         * ```
         */
        optimizationPolicy: number;
        /**
         * @en Indicates the raw assets of this prefab can be load after prefab loaded.
         * @zh 指示该 Prefab 依赖的资源可否在 Prefab 加载后再延迟加载。
         * @default false
         */
        asyncLoadAssets: Boolean;
        constructor();
        createNode(cb: Function): void;
        /**
         * @en
         * Dynamically translation prefab data into minimized code.<br/>
         * This method will be called automatically before the first time the prefab being instantiated,<br/>
         * but you can re-call to refresh the create function once you modified the original prefab data in script.
         * @zh
         * 将预制数据动态转换为最小化代码。<br/>
         * 此方法将在第一次实例化预制件之前自动调用，<br/>
         * 但是您可以在脚本中修改原始预制数据后重新调用以刷新创建功能。
         */
        compileCreateFunction(): void;
    }
    /**
     * @en Class for scene handling.
     * @zh 场景资源类。
     * @class SceneAsset
     * @extends Asset
     *
     */
    export class SceneAsset extends Asset {
        /**
         * 场景结点。
         */
        scene: Scene | null;
        /**
         * @en Indicates the raw assets of this scene can be load after scene launched.
         * @zh 指示该场景依赖的资源可否在场景切换后再延迟加载。
         * @property {Boolean} asyncLoadAssets
         * @default false
         */
        asyncLoadAssets: boolean;
    }
    /**
     * @en
     * Class for sprite atlas handling.
     *
     * @zh
     * 精灵图集资源类。
     * 可通过 cc.SpriteAtlas 获取该组件。
     */
    export class SpriteAtlas extends Asset {
        spriteFrames: __private.cocos_core_assets_sprite_atlas_ISpriteFrameList;
        /**
         * @zh
         * 获取精灵图集的贴图。请注意，由于结构调整优化，在 v1.1 版本之前，此函数的返回值为 imageAsset，在 v1.1 版本之后修正为 texture，想要获取 imageAsset 可使用 getTexture().image 获取
         *
         * @returns - 精灵贴图。
         */
        getTexture(): import("cocos/core/assets/texture-base").TextureBase | null;
        /**
         * @zh
         * 根据键值获取精灵。
         *
         * @param key - 精灵名。
         * @returns - 精灵。
         */
        getSpriteFrame(key: string): SpriteFrame | null;
        /**
         * @zh
         * 获取精灵图集所有精灵。
         *
         * @returns - 返回所有精灵。
         */
        getSpriteFrames(): (SpriteFrame | null)[];
        _serialize(exporting?: any): {
            name: string;
            spriteFrames: string[];
        };
        _deserialize(serializeData: any, handle: any): void;
    }
    /**
     * @en Class for text file.
     * @zh 文本资源。
     */
    export class TextAsset extends Asset {
        /**
         * 此资源包含的文本。
         */
        text: string;
        /**
         * @zh
         * 重载标准的 `toString()` 方法。
         */
        toString(): string;
    }
    /**
     * @zh
     * Json 资源。
     * Json 资源加载后将直接解析为对象。如果你希望获得 JSON 的原始文本，你需要使用文本资源（使用文件名后缀“.txt”）。
     */
    export class JsonAsset extends Asset {
        /**
         * 解析后的对象。
         */
        json: object | null;
    }
    /**
     * 管理项目中加载/卸载资源的资源库。
     * @class AssetLibrary
     * @static
     */
    export const AssetLibrary: {
        /**
         * 这里保存所有已经加载的场景资源，防止同一个资源在内存中加载出多份拷贝。
         *
         * 这里用不了WeakMap，在浏览器中所有加载过的资源都只能手工调用 unloadAsset 释放。
         *
         * 参考：
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
         * https://github.com/TooTallNate/node-weak
         *
         * @property {object} _uuidToAsset
         * @private
         */
        _uuidToAsset: {};
        /**
         * @callback loadCallback
         * @param {String} error - null or the error info
         * @param {Asset} data - the loaded asset or null
         */
        /**
         * @zh
         * 加载资源。
         * @param {String} uuid
         * @param {loadCallback} callback - 加载完成后执行的回调函数。
         * @param {Object} options
         * @param {Boolean} options.readMainCache - 默认为true。如果为false，则资源及其所有依赖资源将重新加载并从库中创建新实例。
         * @param {Boolean} options.writeMainCache - 默认为true。如果为true，则结果将缓存到 AssetLibrary，并且必须由用户手动卸载。
         * @param {Asset} options.existingAsset - 加载现有资源，此参数仅在编辑器中可用。
         */
        loadAsset(uuid: String, callback: Function, options?: any): void;
        /**
         * @zh
         * 获取资源的 url。
         */
        getLibUrlNoExt(uuid: any, inRawAssetsDir?: boolean | undefined): string;
        /**
         * @zh
         * 在编辑器中查询资源信息。
         * @param uuid 资源的 uuid。
         * @protected
         */
        _queryAssetInfoInEditor(uuid: any, callback: any): void;
        /**
         * @zh
         * 在运行时获取资源信息。
         */
        _getAssetInfoInRuntime(uuid: any, result?: any): any;
        /**
         * @zh
         * 在 setting 中的 uuid。
         */
        _uuidInSettings(uuid: any): boolean;
        /**
         * @zh
         * 获取资源信息。
         * @param {String} uuid 资源的 uuid。
         * @param {Function} callback
         * @param {Error} callback.error
         * @param {String} callback.url - the url of raw asset or imported asset
         * @param {Boolean} callback.raw - indicates whether the asset is raw asset
         * @param {Function} callback.ctorInEditor - the actual type of asset, used in editor only
         */
        queryAssetInfo(uuid: any, callback: any): void;
        /**
         * @en
         * parse uuid out of url
         * @zh
         * 从 url 解析 uuid。
         * @param url 资源地址。
         */
        parseUuidInEditor(url: any): string | undefined;
        /**
         * @zh
         * 加载 json。
         * @param {String} json
         * @param {loadCallback} callback
         * @return {LoadingHandle}
         * @private
         */
        loadJson(json: any, callback: any): void;
        /**
         * @en
         * Get the exists asset by uuid.
         * @zh
         * 根据 uuid 获取存在的资源。
         * @param {String} uuid
         * @return {Asset} - 返回存在的资源，若没有加载则返回 null
         * @private
         */
        getAssetByUuid(uuid: any): any;
        /**
         * @en
         * init the asset library
         * @zh
         * 初始化 AssetLibrary。
         * @method init
         * @param {Object} options
         * @param {String} options.libraryPath - 能接收的任意类型的路径，通常在编辑器里使用绝对的，在网页里使用相对的。
         * @param {Object} options.mountPaths - mount point of actual urls for raw assets (only used in editor)
         * @param {Object} [options.rawAssets] - uuid to raw asset's urls (only used in runtime)
         * @param {String} [options.rawAssetsBase] - base of raw asset's urls (only used in runtime)
         * @param {String} [options.packedAssets] - packed assets (only used in runtime)
         */
        init(options: any): void;
    };
    /**
     * 图像资源。
     */
    export class ImageAsset extends Asset {
        get _nativeAsset(): __private.cocos_core_assets_image_asset_ImageSource;
        set _nativeAsset(value: __private.cocos_core_assets_image_asset_ImageSource);
        get data(): ArrayBufferView | HTMLCanvasElement | HTMLImageElement;
        get width(): number;
        get height(): number;
        get format(): __private.cocos_core_assets_asset_enum_PixelFormat;
        get isCompressed(): boolean;
        get url(): string;
        set _texture(tex: any);
        get _texture(): any;
        /**
         * @param nativeAsset
         */
        constructor(nativeAsset?: __private.cocos_core_assets_image_asset_ImageSource);
        /**
         * 重置此图像资源使用的原始图像源。
         * @param data 新的原始图像源。
         */
        reset(data: __private.cocos_core_assets_image_asset_ImageSource): void;
        _serialize(): "" | {
            fmt: string;
            w: number;
            h: number;
        };
        _deserialize(data: any, handle: any): void;
        _onDataComplete(): void;
    }
    /**
     * 二维贴图资源。
     * 二维贴图资源的每个 Mipmap 层级都为一张图像资源。
     */
    export class Texture2D extends __private.cocos_core_assets_simple_texture_SimpleTexture {
        get mipmaps(): ImageAsset[];
        set mipmaps(value: ImageAsset[]);
        get image(): ImageAsset | null;
        set image(value: ImageAsset | null);
        _mipmaps: ImageAsset[];
        constructor();
        onLoaded(): void;
        /**
         * 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 `this.uploadData` 来上传贴图数据。
         * @param info 贴图重置选项。
         */
        reset(info: __private.cocos_core_assets_texture_2d_ITexture2DCreateInfo): void;
        /**
         * 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级的贴图。重置后，贴图的像素数据将变为未定义。
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 `this.uploadData` 来上传贴图数据。
         * @param width 像素宽度。
         * @param height 像素高度。
         * @param format 像素格式。
         * @param mipmapLevel mipmap 层级。
         * @deprecated 将在 V1.0.0 移除，请转用 `this.reset()`。
         */
        create(width: number, height: number, format?: __private.cocos_core_assets_asset_enum_PixelFormat, mipmapLevel?: number): void;
        /**
         * 返回此贴图的字符串表示。
         */
        toString(): string;
        updateMipmaps(firstLevel?: number, count?: number): void;
        /**
         * 若此贴图 0 级 Mipmap 的图像资源的实际源存在并为 HTML 元素则返回它，否则返回 `null`。
         * @returns HTML 元素或 `null`。
         * @deprecated 请转用 `this.image.data`。
         */
        getHtmlElementObj(): HTMLCanvasElement | HTMLImageElement | null;
        /**
         * 销毁此贴图，清空所有 Mipmap 并释放占用的 GPU 资源。
         */
        destroy(): boolean;
        /**
         * 返回此贴图的描述。
         * @returns 此贴图的描述。
         */
        description(): string;
        /**
         * 释放占用的 GPU 资源。
         * @deprecated 请转用 `this.destroy()`。
         */
        releaseTexture(): void;
        _serialize(exporting?: any): any;
        _deserialize(serializedData: any, handle: any): void;
        initialize(): void;
        protected _getGfxTextureCreateInfo(presumed: __private.cocos_core_assets_simple_texture_PresumedGFXTextureInfo): {
            type: GFXTextureType;
            width: number;
            height: number;
        } & Pick<IGFXTextureInfo, "usage" | "flags" | "format" | "mipLevel">;
        protected _getGfxTextureViewCreateInfo(presumed: __private.cocos_core_assets_simple_texture_PresumedGFXTextureViewInfo): {
            type: GFXTextureViewType;
        } & Pick<IGFXTextureViewInfo, "format" | "texture">;
        protected _checkTextureLoaded(): void;
    }
    /**
     * 立方体贴图资源。
     * 立方体贴图资源的每个 Mipmap 层级都为 6 张图像资源，分别代表了立方体贴图的 6 个面。
     */
    export class TextureCube extends __private.cocos_core_assets_simple_texture_SimpleTexture {
        static FaceIndex: typeof __private.cocos_core_assets_texture_cube_FaceIndex;
        get mipmaps(): __private.cocos_core_assets_texture_cube_ITextureCubeMipmap[];
        set mipmaps(value: __private.cocos_core_assets_texture_cube_ITextureCubeMipmap[]);
        get image(): __private.cocos_core_assets_texture_cube_ITextureCubeMipmap | null;
        set image(value: __private.cocos_core_assets_texture_cube_ITextureCubeMipmap | null);
        /**
         * 通过二维贴图指定每个 Mipmap 的每个面创建立方体贴图。
         * @param textures 数组长度必须是6的倍数。
         * 每 6 个二维贴图依次构成立方体贴图的 Mipmap。6 个面应该按 `FaceIndex` 规定顺序排列。
         * @param out 出口立方体贴图，若未定义则将创建为新的立方体贴图。
         * @returns `out`
         * @example
         * ```typescript
         * const textures = new Array<Texture2D>(6);
         * textures[TextureCube.FaceIndex.front] = frontImage;
         * textures[TextureCube.FaceIndex.back] = backImage;
         * textures[TextureCube.FaceIndex.left] = leftImage;
         * textures[TextureCube.FaceIndex.right] = rightImage;
         * textures[TextureCube.FaceIndex.top] = topImage;
         * textures[TextureCube.FaceIndex.bottom] = bottomImage;
         * const textureCube = TextureCube.fromTexture2DArray(textures);
         * ```
         */
        static fromTexture2DArray(textures: Texture2D[], out?: TextureCube): TextureCube;
        _mipmaps: __private.cocos_core_assets_texture_cube_ITextureCubeMipmap[];
        constructor();
        onLoaded(): void;
        /**
         * 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 `this.uploadData` 来上传贴图数据。
         * @param info 贴图重置选项。
         */
        reset(info: __private.cocos_core_assets_texture_cube_ITextureCubeCreateInfo): void;
        updateMipmaps(firstLevel?: number, count?: number): void;
        /**
         * 销毁此贴图，清空所有 Mipmap 并释放占用的 GPU 资源。
         */
        destroy(): boolean;
        /**
         * 释放占用的 GPU 资源。
         * @deprecated 请转用 `this.destroy()`。
         */
        releaseTexture(): void;
        _serialize(exporting?: any): {
            base: any;
            mipmaps: {
                front: string;
                back: string;
                left: string;
                right: string;
                top: string;
                bottom: string;
            }[];
        };
        _deserialize(serializedData: __private.cocos_core_assets_texture_cube_ITextureCubeSerializeData, handle: any): void;
        protected _getGfxTextureCreateInfo(presumed: __private.cocos_core_assets_simple_texture_PresumedGFXTextureInfo): {
            type: GFXTextureType;
            width: number;
            height: number;
            arrayLayer: number;
        } & Pick<IGFXTextureInfo, "usage" | "flags" | "format" | "mipLevel">;
        protected _getGfxTextureViewCreateInfo(presumed: __private.cocos_core_assets_simple_texture_PresumedGFXTextureViewInfo): {
            type: GFXTextureViewType;
            layerCount: number;
        } & Pick<IGFXTextureViewInfo, "format" | "texture">;
    }
    /**
     * @en
     * Class for TTFFont handling.
     *
     * @zh
     * TTF 字体资源类。
     * 可通过 cc.TTFFont 获取该组件。
     */
    export class TTFFont extends Font {
        _fontFamily: any;
        get _nativeAsset(): any;
        set _nativeAsset(value: any);
    }
    /**
     * @en
     * Class for LabelAtlas handling.
     *
     * @zh
     * 艺术数字字体资源类。
     * 可通过 cc.LabelAtlas 获取该组件。
     *
     */
    export class LabelAtlas extends BitmapFont {
    }
    /**
     * @en
     * Class for BitmapFont handling.
     *
     * @zh
     * 位图字体资源类。
     * 可通过 cc.BitmapFont 获取该组件。
     */
    export class BitmapFont extends Font {
        fntDataStr: string;
        /**
         * @zh
         * bitmap font 依赖精灵。
         */
        spriteFrame: SpriteFrame | null;
        /**
         * @zh
         * 文字尺寸。
         */
        fontSize: number;
        /**
         * @zh
         * 文字配置。
         */
        fntConfig: __private.cocos_core_assets_bitmap_font_IConfig | null;
    }
    /**
     * @en
     * Class for Font handling.
     *
     * @zh
     * 字体资源类。
     * 可通过 cc.Font 获取该组件。
     */
    export class Font extends Asset {
    }
    export namespace textureUtil {
        /**
         * 加载指定的图像资源。
         * @param url 图像资源的链接。
         * @param callback 回调函数。
         * @param target 回调函数的 `this` 参数。
         * @returns 图像资源，返回时可能还未完成加载；加载完成或失败时会调用回调函数。
         */
        export function loadImage<T>(url: string, callback?: LoadImageCallback<T>, target?: T): ImageAsset;
        /**
         * 缓存指定的图像源，为它指定链接。此后，可以通过该链接直接加载它。
         * @param url 指定的链接。
         * @param image 缓存的图像源。
         */
        export function cacheImage(url: string, image: __private.cocos_core_assets_image_asset_ImageSource): ImageAsset | undefined;
        /**
         * 尝试加载图像资源的实际数据。
         * @param imageAsset 图像资源。
         * @param callback 回调函数。
         */
        export function postLoadImage(imageAsset: ImageAsset, callback?: Function): void;
        export type LoadImageCallback<T> = (this: T | undefined, error: Error | null | undefined, asset?: ImageAsset) => void;
    }
    /**
     * @zh
     * Effect 资源，作为材质实例初始化的模板，每个 effect 资源都应是全局唯一的。
     */
    export class EffectAsset extends Asset {
        /**
         * @zh
         * 将指定 effect 注册到全局管理器。
         */
        static register(asset: EffectAsset): void;
        /**
         * @zh
         * 将指定 effect 从全局管理器移除。
         */
        static remove(name: string): void;
        /**
         * @zh
         * 获取指定名字的 effect 资源。
         */
        static get(name: string): EffectAsset | null;
        /**
         * @zh
         * 获取所有已注册的 effect 资源。
         */
        static getAll(): Record<string, EffectAsset>;
        protected static _effects: Record<string, EffectAsset>;
        /**
         * @zh
         * 当前 effect 的所有可用 technique。
         */
        techniques: __private.cocos_core_assets_effect_asset_ITechniqueInfo[];
        /**
         * @zh
         * 当前 effect 使用的所有 shader。
         */
        shaders: renderer.__private.cocos_core_assets_effect_asset_IShaderInfo[];
        /**
         * @zh
         * 每个 shader 需要预编译的宏定义组合。
         */
        combinations: __private.cocos_core_assets_effect_asset_IPreCompileInfo[];
        /**
         * @zh
         * 通过 Loader 加载完成时的回调，将自动注册 effect 资源。
         */
        onLoaded(): void;
        protected _precompile(): void;
    }
    /**
     * @en
     * The material asset, specifies in details how a model is drawn on screen.
     * @zh
     * 材质资源类，包含模型绘制方式的全部细节描述。
     */
    export class Material extends Asset {
        static getHash(material: Material): number;
        protected _effectAsset: EffectAsset | null;
        protected _techIdx: number;
        protected _defines: renderer.IDefineMap[];
        protected _states: renderer.PassOverrides[];
        protected _props: Record<string, __private.cocos_core_assets_material_MaterialPropertyFull | __private.cocos_core_assets_material_MaterialPropertyFull[]>[];
        protected _passes: renderer.Pass[];
        protected _hash: number;
        get effectAsset(): EffectAsset | null;
        get effectName(): string;
        get technique(): number;
        get passes(): renderer.Pass[];
        get hash(): number;
        get parent(): Material | null;
        get owner(): RenderableComponent | null;
        constructor();
        /**
         * @en Initialize this material with the given information.
         * @zh 根据所给信息初始化这个材质，初始化正常结束后材质即可立即用于渲染。
         * @param info Material description info.
         */
        initialize(info: __private.cocos_core_assets_material_IMaterialInfo): void;
        reset(info: __private.cocos_core_assets_material_IMaterialInfo): void;
        /**
         * @en
         * Destroy the material definitively.<br>
         * Cannot re-initialize after destroy.<br>
         * For re-initialize purposes, call [[Material.initialize]] directly.
         * @zh
         * 彻底销毁材质，注意销毁后无法重新初始化。<br>
         * 如需重新初始化材质，不必先调用 destroy。
         */
        destroy(): boolean;
        /**
         * @en Recompile the shader with the specified macro overrides. Allowed only on material instances.
         * @zh 使用指定预处理宏重新编译当前 pass（数组）中的 shader。只允许对材质实例执行。
         * @param overrides The shader macro override values.
         * @param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        recompileShaders(overrides: renderer.IDefineMap, passIdx?: number): void;
        /**
         * @en Override the passes with the specified pipeline states. Allowed only on material instances.
         * @zh 使用指定管线状态重载当前的 pass（数组）。只允许对材质实例执行。
         * @param overrides The pipeline state override values.
         * @param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        overridePipelineStates(overrides: renderer.PassOverrides, passIdx?: number): void;
        /**
         * @en Callback function after material is loaded in [[Loader]]. Initialize the resources automatically.
         * @zh 通过 [[Loader]] 加载完成时的回调，将自动初始化材质资源。
         */
        onLoaded(): void;
        /**
         * @en Reset all the uniforms to the default value specified in [[EffectAsset]].
         * @zh 重置材质的所有 uniform 参数数据为 [[EffectAsset]] 中的默认初始值。
         * @param clearPasses Will the rendering data be cleared too?
         */
        resetUniforms(clearPasses?: boolean): void;
        /**
         * @en
         * Convenient property setter provided for quick material setup.<br>
         * [[Pass.setUniform]] should be used instead if you need to do per-frame uniform update.
         * @zh
         * 设置材质 uniform 参数的统一入口。<br>
         * 注意如果需要每帧更新 uniform，建议使用 [[Pass.setUniform]] 以获得更好的性能。
         * @param name The target uniform name.
         * @param val The target value.
         * @param passIdx The pass to apply to. Will apply to all passes if not specified.
         */
        setProperty(name: string, val: __private.cocos_core_assets_material_MaterialPropertyFull | __private.cocos_core_assets_material_MaterialPropertyFull[], passIdx?: number): void;
        /**
         * @en
         * Get the specified uniform value for this material.<br>
         * Note that only uniforms set through [[Material.setProperty]] can be acquired here.<br>
         * For the complete rendering data, use [[Pass.getUniform]] instead.
         * @zh
         * 获取当前材质的指定 uniform 参数的值。<br>
         * 注意只有通过 [[Material.setProperty]] 函数设置的参数才能从此函数取出，<br>
         * 如需取出完整的渲染数据，请使用 [[Pass.getUniform]]。
         * @param name The property or uniform name.
         * @param passIdx The target pass index. If not specified, return the first found value in all passes.
         */
        getProperty(name: string, passIdx?: number): number | math.Vec3 | math.Mat4 | math.Quat | math.Mat3 | math.Vec2 | math.Vec4 | math.Color | GFXTextureView | __private.cocos_core_assets_texture_base_TextureBase | SpriteFrame | __private.cocos_core_assets_material_MaterialPropertyFull[] | null;
        /**
         * @en Copy the target material.
         * @zh 复制目标材质到当前实例。
         * @param mat The material to be copied.
         */
        copy(mat: Material): void;
        protected _prepareInfo(patch: object | object[], cur: object[]): void;
        protected _createPasses(): renderer.Pass[];
        protected _update(keepProps?: boolean): void;
        protected _uploadProperty(pass: renderer.Pass, name: string, val: __private.cocos_core_assets_material_MaterialPropertyFull | __private.cocos_core_assets_material_MaterialPropertyFull[]): boolean;
        protected _doDestroy(): void;
    }
    /**
     * 网格资源。
     */
    export class Mesh extends Asset {
        get _nativeAsset(): ArrayBuffer;
        set _nativeAsset(value: ArrayBuffer);
        get subMeshCount(): number;
        get minPosition(): math.Vec3 | undefined;
        get maxPosition(): math.Vec3 | undefined;
        get struct(): Mesh.IStruct;
        get data(): Uint8Array | null;
        get hash(): number;
        get jointBufferIndices(): number[];
        constructor();
        initialize(): void;
        /**
         * 销毁此网格，并释放它占有的所有 GPU 资源。
         */
        destroy(): boolean;
        /**
         * 释放此网格占有的所有 GPU 资源。
         */
        destroyRenderingMesh(): void;
        /**
         * 重置此网格的结构和数据。
         * @param struct 新的结构。
         * @param data 新的数据。
         * @deprecated 将在 V1.0.0 移除，请转用 `this.reset()`。
         */
        assign(struct: Mesh.IStruct, data: Uint8Array): void;
        /**
         * 重置此网格。
         * @param info 网格重置选项。
         */
        reset(info: Mesh.ICreateInfo): void;
        get renderingSubMeshes(): renderer.__private.cocos_core_assets_mesh_RenderingSubMesh[];
        getBoneSpaceBounds(skeleton: Skeleton): (geometry.aabb | null)[];
        /**
         * 合并指定的网格到此网格中。
         * @param mesh 合并的网格。
         * @param worldMatrix 合并的网格的世界变换矩阵
         * @param [validate=false] 是否进行验证。
         * @returns 是否验证成功。若验证选项为 `true` 且验证未通过则返回 `false`，否则返回 `true`。
         */
        merge(mesh: Mesh, worldMatrix?: math.Mat4, validate?: boolean): boolean;
        /**
         * 验证指定网格是否可以合并至当前网格。
         *
         * 当满足以下条件之一时，指定网格可以合并至当前网格：
         *  - 当前网格无数据而待合并网格有数据；
         *  - 它们的顶点块数目相同且对应顶点块的布局一致，并且它们的子网格数目相同且对应子网格的布局一致。
         *
         * 两个顶点块布局一致当且仅当：
         *  - 它们具有相同数量的顶点属性且对应的顶点属性具有相同的属性格式。
         *
         * 两个子网格布局一致，当且仅当：
         *  - 它们具有相同的图元类型并且引用相同数量、相同索引的顶点块；并且，
         *  - 要么都需要索引绘制，要么都不需要索引绘制。
         * @param mesh 指定的网格。
         */
        validateMergingMesh(mesh: Mesh): boolean;
        /**
         * 读取子网格的指定属性。
         * @param primitiveIndex 子网格索引。
         * @param attributeName 属性名称。
         * @returns 不存在指定的子网格、子网格不存在指定的属性或属性无法读取时返回 `null`，
         * 否则，创建足够大的缓冲区包含指定属性的所有数据，并为该缓冲区创建与属性类型对应的数组视图。
         */
        readAttribute(primitiveIndex: number, attributeName: GFXAttributeName): Storage | null;
        /**
         * 读取子网格的指定属性到目标缓冲区中。
         * @param primitiveIndex 子网格索引。
         * @param attributeName 属性名称。
         * @param buffer 目标缓冲区。
         * @param stride 相邻属性在目标缓冲区的字节间隔。
         * @param offset 首个属性在目标缓冲区中的偏移。
         * @returns 不存在指定的子网格、子网格不存在指定的属性或属性无法读取时返回 `false`，否则返回 `true`。
         */
        copyAttribute(primitiveIndex: number, attributeName: GFXAttributeName, buffer: ArrayBuffer, stride: number, offset: number): boolean;
        /**
         * 读取子网格的索引数据。
         * @param primitiveIndex 子网格索引。
         * @returns 不存在指定的子网格或子网格不存在索引数据时返回 `null`，
         * 否则，创建足够大的缓冲区包含所有索引数据，并为该缓冲区创建与索引类型对应的数组视图。
         */
        readIndices(primitiveIndex: number): Uint8Array | Uint16Array | Uint32Array | null;
        /**
         * 读取子网格的索引数据到目标数组中。
         * @param primitiveIndex 子网格索引。
         * @param outputArray 目标数组。
         * @returns 不存在指定的子网格或子网格不存在索引数据时返回 `false`，否则返回 `true`。
         */
        copyIndices(primitiveIndex: number, outputArray: number[] | ArrayBufferView): boolean;
        morphRendering: __private.cocos_core_assets_morph_MorphRendering | null;
    }
    export namespace Mesh {
        export interface IBufferView {
            offset: number;
            length: number;
            count: number;
            stride: number;
        }
        /**
         * @zh
         * 顶点块。顶点块描述了一组**交错排列**（interleaved）的顶点属性并存储了顶点属性的实际数据。<br>
         * 交错排列是指在实际数据的缓冲区中，每个顶点的所有属性总是依次排列，并总是出现在下一个顶点的所有属性之前。
         */
        export interface IVertexBundle {
            /**
             * 所有顶点属性的实际数据块。
             * 你必须使用 DataView 来读取数据。
             * 因为不能保证所有属性的起始偏移都按 TypedArray 要求的字节对齐。
             */
            view: IBufferView;
            /**
             * 包含的所有顶点属性。
             */
            attributes: IGFXAttribute[];
        }
        /**
         * 子网格。子网格由一系列相同类型的图元组成（例如点、线、面等）。
         */
        export interface ISubMesh {
            /**
             * 此子网格引用的顶点块，索引至网格的顶点块数组。
             */
            vertexBundelIndices: number[];
            /**
             * 此子网格的图元类型。
             */
            primitiveMode: GFXPrimitiveMode;
            /**
             * 此子网格使用的索引数据。
             */
            indexView?: IBufferView;
            /**
             * 此子网格使用的关节索引映射表在 IStruct.jointMaps 中的索引。
             * 如未定义或指向的映射表不存在，则默认 VB 内所有关节索引数据直接对应骨骼资源数据。
             */
            jointMapIndex?: number;
        }
        /**
         * 描述了网格的结构。
         */
        export interface IStruct {
            /**
             * 此网格所有的顶点块。
             */
            vertexBundles: IVertexBundle[];
            /**
             * 此网格的所有子网格。
             */
            primitives: ISubMesh[];
            /**
             * （各分量都）小于等于此网格任何顶点位置的最大位置。
             */
            minPosition?: math.Vec3;
            /**
             * （各分量都）大于等于此网格任何顶点位置的最小位置。
             */
            maxPosition?: math.Vec3;
            /**
             * 此网格使用的关节索引映射关系列表，数组长度应为子模型中实际使用到的所有关节，
             * 每个元素都对应一个原骨骼资源里的索引，按子模型 VB 内的实际索引排列。
             */
            jointMaps?: number[][];
            morph?: __private.cocos_core_assets_morph_Morph;
        }
        export interface ICreateInfo {
            /**
             * 网格结构。
             */
            struct: Mesh.IStruct;
            /**
             * 网格二进制数据。
             */
            data: Uint8Array;
        }
        export namespace __private {
            export interface cocos_core_assets_morph_MorphTarget {
                /**
                 * Displacement of each target attribute.
                 */
                displacements: Mesh.IBufferView[];
            }
            export interface cocos_core_assets_morph_SubMeshMorph {
                /**
                 * Attributes to morph.
                 */
                attributes: GFXAttributeName[];
                /**
                 * Targets.
                 */
                targets: cocos_core_assets_morph_MorphTarget[];
                /**
                 * Initial weights of each target.
                 */
                weights?: number[];
            }
            export interface cocos_core_assets_morph_Morph {
                /**
                 * Morph data of each sub-mesh.
                 */
                subMeshMorphs: Array<cocos_core_assets_morph_SubMeshMorph | null>;
                /**
                 * Common initial weights of each sub-mesh.
                 */
                weights?: number[];
            }
        }
    }
    /**
     * 骨骼资源。
     * 骨骼资源记录了每个关节（相对于`SkinningModelComponent.skinningRoot`）的路径以及它的绑定姿势矩阵。
     */
    export class Skeleton extends Asset {
        get bindposes(): math.Mat4[];
        set bindposes(value: math.Mat4[]);
        get joints(): string[];
        set joints(value: string[]);
        get hash(): number;
        destroy(): boolean;
    }
    export class RenderTexture extends __private.cocos_core_assets_texture_base_TextureBase {
        static DepthStencilFormat: typeof __private.cocos_core_assets_asset_enum_DepthStencilFormat;
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get depthStencilFormat(): __private.cocos_core_assets_asset_enum_DepthStencilFormat;
        set depthStencilFormat(value: __private.cocos_core_assets_asset_enum_DepthStencilFormat);
        getGFXWindow(): GFXWindow | null;
        getGFXTextureView(): GFXTextureView | null;
        getGFXStencilTexture(): GFXTextureView | null;
        reset(info?: __private.cocos_core_assets_render_texture_IRenderTextureCreateInfo): void;
        destroy(): boolean;
        onLoaded(): void;
        _serialize(exporting?: any): any;
        _deserialize(serializeData: any, handle: any): void;
        protected _tryResetWindow(): void;
        protected _createWindow(device: GFXDevice): GFXWindow | undefined;
    }
    export class RenderPipelineAsset extends Asset {
        renderPipeline: RenderPipeline | null;
    }
    /**
     * @zh
     * 脚本资源基类。
     */
    export class Script extends Asset {
    }
    /**
     * @zh
     * JavaScript 脚本资源。
     */
    export class JavaScript extends Script {
    }
    /**
     * @zh
     * Typescript 脚本资源。
     */
    export class TypeScript extends Script {
    }
    export interface IUV {
        u: number;
        v: number;
    }
    export interface IVertices {
        x: any;
        y: any;
        triangles: any;
        nu: number[];
        u: number[];
        nv: number[];
        v: number[];
    }
    export interface ISpriteFrameInitInfo {
        /**
         * @zh Texture 对象资源。
         */
        texture?: __private.cocos_core_assets_texture_base_TextureBase;
        /**
         * @zh 精灵帧原始尺寸。
         */
        originalSize?: math.Size;
        /**
         * @zh 精灵帧裁切矩形。
         */
        rect?: math.Rect;
        /**
         * @zh 精灵帧偏移量。
         */
        offset?: math.Vec2;
        /**
         * @zh 上边界。
         */
        borderTop?: number;
        /**
         * @zh 下边界。
         */
        borderBottom?: number;
        /**
         * @zh 左边界
         */
        borderLeft?: number;
        /**
         * @zh 右边界
         */
        borderRight?: number;
        /**
         * @zh 是否旋转。
         */
        isRotate?: boolean;
        /**
         * @zh 是否转置 UV。
         */
        isFlipUv?: boolean;
    }
    /**
     * @en
     * A cc.SpriteFrame has:<br/>
     *  - texture: A cc.Texture2D that will be used by render components<br/>
     *  - rectangle: A rectangle of the texture
     *
     * @zh
     * 精灵帧资源。
     * 一个 SpriteFrame 包含：<br/>
     *  - 纹理：会被渲染组件使用的 Texture2D 对象。<br/>
     *  - 矩形：在纹理中的矩形区域。
     * 可通过 cc.SpriteFrame 获取该组件。
     *
     * @example
     * ```typescript
     * // First way to use a SpriteFrame
     * const url = "assets/PurpleMonster/icon/spriteFrame";
     * cc.loader.loadRes(url, (err, spriteFrame) => {
     *   const node = new Node("New Sprite");
     *   const sprite = node.addComponent(SpriteComponent);
     *   sprite.spriteFrame = spriteFrame;
     *   node.parent = self.node;
     * });
     *
     * // Second way to use a SpriteFrame
     * const self = this;
     * const url = "test_assets/PurpleMonster";
     * cc.loader.loadRes(url, (err, imageAsset) => {
     *  if(err){
     *    return;
     *  }
     *
     *  const node = new Node("New Sprite");
     *  const sprite = node.addComponent(SpriteComponent);
     *  const spriteFrame = new SpriteFrame();
     *  const tex = imageAsset._texture;
     *  spriteFrame.texture = tex;
     *  sprite.spriteFrame = spriteFrame;
     *  node.parent = self.node;
     * });
     *
     * // Third way to use a SpriteFrame
     * const self = this;
     * const cameraComp = this.getComponent(CameraComponent);
     * const renderTexture = new RenderTexture();
     * rendetTex.reset({
     *   width: 512,
     *   height: 512,
     *   depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_24_STENCIL_8
     * });
     *
     * cameraComp.targetTexture = renderTexture;
     * const spriteFrame = new SpriteFrame();
     * spriteFrame.texture = renderTexture;
     * ```
     */
    export class SpriteFrame extends Asset {
        get insetTop(): number;
        set insetTop(value: number);
        get insetBottom(): number;
        set insetBottom(value: number);
        get insetLeft(): number;
        set insetLeft(value: number);
        get insetRight(): number;
        set insetRight(value: number);
        get rect(): math.Rect;
        set rect(value: math.Rect);
        get originalSize(): math.Size;
        set originalSize(value: math.Size);
        get offset(): math.Vec2;
        set offset(value: math.Vec2);
        get rotated(): boolean;
        set rotated(rotated: boolean);
        get texture(): __private.cocos_core_assets_texture_base_TextureBase;
        set texture(value: __private.cocos_core_assets_texture_base_TextureBase);
        get atlasUuid(): string;
        set atlasUuid(value: string);
        get width(): number;
        get height(): number;
        set _textureSource(value: __private.cocos_core_assets_texture_base_TextureBase);
        vertices: IVertices | null;
        /**
         * @zh
         * 不带裁切的 UV。
         */
        uv: number[];
        uvHash: number;
        /**
         * @zh
         * 带有裁切的 UV。
         */
        uvSliced: IUV[];
        protected _rect: math.Rect;
        protected _offset: math.Vec2;
        protected _originalSize: math.Size;
        protected _rotated: boolean;
        protected _capInsets: number[];
        protected _atlasUuid: string;
        protected _texture: __private.cocos_core_assets_texture_base_TextureBase;
        protected _flipUv: boolean;
        constructor();
        /**
         * @en
         * Returns whether the texture have been loaded.
         *
         * @zh
         * 返回是否已加载精灵帧。
         */
        textureLoaded(): boolean;
        /**
         * @en
         * Returns whether the sprite frame is rotated in the texture.
         *
         * @zh
         * 获取 SpriteFrame 是否旋转。
         * @deprecated 即将在 1.2 废除，请使用 `isRotated = rect.rotated`。
         */
        isRotated(): boolean;
        /**
         * @en
         * Set whether the sprite frame is rotated in the texture.
         *
         * @zh
         * 设置 SpriteFrame 是否旋转。
         * @param value
         * @deprecated 即将在 1.2 废除，请使用 `rect.rotated = true`。
         */
        setRotated(rotated: boolean): void;
        /**
         * @en
         * Returns the rect of the sprite frame in the texture.
         * If it's a atlas texture, a transparent pixel area is proposed for the actual mapping of the current texture.
         *
         * @zh
         * 获取 SpriteFrame 的纹理矩形区域。
         * 如果是一个 atlas 的贴图，则为当前贴图的实际剔除透明像素区域。
         * @deprecated 即将在 1.2 废除，请使用 `rect.set(spritFrame.rect)`。
         */
        getRect(out?: math.Rect): math.Rect;
        /**
         * @en
         * Sets the rect of the sprite frame in the texture.
         *
         * @zh
         * 设置 SpriteFrame 的纹理矩形区域。
         * @deprecated 即将在 1.2 废除，请使用 `spritFrame.rect = rect`。
         */
        setRect(rect: math.Rect): void;
        /**
         * @en
         * Returns the original size of the trimmed image.
         *
         * @zh
         * 获取修剪前的原始大小。
         * @deprecated 即将在 1.2 废除，请使用 `size.set(spritFrame.originalSize)`。
         */
        getOriginalSize(out?: math.Size): math.Size;
        /**
         * @en
         * Sets the original size of the trimmed image.
         *
         * @zh
         * 设置修剪前的原始大小。
         *
         * @param size - 设置精灵原始大小。
         * @deprecated 即将在 1.2 废除，请使用 `spritFrame.originalSize = size`。
         */
        setOriginalSize(size: math.Size): void;
        /**
         * @en
         * Returns the offset of the frame in the texture.
         *
         * @zh
         * 获取偏移量。
         *
         * @param out - 可复用的偏移量。
         * @deprecated 即将在 1.2 废除，请使用 `offset.set(spritFrame.offset)`。
         */
        getOffset(out?: math.Vec2): math.Vec2;
        /**
         * @en
         * Sets the offset of the frame in the texture.
         *
         * @zh
         * 设置偏移量。
         *
         * @param offsets - 偏移量。
         * @deprecated 即将在 1.2 废除，请使用 `spritFrame.offset = offset`。
         */
        setOffset(offset: math.Vec2): void;
        getGFXTextureView(): GFXTextureView | null;
        getGFXSampler(): GFXSampler | null;
        /**
         * 重置 SpriteFrame 数据。
         * @param info SpriteFrame 初始化数据。
         */
        reset(info?: ISpriteFrameInitInfo, clearData?: boolean): void;
        /**
         * @zh
         * 判断精灵计算的矩形区域是否越界。
         *
         * @param texture
         */
        checkRect(texture: __private.cocos_core_assets_texture_base_TextureBase): boolean;
        onLoaded(): void;
        destroy(): boolean;
        _calculateSlicedUV(): void;
        /**
         * @zh
         * 计算 UV。
         */
        _calculateUV(): void;
        _serialize(exporting?: any): any;
        _deserialize(serializeData: any, handle: any): void;
        protected _textureLoaded(): void;
        protected _refreshTexture(texture: __private.cocos_core_assets_texture_base_TextureBase): void;
    }
    /**
     * @en Outputs a message to the Cocos Creator Console (editor) or Web Console (runtime).
     * @zh 输出一条消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。
     * @param message - A JavaScript string containing zero or more substitution strings.
     * @param optionalParams - JavaScript objects with which to replace substitution strings within msg.
     * This gives you additional control over the format of the output.
     */
    export function log(message?: any, ...optionalParams: any[]): void;
    /**
     * @en
     * Outputs an error message to the Cocos Creator Console (editor) or Web Console (runtime).<br/>
     * - In Cocos Creator, error is red.<br/>
     * - In Chrome, error have a red icon along with red message text.<br/>
     * @zh
     * 输出错误消息到 Cocos Creator 编辑器的 Console 或运行时页面端的 Console 中。<br/>
     * - 在 Cocos Creator 中，错误信息显示是红色的。<br/>
     * - 在 Chrome 中，错误信息有红色的图标以及红色的消息文本。<br/>
     * @param message - A JavaScript string containing zero or more substitution strings.
     * @param optionalParams - JavaScript objects with which to replace substitution strings within msg.
     * This gives you additional control over the format of the output.
     */
    export function error(message?: any, ...optionalParams: any[]): void;
    /**
     * @en
     * Outputs a warning message to the Cocos Creator Console (editor) or Web Console (runtime).
     * - In Cocos Creator, warning is yellow.
     * - In Chrome, warning have a yellow warning icon with the message text.
     * @zh
     * 输出警告消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。<br/>
     * - 在 Cocos Creator 中，警告信息显示是黄色的。<br/>
     * - 在 Chrome 中，警告信息有着黄色的图标以及黄色的消息文本。<br/>
     * @param message - A JavaScript string containing zero or more substitution strings.
     * @param optionalParams - JavaScript objects with which to replace substitution strings within msg.
     * This gives you additional control over the format of the output.
     */
    export function warn(message?: any, ...optionalParams: any[]): void;
    /**
     * @en
     * Assert the condition and output error messages if the condition is not true.
     * @zh
     * 对检查测试条件进行检查，如果条件不为 true 则输出错误消息
     * @param value - The condition to check on
     * @param message - A JavaScript string containing zero or more substitution strings.
     * @param optionalParams - JavaScript objects with which to replace substitution strings within msg.
     * This gives you additional control over the format of the output.
     */
    export function assert(value: any, message?: string, ...optionalParams: any[]): void;
    export function logID(id: number, ...optionalParams: any[]): void;
    export function errorID(id: number, ...optionalParams: any[]): void;
    export function warnID(id: number, ...optionalParams: any[]): void;
    export function assertID(condition: boolean, id: number, ...optionalParams: any[]): void;
    /**
     * @en Returns whether or not to display the FPS and debug information.
     * @zh 是否显示 FPS 信息和部分调试信息。
     */
    export function isDisplayStats(): boolean;
    /**
     * @en Sets whether display the FPS and debug informations on the bottom-left corner.
     * @zh 设置是否在左下角显示 FPS 和部分调试。
     */
    export function setDisplayStats(displayStats: boolean): void;
    /**
     * @category core
     */
    /**
     * @en The screen API provides an easy way for web content to be presented using the user's entire screen.
     * It's designed for web platforms and some mobile browsers don't provide such behavior, e.g. Safari
     * @zh screen 单例对象提供简单的方法来尝试让 Web 内容进入全屏模式。这是 Web 平台特有的行为，在部分浏览器上并不支持这样的功能。
     */
    export const screen: {
        _supportsFullScreen: boolean;
        _preOnFullScreenChange: any;
        _touchEvent: string;
        _fn: any;
        _fnMap: string[][];
        /**
         * @en Initialization
         * @zh 初始化函数
         */
        init(): void;
        /**
         * @en Return true if it's in full screen state now.
         * @zh 当前是否处在全屏状态下
         * @returns {Boolean}
         */
        fullScreen(): boolean;
        /**
         * @en Request to enter full screen mode with the given element.
         * Many browser forbid to enter full screen mode without an user intended interaction.
         * For simplify the process, you can try to use {{autoFullScreen}} which will try to enter full screen mode during the next user touch event.
         * @zh 尝试使当前节点进入全屏模式，很多浏览器不允许程序触发这样的行为，必须在一个用户交互回调中才会生效。
         * 如果希望更简单一些，可以尝试用 {{autoFullScreen}} 来自动监听用户触摸事件并在下一次触摸事件中尝试进入全屏模式。
         * @param element The element to request full screen state
         * @param onFullScreenChange callback function when full screen state changed
         */
        requestFullScreen(element: HTMLElement, onFullScreenChange: (this: Document, ev: any) => any): any;
        /**
         * @en Exit the full mode.
         * @zh 退出全屏模式
         * @return Success or not
         */
        exitFullScreen(): boolean;
        /**
         * @en Automatically request full screen during the next touch/click event
         * @zh 自动监听触摸、鼠标事件并在下一次事件触发时尝试进入全屏模式
         * @param element The element to request full screen state
         * @param onFullScreenChange callback function when full screen state changed
         */
        autoFullScreen(element: HTMLElement, onFullScreenChange: (this: Document, ev: any) => any): void;
    };
    /**
     * @en SubContextView is a view component which controls open data context viewport in WeChat game platform.<br/>
     * The component's node size decide the viewport of the sub context content in main context,
     * the entire sub context texture will be scaled to the node's bounding box area.<br/>
     * This component provides multiple important features:<br/>
     * 1. Sub context could use its own resolution size and policy.<br/>
     * 2. Sub context could be minized to smallest size it needed.<br/>
     * 3. Resolution of sub context content could be increased.<br/>
     * 4. User touch input is transformed to the correct viewport.<br/>
     * 5. Texture update is handled by this component. User don't need to worry.<br/>
     * One important thing to be noted, whenever the node's bounding box change,
     * you need to manually reset the viewport of sub context using updateSubContextViewport.
     * @zh SubContextView 可以用来控制微信小游戏平台开放数据域在主域中的视窗的位置。<br/>
     * 这个组件的节点尺寸决定了开放数据域内容在主域中的尺寸，整个开放数据域会被缩放到节点的包围盒范围内。<br/>
     * 在这个组件的控制下，用户可以更自由得控制开放数据域：<br/>
     * 1. 子域中可以使用独立的设计分辨率和适配模式<br/>
     * 2. 子域区域尺寸可以缩小到只容纳内容即可<br/>
     * 3. 子域的分辨率也可以被放大，以便获得更清晰的显示效果<br/>
     * 4. 用户输入坐标会被自动转换到正确的子域视窗中<br/>
     * 5. 子域内容贴图的更新由组件负责，用户不需要处理<br/>
     * 唯一需要注意的是，当子域节点的包围盒发生改变时，开发者需要使用 `updateSubContextViewport` 来手动更新子域视窗。
     */
    export class SubContextView extends Component {
        get fps(): number;
        set fps(value: number);
        constructor();
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
        update(dt: number): void;
        /**
         * @en Reset open data context size and viewport
         * @zh 重置开放数据域的尺寸和视窗
         */
        reset(): void;
        /**
         * @en Update the sub context viewport manually, it should be called whenever the node's bounding box changes.
         * @zh 更新开放数据域相对于主域的 viewport，这个函数应该在节点包围盒改变时手动调用。
         */
        updateSubContextViewport(): void;
    }
    /**
     * @en A set of system related variables
     * @zh 一系列系统相关环境变量
     * @main
     */
    export const sys: {
        [x: string]: any;
    };
    /**
     * @en
     * Predefined constants
     * @zh
     * 预定义常量。
     */
    export const macro: {
        /**
         * @en
         * The image format supported by the engine defaults, and the supported formats may differ in different build platforms and device types.
         * Currently all platform and device support ['.webp', '.jpg', '.jpeg', '.bmp', '.png'], ios mobile platform
         * @zh
         * 引擎默认支持的图片格式，支持的格式可能在不同的构建平台和设备类型上有所差别。
         * 目前所有平台和设备支持的格式有 ['.webp', '.jpg', '.jpeg', '.bmp', '.png']. The iOS mobile platform also supports the PVR format。
         */
        SUPPORT_TEXTURE_FORMATS: string[];
        /**
         * @en Key map for keyboard event
         * @zh 键盘事件的按键值。
         * @example {@link cocos/core/platform/CCCommon/KEY.js}
         */
        KEY: {
            /**
             * @en None
             * @zh 没有分配
             * @readonly
             */
            none: number;
            /**
             * @en The back key
             * @zh 返回键
             * @readonly
             */
            back: number;
            /**
             * @en The menu key
             * @zh 菜单键
             * @readonly
             */
            menu: number;
            /**
             * @en The backspace key
             * @zh 退格键
             * @readonly
             */
            backspace: number;
            /**
             * @en The tab key
             * @zh Tab 键
             * @readonly
             */
            tab: number;
            /**
             * @en The enter key
             * @zh 回车键
             * @readonly
             */
            enter: number;
            /**
             * @en The shift key
             * @zh Shift 键
             * @readonly
             */
            shift: number;
            /**
             * @en The ctrl key
             * @zh Ctrl 键
             * @readonly
             */
            ctrl: number;
            /**
             * @en The alt key
             * @zh Alt 键
             * @readonly
             */
            alt: number;
            /**
             * @en The pause key
             * @zh 暂停键
             * @readonly
             */
            pause: number;
            /**
             * @en The caps lock key
             * @zh 大写锁定键
             * @readonly
             */
            capslock: number;
            /**
             * @en The esc key
             * @zh ESC 键
             * @readonly
             */
            escape: number;
            /**
             * @en The space key
             * @zh 空格键
             * @readonly
             */
            space: number;
            /**
             * @en The page up key
             * @zh 向上翻页键
             * @readonly
             */
            pageup: number;
            /**
             * @en The page down key
             * @zh 向下翻页键
             * @readonly
             */
            pagedown: number;
            /**
             * @en The end key
             * @zh 结束键
             * @readonly
             */
            end: number;
            /**
             * @en The home key
             * @zh 主菜单键
             * @readonly
             */
            home: number;
            /**
             * @en The left key
             * @zh 向左箭头键
             * @readonly
             */
            left: number;
            /**
             * @en The up key
             * @zh 向上箭头键
             * @readonly
             */
            up: number;
            /**
             * @en The right key
             * @zh 向右箭头键
             * @readonly
             */
            right: number;
            /**
             * @en The down key
             * @zh 向下箭头键
             * @readonly
             */
            down: number;
            /**
             * @en The select key
             * @zh Select 键
             * @readonly
             */
            select: number;
            /**
             * @en The insert key
             * @zh 插入键
             * @readonly
             */
            insert: number;
            /**
             * @en The Delete key
             * @zh 删除键
             * @readonly
             */
            Delete: number;
            /**
             * @en The '0' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 0 键
             * @readonly
             */
            0: number;
            /**
             * @en The '1' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 1 键
             * @readonly
             */
            1: number;
            /**
             * @en The '2' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 2 键
             * @readonly
             */
            2: number;
            /**
             * @en The '3' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 3 键
             * @readonly
             */
            3: number;
            /**
             * @en The '4' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 4 键
             * @readonly
             */
            4: number;
            /**
             * @en The '5' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 5 键
             * @readonly
             */
            5: number;
            /**
             * @en The '6' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 6 键
             * @readonly
             */
            6: number;
            /**
             * @en The '7' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 7 键
             * @readonly
             */
            7: number;
            /**
             * @en The '8' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 8 键
             * @readonly
             */
            8: number;
            /**
             * @en The '9' key on the top of the alphanumeric keyboard.
             * @zh 字母键盘上的 9 键
             * @readonly
             */
            9: number;
            /**
             * @en The a key
             * @zh A 键
             * @readonly
             */
            a: number;
            /**
             * @en The b key
             * @zh B 键
             * @readonly
             */
            b: number;
            /**
             * @en The c key
             * @zh C 键
             * @readonly
             */
            c: number;
            /**
             * @en The d key
             * @zh D 键
             * @readonly
             */
            d: number;
            /**
             * @en The e key
             * @zh E 键
             * @readonly
             */
            e: number;
            /**
             * @en The f key
             * @zh F 键
             * @readonly
             */
            f: number;
            /**
             * @en The g key
             * @zh G 键
             * @readonly
             */
            g: number;
            /**
             * @en The h key
             * @zh H 键
             * @readonly
             */
            h: number;
            /**
             * @en The i key
             * @zh I 键
             * @readonly
             */
            i: number;
            /**
             * @en The j key
             * @zh J 键
             * @readonly
             */
            j: number;
            /**
             * @en The k key
             * @zh K 键
             * @readonly
             */
            k: number;
            /**
             * @en The l key
             * @zh L 键
             * @readonly
             */
            l: number;
            /**
             * @en The m key
             * @zh M 键
             * @readonly
             */
            m: number;
            /**
             * @en The n key
             * @zh N 键
             * @readonly
             */
            n: number;
            /**
             * @en The o key
             * @zh O 键
             * @readonly
             */
            o: number;
            /**
             * @en The p key
             * @zh P 键
             * @readonly
             */
            p: number;
            /**
             * @en The q key
             * @zh Q 键
             * @readonly
             */
            q: number;
            /**
             * @en The r key
             * @zh R 键
             * @readonly
             */
            r: number;
            /**
             * @en The s key
             * @zh S 键
             * @readonly
             */
            s: number;
            /**
             * @en The t key
             * @zh T 键
             * @readonly
             */
            t: number;
            /**
             * @en The u key
             * @zh U 键
             * @readonly
             */
            u: number;
            /**
             * @en The v key
             * @zh V 键
             * @readonly
             */
            v: number;
            /**
             * @en The w key
             * @zh W 键
             * @readonly
             */
            w: number;
            /**
             * @en The x key
             * @zh X 键
             * @readonly
             */
            x: number;
            /**
             * @en The y key
             * @zh Y 键
             * @readonly
             */
            y: number;
            /**
             * @en The z key
             * @zh Z 键
             * @readonly
             */
            z: number;
            /**
             * @en The numeric keypad 0
             * @zh 数字键盘 0
             * @readonly
             */
            num0: number;
            /**
             * @en The numeric keypad 1
             * @zh 数字键盘 1
             * @readonly
             */
            num1: number;
            /**
             * @en The numeric keypad 2
             * @zh 数字键盘 2
             * @readonly
             */
            num2: number;
            /**
             * @en The numeric keypad 3
             * @zh 数字键盘 3
             * @readonly
             */
            num3: number;
            /**
             * @en The numeric keypad 4
             * @zh 数字键盘 4
             * @readonly
             */
            num4: number;
            /**
             * @en The numeric keypad 5
             * @zh 数字键盘 5
             * @readonly
             */
            num5: number;
            /**
             * @en The numeric keypad 6
             * @zh 数字键盘 6
             * @readonly
             */
            num6: number;
            /**
             * @en The numeric keypad 7
             * @zh 数字键盘 7
             * @readonly
             */
            num7: number;
            /**
             * @en The numeric keypad 8
             * @zh 数字键盘 8
             * @readonly
             */
            num8: number;
            /**
             * @en The numeric keypad 9
             * @zh 数字键盘 9
             * @readonly
             */
            num9: number;
            /**
             * @en The numeric keypad '*'
             * @zh 数字键盘 *
             * @readonly
             */
            "*": number;
            /**
             * @en The numeric keypad '+'
             * @zh 数字键盘 +
             * @readonly
             */
            "+": number;
            /**
             * @en The numeric keypad '-'
             * @zh 数字键盘 -
             * @readonly
             */
            "-": number;
            /**
             * @en The numeric keypad 'delete'
             * @zh 数字键盘删除键
             * @readonly
             */
            numdel: number;
            /**
             * @en The numeric keypad '/'
             * @zh 数字键盘 /
             * @readonly
             */
            "/": number;
            /**
             * @en The F1 function key
             * @zh F1 功能键
             * @readonly
             */
            f1: number;
            /**
             * @en The F2 function key
             * @zh F2 功能键
             * @readonly
             */
            f2: number;
            /**
             * @en The F3 function key
             * @zh F3 功能键
             * @readonly
             */
            f3: number;
            /**
             * @en The F4 function key
             * @zh F4 功能键
             * @readonly
             */
            f4: number;
            /**
             * @en The F5 function key
             * @zh F5 功能键
             * @readonly
             */
            f5: number;
            /**
             * @en The F6 function key
             * @zh F6 功能键
             * @readonly
             */
            f6: number;
            /**
             * @en The F7 function key
             * @zh F7 功能键
             * @readonly
             */
            f7: number;
            /**
             * @en The F8 function key
             * @zh F8 功能键
             * @readonly
             */
            f8: number;
            /**
             * @en The F9 function key
             * @zh F9 功能键
             * @readonly
             */
            f9: number;
            /**
             * @en The F10 function key
             * @zh F10 功能键
             * @readonly
             */
            f10: number;
            /**
             * @en The F11 function key
             * @zh F11 功能键
             * @readonly
             */
            f11: number;
            /**
             * @en The F12 function key
             * @zh F12 功能键
             * @readonly
             */
            f12: number;
            /**
             * @en The numlock key
             * @zh 数字锁定键
             * @readonly
             */
            numlock: number;
            /**
             * @en The scroll lock key
             * @zh 滚动锁定键
             * @readonly
             */
            scrolllock: number;
            /**
             * @en The ';' key.
             * @zh 分号键
             * @readonly
             */
            ";": number;
            /**
             * @en The ';' key.
             * @zh 分号键
             * @readonly
             */
            semicolon: number;
            /**
             * @en The '=' key.
             * @zh 等于号键
             * @readonly
             */
            equal: number;
            /**
             * @en The '=' key.
             * @zh 等于号键
             * @readonly
             */
            "=": number;
            /**
             * @en The ',' key.
             * @zh 逗号键
             * @readonly
             */
            ",": number;
            /**
             * @en The ',' key.
             * @zh 逗号键
             * @readonly
             */
            comma: number;
            /**
             * @en The dash '-' key.
             * @zh 中划线键
             * @readonly
             */
            dash: number;
            /**
             * @en The '.' key.
             * @zh 句号键
             * @readonly
             */
            ".": number;
            /**
             * @en The '.' key
             * @zh 句号键
             * @readonly
             */
            period: number;
            /**
             * @en The forward slash key
             * @zh 正斜杠键
             * @readonly
             */
            forwardslash: number;
            /**
             * @en The grave key
             * @zh 按键 `
             * @readonly
             */
            grave: number;
            /**
             * @en The '[' key
             * @zh 按键 [
             * @readonly
             */
            "[": number;
            /**
             * @en The '[' key
             * @zh 按键 [
             * @readonly
             */
            openbracket: number;
            /**
             * @en The '\' key
             * @zh 反斜杠键
             * @readonly
             */
            backslash: number;
            /**
             * @en The ']' key
             * @zh 按键 ]
             * @readonly
             */
            "]": number;
            /**
             * @en The ']' key
             * @zh 按键 ]
             * @readonly
             */
            closebracket: number;
            /**
             * @en The quote key
             * @zh 单引号键
             * @readonly
             */
            quote: number;
            /**
             * @en The dpad left key
             * @zh 导航键 向左
             * @readonly
             */
            dpadLeft: number;
            /**
             * @en The dpad right key
             * @zh 导航键 向右
             * @readonly
             */
            dpadRight: number;
            /**
             * @en The dpad up key
             * @zh 导航键 向上
             * @readonly
             */
            dpadUp: number;
            /**
             * @en The dpad down key
             * @zh 导航键 向下
             * @readonly
             */
            dpadDown: number;
            /**
             * @en The dpad center key
             * @zh 导航键 确定键
             * @readonly
             */
            dpadCenter: number;
        };
        /**
         * PI / 180
         */
        RAD: number;
        /**
         * One degree
         */
        DEG: number;
        /**
         * A maximum value of number
         */
        REPEAT_FOREVER: number;
        /**
         * A minimal float value
         */
        FLT_EPSILON: number;
        /**
         * @en Oriented vertically
         * @zh 竖屏朝向
         */
        ORIENTATION_PORTRAIT: number;
        /**
         * @en Oriented horizontally
         * @zh 横屏朝向
         */
        ORIENTATION_LANDSCAPE: number;
        /**
         * @en Oriented automatically
         * @zh 自动适配朝向
         */
        ORIENTATION_AUTO: number;
        /**
         * <p>
         *   If enabled, the texture coordinates will be calculated by using this formula: <br/>
         *      - texCoord.left = (rect.x*2+1) / (texture.wide*2);                  <br/>
         *      - texCoord.right = texCoord.left + (rect.width*2-2)/(texture.wide*2); <br/>
         *                                                                                 <br/>
         *  The same for bottom and top.                                                   <br/>
         *                                                                                 <br/>
         *  This formula prevents artifacts by using 99% of the texture.                   <br/>
         *  The "correct" way to prevent artifacts is by expand the texture's border with the same color by 1 pixel<br/>
         *                                                                                  <br/>
         *  Affected component:                                                                 <br/>
         *      - TMXLayer                                                       <br/>
         *                                                                                  <br/>
         *  Enabled by default. To disabled set it to 0. <br/>
         *  To modify it, in Web engine please refer to CCMacro.js, in JSB please refer to CCConfig.h
         * </p>
         * Currently not useful in 3D engine
         */
        FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: boolean;
        /**
         * @en
         * Whether or not enabled tiled map auto culling. If you set the TiledMap skew or rotation,
         * then need to manually disable this, otherwise, the rendering will be wrong.
         * Currently not useful in 3D engine
         * @zh
         * 是否开启瓦片地图的自动裁减功能。瓦片地图如果设置了 skew, rotation 的话，需要手动关闭，否则渲染会出错。
         * 在 3D 引擎中暂时无效。
         * @default true
         */
        ENABLE_TILEDMAP_CULLING: boolean;
        /**
         * @en Position of the FPS (Default: 0,0 (bottom-left corner))<br/>
         * Currently not useful in 3D engine
         * @zh 在 3D 引擎中暂时无效。
         */
        DIRECTOR_STATS_POSITION: math.Vec2;
        /**
         * @en
         * The timeout to determine whether a touch is no longer active and should be removed.
         * The reason to add this timeout is due to an issue in X5 browser core,
         * when X5 is presented in wechat on Android, if a touch is glissed from the bottom up, and leave the page area,
         * no touch cancel event is triggered, and the touch will be considered active forever.
         * After multiple times of this action, our maximum touches number will be reached and all new touches will be ignored.
         * So this new mechanism can remove the touch that should be inactive if it's not updated during the last 5000 milliseconds.
         * Though it might remove a real touch if it's just not moving for the last 5 seconds which is not easy with the sensibility of mobile touch screen.
         * You can modify this value to have a better behavior if you find it's not enough.
         * @zh
         * 用于甄别一个触点对象是否已经失效并且可以被移除的延时时长
         * 添加这个时长的原因是 X5 内核在微信浏览器中出现的一个 bug。
         * 在这个环境下，如果用户将一个触点从底向上移出页面区域，将不会触发任何 touch cancel 或 touch end 事件，而这个触点会被永远当作停留在页面上的有效触点。
         * 重复这样操作几次之后，屏幕上的触点数量将达到我们的事件系统所支持的最高触点数量，之后所有的触摸事件都将被忽略。
         * 所以这个新的机制可以在触点在一定时间内没有任何更新的情况下视为失效触点并从事件系统中移除。
         * 当然，这也可能移除一个真实的触点，如果用户的触点真的在一定时间段内完全没有移动（这在当前手机屏幕的灵敏度下会很难）。
         * 你可以修改这个值来获得你需要的效果，默认值是 5000 毫秒。
         * @default 5000
         */
        TOUCH_TIMEOUT: number;
        /**
         * @en
         * The max concurrent task number for the downloader
         * @zh
         * 下载任务的最大并发数限制，在安卓平台部分机型或版本上可能需要限制在较低的水平
         * @default 64
         */
        DOWNLOAD_MAX_CONCURRENT: number;
        /**
         * @en
         * Boolean that indicates if the canvas contains an alpha channel, default sets to false for better performance.
         * Though if you want to make your canvas background transparent and show other dom elements at the background,
         * you can set it to true before {{game.init}}.
         * Web only.
         * @zh
         * 用于设置 Canvas 背景是否支持 alpha 通道，默认为 false，这样可以有更高的性能表现。
         * 如果你希望 Canvas 背景是透明的，并显示背后的其他 DOM 元素，你可以在 {{game.init}} 之前将这个值设为 true。
         * 仅支持 Web
         * @default false
         */
        ENABLE_TRANSPARENT_CANVAS: boolean;
        /**
         * @en
         * Boolean that indicates if the WebGL context is created with `antialias` option turned on, default value is false.
         * Set it to true could make your game graphics slightly smoother, like texture hard edges when rotated.
         * Whether to use this really depend on your game design and targeted platform,
         * device with retina display usually have good detail on graphics with or without this option,
         * you probably don't want antialias if your game style is pixel art based.
         * Also, it could have great performance impact with some browser / device using software MSAA.
         * You can set it to true before {{game.init}}.
         * Web only.
         * @zh
         * 用于设置在创建 WebGL Context 时是否开启抗锯齿选项，默认值是 false。
         * 将这个选项设置为 true 会让你的游戏画面稍稍平滑一些，比如旋转硬边贴图时的锯齿。是否开启这个选项很大程度上取决于你的游戏和面向的平台。
         * 在大多数拥有 retina 级别屏幕的设备上用户往往无法区分这个选项带来的变化；如果你的游戏选择像素艺术风格，你也多半不会想开启这个选项。
         * 同时，在少部分使用软件级别抗锯齿算法的设备或浏览器上，这个选项会对性能产生比较大的影响。
         * 你可以在 {{game.init}} 之前设置这个值，否则它不会生效。
         * 仅支持 Web
         * @property {Boolean} ENABLE_WEBGL_ANTIALIAS
         * @default false
         */
        ENABLE_WEBGL_ANTIALIAS: boolean;
        /**
         * @en
         * Whether or not clear dom Image object cache after uploading to gl texture.
         * Concretely, we are setting image.src to empty string to release the cache.
         * Normally you don't need to enable this option, because on web the Image object doesn't consume too much memory.
         * But on Wechat Game platform, the current version cache decoded data in Image object, which has high memory usage.
         * So we enabled this option by default on Wechat, so that we can release Image cache immediately after uploaded to GPU.
         * Currently not useful in 3D engine
         * @zh
         * 是否在将贴图上传至 GPU 之后删除 DOM Image 缓存。
         * 具体来说，我们通过设置 image.src 为空字符串来释放这部分内存。
         * 正常情况下，你不需要开启这个选项，因为在 web 平台，Image 对象所占用的内存很小。
         * 但是在微信小游戏平台的当前版本，Image 对象会缓存解码后的图片数据，它所占用的内存空间很大。
         * 所以我们在微信平台默认开启了这个选项，这样我们就可以在上传 GL 贴图之后立即释放 Image 对象的内存，避免过高的内存占用。
         * 在 3D 引擎中暂时无效。
         * @default false
         */
        CLEANUP_IMAGE_CACHE: boolean;
        /**
         * @en
         * Whether to enable multi-touch.
         * @zh
         * 是否开启多点触摸
         * @property {Boolean} ENABLE_MULTI_TOUCH
         * @default true
         */
        ENABLE_MULTI_TOUCH: boolean;
    };
    /**
     * @en View represents the game window.<br/>
     * It's main task include: <br/>
     *  - Apply the design resolution policy to the UI Canvas<br/>
     *  - Provide interaction with the window, like resize event on web, retina display support, etc...<br/>
     *  - Manage the scale and translation of canvas related to the frame on Web<br/>
     * <br/>
     * With {{view}} as its singleton initialized by the engine, you don't need to call any constructor or create functions,<br/>
     * the standard way to use it is by calling:<br/>
     *  - view.methodName(); <br/>
     * @zh View 代表游戏窗口视图，它的核心功能包括：
     *  - 对所有 UI Canvas 进行设计分辨率适配。
     *  - 提供窗口视图的交互，比如监听 resize 事件，控制 retina 屏幕适配，等等。
     *  - 控制 Canvas 节点相对于外层 DOM 节点的缩放和偏移。
     * 引擎会自动初始化它的单例对象 {{view}}，所以你不需要实例化任何 View，只需要直接使用 `view.methodName();`
     */
    export class View extends EventTarget {
        static instance: View;
        _resizeWithBrowserSize: boolean;
        _designResolutionSize: math.Size;
        _originalDesignResolutionSize: math.Size;
        constructor();
        init(): void;
        /**
         * @en
         * Sets whether resize canvas automatically when browser's size changed.<br/>
         * Useful only on web.
         * @zh 设置当发现浏览器的尺寸改变时，是否自动调整 canvas 尺寸大小。
         * 仅在 Web 模式下有效。
         * @param enabled - Whether enable automatic resize with browser's resize event
         */
        resizeWithBrowserSize(enabled: boolean): void;
        /**
         * @en
         * Sets the callback function for cc.view's resize action,<br/>
         * this callback will be invoked before applying resolution policy, <br/>
         * so you can do any additional modifications within the callback.<br/>
         * Useful only on web.
         * @zh 设置 cc.view 调整视窗尺寸行为的回调函数，
         * 这个回调函数会在应用适配模式之前被调用，
         * 因此你可以在这个回调函数内添加任意附加改变，
         * 仅在 Web 平台下有效。
         * @param callback - The callback function
         */
        setResizeCallback(callback: Function | null): void;
        /**
         * @en
         * Sets the orientation of the game, it can be landscape, portrait or auto.
         * When set it to landscape or portrait, and screen w/h ratio doesn't fit,
         * cc.view will automatically rotate the game canvas using CSS.
         * Note that this function doesn't have any effect in native,
         * in native, you need to set the application orientation in native project settings
         * @zh 设置游戏屏幕朝向，它能够是横版，竖版或自动。
         * 当设置为横版或竖版，并且屏幕的宽高比例不匹配时，
         * cc.view 会自动用 CSS 旋转游戏场景的 canvas，
         * 这个方法不会对 native 部分产生任何影响，对于 native 而言，你需要在应用设置中的设置排版。
         * @param orientation - Possible values: macro.ORIENTATION_LANDSCAPE | macro.ORIENTATION_PORTRAIT | macro.ORIENTATION_AUTO
         */
        setOrientation(orientation: number): void;
        /**
         * @en
         * Sets whether the engine modify the "viewport" meta in your web page.<br/>
         * It's enabled by default, we strongly suggest you not to disable it.<br/>
         * And even when it's enabled, you can still set your own "viewport" meta, it won't be overridden<br/>
         * Only useful on web
         * @zh 设置引擎是否调整 viewport meta 来配合屏幕适配。
         * 默认设置为启动，我们强烈建议你不要将它设置为关闭。
         * 即使当它启动时，你仍然能够设置你的 viewport meta，它不会被覆盖。
         * 仅在 Web 模式下有效
         * @param enabled - Enable automatic modification to "viewport" meta
         */
        adjustViewportMeta(enabled: boolean): void;
        /**
         * @en
         * Retina support is enabled by default for Apple device but disabled for other devices,<br/>
         * it takes effect only when you called setDesignResolutionPolicy<br/>
         * Only useful on web
         * @zh 对于 Apple 这种支持 Retina 显示的设备上默认进行优化而其他类型设备默认不进行优化，
         * 它仅会在你调用 setDesignResolutionPolicy 方法时有影响。
         * 仅在 Web 模式下有效。
         * @param enabled - Enable or disable retina display
         */
        enableRetina(enabled: boolean): void;
        /**
         * @en
         * Check whether retina display is enabled.<br/>
         * Only useful on web
         * @zh 检查是否对 Retina 显示设备进行优化。
         * 仅在 Web 模式下有效。
         */
        isRetinaEnabled(): boolean;
        /**
         * @en Whether to Enable on anti-alias
         * @zh 控制抗锯齿是否开启
         * @param enabled - Enable or not anti-alias
         */
        enableAntiAlias(enabled: boolean): void;
        /**
         * @en Returns whether the current enable on anti-alias
         * @zh 返回当前是否抗锯齿
         */
        isAntiAliasEnabled(): boolean;
        /**
         * @en
         * If enabled, the application will try automatically to enter full screen mode on mobile devices<br/>
         * You can pass true as parameter to enable it and disable it by passing false.<br/>
         * Only useful on web
         * @zh 启动时，移动端游戏会在移动端自动尝试进入全屏模式。
         * 你能够传入 true 为参数去启动它，用 false 参数来关闭它。
         * @param enabled - Enable or disable auto full screen on mobile devices
         */
        enableAutoFullScreen(enabled: boolean): void;
        /**
         * @en
         * Check whether auto full screen is enabled.<br/>
         * Only useful on web
         * @zh 检查自动进入全屏模式是否启动。
         * 仅在 Web 模式下有效。
         * @return Auto full screen enabled or not
         */
        isAutoFullScreenEnabled(): boolean;
        setCanvasSize(width: number, height: number): void;
        /**
         * @en
         * Returns the canvas size of the view.<br/>
         * On native platforms, it returns the screen size since the view is a fullscreen view.<br/>
         * On web, it returns the size of the canvas element.
         * @zh 返回视图中 canvas 的尺寸。
         * 在 native 平台下，它返回全屏视图下屏幕的尺寸。
         * 在 Web 平台下，它返回 canvas 元素尺寸。
         */
        getCanvasSize(): math.Size;
        /**
         * @en
         * Returns the frame size of the view.<br/>
         * On native platforms, it returns the screen size since the view is a fullscreen view.<br/>
         * On web, it returns the size of the canvas's outer DOM element.
         * @zh 返回视图中边框尺寸。
         * 在 native 平台下，它返回全屏视图下屏幕的尺寸。
         * 在 web 平台下，它返回 canvas 元素的外层 DOM 元素尺寸。
         */
        getFrameSize(): math.Size;
        /**
         * @en On native, it sets the frame size of view.<br/>
         * On web, it sets the size of the canvas's outer DOM element.
         * @zh 在 native 平台下，设置视图框架尺寸。
         * 在 web 平台下，设置 canvas 外层 DOM 元素尺寸。
         * @param {Number} width
         * @param {Number} height
         */
        setFrameSize(width: number, height: number): void;
        /**
         * @en Returns the visible area size of the view port.
         * @zh 返回视图窗口可见区域尺寸。
         */
        getVisibleSize(): math.Size;
        /**
         * @en Returns the visible area size of the view port.
         * @zh 返回视图窗口可见区域像素尺寸。
         */
        getVisibleSizeInPixel(): math.Size;
        /**
         * @en Returns the visible origin of the view port.
         * @zh 返回视图窗口可见区域原点。
         */
        getVisibleOrigin(): math.Vec2;
        /**
         * @en Returns the visible origin of the view port.
         * @zh 返回视图窗口可见区域像素原点。
         */
        getVisibleOriginInPixel(): math.Vec2;
        /**
         * @en Returns the current resolution policy
         * @zh 返回当前分辨率方案
         * @see {{ResolutionPolicy}}
         */
        getResolutionPolicy(): ResolutionPolicy;
        /**
         * @en Sets the current resolution policy
         * @zh 设置当前分辨率模式
         * @see {{ResolutionPolicy}}
         */
        setResolutionPolicy(resolutionPolicy: ResolutionPolicy | number): void;
        /**
         * @en Sets the resolution policy with designed view size in points.<br/>
         * The resolution policy include: <br/>
         * [1] ResolutionExactFit       Fill screen by stretch-to-fit: if the design resolution ratio of width to height is different from the screen resolution ratio, your game view will be stretched.<br/>
         * [2] ResolutionNoBorder       Full screen without black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two areas of your game view will be cut.<br/>
         * [3] ResolutionShowAll        Full screen with black border: if the design resolution ratio of width to height is different from the screen resolution ratio, two black borders will be shown.<br/>
         * [4] ResolutionFixedHeight    Scale the content's height to screen's height and proportionally scale its width<br/>
         * [5] ResolutionFixedWidth     Scale the content's width to screen's width and proportionally scale its height<br/>
         * [ResolutionPolicy]        [Web only feature] Custom resolution policy, constructed by ResolutionPolicy<br/>
         * @zh 通过设置设计分辨率和匹配模式来进行游戏画面的屏幕适配。
         * @param width Design resolution width.
         * @param height Design resolution height.
         * @param resolutionPolicy The resolution policy desired
         */
        setDesignResolutionSize(width: number, height: number, resolutionPolicy: ResolutionPolicy | number): void;
        /**
         * @en Returns the designed size for the view.
         * Default resolution size is the same as 'getFrameSize'.
         * @zh 返回视图的设计分辨率。
         * 默认下分辨率尺寸同 `getFrameSize` 方法相同
         */
        getDesignResolutionSize(): math.Size;
        /**
         * @en Sets the container to desired pixel resolution and fit the game content to it.
         * This function is very useful for adaptation in mobile browsers.
         * In some HD android devices, the resolution is very high, but its browser performance may not be very good.
         * In this case, enabling retina display is very costy and not suggested, and if retina is disabled, the image may be blurry.
         * But this API can be helpful to set a desired pixel resolution which is in between.
         * This API will do the following:
         *     1. Set viewport's width to the desired width in pixel
         *     2. Set body width to the exact pixel resolution
         *     3. The resolution policy will be reset with designed view size in points.
         * @zh 设置容器（container）需要的像素分辨率并且适配相应分辨率的游戏内容。
         * @param width Design resolution width.
         * @param height Design resolution height.
         * @param resolutionPolicy The resolution policy desired
         */
        setRealPixelResolution(width: number, height: number, resolutionPolicy: ResolutionPolicy | number): void;
        /**
         * @en Returns the view port rectangle.
         * @zh 返回视窗剪裁区域。
         */
        getViewportRect(): math.Rect;
        /**
         * @en Returns scale factor of the horizontal direction (X axis).
         * @zh 返回横轴的缩放比，这个缩放比是将画布像素分辨率放到设计分辨率的比例。
         */
        getScaleX(): number;
        /**
         * @en Returns scale factor of the vertical direction (Y axis).
         * @zh 返回纵轴的缩放比，这个缩放比是将画布像素分辨率缩放到设计分辨率的比例。
         */
        getScaleY(): number;
        /**
         * @en Returns device pixel ratio for retina display.
         * @zh 返回设备或浏览器像素比例。
         */
        getDevicePixelRatio(): number;
        /**
         * @en Returns the real location in view for a translation based on a related position
         * @zh 将屏幕坐标转换为游戏视图下的坐标。
         * @param tx - The X axis translation
         * @param ty - The Y axis translation
         * @param relatedPos - The related position object including "left", "top", "width", "height" informations
         * @param out - The out object to save the conversion result
         */
        convertToLocationInView(tx: number, ty: number, relatedPos: any, out: math.Vec2): math.Vec2;
    }
    /**
     * !en
     * Emit when design resolution changed.
     * !zh
     * 当设计分辨率改变时发送。
     * @event design-resolution-changed
     */
    export interface AdaptResult {
        scale: number[];
        viewport?: null | math.Rect;
    }
    /**
     * ContainerStrategy class is the root strategy class of container's scale strategy,
     * it controls the behavior of how to scale the cc.game.container and cc.game.canvas object
     */
    export class ContainerStrategy {
        static EQUAL_TO_FRAME: any;
        static PROPORTION_TO_FRAME: any;
        name: string;
        /**
         * @en Manipulation before appling the strategy
         * @zh 在应用策略之前的操作
         * @param view - The target view
         */
        preApply(_view: View): void;
        /**
         * @en Function to apply this strategy
         * @zh 策略应用方法
         * @param view
         * @param designedResolution
         */
        apply(_view: View, designedResolution: math.Size): void;
        /**
         * @en
         * Manipulation after applying the strategy
         * @zh 策略调用之后的操作
         * @param view  The target view
         */
        postApply(_view: View): void;
        protected _setupContainer(_view: any, w: any, h: any): void;
        protected _fixContainer(): void;
    }
    /**
     * ContentStrategy class is the root strategy class of content's scale strategy,
     * it controls the behavior of how to scale the scene and setup the viewport for the game
     *
     * @class ContentStrategy
     */
    export class ContentStrategy {
        static EXACT_FIT: any;
        static SHOW_ALL: any;
        static NO_BORDER: any;
        static FIXED_HEIGHT: any;
        static FIXED_WIDTH: any;
        name: string;
        constructor();
        /**
         * @en Manipulation before applying the strategy
         * @zh 策略应用前的操作
         * @param view - The target view
         */
        preApply(_view: View): void;
        /**
         * @en Function to apply this strategy
         * The return value is {scale: [scaleX, scaleY], viewport: {new Rect}},
         * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
         * @zh 调用策略方法
         * @return The result scale and viewport rect
         */
        apply(_view: View, designedResolution: math.Size): AdaptResult;
        /**
         * @en Manipulation after applying the strategy
         * @zh 策略调用之后的操作
         * @param view - The target view
         */
        postApply(_view: View): void;
        _buildResult(containerW: any, containerH: any, contentW: any, contentH: any, scaleX: any, scaleY: any): AdaptResult;
    }
    /**
     * ResolutionPolicy class is the root strategy class of scale strategy,
     * its main task is to maintain the compatibility with Cocos2d-x</p>
     */
    export class ResolutionPolicy {
        /**
         * The entire application is visible in the specified area without trying to preserve the original aspect ratio.<br/>
         * Distortion can occur, and the application may appear stretched or compressed.
         */
        static EXACT_FIT: number;
        /**
         * The entire application fills the specified area, without distortion but possibly with some cropping,<br/>
         * while maintaining the original aspect ratio of the application.
         */
        static NO_BORDER: number;
        /**
         * The entire application is visible in the specified area without distortion while maintaining the original<br/>
         * aspect ratio of the application. Borders can appear on two sides of the application.
         */
        static SHOW_ALL: number;
        /**
         * The application takes the height of the design resolution size and modifies the width of the internal<br/>
         * canvas so that it fits the aspect ratio of the device<br/>
         * no distortion will occur however you must make sure your application works on different<br/>
         * aspect ratios
         */
        static FIXED_HEIGHT: number;
        /**
         * The application takes the width of the design resolution size and modifies the height of the internal<br/>
         * canvas so that it fits the aspect ratio of the device<br/>
         * no distortion will occur however you must make sure your application works on different<br/>
         * aspect ratios
         */
        static FIXED_WIDTH: number;
        /**
         * Unknown policy
         */
        static UNKNOWN: number;
        static ContainerStrategy: typeof ContainerStrategy;
        static ContentStrategy: typeof ContentStrategy;
        name: string;
        /**
         * Constructor of ResolutionPolicy
         * @param containerStg
         * @param contentStg
         */
        constructor(containerStg: ContainerStrategy, contentStg: ContentStrategy);
        get canvasSize(): any;
        /**
         * @en Manipulation before applying the resolution policy
         * @zh 策略应用前的操作
         * @param _view The target view
         */
        preApply(_view: View): void;
        /**
         * @en Function to apply this resolution policy
         * The return value is {scale: [scaleX, scaleY], viewport: {new Rect}},
         * The target view can then apply these value to itself, it's preferred not to modify directly its private variables
         * @zh 调用策略方法
         * @param _view - The target view
         * @param designedResolution - The user defined design resolution
         * @return An object contains the scale X/Y values and the viewport rect
         */
        apply(_view: View, designedResolution: math.Size): AdaptResult;
        /**
         * @en Manipulation after appyling the strategy
         * @zh 策略应用之后的操作
         * @param _view - The target view
         */
        postApply(_view: View): void;
        /**
         * @en Setup the container's scale strategy
         * @zh 设置容器的适配策略
         * @param containerStg The container strategy
         */
        setContainerStrategy(containerStg: ContainerStrategy): void;
        /**
         * @en Setup the content's scale strategy
         * @zh 设置内容的适配策略
         * @param contentStg The content strategy
         */
        setContentStrategy(contentStg: ContentStrategy): void;
    }
    /**
     * @en view is the singleton view object.
     * @zh view 是全局的视图单例对象。
     */
    export const view: View;
    /**
     * @en
     * This class has been deprecated, please use cc.systemEvent or cc.EventTarget instead.
     * See [Listen to and launch events](../../../manual/en/scripting/events.md) for details.<br>
     * <br>
     * cc.eventManager is a singleton object which manages event listener subscriptions and event dispatching.
     * The EventListener list is managed in such way so that event listeners can be added and removed
     * while events are being dispatched.
     *
     * @zh
     * 该类已废弃，请使用 cc.systemEvent 或 cc.EventTarget 代替，详见 [监听和发射事件](../../../manual/zh/scripting/events.md)。<br>
     * <br>
     * 事件管理器，它主要管理事件监听器注册和派发系统事件。
     *
     * @class eventManager
     * @static
     * @example {@link cocos/core/event-manager/CCEventManager/addListener.js}
     * @deprecated
     */
    export const eventManager: __private.cocos_core_platform_event_manager_event_manager_EventManager;
    /**
     * @en
     * The System event, it currently supports keyboard events and accelerometer events.<br/>
     * You can get the SystemEvent instance with cc.systemEvent.<br/>
     * @zh
     * 系统事件，它目前支持按键事件和重力感应事件。<br/>
     * 你可以通过 cc.systemEvent 获取到 SystemEvent 的实例。<br/>
     * @example
     * ```
     * cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
     * cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
     * ```
     */
    export class SystemEvent extends EventTarget {
        static EventType: typeof SystemEventType;
        constructor();
        /**
         * @en
         * Sets whether to enable the accelerometer event listener or not.
         *
         * @zh
         * 是否启用加速度计事件。
         */
        setAccelerometerEnabled(isEnabled: boolean): void;
        /**
         * @en
         * Sets the accelerometer interval value.
         *
         * @zh
         * 设置加速度计间隔值。
         */
        setAccelerometerInterval(interval: number): void;
        on(type: SystemEventType.KEY_DOWN | SystemEventType.KEY_UP, callback: (event?: EventKeyboard) => void, target?: Object): any;
        on(type: SystemEventType.MOUSE_DOWN | SystemEventType.MOUSE_ENTER | SystemEventType.MOUSE_LEAVE | SystemEventType.MOUSE_MOVE | SystemEventType.MOUSE_UP | SystemEventType.MOUSE_WHEEL, callback: (event?: EventMouse) => void, target?: Object): any;
        on(type: SystemEventType.TOUCH_START | SystemEventType.TOUCH_MOVE | SystemEventType.TOUCH_END | SystemEventType.TOUCH_CANCEL, callback: (touch?: Touch, event?: EventTouch) => void, target?: Object): any;
        on(type: SystemEventType.DEVICEMOTION, callback: (event?: EventAcceleration) => void, target?: Object): any;
        /**
         * @en
         * Removes the listeners previously registered with the same type, callback, target and or useCapture,
         * if only type is passed as parameter, all listeners registered with that type will be removed.
         * @zh
         * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
         *
         * @param type - A string representing the event type being removed.
         * @param callback - The callback to remove.
         * @param target - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
         */
        off(type: string, callback?: Function, target?: Object): void;
    }
    /**
     * @module cc
     */
    /**
     * @en The singleton of the SystemEvent, there should only be one instance to be used globally
     * @zh 系统事件单例，方便全局使用。
     */
    export const systemEvent: SystemEvent;
    /**
     * @en The mouse event
     * @zh 鼠标事件类型
     */
    export class EventMouse extends Event {
        /**
         * @en The none event code of mouse event.
         * @zh 无效事件代码
         */
        static NONE: number;
        /**
         * @en The event code of mouse down event.
         * @zh 鼠标按下事件代码。
         */
        static DOWN: number;
        /**
         * @en The event code of mouse up event.
         * @zh 鼠标按下后释放事件代码。
         */
        static UP: number;
        /**
         * @en The event code of mouse move event.
         * @zh 鼠标移动事件。
         */
        static MOVE: number;
        /**
         * @en The event code of mouse scroll event.
         * @zh 鼠标滚轮事件。
         */
        static SCROLL: number;
        /**
         * @en The default tag when no button is pressed
         * @zh 按键默认的缺省状态
         */
        static BUTTON_MISSING: number;
        /**
         * @en The tag of mouse's left button.
         * @zh 鼠标左键的标签。
         */
        static BUTTON_LEFT: number;
        /**
         * @en The tag of mouse's right button  (The right button number is 2 on browser).
         * @zh 鼠标右键的标签。
         */
        static BUTTON_RIGHT: number;
        /**
         * @en The tag of mouse's middle button.
         * @zh 鼠标中键的标签。
         */
        static BUTTON_MIDDLE: number;
        /**
         * @en The tag of mouse's button 4.
         * @zh 鼠标按键 4 的标签。
         */
        static BUTTON_4: number;
        /**
         * @en The tag of mouse's button 5.
         * @zh 鼠标按键 5 的标签。
         */
        static BUTTON_5: number;
        /**
         * @en The tag of mouse's button 6.
         * @zh 鼠标按键 6 的标签。
         */
        static BUTTON_6: number;
        /**
         * @en The tag of mouse's button 7.
         * @zh 鼠标按键 7 的标签。
         */
        static BUTTON_7: number;
        /**
         * @en The tag of mouse's button 8.
         * @zh 鼠标按键 8 的标签。
         */
        static BUTTON_8: number;
        /**
         * @en Mouse movement on x axis of the UI coordinate system.
         * @zh 鼠标在 UI 坐标系下 X 轴上的移动距离
         */
        movementX: number;
        /**
         * @en Mouse movement on y axis of the UI coordinate system.
         * @zh 鼠标在 UI 坐标系下 Y 轴上的移动距离
         */
        movementY: number;
        /**
         * @en The type of the event, possible values are UP, DOWN, MOVE, SCROLL
         * @zh 鼠标事件类型，可以是 UP, DOWN, MOVE, CANCELED。
         */
        eventType: number;
        /**
         * @param eventType - The type of the event, possible values are UP, DOWN, MOVE, SCROLL
         * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
         */
        constructor(eventType: number, bubbles?: boolean, prevLoc?: math.Vec2);
        /**
         * @en Sets scroll data of the mouse.
         * @zh 设置鼠标滚轮的滚动数据。
         * @param scrollX - The scroll value on x axis
         * @param scrollY - The scroll value on y axis
         */
        setScrollData(scrollX: number, scrollY: number): void;
        /**
         * @en Returns the scroll value on x axis.
         * @zh 获取鼠标滚动的 X 轴距离，只有滚动时才有效。
         */
        getScrollX(): number;
        /**
         * @en Returns the scroll value on y axis.
         * @zh 获取滚轮滚动的 Y 轴距离，只有滚动时才有效。
         */
        getScrollY(): number;
        /**
         * @en Sets cursor location.
         * @zh 设置当前鼠标位置。
         * @param x - The location on x axis
         * @param y - The location on y axis
         */
        setLocation(x: number, y: number): void;
        /**
         * @en Returns cursor location.
         * @zh 获取鼠标相对于左下角位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the current cursor location in game view coordinates.
         * @zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getLocationInView(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the current cursor location in ui coordinates.
         * @zh 获取当前事件在 UI 窗口内的坐标位置，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUILocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the previous touch location.
         * @zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getPreviousLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the previous touch location.
         * @zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUIPreviousLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the delta distance from the previous location to current location.
         * @zh 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getDelta(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the X axis delta distance from the previous location to current location.
         * @zh 获取鼠标距离上一次事件移动的 X 轴距离。
         */
        getDeltaX(): number;
        /**
         * @en Returns the Y axis delta distance from the previous location to current location.
         * @zh 获取鼠标距离上一次事件移动的 Y 轴距离。
         */
        getDeltaY(): number;
        /**
         * @en Returns the delta distance from the previous location to current location in the UI coordinates.
         * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUIDelta(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the X axis delta distance from the previous location to current location in the UI coordinates.
         * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的 X 轴距离。
         */
        getUIDeltaX(): number;
        /**
         * @en Returns the Y axis delta distance from the previous location to current location in the UI coordinates.
         * @zh 获取鼠标距离上一次事件移动在 UI 坐标系下的 Y 轴距离。
         */
        getUIDeltaY(): number;
        /**
         * @en Sets mouse button code.
         * @zh 设置鼠标按键。
         * @param button - The button code
         */
        setButton(button: number): void;
        /**
         * @en Returns mouse button code.
         * @zh 获取鼠标按键。
         */
        getButton(): number;
        /**
         * @en Returns location data on X axis.
         * @zh 获取鼠标当前 X 轴位置。
         */
        getLocationX(): number;
        /**
         * @en Returns location data on Y axis.
         * @zh 获取鼠标当前 Y 轴位置。
         */
        getLocationY(): number;
        /**
         * @en Returns location data on X axis.
         * @zh 获取鼠标当前 X 轴位置。
         */
        getUILocationX(): number;
        /**
         * @en Returns location data on Y axis.
         * @zh 获取鼠标当前 Y 轴位置。
         */
        getUILocationY(): number;
    }
    /**
     * @en
     * The touch event.
     *
     * @zh
     * 触摸事件。
     */
    export class EventTouch extends Event {
        /**
         * @en The maximum touch point numbers simultaneously
         * @zh 同时存在的最大触点数量。
         */
        static MAX_TOUCHES: number;
        /**
         * @en The event type code of touch began event.
         * @zh 开始触摸事件。
         */
        static BEGAN: number;
        /**
         * @en The event type code of touch moved event.
         * @zh 触摸后移动事件。
         */
        static MOVED: number;
        /**
         * @en The event type code of touch ended event.
         * @zh 结束触摸事件。
         */
        static ENDED: number;
        /**
         * @en The event type code of touch canceled event.
         * @zh 取消触摸事件。
         */
        static CANCELLED: number;
        /**
         * @en The current touch object
         * @zh 当前触点对象
         */
        touch: Touch | null;
        /**
         * @en Indicate whether the touch event is simulated or real
         * @zh 表示触摸事件是真实触点触发的还是模拟的
         */
        simulate: boolean;
        /**
         * @param touches - An array of current touches
         * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
         * @param eventCode - The type code of the touch event
         */
        constructor(touches?: Touch[], bubbles?: boolean, eventCode?: number);
        /**
         * @en Returns event type code.
         * @zh 获取触摸事件类型。
         */
        getEventCode(): number;
        /**
         * @en Returns touches of event.
         * @zh 获取触摸点的列表。
         */
        getTouches(): Touch[];
        /**
         * @en Sets touch location.
         * @zh 设置当前触点位置
         * @param x - The current touch location on the x axis
         * @param y - The current touch location on the y axis
         */
        setLocation(x: number, y: number): void;
        /**
         * @en Returns the current touch location.
         * @zh 获取触点位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the current touch location in UI coordinates.
         * @zh 获取 UI 坐标系下的触点位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUILocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the current touch location in game screen coordinates.
         * @zh 获取当前触点在游戏窗口中的位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getLocationInView(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the previous touch location.
         * @zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getPreviousLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the start touch location.
         * @zh 获获取触点落下时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getStartLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the start touch location in UI coordinates.
         * @zh 获获取触点落下时的 UI 世界下位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUIStartLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the id of the current touch point.
         * @zh 获取触点的标识 ID，可以用来在多点触摸中跟踪触点。
         */
        getID(): number | null;
        /**
         * @en Returns the delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getDelta(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件 UI 世界下移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUIDelta(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the X axis delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的 x 轴距离。
         */
        getDeltaX(): number;
        /**
         * @en Returns the Y axis delta distance from the previous location to current location.
         * @zh 获取触点距离上一次事件移动的 y 轴距离。
         */
        getDeltaY(): number;
        /**
         * @en Returns location X axis data.
         * @zh 获取当前触点 X 轴位置。
         */
        getLocationX(): number;
        /**
         * @en Returns location Y axis data.
         * @zh 获取当前触点 Y 轴位置。
         */
        getLocationY(): number;
    }
    /**
     * @en
     * The acceleration event.
     * @zh
     * 加速计事件。
     */
    export class EventAcceleration extends Event {
        /**
         * @en The acceleration object
         * @zh 加速度对象
         */
        acc: Object;
        /**
         * @param acc - The acceleration
         * @param bubbles - Indicate whether the event bubbles up through the hierarchy or not.
         */
        constructor(acc: Object, bubbles?: boolean);
    }
    /**
     * @en
     * The keyboard event.
     * @zh
     * 键盘事件。
     */
    export class EventKeyboard extends Event {
        /**
         * @en The keyCode read-only property represents a system and implementation dependent numerical code
         * identifying the unmodified value of the pressed key.
         * This is usually the decimal ASCII (RFC 20) or Windows 1252 code corresponding to the key.
         * If the key can't be identified, this value is 0.
         * @zh keyCode 是只读属性它表示一个系统和依赖于实现的数字代码，可以识别按键的未修改值。
         * 这通常是十进制 ASCII (RFC20) 或者 Windows 1252 代码，所对应的密钥。
         * 如果无法识别该键，则该值为 0。
         */
        keyCode: number;
        /**
         * @en Raw DOM KeyboardEvent.
         * @zh 原始 DOM KeyboardEvent 事件对象
         */
        rawEvent?: KeyboardEvent;
        /**
         * @en Indicates whether the current key is being pressed
         * @zh 表示当前按键是否正在被按下
         */
        isPressed: boolean;
        /**
         * @param keyCode - The key code of the current key or the DOM KeyboardEvent
         * @param isPressed - Indicates whether the current key is being pressed
         * @param bubbles - Indicates whether the event bubbles up through the hierarchy or not.
         */
        constructor(keyCode: number | KeyboardEvent, isPressed: boolean, bubbles?: boolean);
    }
    /**
     * @en The touch point class
     * @zh 封装了触点相关的信息。
     */
    export class Touch {
        get lastModified(): number;
        /**
         * @param x - x position of the touch point
         * @param y - y position of the touch point
         * @param id - The id of the touch point
         */
        constructor(x: number, y: number, id?: number);
        /**
         * @en Returns the current touch location in OpenGL coordinates.、
         * @zh 获取当前触点位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns X axis location value.
         * @zh 获取当前触点 X 轴位置。
         */
        getLocationX(): number;
        /**
         * @en Returns Y axis location value.
         * @zh 获取当前触点 Y 轴位置。
         */
        getLocationY(): number;
        /**
         * @en Returns the current touch location in UI coordinates.、
         * @zh 获取当前触点在 UI 坐标系中的位置。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUILocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns X axis location value in UI coordinates.
         * @zh 获取当前触点在 UI 坐标系中 X 轴位置。
         */
        getUILocationX(): number;
        /**
         * @en Returns Y axis location value in UI coordinates.
         * @zh 获取当前触点在 UI 坐标系中 Y 轴位置。
         */
        getUILocationY(): number;
        /**
         * @en Returns the previous touch location.
         * @zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getPreviousLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the previous touch location in UI coordinates.
         * @zh 获取触点在上一次事件时在 UI 坐标系中的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUIPreviousLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the start touch location.
         * @zh 获获取触点落下时的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getStartLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the start touch location in UI coordinates.
         * @zh 获获取触点落下时在 UI 坐标系中的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUIStartLocation(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the delta distance from the previous touche to the current one.
         * @zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getDelta(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the delta distance from the previous touche to the current one in UI coordinates.
         * @zh 获取触点距离上一次事件移动在 UI 坐标系中的距离对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getUIDelta(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the current touch location in screen coordinates.
         * @zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getLocationInView(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the previous touch location in screen coordinates.
         * @zh 获取触点在上一次事件时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getPreviousLocationInView(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the start touch location in screen coordinates.
         * @zh 获取触点落下时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
         * @param out - Pass the out object to avoid object creation, very good practice
         */
        getStartLocationInView(out?: math.Vec2): math.Vec2;
        /**
         * @en Returns the id of the touch point.
         * @zh 触点的标识 ID，可以用来在多点触摸中跟踪触点。
         */
        getID(): number;
        /**
         * @en Resets touch point information.
         * @zh 重置触点相关的信息。
         * @param id - The id of the touch point
         * @param x - x position of the touch point
         * @param y - y position of the touch point
         */
        setTouchInfo(id?: number, x?: number, y?: number): void;
        /**
         * @en Sets touch point location.
         * @zh 设置触点位置。
         * @param point - The location
         */
        setPoint(point: math.Vec2): void;
        /**
         * @en Sets touch point location.
         * @zh 设置触点位置。
         * @param x - x position
         * @param y - y position
         */
        setPoint(x: number, y: number): void;
        /**
         * @en Sets the location previously registered for the current touch.
         * @zh 设置触点在前一次触发时收集的位置。
         * @param point - The location
         */
        setPrevPoint(point: math.Vec2): void;
        /**
         * @en Sets the location previously registered for the current touch.
         * @zh 设置触点在前一次触发时收集的位置。
         * @param x - x position
         * @param y - y position
         */
        setPrevPoint(x: number, y: number): void;
    }
    /**
     * @en The event type supported by SystemEvent and Node events
     * @zh SystemEvent 支持的事件类型以及节点事件类型
     */
    export enum SystemEventType {
        TOUCH_START = "touch-start",
        TOUCH_MOVE = "touch-move",
        TOUCH_END = "touch-end",
        TOUCH_CANCEL = "touch-cancel",
        MOUSE_DOWN = "mouse-down",
        MOUSE_MOVE = "mouse-move",
        MOUSE_UP = "mouse-up",
        MOUSE_WHEEL = "mouse-wheel",
        MOUSE_ENTER = "mouse-enter",
        MOUSE_LEAVE = "mouse-leave",
        KEY_DOWN = "keydown",
        KEY_UP = "keyup",
        DEVICEMOTION = "devicemotion",
        TRANSFORM_CHANGED = "transform-changed",
        SCENE_CHANGED_FOR_PERSISTS = "scene-changed-for-persists",
        SIZE_CHANGED = "size-changed",
        ANCHOR_CHANGED = "anchor-changed",
        CHILD_ADDED = "child-added",
        CHILD_REMOVED = "child-removed",
        PARENT_CHANGED = "parent-changed",
        NODE_DESTROYED = "node-destroyed"
    }
    /**
     * @zh
     * AssetLibrary 配置。
     * @en
     * AssetLibrary configuration.
     */
    export interface IAssetOptions {
        /**
         * @zh
         * 导入 Library 的资源根目录（相对于构建目录）
         * @en
         * The root path (relative to the build destination folder) of the imported library assets
         */
        libraryPath: string;
        /**
         * @zh
         * RawAssets 类资源的根目录前缀（相对于构建目录），
         * 这个路径尾部和 "assets" 拼接后就是完整路径
         * @en
         * The prefix of the root path (relative to the build destination folder) of the raw assets,
         * This will be joint with "assets" to form the complete path
         */
        rawAssetsBase: string;
        /**
         * @zh
         * RawAssets 列表，从 Settings 中获取
         * @en
         * The list of raw assets, normally retrieved from Settings
         */
        rawAssets: object;
        /**
         * @zh
         * 合并后的资源合集列表
         * @en
         * The list of asset packs
         */
        packedAssets?: object;
        /**
         * @zh
         * 资源及其 md5 前缀关系
         * @en
         * The map of assets and their md5 prefix
         */
        md5AssetsMap?: object;
        /**
         * @zh
         * 子包列表
         * @en
         * The list of sub packages
         */
        subPackages?: [];
    }
    export interface ISceneInfo {
        url: string;
        uuid: string;
    }
    /**
     * @zh
     * 游戏配置。
     * @en
     * Game configuration.
     */
    export interface IGameConfig {
        /**
         * @zh
         * 设置 debug 模式，在浏览器中这个选项会被忽略。
         * 各种设置选项的意义：
         *  - 0 - 没有消息被打印出来。
         *  - 1 - cc.error，cc.assert，cc.warn，cc.log 将打印在 console 中。
         *  - 2 - cc.error，cc.assert，cc.warn 将打印在 console 中。
         *  - 3 - cc.error，cc.assert 将打印在 console 中。
         *  - 4 - cc.error，cc.assert，cc.warn，cc.log 将打印在 canvas 中（仅适用于 web 端）。
         *  - 5 - cc.error，cc.assert，cc.warn 将打印在 canvas 中（仅适用于 web 端）。
         *  - 6 - cc.error，cc.assert 将打印在 canvas 中（仅适用于 web 端）。
         * @en
         * Set debug mode, only valid in non-browser environment.
         * Possible values:
         * 0 - No message will be printed.
         * 1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
         * 2 - cc.error, cc.assert, cc.warn will print in console.
         * 3 - cc.error, cc.assert will print in console.
         * 4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
         * 5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
         * 6 - cc.error, cc.assert will print on canvas, available only on web.
         */
        debugMode?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        /**
         * @zh
         * 当 showFPS 为 true 的时候界面的左下角将显示 fps 的信息，否则被隐藏。
         * @en
         * Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.
         */
        showFPS?: boolean;
        /**
         * @zh
         * 暴露类名让 Chrome DevTools 可以识别，如果开启会稍稍降低类的创建过程的性能，但对对象构造没有影响。
         * @en
         * Expose class name to chrome debug tools, the class intantiate performance is a little bit slower when exposed.
         */
        exposeClassName?: boolean;
        /**
         * @zh
         * 设置想要的帧率你的游戏，但真正的FPS取决于你的游戏实现和运行环境。
         * @en
         * Set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.
         */
        frameRate?: number;
        /**
         * @zh
         * Web 页面上的 Canvas Element ID，仅适用于 web 端。
         * @en
         * Sets the id of your canvas element on the web page, it's useful only on web.
         */
        id?: string | HTMLElement;
        /**
         * @zh
         * 渲染模式。
         * 设置渲染器类型，仅适用于 web 端：
         * - 0 - 通过引擎自动选择。
         * - 1 - 强制使用 canvas 渲染。
         * - 2 - 强制使用 WebGL 渲染，但是在部分 Android 浏览器中这个选项会被忽略。
         * @en
         * Sets the renderer type, only useful on web:
         * - 0 - Automatically chosen by engine.
         * - 1 - Forced to use canvas renderer.
         * - 2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers.
         */
        renderMode?: 0 | 1 | 2;
        /**
         * @zh
         * 当前包中可用场景。
         * @en
         * Include available scenes in the current bundle.
         */
        scenes?: ISceneInfo[];
        /**
         * For internal use.
         */
        registerSystemEvent?: boolean;
        /**
         * For internal use.
         */
        collisionMatrix?: never[];
        /**
         * For internal use.
         */
        groupList?: any[];
        /**
         * For internal use.
         */
        jsList?: string[];
        /**
         * Render pipeline resources
         */
        renderPipeline?: string;
        /**
         * Asset library initialization options
         */
        assetOptions?: IAssetOptions;
        /**
         * GPU instancing options
         */
        customJointTextureLayouts?: renderer.ICustomJointTextureLayout[];
    }
    /**
     * @en An object to boot the game.
     * @zh 包含游戏主体信息并负责驱动游戏的游戏对象。
     * @class game
     * @static
     */
    export class Game extends EventTarget {
        /**
         * @en Event triggered when game hide to background.<br>
         * Please note that this event is not 100% guaranteed to be fired on Web platform,<br>
         * on native platforms, it corresponds to enter background event, os status bar or notification center may not trigger this event.
         * @zh 游戏进入后台时触发的事件。<br>
         * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为。<br>
         * 在原生平台，它对应的是应用被切换到后台事件，下拉菜单和上拉状态栏等不一定会触发这个事件，这取决于系统行为。
         * @property EVENT_HIDE
         * @example
         * ```typescript
         * cc.game.on(Game.EVENT_HIDE, function () {
         *     cc.audioEngine.pauseMusic();
         *     cc.audioEngine.pauseAllEffects();
         * });
         * ```
         */
        static EVENT_HIDE: string;
        /**
         * @en Event triggered when game back to foreground<br>
         * Please note that this event is not 100% guaranteed to be fired on Web platform,<br>
         * on native platforms, it corresponds to enter foreground event.
         * @zh 游戏进入前台运行时触发的事件。<br>
         * 请注意，在 WEB 平台，这个事件不一定会 100% 触发，这完全取决于浏览器的回调行为。<br>
         * 在原生平台，它对应的是应用被切换到前台事件。
         * @property EVENT_SHOW
         * @constant
         */
        static EVENT_SHOW: string;
        /**
         * @en Event triggered after game inited, at this point all engine objects and game scripts are loaded
         * @zh 游戏启动后的触发事件，此时加载所有的引擎对象和游戏脚本。
         * @property EVENT_GAME_INITED
         * @constant
         */
        static EVENT_GAME_INITED: string;
        /**
         * @en Event triggered after engine inited, at this point you will be able to use all engine classes.<br>
         * It was defined as EVENT_RENDERER_INITED in cocos creator v1.x and renamed in v2.0.
         * In cocos creator 3d, EVENT_RENDERER_INITED is a new event, look up define for details.
         * @zh 在引擎初始化之后触发的事件，此时您能够使用引擎所有的类。<br>
         * 它在 cocos creator v1.x 版本中名字为 EVENT_RENDERER_INITED ,在 v2.0 版本中更名为 EVENT_ENGINE_INITED
         * 并在 cocos creator 3d 版本中将 EVENT_RENDERER_INITED 用作为渲染器初始化的事件。
         * @property EVENT_ENGINE_INITED
         * @constant
         */
        static EVENT_ENGINE_INITED: string;
        /**
         * @en Event triggered after renderer inited, at this point you will be able to use all gfx renderer feature.<br>
         * @zh 在渲染器初始化之后触发的事件，此事件在 EVENT_ENGINE_INITED 之前触发，此时开始可使用 gfx 渲染框架。
         * @property EVENT_RENDERER_INITED
         * @readonly
         */
        static readonly EVENT_RENDERER_INITED: string;
        /**
         * @en Web Canvas 2d API as renderer backend.
         * @zh 使用 Web Canvas 2d API 作为渲染器后端。
         * @property RENDER_TYPE_CANVAS
         * @constant
         */
        static RENDER_TYPE_CANVAS: number;
        /**
         * @en WebGL API as renderer backend.
         * @zh 使用 WebGL API 作为渲染器后端。
         * @property RENDER_TYPE_WEBGL
         * @constant
         */
        static RENDER_TYPE_WEBGL: number;
        /**
         * @en OpenGL API as renderer backend.
         * @zh 使用 OpenGL API 作为渲染器后端。
         * @property RENDER_TYPE_OPENGL
         * @constant
         */
        static RENDER_TYPE_OPENGL: number;
        /**
         * @en The outer frame of the game canvas; parent of game container.
         * @zh 游戏画布的外框，container 的父容器。
         * @property frame
         */
        frame: Object | null;
        /**
         * @en The container of game canvas.
         * @zh 游戏画布的容器。
         * @property container
         */
        container: HTMLDivElement | null;
        /**
         * @en The canvas of the game.
         * @zh 游戏的画布。
         * @property canvas
         */
        canvas: HTMLCanvasElement | null;
        /**
         * @en The renderer backend of the game.
         * @zh 游戏的渲染器类型。
         * @property renderType
         */
        renderType: number;
        eventTargetOn: (type: string, callback: Function, target?: Object | undefined) => Function | undefined;
        eventTargetOnce: (type: string, callback: Function, target?: Object | undefined) => Function | undefined;
        /**
         * @en
         * The current game configuration,
         * please be noticed any modification directly on this object after the game initialization won't take effect.
         * @zh
         * 当前的游戏配置
         * 注意：请不要直接修改这个对象，它不会有任何效果。
         * @property config
         */
        config: IGameConfig;
        /**
         * @en Callback when the scripts of engine have been load.
         * @zh 当引擎完成启动后的回调函数。
         * @method onStart
         */
        onStart: Function | null;
        get inited(): boolean;
        _persistRootNodes: {};
        _paused: boolean;
        _configLoaded: boolean;
        _isCloning: boolean;
        _inited: boolean;
        _rendererInitialized: boolean;
        _gfxDevice: WebGL2GFXDevice | WebGLGFXDevice | null;
        _intervalId: number | null;
        _lastTime: Date | null;
        _frameTime: number | null;
        _sceneInfos: ISceneInfo[];
        collisionMatrix: never[];
        groupList: any[];
        /**
         * @en Set frame rate of game.
         * @zh 设置游戏帧率。
         * @param {Number} frameRate
         */
        setFrameRate(frameRate: number): void;
        /**
         * @en Get frame rate set for the game, it doesn't represent the real frame rate.
         * @zh 获取设置的游戏帧率（不等同于实际帧率）。
         * @return {Number} frame rate
         */
        getFrameRate(): number;
        /**
         * @en Run the game frame by frame.
         * @zh 执行一帧游戏循环。
         */
        step(): void;
        /**
         * @en Pause the game main loop. This will pause:<br>
         * game logic execution, rendering process, event manager, background music and all audio effects.<br>
         * This is different with cc.director.pause which only pause the game logic execution.<br>
         * @zh 暂停游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。这点和只暂停游戏逻辑的 cc.director.pause 不同。
         */
        pause(): void;
        /**
         * @en Resume the game from pause. This will resume:<br>
         * game logic execution, rendering process, event manager, background music and all audio effects.<br>
         * @zh 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效。
         */
        resume(): void;
        /**
         * @en Check whether the game is paused.
         * @zh 判断游戏是否暂停。
         * @return {Boolean}
         */
        isPaused(): boolean;
        /**
         * @en Restart game.
         * @zh 重新开始游戏
         */
        restart(): void;
        /**
         * @en End game, it will close the game window
         * @zh 退出游戏
         */
        end(): void;
        /**
         * @en
         * Register an callback of a specific event type on the game object.<br>
         * This type of event should be triggered via `emit`.<br>
         * @zh
         * 注册 game 的特定事件类型回调。这种类型的事件应该被 `emit` 触发。<br>
         *
         * @param {String} type - A string representing the event type to listen for.
         * @param {Function} callback - The callback that will be invoked when the event is dispatched.<br>
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param {any} [callback.arg1] arg1
         * @param {any} [callback.arg2] arg2
         * @param {any} [callback.arg3] arg3
         * @param {any} [callback.arg4] arg4
         * @param {any} [callback.arg5] arg5
         * @param {Object} [target] - The target (this object) to invoke the callback, can be null
         * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
         */
        on(type: string, callback: Function, target?: object): any;
        /**
         * @en
         * Register an callback of a specific event type on the game object,<br>
         * the callback will remove itself after the first time it is triggered.<br>
         * @zh
         * 注册 game 的特定事件类型回调，回调会在第一时间被触发后删除自身。
         *
         * @param {String} type - A string representing the event type to listen for.
         * @param {Function} callback - The callback that will be invoked when the event is dispatched.<br>
         *                              The callback is ignored if it is a duplicate (the callbacks are unique).
         * @param {any} [callback.arg1] arg1
         * @param {any} [callback.arg2] arg2
         * @param {any} [callback.arg3] arg3
         * @param {any} [callback.arg4] arg4
         * @param {any} [callback.arg5] arg5
         * @param {Object} [target] - The target (this object) to invoke the callback, can be null
         */
        once(type: string, callback: Function, target?: object): void;
        /**
         * @en Init game with configuration object.
         * @zh 使用指定的配置初始化引擎。
         * @param {Object} config - Pass configuration object
         */
        init(config: IGameConfig): boolean;
        /**
         * @en Run game with configuration object and onStart function.
         * @zh 运行游戏，并且指定引擎配置和 onStart 的回调。
         * @param {Function} onStart - function to be executed after game initialized
         */
        run(onStart: Function | null, legacyOnStart?: Function | null): void;
        /**
         * @en
         * Add a persistent root node to the game, the persistent node won't be destroyed during scene transition.<br>
         * The target node must be placed in the root level of hierarchy, otherwise this API won't have any effect.
         * @zh
         * 声明常驻根节点，该节点不会被在场景切换中被销毁。<br>
         * 目标节点必须位于为层级的根节点，否则无效。
         * @param {Node} node - The node to be made persistent
         */
        addPersistRootNode(node: {
            uuid: any;
            parent: any;
            _persistNode: boolean;
        }): void;
        /**
         * @en Remove a persistent root node.
         * @zh 取消常驻根节点。
         * @param {Node} node - The node to be removed from persistent node list
         */
        removePersistRootNode(node: {
            uuid: string;
            _persistNode: boolean;
        }): void;
        /**
         * @en Check whether the node is a persistent root node.
         * @zh 检查节点是否是常驻根节点。
         * @param {Node} node - The node to be checked
         * @return {Boolean}
         */
        isPersistRootNode(node: {
            _persistNode: any;
        }): any;
    }
    export const game: Game;
    export interface ISchedulable {
        id?: string;
        uuid?: string;
    }
    /**
     * @en
     * Scheduler is responsible of triggering the scheduled callbacks.<br>
     * You should not use NSTimer. Instead use this class.<br>
     * <br>
     * There are 2 different types of callbacks (selectors):<br>
     *     - update callback: the 'update' callback will be called every frame. You can customize the priority.<br>
     *     - custom callback: A custom callback will be called every frame, or with a custom interval of time<br>
     * <br>
     * The 'custom selectors' should be avoided when possible. It is faster,<br>
     * and consumes less memory to use the 'update callback'. *
     * @zh
     * Scheduler 是负责触发回调函数的类。<br>
     * 通常情况下，建议使用 cc.director.getScheduler() 来获取系统定时器。<br>
     * 有两种不同类型的定时器：<br>
     *     - update 定时器：每一帧都会触发。您可以自定义优先级。<br>
     *     - 自定义定时器：自定义定时器可以每一帧或者自定义的时间间隔触发。<br>
     * 如果希望每帧都触发，应该使用 update 定时器，使用 update 定时器更快，而且消耗更少的内存。
     *
     * @class Scheduler
     */
    export class Scheduler extends System {
        /**
         * @en Priority level reserved for system services.
         * @zh 系统服务的优先级。
         * @property PRIORITY_SYSTEM
         */
        static PRIORITY_SYSTEM: number;
        /**
         * @en Minimum priority level for user scheduling.
         * @zh 用户调度最低优先级。
         * @property PRIORITY_NON_SYSTEM
         */
        static PRIORITY_NON_SYSTEM: number;
        static ID: string;
        /**
         * @en This method should be called for any target which needs to schedule tasks, and this method should be called before any scheduler API usage.<bg>
         * This method will add a `id` property if it doesn't exist.
         * @zh 任何需要用 Scheduler 管理任务的对象主体都应该调用这个方法，并且应该在调用任何 Scheduler API 之前调用这个方法。<bg>
         * 这个方法会给对象添加一个 `id` 属性，如果这个属性不存在的话。
         * @param {Object} target
         */
        static enableForTarget(target: ISchedulable): void;
        constructor();
        /**
         * @en
         * Modifies the time of all scheduled callbacks.<br>
         * You can use this property to create a 'slow motion' or 'fast forward' effect.<br>
         * Default is 1.0. To create a 'slow motion' effect, use values below 1.0.<br>
         * To create a 'fast forward' effect, use values higher than 1.0.<br>
         * Note：It will affect EVERY scheduled selector / action.
         * @zh
         * 设置时间间隔的缩放比例。<br>
         * 您可以使用这个方法来创建一个 “slow motion（慢动作）” 或 “fast forward（快进）” 的效果。<br>
         * 默认是 1.0。要创建一个 “slow motion（慢动作）” 效果,使用值低于 1.0。<br>
         * 要使用 “fast forward（快进）” 效果，使用值大于 1.0。<br>
         * 注意：它影响该 Scheduler 下管理的所有定时器。
         * @param {Number} timeScale
         */
        setTimeScale(timeScale: any): void;
        /**
         * @en Returns time scale of scheduler.
         * @zh 获取时间间隔的缩放比例。
         * @return {Number}
         */
        getTimeScale(): number;
        /**
         * @en 'update' the scheduler. (You should NEVER call this method, unless you know what you are doing.)
         * @zh update 调度函数。(不应该直接调用这个方法，除非完全了解这么做的结果)
         * @param {Number} dt delta time
         */
        update(dt: any): void;
        /**
         * @en
         * <p>
         *   The scheduled method will be called every 'interval' seconds.<br/>
         *   If paused is YES, then it won't be called until it is resumed.<br/>
         *   If 'interval' is 0, it will be called every frame, but if so, it recommended to use 'scheduleUpdateForTarget:' instead.<br/>
         *   If the callback function is already scheduled, then only the interval parameter will be updated without re-scheduling it again.<br/>
         *   repeat let the action be repeated repeat + 1 times, use cc.macro.REPEAT_FOREVER to let the action run continuously<br/>
         *   delay is the amount of time the action will wait before it'll start<br/>
         * </p>
         * @zh
         * 指定回调函数，调用对象等信息来添加一个新的定时器。<br/>
         * 如果 paused 值为 true，那么直到 resume 被调用才开始计时。<br/>
         * 当时间间隔达到指定值时，设置的回调函数将会被调用。<br/>
         * 如果 interval 值为 0，那么回调函数每一帧都会被调用，但如果是这样，
         * 建议使用 scheduleUpdateForTarget 代替。<br/>
         * 如果回调函数已经被定时器使用，那么只会更新之前定时器的时间间隔参数，不会设置新的定时器。<br/>
         * repeat 值可以让定时器触发 repeat + 1 次，使用 cc.macro.REPEAT_FOREVER
         * 可以让定时器一直循环触发。<br/>
         * delay 值指定延迟时间，定时器会在延迟指定的时间之后开始计时。
         * @param {Function} callback
         * @param {Object} target
         * @param {Number} interval
         * @param {Number} [repeat=cc.macro.REPEAT_FOREVER]
         * @param {Number} [delay=0]
         * @param {Boolean} [paused=fasle]
         */
        schedule(callback: Function, target: ISchedulable, interval: number, repeat?: number, delay?: number, paused?: boolean): void;
        /**
         * @en
         * Schedules the update callback for a given target,
         * During every frame after schedule started, the "update" function of target will be invoked.
         * @zh
         * 使用指定的优先级为指定的对象设置 update 定时器。<br>
         * update 定时器每一帧都会被触发，触发时自动调用指定对象的 "update" 函数。<br>
         * 优先级的值越低，定时器被触发的越早。
         * @param {Object} target
         * @param {Number} priority
         * @param {Boolean} paused
         */
        scheduleUpdate(target: ISchedulable, priority: Number, paused: Boolean): void;
        /**
         * @en
         * Unschedules a callback for a callback and a given target.<br>
         * If you want to unschedule the "update", use `unscheduleUpdate()`
         * @zh
         * 根据指定的回调函数和调用对象。<br>
         * 如果需要取消 update 定时器，请使用 unscheduleUpdate()。
         * @param {Function} callback The callback to be unscheduled
         * @param {Object} target The target bound to the callback.
         */
        unschedule(callback: any, target: ISchedulable): void;
        /**
         * @en Unschedules the update callback for a given target.
         * @zh 取消指定对象的 update 定时器。
         * @param {Object} target The target to be unscheduled.
         */
        unscheduleUpdate(target: ISchedulable): void;
        /**
         * @en
         * Unschedules all scheduled callbacks for a given target.
         * This also includes the "update" callback.
         * @zh 取消指定对象的所有定时器，包括 update 定时器。
         * @param {Object} target The target to be unscheduled.
         */
        unscheduleAllForTarget(target: any): void;
        /**
         * @en
         * Unschedules all scheduled callbacks from all targets including the system callbacks.<br/>
         * You should NEVER call this method, unless you know what you are doing.
         * @zh
         * 取消所有对象的所有定时器，包括系统定时器。<br/>
         * 不用调用此函数，除非你确定你在做什么。
         */
        unscheduleAll(): void;
        /**
         * @en
         * Unschedules all callbacks from all targets with a minimum priority.<br/>
         * You should only call this with `PRIORITY_NON_SYSTEM_MIN` or higher.
         * @zh
         * 取消所有优先级的值大于指定优先级的定时器。<br/>
         * 你应该只取消优先级的值大于 PRIORITY_NON_SYSTEM_MIN 的定时器。
         * @param {Number} minPriority The minimum priority of selector to be unscheduled. Which means, all selectors which
         *        priority is higher than minPriority will be unscheduled.
         */
        unscheduleAllWithMinPriority(minPriority: number): void;
        /**
         * @en Checks whether a callback for a given target is scheduled.
         * @zh 检查指定的回调函数和回调对象组合是否存在定时器。
         * @param {Function} callback The callback to check.
         * @param {Object} target The target of the callback.
         * @return {Boolean} True if the specified callback is invoked, false if not.
         */
        isScheduled(callback: any, target: ISchedulable): boolean | undefined;
        /**
         * @en
         * Pause all selectors from all targets.<br/>
         * You should NEVER call this method, unless you know what you are doing.
         * @zh
         * 暂停所有对象的所有定时器。<br/>
         * 不要调用这个方法，除非你知道你正在做什么。
         */
        pauseAllTargets(): any;
        /**
         * @en
         * Pause all selectors from all targets with a minimum priority. <br/>
         * You should only call this with kCCPriorityNonSystemMin or higher.
         * @zh
         * 暂停所有优先级的值大于指定优先级的定时器。<br/>
         * 你应该只暂停优先级的值大于 PRIORITY_NON_SYSTEM_MIN 的定时器。
         * @param {Number} minPriority
         */
        pauseAllTargetsWithMinPriority(minPriority: number): any;
        /**
         * @en
         * Resume selectors on a set of targets.<br/>
         * This can be useful for undoing a call to pauseAllCallbacks.
         * @zh
         * 恢复指定数组中所有对象的定时器。<br/>
         * 这个函数是 pauseAllCallbacks 的逆操作。
         * @param {Array} targetsToResume
         */
        resumeTargets(targetsToResume: any): void;
        /**
         * @en
         * Pauses the target.<br/>
         * All scheduled selectors/update for a given target won't be 'ticked' until the target is resumed.<br/>
         * If the target is not present, nothing happens.
         * @zh
         * 暂停指定对象的定时器。<br/>
         * 指定对象的所有定时器都会被暂停。<br/>
         * 如果指定的对象没有定时器，什么也不会发生。
         * @param {Object} target
         */
        pauseTarget(target: ISchedulable): void;
        /**
         * @en
         * Resumes the target.<br/>
         * The 'target' will be unpaused, so all schedule selectors/update will be 'ticked' again.<br/>
         * If the target is not present, nothing happens.
         * @zh
         * 恢复指定对象的所有定时器。<br/>
         * 指定对象的所有定时器将继续工作。<br/>
         * 如果指定的对象没有定时器，什么也不会发生。
         * @param {Object} target
         */
        resumeTarget(target: ISchedulable): void;
        /**
         * @en Returns whether or not the target is paused.
         * @zh 返回指定对象的定时器是否处于暂停状态。
         * @param {Object} target
         * @return {Boolean}
         */
        isTargetPaused(target: ISchedulable): any;
    }
    /**
     * @en
     * <p>
     *    ATTENTION: USE cc.director INSTEAD OF cc.Director.<br/>
     *    cc.director is a singleton object which manage your game's logic flow.<br/>
     *    Since the cc.director is a singleton, you don't need to call any constructor or create functions,<br/>
     *    the standard way to use it is by calling:<br/>
     *      - cc.director.methodName(); <br/>
     *
     *    It creates and handle the main Window and manages how and when to execute the Scenes.<br/>
     *    <br/>
     *    The cc.director is also responsible for:<br/>
     *      - initializing the OpenGL context<br/>
     *      - setting the OpenGL pixel format (default on is RGB565)<br/>
     *      - setting the OpenGL buffer depth (default on is 0-bit)<br/>
     *      - setting the color for clear screen (default one is BLACK)<br/>
     *      - setting the projection (default one is 3D)<br/>
     *      - setting the orientation (default one is Portrait)<br/>
     *      <br/>
     *    <br/>
     *    The cc.director also sets the default OpenGL context:<br/>
     *      - GL_TEXTURE_2D is enabled<br/>
     *      - GL_VERTEX_ARRAY is enabled<br/>
     *      - GL_COLOR_ARRAY is enabled<br/>
     *      - GL_TEXTURE_COORD_ARRAY is enabled<br/>
     * </p>
     * <p>
     *   cc.director also synchronizes timers with the refresh rate of the display.<br/>
     *   Features and Limitations:<br/>
     *      - Scheduled timers & drawing are synchronizes with the refresh rate of the display<br/>
     *      - Only supports animation intervals of 1/60 1/30 & 1/15<br/>
     * </p>
     *
     * @zh
     * <p>
     *     注意：用 cc.director 代替 cc.Director。<br/>
     *     cc.director 一个管理你的游戏的逻辑流程的单例对象。<br/>
     *     由于 cc.director 是一个单例，你不需要调用任何构造函数或创建函数，<br/>
     *     使用它的标准方法是通过调用：<br/>
     *       - cc.director.methodName();
     *     <br/>
     *     它创建和处理主窗口并且管理什么时候执行场景。<br/>
     *     <br/>
     *     cc.director 还负责：<br/>
     *      - 初始化 OpenGL 环境。<br/>
     *      - 设置OpenGL像素格式。(默认是 RGB565)<br/>
     *      - 设置OpenGL缓冲区深度 (默认是 0-bit)<br/>
     *      - 设置空白场景的颜色 (默认是 黑色)<br/>
     *      - 设置投影 (默认是 3D)<br/>
     *      - 设置方向 (默认是 Portrait)<br/>
     *    <br/>
     *    cc.director 设置了 OpenGL 默认环境 <br/>
     *      - GL_TEXTURE_2D   启用。<br/>
     *      - GL_VERTEX_ARRAY 启用。<br/>
     *      - GL_COLOR_ARRAY  启用。<br/>
     *      - GL_TEXTURE_COORD_ARRAY 启用。<br/>
     * </p>
     * <p>
     *   cc.director 也同步定时器与显示器的刷新速率。
     *   <br/>
     *   特点和局限性: <br/>
     *      - 将计时器 & 渲染与显示器的刷新频率同步。<br/>
     *      - 只支持动画的间隔 1/60 1/30 & 1/15。<br/>
     * </p>
     *
     * @class Director
     * @extends EventTarget
     */
    export class Director extends EventTarget {
        /**
         * @en The event which will be triggered when the singleton of Director initialized.
         * @zh Director 单例初始化时触发的事件
         * @event Director.EVENT_INIT
         */
        /**
         * @en The event which will be triggered when the singleton of Director initialized.
         * @zh Director 单例初始化时触发的事件
         * @property {String} EVENT_INIT
         * @readonly
         */
        static readonly EVENT_INIT = "director_init";
        /**
         * @en The event which will be triggered when the singleton of Director reset.
         * @zh Director 单例重置时触发的事件
         * @event Director.EVENT_RESET
         */
        /**
         * @en The event which will be triggered when the singleton of Director reset.
         * @zh Director 单例重置时触发的事件
         * @property {String} EVENT_RESET
         * @readonly
         */
        static readonly EVENT_RESET = "director_reset";
        /**
         * @en The event which will be triggered before loading a new scene.
         * @zh 加载新场景之前所触发的事件。
         * @event Director.EVENT_BEFORE_SCENE_LOADING
         * @param {String} sceneName - The loading scene name
         */
        /**
         * @en The event which will be triggered before loading a new scene.
         * @zh 加载新场景之前所触发的事件。
         * @property {String} EVENT_BEFORE_SCENE_LOADING
         * @readonly
         */
        static readonly EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
        /**
         * @en The event which will be triggered before launching a new scene.
         * @zh 运行新场景之前所触发的事件。
         * @event Director.EVENT_BEFORE_SCENE_LAUNCH
         * @param {String} sceneName - New scene which will be launched
         */
        /**
         * @en The event which will be triggered before launching a new scene.
         * @zh 运行新场景之前所触发的事件。
         * @property {String} EVENT_BEFORE_SCENE_LAUNCH
         * @readonly
         */
        static readonly EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
        /**
         * @en The event which will be triggered after launching a new scene.
         * @zh 运行新场景之后所触发的事件。
         * @event Director.EVENT_AFTER_SCENE_LAUNCH
         * @param {String} sceneName - New scene which is launched
         */
        /**
         * @en The event which will be triggered after launching a new scene.
         * @zh 运行新场景之后所触发的事件。
         * @property {String} EVENT_AFTER_SCENE_LAUNCH
         * @readonly
         */
        static readonly EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
        /**
         * @en The event which will be triggered at the beginning of every frame.
         * @zh 每个帧的开始时所触发的事件。
         * @event Director.EVENT_BEFORE_UPDATE
         */
        /**
         * @en The event which will be triggered at the beginning of every frame.
         * @zh 每个帧的开始时所触发的事件。
         * @property {String} EVENT_BEFORE_UPDATE
         * @readonly
         */
        static readonly EVENT_BEFORE_UPDATE = "director_before_update";
        /**
         * @en The event which will be triggered after engine and components update logic.
         * @zh 将在引擎和组件 “update” 逻辑之后所触发的事件。
         * @event Director.EVENT_AFTER_UPDATE
         */
        /**
         * @en The event which will be triggered after engine and components update logic.
         * @zh 将在引擎和组件 “update” 逻辑之后所触发的事件。
         * @property {String} EVENT_AFTER_UPDATE
         * @readonly
         */
        static readonly EVENT_AFTER_UPDATE = "director_after_update";
        /**
         * @en The event which will be triggered before the rendering process.
         * @zh 渲染过程之前所触发的事件。
         * @event Director.EVENT_BEFORE_DRAW
         */
        /**
         * @en The event which will be triggered before the rendering process.
         * @zh 渲染过程之前所触发的事件。
         * @property {String} EVENT_BEFORE_DRAW
         * @readonly
         */
        static readonly EVENT_BEFORE_DRAW = "director_before_draw";
        /**
         * @en The event which will be triggered after the rendering process.
         * @zh 渲染过程之后所触发的事件。
         * @event Director.EVENT_AFTER_DRAW
         */
        /**
         * @en The event which will be triggered after the rendering process.
         * @zh 渲染过程之后所触发的事件。
         * @property {String} EVENT_AFTER_DRAW
         * @readonly
         */
        static readonly EVENT_AFTER_DRAW = "director_after_draw";
        /**
         * The event which will be triggered before the physics process.<br/>
         * 物理过程之前所触发的事件。
         * @event Director.EVENT_BEFORE_PHYSICS
         * @readonly
         */
        static readonly EVENT_BEFORE_PHYSICS = "director_before_physics";
        /**
         * The event which will be triggered after the physics process.<br/>
         * 物理过程之后所触发的事件。
         * @event Director.EVENT_AFTER_PHYSICS
         * @readonly
         */
        static readonly EVENT_AFTER_PHYSICS = "director_after_physics";
        static instance: Director;
        _compScheduler: __private.cocos_core_scene_graph_component_scheduler_ComponentScheduler;
        _nodeActivator: NodeActivator;
        constructor();
        /**
         * calculates delta time since last time it was called
         */
        calculateDeltaTime(): void;
        /**
         * @en
         * Converts a view coordinate to an WebGL coordinate<br/>
         * Useful to convert (multi) touches coordinates to the current layout (portrait or landscape)<br/>
         * Implementation can be found in directorWebGL.
         * @zh 将触摸点的屏幕坐标转换为 WebGL View 下的坐标。
         * @deprecated since v2.0
         */
        convertToGL(uiPoint: math.Vec2): math.Vec2;
        /**
         * @en
         * Converts an OpenGL coordinate to a view coordinate<br/>
         * Useful to convert node points to window points for calls such as glScissor<br/>
         * Implementation can be found in directorWebGL.
         * @zh 将触摸点的 WebGL View 坐标转换为屏幕坐标。
         * @deprecated since v2.0
         */
        convertToUI(glPoint: math.Vec2): math.Vec2;
        /**
         * End the life of director in the next frame
         */
        end(): void;
        /**
         * @en
         * Returns the size of the WebGL view in points.<br/>
         * It takes into account any possible rotation (device orientation) of the window.
         * @zh 获取视图的大小，以点为单位。
         * @deprecated since v2.0
         */
        getWinSize(): import("cocos/core/math").Size;
        /**
         * @en
         * Returns the size of the OpenGL view in pixels.<br/>
         * It takes into account any possible rotation (device orientation) of the window.<br/>
         * On Mac winSize and winSizeInPixels return the same value.
         * (The pixel here refers to the resource resolution. If you want to get the physics resolution of device, you need to use cc.view.getFrameSize())
         * @zh
         * 获取视图大小，以像素为单位（这里的像素指的是资源分辨率。
         * 如果要获取屏幕物理分辨率，需要用 cc.view.getFrameSize()）
         * @deprecated since v2.0
         */
        getWinSizeInPixels(): import("cocos/core/math").Size;
        /**
         * @en Pause the director's ticker, only involve the game logic execution.<br>
         * It won't pause the rendering process nor the event manager.<br>
         * If you want to pause the entire game including rendering, audio and event,<br>
         * please use cc.game.pause
         * @zh 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。<br>
         * 如果想要更彻底得暂停游戏，包含渲染，音频和事件，请使用 cc.game.pause 。
         */
        pause(): void;
        /**
         * @en Removes cached all cocos2d cached data.
         * @zh 删除cocos2d所有的缓存数据
         * @deprecated since v2.0
         */
        purgeCachedData(): void;
        /**
         * @en Purge the cc.director itself, including unschedule all schedule,<br>
         * remove all event listeners, clean up and exit the running scene, stops all animations, clear cached data.
         * @zh 清除 cc.director 本身，包括停止所有的计时器，<br>
         * 移除所有的事件监听器，清理并退出当前运行的场景，停止所有动画，清理缓存数据。
         */
        purgeDirector(): void;
        /**
         * @en Reset the cc.director, can be used to restart the director after purge
         * @zh 重置 cc.director，可用于在清除后重启 director
         */
        reset(): void;
        /**
         * @en
         * Run a scene. Replaces the running scene with a new one or enter the first scene.<br>
         * The new scene will be launched immediately.
         * @zh 运行指定场景。将正在运行的场景替换为（或重入为）新场景。新场景将立即启动。
         * @param scene - The need run scene.
         * @param onBeforeLoadScene - The function invoked at the scene before loading.
         * @param onLaunched - The function invoked at the scene after launch.
         */
        runSceneImmediate(scene: Scene, onBeforeLoadScene?: Director.OnBeforeLoadScene, onLaunched?: Director.OnSceneLaunched): void;
        /**
         * @en
         * Run a scene. Replaces the running scene with a new one or enter the first scene.<br>
         * The new scene will be launched at the end of the current frame.<br>
         * @zh 运行指定场景。
         * @param scene - The need run scene.
         * @param onBeforeLoadScene - The function invoked at the scene before loading.
         * @param onLaunched - The function invoked at the scene after launch.
         * @private
         */
        runScene(scene: Scene, onBeforeLoadScene?: Director.OnBeforeLoadScene, onLaunched?: Director.OnSceneLaunched): void;
        _getSceneUuid(key: string | number): any;
        /**
         * @en Loads the scene by its name.
         * @zh 通过场景名称进行加载场景。
         *
         * @param sceneName - The name of the scene to load.
         * @param onLaunched - callback, will be called after scene launched.
         * @return if error, return false
         */
        loadScene(sceneName: string, onLaunched?: Director.OnSceneLaunched, onUnloaded?: Director.OnUnload): boolean;
        /**
         * @en
         * Pre-loads the scene to reduces loading time. You can call this method at any time you want.<br>
         * After calling this method, you still need to launch the scene by `cc.director.loadScene`.<br>
         * It will be totally fine to call `cc.director.loadScene` at any time even if the preloading is not<br>
         * yet finished, the scene will be launched after loaded automatically.
         * @zh 预加载场景，你可以在任何时候调用这个方法。
         * 调用完后，你仍然需要通过 `cc.director.loadScene` 来启动场景，因为这个方法不会执行场景加载操作。<br>
         * 就算预加载还没完成，你也可以直接调用 `cc.director.loadScene`，加载完成后场景就会启动。
         * @param sceneName 场景名称。
         * @param onLoaded 加载回调。
         */
        preloadScene(sceneName: string, onLoaded?: Director.OnSceneLoaded): void;
        /**
         * @en
         * Pre-loads the scene to reduces loading time. You can call this method at any time you want.<br>
         * After calling this method, you still need to launch the scene by `cc.director.loadScene`.<br>
         * It will be totally fine to call `cc.director.loadScene` at any time even if the preloading is not<br>
         * yet finished, the scene will be launched after loaded automatically.
         * @zh 预加载场景，你可以在任何时候调用这个方法。
         * 调用完后，你仍然需要通过 `cc.director.loadScene` 来启动场景，因为这个方法不会执行场景加载操作。<br>
         * 就算预加载还没完成，你也可以直接调用 `cc.director.loadScene`，加载完成后场景就会启动。
         * @param sceneName 场景名称。
         * @param onProgress 加载进度回调。
         * @param onLoaded 加载回调。
         */
        preloadScene(sceneName: string, onProgress: Director.OnLoadSceneProgress, onLoaded: Director.OnSceneLoaded): void;
        /**
         * @en Loads the scene by its uuid.
         * @zh 通过 uuid 加载场景。
         * @param uuid 场景资源的 uuid。
         * @param doNotRun 仅加载和初始化场景，但并不运行。此参数仅在编辑器环境中生效。
         */
        _loadSceneByUuid(uuid: string, doNotRun?: boolean): void;
        _loadSceneByUuid(uuid: string, onLaunched?: Director.OnSceneLaunched, doNotRun?: boolean): void;
        _loadSceneByUuid(uuid: string, onLaunched?: Director.OnSceneLaunched, onUnloaded?: Director.OnUnload, doNotRun?: boolean): void;
        /**
         * @en Resume game logic execution after pause, if the current scene is not paused, nothing will happen.
         * @zh 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生。
         */
        resume(): void;
        /**
         * @en
         * Enables or disables WebGL depth test.<br>
         * Implementation can be found in directorCanvas.js/directorWebGL.js
         * @zh 启用/禁用深度测试（在 Canvas 渲染模式下不会生效）。
         * @deprecated since v2.0
         */
        setDepthTest(value: boolean): void;
        /**
         * @en
         * Set color for clear screen.<br>
         * (Implementation can be found in directorCanvas.js/directorWebGL.js)
         * @zh
         * 设置场景的默认擦除颜色。<br>
         * 支持全透明，但不支持透明度为中间值。要支持全透明需手工开启 cc.macro.ENABLE_TRANSPARENT_CANVAS。
         * @deprecated since v2.0
         */
        setClearColor(clearColor: math.Color): void;
        get root(): renderer.__private.cocos_core_root_Root | null;
        /**
         * @en Returns current logic Scene.
         * @zh 获取当前逻辑场景。
         * @deprecated Since v2.0.
         */
        getRunningScene(): Scene | null;
        /**
         * @en Returns current logic Scene.
         * @zh 获取当前逻辑场景。
         * @example
         * ```
         * import { director } from 'cc';
         * // This will help you to get the Canvas node in scene
         * director.getScene().getChildByName('Canvas');
         * ```
         */
        getScene(): Scene | null;
        /**
         * @en Returns the FPS value. Please use [[Game.setFrameRate]] to control animation interval.
         * @zh 获取单位帧执行时间。请使用 [[Game.setFrameRate]] 来控制游戏帧率。
         * @deprecated since v2.0.
         */
        getAnimationInterval(): number;
        /**
         * @en Sets animation interval, this doesn't control the main loop.<br>
         * To control the game's frame rate overall, please use cc.game.setFrameRate
         * @zh 设置动画间隔，这不控制主循环。<br>
         * 要控制游戏的帧速率，请使用 cc.game.setFrameRate
         * @deprecated since v2.0
         * @param value - The animation interval desired.
         */
        setAnimationInterval(value: number): void;
        /**
         * @en Returns the delta time since last frame.
         * @zh 获取上一帧的增量时间。
         */
        getDeltaTime(): number;
        /**
         * @en Returns the current time.
         * @zh 获取当前帧的时间。
         */
        getCurrentTime(): number;
        /**
         * @en Returns how many frames were called since the director started.
         * @zh 获取 director 启动以来游戏运行的总帧数。
         */
        getTotalFrames(): number;
        /**
         * @en Returns whether or not the Director is paused.
         * @zh 是否处于暂停状态。
         */
        isPaused(): boolean;
        /**
         * @en Returns the cc.Scheduler associated with this director.
         * @zh 获取和 director 相关联的 cc.Scheduler。
         */
        getScheduler(): Scheduler;
        /**
         * @en Sets the cc.Scheduler associated with this director.
         * @zh 设置和 director 相关联的 cc.Scheduler。
         */
        setScheduler(scheduler: Scheduler): void;
        /**
         * @en register a system.
         * @zh 注册一个 system。
         */
        registerSystem(name: string, sys: System, priority: number): void;
        unregisterSystem(sys: System): void;
        /**
         * @en get a system.
         * @zh 获取一个 system。
         */
        getSystem(name: string): System | undefined;
        /**
         * @en Returns the cc.AnimationManager associated with this director. Please use getSystem(AnimationManager.ID)
         * @zh 获取和 director 相关联的 cc.AnimationManager（动画管理器）。请使用 getSystem(AnimationManager.ID) 来替代
         * @deprecated
         */
        getAnimationManager(): any;
        /**
         * @en Starts Animation
         * @zh 开始动画
         */
        startAnimation(): void;
        /**
         * @en Stops animation
         * @zh 停止动画
         */
        stopAnimation(): void;
        /**
         * @en Run main loop of director
         * @zh 运行主循环
         */
        mainLoop(time: number): void;
    }
    export namespace Director {
        export type OnBeforeLoadScene = () => void;
        export type OnUnload = () => void;
        export type OnSceneLoaded = (error: null | Error, sceneAsset?: SceneAsset) => void;
        export type OnSceneLaunched = (error: null | Error, scene?: Scene) => void;
        /**
         * @param completedCount - The number of the items that are already completed.
         * @param totalCount - The total number of the items.
         * @param item - The latest item which flow out the pipeline.
         */
        export type OnLoadSceneProgress = (completedCount: number, totalCount: number, item: any) => void;
    }
    /**
     * 导演类。
     * @property director
     */
    export const director: Director;
    export interface IGFXBinding {
        binding: number;
        bindingType: GFXBindingType;
        name: string;
    }
    export interface IGFXBindingLayoutInfo {
        bindings: IGFXBinding[];
    }
    export class GFXBindingUnit {
        binding: number;
        type: GFXBindingType;
        name: string;
        buffer: GFXBuffer | null;
        texView: GFXTextureView | null;
        sampler: GFXSampler | null;
    }
    /**
     * @en GFX binding layout.
     * @zh GFX 绑定布局。
     */
    export abstract class GFXBindingLayout extends GFXObject {
        protected _device: GFXDevice;
        protected _bindingUnits: GFXBindingUnit[];
        protected _isDirty: boolean;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXBindingLayoutInfo): boolean;
        abstract destroy(): void;
        abstract update(): void;
        /**
         * @en Bind buffer to the specified binding unit.
         * @zh 在指定的 binding 位置上绑定缓冲。
         * @param binding The target binding.
         * @param buffer The buffer to be bound.
         */
        bindBuffer(binding: number, buffer: GFXBuffer): void;
        /**
         * @en Bind sampler to the specified binding unit.
         * @zh 在指定的 binding 位置上绑定采样器。
         * @param binding The target binding.
         * @param sampler The sampler to be bound.
         */
        bindSampler(binding: number, sampler: GFXSampler): void;
        /**
         * @en Bind texture view to the specified binding unit.
         * @zh 在指定的 binding 位置上绑定纹理视图。
         * @param binding The target binding.
         * @param texView The texture view to be bound.
         */
        bindTextureView(binding: number, texView: GFXTextureView): void;
        /**
         * @en Get the specified binding unit.
         * @zh 得到指定的 binding 位置上的GFX绑定单元。
         * @param binding The target binding.
         */
        getBindingUnit(binding: number): GFXBindingUnit | null;
    }
    export interface IGFXUniformInfo {
        name: string;
        type: GFXType;
        count: number;
    }
    export interface IGFXDrawInfo {
        vertexCount: number;
        firstVertex: number;
        indexCount: number;
        firstIndex: number;
        vertexOffset: number;
        instanceCount: number;
        firstInstance: number;
    }
    export const GFX_DRAW_INFO_SIZE: number;
    export interface IGFXIndirectBuffer {
        drawInfos: IGFXDrawInfo[];
    }
    export type GFXBufferSource = ArrayBuffer | IGFXIndirectBuffer;
    export interface IGFXBufferInfo {
        usage: GFXBufferUsage;
        memUsage: GFXMemoryUsage;
        size: number;
        /**
         * In bytes.
         */
        stride?: number;
        flags?: GFXBufferFlags;
    }
    /**
     * @en GFX buffer.
     * @zh GFX 缓冲。
     */
    export abstract class GFXBuffer extends GFXObject {
        get usage(): GFXBufferUsage;
        get memUsage(): GFXMemoryUsage;
        get size(): number;
        get stride(): number;
        get count(): number;
        get flags(): GFXBufferFlags;
        get bufferView(): Uint8Array | null;
        protected _device: GFXDevice;
        protected _usage: GFXBufferUsage;
        protected _memUsage: GFXMemoryUsage;
        protected _size: number;
        protected _stride: number;
        protected _count: number;
        protected _flags: GFXBufferFlags;
        protected _bufferView: Uint8Array | null;
        protected _indirectBuffer: IGFXIndirectBuffer | null;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXBufferInfo): boolean;
        abstract destroy(): void;
        /**
         * @en Resize the buffer.
         * @zh 重置缓冲大小。
         * @param size The new buffer size.
         */
        abstract resize(size: number): void;
        /**
         * @en Update the buffer data.
         * @zh 更新缓冲内容。
         * @param buffer The new buffer data.
         * @param offset Offset into the buffer.
         * @param size Size of the data to be updated.
         */
        abstract update(buffer: GFXBufferSource, offset?: number, size?: number): void;
    }
    export interface IGFXCommandAllocatorInfo {
    }
    /**
     * @en GFX command allocator.
     * @zh GFX 命令分配器。
     */
    export abstract class GFXCommandAllocator extends GFXObject {
        protected _device: GFXDevice;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXCommandAllocatorInfo): boolean;
        abstract destroy(): void;
    }
    export interface IGFXCommandBufferInfo {
        allocator: GFXCommandAllocator;
        type: GFXCommandBufferType;
    }
    export interface IGFXDepthBias {
        constantFactor: number;
        clamp: number;
        slopeFactor: number;
    }
    export interface IGFXDepthBounds {
        minBounds: number;
        maxBounds: number;
    }
    export interface IGFXStencilWriteMask {
        face: GFXStencilFace;
        writeMask: number;
    }
    export interface IGFXStencilCompareMask {
        face: GFXStencilFace;
        reference: number;
        compareMask: number;
    }
    /**
     * @en GFX command buffer.
     * @zh GFX 命令缓冲。
     */
    export abstract class GFXCommandBuffer extends GFXObject {
        get type(): GFXCommandBufferType;
        get numDrawCalls(): number;
        get numInstances(): number;
        get numTris(): number;
        protected _device: GFXDevice;
        protected _allocator: GFXCommandAllocator | null;
        protected _type: GFXCommandBufferType;
        protected _numDrawCalls: number;
        protected _numInstances: number;
        protected _numTris: number;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXCommandBufferInfo): boolean;
        abstract destroy(): void;
        /**
         * @en Begin recording commands.
         * @zh 开始记录命令。
         */
        abstract begin(): void;
        /**
         * @en End recording commands.
         * @zh 结束记录命令。
         */
        abstract end(): void;
        /**
         * @en Begin render pass.
         * @zh 开始 RenderPass。
         * @param framebuffer The frame buffer used.
         * @param renderArea The target render area.
         * @param clearFlag The clear flags.
         * @param clearColors The clearing colors.
         * @param clearDepth The clearing depth.
         * @param clearStencil The clearing stencil.
         */
        abstract beginRenderPass(framebuffer: GFXFramebuffer, renderArea: IGFXRect, clearFlag: GFXClearFlag, clearColors: IGFXColor[], clearDepth: number, clearStencil: number): void;
        /**
         * @en End render pass.
         * @zh 结束 RenderPass。
         */
        abstract endRenderPass(): void;
        /**
         * @en Bind pipeline state.
         * @zh 绑定 GFX 管线状态。
         * @param pipelineState The pipeline state to be bound.
         */
        abstract bindPipelineState(pipelineState: GFXPipelineState): void;
        /**
         * @en Bind binding layout.
         * @zh 绑定 GFX 绑定布局。
         * @param bindingLayout The binding layout to be bound.
         */
        abstract bindBindingLayout(bindingLayout: GFXBindingLayout): void;
        /**
         * @en Bind input assembler.
         * @zh 绑定GFX输入汇集器。
         * @param inputAssembler The input assembler to be bound.
         */
        abstract bindInputAssembler(inputAssembler: GFXInputAssembler): void;
        /**
         * @en Set viewport.
         * @zh 设置视口。
         * @param viewport The new viewport.
         */
        abstract setViewport(viewport: IGFXViewport): void;
        /**
         * @en Set scissor range.
         * @zh 设置剪裁区域。
         * @param scissor The new scissor range.
         */
        abstract setScissor(scissor: IGFXRect): void;
        /**
         * @en Set line width.
         * @zh 设置线宽。
         * @param lineWidth The new line width.
         */
        abstract setLineWidth(lineWidth: number): void;
        /**
         * @en Set depth bias.
         * @zh 设置深度偏移。
         * @param depthBiasConstantFactor The new depth bias factor.
         * @param depthBiasClamp The new depth bias clamp threshold.
         * @param depthBiasSlopeFactor  The new depth bias slope factor.
         */
        abstract setDepthBias(depthBiasConstantFactor: number, depthBiasClamp: number, depthBiasSlopeFactor: number): void;
        /**
         * @en Set blend constants.
         * @zh 设置混合因子。
         * @param blendConstants The new blend constants.
         */
        abstract setBlendConstants(blendConstants: number[]): void;
        /**
         * @en Set depth bound.
         * @zh 设置深度边界。
         * @param minDepthBounds The new minimum depth bound.
         * @param maxDepthBounds The new maximum depth bound.
         */
        abstract setDepthBound(minDepthBounds: number, maxDepthBounds: number): void;
        /**
         * @en Set stencil write mask.
         * @zh 设置模板写掩码。
         * @param face The effective triangle face.
         * @param writeMask The new stencil write mask.
         */
        abstract setStencilWriteMask(face: GFXStencilFace, writeMask: number): void;
        /**
         * @en Set stencil compare mask.
         * @zh 设置模板比较掩码。
         * @param face The effective triangle face.
         * @param reference The new stencil reference constant.
         * @param compareMask The new stencil read mask.
         */
        abstract setStencilCompareMask(face: GFXStencilFace, reference: number, compareMask: number): void;
        /**
         * @en Draw the specified primitives.
         * @zh 绘制。
         * @param inputAssembler The target input assembler.
         */
        abstract draw(inputAssembler: GFXInputAssembler): void;
        /**
         * @en Update buffer.
         * @zh 更新缓冲。
         * @param buffer The buffer to be updated.
         * @param data The source data.
         * @param offset Offset into the buffer.
         */
        abstract updateBuffer(buffer: GFXBuffer, data: ArrayBuffer, offset?: number): void;
        /**
         * @en Copy buffer to texture.
         * @zh 拷贝缓冲到纹理。
         * @param srcBuff The buffer to be copied.
         * @param dstTex The texture to copy to.
         * @param dstLayout The target texture layout.
         * @param regions The region descriptions.
         */
        abstract copyBufferToTexture(srcBuff: GFXBuffer, dstTex: GFXTexture, dstLayout: GFXTextureLayout, regions: GFXBufferTextureCopy[]): void;
        /**
         * @en Execute specified command buffers.
         * @zh 执行一组命令缓冲。
         * @param cmdBuffs The command buffers to be executed.
         * @param count The number of command buffers to be executed.
         */
        abstract execute(cmdBuffs: GFXCommandBuffer[], count: number): void;
    }
    /**
     * @en Get memory size of the specified fomat.
     * @zh 获取指定格式对应的内存大小。
     * @param format The target format.
     * @param width The target width.
     * @param height The target height.
     * @param depth The target depth.
     */
    export function GFXFormatSize(format: GFXFormat, width: number, height: number, depth: number): number;
    /**
     * @en Get memory size of the specified surface.
     * @zh GFX 格式表面内存大小。
     * @param format The target format.
     * @param width The target width.
     * @param height The target height.
     * @param depth The target depth.
     * @param mips The target mip levels.
     */
    export function GFXFormatSurfaceSize(format: GFXFormat, width: number, height: number, depth: number, mips: number): number;
    /**
     * @en Get the memory size of the specified type.
     * @zh 得到 GFX 数据类型的大小。
     * @param type The target type.
     */
    export function GFXGetTypeSize(type: GFXType): number;
    export function getTypedArrayConstructor(info: IGFXFormatInfo): __private.TypedArrayConstructor;
    /**
     * @category gfx
     */
    export const GFX_MAX_VERTEX_ATTRIBUTES: number;
    export const GFX_MAX_TEXTURE_UNITS: number;
    export const GFX_MAX_ATTACHMENTS: number;
    export const GFX_MAX_BUFFER_BINDINGS: number;
    export enum GFXObjectType {
        UNKNOWN = 0,
        BUFFER = 1,
        TEXTURE = 2,
        TEXTURE_VIEW = 3,
        RENDER_PASS = 4,
        FRAMEBUFFER = 5,
        SAMPLER = 6,
        SHADER = 7,
        PIPELINE_LAYOUT = 8,
        PIPELINE_STATE = 9,
        BINDING_LAYOUT = 10,
        INPUT_ASSEMBLER = 11,
        COMMAND_ALLOCATOR = 12,
        COMMAND_BUFFER = 13,
        QUEUE = 14,
        WINDOW = 15
    }
    export enum GFXStatus {
        UNREADY = 0,
        FAILED = 1,
        SUCCESS = 2
    }
    /**
     * @en GFX base object.
     * @zh GFX 基类对象。
     */
    export class GFXObject {
        get gfxType(): GFXObjectType;
        get status(): GFXStatus;
        protected _gfxType: GFXObjectType;
        protected _status: GFXStatus;
        constructor(gfxType: GFXObjectType);
    }
    export enum GFXAttributeName {
        ATTR_POSITION = "a_position",
        ATTR_NORMAL = "a_normal",
        ATTR_TANGENT = "a_tangent",
        ATTR_BITANGENT = "a_bitangent",
        ATTR_WEIGHTS = "a_weights",
        ATTR_JOINTS = "a_joints",
        ATTR_COLOR = "a_color",
        ATTR_COLOR1 = "a_color1",
        ATTR_COLOR2 = "a_color2",
        ATTR_TEX_COORD = "a_texCoord",
        ATTR_TEX_COORD1 = "a_texCoord1",
        ATTR_TEX_COORD2 = "a_texCoord2",
        ATTR_TEX_COORD3 = "a_texCoord3",
        ATTR_TEX_COORD4 = "a_texCoord4",
        ATTR_TEX_COORD5 = "a_texCoord5",
        ATTR_TEX_COORD6 = "a_texCoord6",
        ATTR_TEX_COORD7 = "a_texCoord7",
        ATTR_TEX_COORD8 = "a_texCoord8",
        ATTR_BATCH_ID = "a_batch_id",
        ATTR_BATCH_UV = "a_batch_uv"
    }
    export enum GFXType {
        UNKNOWN = 0,
        BOOL = 1,
        BOOL2 = 2,
        BOOL3 = 3,
        BOOL4 = 4,
        INT = 5,
        INT2 = 6,
        INT3 = 7,
        INT4 = 8,
        UINT = 9,
        UINT2 = 10,
        UINT3 = 11,
        UINT4 = 12,
        FLOAT = 13,
        FLOAT2 = 14,
        FLOAT3 = 15,
        FLOAT4 = 16,
        MAT2 = 17,
        MAT2X3 = 18,
        MAT2X4 = 19,
        MAT3X2 = 20,
        MAT3 = 21,
        MAT3X4 = 22,
        MAT4X2 = 23,
        MAT4X3 = 24,
        MAT4 = 25,
        SAMPLER1D = 26,
        SAMPLER1D_ARRAY = 27,
        SAMPLER2D = 28,
        SAMPLER2D_ARRAY = 29,
        SAMPLER3D = 30,
        SAMPLER_CUBE = 31,
        COUNT = 32
    }
    export enum GFXFormat {
        UNKNOWN = 0,
        A8 = 1,
        L8 = 2,
        LA8 = 3,
        R8 = 4,
        R8SN = 5,
        R8UI = 6,
        R8I = 7,
        R16F = 8,
        R16UI = 9,
        R16I = 10,
        R32F = 11,
        R32UI = 12,
        R32I = 13,
        RG8 = 14,
        RG8SN = 15,
        RG8UI = 16,
        RG8I = 17,
        RG16F = 18,
        RG16UI = 19,
        RG16I = 20,
        RG32F = 21,
        RG32UI = 22,
        RG32I = 23,
        RGB8 = 24,
        SRGB8 = 25,
        RGB8SN = 26,
        RGB8UI = 27,
        RGB8I = 28,
        RGB16F = 29,
        RGB16UI = 30,
        RGB16I = 31,
        RGB32F = 32,
        RGB32UI = 33,
        RGB32I = 34,
        RGBA8 = 35,
        SRGB8_A8 = 36,
        RGBA8SN = 37,
        RGBA8UI = 38,
        RGBA8I = 39,
        RGBA16F = 40,
        RGBA16UI = 41,
        RGBA16I = 42,
        RGBA32F = 43,
        RGBA32UI = 44,
        RGBA32I = 45,
        R5G6B5 = 46,
        R11G11B10F = 47,
        RGB5A1 = 48,
        RGBA4 = 49,
        RGB10A2 = 50,
        RGB10A2UI = 51,
        RGB9E5 = 52,
        D16 = 53,
        D16S8 = 54,
        D24 = 55,
        D24S8 = 56,
        D32F = 57,
        D32F_S8 = 58,
        BC1 = 59,
        BC1_ALPHA = 60,
        BC1_SRGB = 61,
        BC1_SRGB_ALPHA = 62,
        BC2 = 63,
        BC2_SRGB = 64,
        BC3 = 65,
        BC3_SRGB = 66,
        BC4 = 67,
        BC4_SNORM = 68,
        BC5 = 69,
        BC5_SNORM = 70,
        BC6H_UF16 = 71,
        BC6H_SF16 = 72,
        BC7 = 73,
        BC7_SRGB = 74,
        ETC_RGB8 = 75,
        ETC2_RGB8 = 76,
        ETC2_SRGB8 = 77,
        ETC2_RGB8_A1 = 78,
        ETC2_SRGB8_A1 = 79,
        ETC2_RGBA8 = 80,
        ETC2_SRGB8_A8 = 81,
        EAC_R11 = 82,
        EAC_R11SN = 83,
        EAC_RG11 = 84,
        EAC_RG11SN = 85,
        PVRTC_RGB2 = 86,
        PVRTC_RGBA2 = 87,
        PVRTC_RGB4 = 88,
        PVRTC_RGBA4 = 89,
        PVRTC2_2BPP = 90,
        PVRTC2_4BPP = 91
    }
    export enum GFXBufferUsageBit {
        NONE = 0,
        TRANSFER_SRC = 1,
        TRANSFER_DST = 2,
        INDEX = 4,
        VERTEX = 8,
        UNIFORM = 16,
        STORAGE = 32,
        INDIRECT = 64
    }
    export type GFXBufferUsage = GFXBufferUsageBit;
    export enum GFXMemoryUsageBit {
        NONE = 0,
        DEVICE = 1,
        HOST = 2
    }
    export type GFXMemoryUsage = GFXMemoryUsageBit;
    export enum GFXBufferFlagBit {
        NONE = 0,
        BAKUP_BUFFER = 4
    }
    export type GFXBufferFlags = GFXBufferFlagBit;
    export enum GFXBufferAccessBit {
        NONE = 0,
        READ = 1,
        WRITE = 2
    }
    export type GFXBufferAccess = GFXBufferAccessBit;
    export enum GFXPrimitiveMode {
        POINT_LIST = 0,
        LINE_LIST = 1,
        LINE_STRIP = 2,
        LINE_LOOP = 3,
        LINE_LIST_ADJACENCY = 4,
        LINE_STRIP_ADJACENCY = 5,
        ISO_LINE_LIST = 6,
        TRIANGLE_LIST = 7,
        TRIANGLE_STRIP = 8,
        TRIANGLE_FAN = 9,
        TRIANGLE_LIST_ADJACENCY = 10,
        TRIANGLE_STRIP_ADJACENCY = 11,
        TRIANGLE_PATCH_ADJACENCY = 12,
        QUAD_PATCH_LIST = 13
    }
    export enum GFXPolygonMode {
        FILL = 0,
        POINT = 1,
        LINE = 2
    }
    export enum GFXShadeModel {
        GOURAND = 0,
        FLAT = 1
    }
    export enum GFXCullMode {
        NONE = 0,
        FRONT = 1,
        BACK = 2
    }
    export enum GFXComparisonFunc {
        NEVER = 0,
        LESS = 1,
        EQUAL = 2,
        LESS_EQUAL = 3,
        GREATER = 4,
        NOT_EQUAL = 5,
        GREATER_EQUAL = 6,
        ALWAYS = 7
    }
    export enum GFXStencilOp {
        ZERO = 0,
        KEEP = 1,
        REPLACE = 2,
        INCR = 3,
        DECR = 4,
        INVERT = 5,
        INCR_WRAP = 6,
        DECR_WRAP = 7
    }
    export enum GFXBlendOp {
        ADD = 0,
        SUB = 1,
        REV_SUB = 2,
        MIN = 3,
        MAX = 4
    }
    export enum GFXBlendFactor {
        ZERO = 0,
        ONE = 1,
        SRC_ALPHA = 2,
        DST_ALPHA = 3,
        ONE_MINUS_SRC_ALPHA = 4,
        ONE_MINUS_DST_ALPHA = 5,
        SRC_COLOR = 6,
        DST_COLOR = 7,
        ONE_MINUS_SRC_COLOR = 8,
        ONE_MINUS_DST_COLOR = 9,
        SRC_ALPHA_SATURATE = 10,
        CONSTANT_COLOR = 11,
        ONE_MINUS_CONSTANT_COLOR = 12,
        CONSTANT_ALPHA = 13,
        ONE_MINUS_CONSTANT_ALPHA = 14
    }
    export enum GFXColorMask {
        NONE = 0,
        R = 1,
        G = 2,
        B = 4,
        A = 8,
        ALL = 15
    }
    export enum GFXFilter {
        NONE = 0,
        POINT = 1,
        LINEAR = 2,
        ANISOTROPIC = 3
    }
    export enum GFXAddress {
        WRAP = 0,
        MIRROR = 1,
        CLAMP = 2,
        BORDER = 3
    }
    export enum GFXTextureType {
        TEX1D = 0,
        TEX2D = 1,
        TEX3D = 2
    }
    export enum GFXTextureUsageBit {
        NONE = 0,
        TRANSFER_SRC = 1,
        TRANSFER_DST = 2,
        SAMPLED = 4,
        STORAGE = 8,
        COLOR_ATTACHMENT = 16,
        DEPTH_STENCIL_ATTACHMENT = 32,
        TRANSIENT_ATTACHMENT = 64,
        INPUT_ATTACHMENT = 128
    }
    export type GFXTextureUsage = GFXTextureUsageBit;
    export enum GFXSampleCount {
        X1 = 0,
        X2 = 1,
        X4 = 2,
        X8 = 3,
        X16 = 4,
        X32 = 5,
        X64 = 6
    }
    export enum GFXTextureFlagBit {
        NONE = 0,
        GEN_MIPMAP = 1,
        CUBEMAP = 2,
        BAKUP_BUFFER = 4
    }
    export type GFXTextureFlags = GFXTextureFlagBit;
    export enum GFXTextureViewType {
        TV1D = 0,
        TV2D = 1,
        TV3D = 2,
        CUBE = 3,
        TV1D_ARRAY = 4,
        TV2D_ARRAY = 5
    }
    export enum GFXShaderType {
        VERTEX = 0,
        HULL = 1,
        DOMAIN = 2,
        GEOMETRY = 3,
        FRAGMENT = 4,
        COMPUTE = 5,
        COUNT = 6
    }
    export enum GFXBindingType {
        UNKNOWN = 0,
        UNIFORM_BUFFER = 1,
        SAMPLER = 2,
        STORAGE_BUFFER = 3
    }
    export enum GFXCommandBufferType {
        PRIMARY = 0,
        SECONDARY = 1
    }
    export enum GFXLoadOp {
        LOAD = 0,
        CLEAR = 1,
        DISCARD = 2
    }
    export enum GFXStoreOp {
        STORE = 0,
        DISCARD = 1
    }
    export enum GFXTextureLayout {
        UNDEFINED = 0,
        GENERAL = 1,
        COLOR_ATTACHMENT_OPTIMAL = 2,
        DEPTH_STENCIL_ATTACHMENT_OPTIMAL = 3,
        DEPTH_STENCIL_READONLY_OPTIMAL = 4,
        SHADER_READONLY_OPTIMAL = 5,
        TRANSFER_SRC_OPTIMAL = 6,
        TRANSFER_DST_OPTIMAL = 7,
        PREINITIALIZED = 8,
        PRESENT_SRC = 9
    }
    export enum GFXPipelineBindPoint {
        GRAPHICS = 0,
        COMPUTE = 1,
        RAY_TRACING = 2
    }
    export enum GFXDynamicState {
        VIEWPORT = 0,
        SCISSOR = 1,
        LINE_WIDTH = 2,
        DEPTH_BIAS = 3,
        BLEND_CONSTANTS = 4,
        DEPTH_BOUNDS = 5,
        STENCIL_WRITE_MASK = 6,
        STENCIL_COMPARE_MASK = 7
    }
    export enum GFXStencilFace {
        FRONT = 0,
        BACK = 1,
        ALL = 2
    }
    export enum GFXQueueType {
        GRAPHICS = 0,
        COMPUTE = 1,
        TRANSFER = 2
    }
    export interface IGFXRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    export interface IGFXViewport {
        left: number;
        top: number;
        width: number;
        height: number;
        minDepth: number;
        maxDepth: number;
    }
    export interface IGFXColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    export enum GFXClearFlag {
        NONE = 0,
        COLOR = 1,
        DEPTH = 2,
        STENCIL = 4,
        DEPTH_STENCIL = 6,
        ALL = 7
    }
    export interface IGFXOffset {
        x: number;
        y: number;
        z: number;
    }
    export interface IGFXExtent {
        width: number;
        height: number;
        depth: number;
    }
    export class GFXTextureSubres {
        baseMipLevel: number;
        levelCount: number;
        baseArrayLayer: number;
        layerCount: number;
    }
    export class GFXTextureCopy {
        srcSubres: GFXTextureSubres;
        srcOffset: IGFXOffset;
        dstSubres: GFXTextureSubres;
        dstOffset: IGFXOffset;
        extent: IGFXExtent;
    }
    export class GFXBufferTextureCopy {
        buffOffset: number;
        buffStride: number;
        buffTexHeight: number;
        texOffset: IGFXOffset;
        texExtent: IGFXExtent;
        texSubres: GFXTextureSubres;
    }
    export enum GFXFormatType {
        NONE = 0,
        UNORM = 1,
        SNORM = 2,
        UINT = 3,
        INT = 4,
        UFLOAT = 5,
        FLOAT = 6
    }
    export interface IGFXFormatInfo {
        name: string;
        size: number;
        count: number;
        type: GFXFormatType;
        hasAlpha: boolean;
        hasDepth: boolean;
        hasStencil: boolean;
        isCompressed: boolean;
    }
    export interface IGFXMemoryStatus {
        bufferSize: number;
        textureSize: number;
    }
    export const GFXFormatInfos: IGFXFormatInfo[];
    export enum GFXAPI {
        UNKNOWN = 0,
        WEBGL = 1,
        WEBGL2 = 2
    }
    export enum GFXFeature {
        COLOR_FLOAT = 0,
        COLOR_HALF_FLOAT = 1,
        TEXTURE_FLOAT = 2,
        TEXTURE_HALF_FLOAT = 3,
        TEXTURE_FLOAT_LINEAR = 4,
        TEXTURE_HALF_FLOAT_LINEAR = 5,
        FORMAT_R11G11B10F = 6,
        FORMAT_D24S8 = 7,
        FORMAT_ETC1 = 8,
        FORMAT_ETC2 = 9,
        FORMAT_DXT = 10,
        FORMAT_PVRTC = 11,
        FORMAT_ASTC = 12,
        MSAA = 13,
        ELEMENT_INDEX_UINT = 14,
        INSTANCED_ARRAYS = 15,
        COUNT = 16
    }
    export interface IGFXDeviceInfo {
        canvasElm: HTMLElement;
        isAntialias?: boolean;
        isPremultipliedAlpha?: boolean;
        debug?: boolean;
        devicePixelRatio?: number;
        nativeWidth?: number;
        nativeHeight?: number;
    }
    /**
     * @en GFX Device.
     * @zh GFX 设备。
     */
    export abstract class GFXDevice {
        get canvas(): HTMLCanvasElement;
        get canvas2D(): HTMLCanvasElement;
        get gfxAPI(): GFXAPI;
        get queue(): GFXQueue;
        get devicePixelRatio(): number;
        get width(): number;
        get height(): number;
        get nativeWidth(): number;
        get nativeHeight(): number;
        get mainWindow(): GFXWindow;
        get commandAllocator(): GFXCommandAllocator;
        get renderer(): string;
        get vendor(): string;
        get maxVertexAttributes(): number;
        get maxVertexUniformVectors(): number;
        get maxFragmentUniformVectors(): number;
        get maxTextureUnits(): number;
        get maxVertexTextureUnits(): number;
        get maxUniformBufferBindings(): number;
        get maxUniformBlockSize(): number;
        get maxTextureSize(): number;
        get maxCubeMapTextureSize(): number;
        get depthBits(): number;
        get stencilBits(): number;
        get colorFormat(): GFXFormat;
        get depthStencilFormat(): GFXFormat;
        get macros(): Map<string, string>;
        get numDrawCalls(): number;
        get numInstances(): number;
        get numTris(): number;
        get memoryStatus(): IGFXMemoryStatus;
        get reverseCW(): boolean;
        set reverseCW(val: boolean);
        protected _canvas: HTMLCanvasElement | null;
        protected _canvas2D: HTMLCanvasElement | null;
        protected _gfxAPI: GFXAPI;
        protected _deviceName: string;
        protected _renderer: string;
        protected _vendor: string;
        protected _version: string;
        protected _features: boolean[];
        protected _queue: GFXQueue | null;
        protected _devicePixelRatio: number;
        protected _width: number;
        protected _height: number;
        protected _nativeWidth: number;
        protected _nativeHeight: number;
        protected _mainWindow: GFXWindow | null;
        protected _cmdAllocator: GFXCommandAllocator | null;
        protected _maxVertexAttributes: number;
        protected _maxVertexUniformVectors: number;
        protected _maxFragmentUniformVectors: number;
        protected _maxTextureUnits: number;
        protected _maxVertexTextureUnits: number;
        protected _maxUniformBufferBindings: number;
        protected _maxUniformBlockSize: number;
        protected _maxTextureSize: number;
        protected _maxCubeMapTextureSize: number;
        protected _depthBits: number;
        protected _stencilBits: number;
        protected _colorFmt: GFXFormat;
        protected _depthStencilFmt: GFXFormat;
        protected _reverseCW: boolean;
        protected _shaderIdGen: number;
        protected _macros: Map<string, string>;
        protected _numDrawCalls: number;
        protected _numInstances: number;
        protected _numTris: number;
        protected _memoryStatus: IGFXMemoryStatus;
        abstract initialize(info: IGFXDeviceInfo): boolean;
        abstract destroy(): void;
        /**
         * @en Resize the device.
         * @zh 重置设备大小。
         * @param width The device width.
         * @param height The device height.
         */
        abstract resize(width: number, height: number): void;
        /**
         * @en Create buffer.
         * @zh 创建缓冲。
         * @param info GFX buffer description info.
         */
        abstract createBuffer(info: IGFXBufferInfo): GFXBuffer;
        /**
         * @en Create texture.
         * @zh 创建纹理。
         * @param info GFX texture description info.
         */
        abstract createTexture(info: IGFXTextureInfo): GFXTexture;
        /**
         * @en Create texture view.
         * @zh 创建纹理视图。
         * @param info GFX texture view description info.
         */
        abstract createTextureView(info: IGFXTextureViewInfo): GFXTextureView;
        /**
         * @en Create sampler.
         * @zh 创建采样器。
         * @param info GFX sampler description info.
         */
        abstract createSampler(info: IGFXSamplerInfo): GFXSampler;
        /**
         * @en Create binding layout.
         * @zh 创建绑定布局。
         * @param info GFX binding layout description info.
         */
        abstract createBindingLayout(info: IGFXBindingLayoutInfo): GFXBindingLayout;
        /**
         * @en Create shader.
         * @zh 创建着色器。
         * @param info GFX shader description info.
         */
        abstract createShader(info: IGFXShaderInfo): GFXShader;
        /**
         * @en Create input assembler.
         * @zh 创建纹理。
         * @param info GFX input assembler description info.
         */
        abstract createInputAssembler(info: IGFXInputAssemblerInfo): GFXInputAssembler;
        /**
         * @en Create render pass.
         * @zh 创建渲染过程。
         * @param info GFX render pass description info.
         */
        abstract createRenderPass(info: IGFXRenderPassInfo): GFXRenderPass;
        /**
         * @en Create frame buffer.
         * @zh 创建帧缓冲。
         * @param info GFX frame buffer description info.
         */
        abstract createFramebuffer(info: IGFXFramebufferInfo): GFXFramebuffer;
        /**
         * @en Create pipeline layout.
         * @zh 创建管线布局。
         * @param info GFX pipeline layout description info.
         */
        abstract createPipelineLayout(info: IGFXPipelineLayoutInfo): GFXPipelineLayout;
        /**
         * @en Create pipeline state.
         * @zh 创建管线状态。
         * @param info GFX pipeline state description info.
         */
        abstract createPipelineState(info: IGFXPipelineStateInfo): GFXPipelineState;
        /**
         * @en Create command allocator.
         * @zh 创建命令分配器。
         * @param info GFX command allocator description info.
         */
        abstract createCommandAllocator(info: IGFXCommandAllocatorInfo): GFXCommandAllocator;
        /**
         * @en Create command buffer.
         * @zh 创建命令缓冲。
         * @param info GFX command buffer description info.
         */
        abstract createCommandBuffer(info: IGFXCommandBufferInfo): GFXCommandBuffer;
        /**
         * @en Create queue.
         * @zh 创建队列。
         * @param info GFX queue description info.
         */
        abstract createQueue(info: IGFXQueueInfo): GFXQueue;
        /**
         * @en Create window.
         * @zh 创建窗口。
         * @param info GFX window description info.
         */
        abstract createWindow(info: IGFXWindowInfo): GFXWindow;
        /**
         * @en Present current frame.
         * @zh 呈现当前帧。
         */
        abstract present(): void;
        /**
         * @en Copy buffers to texture.
         * @zh 拷贝缓冲到纹理。
         * @param buffers The buffers to be copied.
         * @param texture The texture to copy to.
         * @param regions The region descriptions.
         */
        abstract copyBuffersToTexture(buffers: ArrayBufferView[], texture: GFXTexture, regions: GFXBufferTextureCopy[]): void;
        /**
         * @en Copy texture images to texture.
         * @zh 拷贝图像到纹理。
         * @param texImages The texture to be copied.
         * @param texture The texture to copy to.
         * @param regions The region descriptions.
         */
        abstract copyTexImagesToTexture(texImages: TexImageSource[], texture: GFXTexture, regions: GFXBufferTextureCopy[]): void;
        /**
         * @en Copy frame buffer to buffer.
         * @zh 拷贝帧缓冲到缓冲。
         * @param srcFramebuffer The frame buffer to be copied.
         * @param dstBuffer The buffer to copy to.
         * @param regions The region descriptions.
         */
        abstract copyFramebufferToBuffer(srcFramebuffer: GFXFramebuffer, dstBuffer: ArrayBuffer, regions: GFXBufferTextureCopy[]): void;
        /**
         * @en Blit frame buffers.
         * @zh 填充帧缓冲。
         * @param src The source frame buffer.
         * @param dst The destination frame buffer.
         * @param srcRect The source region.
         * @param dstRect The target region.
         * @param filter Filtering mode for the process.
         */
        abstract blitFramebuffer(src: GFXFramebuffer, dst: GFXFramebuffer, srcRect: IGFXRect, dstRect: IGFXRect, filter: GFXFilter): void;
        /**
         * @en Whether the device has specific feature.
         * @zh 是否具备特性。
         * @param feature The GFX feature to be queried.
         */
        hasFeature(feature: GFXFeature): boolean;
        /**
         * @en Generate shader ID.
         * @zh 生成 Shader ID。
         */
        genShaderId(): number;
        /**
         * @en Define a macro.
         * @zh 定义宏。
         * @param macro The macro name.
         * @param value The macro value.
         */
        defineMacro(macro: string, value?: string): void;
    }
    export interface IGFXFramebufferInfo {
        renderPass: GFXRenderPass;
        colorViews: GFXTextureView[];
        depthStencilView: GFXTextureView | null;
        isOffscreen?: boolean;
    }
    /**
     * @en GFX frame buffer.
     * @zh GFX 帧缓冲。
     */
    export abstract class GFXFramebuffer extends GFXObject {
        get renderPass(): GFXRenderPass | null;
        get colorViews(): GFXTextureView[];
        get depthStencilView(): GFXTextureView | null;
        get isOffscreen(): boolean;
        protected _device: GFXDevice;
        protected _renderPass: GFXRenderPass | null;
        protected _colorViews: GFXTextureView[];
        protected _depthStencilView: GFXTextureView | null;
        protected _isOffscreen: boolean;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXFramebufferInfo): boolean;
        abstract destroy(): void;
    }
    export interface IGFXAttribute {
        name: string;
        format: GFXFormat;
        isNormalized?: boolean;
        stream?: number;
        isInstanced?: boolean;
    }
    export interface IGFXInputAssemblerInfo {
        attributes: IGFXAttribute[];
        vertexBuffers: GFXBuffer[];
        indexBuffer?: GFXBuffer;
        indirectBuffer?: GFXBuffer;
    }
    /**
     * @en GFX input assembler.
     * @zh GFX 输入汇集器。
     */
    export abstract class GFXInputAssembler extends GFXObject {
        get vertexBuffers(): GFXBuffer[];
        get indexBuffer(): GFXBuffer | null;
        get attributes(): IGFXAttribute[];
        get vertexCount(): number;
        set vertexCount(count: number);
        get firstVertex(): number;
        set firstVertex(first: number);
        get indexCount(): number;
        set indexCount(count: number);
        get firstIndex(): number;
        set firstIndex(first: number);
        get vertexOffset(): number;
        set vertexOffset(offset: number);
        get instanceCount(): number;
        set instanceCount(count: number);
        get firstInstance(): number;
        set firstInstance(first: number);
        get isIndirect(): boolean;
        get indirectBuffer(): GFXBuffer | null;
        protected _device: GFXDevice;
        protected _attributes: IGFXAttribute[];
        protected _vertexBuffers: GFXBuffer[];
        protected _indexBuffer: GFXBuffer | null;
        protected _vertexCount: number;
        protected _firstVertex: number;
        protected _indexCount: number;
        protected _firstIndex: number;
        protected _vertexOffset: number;
        protected _instanceCount: number;
        protected _firstInstance: number;
        protected _isIndirect: boolean;
        protected _indirectBuffer: GFXBuffer | null;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXInputAssemblerInfo): boolean;
        abstract destroy(): void;
        /**
         * @en Get the specified vertex buffer.
         * @zh 获取顶点缓冲。
         * @param stream The stream index of the vertex buffer.
         */
        getVertexBuffer(stream?: number): GFXBuffer | null;
    }
    export interface IGFXPushConstantRange {
        shaderType: GFXShaderType;
        offset: number;
        count: number;
    }
    export interface IGFXPipelineLayoutInfo {
        pushConstantsRanges?: IGFXPushConstantRange[];
        layouts: GFXBindingLayout[];
    }
    export abstract class GFXPipelineLayout extends GFXObject {
        get layouts(): GFXBindingLayout[];
        protected _device: GFXDevice;
        protected _pushConstantsRanges: IGFXPushConstantRange[];
        protected _layouts: GFXBindingLayout[];
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXPipelineLayoutInfo): boolean;
        abstract destroy(): void;
    }
    /**
     * @en GFX rasterizer state.
     * @zh GFX 光栅化状态。
     */
    export class GFXRasterizerState {
        isDiscard: boolean;
        polygonMode: GFXPolygonMode;
        shadeModel: GFXShadeModel;
        cullMode: GFXCullMode;
        isFrontFaceCCW: boolean;
        depthBias: number;
        depthBiasClamp: number;
        depthBiasSlop: number;
        isDepthClip: boolean;
        isMultisample: boolean;
        lineWidth: number;
        compare(state: GFXRasterizerState): boolean;
    }
    /**
     * @en GFX depth stencil state.
     * @zh GFX 深度模板状态。
     */
    export class GFXDepthStencilState {
        depthTest: boolean;
        depthWrite: boolean;
        depthFunc: GFXComparisonFunc;
        stencilTestFront: boolean;
        stencilFuncFront: GFXComparisonFunc;
        stencilReadMaskFront: number;
        stencilWriteMaskFront: number;
        stencilFailOpFront: GFXStencilOp;
        stencilZFailOpFront: GFXStencilOp;
        stencilPassOpFront: GFXStencilOp;
        stencilRefFront: number;
        stencilTestBack: boolean;
        stencilFuncBack: GFXComparisonFunc;
        stencilReadMaskBack: number;
        stencilWriteMaskBack: number;
        stencilFailOpBack: GFXStencilOp;
        stencilZFailOpBack: GFXStencilOp;
        stencilPassOpBack: GFXStencilOp;
        stencilRefBack: number;
        compare(state: GFXDepthStencilState): boolean;
    }
    /**
     * @en GFX blend target.
     * @zh GFX 混合目标。
     */
    export class GFXBlendTarget {
        blend: boolean;
        blendSrc: GFXBlendFactor;
        blendDst: GFXBlendFactor;
        blendEq: GFXBlendOp;
        blendSrcAlpha: GFXBlendFactor;
        blendDstAlpha: GFXBlendFactor;
        blendAlphaEq: GFXBlendOp;
        blendColorMask: GFXColorMask;
        compare(target: GFXBlendTarget): boolean;
    }
    /**
     * @en GFX blend state.
     * @zh GFX混合状态。
     */
    export class GFXBlendState {
        isA2C: boolean;
        isIndepend: boolean;
        blendColor: number[];
        targets: GFXBlendTarget[];
    }
    /**
     * @en GFX input state.
     * @zh GFX 输入状态。
     */
    export class GFXInputState {
        attributes: IGFXAttribute[];
    }
    export interface IGFXPipelineStateInfo {
        primitive: GFXPrimitiveMode;
        shader: GFXShader;
        inputState: GFXInputState;
        rasterizerState: GFXRasterizerState;
        depthStencilState: GFXDepthStencilState;
        blendState: GFXBlendState;
        dynamicStates?: GFXDynamicState[];
        layout: GFXPipelineLayout;
        renderPass: GFXRenderPass;
        hash: number;
    }
    /**
     * @en GFX pipeline state.
     * @zh GFX 管线状态。
     */
    export abstract class GFXPipelineState extends GFXObject {
        get shader(): GFXShader;
        get primitive(): GFXPrimitiveMode;
        get rasterizerState(): GFXRasterizerState;
        get depthStencilState(): GFXDepthStencilState;
        get blendState(): GFXBlendState;
        get inputState(): GFXInputState;
        get dynamicStates(): GFXDynamicState[];
        get pipelineLayout(): GFXPipelineLayout;
        get renderPass(): GFXRenderPass;
        get hash(): number;
        protected _device: GFXDevice;
        protected _shader: GFXShader | null;
        protected _primitive: GFXPrimitiveMode;
        protected _is: GFXInputState | null;
        protected _rs: GFXRasterizerState | null;
        protected _dss: GFXDepthStencilState | null;
        protected _bs: GFXBlendState | null;
        protected _dynamicStates: GFXDynamicState[];
        protected _layout: GFXPipelineLayout | null;
        protected _renderPass: GFXRenderPass | null;
        protected _hash: number;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXPipelineStateInfo): boolean;
        abstract destroy(): void;
    }
    export interface IGFXQueueInfo {
        type: GFXQueueType;
    }
    /**
     * @en GFX Queue.
     * @zh GFX 队列。
     */
    export abstract class GFXQueue extends GFXObject {
        get type(): number;
        protected _device: GFXDevice;
        protected _type: GFXQueueType;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXQueueInfo): boolean;
        abstract destroy(): void;
        /**
         * @en Submit command buffers.
         * @zh 提交命令缓冲数组。
         * @param cmdBuffs The command buffers to be submitted.
         * @param fence The syncing fence.
         */
        abstract submit(cmdBuffs: GFXCommandBuffer[], fence?: any): void;
    }
    /**
     * @en Color attachment.
     * @zh GFX 颜色附件。
     */
    export class GFXColorAttachment {
        format: GFXFormat;
        loadOp: GFXLoadOp;
        storeOp: GFXStoreOp;
        sampleCount: number;
        beginLayout: GFXTextureLayout;
        endLayout: GFXTextureLayout;
    }
    /**
     * @en Depth stencil attachment.
     * @zh GFX 深度模板附件。
     */
    export class GFXDepthStencilAttachment {
        format: GFXFormat;
        depthLoadOp: GFXLoadOp;
        depthStoreOp: GFXStoreOp;
        stencilLoadOp: GFXLoadOp;
        stencilStoreOp: GFXStoreOp;
        sampleCount: number;
        beginLayout: GFXTextureLayout;
        endLayout: GFXTextureLayout;
    }
    export interface IGFXSubPassInfo {
        bindPoint: GFXPipelineBindPoint;
        inputs: number[];
        colors: number[];
        resolves: number[];
        depthStencil: number;
        preserves: number[];
    }
    export interface IGFXRenderPassInfo {
        colorAttachments?: GFXColorAttachment[];
        depthStencilAttachment?: GFXDepthStencilAttachment;
    }
    /**
     * @en GFX render pass.
     * @zh GFX 渲染过程。
     */
    export abstract class GFXRenderPass extends GFXObject {
        protected _device: GFXDevice;
        protected _colorInfos: GFXColorAttachment[];
        protected _depthStencilInfo: GFXDepthStencilAttachment | null;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXRenderPassInfo): boolean;
        abstract destroy(): void;
    }
    export interface IGFXSamplerInfo {
        name?: string;
        minFilter?: GFXFilter;
        magFilter?: GFXFilter;
        mipFilter?: GFXFilter;
        addressU?: GFXAddress;
        addressV?: GFXAddress;
        addressW?: GFXAddress;
        maxAnisotropy?: number;
        cmpFunc?: GFXComparisonFunc;
        borderColor?: IGFXColor;
        minLOD?: number;
        maxLOD?: number;
        mipLODBias?: number;
    }
    /**
     * @en GFX sampler state.
     * @zh GFX 采样器状态。
     */
    export class GFXSamplerState {
        name: string;
        minFilter: GFXFilter;
        magFilter: GFXFilter;
        mipFilter: GFXFilter;
        addressU: GFXAddress;
        addressV: GFXAddress;
        addressW: GFXAddress;
        maxAnisotropy: number;
        cmpFunc: GFXComparisonFunc;
        borderColor: IGFXColor;
        minLOD: number;
        maxLOD: number;
        mipLODBias: number;
        compare(state: GFXSamplerState): boolean;
    }
    /**
     * @en GFX sampler.
     * @zh GFX 采样器。
     */
    export abstract class GFXSampler extends GFXObject {
        get state(): GFXSamplerState;
        protected _device: GFXDevice;
        protected _state: GFXSamplerState;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXSamplerInfo): boolean;
        abstract destroy(): void;
    }
    export interface IGFXShaderMacro {
        macro: string;
        value: string;
    }
    export interface IGFXShaderStage {
        type: GFXShaderType;
        source: string;
        macros?: IGFXShaderMacro[];
    }
    /**
     * @en GFX uniform.
     * @zh GFX uniform。
     */
    export class GFXUniform {
        name: string;
        type: GFXType;
        count: number;
    }
    /**
     * @en GFX uniform block.
     * @zh GFX uniform 块。
     */
    export class GFXUniformBlock {
        binding: number;
        name: string;
        members: GFXUniform[];
    }
    /**
     * @en GFX uniform sampler.
     * @zh GFX Uniform 采样器。
     */
    export class GFXUniformSampler {
        binding: number;
        name: string;
        type: GFXType;
        count: number;
    }
    export interface IGFXShaderInfo {
        name: string;
        stages: IGFXShaderStage[];
        blocks?: GFXUniformBlock[];
        samplers?: GFXUniformSampler[];
    }
    /**
     * @en GFX shader.
     * @zh GFX 着色器。
     */
    export abstract class GFXShader extends GFXObject {
        get id(): number;
        get name(): string;
        protected _device: GFXDevice;
        protected _id: number;
        protected _name: string;
        protected _stages: IGFXShaderStage[];
        protected _blocks: GFXUniformBlock[];
        protected _samplers: GFXUniformSampler[];
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXShaderInfo): boolean;
        abstract destroy(): void;
    }
    export interface IGFXTextureViewInfo {
        texture: GFXTexture;
        type: GFXTextureViewType;
        format: GFXFormat;
        baseLevel?: number;
        levelCount?: number;
        baseLayer?: number;
        layerCount?: number;
    }
    /**
     * @en GFX texture view.
     * @zh GFX 纹理视图。
     */
    export abstract class GFXTextureView extends GFXObject {
        get texture(): GFXTexture;
        get type(): GFXTextureViewType;
        get format(): GFXFormat;
        get baseLevel(): number;
        get levelCount(): number;
        get baseLayer(): number;
        get layerCount(): number;
        protected _device: GFXDevice;
        protected _texture: GFXTexture | null;
        protected _type: GFXTextureViewType;
        protected _format: GFXFormat;
        protected _baseLevel: number;
        protected _levelCount: number;
        protected _baseLayer: number;
        protected _layerCount: number;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXTextureViewInfo): boolean;
        abstract destroy(): void;
    }
    export function IsPowerOf2(x: number): boolean;
    export interface IGFXTextureInfo {
        type: GFXTextureType;
        usage: GFXTextureUsage;
        format: GFXFormat;
        width: number;
        height: number;
        depth?: number;
        arrayLayer?: number;
        mipLevel?: number;
        samples?: GFXSampleCount;
        flags?: GFXTextureFlags;
    }
    /**
     * @en GFX texture.
     * @zh GFX 纹理。
     */
    export abstract class GFXTexture extends GFXObject {
        get type(): GFXTextureType;
        get usage(): GFXTextureUsage;
        get format(): GFXFormat;
        get width(): number;
        get height(): number;
        get depth(): number;
        get arrayLayer(): number;
        get mipLevel(): number;
        get samples(): GFXSampleCount;
        get flags(): GFXTextureFlags;
        get size(): number;
        get buffer(): ArrayBuffer | null;
        protected _device: GFXDevice;
        protected _type: GFXTextureType;
        protected _usage: GFXTextureUsage;
        protected _format: GFXFormat;
        protected _width: number;
        protected _height: number;
        protected _depth: number;
        protected _arrayLayer: number;
        protected _mipLevel: number;
        protected _samples: GFXSampleCount;
        protected _flags: GFXTextureFlags;
        protected _isPowerOf2: boolean;
        protected _size: number;
        protected _buffer: ArrayBuffer | null;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXTextureInfo): boolean;
        abstract destroy(): void;
        /**
         * @en Resize texture.
         * @zh 重置纹理大小。
         * @param width The new width.
         * @param height The new height.
         */
        abstract resize(width: number, height: number): void;
    }
    export interface IGFXWindowInfo {
        title?: string;
        left?: number;
        top?: number;
        width: number;
        height: number;
        colorFmt: GFXFormat;
        depthStencilFmt: GFXFormat;
        isOffscreen?: boolean;
    }
    /**
     * @en GFX window.
     * @zh GFX 窗口。
     */
    export abstract class GFXWindow extends GFXObject {
        get width(): number;
        get height(): number;
        get colorFormat(): GFXFormat;
        get detphStencilFormat(): GFXFormat;
        get isOffscreen(): boolean;
        get renderPass(): GFXRenderPass;
        get colorTexView(): GFXTextureView | null;
        get depthStencilTexView(): GFXTextureView | null;
        get framebuffer(): GFXFramebuffer;
        protected _device: GFXDevice;
        protected _title: string;
        protected _left: number;
        protected _top: number;
        protected _width: number;
        protected _height: number;
        protected _nativeWidth: number;
        protected _nativeHeight: number;
        protected _colorFmt: GFXFormat;
        protected _depthStencilFmt: GFXFormat;
        protected _isOffscreen: boolean;
        protected _renderPass: GFXRenderPass | null;
        protected _colorTex: GFXTexture | null;
        protected _colorTexView: GFXTextureView | null;
        protected _depthStencilTex: GFXTexture | null;
        protected _depthStencilTexView: GFXTextureView | null;
        protected _framebuffer: GFXFramebuffer | null;
        constructor(device: GFXDevice);
        abstract initialize(info: IGFXWindowInfo): boolean;
        abstract destroy(): void;
        /**
         * @en Resize window.
         * @zh 重置窗口大小。
         * @param width The new width.
         * @param height The new height.
         */
        abstract resize(width: number, height: number): void;
    }
    /**
     * @zh
     * 渲染过程阶段。
     */
    export enum RenderPassStage {
        DEFAULT = 100
    }
    export const JointUniformCapacity = 30;
    /**
     * @zh
     * 渲染流程。
     */
    export abstract class RenderPipeline {
        get root(): renderer.__private.cocos_core_root_Root;
        get device(): GFXDevice;
        get name(): string;
        get renderObjects(): renderer.__private.cocos_core_pipeline_define_IRenderObject[];
        get flows(): RenderFlow[];
        get activeFlows(): RenderFlow[];
        get usePostProcess(): boolean;
        get isHDRSupported(): boolean;
        get isHDR(): boolean;
        get shadingScale(): number;
        set lightMeterScale(scale: number);
        get lightMeterScale(): number;
        get useMSAA(): boolean;
        get useSMAA(): boolean;
        get quadIA(): GFXInputAssembler;
        get globalBindings(): Map<string, renderer.__private.cocos_core_pipeline_define_IInternalBindingInst>;
        get defaultTexture(): GFXTexture;
        get fpScale(): number;
        get fpScaleInv(): number;
        get macros(): renderer.IDefineMap;
        get defaultGlobalUBOData(): Float32Array;
        get currShading(): string;
        get prevShading(): string;
        get useDynamicBatching(): boolean;
        protected _root: renderer.__private.cocos_core_root_Root;
        protected _device: GFXDevice;
        protected _renderObjects: renderer.__private.cocos_core_pipeline_define_IRenderObject[];
        protected _flows: RenderFlow[];
        protected _activeFlows: RenderFlow[];
        protected _isHDRSupported: boolean;
        protected _isHDR: boolean;
        protected _lightMeterScale: number;
        protected _fboCount: number;
        protected _colorFmt: GFXFormat;
        protected _depthStencilFmt: GFXFormat;
        protected _shadingWidth: number;
        protected _shadingHeight: number;
        protected _shadingScale: number;
        protected _curIdx: string;
        protected _prevIdx: string;
        protected _usePostProcess: boolean;
        protected _useMSAA: boolean;
        protected _useSMAA: boolean;
        protected _quadVB: GFXBuffer | null;
        protected _quadIB: GFXBuffer | null;
        protected _quadIA: GFXInputAssembler | null;
        protected _uboGlobal: __private.cocos_core_pipeline_define_UBOGlobal;
        protected _globalBindings: Map<string, renderer.__private.cocos_core_pipeline_define_IInternalBindingInst>;
        protected _defaultTex: GFXTexture | null;
        protected _defaultTexView: GFXTextureView | null;
        protected _fpScale: number;
        protected _fpScaleInv: number;
        protected _macros: renderer.IDefineMap;
        protected _useDynamicBatching: boolean;
        protected renderTextures: __private.cocos_core_pipeline_pipeline_serialization_RenderTextureDesc[];
        protected framebuffers: __private.cocos_core_pipeline_pipeline_serialization_FrameBufferDesc[];
        protected renderPasses: __private.cocos_core_pipeline_pipeline_serialization_RenderPassDesc[];
        protected _renderTextures: Map<string, GFXTexture>;
        protected _textureViews: Map<string, GFXTextureView>;
        protected _frameBuffers: Map<string, GFXFramebuffer>;
        protected _renderPasses: Map<number, GFXRenderPass>;
        /**
         * 构造函数。
         * @param root Root类实例。
         */
        constructor();
        getTextureView(name: string): GFXTextureView | undefined;
        getRenderTexture(name: string): GFXTexture | undefined;
        getFrameBuffer(name: string): GFXFramebuffer | undefined;
        /**
         * @zh
         * 初始化函数，用于不从资源加载RenderPipeline的情况。
         * @param info 渲染管线描述信息。
         */
        initialize(info: __private.cocos_core_pipeline_render_pipeline_IRenderPipelineInfo): void;
        /**
         * 当RenderPipeline资源加载完成后，启用相应的flow
         * @param desc
         */
        activate(root: renderer.__private.cocos_core_root_Root): boolean;
        /**
         * @zh
         * 销毁函数。
         */
        abstract destroy(): any;
        /**
         * @zh
         * 渲染函数。
         * @param view 渲染视图。
         */
        render(view: RenderView): void;
        /**
         * @zh
         * 重构函数。
         */
        rebuild(): void;
        /**
         * @zh
         * 重置大小。
         * @param width 屏幕宽度。
         * @param height 屏幕高度。
         */
        resize(width: number, height: number): void;
        /**
         * @zh
         * 交换帧缓冲。
         */
        swapFBOs(): void;
        /**
         * @zh
         * 添加渲染过程。
         * @param stage 渲染阶段。
         * @param renderPass 渲染过程。
         */
        addRenderPass(stage: number, renderPass: GFXRenderPass): void;
        /**
         * @zh
         * 得到指定阶段的渲染过程。
         * @param stage 渲染阶段。
         */
        getRenderPass(stage: number): GFXRenderPass | null;
        /**
         * @zh
         * 移除指定阶段的渲染过程。
         * @param stage 渲染阶段。
         */
        removeRenderPass(stage: number): void;
        /**
         * @zh
         * 清空渲染过程。
         */
        clearRenderPasses(): void;
        /**
         * @zh
         * 销毁全部渲染流程。
         */
        destroyFlows(): void;
        /**
         * @zh
         * 得到指定名称的渲染流程。
         * @param name 名称。
         */
        getFlow(name: string): RenderFlow | null;
        /**
         * @zh
         * 更新宏定义。
         */
        updateMacros(): void;
        /**
         * @zh
         * 更新指定渲染视图的UBO。
         * @param view 渲染视图。
         */
        updateUBOs(view: RenderView): void;
        /**
         * @zh
         * 场景裁剪。
         * @param view 渲染视图。
         */
        sceneCulling(view: RenderView): void;
        protected _initRenderResource(): boolean;
        /**
         * @zh
         * 内部销毁函数。
         */
        protected _destroy(): void;
        /**
         * @zh
         * 重置帧缓冲大小。
         * @param width 屏幕宽度。
         * @param height 屏幕高度。
         */
        protected resizeFBOs(width: number, height: number): void;
        /**
         * @zh
         * 创建四边形输入汇集器。
         */
        protected createQuadInputAssembler(): boolean;
        /**
         * @zh
         * 销毁四边形输入汇集器。
         */
        protected destroyQuadInputAssembler(): void;
        /**
         * @zh
         * 创建所有UBO。
         */
        protected createUBOs(): boolean;
        /**
         * @zh
         * 销毁全部UBO。
         */
        protected destroyUBOs(): void;
        /**
         * @zh
         * 添加可见对象。
         * @param model 模型。
         * @param camera 相机。
         */
        protected addVisibleModel(model: renderer.Model, camera: renderer.Camera): void;
    }
    /**
     * @zh
     * 渲染流程。
     */
    export abstract class RenderFlow {
        get device(): GFXDevice;
        get pipeline(): RenderPipeline;
        get name(): string;
        get priority(): number;
        get stages(): RenderStage[];
        get material(): Material | null;
        get type(): __private.cocos_core_pipeline_pipeline_serialization_RenderFlowType;
        /**
         * @zh
         * GFX设备。
         */
        protected _device: GFXDevice | null;
        /**
         * @zh
         * 渲染管线。
         */
        protected _pipeline: RenderPipeline;
        /**
         * @zh
         * 名称。
         */
        protected _name: string;
        /**
         * @zh
         * 优先级。
         */
        protected _priority: number;
        /**
         * @zh
         * 材质。
         */
        protected _material: Material | null;
        protected _type: __private.cocos_core_pipeline_pipeline_serialization_RenderFlowType;
        /**
         * @zh
         * 渲染阶段数组。
         */
        protected _stages: RenderStage[];
        /**
         * 构造函数。
         * @param pipeline 渲染管线。
         */
        constructor();
        /**
         * @zh
         * 初始化函数。
         * @param info 渲染流程描述信息。
         */
        initialize(info: __private.cocos_core_pipeline_render_flow_IRenderFlowInfo): void;
        /**
         * 把序列化数据转换成运行时数据
         */
        activate(pipeline: RenderPipeline): void;
        /**
         * @zh
         * 销毁函数。
         */
        abstract destroy(): any;
        /**
         * @zh
         * 重构函数。
         */
        abstract rebuild(): any;
        /**
         * @zh
         * 重置大小。
         * @param width 屏幕宽度。
         * @param height 屏幕高度。
         */
        resize(width: number, height: number): void;
        /**
         * @zh
         * 渲染函数。
         * @param view 渲染视图。
         */
        render(view: RenderView): void;
        /**
         * @zh
         * 销毁全部渲染阶段。
         */
        destroyStages(): void;
        protected _activateStages(): void;
    }
    /**
     * @zh
     * 渲染阶段。
     */
    export abstract class RenderStage {
        get flow(): RenderFlow;
        get pipeline(): RenderPipeline;
        get priority(): number;
        get framebuffer(): GFXFramebuffer | null;
        /**
         * @zh
         * 名称。
         */
        protected _name: string;
        /**
         * @zh
         * 优先级。
         */
        protected _priority: number;
        protected frameBuffer: string;
        protected renderQueues: __private.cocos_core_pipeline_render_stage_RenderQueueDesc[];
        protected _renderQueues: __private.cocos_core_pipeline_render_queue_RenderQueue[];
        /**
         * @zh
         * 渲染流程。
         */
        protected _flow: RenderFlow;
        /**
         * @zh
         * 渲染管线。
         */
        protected _pipeline: RenderPipeline;
        /**
         * @zh
         * GFX设备。
         */
        protected _device: GFXDevice | null;
        /**
         * @zh
         * 渲染流程。
         */
        protected _framebuffer: GFXFramebuffer | null;
        /**
         * @zh
         * 命令缓冲。
         */
        protected _cmdBuff: GFXCommandBuffer | null;
        /**
         * @zh
         * 清空颜色数组。
         */
        protected _clearColors: IGFXColor[] | null;
        /**
         * @zh
         * 清空深度。
         */
        protected _clearDepth: number;
        /**
         * @zh
         * 清空模板。
         */
        protected _clearStencil: number;
        /**
         * @zh
         * 渲染区域。
         */
        protected _renderArea: IGFXRect | null;
        /**
         * @zh
         * 着色过程。
         */
        protected _pass: renderer.Pass | null;
        /**
         * @zh
         * GFX管线状态。
         */
        protected _pso: GFXPipelineState | null;
        /**
         * 构造函数。
         * @param flow 渲染流程。
         */
        constructor();
        /**
         * @zh
         * 初始化函数，用于不从资源加载RenderPipeline时使用。
         * @param info 渲染阶段描述信息。
         */
        initialize(info: __private.cocos_core_pipeline_render_stage_IRenderStageInfo): boolean;
        /**
         * 把序列化数据转换成运行时数据
         */
        activate(flow: RenderFlow): void;
        /**
         * @zh
         * 销毁函数。
         */
        abstract destroy(): any;
        /**
         * @zh
         * 渲染函数。
         * @param view 渲染视图。
         */
        abstract render(view: RenderView): any;
        /**
         * @zh
         * 重置大小。
         * @param width 屏幕宽度。
         * @param height 屏幕高度。
         */
        abstract resize(width: number, height: number): any;
        /**
         * @zh
         * 重构函数。
         */
        abstract rebuild(): any;
        /**
         * @zh
         * 设置清空颜色。
         */
        setClearColor(color: IGFXColor): void;
        /**
         * @zh
         * 设置清空颜色数组。
         */
        setClearColors(colors: IGFXColor[]): void;
        /**
         * @zh
         * 设置清空深度。
         */
        setClearDepth(depth: number): void;
        /**
         * @zh
         * 设置清空模板。
         */
        setClearStencil(stencil: number): void;
        /**
         * @zh
         * 设置渲染区域。
         */
        setRenderArea(width: number, height: number): void;
        sortRenderQueue(): void;
        executeCommandBuffer(view: RenderView): void;
        createCmdBuffer(): void;
        protected renderQueueClearFunc(rq: __private.cocos_core_pipeline_render_queue_RenderQueue): void;
        protected renderQueueSortFunc(rq: __private.cocos_core_pipeline_render_queue_RenderQueue): void;
    }
    /**
     * @zh
     * 渲染视图。
     */
    export class RenderView {
        get name(): string;
        get window(): GFXWindow | null;
        set window(val: GFXWindow | null);
        get priority(): number;
        set priority(val: number);
        set visibility(vis: number);
        get visibility(): number;
        get camera(): renderer.Camera;
        get isEnable(): boolean;
        get flows(): RenderFlow[];
        static registerCreateFunc(root: renderer.__private.cocos_core_root_Root): void;
        /**
         * @zh
         * 初始化函数。
         * @param info 渲染视图描述信息。
         */
        initialize(info: renderer.__private.cocos_core_pipeline_render_view_IRenderViewInfo): boolean;
        /**
         * @zh
         * 销毁函数。
         */
        destroy(): void;
        /**
         * @zh
         * 启用该渲染视图。
         */
        enable(isEnable: boolean): void;
        setExecuteFlows(flows: string[] | undefined): void;
    }
    /**
     * @zh
     * 前向渲染管线。
     */
    export class ForwardPipeline extends RenderPipeline {
        get lightsUBO(): GFXBuffer;
        static initInfo: __private.cocos_core_pipeline_render_pipeline_IRenderPipelineInfo;
        /**
         * @zh
         * 全部光源的UBO结构描述。
         */
        protected _uboLights: __private.cocos_core_pipeline_define_UBOForwardLight;
        /**
         * @zh
         * 全部光源的UBO缓冲。
         */
        protected _lightsUBO: GFXBuffer | null;
        /**
         * 构造函数。
         * @param root Root类实例。
         */
        constructor();
        initialize(info: __private.cocos_core_pipeline_render_pipeline_IRenderPipelineInfo): void;
        activate(root: renderer.__private.cocos_core_root_Root): boolean;
        /**
         * @zh
         * 销毁函数。
         */
        destroy(): void;
        /**
         * @zh
         * 重构函数。
         */
        rebuild(): void;
        /**
         * @zh
         * 更新UBO。
         */
        updateUBOs(view: RenderView): void;
        /**
         * @zh
         * 场景裁剪。
         * @param view 渲染视图。
         */
        sceneCulling(view: RenderView): void;
    }
    /**
     * @zh
     * 前向渲染流程。
     */
    export class ForwardFlow extends RenderFlow {
        static initInfo: __private.cocos_core_pipeline_render_flow_IRenderFlowInfo;
        /**
         * 构造函数。
         * @param pipeline 渲染管线。
         */
        constructor();
        initialize(info: __private.cocos_core_pipeline_render_flow_IRenderFlowInfo): void;
        render(view: RenderView): void;
        /**
         * @zh
         * 销毁函数。
         */
        destroy(): void;
        /**
         * @zh
         * 重构函数。
         */
        rebuild(): void;
    }
    /**
     * @zh
     * 前向渲染阶段。
     */
    export class ForwardStage extends RenderStage {
        static initInfo: __private.cocos_core_pipeline_render_stage_IRenderStageInfo;
        /**
         * 构造函数。
         * @param flow 渲染阶段。
         */
        constructor();
        activate(flow: RenderFlow): void;
        /**
         * @zh
         * 销毁函数。
         */
        destroy(): void;
        /**
         * @zh
         * 重置大小。
         * @param width 屏幕宽度。
         * @param height 屏幕高度。
         */
        resize(width: number, height: number): void;
        /**
         * @zh
         * 重构函数。
         */
        rebuild(): void;
        /**
         * @zh
         * 渲染函数。
         * @param view 渲染视图。
         */
        render(view: RenderView): void;
    }
    /**
     * @zh
     * 色调映射渲染流程。
     */
    export class ToneMapFlow extends RenderFlow {
        static initInfo: __private.cocos_core_pipeline_render_flow_IRenderFlowInfo;
        constructor();
        initialize(info: __private.cocos_core_pipeline_render_flow_IRenderFlowInfo): boolean;
        destroy(): void;
        rebuild(): void;
    }
    /**
     * @zh
     * 色调映射渲染阶段。
     *
     */
    export class ToneMapStage extends RenderStage {
        static initInfo: __private.cocos_core_pipeline_render_stage_IRenderStageInfo;
        constructor();
        activate(flow: RenderFlow): void;
        destroy(): void;
        resize(width: number, height: number): void;
        rebuild(): void;
        render(view: RenderView): void;
    }
    /**
     * 加载相关模块
     * @category loader
     */
    /**
     * @class url
     * @static
     */
    export let url: {
        /**
         * The base url of raw assets.
         * @property {Object} _rawAssets
         * @private
         * @readOnly
         */
        _rawAssets: string;
        normalize: (url: any) => any;
        /**
         * Returns the url of raw assets, you will only need this if the raw asset is inside the "resources" folder.
         *
         * @method raw
         * @param {String} url
         * @return {String}
         * @example {@link cocos/core/platform/url/raw.js}
         */
        raw: (url: any) => any;
        _init: (assets: any) => void;
    };
    /**
     * The downloader pipe, it can download several types of files:
     * 1. Text
     * 2. Image
     * 3. Script
     * 4. Audio
     * 5. Assets
     * All unknown type will be downloaded as plain text.
     * You can pass custom supported types in the constructor.
     * @class Pipeline.Downloader
     */
    /**
     * Constructor of Downloader, you can pass custom supported types.
     *
     * @method constructor
     * @param {Object} extMap Custom supported types with corresponded handler
     * @example
     * ```
     *  let downloader = new Downloader({
     *      // This will match all url with `.scene` extension or all url with `scene` type
     *      'scene' : function (url, callback) {}
     *  });
     * ```
     */
    export class Downloader implements __private.cocos_core_load_pipeline_pipeline_IPipe {
        static ID: string;
        static PackDownloader: typeof __private.cocos_core_load_pipeline_pack_downloader;
        id: string;
        async: boolean;
        pipeline: Pipeline | null;
        constructor(extMap?: any);
        setSubPackages(subPackages: any): void;
        /**
         * @en Add custom supported types handler or modify existing type handler.
         * @zh 添加自定义支持的类型处理程序或修改现有的类型处理程序。
         * @method addHandlers
         * @param {Object} extMap Custom supported types with corresponded handler
         */
        addHandlers(extMap: any): void;
        _handleLoadQueue(): void;
        handle(item: any, callback: any): undefined;
        /**
         * @en
         * Load subpackage with name.
         * @zh
         * 通过子包名加载子包代码。
         * @method loadSubpackage
         * @param {String} name - Subpackage name
         * @param {Function} [completeCallback] -  Callback invoked when subpackage loaded
         * @param {Error} completeCallback.error - error information
         */
        loadSubpackage(name: any, completeCallback: any): void;
    }
    /**
     * The loader pipe, it can load several types of files:
     * 1. Images
     * 2. JSON
     * 3. Plist
     * 4. Audio
     * 5. Font
     * 6. Cocos Creator scene
     * It will not interfere with items of unknown type.
     * You can pass custom supported types in the constructor.
     * @class Pipeline.Loader
     */
    /**
     * Constructor of Loader, you can pass custom supported types.
     *
     * @param {Object} extMap Custom supported types with corresponded handler
     * @example
     * ```
     * let loader = new Loader({
     *    // This will match all url with `.scene` extension or all url with `scene` type
     *    'scene' : function (url, callback) {}
     * });
     * ```
     */
    export class Loader implements __private.cocos_core_load_pipeline_pipeline_IPipe {
        static ID: string;
        id: string;
        async: boolean;
        pipeline: Pipeline | null;
        constructor(extMap?: any);
        /**
         * Add custom supported types handler or modify existing type handler.
         * @param {Object} extMap Custom supported types with corresponded handler
         */
        addHandlers(extMap?: any): void;
        handle(item: any, callback: any): any;
    }
    /**
     * @en
     * A pipeline describes a sequence of manipulations, each manipulation is called a pipe.<br/>
     * It's designed for loading process. so items should be urls, and the url will be the identity of each item during the process.<br/>
     * A list of items can flow in the pipeline and it will output the results of all pipes.<br/>
     * They flow in the pipeline like water in tubes, they go through pipe by pipe separately.<br/>
     * Finally all items will flow out the pipeline and the process is finished.
     *
     * @zh
     * pipeline 描述了一系列的操作，每个操作都被称为 pipe。<br/>
     * 它被设计来做加载过程的流程管理。所以 item 应该是 url，并且该 url 将是在处理中的每个 item 的身份标识。<br/>
     * 一个 item 列表可以在 pipeline 中流动，它将输出加载项经过所有 pipe 之后的结果。<br/>
     * 它们穿过 pipeline 就像水在管子里流动，将会按顺序流过每个 pipe。<br/>
     * 最后当所有加载项都流出 pipeline 时，整个加载流程就结束了。
     * @class Pipeline
     */
    export class Pipeline {
        static ItemState: any;
        protected _pipes: Array<__private.cocos_core_load_pipeline_pipeline_IPipe>;
        _cache: any;
        /**
         * 构造函数，通过一系列的 pipe 来构造一个新的 pipeline，pipes 将会在给定的顺序中被锁定。<br/>
         * 一个 pipe 就是一个对象，它包含了字符串类型的 ‘id’ 和 ‘handle’ 函数，在 pipeline 中 id 必须是唯一的。<br/>
         * 它还可以包括 ‘async’ 属性以确定它是否是一个异步过程。
         *
         * @param {Array} pipes
         * @example
         * ```
         *  let pipeline = new Pipeline([
         *      {
         *          id: 'Downloader',
         *          handle: function (item, callback) {},
         *          async: true
         *      },
         *      {id: 'Parser', handle: function (item) {}, async: false}
         *  ]);
         * ```
         */
        constructor(pipes: any);
        /**
         * @en
         * Insert a new pipe at the given index of the pipeline. <br/>
         * A pipe must contain an `id` in string and a `handle` function, the id must be unique in the pipeline.
         * @zh
         * 在给定的索引位置插入一个新的 pipe。<br/>
         * 一个 pipe 必须包含一个字符串类型的 ‘id’ 和 ‘handle’ 函数，该 id 在 pipeline 必须是唯一标识。
         * @method insertPipe
         * @param {Object} pipe The pipe to be inserted
         * @param {Number} index The index to insert
         */
        insertPipe(pipe: any, index: any): void;
        /**
         * @en
         * Insert a pipe to the end of an existing pipe. The existing pipe must be a valid pipe in the pipeline.
         * @zh
         * 在当前 pipeline 的一个已知 pipe 后面插入一个新的 pipe。
         * @method insertPipeAfter
         * @param {Object} refPipe An existing pipe in the pipeline.
         * @param {Object} newPipe The pipe to be inserted.
         */
        insertPipeAfter(refPipe: any, newPipe: any): void;
        /**
         * @en
         * Add a new pipe at the end of the pipeline. <br/>
         * A pipe must contain an `id` in string and a `handle` function, the id must be unique in the pipeline.
         * @zh
         * 添加一个新的 pipe 到 pipeline 尾部。 <br/>
         * 该 pipe 必须包含一个字符串类型 ‘id’ 和 ‘handle’ 函数，该 id 在 pipeline 必须是唯一标识。
         * @method appendPipe
         * @param {Object} pipe The pipe to be appended
         */
        appendPipe(pipe: any): void;
        /**
         * @en
         * Let new items flow into the pipeline. <br/>
         * Each item can be a simple url string or an object,
         * if it's an object, it must contain `id` property. <br/>
         * You can specify its type by `type` property, by default, the type is the extension name in url. <br/>
         * By adding a `skips` property including pipe ids, you can skip these pipe. <br/>
         * The object can contain any supplementary property as you want. <br/>
         * @zh
         * 让新的 item 流入 pipeline 中。<br/>
         * 这里的每个 item 可以是一个简单字符串类型的 url 或者是一个对象,
         * 如果它是一个对象的话，他必须要包含 ‘id’ 属性。<br/>
         * 你也可以指定它的 ‘type’ 属性类型，默认情况下，该类型是 ‘url’ 的后缀名。<br/>
         * 也通过添加一个 包含 ‘skips’ 属性的 item 对象，你就可以跳过 skips 中包含的 pipe。<br/>
         * 该对象可以包含任何附加属性。
         * @param {Array} items
         * @example
         * ```
         *  pipeline.flowIn([
         *      'res/Background.png',
         *      {
         *          id: 'res/scene.json',
         *          type: 'scene',
         *          name: 'scene',
         *          skips: ['Downloader']
         *      }
         *  ]);
         * ```
         */
        flowIn(items: any): void;
        /**
         * @en
         * Let new items flow into the pipeline and give a callback when the list of items are all completed. <br/>
         * This is for loading dependencies for an existing item in flow, usually used in a pipe logic. <br/>
         * For example, we have a loader for scene configuration file in JSON, the scene will only be fully loaded  <br/>
         * after all its dependencies are loaded, then you will need to use function to flow in all dependencies  <br/>
         * found in the configuration file, and finish the loader pipe only after all dependencies are loaded (in the callback).
         * @zh
         * 让新 items 流入 pipeline 并且当 item 列表完成时进行回调函数。<br/>
         * 这个 API 的使用通常是为了加载依赖项。<br/>
         * 例如：<br/>
         * 我们需要加载一个场景配置的 JSON 文件，该场景会将所有的依赖项全部都加载完毕以后，进行回调表示加载完毕。
         * @deprecated since v1.3
         * @param {Array} urlList
         * @param {Function} callback
         * @return {Array} Items accepted by the pipeline
         */
        flowInDeps(owner: any, urlList: any, callback: any): IItem[];
        flowOut(item: any): void;
        /**
         * @en
         * Copy the item states from one source item to all destination items. <br/>
         * It's quite useful when a pipe generate new items from one source item,<br/>
         * then you should flowIn these generated items into pipeline, <br/>
         * but you probably want them to skip all pipes the source item already go through,<br/>
         * you can achieve it with this API. <br/>
         * <br/>
         * For example, an unzip pipe will generate more items, but you won't want them to pass unzip or download pipe again.
         * @zh
         * 从一个源 item 向所有目标 item 复制它的 pipe 状态，用于避免重复通过部分 pipe。<br/>
         * 当一个源 item 生成了一系列新的 items 时很有用，<br/>
         * 你希望让这些新的依赖项进入 pipeline，但是又不希望它们通过源 item 已经经过的 pipe，<br/>
         * 但是你可能希望他们源 item 已经通过并跳过所有 pipes，<br/>
         * 这个时候就可以使用这个 API。
         * @method copyItemStates
         * @param {Object} srcItem The source item
         * @param {Array|Object} dstItems A single destination item or an array of destination items
         */
        copyItemStates(srcItem: any, dstItems: any): void;
        /**
         * @en Returns an item in pipeline.
         * @zh 根据 id 获取一个 item
         * @method getItem
         * @param {Object} id The id of the item
         * @return {Object}
         */
        getItem(id: any): any;
        /**
         * @en Removes an completed item in pipeline.
         * It will only remove the cache in the pipeline or loader, its dependencies won't be released.
         * cc.loader provided another method to completely cleanup the resource and its dependencies,
         * please refer to [[CCLoader.release]]
         * @zh 移除指定的已完成 item。
         * 这将仅仅从 pipeline 或者 loader 中删除其缓存，并不会释放它所依赖的资源。
         * cc.loader 中提供了另一种删除资源及其依赖的清理方法，请参考 [[CCLoader.release]]
         * @method removeItem
         * @param {Object} id The id of the item
         * @return {Boolean} succeed or not
         */
        removeItem(id: any): any;
        /**
         * @en Clear the current pipeline, this function will clean up the items.
         * @zh 清空当前 pipeline，该函数将清理 items。
         */
        clear(): void;
    }
    export const loader: __private.cocos_core_load_pipeline_CCLoader_CCLoader;
    export interface IItem {
        queueId: any;
        id: string;
        url: any;
        rawUrl: any;
        urlParam: any;
        type: string;
        error: Error | null;
        content: any;
        complete: boolean;
        states: object;
        deps: any;
        isScene: boolean;
    }
    /**
     * @en
     * LoadingItems is the queue of items which can flow them into the loading pipeline.<br/>
     * Please don't construct it directly, use [[create]] instead, because we use an internal pool to recycle the queues.<br/>
     * It hold a map of items, each entry in the map is a url to object key value pair.<br/>
     * Each item always contains the following property:<br/>
     * - id: The identification of the item, usually it's identical to url<br/>
     * - url: The url <br/>
     * - type: The type, it's the extension name of the url by default, could be specified manually too.<br/>
     * - error: The error happened in pipeline will be stored in this property.<br/>
     * - content: The content processed by the pipeline, the final result will also be stored in this property.<br/>
     * - complete: The flag indicate whether the item is completed by the pipeline.<br/>
     * - states: An object stores the states of each pipe the item go through, the state can be: Pipeline.ItemState.WORKING | Pipeline.ItemState.ERROR | Pipeline.ItemState.COMPLETE<br/>
     * <br/>
     * Item can hold other custom properties.<br/>
     * Each LoadingItems object will be destroyed for recycle after onComplete callback<br/>
     * So please don't hold its reference for later usage, you can copy properties in it though.
     * @zh
     * LoadingItems 是一个加载对象队列，可以用来输送加载对象到加载管线中。<br/>
     * 请不要直接使用 new 构造这个类的对象，你可以使用 [[create]] 来创建一个新的加载队列，这样可以允许我们的内部对象池回收并重利用加载队列。
     * 它有一个 map 属性用来存放加载项，在 map 对象中已 url 为 key 值。<br/>
     * 每个对象都会包含下列属性：<br/>
     * - id：该对象的标识，通常与 url 相同。<br/>
     * - url：路径 <br/>
     * - type: 类型，它这是默认的 URL 的扩展名，可以手动指定赋值。<br/>
     * - error：pipeline 中发生的错误将被保存在这个属性中。<br/>
     * - content: pipeline 中处理的临时结果，最终的结果也将被存储在这个属性中。<br/>
     * - complete：该标志表明该对象是否通过 pipeline 完成。<br/>
     * - states：该对象存储每个管道中对象经历的状态，状态可以是 Pipeline.ItemState.WORKING | Pipeline.ItemState.ERROR | Pipeline.ItemState.COMPLETE<br/>
     * <br/>
     * 对象可容纳其他自定义属性。<br/>
     * 每个 LoadingItems 对象都会在 onComplete 回调之后被销毁，所以请不要持有它的引用并在结束回调之后依赖它的内容执行任何逻辑，有这种需求的话你可以提前复制它的内容。
     *
     * @class LoadingItems
     * @extends CallbacksInvoker
     */
    export class LoadingItems extends __private.cocos_core_event_callbacks_invoker_CallbacksInvoker {
        /**
         * @en The item states of the LoadingItems, its value could be LoadingItems.ItemState.WORKING | LoadingItems.ItemState.COMPLETET | LoadingItems.ItemState.ERROR
         * @zh LoadingItems 队列中的加载项状态，状态的值可能是 LoadingItems.ItemState.WORKING | LoadingItems.ItemState.COMPLETET | LoadingItems.ItemState.ERROR
         * @enum LoadingItems.ItemState
         */
        /**
         * @property {Number} WORKING
         */
        /**
         * @property {Number} COMPLETET
         */
        /**
         * @property {Number} ERROR
         */
        static ItemState: any;
        /**
         * @en This is a callback which will be invoked while an item flow out the pipeline.
         * You can pass the callback function in LoadingItems.create or set it later.
         * @zh 这个回调函数将在 item 加载结束后被调用。你可以在构造时传递这个回调函数或者是在构造之后直接设置。
         * @method onProgress
         * @param {Number} completedCount The number of the items that are already completed.
         * @param {Number} totalCount The total number of the items.
         * @param {Object} item The latest item which flow out the pipeline.
         * @example
         * ```
         *  loadingItems.onProgress (completedCount, totalCount, item) {
         *      let progress = (100 * completedCount / totalCount).toFixed(2);
         *      cc.log(progress + '%');
         *  }
         * ```
         */
        onProgress: Function | undefined;
        /**
         * @en This is a callback which will be invoked while all items is completed,
         * You can pass the callback function in LoadingItems.create or set it later.
         * @zh 该函数将在加载队列全部完成时被调用。你可以在构造时传递这个回调函数或者是在构造之后直接设置。
         * @method onComplete
         * @param {Array} errors All errored urls will be stored in this array, if no error happened, then it will be null
         * @param {LoadingItems} items All items.
         * @example
         * ```
         *  loadingItems.onComplete (errors, items) {
         *      if (error)
         *          cc.log('Completed with ' + errors.length + ' errors');
         *      else
         *          cc.log('Completed ' + items.totalCount + ' items');
         *  }
         * ```
         */
        onComplete: Function | undefined;
        /**
         * @en The map of all items.
         * @zh 存储所有加载项的对象。
         * @property map
         * @type {Object}
         */
        map: any;
        /**
         * @en The map of completed items.
         * @zh 存储已经完成的加载项。
         * @property completed
         * @type {Object}
         */
        completed: {};
        /**
         * @en Total count of all items.
         * @zh 所有加载项的总数。
         * @property totalCount
         * @type {Number}
         */
        totalCount: number;
        /**
         * @en Total count of completed items.
         * @zh 所有完成加载项的总数。
         * @property completedCount
         * @type {Number}
         */
        completedCount: number;
        /**
         * @en Activated or not.
         * @zh 是否启用。
         * @property active
         * @type {Boolean}
         */
        active: boolean;
        _ownerQueue: null;
        constructor(pipeline: any, urlList: any, onProgress: any, onComplete: any);
        /**
         * @en The constructor function of LoadingItems, this will use recycled LoadingItems in the internal pool if possible.
         * You can pass onProgress and onComplete callbacks to visualize the loading process.
         * @zh LoadingItems 的构造函数，这种构造方式会重用内部对象缓冲池中的 LoadingItems 队列，以尽量避免对象创建。
         * 你可以传递 onProgress 和 onComplete 回调函数来获知加载进度信息。
         * @method create
         * @static
         * @param {Pipeline} pipeline The pipeline to process the queue.
         * @param {Array} urlList The items array.
         * @param {Function} [onProgress] The progression callback, refer to [[onProgress]]
         * @param {Function} [onComplete] The completion callback, refer to [[LoadingItems.onComplete]]
         * @return {LoadingItems} The LoadingItems queue object
         * @example
         * ```
         *  cc.LoadingItems.create(cc.loader, ['a.png', 'b.plist'], function (completedCount, totalCount, item) {
         *      let progress = (100 * completedCount / totalCount).toFixed(2);
         *      cc.log(progress + '%');
         *  }, function (errors, items) {
         *      if (errors) {
         *          for (let i = 0; i < errors.length; ++i) {
         *              cc.log('Error url: ' + errors[i] + ', error: ' + items.getError(errors[i]));
         *          }
         *      }
         *      else {
         *          let result_a = items.getContent('a.png');
         *          // ...
         *      }
         *  })
         * ```
         */
        static create(pipeline: any, urlList: any, onProgress?: any, onComplete?: any): LoadingItems;
        /**
         * @en Retrieve the LoadingItems queue object for an item.
         * @zh 通过 item 对象获取它的 LoadingItems 队列。
         * @method getQueue
         * @static
         * @param {Object} item The item to query
         * @return {LoadingItems} The LoadingItems queue object
         */
        static getQueue(item: any): any;
        /**
         * @en Complete an item in the LoadingItems queue, please do not call this method unless you know what's happening.
         * @zh 通知 LoadingItems 队列一个 item 对象已完成，请不要调用这个函数，除非你知道自己在做什么。
         * @method itemComplete
         * @param {Object} item The item which has completed
         */
        static itemComplete(item: any): void;
        static initQueueDeps(queue: any): void;
        static registerQueueDep(owner: any, depId: any): false | undefined;
        static finishDep(depId: any): void;
        /**
         * @en Add urls to the LoadingItems queue.
         * @zh 向一个 LoadingItems 队列添加加载项。
         * @method append
         * @param {Array} urlList 要追加的url列表，url可以是对象或字符串
         * @param {any} [owner]
         * @return {Array} 在已接受的url列表中，可以拒绝某些无效项
         */
        append(urlList: any, owner?: any): IItem[];
        _childOnProgress(item: any): void;
        /**
         * @en Complete a LoadingItems queue, please do not call this method unless you know what's happening.
         * @zh 完成一个 LoadingItems 队列，请不要调用这个函数，除非你知道自己在做什么。
         * @method allComplete
         */
        allComplete(): void;
        /**
         * @en Check whether all items are completed.
         * @zh 检查是否所有加载项都已经完成。
         * @method isCompleted
         * @return {Boolean}
         */
        isCompleted(): boolean;
        /**
         * @en Check whether an item is completed.
         * @zh 通过 id 检查指定加载项是否已经加载完成。
         * @method isItemCompleted
         * @param {String} id The item's id.
         * @return {Boolean}
         */
        isItemCompleted(id: any): boolean;
        /**
         * @en Check whether an item exists.
         * @zh 通过 id 检查加载项是否存在。
         * @method exists
         * @param {String} id The item's id.
         * @return {Boolean}
         */
        exists(id: any): boolean;
        /**
         * @en Returns the content of an internal item.
         * @zh 通过 id 获取指定对象的内容。
         * @method getContent
         * @param {String} id The item's id.
         * @return {Object}
         */
        getContent(id: any): null;
        /**
         * @en Returns the error of an internal item.
         * @zh 通过 id 获取指定对象的错误信息。
         * @method getError
         * @param {String} id The item's id.
         * @return {Object}
         */
        getError(id: any): null;
        /**
         * @en Remove an item, can only remove completed item, ongoing item can not be removed.
         * @zh 移除加载项，这里只会移除已经完成的加载项，正在进行的加载项将不能被删除。
         * @param {String} url
         */
        removeItem(url: any): void;
        /**
         * @en Complete an item in the LoadingItems queue, please do not call this method unless you know what's happening.
         * @zh 通知 LoadingItems 队列一个 item 对象已完成，请不要调用这个函数，除非你知道自己在做什么。
         * @method itemComplete
         * @param {String} id The item url
         */
        itemComplete(id: any): void;
        /**
         * @en Destroy the LoadingItems queue, the queue object won't be garbage collected, it will be recycled, so every after destroy is not reliable.
         * @zh 销毁一个 LoadingItems 队列，这个队列对象会被内部缓冲池回收，所以销毁后的所有内部信息都是不可依赖的。
         * @method destroy
         */
        destroy(): void;
        /**
         * @en Add a listener for an item, the callback will be invoked when the item is completed.
         * @zh 监听加载项（通过 key 指定）的完成事件。
         * @method addListener
         * @param {String} key
         * @param {Function} callback - can be null
         * @param {Object} target - can be null
         * @return {Boolean} whether the key is new
         */
        addListener(key: any, callback: any, target: any): void;
        /**
         * @en
         * Check if the specified key has any registered callback.
         * If a callback is also specified, it will only return true if the callback is registered.
         * @zh
         * 检查指定的加载项是否有完成事件监听器。
         * 如果同时还指定了一个回调方法，并且回调有注册，它只会返回 true。
         * @method hasListener
         * @param {String} key
         * @param {Function} [callback]
         * @param {Object} [target]
         * @return {Boolean}
         */
        hasListener(key: any, callback?: any, target?: any): boolean;
        /**
         * @en
         * Removes a listener.
         * It will only remove when key, callback, target all match correctly.
         * @zh
         * 移除指定加载项已经注册的完成事件监听器。
         * 只会删除 key, callback, target 均匹配的监听器。
         * @method remove
         * @param {String} key
         * @param {Function} callback
         * @param {Object} target
         * @return {Boolean} removed
         */
        removeListener(key: any, callback?: any, target?: any): void;
        /**
         * @en
         * Removes all callbacks registered in a certain event
         * type or all callbacks registered with a certain target.
         * @zh 删除指定目标的所有完成事件监听器。
         * @method removeAllListeners
         * @param {String|Object} key - The event key to be removed or the target to be removed
         */
        removeAllListeners(key: any): void;
    }
    /**
     * @category loader
     */
    export type LoadCompleteCallback<T> = (error: Error | null | undefined, asset?: T) => void;
    export type LoadProgressCallback = (completedCount: number, totalCount: number, item: any) => void;
    /**
     * A base node for CCNode, it will:
     * - maintain scene hierarchy and active logic
     * - notifications if some properties changed
     * - define some interfaces shares between CCNode
     * - define machanisms for Enity Component Systems
     * - define prefab and serialize functions
     *
     * @class _BaseNode
     * @extends Object
     * @uses EventTarget
     * @method constructor
     * @param {String} [name]
     * @protected
     */
    export class BaseNode extends CCObject implements ISchedulable {
        get components(): ReadonlyArray<Component>;
        get _persistNode(): boolean;
        set _persistNode(value: boolean);
        get name(): string;
        set name(value: string);
        get uuid(): string;
        get children(): this[];
        get active(): boolean;
        set active(isActive: boolean);
        get activeInHierarchy(): boolean;
        get parent(): this | null;
        set parent(value: this | null);
        get scene(): any;
        get eventProcessor(): __private.cocos_core_scene_graph_node_event_processor_NodeEventProcessor;
        static _setScene(node: BaseNode): void;
        protected static idGenerator: js.IDGenerator;
        protected static _stacks: Array<Array<(BaseNode | null)>>;
        protected static _stackId: number;
        protected static _findComponent(node: BaseNode, constructor: Function): Component | null;
        protected static _findComponents(node: BaseNode, constructor: Function, components: Component[]): void;
        protected static _findChildComponent(children: BaseNode[], constructor: any): any;
        protected static _findChildComponents(children: BaseNode[], constructor: any, components: any): void;
        protected _parent: this | null;
        protected _children: this[];
        protected _active: boolean;
        /**
         * @default []
         * @readOnly
         */
        protected _components: Component[];
        /**
         * The PrefabInfo object
         * @type {PrefabInfo}
         */
        protected _prefab: any;
        /**
         * @en which scene this node belongs to.
         * @zh 此节点属于哪个场景。
         * @type {cc.Scene}}
         */
        protected _scene: any;
        protected _activeInHierarchy: boolean;
        protected _id: string;
        protected _name: string;
        protected _eventProcessor: __private.cocos_core_scene_graph_node_event_processor_NodeEventProcessor;
        protected _eventMask: number;
        /**
         * Register all related EventTargets,
         * all event callbacks will be removed in _onPreDestroy
         * protected __eventTargets: EventTarget[] = [];
         */
        protected __eventTargets: any[];
        protected _siblingIndex: number;
        protected _registerIfAttached: ((this: BaseNode, register: any) => void) | undefined;
        /**
         * @method constructor
         * @param {String} [name]
         */
        constructor(name?: string);
        /**
         * @en
         * Properties configuration function <br/>
         * All properties in attrs will be set to the node, <br/>
         * when the setter of the node is available, <br/>
         * the property will be set via setter function.<br/>
         * @zh 属性配置函数。在 attrs 的所有属性将被设置为节点属性。
         * @param attrs - Properties to be set to node
         * @example
         * ```
         * var attrs = { key: 0, num: 100 };
         * node.attr(attrs);
         * ```
         */
        attr(attrs: Object): void;
        /**
         * @en Get parent of the node.
         * @zh 获取该节点的父节点。
         * @example
         * ```
         * var parent = this.node.getParent();
         * ```
         */
        getParent(): this | null;
        /**
         * @en Set parent of the node.
         * @zh 设置该节点的父节点。
         * @example
         * ```
         * node.setParent(newNode);
         * ```
         */
        setParent(value: this | null, keepWorldTransform?: boolean): void;
        /**
         * @en Returns a child from the container given its uuid.
         * @zh 通过 uuid 获取节点的子节点。
         * @param uuid - The uuid to find the child node.
         * @return a Node whose uuid equals to the input parameter
         * @example
         * ```
         * var child = node.getChildByUuid(uuid);
         * ```
         */
        getChildByUuid(uuid: string): this | null;
        /**
         * @en Returns a child from the container given its name.
         * @zh 通过名称获取节点的子节点。
         * @param name - A name to find the child node.
         * @return a CCNode object whose name equals to the input parameter
         * @example
         * ```
         * var child = node.getChildByName("Test Node");
         * ```
         */
        getChildByName(name: string): this | null;
        /**
         * @en Returns a child from the container given its path.
         * @zh 通过路径获取节点的子节点。
         * @param path - A path to find the child node.
         * @return a CCNode object whose name equals to the input parameter
         * @example
         * ```
         * var child = node.getChildByPath("Test Node");
         * ```
         */
        getChildByPath(path: string): this | null;
        addChild(child: this): void;
        /**
         * @en
         * Inserts a child to the node at a specified index.
         * @zh
         * 插入子节点到指定位置
         * @param child - the child node to be inserted
         * 要插入的子节点
         * @param siblingIndex - the sibling index to place the child in
         * 用于放置子节点的同级索引
         * @example
         * ```
         * node.insertChild(child, 2);
         * ```
         */
        insertChild(child: this, siblingIndex: number): void;
        /**
         * @en Get the sibling index.
         * @zh 获取同级索引。
         * @example
         * ```
         * var index = node.getSiblingIndex();
         * ```
         */
        getSiblingIndex(): number;
        /**
         * @en Set the sibling index of this node.
         * @zh 设置节点同级索引。
         * @example
         * ```
         * node.setSiblingIndex(1);
         * ```
         */
        setSiblingIndex(index: number): void;
        /**
         * @en Walk though the sub children tree of the current node.
         * Each node, including the current node, in the sub tree will be visited two times,
         * before all children and after all children.
         * This function call is not recursive, it's based on stack.
         * Please don't walk any other node inside the walk process.
         * @zh 遍历该节点的子树里的所有节点并按规则执行回调函数。
         * 对子树中的所有节点，包含当前节点，会执行两次回调，prefunc 会在访问它的子节点之前调用，postfunc 会在访问所有子节点之后调用。
         * 这个函数的实现不是基于递归的，而是基于栈展开递归的方式。
         * 请不要在 walk 过程中对任何其他的节点嵌套执行 walk。
         * @param prefunc The callback to process node when reach the node for the first time
         * @param postfunc The callback to process node when re-visit the node after walked all children in its sub tree
         * @example
         * ```
         * node.walk(function (target) {
         *     console.log('Walked through node ' + target.name + ' for the first time');
         * }, function (target) {
         *     console.log('Walked through node ' + target.name + ' after walked all children in its sub tree');
         * });
         * ```
         */
        walk(prefunc: (target: this) => void, postfunc?: (target: this) => void): void;
        /**
         * @en
         * Remove itself from its parent node. <br/>
         * If the node orphan, then nothing happens.
         * @zh
         * 从父节点中删除该节点。<br/>
         * 如果这个节点是一个孤节点，那么什么都不会发生。
         * @see cc.Node#removeFromParentAndCleanup
         * @example
         * ```
         * node.removeFromParent();
         * ```
         */
        removeFromParent(): void;
        /**
         * @en
         * Removes a child from the container.
         * @zh
         * 移除节点中指定的子节点。
         * @param child - The child node which will be removed.
         * 将被移除的子节点
         * @example
         * ```
         * node.removeChild(newNode);
         * ```
         */
        removeChild(child: this): void;
        /**
         * @en
         * Removes all children from the container.
         * @zh
         * 移除节点所有的子节点。
         * @example
         * ```
         * node.removeAllChildren();
         * ```
         */
        removeAllChildren(): void;
        /**
         * @en Is this node a child of the given node?
         * @zh 是否是指定节点的子节点？
         * @return True if this node is a child, deep child or identical to the given node.
         * @return 如果此节点是子节点、深度子节点或与给定节点相同，则为True。
         * @example
         * ```
         * node.isChildOf(newNode);
         * ```
         */
        isChildOf(parent: this | null): boolean;
        /**
         * @en
         * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
         * You can also get component in the node by passing in the name of the script.
         * @zh
         * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
         * 传入参数也可以是脚本的名称。
         * @example
         * ```
         * // get sprite component.
         * var sprite = node.getComponent(cc.SpriteComponent);
         * ```
         */
        getComponent<T extends Component>(classConstructor: __private.cocos_core_scene_graph_base_node_Constructor<T>): T | null;
        /**
         * @en
         * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
         * You can also get component in the node by passing in the name of the script.
         * @zh
         * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
         * 传入参数也可以是脚本的名称。
         * @example
         * ```
         * // get custom test calss.
         * var test = node.getComponent("Test");
         * ```
         */
        getComponent(className: string): Component | null;
        /**
         * @en Returns all components of supplied type in the node.
         * @zh 返回节点上指定类型的所有组件。
         * @example
         * ```
         * var sprites = node.getComponents(cc.SpriteComponent);
         * ```
         */
        getComponents<T extends Component>(classConstructor: __private.cocos_core_scene_graph_base_node_Constructor<T>): T[];
        /**
         * @en Returns all components of supplied type in the node.
         * @zh 返回节点上指定类型的所有组件。
         * @example
         * ```
         * var tests = node.getComponents("Test");
         * ```
         */
        getComponents(className: string): Component[];
        /**
         * @en Returns the component of supplied type in any of its children using depth first search.
         * @zh 递归查找所有子节点中第一个匹配指定类型的组件。
         * @example
         * ```
         * var sprite = node.getComponentInChildren(cc.SpriteComponent);
         * ```
         */
        getComponentInChildren<T extends Component>(classConstructor: __private.cocos_core_scene_graph_base_node_Constructor<T>): T | null;
        /**
         * @en Returns the component of supplied type in any of its children using depth first search.
         * @zh 递归查找所有子节点中第一个匹配指定类型的组件。
         * @example
         * ```
         * var Test = node.getComponentInChildren("Test");
         * ```
         */
        getComponentInChildren(className: string): Component | null;
        /**
         * @en Returns all components of supplied type in self or any of its children.
         * @zh 递归查找自身或所有子节点中指定类型的组件
         * @example
         * ```
         * var sprites = node.getComponentsInChildren(cc.SpriteComponent);
         * ```
         */
        getComponentsInChildren<T extends Component>(classConstructor: __private.cocos_core_scene_graph_base_node_Constructor<T>): T[];
        /**
         * @en Returns all components of supplied type in self or any of its children.
         * @zh 递归查找自身或所有子节点中指定类型的组件
         * @example
         * ```
         * var tests = node.getComponentsInChildren("Test");
         * ```
         */
        getComponentsInChildren(className: string): Component[];
        /**
         * @en Adds a component class to the node. You can also add component to node by passing in the name of the script.
         * @zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
         * @example
         * ```
         * var sprite = node.addComponent(cc.SpriteComponent);
         * ```
         */
        addComponent<T extends Component>(classConstructor: __private.cocos_core_scene_graph_base_node_Constructor<T>): T | null;
        /**
         * @en Adds a component class to the node. You can also add component to node by passing in the name of the script.
         * @zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
         * @example
         * ```
         * var test = node.addComponent("Test");
         * ```
         */
        addComponent(className: string): Component | null;
        /**
         * @en
         * Removes a component identified by the given name or removes the component object given.
         * You can also use component.destroy() if you already have the reference.
         * @zh
         * 删除节点上的指定组件，传入参数可以是一个组件构造函数或组件名，也可以是已经获得的组件引用。
         * 如果你已经获得组件引用，你也可以直接调用 component.destroy()
         * @deprecated please destroy the component to remove it.
         * 请销毁组件以移除它。
         * @example
         * ```
         * node.removeComponent(cc.SpriteComponent);
         * ```
         */
        removeComponent<T extends Component>(classConstructor: __private.cocos_core_scene_graph_base_node_Constructor<T>): void;
        /**
         * @en
         * Removes a component identified by the given name or removes the component object given.
         * You can also use component.destroy() if you already have the reference.
         * @zh
         * 删除节点上的指定组件，传入参数可以是一个组件构造函数或组件名，也可以是已经获得的组件引用。
         * 如果你已经获得组件引用，你也可以直接调用 component.destroy()
         * @deprecated please destroy the component to remove it.
         * @example
         * ```
         * const sprite = node.getComponent(CC.Sprite);
         * if (sprite) {
         *     node.removeComponent(sprite);
         * }
         * node.removeComponent('cc.SpriteComponent');
         * ```
         */
        removeComponent(classNameOrInstance: string | Component): void;
        on(type: string | SystemEventType, callback: Function, target?: Object, useCapture?: any): void;
        off(type: string, callback?: Function, target?: Object, useCapture?: any): void;
        once(type: string, callback: Function, target?: Object, useCapture?: any): void;
        emit(type: string, ...args: any[]): void;
        dispatchEvent(event: Event): void;
        hasEventListener(type: string): boolean;
        targetOff(target: string | Object): void;
        destroy(): boolean;
        /**
         * @en
         * Destroy all children from the node, and release all their own references to other objects.<br/>
         * Actual destruct operation will delayed until before rendering.
         * @zh
         * 销毁所有子节点，并释放所有它们对其它对象的引用。<br/>
         * 实际销毁操作会延迟到当前帧渲染前执行。
         * @example
         * ```
         * node.destroyAllChildren();
         * ```
         */
        destroyAllChildren(): void;
        _removeComponent(component: Component): void;
        _updateSiblingIndex(): void;
        protected _onSetParent(oldParent: this | null, keepWorldTransform?: boolean): void;
        protected _onPostActivated(active: boolean): void;
        protected _onBatchRestored(): void;
        protected _onBatchCreated(): void;
        protected _onPreDestroy(): void;
        protected _onHierarchyChanged(oldParent: this | null): void;
        protected _instantiate(cloned: any): any;
        protected _onHierarchyChangedBase(oldParent: this | null): void;
        protected _onPreDestroyBase(): boolean;
        protected _disableChildComps(): void;
        protected _onSiblingIndexChanged?(siblingIndex: number): void;
        protected _checkMultipleComp?(constructor: Function): boolean;
    }
    /**
     * @zh
     * 场景树中的基本节点，基本特性有：
     * * 具有层级关系
     * * 持有各类组件
     * * 维护空间变换（坐标、旋转、缩放）信息
     */
    export class Node extends BaseNode {
        static bookOfChange: Map<string, number>;
        /**
         * @zh
         * 节点可能发出的事件类型
         */
        static EventType: typeof SystemEventType;
        /**
         * @zh
         * 空间变换操作的坐标系
         */
        static NodeSpace: typeof __private.cocos_core_scene_graph_node_enum_NodeSpace;
        /**
         * @zh
         * 节点变换更新的具体部分
         * @deprecated 请使用 [Node.TransformBit]
         */
        static TransformDirtyBit: typeof __private.cocos_core_scene_graph_node_enum_TransformBit;
        /**
         * @zh
         * 节点变换更新的具体部分,可用于判断 TRANSFORM_CHANGED 事件的具体类型
         */
        static TransformBit: typeof __private.cocos_core_scene_graph_node_enum_TransformBit;
        /**
         * @zh
         * 指定对象是否是普通的场景节点？
         * @param obj 待测试的节点
         */
        static isNode(obj: object | null): obj is Node;
        _uiProps: __private.cocos_core_scene_graph_node_ui_properties_NodeUIProperties;
        _static: boolean;
        protected _pos: math.Vec3;
        protected _rot: math.Quat;
        protected _scale: math.Vec3;
        protected _mat: math.Mat4;
        protected _lpos: math.Vec3;
        protected _lrot: math.Quat;
        protected _lscale: math.Vec3;
        protected _layer: number;
        protected _euler: math.Vec3;
        protected _dirtyFlags: __private.cocos_core_scene_graph_node_enum_TransformBit;
        protected _eulerDirty: boolean;
        get position(): Readonly<math.Vec3>;
        set position(val: Readonly<math.Vec3>);
        get worldPosition(): Readonly<math.Vec3>;
        set worldPosition(val: Readonly<math.Vec3>);
        get rotation(): Readonly<math.Quat>;
        set rotation(val: Readonly<math.Quat>);
        set eulerAngles(val: Readonly<math.Vec3>);
        get eulerAngles(): Readonly<math.Vec3>;
        get worldRotation(): Readonly<math.Quat>;
        set worldRotation(val: Readonly<math.Quat>);
        get scale(): Readonly<math.Vec3>;
        set scale(val: Readonly<math.Vec3>);
        get worldScale(): Readonly<math.Vec3>;
        set worldScale(val: Readonly<math.Vec3>);
        set matrix(val: Readonly<math.Mat4>);
        get worldMatrix(): Readonly<math.Mat4>;
        get forward(): math.Vec3;
        set forward(dir: math.Vec3);
        set layer(l: number);
        get layer(): number;
        get hasChangedFlags(): number;
        set hasChangedFlags(val: number);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get anchorX(): number;
        set anchorX(value: number);
        get anchorY(): number;
        set anchorY(value: number);
        /**
         * @zh
         * 设置父节点
         * @param value 父节点
         * @param keepWorldTransform 是否保留当前世界变换
         */
        setParent(value: this | null, keepWorldTransform?: boolean): void;
        _onSetParent(oldParent: this | null, keepWorldTransform: boolean): void;
        _onBatchCreated(): void;
        _onBatchRestored(): void;
        _onBeforeSerialize(): void;
        /**
         * @zh
         * 移动节点
         * @param trans 位置增量
         * @param ns 操作空间
         */
        translate(trans: math.Vec3, ns?: __private.cocos_core_scene_graph_node_enum_NodeSpace): void;
        /**
         * @zh
         * 旋转节点
         * @param trans 旋转增量
         * @param ns 操作空间
         */
        rotate(rot: math.Quat, ns?: __private.cocos_core_scene_graph_node_enum_NodeSpace): void;
        /**
         * @zh
         * 设置当前节点旋转为面向目标位置，默认前方为 -z 方向
         * @param pos 目标位置
         * @param up 坐标系的上方向
         */
        lookAt(pos: math.Vec3, up?: math.Vec3): void;
        /**
         * @en
         * invalidate the world transform information
         * for this node and all its children recursively
         * @zh
         * 递归标记节点世界变换为 dirty
         */
        invalidateChildren(dirtyBit: __private.cocos_core_scene_graph_node_enum_TransformBit): void;
        /**
         * @en
         * update the world transform information if outdated
         * @zh
         * 更新节点的世界变换信息
         */
        updateWorldTransform(): void;
        /**
         * @zh
         * 设置本地坐标
         * @param position 目标本地坐标
         */
        setPosition(position: math.Vec3): void;
        /**
         * @zh
         * 设置本地坐标
         * @param x 目标本地坐标的 X 分量
         * @param y 目标本地坐标的 Y 分量
         * @param z 目标本地坐标的 Z 分量
         * @param w 目标本地坐标的 W 分量
         */
        setPosition(x: number, y: number, z: number): void;
        /**
         * @zh
         * 获取本地坐标
         * @param out 输出到此目标 vector
         */
        getPosition(out?: math.Vec3): math.Vec3;
        /**
         * @zh
         * 设置本地旋转
         * @param rotation 目标本地旋转
         */
        setRotation(rotation: math.Quat): void;
        /**
         * @zh
         * 设置本地旋转
         * @param x 目标本地旋转的 X 分量
         * @param y 目标本地旋转的 Y 分量
         * @param z 目标本地旋转的 Z 分量
         * @param w 目标本地旋转的 W 分量
         */
        setRotation(x: number, y: number, z: number, w: number): void;
        /**
         * @zh
         * 通过欧拉角设置本地旋转
         * @param x - 目标欧拉角的 X 分量
         * @param y - 目标欧拉角的 Y 分量
         * @param z - 目标欧拉角的 Z 分量
         */
        setRotationFromEuler(x: number, y: number, z: number): void;
        /**
         * @zh
         * 获取本地旋转
         * @param out 输出到此目标 quaternion
         */
        getRotation(out?: math.Quat): math.Quat;
        /**
         * @zh
         * 设置本地缩放
         * @param scale 目标本地缩放
         */
        setScale(scale: math.Vec3): void;
        /**
         * @zh
         * 设置本地缩放
         * @param x 目标本地缩放的 X 分量
         * @param y 目标本地缩放的 Y 分量
         * @param z 目标本地缩放的 Z 分量
         */
        setScale(x: number, y: number, z: number): void;
        /**
         * @zh
         * 获取本地缩放
         * @param out 输出到此目标 vector
         */
        getScale(out?: math.Vec3): math.Vec3;
        inverseTransformPoint(out: math.Vec3, p: math.Vec3): math.Vec3;
        /**
         * @zh
         * 设置世界坐标
         * @param position 目标世界坐标
         */
        setWorldPosition(position: math.Vec3): void;
        /**
         * @zh
         * 设置世界坐标
         * @param x 目标世界坐标的 X 分量
         * @param y 目标世界坐标的 Y 分量
         * @param z 目标世界坐标的 Z 分量
         * @param w 目标世界坐标的 W 分量
         */
        setWorldPosition(x: number, y: number, z: number): void;
        /**
         * @zh
         * 获取世界坐标
         * @param out 输出到此目标 vector
         */
        getWorldPosition(out?: math.Vec3): math.Vec3;
        /**
         * @zh
         * 设置世界旋转
         * @param rotation 目标世界旋转
         */
        setWorldRotation(rotation: math.Quat): void;
        /**
         * @zh
         * 设置世界旋转
         * @param x 目标世界旋转的 X 分量
         * @param y 目标世界旋转的 Y 分量
         * @param z 目标世界旋转的 Z 分量
         * @param w 目标世界旋转的 W 分量
         */
        setWorldRotation(x: number, y: number, z: number, w: number): void;
        /**
         * @zh
         * 通过欧拉角设置世界旋转
         * @param x - 目标欧拉角的 X 分量
         * @param y - 目标欧拉角的 Y 分量
         * @param z - 目标欧拉角的 Z 分量
         */
        setWorldRotationFromEuler(x: number, y: number, z: number): void;
        /**
         * @zh
         * 获取世界旋转
         * @param out 输出到此目标 quaternion
         */
        getWorldRotation(out?: math.Quat): math.Quat;
        /**
         * @zh
         * 设置世界缩放
         * @param scale 目标世界缩放
         */
        setWorldScale(scale: math.Vec3): void;
        /**
         * @zh
         * 设置世界缩放
         * @param x 目标世界缩放的 X 分量
         * @param y 目标世界缩放的 Y 分量
         * @param z 目标世界缩放的 Z 分量
         */
        setWorldScale(x: number, y: number, z: number): void;
        /**
         * @zh
         * 获取世界缩放
         * @param out 输出到此目标 vector
         */
        getWorldScale(out?: math.Vec3): math.Vec3;
        /**
         * @zh
         * 获取世界变换矩阵
         * @param out 输出到此目标矩阵
         */
        getWorldMatrix(out?: math.Mat4): math.Mat4;
        /**
         * @zh
         * 获取只包含旋转和缩放的世界变换矩阵
         * @param out 输出到此目标矩阵
         */
        getWorldRS(out?: math.Mat4): math.Mat4;
        /**
         * @zh
         * 获取只包含旋转和位移的世界变换矩阵
         * @param out 输出到此目标矩阵
         */
        getWorldRT(out?: math.Mat4): math.Mat4;
        /**
         * @zh
         * 一次性设置所有局部变换（平移、旋转、缩放）信息
         */
        setRTS(rot?: math.Quat, pos?: math.Vec3, scale?: math.Vec3): void;
        getAnchorPoint(out?: math.Vec2): math.Vec2;
        setAnchorPoint(point: math.Vec2 | number, y?: number): void;
        getContentSize(out?: math.Size): math.Size;
        setContentSize(size: math.Size | number, height?: number): void;
        pauseSystemEvents(recursive: boolean): void;
        resumeSystemEvents(recursive: boolean): void;
        _onPostActivated(active: any): void;
        _onPreDestroy(): void;
    }
    /**
     * @en
     * cc.Scene is a subclass of cc.Node that is used only as an abstract concept.<br/>
     * cc.Scene and cc.Node are almost identical with the difference that users can not modify cc.Scene manually.
     * @zh
     * cc.Scene 是 cc._BaseNode 的子类，仅作为一个抽象的概念。<br/>
     * cc.Scene 和 cc._BaseNode 有点不同，用户不应直接修改 cc.Scene。
     */
    export class Scene extends BaseNode {
        get renderScene(): renderer.RenderScene | null;
        get globals(): __private.cocos_core_scene_graph_scene_globals_SceneGlobals;
        /**
         * @en Indicates whether all (directly or indirectly) static referenced assets of this scene are releasable by default after scene unloading.
         * @zh 指示该场景中直接或间接静态引用到的所有资源是否默认在场景切换后自动释放。
         */
        autoReleaseAssets: boolean;
        /**
         * @en Per-scene level rendering info
         * @zh 场景级别的渲染信息
         */
        _globals: __private.cocos_core_scene_graph_scene_globals_SceneGlobals;
        _renderScene: renderer.RenderScene | null;
        dependAssets: null;
        protected _inited: boolean;
        protected _prefabSyncedInLiveReload: boolean;
        protected _pos: Readonly<math.Vec3>;
        protected _rot: Readonly<math.Quat>;
        protected _scale: Readonly<math.Vec3>;
        protected _mat: Readonly<math.Mat4>;
        protected _dirtyFlags: number;
        constructor(name: string);
        destroy(): boolean;
        addComponent(typeOrClassName: string | Function): null;
        _onHierarchyChanged(): void;
        _onBatchCreated(): void;
        _onBatchRestored(): void;
        getPosition(out?: math.Vec3): math.Vec3;
        getRotation(out?: math.Quat): math.Quat;
        getScale(out?: math.Vec3): math.Vec3;
        getWorldPosition(out?: math.Vec3): math.Vec3;
        getWorldRotation(out?: math.Quat): math.Quat;
        getWorldScale(out?: math.Vec3): math.Vec3;
        getWorldMatrix(out?: math.Mat4): math.Mat4;
        getWorldRS(out?: math.Mat4): math.Mat4;
        getWorldRT(out?: math.Mat4): math.Mat4;
        get position(): Readonly<math.Vec3>;
        get worldPosition(): Readonly<math.Vec3>;
        get rotation(): Readonly<math.Quat>;
        get worldRotation(): Readonly<math.Quat>;
        get scale(): Readonly<math.Vec3>;
        get worldScale(): Readonly<math.Vec3>;
        get eulerAngles(): Readonly<math.Vec3>;
        get worldMatrix(): Readonly<math.Mat4>;
        updateWorldTransform(): void;
        protected _instantiate(): void;
        protected _load(): void;
        protected _activate(active: boolean): void;
    }
    /**
     * 场景节点层管理器，用于射线检测、物理碰撞和用户自定义脚本逻辑。
     * 每个节点可属于一个或多个层，可通过 “包含式” 或 “排除式” 两种检测器进行层检测。
     */
    export class Layers {
        static Enum: {
            NONE: number;
            IGNORE_RAYCAST: number;
            GIZMOS: number;
            EDITOR: number;
            UI_3D: number;
            SCENE_GIZMO: number;
            UI_2D: number;
            PROFILER: number;
            DEFAULT: number;
            ALL: number;
        };
        static BitMask: {
            NONE: number;
            IGNORE_RAYCAST: number;
            GIZMOS: number;
            EDITOR: number;
            UI_3D: number;
            SCENE_GIZMO: number;
            UI_2D: number;
            PROFILER: number;
            DEFAULT: number;
            ALL: number;
        };
        /**
         * @en
         * Make a layer mask accepting nothing but the listed layers
         * @zh
         * 创建一个包含式层检测器，只接受列表中的层
         * @param includes 可接受的层数组
         * @return 指定功能的层检测器
         */
        static makeMaskInclude(includes: number[]): number;
        /**
         * @en
         * Make a layer mask accepting everything but the listed layers
         * @zh
         * 创建一个排除式层检测器，只拒绝列表中的层
         * @param  excludes 将拒绝的层数组
         * @return 指定功能的层检测器
         */
        static makeMaskExclude(excludes: number[]): number;
        /**
         * @zh 添加一个新层，用户可编辑 0 - 19 位为用户自定义层
         * @param name 层名字
         * @param bitNum 层序号
         */
        static addLayer(name: string, bitNum: number): void;
        /**
         * @zh
         * 移除一个层，用户可编辑 0 - 19 位为用户自定义层
         * @param bitNum 层序号
         */
        static deleteLayer(bitNum: number): void;
    }
    /**
     * Finds a node by hierarchy path, the path is case-sensitive.
     * It will traverse the hierarchy by splitting the path using '/' character.
     * This function will still returns the node even if it is inactive.
     * It is recommended to not use this function every frame instead cache the result at startup.
     */
    export function find(path: string, referenceNode?: Node): Node | null;
    /**
     * @en
     * Class of private entities in Cocos Creator 3d scenes.<br/>
     * The PrivateNode is hidden in editor, and completely transparent to users.<br/>
     * It's normally used as Node's private content created by components in parent node.<br/>
     * So in theory private nodes are not children, they are part of the parent node.<br/>
     * Private node have two important characteristics:<br/>
     * 1. It has the minimum z index and cannot be modified, because they can't be displayed over real children.<br/>
     * 2. The positioning of private nodes is also special, they will consider the left bottom corner of the parent node's bounding box as the origin of local coordinates.<br/>
     *    In this way, they can be easily kept inside the bounding box.<br/>
     * Currently, it's used by RichText component and TileMap component.
     * @zh
     * Cocos Creator 3d场景中的私有节点类。<br/>
     * 私有节点在编辑器中不可见，对用户透明。<br/>
     * 通常私有节点是被一些特殊的组件创建出来作为父节点的一部分而存在的，理论上来说，它们不是子节点，而是父节点的组成部分。<br/>
     * 私有节点有两个非常重要的特性：<br/>
     * 1. 它有着最小的渲染排序的 Z 轴深度，并且无法被更改，因为它们不能被显示在其他正常子节点之上。<br/>
     * 2. 它的定位也是特殊的，对于私有节点来说，父节点包围盒的左下角是它的局部坐标系原点，这个原点相当于父节点的位置减去它锚点的偏移。这样私有节点可以比较容易被控制在包围盒之中。<br/>
     * 目前在引擎中，RichText 和 TileMap 都有可能生成私有节点。
     * @class PrivateNode
     * @param {String} name
     * @extends Node
     */
    export class PrivateNode extends Node {
        /**
         * @param {String} [name]
         */
        constructor(name: string);
    }
    /**
     * @en The class used to perform activating and deactivating operations of node and component.
     * @zh 用于执行节点和组件的激活和停用操作的类。
     */
    export class NodeActivator {
        resetComp: any;
        protected _activatingStack: any[];
        constructor();
        reset(): void;
        activateNode(node: any, active: any): void;
        activateComp(comp: any, preloadInvoker?: any, onLoadInvoker?: any, onEnableInvoker?: any): void;
        destroyComp(comp: any): void;
        protected _activateNodeRecursively(node: any, preloadInvoker: any, onLoadInvoker: any, onEnableInvoker: any): void;
        protected _deactivateNodeRecursively(node: any): void;
    }
    /**
     * @en
     * Base class for everything attached to Node(Entity).<br/>
     * <br/>
     * NOTE: Not allowed to use construction parameters for Component's subclasses,
     *       because Component is created by the engine.
     * @zh
     * 所有附加到节点的基类。<br/>
     * <br/>
     * 注意：不允许使用组件的子类构造参数，因为组件是由引擎创建的。
     *
     * @class Component
     * @extends Object
     */
    export class Component extends CCObject {
        get name(): string;
        set name(value: string);
        get uuid(): string;
        get __scriptAsset(): null;
        get enabled(): boolean;
        set enabled(value: boolean);
        get enabledInHierarchy(): boolean;
        get _isOnLoadCalled(): number;
        static system: null;
        /**
         * @en The node this component is attached to. A component is always attached to a node.
         * @zh 该组件被附加到的节点。组件总会附加到一个节点。
         * @property node
         * @type {Node}
         * @example
         * ```typescript
         * cc.log(comp.node);
         * ```
         */
        node: Node;
        /**
         * @property _enabled
         * @type {Boolean}
         * @private
         */
        _enabled: boolean;
        _sceneGetter: null | (() => renderer.RenderScene);
        /**
         * For internal usage.
         */
        _id: string;
        _getRenderScene(): renderer.RenderScene;
        /**
         * @en Adds a component class to the node. You can also add component to node by passing in the name of the script.
         * @zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
         * @example
         * ```typescript
         * var sprite = node.addComponent(cc.SpriteComponent);
         * ```
         */
        addComponent<T extends Component>(classConstructor: __private.Constructor<T>): T | null;
        /**
         * @en Adds a component class to the node. You can also add component to node by passing in the name of the script.
         * @zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
         * @example
         * ```typescript
         * var test = node.addComponent("Test");
         * ```
         */
        addComponent(className: string): Component | null;
        /**
         * @en
         * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
         * You can also get component in the node by passing in the name of the script.
         * @zh
         * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
         * 传入参数也可以是脚本的名称。
         * @example
         * ```typescript
         * // get sprite component.
         * var sprite = node.getComponent(cc.SpriteComponent);
         * ```
         */
        getComponent<T extends Component>(classConstructor: __private.Constructor<T>): T | null;
        /**
         * @en
         * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
         * You can also get component in the node by passing in the name of the script.
         * @zh
         * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
         * 传入参数也可以是脚本的名称。
         * @example
         * ```typescript
         * // get custom test calss.
         * var test = node.getComponent("Test");
         * ```
         */
        getComponent(className: string): Component | null;
        /**
         * @en Returns all components of supplied type in the node.
         * @zh 返回节点上指定类型的所有组件。
         * @example
         * ```typescript
         * var sprites = node.getComponents(cc.SpriteComponent);
         * ```
         */
        getComponents<T extends Component>(classConstructor: __private.Constructor<T>): T[];
        /**
         * @en Returns all components of supplied type in the node.
         * @zh 返回节点上指定类型的所有组件。
         * @example
         * ```typescript
         * var tests = node.getComponents("Test");
         * ```
         */
        getComponents(className: string): Component[];
        /**
         * @en Returns the component of supplied type in any of its children using depth first search.
         * @zh 递归查找所有子节点中第一个匹配指定类型的组件。
         * @example
         * ```typescript
         * var sprite = node.getComponentInChildren(cc.SpriteComponent);
         * ```
         */
        getComponentInChildren<T extends Component>(classConstructor: __private.Constructor<T>): T | null;
        /**
         * @en Returns the component of supplied type in any of its children using depth first search.
         * @zh 递归查找所有子节点中第一个匹配指定类型的组件。
         * @example
         * ```typescript
         * var Test = node.getComponentInChildren("Test");
         * ```
         */
        getComponentInChildren(className: string): Component | null;
        /**
         * @en Returns all components of supplied type in self or any of its children.
         * @zh 递归查找自身或所有子节点中指定类型的组件。
         * @example
         * ```typescript
         * var sprites = node.getComponentsInChildren(cc.SpriteComponent);
         * ```
         */
        getComponentsInChildren<T extends Component>(classConstructor: __private.Constructor<T>): T[];
        /**
         * @en Returns all components of supplied type in self or any of its children.
         * @zh 递归查找自身或所有子节点中指定类型的组件。
         * @example
         * ```typescript
         * var tests = node.getComponentsInChildren("Test");
         * ```
         */
        getComponentsInChildren(className: string): Component[];
        destroy(): any;
        _onPreDestroy(): void;
        _instantiate(cloned: any): any;
        /**
         * @en
         * Schedules a custom selector.<br/>
         * If the selector is already scheduled, then the interval parameter will be updated without scheduling it again.
         * @zh
         * 调度一个自定义的回调函数。<br/>
         * 如果回调函数已调度，那么将不会重复调度它，只会更新时间间隔参数。
         * @method schedule
         * @param {function} callback 回调函数。
         * @param {Number} interval  时间间隔，0 表示每帧都重复。
         * @param {Number} repeat    将被重复执行（repeat+ 1）次，您可以使用 cc.macro.REPEAT_FOREVER 进行无限次循环。
         * @param {Number} delay     第一次执行前等待的时间（延时执行）。
         * @example
         * ```typescript
         * var timeCallback = function (dt) {
         *   cc.log("time: " + dt);
         * }
         * this.schedule(timeCallback, 1);
         * ```
         */
        schedule(callback: any, interval?: number, repeat?: number, delay?: number): void;
        /**
         * @en Schedules a callback function that runs only once, with a delay of 0 or larger.
         * @zh 调度一个只运行一次的回调函数，可以指定 0 让回调函数在下一帧立即执行或者在一定的延时之后执行。
         * @method scheduleOnce
         * @see [[schedule]]
         * @param {function} callback  回调函数。
         * @param {Number} delay  第一次执行前等待的时间（延时执行）。
         * @example
         * ```typescript
         * var timeCallback = function (dt) {
         *   cc.log("time: " + dt);
         * }
         * this.scheduleOnce(timeCallback, 2);
         * ```
         */
        scheduleOnce(callback: any, delay?: number): void;
        /**
         * @en Unschedules a custom callback function.
         * @zh 取消调度一个自定义的回调函数。
         * @param {function} callback_fn  回调函数。
         * @example
         * ```typescript
         * this.unschedule(_callback);
         * ```
         */
        unschedule(callback_fn: any): void;
        /**
         * @en
         * unschedule all scheduled callback functions: custom callback functions, and the 'update' callback function.<br/>
         * Actions are not affected by this method.
         * @zh 取消调度所有已调度的回调函数：定制的回调函数以及 'update' 回调函数。动作不受此方法影响。
         * @method unscheduleAllCallbacks
         * @example
         * ```typescript
         * this.unscheduleAllCallbacks();
         * ```
         */
        unscheduleAllCallbacks(): void;
        /**
         * @en Update is called every frame, if the Component is enabled.<br/>
         * This is a lifecycle method. It may not be implemented in the super class.<br/>
         * You can only call its super class method inside it. It should not be called manually elsewhere.
         * @zh 如果该组件启用，则每帧调用 update。<br/>
         * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
         * @param dt - the delta time in seconds it took to complete the last frame
         */
        protected update?(dt: number): void;
        /**
         * @en LateUpdate is called every frame, if the Component is enabled.<br/>
         * This is a lifecycle method. It may not be implemented in the super class.<br/>
         * You can only call its super class method inside it. It should not be called manually elsewhere.
         * @zh 如果该组件启用，则每帧调用 LateUpdate。<br/>
         * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
         * @param dt - the delta time in seconds it took to complete the last frame
         */
        protected lateUpdate?(dt: number): void;
        /**
         * @en `__preload` is called before every onLoad.<br/>
         * It is used to initialize the builtin components internally,<br/>
         * to avoid checking whether onLoad is called before every public method calls.<br/>
         * This method should be removed if script priority is supported.
         * @zh `__preload` 在每次onLoad之前调用。<br/>
         * 它用于在内部初始化内置组件，<br/>
         * 以避免在每次公有方法调用之前检查是否调用了onLoad。<br/>
         * 如果支持脚本优先级，则应删除此方法。
         * @private
         */
        protected __preload?(): void;
        /**
         * @en
         * When attaching to an active node or its node first activated.<br/>
         * onLoad is always called before any start functions, this allows you to order initialization of scripts.<br/>
         * This is a lifecycle method. It may not be implemented in the super class.<br/>
         * You can only call its super class method inside it. It should not be called manually elsewhere.
         * @zh
         * 当附加到一个激活的节点上或者其节点第一次激活时候调用。onLoad 总是会在任何 start 方法调用前执行，这能用于安排脚本的初始化顺序。<br/>
         * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
         */
        protected onLoad?(): void;
        /**
         * @en
         * Called before all scripts' update if the Component is enabled the first time.<br/>
         * Usually used to initialize some logic which need to be called after all components' `onload` methods called.<br/>
         * This is a lifecycle method. It may not be implemented in the super class.<br/>
         * You can only call its super class method inside it. It should not be called manually elsewhere.
         * @zh
         * 如果该组件第一次启用，则在所有组件的 update 之前调用。通常用于需要在所有组件的 onLoad 初始化完毕后执行的逻辑。<br/>
         * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
         */
        protected start?(): void;
        /**
         * @en Called when this component becomes enabled and its node is active.<br/>
         * This is a lifecycle method. It may not be implemented in the super class.
         * You can only call its super class method inside it. It should not be called manually elsewhere.
         * @zh 当该组件被启用，并且它的节点也激活时。<br/>
         * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
         */
        protected onEnable?(): void;
        /**
         * @en Called when this component becomes disabled or its node becomes inactive.<br/>
         * This is a lifecycle method. It may not be implemented in the super class.
         * You can only call its super class method inside it. It should not be called manually elsewhere.
         * @zh 当该组件被禁用或节点变为无效时调用。<br/>
         * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
         */
        protected onDisable?(): void;
        /**
         * @en Called when this component will be destroyed.<br/>
         * This is a lifecycle method. It may not be implemented in the super class.<br/>
         * You can only call its super class method inside it. It should not be called manually elsewhere.
         * @zh 当该组件被销毁时调用<br/>
         * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
         */
        protected onDestroy?(): void;
        onFocusInEditor?(): void;
        onLostFocusInEditor?(): void;
        /**
         * @en Called to initialize the component or node’s properties when adding the component the first time or when the Reset command is used.
         * This function is only called in editor.<br/>
         * @zh 用来初始化组件或节点的一些属性，当该组件被第一次添加到节点上或用户点击了它的 Reset 菜单时调用。这个回调只会在编辑器下调用。
         */
        resetInEditor?(): void;
        /**
         * @en
         * If the component's bounding box is different from the node's, you can implement this method to supply
         * a custom axis aligned bounding box (AABB), so the editor's scene view can perform hit test properly.
         * @zh
         * 如果组件的包围盒与节点不同，您可以实现该方法以提供自定义的轴向对齐的包围盒（AABB），
         * 以便编辑器的场景视图可以正确地执行点选测试。
         * @param out_rect - 提供包围盒的 Rect
         */
        protected _getLocalBounds?(out_rect: math.Rect): void;
        /**
         * @en
         * onRestore is called after the user clicks the Reset item in the Inspector's context menu or performs
         * an undo operation on this component.<br/>
         * <br/>
         * If the component contains the "internal state", short for "temporary member variables which not included<br/>
         * in its CCClass properties", then you may need to implement this function.<br/>
         * <br/>
         * The editor will call the getset accessors of your component to record/restore the component's state<br/>
         * for undo/redo operation. However, in extreme cases, it may not works well. Then you should implement<br/>
         * this function to manually synchronize your component's "internal states" with its public properties.<br/>
         * Once you implement this function, all the getset accessors of your component will not be called when<br/>
         * the user performs an undo/redo operation. Which means that only the properties with default value<br/>
         * will be recorded or restored by editor.<br/>
         * <br/>
         * Similarly, the editor may failed to reset your component correctly in extreme cases. Then if you need<br/>
         * to support the reset menu, you should manually synchronize your component's "internal states" with its<br/>
         * properties in this function. Once you implement this function, all the getset accessors of your component<br/>
         * will not be called during reset operation. Which means that only the properties with default value<br/>
         * will be reset by editor.
         *
         * This function is only called in editor mode.
         * @zh
         * onRestore 是用户在检查器菜单点击 Reset 时，对此组件执行撤消操作后调用的。<br/>
         * <br/>
         * 如果组件包含了“内部状态”（不在 CCClass 属性中定义的临时成员变量），那么你可能需要实现该方法。<br/>
         * <br/>
         * 编辑器执行撤销/重做操作时，将调用组件的 get set 来录制和还原组件的状态。
         * 然而，在极端的情况下，它可能无法良好运作。<br/>
         * 那么你就应该实现这个方法，手动根据组件的属性同步“内部状态”。
         * 一旦你实现这个方法，当用户撤销或重做时，组件的所有 get set 都不会再被调用。
         * 这意味着仅仅指定了默认值的属性将被编辑器记录和还原。<br/>
         * <br/>
         * 同样的，编辑可能无法在极端情况下正确地重置您的组件。<br/>
         * 于是如果你需要支持组件重置菜单，你需要在该方法中手工同步组件属性到“内部状态”。<br/>
         * 一旦你实现这个方法，组件的所有 get set 都不会在重置操作时被调用。
         * 这意味着仅仅指定了默认值的属性将被编辑器重置。
         * <br/>
         * 此方法仅在编辑器下会被调用。
         */
        protected onRestore?(): void;
    }
    /**
     * @zh
     * “EventHandler” 类用来设置场景中的事件回调，该类允许用户设置回调目标节点，目标组件名，组件方法名，并可通过 emit 方法调用目标函数。
     * 可通过 cc.Component.EventHandler 获得该事件。
     *
     * @example
     * ```typescript
     *
     * var eventHandler = new cc.Component.EventHandler();
     * eventHandler.target = newTarget;
     * eventHandler.component = "MainMenu";
     * eventHandler.handler = "OnClick";
     * eventHandler.customEventData = "my data";
     * ```
     */
    export class EventHandler {
        get _componentName(): any;
        set _componentName(value: any);
        /**
         * @zh
         * 组件事件派发。
         *
         * @param events - 需要派发的组件事件列表。
         * @param args - 派发参数数组。
         */
        static emitEvents(events: EventHandler[], ...args: any[]): void;
        /**
         * @zh
         * 目标节点。
         */
        target: Node | null;
        /**
         * @zh
         * 目标组件名。
         */
        component: string;
        _componentId: string;
        /**
         * @zh
         * 响应事件函数名。
         */
        handler: string;
        /**
         * @zh
         * 自定义事件数据。
         */
        customEventData: string;
        /**
         * @zh
         * 触发目标组件上的指定 handler 函数，该参数是回调函数的参数值（可不填）。
         *
         * @param params - 派发参数数组。
         * @example
         * ```typescript
         * var eventHandler = new cc.Component.EventHandler();
         * eventHandler.target = newTarget;
         * eventHandler.component = "MainMenu";
         * eventHandler.handler = "OnClick"
         * eventHandler.emit(["param1", "param2", ....]);
         * ```
         */
        emit(params: any[]): void;
    }
    /**
     * @en
     * A temp fallback to contain the original component which can not be loaded.
     * @zh
     * 包含无法加载的原始组件的临时回退。
     */
    export class MissingScript extends Component {
        static safeFindClass(id: string, data: any): any;
        static getMissingWrapper(id: any, data: any): typeof __private.cocos_core_components_missing_script_MissingClass;
        compiled: boolean;
        _$erialized: null;
        constructor();
        onLoad(): void;
    }
    export class BlockInputEventsComponent extends Component {
        onEnable(): void;
        onDisable(): void;
    }
    export class System implements ISchedulable {
        protected _id: string;
        protected _priority: number;
        protected _executeInEditMode: boolean;
        set priority(value: number);
        get priority(): number;
        set id(id: string);
        get id(): string;
        static sortByPriority(a: System, b: System): 1 | 0 | -1;
        init(): void;
        update(dt: number): void;
        postUpdate(dt: number): void;
    }
    /**
     * @zh 3D 节点映射 UI 节点组件
     * 主要提供映射后的转换世界坐标以及模拟透视相机远近比。
     */
    export class UICoordinateTrackerComponent extends Component {
        get target(): Node | null;
        set target(value: Node | null);
        get camera(): CameraComponent | null;
        set camera(value: CameraComponent | null);
        get useScale(): boolean;
        set useScale(value: boolean);
        get distance(): number;
        set distance(value: number);
        /**
         * @zh
         * 映射数据事件。回调的第一个参数是映射后的本地坐标，第二个是距相机距离比。
         */
        syncEvents: EventHandler[];
        protected _target: Node | null;
        protected _camera: CameraComponent | null;
        protected _useScale: boolean;
        protected _distance: number;
        protected _transformPos: math.Vec3;
        protected _viewPos: math.Vec3;
        protected _canMove: boolean;
        protected _lastWpos: math.Vec3;
        protected _lastCameraPos: math.Vec3;
        onEnable(): void;
        update(): void;
        protected _checkCanMove(): void;
    }
    /**
     * @en
     * The root node of UI.
     * Provide an aligned window for all child nodes, also provides ease of setting screen adaptation policy interfaces from the editor.
     * Line-of-sight range is -999 to 1000.
     *
     * @zh
     * 作为 UI 根节点，为所有子节点提供对齐视窗，另外提供屏幕适配策略接口，方便从编辑器设置。
     * 注：由于本节点的尺寸会跟随屏幕拉伸，所以 anchorPoint 只支持 (0.5, 0.5)，否则适配不同屏幕时坐标会有偏差。
     * UI 的视距范围是 -999 ～ 1000.
     */
    export class CanvasComponent extends Component {
        get clearFlag(): GFXClearFlag;
        set clearFlag(val: GFXClearFlag);
        get color(): math.Color;
        set color(val: math.Color);
        get renderMode(): number;
        set renderMode(val: number);
        get priority(): number;
        set priority(val: number);
        get targetTexture(): RenderTexture | null;
        set targetTexture(value: RenderTexture | null);
        get visibility(): number;
        get camera(): renderer.Camera | null;
        protected _priority: number;
        protected _targetTexture: RenderTexture | null;
        protected _clearFlag: GFXClearFlag;
        protected _color: math.Color;
        protected _renderMode: number;
        protected _thisOnResized: () => void;
        protected _camera: renderer.Camera | null;
        constructor();
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        /**
         * @en
         * Screen alignment.
         *
         * @zh
         * 屏幕对齐。
         */
        alignWithScreen(): void;
        protected _checkTargetTextureEvent(old: RenderTexture | null): void;
        protected _updateTargetTexture(): void;
    }
    /**
     * @zh
     * UI 及 UI 模型渲染基类。
     */
    export class UIComponent extends Component {
        protected _lastParent: Node | null;
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        updateAssembler(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        postUpdateAssembler(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
    }
    /**
     * @en
     * The shader property type of the material after instantiation.
     *
     * @zh
     * 实例后的材质的着色器属性类型。
     */
    export enum InstanceMaterialType {
        ADDCOLOR = 0,
        ADDCOLORANDTEXTURE = 1,
        GRAYSCALE = 2
    }
    /**
     * @en
     * Base class for components which supports rendering features.
     *
     * @zh
     * 所有支持渲染的 UI 组件的基类。
     */
    export class UIRenderComponent extends UIComponent {
        get srcBlendFactor(): GFXBlendFactor;
        set srcBlendFactor(value: GFXBlendFactor);
        get dstBlendFactor(): GFXBlendFactor;
        set dstBlendFactor(value: GFXBlendFactor);
        get color(): Readonly<math.Color>;
        set color(value: Readonly<math.Color>);
        get sharedMaterial(): Material | null;
        set sharedMaterial(value: Material | null);
        get material(): Material | null;
        get renderData(): __private.cocos_core_renderer_ui_render_data_RenderData | null;
        set delegateSrc(value: Node);
        static BlendState: typeof GFXBlendFactor;
        static Assembler: __private.cocos_core_renderer_ui_base_IAssemblerManager | null;
        static PostAssembler: __private.cocos_core_renderer_ui_base_IAssemblerManager | null;
        protected _srcBlendFactor: GFXBlendFactor;
        protected _dstBlendFactor: GFXBlendFactor;
        protected _color: math.Color;
        protected _sharedMaterial: Material | null;
        protected _assembler: __private.cocos_core_renderer_ui_base_IAssembler | null;
        protected _postAssembler: __private.cocos_core_renderer_ui_base_IAssembler | null;
        protected _renderData: __private.cocos_core_renderer_ui_render_data_RenderData | null;
        protected _renderDataFlag: boolean;
        protected _renderFlag: boolean;
        protected _delegateSrc: Node | null;
        protected _material: Material | null;
        protected _instanceMaterialType: InstanceMaterialType;
        protected _blendTemplate: {
            blendState: {
                targets: {
                    blendSrc: GFXBlendFactor;
                    blendDst: GFXBlendFactor;
                }[];
            };
            depthStencilState: {};
            rasterizerState: {};
        };
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        /**
         * @en
         * Marks the render data of the current component as modified so that the render data is recalculated.
         *
         * @zh
         * 标记当前组件的渲染数据为已修改状态，这样渲染数据才会重新计算。
         *
         * @param enable 是否标记为已修改。
         */
        markForUpdateRenderData(enable?: boolean): void;
        /**
         * @en
         * Request a new render data.
         *
         * @zh
         * 请求渲染数据。
         *
         * @return 渲染数据 RenderData。
         */
        requestRenderData(): __private.cocos_core_renderer_ui_render_data_RenderData;
        /**
         * @en
         * Destroy render data.
         *
         * @zh
         * 渲染数据销毁。
         */
        destroyRenderData(): void;
        updateAssembler(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        postUpdateAssembler(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        protected _render(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        protected _postRender(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        protected _checkAndUpdateRenderData(): void;
        protected _canRender(): boolean;
        protected _postCanRender(): void;
        protected _updateColor(): void;
        protected _updateMaterial(material: Material | null): void;
        protected _updateBlendFunc(): void;
        protected _nodeStateChange(type: __private.cocos_core_scene_graph_node_enum_TransformBit): void;
        protected _instanceMaterial(): void;
        protected _flushAssembler?(): void;
    }
    /**
     * @en
     * The component of transform in UI.
     *
     * @zh
     * UI 变换组件。
     */
    export class UITransformComponent extends Component {
        get contentSize(): Readonly<math.Size>;
        set contentSize(value: Readonly<math.Size>);
        get width(): number;
        set width(value: number);
        get height(): number;
        set height(value: number);
        get anchorPoint(): Readonly<math.Vec2>;
        set anchorPoint(value: Readonly<math.Vec2>);
        get anchorX(): number;
        set anchorX(value: number);
        get anchorY(): number;
        set anchorY(value: number);
        get priority(): number;
        set priority(value: number);
        protected _priority: number;
        get visibility(): number;
        static EventType: typeof SystemEventType;
        _canvas: CanvasComponent | null;
        protected _contentSize: math.Size;
        protected _anchorPoint: math.Vec2;
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        /**
         * @en
         * Sets the untransformed size of the node.<br/>
         * The contentSize remains the same no matter if the node is scaled or rotated.<br/>
         * All nodes have a size. Layer and Scene have the same size of the screen.
         *
         * @zh
         * 设置节点原始大小，不受该节点是否被缩放或者旋转的影响。
         *
         * @param size - 节点内容变换的尺寸或者宽度。
         * @param height - 节点内容未变换的高度。
         * @example
         * ```typescript
         * node.setContentSize(cc.size(100, 100));
         * node.setContentSize(100, 100);
         * ```
         */
        setContentSize(size: math.Size | number, height?: number): void;
        /**
         * @en
         * Sets the anchor point in percent. <br/>
         * anchor point is the point around which all transformations and positioning manipulations take place. <br/>
         * It's like a pin in the node where it is "attached" to its parent. <br/>
         * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.<br/>
         * But you can use values higher than (1,1) and lower than (0,0) too.<br/>
         * The default anchor point is (0.5,0.5), so it starts at the center of the node.
         *
         * @zh
         * 设置锚点的百分比。<br>
         * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br>
         * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br>
         * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br>
         * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br>
         * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
         *
         * @param point - 节点锚点或节点 x 轴锚。
         * @param y - 节点 y 轴锚。
         * @example
         * ```typescript
         * node.setAnchorPoint(cc.v2(1, 1));
         * node.setAnchorPoint(1, 1);
         * ```
         */
        setAnchorPoint(point: math.Vec2 | number, y?: number): void;
        /**
         * @zh
         * 当前节点的点击计算。
         *
         * @param point - 屏幕点。
         * @param listener - 事件监听器。
         */
        isHit(point: math.Vec2, listener?: __private.cocos_core_platform_event_manager_event_listener_EventListener): any;
        /**
         * @en
         * Converts a Point to node (local) space coordinates.
         *
         * @zh
         * 将一个 UI 节点世界坐标系下点转换到另一个 UI 节点 (局部) 空间坐标系，这个坐标系以锚点为原点。
         * 非 UI 节点转换到 UI 节点(局部) 空间坐标系，请走 CameraComponent 的 `convertToUINode`。
         *
         * @param worldPoint - 世界坐标点。
         * @param out - 转换后坐标。
         * @returns - 返回与目标节点的相对位置。
         * @example
         * ```typescript
         * const newVec3 = uiTransform.convertToNodeSpaceAR(cc.v3(100, 100, 0));
         * ```
         */
        convertToNodeSpaceAR(worldPoint: math.Vec3, out?: math.Vec3): math.Vec3;
        /**
         * @en
         * Converts a Point in node coordinates to world space coordinates.
         *
         * @zh
         * 将距当前节点坐标系下的一个点转换到世界坐标系。
         *
         * @param nodePoint - 节点坐标。
         * @param out - 转换后坐标。
         * @returns - 返回 UI 世界坐标系。
         * @example
         * ```typescript
         * const newVec3 = uiTransform.convertToWorldSpaceAR(3(100, 100, 0));
         * ```
         */
        convertToWorldSpaceAR(nodePoint: math.Vec3, out?: math.Vec3): math.Vec3;
        /**
         * @en
         * Returns a "local" axis aligned bounding box of the node. <br/>
         * The returned box is relative only to its parent.
         *
         * @zh
         * 返回父节坐标系下的轴向对齐的包围盒。
         *
         * @return - 节点大小的包围盒
         * @example
         * ```typescript
         * const boundingBox = uiTransform.getBoundingBox();
         * ```
         */
        getBoundingBox(): math.Rect;
        /**
         * @en
         * Returns a "world" axis aligned bounding box of the node.<br/>
         * The bounding box contains self and active children's world bounding box.
         *
         * @zh
         * 返回节点在世界坐标系下的对齐轴向的包围盒（AABB）。
         * 该边框包含自身和已激活的子节点的世界边框。
         *
         * @returns - 返回世界坐标系下包围盒。
         * @example
         * ```typescript
         * const newRect = uiTransform.getBoundingBoxToWorld();
         * ```
         */
        getBoundingBoxToWorld(): math.Rect;
        /**
         * @en
         * Returns the minimum bounding box containing the current bounding box and its child nodes.
         *
         * @zh
         * 返回包含当前包围盒及其子节点包围盒的最小包围盒。
         *
         * @param parentMat - 父节点矩阵。
         * @returns
         */
        getBoundingBoxTo(parentMat: math.Mat4): math.Rect;
        /**
         * @en
         * Compute the corresponding aabb in world space for raycast.
         *
         * @zh
         * 计算出此 UI_2D 节点在世界空间下的 aabb 包围盒
         */
        getComputeAABB(out?: geometry.aabb): geometry.aabb | undefined;
        _updateVisibility(): void;
        protected _parentChanged(node: Node): void;
        protected _sortSiblings(): void;
    }
    export namespace utils {
        /**
         * save a color buffer to a PPM file
         */
        export function toPPM(buffer: Uint8Array, w: number, h: number): string;
        export function readMesh(mesh: Mesh, iPrimitive?: number): primitives.IGeometry;
        export function createMesh(geometry: primitives.IGeometry, out?: Mesh, options?: createMesh.IOptions): Mesh;
        export namespace createMesh {
            export interface IOptions {
                calculateBounds?: boolean;
            }
        }
        export function readBuffer(target: DataView, format?: GFXFormat, offset?: number, length?: number, stride?: number, out?: number[]): number[];
        export function writeBuffer(target: DataView, data: number[], format?: GFXFormat, offset?: number, stride?: number): void;
        export function mapBuffer(target: DataView, callback: (cur: number, idx: number, view: DataView) => number, format?: GFXFormat, offset?: number, length?: number, stride?: number, out?: DataView): DataView;
    }
    export const effects: ({
        name: string;
        _uuid: string;
        techniques: {
            name: string;
            passes: {
                rasterizerState: {
                    cullMode: number;
                };
                blendState: {
                    targets: {
                        blend: boolean;
                        blendSrc: number;
                        blendDst: number;
                        blendSrcAlpha: number;
                        blendDstAlpha: number;
                    }[];
                };
                program: string;
                depthStencilState: {
                    depthTest: boolean;
                    depthWrite: boolean;
                };
                properties: {
                    mainTexture: {
                        value: string;
                        type: number;
                    };
                    mainTiling_Offset: {
                        value: number[];
                        type: number;
                    };
                    tintColor: {
                        value: number[];
                        type: number;
                    };
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
                locals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
            };
            defines: ({
                name: string;
                type: string;
                range: number[];
            } | {
                name: string;
                type: string;
                range?: undefined;
            })[];
            blocks: {
                name: string;
                defines: string[];
                binding: number;
                members: {
                    name: string;
                    type: number;
                    count: number;
                }[];
            }[];
            samplers: {
                name: string;
                type: number;
                count: number;
                defines: string[];
                binding: number;
            }[];
            attributes: {
                name: string;
                type: number;
                count: number;
                defines: string[];
                format: number;
                location: number;
            }[];
        }[];
    } | {
        name: string;
        _uuid: string;
        techniques: {
            name: string;
            passes: {
                rasterizerState: {
                    cullMode: number;
                };
                blendState: {
                    targets: {
                        blend: boolean;
                        blendSrc: number;
                        blendDst: number;
                        blendSrcAlpha: number;
                        blendDstAlpha: number;
                    }[];
                };
                program: string;
                depthStencilState: {
                    depthTest: boolean;
                    depthWrite: boolean;
                };
                properties: {
                    mainTexture: {
                        value: string;
                        type: number;
                    };
                    mainTiling_Offset: {
                        value: number[];
                        type: number;
                    };
                    frameTile_velLenScale: {
                        value: number[];
                        type: number;
                    };
                    tintColor: {
                        value: number[];
                        type: number;
                    };
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
                locals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
            };
            defines: ({
                name: string;
                type: string;
                range: number[];
            } | {
                name: string;
                type: string;
                range?: undefined;
            })[];
            blocks: {
                name: string;
                defines: never[];
                binding: number;
                members: {
                    name: string;
                    type: number;
                    count: number;
                }[];
            }[];
            samplers: {
                name: string;
                type: number;
                count: number;
                defines: never[];
                binding: number;
            }[];
            attributes: {
                name: string;
                type: number;
                count: number;
                defines: never[];
                format: number;
                location: number;
            }[];
        }[];
    } | {
        name: string;
        _uuid: string;
        techniques: {
            passes: {
                blendState: {
                    targets: {
                        blend: boolean;
                        blendSrc: number;
                        blendDst: number;
                        blendDstAlpha: number;
                    }[];
                };
                rasterizerState: {
                    cullMode: number;
                };
                program: string;
                priority: number;
                depthStencilState: {
                    depthTest: boolean;
                    depthWrite: boolean;
                };
                properties: {
                    mainTexture: {
                        value: string;
                        type: number;
                    };
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
                locals: {
                    blocks: {
                        name: string;
                        defines: string[];
                    }[];
                    samplers: never[];
                };
            };
            defines: {
                name: string;
                type: string;
            }[];
            blocks: never[];
            samplers: {
                name: string;
                type: number;
                count: number;
                defines: string[];
                binding: number;
            }[];
            attributes: {
                name: string;
                type: number;
                count: number;
                defines: never[];
                format: number;
                location: number;
            }[];
        }[];
    } | {
        name: string;
        _uuid: string;
        techniques: {
            name: string;
            passes: {
                program: string;
                properties: {
                    tilingOffset: {
                        value: number[];
                        type: number;
                    };
                    mainColor: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    albedoScale: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    alphaThreshold: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    occlusion: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    roughness: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    metallic: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    normalStrenth: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    emissive: {
                        value: number[];
                        type: number;
                    };
                    emissiveScale: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    mainTexture: {
                        value: string;
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    normalMap: {
                        value: string;
                        type: number;
                    };
                    pbrMap: {
                        value: string;
                        type: number;
                    };
                    metallicRoughnessMap: {
                        value: string;
                        type: number;
                    };
                    occlusionMap: {
                        value: string;
                        type: number;
                    };
                    emissiveMap: {
                        value: string;
                        type: number;
                    };
                    albedo: {
                        type: number;
                        value: number[];
                    };
                    albedoScaleAndCutoff: {
                        type: number;
                        value: number[];
                    };
                    pbrParams: {
                        type: number;
                        value: number[];
                    };
                    emissiveScaleParam: {
                        type: number;
                        value: number[];
                    };
                    albedoMap: {
                        type: number;
                        value: string;
                    };
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: {
                        name: string;
                        defines: string[];
                    }[];
                };
                locals: {
                    blocks: {
                        name: string;
                        defines: string[];
                    }[];
                    samplers: {
                        name: string;
                        defines: string[];
                    }[];
                };
            };
            defines: ({
                name: string;
                type: string;
                range?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                range: number[];
                options?: undefined;
            } | {
                name: string;
                type: string;
                options: string[];
                range?: undefined;
            })[];
            blocks: {
                name: string;
                defines: never[];
                binding: number;
                members: {
                    name: string;
                    type: number;
                    count: number;
                }[];
            }[];
            samplers: {
                name: string;
                type: number;
                count: number;
                defines: string[];
                binding: number;
            }[];
            attributes: ({
                name: string;
                type: number;
                count: number;
                defines: string[];
                format: number;
                isInstanced: boolean;
                location: number;
            } | {
                name: string;
                type: number;
                count: number;
                defines: string[];
                format: number;
                location: number;
                isInstanced?: undefined;
            })[];
        }[];
    } | {
        name: string;
        _uuid: string;
        techniques: {
            name: string;
            passes: {
                program: string;
                properties: {
                    UVScale: {
                        value: number[];
                        type: number;
                    };
                    lightMapUVParam: {
                        value: number[];
                        type: number;
                    };
                    weightMap: {
                        value: string;
                        type: number;
                    };
                    detailMap0: {
                        value: string;
                        type: number;
                    };
                    detailMap1: {
                        value: string;
                        type: number;
                    };
                    detailMap2: {
                        value: string;
                        type: number;
                    };
                    detailMap3: {
                        value: string;
                        type: number;
                    };
                    lightMap: {
                        value: string;
                        type: number;
                    };
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
                locals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
            };
            defines: ({
                name: string;
                type: string;
                range: number[];
            } | {
                name: string;
                type: string;
                range?: undefined;
            })[];
            blocks: {
                name: string;
                defines: never[];
                binding: number;
                members: {
                    name: string;
                    type: number;
                    count: number;
                }[];
            }[];
            samplers: {
                name: string;
                type: number;
                count: number;
                defines: never[];
                binding: number;
            }[];
            attributes: {
                name: string;
                type: number;
                count: number;
                defines: never[];
                format: number;
                location: number;
            }[];
        }[];
    } | {
        name: string;
        _uuid: string;
        techniques: {
            name: string;
            passes: {
                program: string;
                properties: {
                    mainTexture: {
                        value: string;
                        type: number;
                    };
                    tilingOffset: {
                        value: number[];
                        type: number;
                    };
                    mainColor: {
                        value: number[];
                        type: number;
                    };
                    colorScale: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    alphaThreshold: {
                        value: number[];
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    color: {
                        type: number;
                        handleInfo: (string | number)[];
                    };
                    colorScaleAndCutoff: {
                        type: number;
                        value: number[];
                    };
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
                locals: {
                    blocks: {
                        name: string;
                        defines: string[];
                    }[];
                    samplers: {
                        name: string;
                        defines: string[];
                    }[];
                };
            };
            defines: ({
                name: string;
                type: string;
                range?: undefined;
                options?: undefined;
            } | {
                name: string;
                type: string;
                range: number[];
                options?: undefined;
            } | {
                name: string;
                type: string;
                options: string[];
                range?: undefined;
            })[];
            blocks: {
                name: string;
                defines: string[];
                binding: number;
                members: {
                    name: string;
                    type: number;
                    count: number;
                }[];
            }[];
            samplers: {
                name: string;
                type: number;
                count: number;
                defines: string[];
                binding: number;
            }[];
            attributes: ({
                name: string;
                type: number;
                count: number;
                defines: string[];
                format: number;
                isInstanced: boolean;
                location: number;
            } | {
                name: string;
                type: number;
                count: number;
                defines: string[];
                format: number;
                location: number;
                isInstanced?: undefined;
            })[];
        }[];
    } | {
        name: string;
        _uuid: string;
        techniques: {
            passes: {
                phase: string;
                blendState: {
                    targets: {
                        blend: boolean;
                        blendSrc: number;
                        blendDst: number;
                        blendDstAlpha: number;
                    }[];
                };
                program: string;
                depthStencilState: {
                    depthTest: boolean;
                    depthWrite: boolean;
                    stencilTestFront: boolean;
                    stencilFuncFront: number;
                    stencilPassOpFront: number;
                    stencilRefBack: number;
                    stencilRefFront: number;
                    stencilReadMaskBack: number;
                    stencilReadMaskFront: number;
                    stencilWriteMaskBack: number;
                    stencilWriteMaskFront: number;
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
                locals: {
                    blocks: {
                        name: string;
                        defines: string[];
                    }[];
                    samplers: {
                        name: string;
                        defines: string[];
                    }[];
                };
            };
            defines: ({
                name: string;
                type: string;
                range?: undefined;
            } | {
                name: string;
                type: string;
                range: number[];
            })[];
            blocks: never[];
            samplers: never[];
            attributes: ({
                name: string;
                type: number;
                count: number;
                defines: string[];
                format: number;
                isInstanced: boolean;
                location: number;
            } | {
                name: string;
                type: number;
                count: number;
                defines: string[];
                format: number;
                location: number;
                isInstanced?: undefined;
            })[];
        }[];
    } | {
        name: string;
        _uuid: string;
        techniques: {
            passes: {
                rasterizerState: {
                    cullMode: number;
                };
                program: string;
                priority: number;
                depthStencilState: {
                    depthTest: boolean;
                    depthWrite: boolean;
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: {
                        name: string;
                        defines: never[];
                    }[];
                };
                locals: {
                    blocks: never[];
                    samplers: never[];
                };
            };
            defines: ({
                name: string;
                type: string;
                range: number[];
            } | {
                name: string;
                type: string;
                range?: undefined;
            })[];
            blocks: never[];
            samplers: never[];
            attributes: {
                name: string;
                type: number;
                count: number;
                defines: never[];
                format: number;
                location: number;
            }[];
        }[];
    } | {
        name: string;
        _uuid: string;
        techniques: {
            passes: {
                blendState: {
                    targets: {
                        blend: boolean;
                        blendSrc: number;
                        blendDst: number;
                        blendDstAlpha: number;
                    }[];
                };
                rasterizerState: {
                    cullMode: number;
                };
                program: string;
                depthStencilState: {
                    depthTest: boolean;
                    depthWrite: boolean;
                };
            }[];
        }[];
        shaders: {
            name: string;
            hash: number;
            glsl3: {
                vert: string;
                frag: string;
            };
            glsl1: {
                vert: string;
                frag: string;
            };
            builtins: {
                globals: {
                    blocks: {
                        name: string;
                        defines: never[];
                    }[];
                    samplers: never[];
                };
                locals: {
                    blocks: never[];
                    samplers: never[];
                };
            };
            defines: {
                name: string;
                type: string;
            }[];
            blocks: {
                name: string;
                defines: never[];
                binding: number;
                members: {
                    name: string;
                    type: number;
                    count: number;
                }[];
            }[];
            samplers: {
                name: string;
                type: number;
                count: number;
                defines: never[];
                binding: number;
            }[];
            attributes: {
                name: string;
                type: number;
                count: number;
                defines: never[];
                format: number;
                location: number;
            }[];
        }[];
    })[];
    export const builtinResMgr: __private.cocos_core_3d_builtin_init_BuiltinResMgr;
    /**
     * @en The Camera Component.
     * @zh 相机组件。
     */
    export class CameraComponent extends Component {
        static ProjectionType: typeof renderer.CameraProjection;
        static FOVAxis: typeof renderer.CameraFOVAxis;
        static ClearFlag: {
            SKYBOX: number;
            SOLID_COLOR: GFXClearFlag;
            DEPTH_ONLY: GFXClearFlag;
            DONT_CLEAR: GFXClearFlag;
        };
        static Aperture: typeof renderer.CameraAperture;
        static Shutter: typeof renderer.CameraShutter;
        static ISO: typeof renderer.CameraISO;
        protected _projection: renderer.CameraProjection;
        protected _priority: number;
        protected _fov: number;
        protected _fovAxis: renderer.CameraFOVAxis;
        protected _orthoHeight: number;
        protected _near: number;
        protected _far: number;
        protected _color: math.Color;
        protected _depth: number;
        protected _stencil: number;
        protected _clearFlags: GFXClearFlag;
        protected _rect: math.Rect;
        protected _aperture: renderer.CameraAperture;
        protected _shutter: renderer.CameraShutter;
        protected _iso: renderer.CameraISO;
        protected _screenScale: number;
        protected _visibility: number;
        protected _targetTexture: RenderTexture | null;
        protected _camera: renderer.Camera | null;
        protected _inEditorMode: boolean;
        protected _flows: string[] | undefined;
        get camera(): renderer.Camera;
        get priority(): number;
        set priority(val: number);
        get visibility(): number;
        set visibility(val: number);
        get clearFlags(): GFXClearFlag;
        set clearFlags(val: GFXClearFlag);
        get clearColor(): Readonly<math.Color>;
        set clearColor(val: Readonly<math.Color>);
        get clearDepth(): number;
        set clearDepth(val: number);
        get clearStencil(): number;
        set clearStencil(val: number);
        get projection(): renderer.CameraProjection;
        set projection(val: renderer.CameraProjection);
        get fovAxis(): renderer.CameraFOVAxis;
        set fovAxis(val: renderer.CameraFOVAxis);
        get fov(): number;
        set fov(val: number);
        get orthoHeight(): number;
        set orthoHeight(val: number);
        get near(): number;
        set near(val: number);
        get far(): number;
        set far(val: number);
        get aperture(): renderer.CameraAperture;
        set aperture(val: renderer.CameraAperture);
        get shutter(): renderer.CameraShutter;
        set shutter(val: renderer.CameraShutter);
        get iso(): renderer.CameraISO;
        set iso(val: renderer.CameraISO);
        get rect(): math.Rect;
        set rect(val: math.Rect);
        get targetTexture(): RenderTexture | null;
        set targetTexture(value: RenderTexture | null);
        get screenScale(): number;
        set screenScale(val: number);
        get inEditorMode(): boolean;
        set inEditorMode(value: boolean);
        set flows(val: any);
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        screenPointToRay(x: number, y: number, out?: geometry.ray): geometry.ray;
        worldToScreen(worldPos: math.Vec3, out?: math.Vec3): math.Vec3;
        screenToWorld(screenPos: math.Vec3, out?: math.Vec3): math.Vec3;
        /**
         * @zh 3D 节点转 UI 本地节点坐标。
         * 注意：千万不要设置负责做转换的 uiNode 和最终设置位置的 uiNode 是同一个 node，否则可能出现跳动现象。
         * @param wpos 3D 节点事件坐标
         * @param uiNode UI 节点
         * @param out 返回在当前传入的 UI 节点下的偏移量
         *
         * @example
         * ```typescript
         * this.convertToUINode(target.worldPosition, uiNode.parent, out);
         * uiNode.position = out;
         * ```
         */
        convertToUINode(wpos: math.Vec3, uiNode: Node, out?: math.Vec3): math.Vec3;
        protected _createCamera(): void;
        protected _attachToScene(): void;
        protected _detachFromScene(): void;
        protected onSceneChanged(scene: Scene): void;
        protected _chechTargetTextureEvent(old: RenderTexture | null): void;
        protected _updateTargetTexture(): void;
    }
    export class LightComponent extends Component {
        static Type: typeof renderer.LightType;
        static PhotometricTerm: {
            LUMINOUS_POWER: number;
            LUMINANCE: number;
        };
        protected _color: math.Color;
        protected _useColorTemperature: boolean;
        protected _colorTemperature: number;
        protected _bakeType: __private.cocos_core_3d_framework_light_component_LightBakeType;
        protected _type: renderer.LightType;
        protected _lightType: typeof renderer.Light;
        protected _light: renderer.Light | null;
        get bakeType(): __private.cocos_core_3d_framework_light_component_LightBakeType;
        set bakeType(val: __private.cocos_core_3d_framework_light_component_LightBakeType);
        get color(): Readonly<math.Color>;
        set color(val: Readonly<math.Color>);
        get useColorTemperature(): boolean;
        set useColorTemperature(enable: boolean);
        get colorTemperature(): number;
        set colorTemperature(val: number);
        get type(): renderer.LightType;
        constructor();
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        protected _createLight(): void;
        protected _destroyLight(): void;
        protected _attachToScene(): void;
        protected _detachFromScene(): void;
    }
    /**
     * 模型组件。
     * @class ModelComponent
     */
    export class ModelComponent extends RenderableComponent {
        static ShadowCastingMode: {
            /**
             * @zh Disable shadow projection.
             * @zh 不投射阴影。
             */
            OFF: number;
            /**
             * @zh Enable shadow projection.
             * @zh 开启阴影投射。
             */
            ON: number;
        };
        lightmapSettings: __private.cocos_core_3d_framework_model_component_ModelLightmapSettings;
        protected _mesh: Mesh | null;
        protected _shadowCastingMode: number;
        get shadowCastingMode(): number;
        set shadowCastingMode(val: number);
        get mesh(): Mesh | null;
        set mesh(val: Mesh | null);
        get model(): renderer.__private.cocos_core_renderer_models_morph_model_MorphModel | null;
        get enableMorph(): boolean;
        set enableMorph(value: boolean);
        protected _modelType: typeof renderer.__private.cocos_core_renderer_models_morph_model_MorphModel;
        protected _model: renderer.__private.cocos_core_renderer_models_morph_model_MorphModel | null;
        constructor();
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        setWeights(weights: number[], subMeshIndex: number): void;
        setInstancedAttribute(name: string, value: ArrayLike<number>): void;
        _updateLightmap(lightmap: Texture2D | null, uoff: number, voff: number, uscale: number, vscale: number): void;
        protected _updateModels(): void;
        protected _createModel(): void;
        protected _attachToScene(): void;
        protected _detachFromScene(): void;
        protected _updateModelParams(): void;
        protected _onMaterialModified(idx: number, material: Material | null): void;
        protected _onRebuildPSO(idx: number, material: Material): void;
        protected _onMeshChanged(old: Mesh | null): void;
        protected _clearMaterials(): void;
        protected _getBuiltinMaterial(): Material;
        protected _onVisiblityChange(val: number): void;
        protected _updateCastShadow(): void;
        protected _isBatchingEnabled(): boolean;
    }
    /**
     * @en The Skinning Model Component.
     * @zh 蒙皮模型组件。
     */
    export class SkinningModelComponent extends ModelComponent {
        protected _skeleton: Skeleton | null;
        protected _skinningRoot: Node | null;
        protected _clip: AnimationClip | null;
        get skeleton(): Skeleton | null;
        set skeleton(val: Skeleton | null);
        get skinningRoot(): Node | null;
        set skinningRoot(value: Node | null);
        get model(): renderer.BakedSkinningModel | renderer.SkinningModel | null;
        constructor();
        __preload(): void;
        uploadAnimation(clip: AnimationClip | null): void;
        setUseBakedAnimation(val?: boolean): void;
        setMaterial(material: Material | null, index: number): void;
        protected _updateModelParams(): void;
    }
    /**
     * @en The Batched Skinning Model Component, batches multiple skeleton-sharing skinning models.
     * @zh 蒙皮模型合批组件，用于合并绘制共享同一骨骼资源的所有蒙皮模型。
     */
    export class BatchedSkinningModelComponent extends SkinningModelComponent {
        /**
         * @en Size of the generated texture atlas.
         * @zh 合图生成的最终图集的边长。
         */
        atlasSize: number;
        /**
         * @en
         * Texture properties that will be actually using the generated atlas.<br>
         * The first unit's texture will be used if not specified.
         * @zh
         * 材质中真正参与合图的贴图属性，不参与的属性统一使用第一个 unit 的贴图。
         */
        batchableTextureNames: string[];
        /**
         * @en Source skinning model components, containing all the data to be batched.
         * @zh 合批前的子蒙皮模型数组，最主要的数据来源。
         */
        units: SkinningModelUnit[];
        get mesh(): Mesh | null;
        set mesh(val: Mesh | null);
        get skeleton(): Skeleton | null;
        set skeleton(val: Skeleton | null);
        onLoad(): void;
        onDestroy(): void;
        _onMaterialModified(idx: number, material: Material | null): void;
        cook(): void;
        cookMaterials(): void;
        cookSkeletons(): void;
        cookMeshes(): void;
        protected cookTextures(target: Texture2D, prop: string, passIdx: number): void;
        protected createTexture(prop: string): Texture2D;
        protected resizeAtlases(): void;
    }
    export class SkinningModelUnit {
        /**
         * @en Skinning mesh of this unit.
         * @zh 子蒙皮模型的网格模型。
         */
        mesh: Mesh | null;
        /**
         * @en Skeleton of this unit.
         * @zh 子蒙皮模型的骨骼。
         */
        skeleton: Skeleton | null;
        /**
         * @en Skinning material of this unit.
         * @zh 子蒙皮模型使用的材质。
         */
        material: Material | null;
        _localTransform: math.Mat4;
        set offset(offset: math.Vec2);
        get offset(): math.Vec2;
        set size(size: math.Vec2);
        get size(): math.Vec2;
        set copyFrom(comp: SkinningModelComponent | null);
        get copyFrom(): SkinningModelComponent | null;
    }
    export class RenderableComponent extends Component {
        protected _materials: (Material | null)[];
        protected _visFlags: number;
        get visibility(): number;
        set visibility(val: number);
        get sharedMaterials(): (Material | null)[];
        set sharedMaterials(val: (Material | null)[]);
        get materials(): (renderer.MaterialInstance | null)[];
        set materials(val: (renderer.MaterialInstance | null)[]);
        protected _materialInstances: (renderer.MaterialInstance | null)[];
        protected _models: renderer.Model[];
        get sharedMaterial(): Material | null;
        /**
         * @en Get the shared material asset of the specified sub-model.
         * @zh 获取指定子模型的共享材质资源。
         */
        getMaterial(idx: number): Material | null;
        /**
         * @en Set the shared material asset of the specified sub-model,
         * new material instance will be created automatically if the sub-model is already using one.
         * @zh 设置指定子模型的 sharedMaterial，如果对应位置有材质实例则会创建一个对应的材质实例。
         */
        setMaterial(material: Material | null, index: number): void;
        get material(): Material | null;
        set material(val: Material | null);
        /**
         * @en Get the material instance of the specified sub-model.
         * @zh 获取指定子模型的材质实例。
         */
        getMaterialInstance(idx: number): Material | null;
        /**
         * @en Set the material instance of the specified sub-model.
         * @zh 获取指定子模型的材质实例。
         */
        setMaterialInstance(index: number, matInst: Material | null): void;
        /**
         * @en Get the actual rendering material of the specified sub-model.
         * (material instance if there is one, or the shared material asset)
         * @zh 获取指定位置可供渲染的材质，如果有材质实例则使用材质实例，如果没有则使用材质资源
         */
        getRenderMaterial(index: number): Material | null;
        _collectModels(): renderer.Model[];
        protected _attachToScene(): void;
        protected _detachFromScene(): void;
        protected _onMaterialModified(index: number, material: Material | null): void;
        protected _onRebuildPSO(index: number, material: Material | null): void;
        protected _clearMaterials(): void;
        protected _onVisiblityChange(val: any): void;
    }
    export class DirectionalLightComponent extends LightComponent {
        protected _illuminance: number;
        protected _type: renderer.LightType;
        protected _light: renderer.DirectionalLight | null;
        get illuminance(): number;
        set illuminance(val: number);
        constructor();
        protected _createLight(): void;
    }
    export class SphereLightComponent extends LightComponent {
        protected _size: number;
        protected _luminance: number;
        protected _term: number;
        protected _range: number;
        protected _type: renderer.LightType;
        protected _light: renderer.SphereLight | null;
        get luminousPower(): number;
        set luminousPower(val: number);
        get luminance(): number;
        set luminance(val: number);
        get term(): number;
        set term(val: number);
        get size(): number;
        set size(val: number);
        get range(): number;
        set range(val: number);
        constructor();
        protected _createLight(): void;
    }
    export class SpotLightComponent extends LightComponent {
        protected _size: number;
        protected _luminance: number;
        protected _term: number;
        protected _range: number;
        protected _spotAngle: number;
        protected _type: renderer.LightType;
        protected _light: renderer.SpotLight | null;
        get luminousPower(): number;
        set luminousPower(val: number);
        get luminance(): number;
        set luminance(val: number);
        get term(): number;
        set term(val: number);
        get size(): number;
        set size(val: number);
        get range(): number;
        set range(val: number);
        get spotAngle(): number;
        set spotAngle(val: number);
        constructor();
        protected _createLight(): void;
    }
    /**
     * Alias of `isPropertyPath(path) && typeof path === 'string'`.
     * @deprecated Since v1.1.
     */
    export function isPropertyModifier(path: animation.TargetPath): path is string;
    /**
     * Alias of `isPropertyPath(path) && typeof path === 'number'`.
     * @deprecated Since v1.1.
     */
    export function isElementModifier(path: animation.TargetPath): path is number;
    /**
     * Alias of `isCustomPath()`.
     * @deprecated Since v1.1.
     */
    export function isCustomTargetModifier<T extends animation.ICustomTargetPath>(path: animation.TargetPath, constructor: __private.Constructor<T>): path is T;
    export namespace easing {
        /**
         * @category animation
         */
        export function constant(): number;
        export function linear(k: number): number;
        export function quadIn(k: number): number;
        export function quadOut(k: number): number;
        export function quadInOut(k: number): number;
        export function cubicIn(k: number): number;
        export function cubicOut(k: number): number;
        export function cubicInOut(k: number): number;
        export function quartIn(k: number): number;
        export function quartOut(k: number): number;
        export function quartInOut(k: number): number;
        export function quintIn(k: number): number;
        export function quintOut(k: number): number;
        export function quintInOut(k: number): number;
        export function sineIn(k: number): number;
        export function sineOut(k: number): number;
        export function sineInOut(k: number): number;
        export function expoIn(k: number): number;
        export function expoOut(k: number): number;
        export function expoInOut(k: number): number;
        export function circIn(k: number): number;
        export function circOut(k: number): number;
        export function circInOut(k: number): number;
        export function elasticIn(k: number): number;
        export function elasticOut(k: number): number;
        export function elasticInOut(k: number): number;
        export function backIn(k: number): number;
        export function backOut(k: number): number;
        export function backInOut(k: number): number;
        export function bounceIn(k: number): number;
        export function bounceOut(k: number): number;
        export function bounceInOut(k: number): number;
        export function smooth(k: number): number;
        export function fade(k: number): number;
        export const quadOutIn: (k: number) => number;
        export const cubicOutIn: (k: number) => number;
        export const quartOutIn: (k: number) => number;
        export const quintOutIn: (k: number) => number;
        export const sineOutIn: (k: number) => number;
        export const expoOutIn: (k: number) => number;
        export const circOutIn: (k: number) => number;
        export const elasticOutIn: (k: number) => number;
        export const backOutIn: (k: number) => number;
        export const bounceOutIn: (k: number) => number;
    }
    /**
     * @en
     * The AnimationState gives full control over animation playback process.
     * In most cases the Animation Component is sufficient and easier to use. Use the AnimationState if you need full control.
     * @zh
     * AnimationState 完全控制动画播放过程。<br/>
     * 大多数情况下 动画组件 是足够和易于使用的。如果您需要更多的动画控制接口，请使用 AnimationState。
     *
     */
    export class AnimationState extends __private.cocos_core_animation_playable_Playable {
        get clip(): AnimationClip;
        get name(): string;
        get length(): number;
        get wrapMode(): __private.cocos_core_animation_types_WrapMode;
        set wrapMode(value: __private.cocos_core_animation_types_WrapMode);
        get repeatCount(): number;
        set repeatCount(value: number);
        get delay(): number;
        set delay(value: number);
        /**
         * @en The curves list.
         * @zh 曲线列表。
         */
        /**
         * @en The iteration duration of this animation in seconds. (length)
         * @zh 单次动画的持续时间，秒。（动画长度）
         * @readOnly
         */
        duration: number;
        /**
         * @en The animation's playback speed. 1 is normal playback speed.
         * @zh 播放速率。
         * @default: 1.0
         */
        speed: number;
        /**
         * @en The current time of this animation in seconds.
         * @zh 动画当前的时间，秒。
         * @default 0
         */
        time: number;
        /**
         * The weight.
         */
        weight: number;
        frameRate: number;
        _lastframeEventOn: boolean;
        protected _wrapMode: __private.cocos_core_animation_types_WrapMode;
        protected _repeatCount: number;
        /**
         * Mark whether the current frame is played.
         * When set new time to animation state, we should ensure the frame at the specified time being played at next update.
         */
        protected _currentFramePlayed: boolean;
        protected _delay: number;
        protected _delayTime: number;
        protected _wrappedInfo: __private.cocos_core_animation_types_WrappedInfo;
        protected _lastWrapInfo: __private.cocos_core_animation_types_WrappedInfo | null;
        protected _lastWrapInfoEvent: __private.cocos_core_animation_types_WrappedInfo | null;
        protected _process: () => void;
        protected _target: Node | null;
        protected _targetNode: Node | null;
        protected _clip: AnimationClip;
        protected _name: string;
        protected _lastIterations?: number;
        protected _samplerSharedGroups: __private.cocos_core_animation_animation_state_ISamplerSharedGroup[];
        /**
         * May be `null` due to failed to initialize.
         */
        protected _commonTargetStatuses: Array<null | {
            target: __private.cocos_core_animation_bound_target_IBufferedTarget;
            changed: boolean;
        }>;
        protected _curveLoaded: boolean;
        protected _ignoreIndex: number;
        constructor(clip: AnimationClip, name?: string);
        get curveLoaded(): boolean;
        initialize(root: Node, propertyCurves?: keyof IRuntimeCurve[]): void;
        destroy(): void;
        _emit(type: any, state: any): void;
        emit<K extends string>(type: K, ...args: __private.cocos_core_event_defines_EventArgumentsOf<K, __private.cocos_core_animation_animation_state_IAnimationEventDefinitionMap>): void;
        on<K extends string>(type: K, callback: __private.cocos_core_event_defines_EventCallbackOf<K, __private.cocos_core_animation_animation_state_IAnimationEventDefinitionMap>, target?: any): void;
        once<K extends string>(type: K, callback: __private.cocos_core_event_defines_EventCallbackOf<K, __private.cocos_core_animation_animation_state_IAnimationEventDefinitionMap>, target?: any): void;
        off(type: string, callback: Function, target?: any): void;
        _setEventTarget(target: any): void;
        setTime(time: number): void;
        update(delta: number): void;
        _needReverse(currentIterations: number): boolean;
        getWrappedInfo(time: number, info?: __private.cocos_core_animation_types_WrappedInfo): __private.cocos_core_animation_types_WrappedInfo;
        sample(): __private.cocos_core_animation_types_WrappedInfo;
        process(): void;
        simpleProcess(): void;
        cache(frames: number): void;
        protected onPlay(): void;
        protected onStop(): void;
        protected onResume(): void;
        protected onPause(): void;
        protected _sampleCurves(ratio: number): void;
    }
    export namespace animation {
        export class UniformProxyFactory implements IValueProxyFactory {
            passIndex: number;
            uniformName: string;
            /**
             * Use when your target is a single channel of the uniform instead of who uniform.
             */
            channelIndex: number | undefined;
            constructor(uniformName?: string, passIndex?: number);
            forTarget(target: Material): IValueProxy;
        }
        export class MorphWeightsValueProxy implements IValueProxyFactory {
            subMeshIndex: number;
            forTarget(target: ModelComponent): {
                set: (value: number[]) => void;
            };
        }
        export class MorphWeightsAllValueProxy implements IValueProxyFactory {
            forTarget(target: ModelComponent): {
                set: (value: number[]) => void;
            };
        }
        export function isPropertyPath(path: TargetPath): path is PropertyPath;
        export function isCustomPath<T extends ICustomTargetPath>(path: TargetPath, constructor: __private.Constructor<T>): path is T;
        /**
         * Evaluate a sequence of paths, in order, from specified root.
         * @param root The root object.
         * @param path The path sequence.
         */
        export function evaluatePath(root: any, ...paths: TargetPath[]): any;
        export type PropertyPath = string | number;
        export interface ICustomTargetPath {
            /**
             * If errors are encountered, `null` should be returned.
             * @param target
             */
            get(target: any): any;
        }
        export type TargetPath = PropertyPath | ICustomTargetPath;
        export class HierarchyPath implements ICustomTargetPath {
            path: string;
            constructor(path?: string);
            get(target: Node): Node | null;
        }
        export class ComponentPath implements ICustomTargetPath {
            component: string;
            constructor(component?: string);
            get(target: Node): Component | null;
        }
        /**
         * @category animation
         */
        /**
         * 曲线值代理用来设置曲线值到目标，是广义的赋值。
         * 每个曲线值代理都关联着一个目标对象。
         */
        export interface IValueProxy {
            get?: () => any;
            /**
             * 设置曲线值到目标对象上。
             */
            set: (value: any) => void;
        }
        export interface IValueProxyFactory {
            /**
             * 返回指定目标的曲线值代理。
             * @param target
             */
            forTarget(target: any): IValueProxy;
        }
        export interface ICubicSplineValue<T> extends __private.cocos_core_animation_types_ILerpable {
            dataPoint: T;
            inTangent: T;
            outTangent: T;
            lerp(to: ICubicSplineValue<T>, t: number, dt: number): T;
            getNoLerp(): T;
        }
        export type CubicSplineValueConstructor<T> = new (dataPoint: T, inTangent: T, outTangent: T) => ICubicSplineValue<T>;
        export const CubicSplineVec2Value: CubicSplineValueConstructor<math.Vec2>;
        export const CubicSplineVec3Value: CubicSplineValueConstructor<math.Vec3>;
        export const CubicSplineVec4Value: CubicSplineValueConstructor<math.Vec4>;
        export const CubicSplineQuatValue: CubicSplineValueConstructor<math.Quat>;
        export class CubicSplineNumberValue implements ICubicSplineValue<number> {
            dataPoint: number;
            inTangent: number;
            outTangent: number;
            constructor(dataPoint: number, inTangent: number, outTangent: number);
            lerp(to: CubicSplineNumberValue, t: number, dt: number): number;
            getNoLerp(): number;
        }
        export namespace __private {
            export interface cocos_core_animation_types_ILerpable {
                /**
                 * 在当前曲线值与目标曲线值之间插值。
                 * @param to 目标曲线值。
                 * @param t 插值比率。
                 * @param dt 当前曲线值与目标曲线值的时间间隔，单位为秒。
                 * @returns 插值结果。
                 */
                lerp(to: any, t: number, dt: number): any;
                /**
                 * 当直接使用曲线值作为采样结果时的结果值，它应该等同于插值比率为 0 时的插值结果。
                 * @returns 插值比率为 0 时的插值结果。
                 */
                getNoLerp?(): any;
            }
        }
    }
    /**
     * Alias of `HierarchyPath`.
     * @deprecated Since v1.1.
     */
    export class HierachyModifier extends animation.HierarchyPath {
    }
    /**
     * Alias of `ComponentPath`.
     * @deprecated Since v1.1.
     */
    export class ComponentModifier extends animation.ComponentPath {
    }
    /**
     * Implements `IValueProxyFactory` but do nothing.
     * @deprecated Since v1.1.
     */
    export class CurveValueAdapter implements animation.IValueProxyFactory {
        forTarget(target: any): {
            set: () => void;
        };
    }
    /**
     * Alias of `UniformProxyFactory`.
     * @deprecated Since v1.1.
     */
    export class UniformCurveValueAdapter extends animation.UniformProxyFactory {
    }
    export function bezier(C1: number, C2: number, C3: number, C4: number, t: number): number;
    export function bezierByTime(controlPoints: BezierControlPoints, x: number): number;
    /**
     * @category animation
     */
    export type BezierControlPoints = [number, number, number, number];
    /**
     * 采样动画曲线。
     * @param curve 动画曲线。
     * @param sampler 采样器。
     * @param ratio 采样比率。
     */
    export function sampleAnimationCurve(curve: AnimCurve, sampler: RatioSampler, ratio: number): any;
    /**
     * Compute a new ratio by curve type.
     * @param ratio - The origin ratio
     * @param type - If it's Array, then ratio will be computed with bezierByTime.
     * If it's string, then ratio will be computed with cc.easing function
     */
    export function computeRatioByType(ratio: number, type: EasingMethod): number;
    /**
     * 表示曲线值，曲线值可以是任意类型，但必须符合插值方式的要求。
     */
    export type CurveValue = any;
    /**
     * 表示曲线的目标对象。
     */
    export type CurveTarget = Record<string, any>;
    /**
     * 内置帧时间渐变方式名称。
     */
    export type EasingMethodName = keyof (typeof easing);
    /**
     * 帧时间渐变方式。可能为内置帧时间渐变方式的名称或贝塞尔控制点。
     */
    export type EasingMethod = EasingMethodName | BezierControlPoints;
    export type CompressedEasingMethods = Record<number, EasingMethod>;
    /**
     * 曲线数据。
     */
    export interface IPropertyCurveData {
        /**
         * 曲线使用的时间轴。
         * @see {AnimationClip.keys}
         */
        keys: number;
        /**
         * 曲线值。曲线值的数量应和 `keys` 所引用时间轴的帧数相同。
         */
        values: CurveValue[];
        /**
         * 曲线任意两帧时间的渐变方式。仅当 `easingMethods === undefined` 时本字段才生效。
         */
        easingMethod?: EasingMethod;
        /**
         * 描述了每一帧时间到下一帧时间之间的渐变方式。
         */
        easingMethods?: EasingMethod[] | CompressedEasingMethods;
        /**
         * 是否进行插值。
         * @default true
         */
        interpolate?: boolean;
        /**
         * For internal usage only.
         */
        _arrayLength?: number;
    }
    export class RatioSampler {
        ratios: number[];
        constructor(ratios: number[]);
        sample(ratio: number): number;
    }
    /**
     * 动画曲线。
     */
    export class AnimCurve {
        static Linear: null;
        static Bezier(controlPoints: number[]): BezierControlPoints;
        types?: Array<(EasingMethod | null)>;
        type?: EasingMethod | null;
        constructor(propertyCurveData: Omit<IPropertyCurveData, "keys">, duration: number);
        hasLerp(): boolean;
        valueAt(index: number): any;
        valueBetween(ratio: number, from: number, fromRatio: number, to: number, toRatio: number): any;
        empty(): boolean;
        /**
         * Returns if this curve only yields constants.
         */
        constant(): boolean;
    }
    export class EventInfo {
        events: any[];
        /**
         * @param func event function
         * @param params event params
         */
        add(func: string, params: any[]): void;
    }
    export interface IObjectCurveData {
        [propertyName: string]: IPropertyCurveData;
    }
    export interface IComponentsCurveData {
        [componentName: string]: IObjectCurveData;
    }
    export interface INodeCurveData {
        props?: IObjectCurveData;
        comps?: IComponentsCurveData;
    }
    export type IRuntimeCurve = Pick<AnimationClip.ICurve, "modifiers" | "valueAdapter" | "commonTarget"> & {
        /**
         * 属性曲线。
         */
        curve: AnimCurve;
        /**
         * 曲线采样器。
         */
        sampler: RatioSampler | null;
    };
    export interface IAnimationEvent {
        functionName: string;
        parameters: string[];
    }
    export interface IAnimationEventGroup {
        events: IAnimationEvent[];
    }
    /**
     * 动画剪辑。
     */
    export class AnimationClip extends Asset {
        static preventDeferredLoadDependents: boolean;
        static WrapMode: typeof __private.cocos_core_animation_types_WrapMode;
        /**
         * @en Crate clip with a set of sprite frames
         * @zh 使用一组序列帧图片来创建动画剪辑
         * @example
         * ```
         * const clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
         * ```
         */
        static createWithSpriteFrames(spriteFrames: SpriteFrame[], sample: number): AnimationClip | null;
        /**
         * @zh 动画帧率，单位为帧/秒。
         */
        sample: number;
        /**
         * @zh 动画的播放速度。
         */
        speed: number;
        /**
         * @zh 动画的循环模式。
         */
        wrapMode: __private.cocos_core_animation_types_WrapMode;
        /**
         * @zh 动画包含的事件数据。
         */
        events: AnimationClip.IEvent[];
        get duration(): number;
        set duration(value: number);
        get keys(): number[][];
        set keys(value: number[][]);
        get eventGroups(): keyof IAnimationEventGroup[];
        get stepness(): number;
        set stepness(value: number);
        get hash(): number;
        get curves(): AnimationClip.ICurve[];
        set curves(value: AnimationClip.ICurve[]);
        get data(): Uint8Array | null;
        get commonTargets(): AnimationClip.ICommonTarget[];
        set commonTargets(value: AnimationClip.ICommonTarget[]);
        onLoaded(): void;
        getPropertyCurves(): keyof IRuntimeCurve[];
        /**
         * @zh 提交事件数据的修改。<br/>
         * 当你修改了 `this.events` 时，必须调用 `this.updateEventDatas()` 使修改生效。
         * @protected
         */
        updateEventDatas(): void;
        /**
         * @en Gets the event group shall be processed at specified ratio.
         * @zh 获取事件组应按指定比例处理。
         * @param ratio The ratio.
         * @protected
         */
        getEventGroupIndexAtRatio(ratio: number): number;
        /**
         * @zh 返回本动画是否包含事件数据。
         * @protected
         */
        hasEvents(): boolean;
        destroy(): boolean;
        protected _createPropertyCurves(): void;
        protected _createRuntimeEvents(): void;
        protected _applyStepness(): void;
    }
    export namespace AnimationClip {
        export type PropertyCurveData = IPropertyCurveData;
        export interface ICurve {
            commonTarget?: number;
            modifiers: animation.TargetPath[];
            valueAdapter?: animation.IValueProxyFactory;
            data: PropertyCurveData;
        }
        export interface ICommonTarget {
            modifiers: animation.TargetPath[];
            valueAdapter?: animation.IValueProxyFactory;
        }
        export interface IEvent {
            frame: number;
            func: string;
            params: string[];
        }
        export namespace _impl {
            export type MaybeCompactCurve = Omit<AnimationClip.ICurve, "data"> & {
                data: Omit<AnimationClip.PropertyCurveData, "values"> & {
                    values: any[] | CompactValueTypeArray;
                };
            };
            export type MaybeCompactKeys = Array<number[] | CompactValueTypeArray>;
        }
    }
    export class AnimationManager extends System {
        get blendState(): __private.cocos_core_animation_skeletal_animation_blending_BlendStateBuffer;
        static ID: string;
        addCrossFade(crossFade: __private.cocos_core_animation_cross_fade_CrossFade): void;
        removeCrossFade(crossFade: __private.cocos_core_animation_cross_fade_CrossFade): void;
        update(dt: number): void;
        destruct(): void;
        addAnimation(anim: AnimationState): void;
        removeAnimation(anim: AnimationState): void;
        pushDelayEvent(target: Node, func: string, args: any[]): void;
    }
    /**
     * @en The event type supported by Animation
     * @zh Animation 支持的事件类型。
     */
    export enum EventType {
        PLAY = "play",
        STOP = "stop",
        PAUSE = "pause",
        RESUME = "resume",
        LASTFRAME = "lastframe",
        FINISHED = "finished"
    }
    /**
     * 动画组件管理动画状态来控制动画的播放。
     * 它提供了方便的接口用来预创建指定动画剪辑的动画状态，并提供了一系列事件：
     *  - play : 开始播放时
     *  - stop : 停止播放时
     *  - pause : 暂停播放时
     *  - resume : 恢复播放时
     *  - lastframe : 假如动画循环次数大于 1，当动画播放到最后一帧时
     *  - finished : 动画播放完成时
     */
    export class AnimationComponent extends Component implements __private.cocos_core_event_event_target_factory_IEventTarget {
        get clips(): (AnimationClip | null)[];
        set clips(value: (AnimationClip | null)[]);
        get defaultClip(): AnimationClip | null;
        set defaultClip(value: AnimationClip | null);
        static EventType: typeof EventType;
        /**
         * @zh
         * 是否在动画组件开始运行时自动播放默认动画剪辑。
         * 注意，若在组件开始运行前调用了 `crossFade` 或 `play()`，此字段将不会生效。
         * @en
         * Whether the default clip should get into playing when this components starts.
         * Note, this field takes no effect if `crossFade()` or `play()` has been called before this component starts.
         */
        playOnLoad: boolean;
        _callbackTable: __private.cocos_core_event_callbacks_invoker_ICallbackTable;
        protected _crossFade: __private.cocos_core_animation_cross_fade_CrossFade;
        protected _nameToState: {
            [name: string]: AnimationState;
        };
        protected _clips: Array<(AnimationClip | null)>;
        protected _defaultClip: AnimationClip | null;
        onLoad(): void;
        start(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        /**
         * 立即切换到指定动画状态。
         * @param [name] 目标动画状态的名称；若未指定，使用默认动画剪辑的名称。
         */
        play(name?: string): void;
        /**
         * 在指定周期内从当前动画状态平滑地切换到指定动画状态。
         * @param name 目标动画状态的名称。
         * @param duration 切换周期，单位为秒。
         */
        crossFade(name: string, duration?: number): void;
        /**
         * 暂停所有动画状态，并暂停动画切换。
         */
        pause(): void;
        /**
         * 恢复所有动画状态，并继续动画切换。
         */
        resume(): void;
        /**
         * 停止所有动画状态，并停止动画切换。
         */
        stop(): void;
        /**
         * 获取指定的动画状态。
         * @deprecated 将在 V1.0.0 移除，请转用 `this.getState()`。
         */
        getAnimationState(name: string): AnimationState;
        /**
         * 获取指定的动画状态。
         * @param name 动画状态的名称。
         * @returns 不存在指定名称的动画状态时返回空，否则返回指定的动画状态。
         */
        getState(name: string): AnimationState;
        /**
         * 使用指定的动画剪辑创建一个动画状态，并将其命名为指定的名称。
         * 若指定名称的动画状态已存在，已存在的动画状态将先被设为停止并被移除。
         * @param clip 动画剪辑。
         * @param name 动画状态的名称，若未指定，则使用动画剪辑的名称。
         * @returns 新创建的动画状态。
         */
        createState(clip: AnimationClip, name?: string): AnimationState;
        /**
         * 停止并移除指定名称的动画状态。
         * @param name 动画状态的名称。
         */
        removeState(name: string): void;
        /**
         * 添加一个动画剪辑到 `this.clips`中并以此剪辑创建动画状态。
         * @deprecated 将在 V1.0.0 移除，请转用 `this.createState()`。
         * @param clip 动画剪辑。
         * @param name 动画状态的名称，若未指定，则使用动画剪辑的名称。
         * @returns 新创建的动画状态。
         */
        addClip(clip: AnimationClip, name?: string): AnimationState;
        /**
         * @en
         * Remove clip from the animation list. This will remove the clip and any animation states based on it.<br>
         * If there are animation states depend on the clip are playing or clip is defaultClip, it will not delete the clip.<br>
         * But if force is true, then will always remove the clip and any animation states based on it. If clip is defaultClip, defaultClip will be reset to null
         * @zh
         * 从动画列表中移除指定的动画剪辑，<br/>
         * 如果依赖于 clip 的 AnimationState 正在播放或者 clip 是 defaultClip 的话，默认是不会删除 clip 的。<br/>
         * 但是如果 force 参数为 true，则会强制停止该动画，然后移除该动画剪辑和相关的动画。这时候如果 clip 是 defaultClip，defaultClip 将会被重置为 null。<br/>
         * @deprecated 将在 V1.0.0 移除，请转用 `this.removeState()`。
         * @param {Boolean} [force=false] - If force is true, then will always remove the clip and any animation states based on it.
         */
        removeClip(clip: AnimationClip, force?: boolean): void;
        /**
         * @en
         * Register animation event callback.<bg>
         * The event arguments will provide the AnimationState which emit the event.<bg>
         * When play an animation, will auto register the event callback to the AnimationState,<bg>
         * and unregister the event callback from the AnimationState when animation stopped.
         * @zh
         * 注册动画事件回调。<bg>
         * 回调的事件里将会附上发送事件的 AnimationState。<bg>
         * 当播放一个动画时，会自动将事件注册到对应的 AnimationState 上，停止播放时会将事件从这个 AnimationState 上取消注册。
         * @param type - 表示要侦听的事件类型的字符串。
         * @param callback - 调度事件时将调用的回调。
         *                   如果回调是重复的（回调是唯一的），则忽略回调。
         * @param target - 调用回调的目标（此对象）可以为null
         * @return 只返回传入的回调，以便可以更轻松地保存匿名函数。
         * @example
         * ```typescript
         * onPlay: function (type, state) {
         *     // callback
         * }
         *
         * // register event to all animation
         * animation.on('play', this.onPlay, this);
         * ```
         */
        on(type: string, callback: (state: AnimationState) => void, target?: Object): Function | undefined;
        /**
         * @en
         * Unregister animation event callback.
         * @zh
         * 取消注册动画事件回调。
         * @param {String} type - 要删除的事件类型的字符串。
         * @param {Function} callback - 要删除的回调
         * @param {Object} target - 调用回调的目标（此对象），如果没有给出，则只删除没有目标的回调
         * @example
         * ```typescript
         * // unregister event to all animation
         * animation.off('play', this.onPlay, this);
         * ```
         */
        off(type: string, callback: Function, target?: Object): void;
        /**
         * @en IEventTarget implementations, they will be overwrote with the same implementation in EventTarget by applyMixins
         * @zh IEventTarget 实现，它们将被 applyMixins 在 EventTarget 中用相同的实现覆盖。
         */
        targetOff(keyOrTarget?: string | Object | undefined): void;
        once(type: string, callback: Function, target?: Object | undefined): Function | undefined;
        dispatchEvent(event: Event): void;
        hasEventListener(key: string, callback?: Function | undefined, target?: Object | undefined): boolean;
        removeAll(keyOrTarget?: string | Object | undefined): void;
        emit(key: string, ...args: any[]): void;
        protected _createState(clip: AnimationClip, name?: string): AnimationState;
        protected _doCreateState(clip: AnimationClip, name: string): AnimationState;
    }
    export type CurveData = math.Vec3 | math.Quat | math.Mat4;
    export type ConvertedProps = Record<string, IPropertyCurve>;
    export interface IPropertyCurve {
        keys: number;
        values: CurveData[];
    }
    export interface ISkeletalCurveInfo {
        frames: number;
        sample: number;
    }
    export interface IConvertedData {
        info: ISkeletalCurveInfo;
        data: Record<string, ConvertedProps>;
    }
    /**
     * 骨骼动画数据转换中心。
     */
    export class SkelAnimDataHub {
        static getOrExtract(clip: AnimationClip): IConvertedData;
        static destroy(clip: AnimationClip): void;
        protected static pool: Map<AnimationClip, IConvertedData>;
    }
    export interface ITransform {
        pos: math.Vec3;
        rot: math.Quat;
        scale: math.Vec3;
    }
    export interface ISocketData {
        target: Node;
        transform: renderer.IJointTransform;
        frames: ITransform[];
    }
    export class SkeletalAnimationState extends AnimationState {
        protected _frames: number;
        protected _bakedDuration: number;
        protected _animInfo: renderer.IAnimInfo | null;
        protected _sockets: ISocketData[];
        protected _animInfoMgr: renderer.JointAnimationInfo;
        protected _comps: SkinningModelComponent[];
        protected _parent: SkeletalAnimationComponent | null;
        protected _curvesInited: boolean;
        constructor(clip: AnimationClip, name?: string);
        initialize(root: Node): void;
        onPlay(): void;
        rebuildSocketCurves(sockets: Socket[]): null | undefined;
    }
    export class Socket {
        /**
         * @en Path of the target joint.
         * @zh 此挂点的目标骨骼路径。
         */
        path: string;
        /**
         * @en Transform output node.
         * @zh 此挂点的变换信息输出节点。
         */
        target: Node | null;
        constructor(path?: string, target?: Node | null);
    }
    /**
     * @en
     * Skeletal animaiton component, offers the following features on top of [[AnimationComponent]]:
     * * Choice between baked animation and real-time calculation, to leverage efficiency and expressiveness.
     * * Joint socket system: Create any socket node directly under the animation component root node,
     *   find your target joint and register both to the socket list, so that the socket node would be in-sync with the joint.
     * @zh
     * 骨骼动画组件，在普通动画组件基础上额外提供以下功能：
     * * 可选预烘焙动画模式或实时计算模式，用以权衡运行时效率与效果；
     * * 提供骨骼挂点功能：通过在动画根节点下创建挂点节点，并在骨骼动画组件上配置 socket 列表，挂点节点的 Transform 就能与骨骼保持同步。
     */
    export class SkeletalAnimationComponent extends AnimationComponent {
        static Socket: typeof Socket;
        get sockets(): Socket[];
        set sockets(val: Socket[]);
        get useBakedAnimation(): boolean;
        set useBakedAnimation(val: boolean);
        protected _useBakedAnimation: boolean;
        protected _sockets: Socket[];
        onDestroy(): void;
        start(): void;
        querySockets(): string[];
        rebuildSocketAnimations(): void;
        createSocket(path: string): Node | null;
        protected _createState(clip: AnimationClip, name?: string): SkeletalAnimationState;
        protected _doCreateState(clip: AnimationClip, name: string): SkeletalAnimationState;
    }
    export function getPathFromRoot(target: Node | null, root: Node): string;
    export function getWorldTransformUntilRoot(target: Node, root: Node, outMatrix: math.Mat4): math.Mat4;
    export interface IProfilerState {
        frame: __private.cocos_core_utils_profiler_counter_ICounterOption;
        fps: __private.cocos_core_utils_profiler_counter_ICounterOption;
        draws: __private.cocos_core_utils_profiler_counter_ICounterOption;
        instances: __private.cocos_core_utils_profiler_counter_ICounterOption;
        tricount: __private.cocos_core_utils_profiler_counter_ICounterOption;
        logic: __private.cocos_core_utils_profiler_counter_ICounterOption;
        physics: __private.cocos_core_utils_profiler_counter_ICounterOption;
        render: __private.cocos_core_utils_profiler_counter_ICounterOption;
        textureMemory: __private.cocos_core_utils_profiler_counter_ICounterOption;
        bufferMemory: __private.cocos_core_utils_profiler_counter_ICounterOption;
    }
    export class Profiler {
        _stats: IProfilerState | null;
        id: string;
        constructor();
        isShowingStats(): boolean;
        hideStats(): void;
        showStats(): void;
        generateCanvas(): void;
        generateStats(): void;
        generateNode(): void;
        beforeUpdate(): void;
        afterUpdate(): void;
        beforePhysics(): void;
        afterPhysics(): void;
        beforeDraw(): void;
        afterDraw(): void;
    }
    export const profiler: Profiler;
    /****************************************************************************
         Copyright (c) 2016 Chukong Technologies Inc.
         Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
        
         http://www.cocos2d-x.org
        
         Permission is hereby granted, free of charge, to any person obtaining a copy
         of this software and associated documentation files (the "Software"), to deal
         in the Software without restriction, including without limitation the rights
         to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
         copies of the Software, and to permit persons to whom the Software is
         furnished to do so, subject to the following conditions:
        
         The above copyright notice and this permission notice shall be included in
         all copies or substantial portions of the Software.
        
         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         THE SOFTWARE.
     ****************************************************************************/
    export type Constructor<T = {}> = new (...args: any[]) => T;
    export interface IPoolHandlerComponent extends Component {
        unuse(): void;
        reuse(...args: any[]): void;
    }
    /**
     * @en
     *  cc.NodePool is the cache pool designed for node type.<br/>
     *  It can helps you to improve your game performance for objects which need frequent release and recreate operations<br/>
     *
     * It's recommended to create cc.NodePool instances by node type, the type corresponds to node type in game design, not the class,
     * for example, a prefab is a specific node type. <br/>
     * When you create a node pool, you can pass a Component which contains `unuse`, `reuse` functions to control the content of node.<br/>
     *
     * Some common use case is :<br/>
     *      1. Bullets in game (die very soon, massive creation and recreation, no side effect on other objects)<br/>
     *      2. Blocks in candy crash (massive creation and recreation)<br/>
     *      etc...
     * @zh
     * cc.NodePool 是用于管理节点对象的对象缓存池。<br/>
     * 它可以帮助您提高游戏性能，适用于优化对象的反复创建和销毁<br/>
     * 以前 cocos2d-x 中的 cc.pool 和新的节点事件注册系统不兼容，因此请使用 cc.NodePool 来代替。
     *
     * 新的 NodePool 需要实例化之后才能使用，每种不同的节点对象池需要一个不同的对象池实例，这里的种类对应于游戏中的节点设计，一个 prefab 相当于一个种类的节点。<br/>
     * 在创建缓冲池时，可以传入一个包含 unuse, reuse 函数的组件类型用于节点的回收和复用逻辑。<br/>
     *
     * 一些常见的用例是：<br/>
     *      1.在游戏中的子弹（死亡很快，频繁创建，对其他对象无副作用）<br/>
     *      2.糖果粉碎传奇中的木块（频繁创建）。
     *      等等....
     */
    export class NodePool {
        /**
         * @en The pool handler component, it could be the class name or the constructor.
         * @zh 缓冲池处理组件，用于节点的回收和复用逻辑，这个属性可以是组件类名或组件的构造函数。
         */
        poolHandlerComp?: Constructor<IPoolHandlerComponent> | string;
        /**
         * @en
         * Constructor for creating a pool for a specific node template (usually a prefab).
         * You can pass a component (type or name) argument for handling event for reusing and recycling node.
         * @zh
         * 使用构造函数来创建一个节点专用的对象池，您可以传递一个组件类型或名称，用于处理节点回收和复用时的事件逻辑。
         * @param poolHandlerComp @en The constructor or the class name of the component to control the unuse/reuse logic. @zh 处理节点回收和复用事件逻辑的组件类型或名称。
         * @example
         *  properties: {
         *      template: cc.Prefab
         *     },
         *     onLoad () {
         *       // MyTemplateHandler is a component with 'unuse' and 'reuse' to handle events when node is reused or recycled.
         *       this.myPool = new cc.NodePool('MyTemplateHandler');
         *     }
         *  }
         */
        constructor(poolHandlerComp?: Constructor<IPoolHandlerComponent> | string);
        /**
         * @en The current available size in the pool
         * @zh 获取当前缓冲池的可用对象数量
         */
        size(): number;
        /**
         * @en Destroy all cached nodes in the pool
         * @zh 销毁对象池中缓存的所有节点
         */
        clear(): void;
        /**
         * @en Put a new Node into the pool.
         * It will automatically remove the node from its parent without cleanup.
         * It will also invoke unuse method of the poolHandlerComp if exist.
         * @zh 向缓冲池中存入一个不再需要的节点对象。
         * 这个函数会自动将目标节点从父节点上移除，但是不会进行 cleanup 操作。
         * 这个函数会调用 poolHandlerComp 的 unuse 函数，如果组件和函数都存在的话。
         * @example
         *   let myNode = cc.instantiate(this.template);
         *   this.myPool.put(myNode);
         */
        put(obj: Node): void;
        /**
         * @en Get a obj from pool, if no available object in pool, null will be returned.
         * This function will invoke the reuse function of poolHandlerComp if exist.
         * @zh 获取对象池中的对象，如果对象池没有可用对象，则返回空。
         * 这个函数会调用 poolHandlerComp 的 reuse 函数，如果组件和函数都存在的话。
         * @param args - 向 poolHandlerComp 中的 'reuse' 函数传递的参数
         * @example
         *   let newNode = this.myPool.get();
         */
        get(...args: any[]): Node | null;
    }
    export enum PrimitiveType {
        BOX = 0,
        SPHERE = 1,
        CYLINDER = 2,
        CONE = 3,
        CAPSULE = 4,
        TORUS = 5,
        PLANE = 6,
        QUAD = 7
    }
    /**
     * @en
     * Basic primitive mesh, this can be generate some primitive mesh at runtime.
     * @zh
     * 基础图形网格，可以在运行时构建一些基础的网格。
     */
    export class Primitive extends Mesh {
        /**
         * @en
         * The type of the primitive mesh, set it before you call onLoaded.
         * @zh
         * 此基础图形网格的类型，请在 onLoaded 调用之前设置。
         */
        type: number;
        /**
         * @en
         * The option for build the primitive mesh, set it before you call onLoaded.
         * @zh
         * 创建此基础图形网格的可选参数，请在 onLoaded 调用之前设置。
         */
        info: Record<string, number>;
        constructor(type?: PrimitiveType);
        /**
         * @en
         * Construct the primitive mesh with `type` and `info`.
         * @zh
         * 根据`type`和`info`构建相应的网格。
         */
        onLoaded(): void;
    }
    export namespace __private {
        export enum cocos_core_data_utils_compact_value_type_array_StorageUnit {
            Uint8 = 0,
            Uint16 = 1,
            Uint32 = 2,
            Int8 = 3,
            Int16 = 4,
            Int32 = 5,
            Float32 = 6,
            Float64 = 7
        }
        export enum cocos_core_data_utils_compact_value_type_array_ElementType {
            Scalar = 0,
            Vec2 = 1,
            Vec3 = 2,
            Vec4 = 3,
            Quat = 4,
            Mat4 = 5
        }
        export class cocos_core_event_callbacks_invoker_CallbackInfo {
            callback: Function;
            target: Object | undefined;
            once: boolean;
            set(callback: Function, target?: Object, once?: boolean): void;
        }
        /**
         * @zh 事件监听器列表的简单封装。
         * @en A simple list of event callbacks
         */
        export class cocos_core_event_callbacks_invoker_CallbackList {
            callbackInfos: Array<cocos_core_event_callbacks_invoker_CallbackInfo | null>;
            isInvoking: boolean;
            containCanceled: boolean;
            /**
             * @zh 从列表中移除与指定目标相同回调函数的事件。
             * @en Remove the event listeners with the given callback from the list
             *
             * @param cb - The callback to be removed
             */
            removeByCallback(cb: Function): void;
            /**
             * @zh 从列表中移除与指定目标相同调用者的事件。
             * @en Remove the event listeners with the given target from the list
             * @param target
             */
            removeByTarget(target: Object): void;
            /**
             * @zh 移除指定编号事件。
             * @en Remove the event listener at the given index
             * @param index
             */
            cancel(index: number): void;
            /**
             * @zh 注销所有事件。
             * @en Cancel all event listeners
             */
            cancelAll(): void;
            /**
             * @zh 立即删除所有取消的回调。（在移除过程中会更加紧凑的排列数组）
             * @en Delete all canceled callbacks and compact array
             */
            purgeCanceled(): void;
            /**
             * @zh 清除并重置所有数据。
             * @en Clear all data
             */
            clear(): void;
        }
        export interface cocos_core_event_callbacks_invoker_ICallbackTable {
            [x: string]: cocos_core_event_callbacks_invoker_CallbackList | undefined;
        }
        /**
         * @zh CallbacksInvoker 用来根据事件名（Key）管理事件监听器列表并调用回调方法。
         * @en CallbacksInvoker is used to manager and invoke event listeners with different event keys,
         * each key is mapped to a CallbackList.
         */
        export class cocos_core_event_callbacks_invoker_CallbacksInvoker {
            _callbackTable: cocos_core_event_callbacks_invoker_ICallbackTable;
            /**
             * @zh 向一个事件名注册一个新的事件监听器，包含回调函数和调用者
             * @en Register an event listener to a given event key with callback and target.
             *
             * @param key - Event type
             * @param callback - Callback function when event triggered
             * @param target - Callback callee
             * @param once - Whether invoke the callback only once (and remove it)
             */
            on(key: string, callback: Function, target?: Object, once?: boolean): void;
            /**
             * @zh 检查指定事件是否已注册回调。
             * @en Checks whether there is correspond event listener registered on the given event
             * @param key - Event type
             * @param callback - Callback function when event triggered
             * @param target - Callback callee
             */
            hasEventListener(key: string, callback?: Function, target?: Object | null): boolean;
            /**
             * @zh 移除在特定事件类型中注册的所有回调或在某个目标中注册的所有回调。
             * @en Removes all callbacks registered in a certain event type or all callbacks registered with a certain target
             * @param keyOrTarget - The event type or target with which the listeners will be removed
             */
            removeAll(keyOrTarget?: string | Object): void;
            /**
             * @zh 删除以指定事件，回调函数，目标注册的回调。
             * @en Remove event listeners registered with the given event key, callback and target
             * @param key - Event type
             * @param callback - The callback function of the event listener, if absent all event listeners for the given type will be removed
             * @param target - The callback callee of the event listener
             */
            off(key: string, callback?: Function, target?: Object): void;
            /**
             * @zh 派发一个指定事件，并传递需要的参数
             * @en Trigger an event directly with the event name and necessary arguments.
             * @param key - event type
             * @param args - Arguments when the event triggered
             */
            emit(key: string, ...args: any[]): void;
        }
        /**
         * @param error - null or the error info
         * @param node - the created node or null
         */
        export type cocos_core_assets_asset_CreateNodeCallback = (error: Error | null, node: Node) => void;
        /**
         * @en Interface for all classes that self implement the EventTarget protocol, they are normally not sub class of EventTarget
         * @zh 所有自己实现 EventTarget 功能的类都实现了这个 Interface，他们可能无法直接继承自 EventTarget
         */
        export interface cocos_core_event_event_target_factory_IEventTarget extends EventTarget {
        }
        export interface cocos_core_assets_sprite_atlas_ISpriteFrameList {
            [key: string]: SpriteFrame | null;
        }
        /**
         * 内存图像源。
         */
        export interface cocos_core_assets_image_asset_IMemoryImageSource {
            _data: ArrayBufferView | null;
            _compressed: boolean;
            width: number;
            height: number;
            format: number;
        }
        /**
         * 图像资源的原始图像源。可以来源于 HTML 元素也可以来源于内存。
         */
        export type cocos_core_assets_image_asset_ImageSource = HTMLCanvasElement | HTMLImageElement | cocos_core_assets_image_asset_IMemoryImageSource;
        /**
         * @en
         * The texture pixel format, default value is RGBA8888,<br>
         * you should note that textures loaded by normal image files (png, jpg) can only support RGBA8888 format,<br>
         * other formats are supported by compressed file types or raw data.
         * @zh
         * 纹理像素格式，默认值为RGBA8888，<br>
         * 你应该注意到普通图像文件（png，jpg）加载的纹理只能支持RGBA8888格式，<br>
         * 压缩文件类型或原始数据支持其他格式。
         */
        export enum cocos_core_assets_asset_enum_PixelFormat {
            RGB565 = 46,
            RGB5A1 = 48,
            RGBA4444 = 49,
            RGB888 = 24,
            RGB32F = 32,
            RGBA8888 = 35,
            RGBA32F = 43,
            A8 = 1,
            I8 = 2,
            AI8 = 3,
            RGB_PVRTC_2BPPV1 = 86,
            RGBA_PVRTC_2BPPV1 = 87,
            RGB_PVRTC_4BPPV1 = 88,
            RGBA_PVRTC_4BPPV1 = 89,
            RGB_ETC1 = 75,
            RGB_ETC2 = 76,
            RGBA_ETC2 = 80
        }
        /**
         * 贴图创建选项。
         */
        export interface cocos_core_assets_texture_2d_ITexture2DCreateInfo {
            /**
             * 像素宽度。
             */
            width: number;
            /**
             * 像素高度。
             */
            height: number;
            /**
             * 像素格式。
             * @default PixelFormat.RGBA8888
             */
            format?: cocos_core_assets_asset_enum_PixelFormat;
            /**
             * mipmap 层级。
             * @default 1
             */
            mipmapLevel?: number;
        }
        export type cocos_core_assets_simple_texture_PresumedGFXTextureInfo = Pick<IGFXTextureInfo, "usage" | "flags" | "format" | "mipLevel">;
        export type cocos_core_assets_simple_texture_PresumedGFXTextureViewInfo = Pick<IGFXTextureViewInfo, "texture" | "format">;
        /**
         * @en
         * The texture wrap mode.
         * @zh
         * 纹理环绕方式。
         */
        export enum cocos_core_assets_asset_enum_WrapMode {
            REPEAT = 0,
            CLAMP_TO_EDGE = 2,
            MIRRORED_REPEAT = 1,
            CLAMP_TO_BORDER = 3
        }
        /**
         * @en
         * The texture filter mode
         * @zh
         * 纹理过滤模式。
         */
        export enum cocos_core_assets_asset_enum_Filter {
            NONE = 0,
            LINEAR = 2,
            NEAREST = 1
        }
        /**
         * 贴图资源基类。它定义了所有贴图共用的概念。
         */
        export class cocos_core_assets_texture_base_TextureBase extends Asset {
            get isCompressed(): boolean;
            get width(): number;
            get height(): number;
            static PixelFormat: typeof cocos_core_assets_asset_enum_PixelFormat;
            static WrapMode: typeof cocos_core_assets_asset_enum_WrapMode;
            static Filter: typeof cocos_core_assets_asset_enum_Filter;
            protected _format: number;
            protected _premultiplyAlpha: boolean;
            protected _flipY: boolean;
            protected _minFilter: number;
            protected _magFilter: number;
            protected _mipFilter: number;
            protected _wrapS: number;
            protected _wrapT: number;
            protected _wrapR: number;
            protected _anisotropy: number;
            protected _width: number;
            protected _height: number;
            constructor(flipY?: boolean);
            /**
             * 获取标识符。
             * @returns 此贴图的标识符。
             */
            getId(): string;
            /**
             * 获取像素格式。
             * @returns 此贴图的像素格式。
             */
            getPixelFormat(): number;
            /**
             * 返回是否开启了预乘透明通道功能。
             * @returns 此贴图是否开启了预乘透明通道功能。
             */
            hasPremultipliedAlpha(): boolean;
            /**
             * 获取各向异性。
             * @returns 此贴图的各向异性。
             */
            getAnisotropy(): number;
            /**
             * 设置此贴图的缠绕模式。
             * 注意，若贴图尺寸不是 2 的整数幂，缠绕模式仅允许 `WrapMode.CLAMP_TO_EDGE`。
             * @param wrapS S(U) 坐标的采样模式。
             * @param wrapT T(V) 坐标的采样模式。
             * @param wrapR R(W) 坐标的采样模式。
             */
            setWrapMode(wrapS: cocos_core_assets_asset_enum_WrapMode, wrapT: cocos_core_assets_asset_enum_WrapMode, wrapR?: cocos_core_assets_asset_enum_WrapMode): void;
            /**
             * 设置此贴图的过滤算法。
             * @param minFilter 缩小过滤算法。
             * @param magFilter 放大过滤算法。
             */
            setFilters(minFilter: cocos_core_assets_asset_enum_Filter, magFilter: cocos_core_assets_asset_enum_Filter): void;
            /**
             * 设置此贴图的 mip 过滤算法。
             * @param mipFilter mip 过滤算法。
             */
            setMipFilter(mipFilter: cocos_core_assets_asset_enum_Filter): void;
            /**
             * 设置渲染时是否运行将此贴图进行翻转。
             * @param flipY 翻转则为 `true`，否则为 `false`。
             */
            setFlipY(flipY: boolean): void;
            /**
             * 设置此贴图是否预乘透明通道。
             * @param premultiply
             */
            setPremultiplyAlpha(premultiply: boolean): void;
            /**
             * 设置此贴图的各向异性。
             * @param anisotropy 各向异性。
             */
            setAnisotropy(anisotropy: number): void;
            /**
             * 销毁此贴图，并释放占有的所有 GPU 资源。
             */
            destroy(): boolean;
            /**
             * 获取此贴图底层的 GFX 贴图视图对象。
             */
            getGFXTextureView(): GFXTextureView | null;
            /**
             * 获取此贴图内部使用的 GFX 采样器信息。
             * @private
             */
            getSamplerHash(): number;
            /**
             * 获取此贴图底层的 GFX 采样信息。
             */
            getGFXSampler(): GFXSampler | null;
            /**
             * @return
             */
            _serialize(exporting?: any): any;
            /**
             *
             * @param data
             */
            _deserialize(serializedData: any, handle: any): void;
            protected _getGFXDevice(): GFXDevice | null;
            protected _getGFXFormat(): number;
            protected _setGFXFormat(format?: cocos_core_assets_asset_enum_PixelFormat): void;
        }
        /**
         * 简单贴图基类。
         * 简单贴图内部创建了 GFX 贴图和该贴图上的 GFX 贴图视图。
         * 简单贴图允许指定不同的 Mipmap 层级。
         */
        export class cocos_core_assets_simple_texture_SimpleTexture extends cocos_core_assets_texture_base_TextureBase {
            protected _gfxTexture: GFXTexture | null;
            protected _gfxTextureView: GFXTextureView | null;
            get mipmapLevel(): number;
            /**
             * 获取此贴图底层的 GFX 贴图对象。
             */
            getGFXTexture(): GFXTexture | null;
            getGFXTextureView(): GFXTextureView | null;
            destroy(): boolean;
            /**
             * 更新 0 级 Mipmap。
             */
            updateImage(): void;
            /**
             * 更新指定层级范围内的 Mipmap。当 Mipmap 数据发生了改变时应调用此方法提交更改。
             * 若指定的层级范围超出了实际已有的层级范围，只有覆盖的那些层级范围会被更新。
             * @param firstLevel 起始层级。
             * @param count 层级数量。
             */
            updateMipmaps(firstLevel?: number, count?: number): void;
            /**
             * 上传图像数据到指定层级的 Mipmap 中。
             * 图像的尺寸影响 Mipmap 的更新范围：
             * - 当图像是 `ArrayBuffer` 时，图像的尺寸必须和 Mipmap 的尺寸一致；否则，
             * - 若图像的尺寸与 Mipmap 的尺寸相同，上传后整个 Mipmap 的数据将与图像数据一致；
             * - 若图像的尺寸小于指定层级 Mipmap 的尺寸（不管是长或宽），则从贴图左上角开始，图像尺寸范围内的 Mipmap 会被更新；
             * - 若图像的尺寸超出了指定层级 Mipmap 的尺寸（不管是长或宽），都将引起错误。
             * @param source 图像数据源。
             * @param level Mipmap 层级。
             * @param arrayIndex 数组索引。
             */
            uploadData(source: HTMLCanvasElement | HTMLImageElement | ArrayBufferView, level?: number, arrayIndex?: number): void;
            protected _assignImage(image: ImageAsset, level: number, arrayIndex?: number): void;
            protected _checkTextureLoaded(): void;
            protected _textureReady(): void;
            /**
             * Set mipmap level of this texture.
             * The value is passes as presumed info to `this._getGfxTextureCreateInfo()`.
             * @param value The mipmap level.
             */
            protected _setMipmapLevel(value: number): void;
            /**
             * @en This method is overrided by derived classes to provide GFX texture info.
             * @zh 这个方法被派生类重写以提供GFX纹理信息。
             * @param presumed The presumed GFX texture info.
             */
            protected _getGfxTextureCreateInfo(presumed: cocos_core_assets_simple_texture_PresumedGFXTextureInfo): IGFXTextureInfo | null;
            /**
             * This method is overrided by derived classes to provide GFX texture view info.
             * @param presumed The presumed GFX texture view info.
             */
            protected _getGfxTextureViewCreateInfo(texture: cocos_core_assets_simple_texture_PresumedGFXTextureViewInfo): IGFXTextureViewInfo | null;
            protected _tryReset(): void;
            protected _createTexture(device: GFXDevice): void;
            protected _tryDestroyTexture(): void;
        }
        /**
         * 立方体每个面的约定索引。
         */
        export enum cocos_core_assets_texture_cube_FaceIndex {
            right = 0,
            left = 1,
            top = 2,
            bottom = 3,
            front = 4,
            back = 5
        }
        /**
         * 立方体贴图的 Mipmap。
         */
        export interface cocos_core_assets_texture_cube_ITextureCubeMipmap {
            front: ImageAsset;
            back: ImageAsset;
            left: ImageAsset;
            right: ImageAsset;
            top: ImageAsset;
            bottom: ImageAsset;
        }
        export type cocos_core_assets_texture_cube_ITextureCubeCreateInfo = cocos_core_assets_texture_2d_ITexture2DCreateInfo;
        export interface cocos_core_assets_texture_cube_ITextureCubeSerializeData {
            base: string;
            mipmaps: {
                front: string;
                back: string;
                left: string;
                right: string;
                top: string;
                bottom: string;
            }[];
        }
        export interface cocos_core_assets_bitmap_font_IConfig {
            [key: string]: any;
        }
        export interface cocos_core_assets_effect_asset_ITechniqueInfo {
            passes: renderer.__private.cocos_core_assets_effect_asset_IPassInfo[];
            name?: string;
        }
        export interface cocos_core_assets_effect_asset_IPreCompileInfo {
            [name: string]: boolean[] | number[] | string[];
        }
        export type cocos_core_assets_material_MaterialPropertyFull = renderer.MaterialProperty | cocos_core_assets_texture_base_TextureBase | SpriteFrame | GFXTextureView | null;
        /**
         * @en
         * The basic infos for material initialization.
         * @zh
         * 用来初始化材质的基本信息。
         */
        export interface cocos_core_assets_material_IMaterialInfo {
            /**
             * @en
             * The EffectAsset to use. Must provide if `effectName` is not specified.
             * @zh
             * 这个材质将使用的 EffectAsset，直接提供资源引用，和 `effectName` 至少要指定一个。
             */
            effectAsset?: EffectAsset | null;
            /**
             * @en
             * The name of the EffectAsset to use. Must provide if `effectAsset` is not specified.
             * @zh
             * 这个材质将使用的 EffectAsset，通过 effect 名指定，和 `effectAsset` 至少要指定一个。
             */
            effectName?: string;
            /**
             * @en
             * The index of the technique to use.
             * @zh
             * 这个材质将使用第几个 technique，默认为 0。
             */
            technique?: number;
            /**
             * @en
             * The shader macro definitions. Default to 0 or the specified value in [[EffectAsset]].
             * @zh
             * 这个材质定义的预处理宏，默认全为 0，或 [[EffectAsset]] 中的指定值。
             */
            defines?: renderer.IDefineMap | renderer.IDefineMap[];
            /**
             * @en
             * The override values on top of the pipeline states specified in [[EffectAsset]].
             * @zh
             * 这个材质的自定义管线状态，将覆盖 effect 中的属性。<br>
             * 注意在可能的情况下请尽量少的自定义管线状态，以减小对渲染效率的影响。
             */
            states?: renderer.PassOverrides | renderer.PassOverrides[];
        }
        /**
         * Class which control rendering of a morph resource.
         */
        export interface cocos_core_assets_morph_MorphRendering {
            createInstance(): renderer.__private.cocos_core_assets_morph_MorphRenderingInstance;
        }
        export enum cocos_core_assets_asset_enum_DepthStencilFormat {
            NONE = 0,
            DEPTH_16 = 53,
            DEPTH_24 = 55,
            DEPTH_32 = 57,
            DEPTH_16_STENCIL_8 = 54,
            DEPTH_24_STENCIL_8 = 56,
            DEPTH_32_STENCIL_8 = 58
        }
        export interface cocos_core_assets_render_texture_IRenderTextureCreateInfo {
            name?: string;
            width: number;
            height: number;
            colorFormat: cocos_core_assets_asset_enum_PixelFormat;
            depthStencilFormat: cocos_core_assets_asset_enum_DepthStencilFormat;
        }
        export interface cocos_core_platform_event_manager_event_listener_IEventListenerCreateInfo {
            event?: number;
            [x: string]: any;
        }
        export interface cocos_core_platform_event_manager_event_listener_IListenerMask {
            index: number;
            node: Node;
        }
        /**
         * @en The base class of event listener.                                                                        <br/>
         * If you need custom listener which with different callback, you need to inherit this class.               <br/>
         * For instance, you could refer to EventListenerAcceleration, EventListenerKeyboard,                       <br/>
         * EventListenerTouchOneByOne, EventListenerCustom.<br/>
         * @zh 封装用户的事件处理逻辑
         * 注意：这是一个抽象类，开发者不应该直接实例化这个类，请参考 [[create]] 。
         */
        export class cocos_core_platform_event_manager_event_listener_EventListener {
            /**
             * @en The type code of unknown event listener.<br/>
             * @zh 未知的事件监听器类型
             */
            static UNKNOWN: number;
            /**
             * @en The type code of one by one touch event listener.<br/>
             * @zh 触摸事件监听器类型，触点会一个一个得分开被派发
             */
            static TOUCH_ONE_BY_ONE: number;
            /**
             * @en The type code of all at once touch event listener.<br/>
             * @zh 触摸事件监听器类型，触点会被一次性全部派发
             */
            static TOUCH_ALL_AT_ONCE: number;
            /**
             * @en The type code of keyboard event listener.<br/>
             * @zh 键盘事件监听器类型
             */
            static KEYBOARD: number;
            /**
             * @en The type code of mouse event listener.<br/>
             * @zh 鼠标事件监听器类型
             */
            static MOUSE: number;
            /**
             * @en The type code of acceleration event listener.<br/>
             * @zh 加速器事件监听器类型
             */
            static ACCELERATION: number;
            /**
             * @en The type code of custom event listener.<br/>
             * @zh 自定义事件监听器类型
             */
            static CUSTOM: number;
            static ListenerID: {
                MOUSE: string;
                TOUCH_ONE_BY_ONE: string;
                TOUCH_ALL_AT_ONCE: string;
                KEYBOARD: string;
                ACCELERATION: string;
            };
            /**
             * @en Create a EventListener object with configuration including the event type, handlers and other parameters.<br/>
             * In handlers, this refer to the event listener object itself.<br/>
             * You can also pass custom parameters in the configuration object,<br/>
             * all custom parameters will be polyfilled into the event listener object and can be accessed in handlers.<br/>
             * @zh 通过指定不同的 Event 对象来设置想要创建的事件监听器。
             * @param argObj a json object
             */
            static create(argObj: cocos_core_platform_event_manager_event_listener_IEventListenerCreateInfo): cocos_core_platform_event_manager_event_listener_EventListener;
            owner: Object | null;
            mask: cocos_core_platform_event_manager_event_listener_IListenerMask | null;
            _previousIn?: boolean;
            _target: any;
            protected _onEvent: ((...args: any[]) => any) | null;
            get onEvent(): ((...args: any[]) => any) | null;
            constructor(type: number, listenerID: string, callback: ((...args: any[]) => any) | null);
            /**
             * @en
             * <p><br/>
             *     Sets paused state for the listener<br/>
             *     The paused state is only used for scene graph priority listeners.<br/>
             *     `EventDispatcher::resumeAllEventListenersForTarget(node)` will set the paused state to `true`,<br/>
             *     while `EventDispatcher::pauseAllEventListenersForTarget(node)` will set it to `false`.<br/>
             *     @note 1) Fixed priority listeners will never get paused. If a fixed priority doesn't want to receive events,<br/>
             *              call `setEnabled(false)` instead.<br/>
             *            2) In `Node`'s onEnter and onExit, the `paused state` of the listeners<br/>
             *              which associated with that node will be automatically updated.<br/>
             * </p><br/>
             * @zh
             * *为侦听器设置暂停状态<br/>
             * 暂停状态仅用于场景图优先级侦听器。<br/>
             * `EventDispatcher :: resumeAllEventListenersForTarget（node）`将暂停状态设置为`true`，<br/>
             * 而`EventDispatcher :: pauseAllEventListenersForTarget（node）`将它设置为`false`。<br/>
             * 注意：<br/>
             * - 固定优先级侦听器永远不会被暂停。 如果固定优先级不想接收事件，改为调用`setEnabled（false）`。<br/>
             * - 在“Node”的onEnter和onExit中，监听器的“暂停状态”与该节点关联的*将自动更新。
             */
            _setPaused(paused: boolean): void;
            /**
             * @en Checks whether the listener is paused.<br/>
             * @zh 检查侦听器是否已暂停。
             */
            _isPaused(): boolean;
            /**
             * @en Marks the listener was registered by EventDispatcher.<br/>
             * @zh 标记监听器已由 EventDispatcher 注册。
             */
            _setRegistered(registered: boolean): void;
            /**
             * @en Checks whether the listener was registered by EventDispatcher<br/>
             * @zh 检查监听器是否已由 EventDispatcher 注册。
             * @private
             */
            _isRegistered(): boolean;
            /**
             * @en Gets the type of this listener<br/>
             * note： It's different from `EventType`, e.g.<br/>
             * TouchEvent has two kinds of event listeners - EventListenerOneByOne, EventListenerAllAtOnce<br/>
             * @zh 获取此侦听器的类型<br/>
             * 注意：它与`EventType`不同，例如<br/>
             * TouchEvent 有两种事件监听器 -  EventListenerOneByOne，EventListenerAllAtOnce
             */
            _getType(): number;
            /**
             * @en Gets the listener ID of this listener<br/>
             * When event is being dispatched, listener ID is used as key for searching listeners according to event type.<br/>
             * @zh 获取此侦听器的侦听器 ID。<br/>
             * 调度事件时，侦听器 ID 用作根据事件类型搜索侦听器的键。
             */
            _getListenerID(): string;
            /**
             * @en Sets the fixed priority for this listener<br/>
             * note: This method is only used for `fixed priority listeners`,<br/>
             *   it needs to access a non-zero value. 0 is reserved for scene graph priority listeners<br/>
             * @zh 设置此侦听器的固定优先级。<br/>
             * 注意：此方法仅用于“固定优先级侦听器”，<br/>
             * 它需要访问非零值。 0保留给场景图优先级侦听器。
             */
            _setFixedPriority(fixedPriority: number): void;
            /**
             * @en Gets the fixed priority of this listener<br/>
             * @zh 获取此侦听器的固定优先级。
             * @return 如果它是场景图优先级侦听器则返回 0 ，则对于固定优先级侦听器则不为零
             */
            _getFixedPriority(): number;
            /**
             * @en Sets scene graph priority for this listener<br/>
             * @zh 设置此侦听器的场景图优先级。
             * @param {Node} node
             */
            _setSceneGraphPriority(node: any): void;
            /**
             * @en Gets scene graph priority of this listener<br/>
             * @zh 获取此侦听器的场景图优先级。
             * @return 如果它是固定优先级侦听器，则为场景图优先级侦听器非 null 。
             */
            _getSceneGraphPriority(): any;
            /**
             * @en Checks whether the listener is available.<br/>
             * @zh 检测监听器是否有效
             */
            checkAvailable(): boolean;
            /**
             * @en Clones the listener, its subclasses have to override this method.<br/>
             * @zh 克隆监听器,它的子类必须重写此方法。
             */
            clone(): cocos_core_platform_event_manager_event_listener_EventListener | null;
            /**
             * @en
             * Enables or disables the listener<br/>
             * note: Only listeners with `enabled` state will be able to receive events.<br/>
             * When an listener was initialized, it's enabled by default.<br/>
             * An event listener can receive events when it is enabled and is not paused.<br/>
             * paused state is always false when it is a fixed priority listener.<br/>
             * @zh
             * 启用或禁用监听器。<br/>
             * 注意：只有处于“启用”状态的侦听器才能接收事件。<br/>
             * 初始化侦听器时，默认情况下启用它。<br/>
             * 事件侦听器可以在启用且未暂停时接收事件。<br/>
             * 当固定优先级侦听器时，暂停状态始终为false。<br/>
             */
            setEnabled(enabled: boolean): void;
            /**
             * @en Checks whether the listener is enabled<br/>
             * @zh 检查监听器是否可用。
             */
            isEnabled(): boolean;
        }
        export class cocos_core_platform_event_manager_event_manager_EventManager {
            /**
             * @en Pauses all listeners which are associated the specified target.
             * @zh 暂停传入的 node 相关的所有监听器的事件响应。
             * @param node - 暂停目标节点
             * @param recursive - 是否往子节点递归暂停。默认为 false。
             */
            pauseTarget(node: Node, recursive?: boolean): void;
            /**
             * @en
             * Resumes all listeners which are associated the specified target.
             *
             * @zh
             * 恢复传入的 node 相关的所有监听器的事件响应。
             *
             * @param node - 监听器节点。
             * @param recursive - 是否往子节点递归。默认为 false。
             */
            resumeTarget(node: Node, recursive?: boolean): void;
            frameUpdateListeners(): void;
            /**
             * @en
             * Query whether the specified event listener id has been added.
             *
             * @zh
             * 查询指定的事件 ID 是否存在。
             *
             * @param listenerID - 查找监听器 ID。
             * @returns 是否已查找到。
             */
            hasEventListener(listenerID: string): boolean;
            /**
             * @en
             * <p>
             * Adds a event listener for a specified event.<br/>
             * if the parameter "nodeOrPriority" is a node,
             * it means to add a event listener for a specified event with the priority of scene graph.<br/>
             * if the parameter "nodeOrPriority" is a Number,
             * it means to add a event listener for a specified event with the fixed priority.<br/>
             * </p>
             *
             * @zh
             * 将事件监听器添加到事件管理器中。<br/>
             * 如果参数 “nodeOrPriority” 是节点，优先级由 node 的渲染顺序决定，显示在上层的节点将优先收到事件。<br/>
             * 如果参数 “nodeOrPriority” 是数字，优先级则固定为该参数的数值，数字越小，优先级越高。<br/>
             *
             * @param listener - 指定事件监听器。
             * @param nodeOrPriority - 监听程序的优先级。
             * @returns
             */
            addListener(listener: cocos_core_platform_event_manager_event_listener_EventListener, nodeOrPriority: any | number): any;
            /**
             * @en
             * Adds a Custom event listener. It will use a fixed priority of 1.
             *
             * @zh
             * 向事件管理器添加一个自定义事件监听器。
             *
             * @param eventName - 自定义事件名。
             * @param callback - 事件回调。
             * @returns 返回自定义监听器。
             */
            addCustomListener(eventName: string, callback: Function): cocos_core_platform_event_manager_event_listener_EventListener;
            /**
             * @en
             * Remove a listener.
             *
             * @zh
             * 移除一个已添加的监听器。
             *
             * @param listener - 需要移除的监听器。
             */
            removeListener(listener: cocos_core_platform_event_manager_event_listener_EventListener): void;
            /**
             * @en
             * Removes all listeners with the same event listener type or removes all listeners of a node.
             *
             * @zh
             * 移除注册到 eventManager 中指定类型的所有事件监听器。<br/>
             * 1. 如果传入的第一个参数类型是 Node，那么事件管理器将移除与该对象相关的所有事件监听器。
             * （如果第二参数 recursive 是 true 的话，就会连同该对象的子控件上所有的事件监听器也一并移除）<br/>
             * 2. 如果传入的第一个参数类型是 Number（该类型 EventListener 中定义的事件类型），
             * 那么事件管理器将移除该类型的所有事件监听器。<br/>
             *
             * 下列是目前存在监听器类型：       <br/>
             * cc.EventListener.UNKNOWN       <br/>
             * cc.EventListener.KEYBOARD      <br/>
             * cc.EventListener.ACCELERATION，<br/>
             *
             * @param listenerType - 监听器类型。
             * @param recursive - 递归子节点的同类型监听器一并移除。默认为 false。
             */
            removeListeners(listenerType: number | any, recursive?: boolean): void;
            /**
             * @en
             * Removes all custom listeners with the same event name.
             *
             * @zh
             * 移除同一事件名的自定义事件监听器。
             *
             * @param customEventName - 自定义事件监听器名。
             */
            removeCustomListeners(customEventName: any): void;
            /**
             * @en
             * Removes all listeners.
             *
             * @zh
             * 移除所有事件监听器。
             */
            removeAllListeners(): void;
            /**
             * @en
             * Sets listener's priority with fixed value.
             *
             * @zh
             * 设置 FixedPriority 类型监听器的优先级。
             *
             * @param listener - 监听器。
             * @param fixedPriority - 优先级。
             */
            setPriority(listener: cocos_core_platform_event_manager_event_listener_EventListener, fixedPriority: number): void;
            /**
             * @en
             * Whether to enable dispatching events.
             *
             * @zh
             * 启用或禁用事件管理器，禁用后不会分发任何事件。
             *
             * @param enabled - 是否启用事件管理器。
             */
            setEnabled(enabled: boolean): void;
            /**
             * @en
             * Checks whether dispatching events is enabled.
             *
             * @zh 检测事件管理器是否启用。
             *
             * @returns
             */
            isEnabled(): boolean;
            /**
             * @en
             * Dispatches the event, also removes all EventListeners marked for deletion from the event dispatcher list.
             *
             * @zh
             * 分发事件。
             *
             * @param event - 分发事件。
             */
            dispatchEvent(event: Event): void;
            _onListenerCallback(listener: cocos_core_platform_event_manager_event_listener_EventListener, event: Event): boolean;
            /**
             * @en
             * Dispatches a Custom Event with a event name an optional user data.
             *
             * @zh
             * 分发自定义事件。
             *
             * @param eventName - 自定义事件名。
             * @param optionalUserData
             */
            dispatchCustomEvent(eventName: any, optionalUserData: any): void;
        }
        function cocos_core_scene_graph_component_scheduler_stableRemoveInactive(iterator: any, flagToClear: any): void;
        export class cocos_core_scene_graph_component_scheduler_LifeCycleInvoker {
            static stableRemoveInactive: typeof cocos_core_scene_graph_component_scheduler_stableRemoveInactive;
            protected _zero: js.array.MutableForwardIterator<any>;
            protected _neg: js.array.MutableForwardIterator<any>;
            protected _pos: js.array.MutableForwardIterator<any>;
            protected _invoke: any;
            constructor(invokeFunc: any);
        }
        export class cocos_core_scene_graph_component_scheduler_OneOffInvoker extends cocos_core_scene_graph_component_scheduler_LifeCycleInvoker {
            add(comp: any): void;
            remove(comp: any): void;
            cancelInactive(flagToClear: any): void;
            invoke(): void;
        }
        export class cocos_core_scene_graph_component_scheduler_ReusableInvoker extends cocos_core_scene_graph_component_scheduler_LifeCycleInvoker {
            add(comp: any): void;
            remove(comp: any): void;
            invoke(dt: any): void;
        }
        /**
         * The Manager for Component's life-cycle methods.
         */
        export class cocos_core_scene_graph_component_scheduler_ComponentScheduler {
            startInvoker: cocos_core_scene_graph_component_scheduler_OneOffInvoker;
            updateInvoker: cocos_core_scene_graph_component_scheduler_ReusableInvoker;
            lateUpdateInvoker: cocos_core_scene_graph_component_scheduler_ReusableInvoker;
            constructor();
            unscheduleAll(): void;
            _onEnabled(comp: any): void;
            _onDisabled(comp: any): void;
            enableComp(comp: any, invoker?: any): void;
            disableComp(comp: any): void;
            startPhase(): void;
            updatePhase(dt: any): void;
            lateUpdatePhase(dt: any): void;
        }
        export type TypedArray = Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;
        export type Constructor<T = {}> = new (...args: any[]) => T;
        export type TypedArrayConstructor = Constructor<TypedArray>;
        /**
         * @zh
         * 全局 UBO。
         */
        export class cocos_core_pipeline_define_UBOGlobal {
            static TIME_OFFSET: number;
            static SCREEN_SIZE_OFFSET: number;
            static SCREEN_SCALE_OFFSET: number;
            static NATIVE_SIZE_OFFSET: number;
            static MAT_VIEW_OFFSET: number;
            static MAT_VIEW_INV_OFFSET: number;
            static MAT_PROJ_OFFSET: number;
            static MAT_PROJ_INV_OFFSET: number;
            static MAT_VIEW_PROJ_OFFSET: number;
            static MAT_VIEW_PROJ_INV_OFFSET: number;
            static CAMERA_POS_OFFSET: number;
            static EXPOSURE_OFFSET: number;
            static MAIN_LIT_DIR_OFFSET: number;
            static MAIN_LIT_COLOR_OFFSET: number;
            static AMBIENT_SKY_OFFSET: number;
            static AMBIENT_GROUND_OFFSET: number;
            static COUNT: number;
            static SIZE: number;
            static BLOCK: GFXUniformBlock;
            view: Float32Array;
        }
        export class cocos_core_pipeline_pipeline_serialization_RenderTextureDesc {
            name: string;
            type: GFXTextureType;
            viewType: GFXTextureViewType;
            usage: GFXTextureUsageBit;
            format: GFXFormat;
            width: number;
            height: number;
        }
        export class cocos_core_pipeline_pipeline_serialization_FrameBufferDesc {
            name: string;
            renderPass: number;
            colorViews: string[];
            depthStencilView: string;
        }
        export class cocos_core_pipeline_pipeline_serialization_DepthStencilDesc {
            format: GFXFormat;
            depthLoadOp: GFXLoadOp;
            depthStoreOp: GFXStoreOp;
            stencilLoadOp: GFXLoadOp;
            stencilStoreOp: GFXStoreOp;
            sampleCount: number;
            beginLayout: GFXTextureLayout;
            endLayout: GFXTextureLayout;
        }
        export class cocos_core_pipeline_pipeline_serialization_RenderPassDesc {
            index: number;
            colorAttachments: never[];
            depthStencilAttachment: cocos_core_pipeline_pipeline_serialization_DepthStencilDesc;
        }
        /**
         * @zh
         * 渲染流程描述信息。
         */
        export interface cocos_core_pipeline_render_pipeline_IRenderPipelineInfo {
            enablePostProcess?: boolean;
            enableHDR?: boolean;
            enableMSAA?: boolean;
            enableSMAA?: boolean;
            enableIBL?: boolean;
            renderTextures?: cocos_core_pipeline_pipeline_serialization_RenderTextureDesc[];
            framebuffers?: cocos_core_pipeline_pipeline_serialization_FrameBufferDesc[];
            renderPasses?: cocos_core_pipeline_pipeline_serialization_RenderPassDesc[];
        }
        export enum cocos_core_pipeline_pipeline_serialization_RenderFlowType {
            SCENE = 0,
            POSTPROCESS = 1,
            UI = 2
        }
        /**
         * @zh
         * 渲染流程描述信息。
         */
        export interface cocos_core_pipeline_render_flow_IRenderFlowInfo {
            name?: string;
            priority: number;
            material?: Material;
            type?: cocos_core_pipeline_pipeline_serialization_RenderFlowType;
        }
        export enum cocos_core_pipeline_render_stage_RenderQueueSortMode {
            FRONT_TO_BACK = 0,
            BACK_TO_FRONT = 1
        }
        export class cocos_core_pipeline_render_stage_RenderQueueDesc {
            isTransparent: boolean;
            sortMode: cocos_core_pipeline_render_stage_RenderQueueSortMode;
            stages: string[];
        }
        /**
         * @zh
         * 渲染过程。
         */
        export interface cocos_core_pipeline_define_IRenderPass {
            hash: number;
            depth: number;
            shaderId: number;
            subModel: renderer.SubModel;
            cmdBuff: GFXCommandBuffer;
        }
        /**
         * @zh
         * 渲染队列描述。
         */
        export interface cocos_core_pipeline_define_IRenderQueueDesc {
            isTransparent: boolean;
            phases: number;
            sortFunc: (a: cocos_core_pipeline_define_IRenderPass, b: cocos_core_pipeline_define_IRenderPass) => number;
        }
        /**
         * @zh
         * 渲染队列。
         */
        export class cocos_core_pipeline_render_queue_RenderQueue {
            /**
             * @zh
             * 基于缓存数组的队列。
             */
            queue: memop.CachedArray<cocos_core_pipeline_define_IRenderPass>;
            /**
             * @zh
             * 基于缓存数组的命令缓冲。
             */
            cmdBuffs: memop.CachedArray<GFXCommandBuffer>;
            /**
             * @zh
             * 命令缓冲数量。
             */
            cmdBuffCount: number;
            /**
             * 构造函数。
             * @param desc 渲染队列描述。
             */
            constructor(desc: cocos_core_pipeline_define_IRenderQueueDesc);
            /**
             * @zh
             * 清空渲染队列。
             */
            clear(): void;
            /**
             * @zh
             * 插入渲染过程。
             */
            insertRenderPass(renderObj: renderer.__private.cocos_core_pipeline_define_IRenderObject, modelIdx: number, passIdx: number): boolean;
            /**
             * @zh
             * 排序渲染队列。
             */
            sort(): void;
        }
        /**
         * @zh
         * 渲染阶段描述信息。
         */
        export interface cocos_core_pipeline_render_stage_IRenderStageInfo {
            name?: string;
            priority: number;
            renderQueues?: cocos_core_pipeline_render_stage_RenderQueueDesc[];
            framebuffer?: string;
        }
        /**
         * @zh
         * 前向灯光 UBO。
         */
        export class cocos_core_pipeline_define_UBOForwardLight {
            static MAX_SPHERE_LIGHTS: number;
            static MAX_SPOT_LIGHTS: number;
            static SPHERE_LIGHT_POS_OFFSET: number;
            static SPHERE_LIGHT_SIZE_RANGE_OFFSET: number;
            static SPHERE_LIGHT_COLOR_OFFSET: number;
            static SPOT_LIGHT_POS_OFFSET: number;
            static SPOT_LIGHT_SIZE_RANGE_ANGLE_OFFSET: number;
            static SPOT_LIGHT_DIR_OFFSET: number;
            static SPOT_LIGHT_COLOR_OFFSET: number;
            static COUNT: number;
            static SIZE: number;
            static BLOCK: GFXUniformBlock;
            view: Float32Array;
        }
        export namespace cocos_core_load_pipeline_pack_downloader {
            export function initPacks(packs: any): void;
            export function _loadNewPack(uuid: any, packUuid: any, callback: any): void;
            export function _doPreload(packUuid: any, packJson: any): void;
            export function _doLoadNewPack(uuid: any, packUuid: any, packedJson: any): any;
            export function _selectLoadedPack(packUuids: any): any;
            export function load(item: any, callback: any): any;
        }
        export interface cocos_core_load_pipeline_pipeline_IPipe {
            id: string;
            async: boolean;
            handle(item: IItem, callback: any): any;
            next?: cocos_core_load_pipeline_pipeline_IPipe;
        }
        export class cocos_core_load_pipeline_asset_loader_default implements cocos_core_load_pipeline_pipeline_IPipe {
            static ID: string;
            id: string;
            async: boolean;
            pipeline: Pipeline | null;
            handle(item: any, callback: any): any;
        }
        /**
         * @en
         * Loader for resource loading process. It's a singleton object.
         * @zh
         * 资源加载程序，这是一个单例对象。
         */
        export class cocos_core_load_pipeline_CCLoader_CCLoader extends Pipeline {
            /**
             * @en
             * Gets a new XMLHttpRequest instance.
             * @zh
             * 获取一个新的 XMLHttpRequest 的实例。
             */
            getXMLHttpRequest: Function;
            /**
             * @en
             * The asset loader in cc.loader's pipeline, it's by default the first pipe.<br>
             * It's used to identify an asset's type, and determine how to download it.
             * @zh
             * cc.loader 中的资源加载器，默认情况下是最先加载的。<br>
             * 用于标识资源的类型，并确定如何加载此资源。
             */
            assetLoader: cocos_core_load_pipeline_asset_loader_default;
            /**
             * @en
             * The md5 pipe in cc.loader's pipeline, it could be absent if the project isn't build with md5 option.<br>
             * It's used to modify the url to the real downloadable url with md5 suffix.
             * @zh
             * cc.loader 中的 md5 加载管道，如果项目没有使用 md5 构建，则此项可能不存在。<br>
             * 用于修改带有 md5 后缀的真实可下载的 URL 。
             */
            md5Pipe: null;
            /**
             * @en
             * The downloader in cc.loader's pipeline, it's by default the second pipe.<br>
             * It's used to download files with several handlers: pure text, image, script, audio, font, uuid.<br>
             * You can add your own download function with addDownloadHandlers
             * @zh
             * cc.loader 中的资源下载程序，默认情况下是第二个加载的。<br>
             * 它用于下载带有多个处理程序的文件：纯文本，图像，脚本，音频，字体，uuid。<br>
             * 您可以使用 addDownloadHandlers 来添加自己的下载函数
             */
            downloader: Downloader;
            /**
             * @en
             * The loader in cc.loader's pipeline, it's by default the third pipe.<br>
             * It's used to parse downloaded content with several handlers: JSON, image, plist, fnt, uuid.<br>
             * You can add your own download function with addLoadHandlers
             * @zh
             * cc.loader 中的资源下载程序，默认情况下是第三个加载的。<br>
             * 它用于解析下载的内容及多个处理程序的文件：纯文本，图像，脚本，音频，字体，uuid。<br>
             * 您可以使用 addLoadHandlers 来添加自己的下载函数
             */
            loader: Loader;
            onProgress: null;
            _assetTables: any;
            constructor();
            init(director: any): void;
            /**
             * @en
             * Add custom supported types handler or modify existing type handler for download process.
             * @zh
             * 为下载程序添加自定义支持的类型处理程序或修改现有的类型处理程序。
             * @example
             * ```typescript
             *  cc.loader.addDownloadHandlers({
             *      // This will match all url with `.scene` extension or all url with `scene` type
             *      'scene' : function (url, callback) {}
             *  });
             * ```
             * @param extMap 具有相应处理程序的自定义支持类型
             */
            addDownloadHandlers(extMap: Object): void;
            /**
             * @en
             * Add custom supported types handler or modify existing type handler for load process.
             * @zh
             * 为加载程序添加自定义支持的类型处理程序或修改现有的类型处理程序。
             * @example
             * ```typescript
             *  cc.loader.addLoadHandlers({
             *      // This will match all url with `.scene` extension or all url with `scene` type
             *      'scene' : function (url, callback) {}
             *  });
             * ```
             * @method addLoadHandlers
             * @param extMap 具有相应处理程序的自定义支持类型
             */
            addLoadHandlers(extMap: Object): void;
            /**
             * @en
             * Load resources with a progression callback and a complete callback.<br>
             * The progression callback is the same as Pipeline's [[LoadingItems.onProgress]] <br>
             * The complete callback is almost the same as Pipeline's [[LoadingItems.onComplete]] <br>
             * The only difference is when user pass a single url as resources, the complete callback will set its result directly as the second parameter.
             * @zh
             * 使用进度回调和完整回调加载资源。<br>
             * 进度回调与 Pipeline 的 [[LoadingItems.onProgress]] 相同<br>
             * 完整的回调与 Pipeline 的 [[LoadingItems.onComplete]] 几乎相同<br>
             * 唯一的区别是当用户将单个 URL 作为资源传递时，完整的回调将其结果直接设置为第二个参数。
             * @example
             * ```TypeScript
             * cc.loader.load('a.png', function (err, tex) {
             *     cc.log('Result should be a texture: ' + (tex instanceof cc.Texture2D));
             * });
             *
             * cc.loader.load('http://example.com/a.png', function (err, tex) {
             *     cc.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
             * });
             *
             * cc.loader.load({url: 'http://example.com/getImageREST?file=a.png', type: 'png'}, function (err, tex) {
             *     cc.log('Should load a texture from RESTful API by specify the type: ' + (tex instanceof cc.Texture2D));
             * });
             *
             * cc.loader.load(['a.png', 'b.json'], function (errors, results) {
             *     if (errors) {
             *         for (let i = 0; i < errors.length; i++) {
             *             cc.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
             *         }
             *     }
             *     let aTex = results.getContent('a.png');
             *     let bJsonObj = results.getContent('b.json');
             * });
             * ```
             * @method load
             * @param {String|String[]|Object} resources - Url 列表数组
             * @param {Function} progressCallback - 当进度改变时调用的回调函数
             * @param {Number} progressCallback.completedCount - The number of the items that are already completed
             * @param {Number} progressCallback.totalCount - The total number of the items
             * @param {Object} progressCallback.item - The latest item which flow out the pipeline
             * @param {Function} completeCallback - 当所有资源加载完毕后调用的回调函数
             */
            load(resources: any, progressCallback: any, completeCallback?: any): any;
            /**
             * @en
             * See: [[Pipeline.flowInDeps]]
             * @zh
             * 参考：[[Pipeline.flowInDeps]]
             */
            flowInDeps(owner: any, urlList: any, callback: any): IItem[];
            loadRes<T>(url: string, type: Constructor<T>, mount: string, progressCallback: LoadProgressCallback, completeCallback: LoadCompleteCallback<T>): any;
            loadRes<T>(url: string, type: Constructor<T>, progressCallback: LoadProgressCallback, completeCallback: LoadCompleteCallback<T>): any;
            loadRes<T>(url: string, type: Constructor<T>, completeCallback: LoadCompleteCallback<T>): any;
            /**
             * @en
             * Load all assets in a folder inside the "assets/resources" folder of your project.<br>
             * <br>
             * Note: All asset URLs in Creator use forward slashes, URLs using backslashes will not work.
             * @zh
             * 将所有资产加载到项目 “assets / resources” 文件夹中
             * <br>
             * 注意：Creator 中的所有资源 URL 都使用正斜杠，使用反斜杠的 URL 将不起作用。
             * @method loadResDir
             * @param {String} url - 目标文件夹的 URL<br>
             *                       URl 相对于 “resources” 文件夹，必须省略文件扩展名。
             * @param {Function} type - 如果提供此参数，则将仅加载此类型的资源。
             * @param {Function} progressCallback - 当进度改变时调用的回调函数
             * @param {Number} progressCallback.completedCount - The number of the items that are already completed.
             * @param {Number} progressCallback.totalCount - The total number of the items.
             * @param {Object} progressCallback.item - The latest item which flow out the pipeline.
             * @param {Function} completeCallback - 当所有资源加载完毕后或者发生错误时调用的回调函数
             * @param {Error} completeCallback.error - If one of the asset failed, the complete callback is immediately called
             *                                         with the error. If all assets are loaded successfully, error will be null.
             * @param {Asset[]|Array} completeCallback.assets - An array of all loaded assets.
             *                                             If nothing to load, assets will be an empty array.
             * @param {String[]} completeCallback.urls - An array that lists all the URLs of loaded assets.
             *
             * @example
             * ```typescript
             * // load the texture (resources/imgs/cocos.png) and the corresponding sprite frame
             * cc.loader.loadResDir('imgs/cocos', function (err, assets) {
             *     if (err) {
             *         cc.error(err);
             *         return;
             *     }
             *     let texture = assets[0];
             *     let spriteFrame = assets[1];
             * });
             *
             * // load all textures in "resources/imgs/"
             * cc.loader.loadResDir('imgs', cc.Texture2D, function (err, textures) {
             *     let texture1 = textures[0];
             *     let texture2 = textures[1];
             * });
             *
             * // load all JSONs in "resources/data/"
             * cc.loader.loadResDir('data', function (err, objects, urls) {
             *     let data = objects[0];
             *     let url = urls[0];
             * });
             * ```
             */
            loadResDir(url: String, type?: Function, mount?: any, progressCallback?: Function, completeCallback?: Function): void;
            /**
             * @en
             * This method is like [[loadRes]] except that it accepts array of url.
             * @zh
             * 此方法除了接受 URL 数组参数外，与 [[loadRes]] 方法相同。
             *
             * @method loadResArray
             * @param {String[]} urls - 目标资源的 URL 数组。
             *                          URl 为相对于 “resources” 文件夹的，且必须省略文件扩展名。
             * @param {Function} type - 如果提供此参数，则将仅加载此类型的资源。
             * @param {Function} progressCallback - 当进度改变时调用的回调函数
             * @param {Number} progressCallback.completedCount - The number of the items that are already completed.
             * @param {Number} progressCallback.totalCount - The total number of the items.
             * @param {Object} progressCallback.item - The latest item which flow out the pipeline.
             * @param {Function} completeCallback - 当所有资源加载完毕后或者发生错误时调用的回调函数
             * @param {Error} completeCallback.error - If one of the asset failed, the complete callback is immediately called
             *                                         with the error. If all assets are loaded successfully, error will be null.
             * @param {Asset[]|Array} completeCallback.assets - An array of all loaded assets.
             *                                                     If nothing to load, assets will be an empty array.
             * @example
             * ```typescript
             * // load the SpriteFrames from resources folder
             * let spriteFrames;
             * let urls = ['misc/characters/character_01', 'misc/weapons/weapons_01'];
             * cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, assets) {
             *     if (err) {
             *         cc.error(err);
             *         return;
             *     }
             *     spriteFrames = assets;
             *     // ...
             * });
             * ```
             */
            loadResArray(urls: String[], type?: Function, mount?: any, progressCallback?: Function, completeCallback?: Function): void;
            /**
             * @en
             * Get resource data by id. <br>
             * When you load resources with [[load]] or [[loadRes]],
             * the url will be the unique identity of the resource.
             * After loaded, you can acquire them by passing the url to this API.
             * @zh
             * 根据 ID 获取资源数据。<br>
             * 当使用 [[load]] 或 [[loadRes]] 来加载资源时，<br>
             * URL 将是资源的唯一标识。<br>
             * 在完成加载之后，你可以通过将 URL 传递给此 API 来获取它们。
             * @method getRes
             * @param {String} url
             * @param {Function} type - 如果提供此参数，则将仅返回此类型的资源。
             * @returns {*}
             */
            getRes<T = any>(url: string, type?: Function): T | null;
            /**
             * @en
             * Get total resources count in loader.
             * @zh
             * 获取加载的总资源数量
             */
            getResCount(): Number;
            /**
             * @en
             * Get all resource dependencies of the requested asset in an array, including itself.<br>
             * The owner parameter accept the following types: 1. The asset itself; 2. The resource url; 3. The asset's uuid.<br>
             * The returned array stores the dependencies with their uuids, after retrieve dependencies,<br>
             * you can release them, access dependent assets by passing the uuid to [[getRes]], or other stuffs you want.<br>
             * For release all dependencies of an asset, please refer to [[release]]
             * Here is some examples:
             * @zh
             * 获取一个指定资源的所有依赖资源，包含它自身，并保存在数组中返回。<br>
             * owner 参数接收以下几种类型：1. 资源 asset 对象；2. 资源目录下的 url；3. 资源的 uuid。<br>
             * 返回的数组将仅保存依赖资源的 uuid，获取这些 uuid 后，你可以从 loader 释放这些资源；通过 [[getRes]] 获取某个资源或者进行其他你需要的操作。<br>
             * 想要释放一个资源及其依赖资源，可以参考 [[release]]。<br>
             * 下面是一些示例代码：
             * @example
             * ```typescript
             * // Release all dependencies of a loaded prefab
             * let deps = cc.loader.getDependsRecursively(prefab);
             * cc.loader.release(deps);
             * // Retrieve all dependent textures
             * let deps = cc.loader.getDependsRecursively('prefabs/sample');
             * let textures = [];
             * for (let i = 0; i < deps.length; ++i) {
             *     let item = cc.loader.getRes(deps[i]);
             *     if (item instanceof cc.Texture2D) {
             *         textures.push(item);
             *     }
             * }
             * ```
             * @method getDependsRecursively
             * @param {Asset|RawAsset|String} owner - 资源本身或者是资源的 url 或者是资源的 uuid
             * @return {Array}
             */
            getDependsRecursively(owner: Asset | RawAsset | String): string[];
            /**
             * @en
             * Release the content of an asset or an array of assets by uuid.<br>
             * Start from v1.3, this method will not only remove the cache of the asset in loader, but also clean up its content.<br>
             * For example, if you release a texture, the texture asset and its gl texture data will be freed up.<br>
             * In complexe project, you can use this function with [[getDependsRecursively]] to free up memory in critical circumstances.<br>
             * Notice, this method may cause the texture to be unusable, if there are still other nodes use the same texture, they may turn to black and report gl errors.<br>
             * If you only want to remove the cache of an asset, please use [[Pipeline.removeItem]]
             * @zh
             * 通过 id（通常是资源 url）来释放一个资源或者一个资源数组。<br>
             * 从 v1.3 开始，这个方法不仅会从 loader 中删除资源的缓存引用，还会清理它的资源内容。<br>
             * 比如说，当你释放一个 texture 资源，这个 texture 和它的 gl 贴图数据都会被释放。<br>
             * 在复杂项目中，我们建议你结合 [[getDependsRecursively]] 来使用，便于在设备内存告急的情况下更快地释放不再需要的资源的内存。<br>
             * 注意，这个函数可能会导致资源贴图或资源所依赖的贴图不可用，如果场景中存在节点仍然依赖同样的贴图，它们可能会变黑并报 GL 错误。<br>
             * 如果你只想删除一个资源的缓存引用，请使用 [[Pipeline.removeItem]]
             *
             * @example
             * ```typescript
             * // Release a texture which is no longer need
             * cc.loader.release(texture);
             * // Release all dependencies of a loaded prefab
             * let deps = cc.loader.getDependsRecursively('prefabs/sample');
             * cc.loader.release(deps);
             * // If there is no instance of this prefab in the scene, the prefab and its dependencies like textures, sprite frames, etc, will be freed up.
             * // If you have some other nodes share a texture in this prefab, you can skip it in two ways:
             * // 1. Forbid auto release a texture before release
             * cc.loader.setAutoRelease(texture2d, false);
             * // 2. Remove it from the dependencies array
             * let deps = cc.loader.getDependsRecursively('prefabs/sample');
             * let index = deps.indexOf(texture2d._uuid);
             * if (index !== -1)
             *     deps.splice(index, 1);
             * cc.loader.release(deps);
             * ```
             * @method release
             * @param {Asset|RawAsset|String|Array} asset
             */
            release(asset: any): void;
            /**
             * @en Release the asset by its object. Refer to [[release]] for detailed informations.
             * @zh 通过资源对象自身来释放资源。详细信息请参考 [[release]]
             *
             * @method releaseAsset
             * @param {Asset} asset
             */
            releaseAsset(asset: Asset): void;
            /**
             * @en
             * Release the asset loaded by [[loadRes]]. Refer to [[release]] for detailed informations.
             * @zh
             * 释放通过 [[loadRes]] 加载的资源。详细信息请参考 [[release]]
             *
             * @method releaseRes
             * @param {String} url
             * @param {Function} type - 如果提供此参数，则将仅释放此类型的资源。
             */
            releaseRes(url: String, type?: Function, mount?: any): void;
            /**
             * @en
             * Release the all assets loaded by [[loadResDir]]. Refer to [[release]] for detailed informations.
             * @zh
             * 释放通过 [[loadResDir]] 加载的资源。详细信息请参考 [[release]]
             *
             * @method releaseResDir
             * @param {String} url
             * @param {Function} type - 如果提供此参数，则将仅释放此类型的资源。
             */
            releaseResDir(url: String, type?: Function, mount?: any): void;
            /**
             * @en Resource all assets. Refer to [[release]] for detailed informations.
             * @zh 释放所有资源。详细信息请参考 [[release]]
             *
             * @method releaseAll
             */
            releaseAll(): void;
            removeItem(key: any): any;
            /**
             * @en
             * Indicates whether to release the asset when loading a new scene.<br>
             * By default, when loading a new scene, all assets in the previous scene will be released or preserved<br>
             * according to whether the previous scene checked the "Auto Release Assets" option.<br>
             * On the other hand, assets dynamically loaded by using `cc.loader.loadRes` or `cc.loader.loadResDir`<br>
             * will not be affected by that option, remain not released by default.<br>
             * Use this API to change the default behavior on a single asset, to force preserve or release specified asset when scene switching.<br>
             * <br>
             * See: [[setAutoReleaseRecursively]], [[isAutoRelease]]
             * @zh
             * 设置当场景切换时是否自动释放资源。<br>
             * 默认情况下，当加载新场景时，旧场景的资源根据旧场景是否勾选“Auto Release Assets”，将会被释放或者保留。<br>
             * 而使用 `cc.loader.loadRes` 或 `cc.loader.loadResDir` 动态加载的资源，则不受场景设置的影响，默认不自动释放。<br>
             * 使用这个 API 可以在单个资源上改变这个默认行为，强制在切换场景时保留或者释放指定资源。<br>
             * <br>
             * 参考：[[setAutoReleaseRecursively]]，[[isAutoRelease]]
             *
             * @example
             * ```typescript
             * // auto release the texture event if "Auto Release Assets" disabled in current scene
             * cc.loader.setAutoRelease(texture2d, true);
             * // don't release the texture even if "Auto Release Assets" enabled in current scene
             * cc.loader.setAutoRelease(texture2d, false);
             * // first parameter can be url
             * cc.loader.setAutoRelease(audioUrl, false);
             * ```
             * @method setAutoRelease
             * @param {Asset|String} assetOrUrlOrUuid - 资源对象或原始资源的 URL 或是 UUID
             * @param {Boolean} autoRelease - 表示是否自动释放
             */
            setAutoRelease(assetOrUrlOrUuid: Asset | String, autoRelease: Boolean): void;
            /**
             * @en
             * Indicates whether to release the asset and its referenced other assets when loading a new scene.<br>
             * By default, when loading a new scene, all assets in the previous scene will be released or preserved<br>
             * according to whether the previous scene checked the "Auto Release Assets" option.<br>
             * On the other hand, assets dynamically loaded by using `cc.loader.loadRes` or `cc.loader.loadResDir`<br>
             * will not be affected by that option, remain not released by default.<br>
             * Use this API to change the default behavior on the specified asset and its recursively referenced assets, to force preserve or release specified asset when scene switching.<br>
             * <br>
             * See: [[setAutoRelease]], [[isAutoRelease]]
             * @zh
             * 设置当场景切换时是否自动释放资源及资源引用的其它资源。<br>
             * 默认情况下，当加载新场景时，旧场景的资源根据旧场景是否勾选“Auto Release Assets”，将会被释放或者保留。<br>
             * 而使用 `cc.loader.loadRes` 或 `cc.loader.loadResDir` 动态加载的资源，则不受场景设置的影响，默认不自动释放。<br>
             * 使用这个 API 可以在指定资源及资源递归引用到的所有资源上改变这个默认行为，强制在切换场景时保留或者释放指定资源。<br>
             * <br>
             * 参考：[[setAutoRelease]]，[[isAutoRelease]]
             *
             * @example
             * ```typescript
             * // auto release the SpriteFrame and its Texture event if "Auto Release Assets" disabled in current scene
             * cc.loader.setAutoReleaseRecursively(spriteFrame, true);
             * // don't release the SpriteFrame and its Texture even if "Auto Release Assets" enabled in current scene
             * cc.loader.setAutoReleaseRecursively(spriteFrame, false);
             * // don't release the Prefab and all the referenced assets
             * cc.loader.setAutoReleaseRecursively(prefab, false);
             * ```
             * @method setAutoReleaseRecursively
             * @param {Asset|String} assetOrUrlOrUuid - 资源对象或原始资源的 URL 或是 UUID
             * @param {Boolean} autoRelease - 表示是否自动释放
             */
            setAutoReleaseRecursively(assetOrUrlOrUuid: Asset | String, autoRelease: Boolean): void;
            /**
             * @en
             * Returns whether the asset is configured as auto released, despite how "Auto Release Assets" property is set on scene asset.<br>
             * <br>
             * See: [[setAutoRelease]], [[setAutoReleaseRecursively]]
             *
             * @zh
             * 返回指定的资源是否有被设置为自动释放，不论场景的“Auto Release Assets”如何设置。<br>
             * <br>
             * 参考：[[setAutoRelease]]，[[setAutoReleaseRecursively]]
             * @method isAutoRelease
             * @param {Asset|String} assetOrUrl - asset object or the raw asset's url
             * @returns {Boolean}
             */
            isAutoRelease(assetOrUrl: Asset | String): Boolean;
            /**
             * @zh
             * 获取资源的 uuid
             */
            _getResUuid(url: any, type: any, mount: any, quiet: any): string;
            /**
             * @en
             * Find the asset's reference id in loader, asset could be asset object, asset uuid or asset url
             * @zh
             * 在 laoder 中找到资源的引用 id ，参数可以是资源对象、资源的 uuid 或者是资源的 url
             */
            _getReferenceKey(assetOrUrlOrUuid: any): any;
        }
        /**
         * @zh
         * 节点事件类。
         */
        export class cocos_core_scene_graph_node_event_processor_NodeEventProcessor {
            get node(): BaseNode;
            /**
             * @zh
             * 节点冒泡事件监听器
             */
            bubblingTargets: EventTarget | null;
            /**
             * @zh
             * 节点捕获事件监听器
             */
            capturingTargets: EventTarget | null;
            /**
             * @zh
             * 触摸监听器
             */
            touchListener: cocos_core_platform_event_manager_event_listener_EventListener | null;
            /**
             * @zh
             * 鼠标监听器
             */
            mouseListener: cocos_core_platform_event_manager_event_listener_EventListener | null;
            constructor(node: BaseNode);
            reattach(): void;
            destroy(): void;
            /**
             * @zh
             * 在节点上注册指定类型的回调函数，也可以设置 target 用于绑定响应函数的 this 对象。<br/>
             * 鼠标或触摸事件会被系统调用 dispatchEvent 方法触发，触发的过程包含三个阶段：<br/>
             * 1. 捕获阶段：派发事件给捕获目标（通过 `getCapturingTargets` 获取），比如，节点树中注册了捕获阶段的父节点，从根节点开始派发直到目标节点。<br/>
             * 2. 目标阶段：派发给目标节点的监听器。<br/>
             * 3. 冒泡阶段：派发事件给冒泡目标（通过 `getBubblingTargets` 获取），比如，节点树中注册了冒泡阶段的父节点，从目标节点开始派发直到根节点。<br/>
             * 同时您可以将事件派发到父节点或者通过调用 stopPropagation 拦截它。<br/>
             * 推荐使用这种方式来监听节点上的触摸或鼠标事件，请不要在节点上直接使用 cc.eventManager。<br/>
             * 你也可以注册自定义事件到节点上，并通过 emit 方法触发此类事件，对于这类事件，不会发生捕获冒泡阶段，只会直接派发给注册在该节点上的监听器。<br/>
             * 你可以通过在 emit 方法调用时在 type 之后传递额外的参数作为事件回调的参数列表。<br/>
             *
             * @param type - 一个监听事件类型的字符串。参见：[[EventType]]
             * @param callback - 事件分派时将被调用的回调函数。如果该回调存在则不会重复添加。
             * @param callback.event - 事件派发的时候回调的第一个参数。
             * @param callback.arg2 - 第二个参数。
             * @param callback.arg3 - 第三个参数。
             * @param callback.arg4 - 第四个参数。
             * @param callback.arg5 - 第五个参数。
             * @param target - 调用回调的目标。可以为空。
             * @param useCapture - 当设置为 true，监听器将在捕获阶段触发，否则将在冒泡阶段触发。默认为 false。
             * @return - 返回监听回调函数自身。
             *
             * @example
             * ```typescript
             * this.node.on(cc.Node.EventType.TOUCH_START, this.memberFunction, this);  // if "this" is component and the "memberFunction" declared in CCClass.
             * this.node.on(cc.Node.EventType.TOUCH_START, callback, this);
             * this.node.on(cc.Node.EventType.ANCHOR_CHANGED, callback);
             * ```
             */
            on(type: string, callback: Function, target?: Object, useCapture?: Object): Function | undefined;
            /**
             * @zh
             * 注册节点的特定事件类型回调，回调会在第一时间被触发后删除自身。
             *
             * @param type - 一个监听事件类型的字符串。参见：[[EventType]]。
             * @param callback - 事件分派时将被调用的回调函数。如果该回调存在则不会重复添加。
             * @param callback.event - 事件派发的时候回调的第一个参数。
             * @param callback.arg2 - 第二个参数。
             * @param callback.arg3 - 第三个参数。
             * @param callback.arg4 - 第四个参数。
             * @param callback.arg5 - 第五个参数。
             * @param target - 调用回调的目标。可以为空。
             * @param useCapture - 当设置为 true，监听器将在捕获阶段触发，否则将在冒泡阶段触发。默认为 false。
             *
             * @example
             * ```typescript
             * node.once(cc.Node.EventType.ANCHOR_CHANGED, callback);
             * ```
             */
            once(type: string, callback: Function, target?: Object, useCapture?: Object): void;
            /**
             * @zh
             * 删除之前与同类型，回调，目标或 useCapture 注册的回调。
             *
             * @param type - 一个监听事件类型的字符串。参见：[[EventType]]。
             * @param callback - 移除指定注册回调。如果没有给，则删除全部同事件类型的监听。
             * @param target - 调用回调的目标。配合 callback 一起使用。
             * @param useCapture - 当设置为 true，监听器将在捕获阶段触发，否则将在冒泡阶段触发。默认为 false。
             *
             * @example
             * ```typescript
             * this.node.off(cc.Node.EventType.TOUCH_START, this.memberFunction, this);
             * node.off(cc.Node.EventType.TOUCH_START, callback, this.node);
             * node.off(cc.Node.EventType.ANCHOR_CHANGED, callback, this);
             * ```
             */
            off(type: string, callback?: Function, target?: Object, useCapture?: Object): void;
            /**
             * @zh
             * 通过事件名发送自定义事件
             *
             * @param type - 一个监听事件类型的字符串。
             * @param arg1 - 回调第一个参数。
             * @param arg2 - 回调第二个参数。
             * @param arg3 - 回调第三个参数。
             * @param arg4 - 回调第四个参数。
             * @param arg5 - 回调第五个参数。
             * @example
             * ```typescript
             * eventTarget.emit('fire', event);
             * eventTarget.emit('fire', message, emitter);
             * ```
             */
            emit(type: string, ...args: any[]): void;
            /**
             * @zh
             * 分发事件到事件流中。
             *
             * @param event - 分派到事件流中的事件对象。
             */
            dispatchEvent(event: Event): void;
            /**
             * @zh
             * 是否监听过某事件。
             *
             * @param type - 一个监听事件类型的字符串。
             * @return - 返回是否当前节点已监听该事件类型。
             */
            hasEventListener(type: string): boolean;
            /**
             * @zh
             * 移除在特定事件类型中注册的所有回调或在某个目标中注册的所有回调。
             *
             * @param target - 要删除的事件键或要删除的目标。
             */
            targetOff(target: string | Object): void;
            /**
             * @zh
             * 获得所提供的事件类型在目标捕获阶段监听的所有目标。
             * 捕获阶段包括从根节点到目标节点的过程。
             * 结果保存在数组参数中，并且必须从子节点排序到父节点。
             *
             * @param type - 一个监听事件类型的字符串。
             * @param array - 接收目标的数组。
             */
            getCapturingTargets(type: string, targets: BaseNode[]): void;
            /**
             * @zh
             * 获得所提供的事件类型在目标冒泡阶段监听的所有目标。
             * 冒泡阶段目标节点到根节点的过程。
             * 结果保存在数组参数中，并且必须从子节点排序到父节点。
             *
             * @param type - 一个监听事件类型的字符串。
             * @param array - 接收目标的数组。
             */
            getBubblingTargets(type: string, targets: BaseNode[]): void;
        }
        /**
         *
         */
        export type cocos_core_scene_graph_base_node_Constructor<T = {}> = new (...args: any[]) => T;
        export enum cocos_core_scene_graph_node_enum_NodeSpace {
            LOCAL = 0,
            WORLD = 1
        }
        export enum cocos_core_scene_graph_node_enum_TransformBit {
            NONE = 0,
            POSITION = 1,
            ROTATION = 2,
            SCALE = 4,
            RS = 6,
            TRS = 7,
            TRS_MASK = "Bad expression <-8>"
        }
        export class cocos_core_scene_graph_node_ui_properties_NodeUIProperties {
            get uiTransformComp(): UITransformComponent | null;
            set uiTransformComp(value: UITransformComponent | null);
            uiComp: UIComponent | null;
            opacity: number;
            protected _uiTransformComp: UITransformComponent | null;
            constructor(node: any);
        }
        /**
         * @zh 场景的环境光照相关信息
         */
        export class cocos_core_scene_graph_scene_globals_AmbientInfo {
            protected _skyColor: math.Color;
            protected _skyIllum: number;
            protected _groundAlbedo: math.Color;
            protected _resource: renderer.Ambient | null;
            set skyColor(val: math.Color);
            get skyColor(): math.Color;
            set skyIllum(val: number);
            get skyIllum(): number;
            set groundAlbedo(val: math.Color);
            get groundAlbedo(): math.Color;
            set renderScene(rs: renderer.RenderScene);
        }
        /**
         * @zh 平面阴影相关信息
         */
        export class cocos_core_scene_graph_scene_globals_PlanarShadowInfo {
            protected _enabled: boolean;
            protected _normal: math.Vec3;
            protected _distance: number;
            protected _shadowColor: math.Color;
            protected _resource: renderer.PlanarShadows | null;
            set enabled(val: boolean);
            get enabled(): boolean;
            set normal(val: math.Vec3);
            get normal(): math.Vec3;
            set distance(val: number);
            get distance(): number;
            set shadowColor(val: math.Color);
            get shadowColor(): math.Color;
            /**
             * @zh 根据指定节点的世界变换设置阴影接收平面的信息
             * @param node 阴影接收平面的世界变换
             */
            setPlaneFromNode(node: Node): void;
            set renderScene(val: renderer.RenderScene);
        }
        /**
         * @zh 天空盒相关信息
         */
        export class cocos_core_scene_graph_scene_globals_SkyboxInfo {
            protected _envmap: TextureCube | null;
            protected _isRGBE: boolean;
            protected _enabled: boolean;
            protected _useIBL: boolean;
            protected _resource: renderer.Skybox | null;
            set enabled(val: boolean);
            get enabled(): boolean;
            set useIBL(val: boolean);
            get useIBL(): boolean;
            set envmap(val: TextureCube | null);
            get envmap(): TextureCube | null;
            set isRGBE(val: boolean);
            get isRGBE(): boolean;
            set renderScene(val: renderer.RenderScene);
        }
        /**
         * @zh 各类场景级别的渲染参数，将影响全场景的所有物体
         */
        export class cocos_core_scene_graph_scene_globals_SceneGlobals {
            ambient: cocos_core_scene_graph_scene_globals_AmbientInfo;
            planarShadows: cocos_core_scene_graph_scene_globals_PlanarShadowInfo;
            get skybox(): cocos_core_scene_graph_scene_globals_SkyboxInfo;
            set skybox(value: cocos_core_scene_graph_scene_globals_SkyboxInfo);
            set renderScene(rs: renderer.RenderScene);
        }
        /**
         * @en
         * A temp fallback to contain the original serialized data which can not be loaded.
         * @zh
         * 包含无法加载的原始序列化数据的临时回退。
         */
        export class cocos_core_components_missing_script_MissingClass {
            _$erialized: null;
        }
        export interface cocos_core_renderer_ui_render_data_IRenderData {
            x: number;
            y: number;
            z: number;
            u: number;
            v: number;
            color: math.Color;
        }
        export class cocos_core_renderer_ui_render_data_BaseRenderData {
            material: Material | null;
            vertexCount: number;
            indiceCount: number;
        }
        export class cocos_core_renderer_ui_render_data_RenderData extends cocos_core_renderer_ui_render_data_BaseRenderData {
            get dataLength(): number;
            set dataLength(length: number);
            get datas(): cocos_core_renderer_ui_render_data_IRenderData[];
            static add(): cocos_core_renderer_ui_render_data_RenderData;
            static remove(data: cocos_core_renderer_ui_render_data_RenderData): void;
            vData: Float32Array | null;
            uvDirty: boolean;
            vertDirty: boolean;
            updateSizeNPivot(width: number, height: number, pivotX: number, pivotY: number): void;
            clear(): void;
        }
        export interface cocos_core_renderer_ui_base_IAssembler {
            [key: string]: any;
        }
        export interface cocos_core_renderer_ui_base_IAssemblerManager {
            getAssembler(component: UIRenderComponent): cocos_core_renderer_ui_base_IAssembler;
        }
        export class cocos_core_3d_builtin_init_BuiltinResMgr {
            protected _device: GFXDevice | null;
            protected _resources: Record<string, Asset>;
            initBuiltinRes(device: GFXDevice): void;
            get<T extends Asset>(uuid: string): T;
        }
        export enum cocos_core_3d_framework_light_component_LightBakeType {
            NONE = 0,
            BAKE_ONLY = 1,
            BAKEABLE = 2
        }
        /**
         * @en model light map settings.
         * @zh 模型光照图设置
         */
        export class cocos_core_3d_framework_model_component_ModelLightmapSettings {
            texture: Texture2D | null;
            uvParam: math.Vec4;
            protected _bakeable: boolean;
            protected _castShadow: boolean;
            protected _recieveShadow: boolean;
            protected _lightmapSize: number;
            get bakeable(): boolean;
            set bakeable(val: boolean);
            get castShadow(): boolean;
            set castShadow(val: boolean);
            get recieveShadow(): boolean;
            set recieveShadow(val: boolean);
            get lightmapSize(): number;
            set lightmapSize(val: number);
        }
        /**
         * 动画使用的循环模式。
         */
        export enum cocos_core_animation_types_WrapMode {
            Default = 0,
            Normal = 1,
            Reverse = 36,
            Loop = 2,
            LoopReverse = 38,
            PingPong = 22,
            PingPongReverse = 54
        }
        /**
         * For internal
         */
        export class cocos_core_animation_types_WrappedInfo {
            ratio: number;
            time: number;
            direction: number;
            stopped: boolean;
            iterations: number;
            frameIndex: number;
            constructor(info?: cocos_core_animation_types_WrappedInfo);
            set(info: cocos_core_animation_types_WrappedInfo): void;
        }
        export interface cocos_core_animation_bound_target_IBoundTarget {
            setValue(value: any): void;
            getValue(): any;
        }
        export class cocos_core_animation_animation_state_ICurveInstance {
            commonTargetIndex?: number;
            constructor(runtimeCurve: Omit<IRuntimeCurve, "sampler">, target: any, boundTarget: cocos_core_animation_bound_target_IBoundTarget);
            applySample(ratio: number, index: number, lerpRequired: boolean, samplerResultCache: any, weight: number): void;
            get propertyName(): string;
            get curveDetail(): Pick<IRuntimeCurve, "modifiers" | "valueAdapter" | "commonTarget" | "curve">;
        }
        /**
         * The curves in ISamplerSharedGroup share a same keys.
         */
        export interface cocos_core_animation_animation_state_ISamplerSharedGroup {
            sampler: RatioSampler | null;
            curves: cocos_core_animation_animation_state_ICurveInstance[];
            samplerResultCache: {
                from: number;
                fromRatio: number;
                to: number;
                toRatio: number;
            };
        }
        export interface cocos_core_animation_bound_target_IBufferedTarget extends cocos_core_animation_bound_target_IBoundTarget {
            peek(): any;
            pull(): void;
            push(): void;
        }
        export interface cocos_core_animation_animation_state_IAnimationEventDefinitionMap {
            "finished": (animationState: AnimationState) => void;
            "lastframe": (animationState: AnimationState) => void;
            "play": (animationState: AnimationState) => void;
            "pause": (animationState: AnimationState) => void;
            "resume": (animationState: AnimationState) => void;
            "stop": (animationState: AnimationState) => void;
        }
        /**
         * @hidden
         */
        export type cocos_core_event_defines_EventArgumentsOf<K extends string, Map extends any, AllowCustomEvents extends boolean = false> = K extends (keyof Map) ? Parameters<Map[K]> : (AllowCustomEvents extends true ? any[] : never);
        export type cocos_core_event_defines_EventCallbackOf<K extends string, Map extends any, AllowCustomEvents extends boolean = false> = K extends (keyof Map) ? (...args: Parameters<Map[K]>) => void : (AllowCustomEvents extends true ? (...args: any[]) => void : never);
        export class cocos_core_animation_playable_Playable {
            get isPlaying(): boolean;
            get isPaused(): boolean;
            get isMotionless(): boolean;
            /**
             * @en Play this animation.
             * @zh 播放动画。
             */
            play(): void;
            /**
             * @en Stop this animation.
             * @zh 停止动画播放。
             */
            stop(): void;
            /**
             * @en Pause this animation.
             * @zh 暂停动画。
             */
            pause(): void;
            /**
             * @en Resume this animation.
             * @zh 重新播放动画。
             */
            resume(): void;
            /**
             * @en Perform a single frame step.
             * @zh 执行一帧动画。
             */
            step(): void;
            update(deltaTime: number): void;
            protected onPlay(): void;
            protected onPause(): void;
            protected onResume(): void;
            protected onStop(): void;
            protected onError(message: string): void;
        }
        export interface cocos_core_animation_skeletal_animation_blending_PropertyBlendState<T> {
            weight: number;
            value: T;
            /**
             * How many writer reference this property.
             */
            refCount: number;
        }
        export interface cocos_core_animation_skeletal_animation_blending_NodeBlendState {
            properties: {
                position?: cocos_core_animation_skeletal_animation_blending_PropertyBlendState<math.Vec3>;
                rotation?: cocos_core_animation_skeletal_animation_blending_PropertyBlendState<math.Quat>;
                scale?: cocos_core_animation_skeletal_animation_blending_PropertyBlendState<math.Vec3>;
            };
        }
        export type cocos_core_animation_skeletal_animation_blending_BlendingProperty = keyof cocos_core_animation_skeletal_animation_blending_NodeBlendState["properties"];
        export class cocos_core_animation_skeletal_animation_blending_BlendStateBuffer {
            ref(node: Node, property: cocos_core_animation_skeletal_animation_blending_BlendingProperty): cocos_core_animation_skeletal_animation_blending_PropertyBlendState<math.Vec3> | cocos_core_animation_skeletal_animation_blending_PropertyBlendState<math.Quat>;
            deRef(node: Node, property: cocos_core_animation_skeletal_animation_blending_BlendingProperty): void;
            apply(): void;
        }
        export class cocos_core_animation_cross_fade_CrossFade extends cocos_core_animation_playable_Playable {
            constructor();
            update(deltaTime: number): void;
            /**
             * 在指定时间内将从当前动画状态切换到指定的动画状态。
             * @param state 指定的动画状态。
             * @param duration 切换时间。
             */
            crossFade(state: AnimationState | null, duration: number): void;
            clear(): void;
            protected onPlay(): void;
            /**
             * 停止我们淡入淡出的所有动画状态并停止淡入淡出。
             */
            protected onPause(): void;
            /**
             * 恢复我们淡入淡出的所有动画状态并继续淡入淡出。
             */
            protected onResume(): void;
            /**
             * 停止所有淡入淡出的动画状态。
             */
            protected onStop(): void;
        }
        export class cocos_core_utils_profiler_counter_Counter {
            get value(): number;
            set value(val: number);
            protected _id: string;
            protected _opts: cocos_core_utils_profiler_counter_ICounterOption;
            protected _accumStart: number;
            protected _total: number;
            protected _value: number;
            protected _averageValue: number;
            protected _accumValue: number;
            protected _accumSamples: number;
            constructor(id: string, opts: cocos_core_utils_profiler_counter_ICounterOption, now: number);
            sample(now: number): void;
            human(): number;
            alarm(): boolean | 0 | undefined;
            protected _average(v: number, now?: number): void;
        }
        export interface cocos_core_utils_profiler_counter_ICounterOption {
            desc: string;
            counter: cocos_core_utils_profiler_counter_Counter;
            min?: number;
            max?: number;
            average?: number;
            below?: number;
            over?: number;
            color?: string;
            isInteger?: boolean;
        }
    }
    import bits = math.bits;
    export { bits };
    import Vec2 = math.Vec2;
    export { Vec2 };
    import v2 = math.v2;
    export { v2 };
    import Vec3 = math.Vec3;
    export { Vec3 };
    import v3 = math.v3;
    export { v3 };
    import Vec4 = math.Vec4;
    export { Vec4 };
    import v4 = math.v4;
    export { v4 };
    import Quat = math.Quat;
    export { Quat };
    import quat = math.quat;
    export { quat };
    import Mat3 = math.Mat3;
    export { Mat3 };
    import Mat4 = math.Mat4;
    export { Mat4 };
    import mat4 = math.mat4;
    export { mat4 };
    import AffineTransform = math.AffineTransform;
    export { AffineTransform };
    import Size = math.Size;
    export { Size };
    import size = math.size;
    export { size };
    import Rect = math.Rect;
    export { Rect };
    import rect = math.rect;
    export { rect };
    import Color = math.Color;
    export { Color };
    import color = math.color;
    export { color };
    import equals = math.equals;
    export { equals };
    import approx = math.approx;
    export { approx };
    import clamp = math.clamp;
    export { clamp };
    import clamp01 = math.clamp01;
    export { clamp01 };
    import lerp = math.lerp;
    export { lerp };
    import toRadian = math.toRadian;
    export { toRadian };
    import toDegree = math.toDegree;
    export { toDegree };
    import randomRange = math.randomRange;
    export { randomRange };
    import randomRangeInt = math.randomRangeInt;
    export { randomRangeInt };
    import pseudoRandom = math.pseudoRandom;
    export { pseudoRandom };
    import pseudoRandomRange = math.pseudoRandomRange;
    export { pseudoRandomRange };
    import pseudoRandomRangeInt = math.pseudoRandomRangeInt;
    export { pseudoRandomRangeInt };
    import nextPow2 = math.nextPow2;
    export { nextPow2 };
    import repeat = math.repeat;
    export { repeat };
    import pingPong = math.pingPong;
    export { pingPong };
    import inverseLerp = math.inverseLerp;
    export { inverseLerp };
    import absMaxComponent = math.absMaxComponent;
    export { absMaxComponent };
    import absMax = math.absMax;
    export { absMax };
    import EPSILON = math.EPSILON;
    export { EPSILON };
    import random = math.random;
    export { random };
    import Pool = memop.Pool;
    export { Pool };
    import RecyclePool = memop.RecyclePool;
    export { RecyclePool };
    import CachedArray = memop.CachedArray;
    export { CachedArray };
    import ICubicSplineValue = animation.ICubicSplineValue;
    export { ICubicSplineValue };
    import CubicSplineValueConstructor = animation.CubicSplineValueConstructor;
    export { CubicSplineValueConstructor };
    import CubicSplineVec2Value = animation.CubicSplineVec2Value;
    export { CubicSplineVec2Value };
    import CubicSplineVec3Value = animation.CubicSplineVec3Value;
    export { CubicSplineVec3Value };
    import CubicSplineVec4Value = animation.CubicSplineVec4Value;
    export { CubicSplineVec4Value };
    import CubicSplineQuatValue = animation.CubicSplineQuatValue;
    export { CubicSplineQuatValue };
    import CubicSplineNumberValue = animation.CubicSplineNumberValue;
    export { CubicSplineNumberValue };
    import { MeshBuffer, UIStaticBatchComponent } from "cc.ui";
    import { WebGL2GFXDevice } from "cc.gfx-webgl2";
    import { WebGLGFXDevice } from "cc.gfx-webgl";
}
declare module "cc.gfx-webgl" {
    export class WebGLGFXDevice extends GFXDevice {
        get gl(): WebGLRenderingContext;
        get webGLQueue(): __private.cocos_core_gfx_webgl_webgl_queue_WebGLGFXQueue;
        get isAntialias(): boolean;
        get isPremultipliedAlpha(): boolean;
        get useVAO(): boolean;
        get EXT_texture_filter_anisotropic(): EXT_texture_filter_anisotropic | null;
        get EXT_frag_depth(): EXT_frag_depth | null;
        get EXT_shader_texture_lod(): EXT_shader_texture_lod | null;
        get EXT_sRGB(): EXT_sRGB | null;
        get OES_vertex_array_object(): OES_vertex_array_object | null;
        get WEBGL_color_buffer_float(): WEBGL_color_buffer_float | null;
        get WEBGL_compressed_texture_etc1(): __private.WEBGL_compressed_texture_etc1 | null;
        get WEBGL_compressed_texture_pvrtc(): __private.WEBGL_compressed_texture_pvrtc | null;
        get WEBGL_compressed_texture_astc(): WEBGL_compressed_texture_astc | null;
        get WEBGL_compressed_texture_s3tc(): WEBGL_compressed_texture_s3tc | null;
        get WEBGL_compressed_texture_s3tc_srgb(): WEBGL_compressed_texture_s3tc_srgb | null;
        get WEBGL_debug_shaders(): WEBGL_debug_shaders | null;
        get WEBGL_draw_buffers(): WEBGL_draw_buffers | null;
        get WEBGL_lose_context(): WEBGL_lose_context | null;
        get WEBGL_depth_texture(): WEBGL_depth_texture | null;
        get WEBGL_debug_renderer_info(): WEBGL_debug_renderer_info | null;
        get OES_texture_half_float(): OES_texture_half_float | null;
        get OES_texture_half_float_linear(): OES_texture_half_float_linear | null;
        get OES_texture_float(): OES_texture_float | null;
        get OES_standard_derivatives(): OES_standard_derivatives | null;
        get OES_element_index_uint(): OES_element_index_uint | null;
        get ANGLE_instanced_arrays(): ANGLE_instanced_arrays | null;
        stateCache: __private.cocos_core_gfx_webgl_webgl_state_cache_WebGLStateCache;
        nullTex2D: __private.cocos_core_gfx_webgl_webgl_texture_WebGLGFXTexture | null;
        nullTexCube: __private.cocos_core_gfx_webgl_webgl_texture_WebGLGFXTexture | null;
        constructor();
        initialize(info: IGFXDeviceInfo): boolean;
        destroy(): void;
        resize(width: number, height: number): void;
        createBuffer(info: IGFXBufferInfo): GFXBuffer;
        createTexture(info: IGFXTextureInfo): GFXTexture;
        createTextureView(info: IGFXTextureViewInfo): GFXTextureView;
        createSampler(info: IGFXSamplerInfo): GFXSampler;
        createBindingLayout(info: IGFXBindingLayoutInfo): GFXBindingLayout;
        createShader(info: IGFXShaderInfo): GFXShader;
        createInputAssembler(info: IGFXInputAssemblerInfo): GFXInputAssembler;
        createRenderPass(info: IGFXRenderPassInfo): GFXRenderPass;
        createFramebuffer(info: IGFXFramebufferInfo): GFXFramebuffer;
        createPipelineLayout(info: IGFXPipelineLayoutInfo): GFXPipelineLayout;
        createPipelineState(info: IGFXPipelineStateInfo): GFXPipelineState;
        createCommandAllocator(info: IGFXCommandAllocatorInfo): GFXCommandAllocator;
        createCommandBuffer(info: IGFXCommandBufferInfo): GFXCommandBuffer;
        createQueue(info: IGFXQueueInfo): GFXQueue;
        createWindow(info: IGFXWindowInfo): GFXWindow;
        present(): void;
        copyBuffersToTexture(buffers: ArrayBufferView[], texture: GFXTexture, regions: GFXBufferTextureCopy[]): void;
        copyTexImagesToTexture(texImages: TexImageSource[], texture: GFXTexture, regions: GFXBufferTextureCopy[]): void;
        copyFramebufferToBuffer(srcFramebuffer: GFXFramebuffer, dstBuffer: ArrayBuffer, regions: GFXBufferTextureCopy[]): void;
        blitFramebuffer(src: GFXFramebuffer, dst: GFXFramebuffer, srcRect: IGFXRect, dstRect: IGFXRect, filter: GFXFilter): void;
    }
    export namespace __private {
        export class cocos_core_gfx_webgl_webgl_queue_WebGLGFXQueue extends GFXQueue {
            numDrawCalls: number;
            numInstances: number;
            numTris: number;
            initialize(info: IGFXQueueInfo): boolean;
            destroy(): void;
            submit(cmdBuffs: GFXCommandBuffer[], fence?: any): void;
            clear(): void;
        }
        // note that ETC1 is not supported with the compressedTexSubImage2D() method
        export interface WEBGL_compressed_texture_etc1 {
            COMPRESSED_RGB_ETC1_WEBGL: GLenum;
        }
        export interface WEBGL_compressed_texture_pvrtc {
            COMPRESSED_RGB_PVRTC_4BPPV1_IMG: GLenum;
            COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: GLenum;
            COMPRESSED_RGB_PVRTC_2BPPV1_IMG: GLenum;
            COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: GLenum;
        }
        export interface cocos_core_gfx_webgl_webgl_state_cache_IWebGLTexUnit {
            glTexture: WebGLTexture | null;
        }
        export class cocos_core_gfx_webgl_webgl_state_cache_WebGLStateCache {
            glArrayBuffer: WebGLBuffer | null;
            glElementArrayBuffer: WebGLBuffer | null;
            glVAO: WebGLVertexArrayObjectOES | null;
            texUnit: number;
            glTexUnits: cocos_core_gfx_webgl_webgl_state_cache_IWebGLTexUnit[];
            glRenderbuffer: WebGLRenderbuffer | null;
            glFramebuffer: WebGLFramebuffer | null;
            viewport: IGFXViewport;
            scissorRect: IGFXRect;
            rs: GFXRasterizerState;
            dss: GFXDepthStencilState;
            bs: GFXBlendState;
            glProgram: WebGLProgram | null;
            glEnabledAttribLocs: boolean[];
            glCurrentAttribLocs: boolean[];
            constructor();
        }
        export class cocos_core_gfx_webgl_webgl_gpu_objects_WebGLGPUTexture {
            type: GFXTextureType;
            viewType: GFXTextureViewType;
            format: GFXFormat;
            usage: GFXTextureUsage;
            width: number;
            height: number;
            depth: number;
            size: number;
            arrayLayer: number;
            mipLevel: number;
            samples: GFXSampleCount;
            flags: GFXTextureFlags;
            isPowerOf2: boolean;
            glTarget: GLenum;
            glInternelFmt: GLenum;
            glFormat: GLenum;
            glType: GLenum;
            glUsage: GLenum;
            glTexture: WebGLTexture | null;
            glRenderbuffer: WebGLRenderbuffer | null;
            glWrapS: GLenum;
            glWrapT: GLenum;
            glMinFilter: GLenum;
            glMagFilter: GLenum;
        }
        export class cocos_core_gfx_webgl_webgl_texture_WebGLGFXTexture extends GFXTexture {
            get gpuTexture(): cocos_core_gfx_webgl_webgl_gpu_objects_WebGLGPUTexture;
            initialize(info: IGFXTextureInfo): boolean;
            destroy(): void;
            resize(width: number, height: number): void;
        }
    }
    import { IGFXQueueInfo, GFXCommandBuffer, GFXQueue, IGFXViewport, IGFXRect, GFXRasterizerState, GFXDepthStencilState, GFXBlendState, GFXTextureType, GFXTextureViewType, GFXFormat, GFXTextureUsage, GFXSampleCount, GFXTextureFlags, IGFXTextureInfo, GFXTexture, IGFXDeviceInfo, IGFXBufferInfo, GFXBuffer, IGFXTextureViewInfo, GFXTextureView, IGFXSamplerInfo, GFXSampler, IGFXBindingLayoutInfo, GFXBindingLayout, IGFXShaderInfo, GFXShader, IGFXInputAssemblerInfo, GFXInputAssembler, IGFXRenderPassInfo, GFXRenderPass, IGFXFramebufferInfo, GFXFramebuffer, IGFXPipelineLayoutInfo, GFXPipelineLayout, IGFXPipelineStateInfo, GFXPipelineState, IGFXCommandAllocatorInfo, GFXCommandAllocator, IGFXCommandBufferInfo, IGFXWindowInfo, GFXWindow, GFXBufferTextureCopy, GFXFilter, GFXDevice } from "cc.core";
}
declare module "cc.gfx-webgl2" {
    export class WebGL2GFXDevice extends GFXDevice {
        get gl(): WebGL2RenderingContext;
        get isAntialias(): boolean;
        get isPremultipliedAlpha(): boolean;
        get useVAO(): boolean;
        get EXT_texture_filter_anisotropic(): EXT_texture_filter_anisotropic | null;
        get OES_texture_float_linear(): OES_texture_float_linear | null;
        get EXT_color_buffer_float(): __private.EXT_color_buffer_float | null;
        get EXT_disjoint_timer_query_webgl2(): __private.EXT_disjoint_timer_query_webgl2 | null;
        get WEBGL_compressed_texture_etc1(): ___private.WEBGL_compressed_texture_etc1 | null;
        get WEBGL_compressed_texture_etc(): __private.WEBGL_compressed_texture_etc | null;
        get WEBGL_compressed_texture_pvrtc(): ___private.WEBGL_compressed_texture_pvrtc | null;
        get WEBGL_compressed_texture_s3tc(): WEBGL_compressed_texture_s3tc | null;
        get WEBGL_compressed_texture_s3tc_srgb(): WEBGL_compressed_texture_s3tc_srgb | null;
        stateCache: __private.cocos_core_gfx_webgl2_webgl2_state_cache_WebGL2StateCache;
        nullTex2D: __private.cocos_core_gfx_webgl2_webgl2_texture_WebGL2GFXTexture | null;
        nullTexCube: __private.cocos_core_gfx_webgl2_webgl2_texture_WebGL2GFXTexture | null;
        constructor();
        initialize(info: IGFXDeviceInfo): boolean;
        destroy(): void;
        resize(width: number, height: number): void;
        createBuffer(info: IGFXBufferInfo): GFXBuffer;
        createTexture(info: IGFXTextureInfo): GFXTexture;
        createTextureView(info: IGFXTextureViewInfo): GFXTextureView;
        createSampler(info: IGFXSamplerInfo): GFXSampler;
        createBindingLayout(info: IGFXBindingLayoutInfo): GFXBindingLayout;
        createShader(info: IGFXShaderInfo): GFXShader;
        createInputAssembler(info: IGFXInputAssemblerInfo): GFXInputAssembler;
        createRenderPass(info: IGFXRenderPassInfo): GFXRenderPass;
        createFramebuffer(info: IGFXFramebufferInfo): GFXFramebuffer;
        createPipelineLayout(info: IGFXPipelineLayoutInfo): GFXPipelineLayout;
        createPipelineState(info: IGFXPipelineStateInfo): GFXPipelineState;
        createCommandAllocator(info: IGFXCommandAllocatorInfo): GFXCommandAllocator;
        createCommandBuffer(info: IGFXCommandBufferInfo): GFXCommandBuffer;
        createQueue(info: IGFXQueueInfo): GFXQueue;
        createWindow(info: IGFXWindowInfo): GFXWindow;
        present(): void;
        copyBuffersToTexture(buffers: ArrayBufferView[], texture: GFXTexture, regions: GFXBufferTextureCopy[]): void;
        copyTexImagesToTexture(texImages: TexImageSource[], texture: GFXTexture, regions: GFXBufferTextureCopy[]): void;
        copyFramebufferToBuffer(srcFramebuffer: GFXFramebuffer, dstBuffer: ArrayBuffer, regions: GFXBufferTextureCopy[]): void;
        blitFramebuffer(src: GFXFramebuffer, dst: GFXFramebuffer, srcRect: IGFXRect, dstRect: IGFXRect, filter: GFXFilter): void;
    }
    export namespace __private {
        export interface EXT_color_buffer_float {
        }
        export interface EXT_disjoint_timer_query_webgl2 {
            QUERY_COUNTER_BITS_EXT: GLenum;
            TIME_ELAPSED_EXT: GLenum;
            TIMESTAMP_EXT: GLenum;
            GPU_DISJOINT_EXT: GLenum;
            queryCounterEXT(query: WebGLQuery, target: GLenum): void;
        }
        export interface WEBGL_compressed_texture_etc {
            COMPRESSED_R11_EAC: GLenum;
            COMPRESSED_SIGNED_R11_EAC: GLenum;
            COMPRESSED_RG11_EAC: GLenum;
            COMPRESSED_SIGNED_RG11_EAC: GLenum;
            COMPRESSED_RGB8_ETC2: GLenum;
            COMPRESSED_RGBA8_ETC2_EAC: GLenum;
            COMPRESSED_SRGB8_ETC2: GLenum;
            COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: GLenum;
            COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: GLenum;
            COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: GLenum;
        }
        export interface cocos_core_gfx_webgl2_webgl2_state_cache_IWebGL2TexUnit {
            glTexture: WebGLTexture | null;
        }
        export class cocos_core_gfx_webgl2_webgl2_state_cache_WebGL2StateCache {
            glArrayBuffer: WebGLBuffer | null;
            glElementArrayBuffer: WebGLBuffer | null;
            glUniformBuffer: WebGLBuffer | null;
            glBindUBOs: Array<WebGLBuffer | null>;
            glVAO: WebGLVertexArrayObject | null;
            texUnit: number;
            glTexUnits: cocos_core_gfx_webgl2_webgl2_state_cache_IWebGL2TexUnit[];
            glSamplerUnits: Array<WebGLSampler | null>;
            glRenderbuffer: WebGLRenderbuffer | null;
            glFramebuffer: WebGLFramebuffer | null;
            glReadFramebuffer: WebGLFramebuffer | null;
            viewport: IGFXViewport;
            scissorRect: IGFXRect;
            rs: GFXRasterizerState;
            dss: GFXDepthStencilState;
            bs: GFXBlendState;
            glProgram: WebGLProgram | null;
            glEnabledAttribLocs: boolean[];
            glCurrentAttribLocs: boolean[];
            constructor();
        }
        export class cocos_core_gfx_webgl2_webgl2_gpu_objects_WebGL2GPUTexture {
            type: GFXTextureType;
            viewType: GFXTextureViewType;
            format: GFXFormat;
            usage: GFXTextureUsage;
            width: number;
            height: number;
            depth: number;
            size: number;
            arrayLayer: number;
            mipLevel: number;
            samples: GFXSampleCount;
            flags: GFXTextureFlags;
            isPowerOf2: boolean;
            glTarget: GLenum;
            glInternelFmt: GLenum;
            glFormat: GLenum;
            glType: GLenum;
            glUsage: GLenum;
            glTexture: WebGLTexture | null;
            glRenderbuffer: WebGLRenderbuffer | null;
            glWrapS: GLenum;
            glWrapT: GLenum;
            glMinFilter: GLenum;
            glMagFilter: GLenum;
        }
        export class cocos_core_gfx_webgl2_webgl2_texture_WebGL2GFXTexture extends GFXTexture {
            get gpuTexture(): cocos_core_gfx_webgl2_webgl2_gpu_objects_WebGL2GPUTexture;
            initialize(info: IGFXTextureInfo): boolean;
            destroy(): void;
            resize(width: number, height: number): void;
        }
    }
    import { __private as ___private } from "cc.gfx-webgl";
    import { IGFXViewport, IGFXRect, GFXRasterizerState, GFXDepthStencilState, GFXBlendState, GFXTextureType, GFXTextureViewType, GFXFormat, GFXTextureUsage, GFXSampleCount, GFXTextureFlags, IGFXTextureInfo, GFXTexture, IGFXDeviceInfo, IGFXBufferInfo, GFXBuffer, IGFXTextureViewInfo, GFXTextureView, IGFXSamplerInfo, GFXSampler, IGFXBindingLayoutInfo, GFXBindingLayout, IGFXShaderInfo, GFXShader, IGFXInputAssemblerInfo, GFXInputAssembler, IGFXRenderPassInfo, GFXRenderPass, IGFXFramebufferInfo, GFXFramebuffer, IGFXPipelineLayoutInfo, GFXPipelineLayout, IGFXPipelineStateInfo, GFXPipelineState, IGFXCommandAllocatorInfo, GFXCommandAllocator, IGFXCommandBufferInfo, GFXCommandBuffer, IGFXQueueInfo, GFXQueue, IGFXWindowInfo, GFXWindow, GFXBufferTextureCopy, GFXFilter, GFXDevice } from "cc.core";
}
declare module "cc.audio" {
    /**
     * @en
     * The audio clip asset. <br>
     * 'started' event is emitted once the audio began to play. <br>
     * 'ended' event is emitted once the audio stopped. <br>
     * Low-level platform-specific details are handled independently inside each clip.
     * @zh
     * 音频片段资源。<br>
     * 每当音频片段实际开始播放时，会发出 'started' 事件；<br>
     * 每当音频片段自然结束播放时，会发出 'ended' 事件。<br>
     * 每个片段独立处理自己依赖的平台相关的底层细节。
     */
    export class AudioClip extends Asset {
        static PlayingState: {
            INITIALIZING: number;
            PLAYING: number;
            STOPPED: number;
        };
        static AudioType: {
            WEB_AUDIO: number;
            DOM_AUDIO: number;
            JSB_AUDIO: number;
            UNKNOWN_AUDIO: number;
        };
        static preventDeferredLoadDependents: boolean;
        protected _duration: number;
        protected _loadMode: number;
        protected _audio: any;
        protected _player: __private.cocos_audio_assets_player_AudioPlayer | null;
        constructor();
        destroy(): boolean;
        set _nativeAsset(clip: any);
        get _nativeAsset(): any;
        get loadMode(): number;
        get state(): number;
        play(): void;
        pause(): void;
        stop(): void;
        playOneShot(volume: number): void;
        setCurrentTime(val: number): void;
        getCurrentTime(): number;
        getDuration(): number;
        setVolume(val: number, immediate?: boolean): void;
        getVolume(): number;
        setLoop(val: boolean): void;
        getLoop(): boolean;
    }
    /**
     * @en
     * A representation of a single audio source, <br>
     * contains basic functionalities like play, pause and stop.
     * @zh
     * 音频组件，代表单个音源，提供播放、暂停、停止等基本功能。
     */
    export class AudioSourceComponent extends Component {
        protected _clip: AudioClip | null;
        protected _loop: boolean;
        protected _playOnAwake: boolean;
        protected _volume: number;
        set clip(val: AudioClip | null);
        get clip(): AudioClip | null;
        set loop(val: boolean);
        get loop(): boolean;
        set playOnAwake(val: boolean);
        get playOnAwake(): boolean;
        set volume(val: number);
        get volume(): number;
        onLoad(): void;
        onDisable(): void;
        onDestroy(): void;
        /**
         * @en
         * Play the clip.<br>
         * Restart if already playing.<br>
         * Resume if paused.
         * @zh
         * 开始播放。<br>
         * 如果音频处于正在播放状态，将会重新开始播放音频。<br>
         * 如果音频处于暂停状态，则会继续播放音频。
         */
        play(): void;
        /**
         * @en
         * Pause the clip.
         * @zh
         * 暂停播放。
         */
        pause(): void;
        /**
         * @en
         * Stop the clip.
         * @zh
         * 停止播放。
         */
        stop(): void;
        /**
         * @en
         * Plays an AudioClip, and scales volume by volumeScale.<br>
         * Note: for multiple playback on the same clip, the actual behavior is platform-specific.<br>
         * Re-start style fallback will be used if the underlying platform doesn't support it.
         * @zh
         * 以指定音量播放一个音频一次。<br>
         * 注意，对同一个音频片段，不同平台多重播放效果存在差异。<br>
         * 对不支持的平台，如前一次尚未播完，则会立即重新播放。
         * @param clip The audio clip to be played.
         * @param volumeScale volume scaling factor wrt. current value.
         */
        playOneShot(clip: AudioClip, volumeScale?: number): void;
        protected _syncStates(): void;
        set currentTime(num: number);
        get currentTime(): number;
        get duration(): number;
        get state(): number;
        get playing(): boolean;
    }
    export namespace __private {
        export interface cocos_audio_assets_player_IAudioInfo {
            clip: any;
            duration: number;
            eventTarget: any;
        }
        export abstract class cocos_audio_assets_player_AudioPlayer {
            protected _state: number;
            protected _duration: number;
            protected _eventTarget: any;
            protected _onHide: Function;
            protected _onShow: Function;
            protected _interrupted: boolean;
            protected _blocking: boolean;
            constructor(info: cocos_audio_assets_player_IAudioInfo);
            abstract play(): void;
            abstract pause(): void;
            abstract stop(): void;
            abstract playOneShot(volume: number): void;
            abstract setCurrentTime(val: number): void;
            abstract getCurrentTime(): number;
            abstract setVolume(val: number, immediate: boolean): void;
            abstract getVolume(): number;
            abstract setLoop(val: boolean): void;
            abstract getLoop(): boolean;
            getState(): number;
            getDuration(): number;
            destroy(): void;
        }
    }
    import { Asset, Component } from "cc.core";
}
declare module "cc.particle" {
    export class BillboardComponent extends Component {
        get texture(): null;
        set texture(val: null);
        get height(): number;
        set height(val: number);
        get width(): number;
        set width(val: number);
        get rotation(): number;
        set rotation(val: number);
        constructor();
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
    }
    export class LineComponent extends Component {
        get texture(): null;
        set texture(val: null);
        get worldSpace(): boolean;
        set worldSpace(val: boolean);
        get positions(): never[];
        set positions(val: never[]);
        get width(): __private.cocos_particle_animator_curve_range_default;
        set width(val: __private.cocos_particle_animator_curve_range_default);
        get tile(): math.Vec2;
        set tile(val: math.Vec2);
        get offset(): math.Vec2;
        set offset(val: math.Vec2);
        get color(): __private.cocos_particle_animator_gradient_range_default;
        set color(val: __private.cocos_particle_animator_gradient_range_default);
        constructor();
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
    }
    export class ParticleSystemComponent extends RenderableComponent {
        get capacity(): number;
        set capacity(val: number);
        /**
         * @zh 粒子初始颜色。
         */
        startColor: __private.cocos_particle_animator_gradient_range_default;
        scaleSpace: number;
        startSize3D: boolean;
        /**
         * @zh 粒子初始大小。
         */
        startSizeX: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 粒子初始大小。
         */
        startSizeY: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 粒子初始大小。
         */
        startSizeZ: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 粒子初始速度。
         */
        startSpeed: __private.cocos_particle_animator_curve_range_default;
        startRotation3D: boolean;
        /**
         * @zh 粒子初始旋转角度。
         */
        startRotationX: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 粒子初始旋转角度。
         */
        startRotationY: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 粒子初始旋转角度。
         */
        startRotationZ: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 粒子系统开始运行后，延迟粒子发射的时间。
         */
        startDelay: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 粒子生命周期。
         */
        startLifetime: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 粒子系统运行时间。
         */
        duration: number;
        /**
         * @zh 粒子系统是否循环播放。
         */
        loop: boolean;
        get prewarm(): boolean;
        set prewarm(val: boolean);
        get simulationSpace(): number;
        set simulationSpace(val: number);
        /**
         * @zh 控制整个粒子系统的更新速度。
         */
        simulationSpeed: number;
        /**
         * @zh 粒子系统加载后是否自动开始播放。
         */
        playOnAwake: boolean;
        /**
         * @zh 粒子受重力影响的重力系数。
         */
        gravityModifier: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 每秒发射的粒子数。
         */
        rateOverTime: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 每移动单位距离发射的粒子数。
         */
        rateOverDistance: __private.cocos_particle_animator_curve_range_default;
        /**
         * @zh 设定在指定时间发射指定数量的粒子的 Brust 的数量。
         */
        bursts: any[];
        get sharedMaterials(): (Material | null)[];
        set sharedMaterials(val: (Material | null)[]);
        /**
         * @zh 颜色控制模块。
         */
        colorOverLifetimeModule: __private.cocos_particle_animator_color_overtime_default;
        /**
         * @zh 粒子发射器模块。
         */
        shapeModule: __private.cocos_particle_emitter_shape_module_default;
        /**
         * @zh 粒子大小模块。
         */
        sizeOvertimeModule: __private.cocos_particle_animator_size_overtime_default;
        /**
         * @zh 粒子速度模块。
         */
        velocityOvertimeModule: __private.cocos_particle_animator_velocity_overtime_default;
        /**
         * @zh 粒子加速度模块。
         */
        forceOvertimeModule: __private.cocos_particle_animator_force_overtime_default;
        /**
         * @zh 粒子限制速度模块（只支持 CPU 粒子）。
         */
        limitVelocityOvertimeModule: __private.cocos_particle_animator_limit_velocity_overtime_default;
        /**
         * @zh 粒子旋转模块。
         */
        rotationOvertimeModule: __private.cocos_particle_animator_rotation_overtime_default;
        /**
         * @zh 贴图动画模块。
         */
        textureAnimationModule: __private.cocos_particle_animator_texture_animation_default;
        /**
         * @zh 粒子轨迹模块。
         */
        trailModule: __private.cocos_particle_renderer_trail_default;
        renderer: __private.cocos_particle_renderer_particle_system_renderer_data_default;
        enableCulling: boolean;
        processor: __private.cocos_particle_renderer_particle_system_renderer_base_IParticleSystemRenderer | null;
        constructor();
        onLoad(): void;
        _onMaterialModified(index: number, material: Material): void;
        _onRebuildPSO(index: number, material: Material): void;
        _collectModels(): renderer.Model[];
        protected _attachToScene(): void;
        protected _detachFromScene(): void;
        bindModule(): void;
        /**
         * 播放粒子效果。
         */
        play(): void;
        /**
         * 暂停播放粒子效果。
         */
        pause(): void;
        /**
         * 停止播放粒子。
         */
        stop(): void;
        /**
         * 将所有粒子从粒子系统中清除。
         */
        clear(): void;
        /**
         * @zh 获取当前粒子数量
         */
        getParticleCount(): number;
        /**
         * @ignore
         */
        setCustomData1(x: any, y: any): void;
        setCustomData2(x: any, y: any): void;
        protected onDestroy(): void;
        protected onEnable(): void;
        protected onDisable(): void;
        protected update(dt: any): void;
        protected _onVisiblityChange(val: any): void;
        get isPlaying(): boolean;
        get isPaused(): boolean;
        get isStopped(): boolean;
        get isEmitting(): boolean;
        get time(): number;
        _onBeforeSerialize(props: any): any;
    }
    export class ParticleUtils {
        /**
         * instantiate
         */
        static instantiate(prefab: any): CCObject;
        static destroy(prefab: any): void;
        static play(rootNode: Node): void;
        static stop(rootNode: Node): void;
    }
    export namespace __private {
        export class cocos_particle_animator_curve_range_default {
            static Mode: {
                Constant: number;
                Curve: number;
                TwoCurves: number;
                TwoConstants: number;
            };
            /**
             * @zh 曲线类型[[Mode]]。
             */
            mode: number;
            /**
             * @zh 当mode为Curve时，使用的曲线。
             */
            curve: geometry.AnimationCurve;
            /**
             * @zh 当mode为TwoCurves时，使用的曲线下限。
             */
            curveMin: geometry.AnimationCurve;
            /**
             * @zh 当mode为TwoCurves时，使用的曲线上限。
             */
            curveMax: geometry.AnimationCurve;
            /**
             * @zh 当mode为Constant时，曲线的值。
             */
            constant: number;
            /**
             * @zh 当mode为TwoConstants时，曲线的上限。
             */
            constantMin: number;
            /**
             * @zh 当mode为TwoConstants时，曲线的下限。
             */
            constantMax: number;
            /**
             * @zh 应用于曲线插值的系数。
             */
            multiplier: number;
            constructor();
            evaluate(time: number, rndRatio: number): number | undefined;
            getMax(): number;
            _onBeforeSerialize(props: any): any;
        }
        export class cocos_particle_animator_gradient_ColorKey {
            color: math.Color;
            time: number;
        }
        export class cocos_particle_animator_gradient_AlphaKey {
            alpha: number;
            time: number;
        }
        export class cocos_particle_animator_gradient_default {
            static Mode: {
                Blend: number;
                Fixed: number;
            };
            colorKeys: cocos_particle_animator_gradient_ColorKey[];
            alphaKeys: cocos_particle_animator_gradient_AlphaKey[];
            mode: number;
            constructor();
            setKeys(colorKeys: cocos_particle_animator_gradient_ColorKey[], alphaKeys: cocos_particle_animator_gradient_AlphaKey[]): void;
            sortKeys(): void;
            evaluate(time: number): math.Color;
            randomColor(): math.Color;
        }
        export class cocos_particle_animator_gradient_range_default {
            get mode(): number;
            set mode(m: number);
            static Mode: {
                Color: number;
                Gradient: number;
                TwoColors: number;
                TwoGradients: number;
                RandomColor: number;
            };
            /**
             * @zh 当mode为Color时的颜色。
             */
            color: math.Color;
            /**
             * @zh 当mode为TwoColors时的颜色下限。
             */
            colorMin: math.Color;
            /**
             * @zh 当mode为TwoColors时的颜色上限。
             */
            colorMax: math.Color;
            /**
             * @zh 当mode为Gradient时的颜色渐变。
             */
            gradient: cocos_particle_animator_gradient_default;
            /**
             * @zh 当mode为TwoGradients时的颜色渐变下限。
             */
            gradientMin: cocos_particle_animator_gradient_default;
            /**
             * @zh 当mode为TwoGradients时的颜色渐变上限。
             */
            gradientMax: cocos_particle_animator_gradient_default;
            evaluate(time: number, rndRatio: number): math.Color;
            _onBeforeSerialize(props: any): any;
        }
        export class cocos_particle_particle_Particle {
            particleSystem: ParticleSystemComponent;
            position: math.Vec3;
            velocity: math.Vec3;
            animatedVelocity: math.Vec3;
            ultimateVelocity: math.Vec3;
            angularVelocity: math.Vec3;
            axisOfRotation: math.Vec3;
            rotation: math.Vec3;
            startSize: math.Vec3;
            size: math.Vec3;
            startColor: math.Color;
            color: math.Color;
            randomSeed: number;
            remainingLifetime: number;
            startLifetime: number;
            emitAccumulator0: number;
            emitAccumulator1: number;
            frameIndex: number;
            startRow: number;
            constructor(particleSystem: any);
        }
        export interface cocos_particle_particle_IParticleModule {
            target: cocos_particle_renderer_particle_system_renderer_base_IParticleSystemRenderer | null;
            needUpdate: Boolean;
            needAnimate: Boolean;
            name: string;
            bindTarget(target: any): void;
            update(space: number, trans: math.Mat4): void;
            animate(p: cocos_particle_particle_Particle, dt?: number): void;
        }
        export interface cocos_particle_renderer_particle_system_renderer_base_IParticleSystemRenderer {
            onInit(ps: Component): void;
            onEnable(): void;
            onDisable(): void;
            onDestroy(): void;
            clear(): void;
            attachToScene(): void;
            detachFromScene(): void;
            updateMaterialParams(): void;
            setVertexAttributes(): void;
            updateRenderMode(): void;
            onMaterialModified(index: number, material: Material): void;
            onRebuildPSO(index: number, material: Material): void;
            getParticleCount(): number;
            getFreeParticle(): cocos_particle_particle_Particle | null;
            setNewParticle(p: cocos_particle_particle_Particle): void;
            updateParticles(dt: number): number;
            updateRenderData(): void;
            enableModule(name: string, val: Boolean, pm: cocos_particle_particle_IParticleModule): void;
            updateTrailMaterial(): void;
            getDefaultTrailMaterial(): any;
        }
        export abstract class cocos_particle_particle_ParticleModuleBase implements cocos_particle_particle_IParticleModule {
            target: cocos_particle_renderer_particle_system_renderer_base_IParticleSystemRenderer | null;
            needUpdate: Boolean;
            needAnimate: Boolean;
            bindTarget(target: cocos_particle_renderer_particle_system_renderer_base_IParticleSystemRenderer): void;
            update(space: number, trans: math.Mat4): void;
            abstract name: string;
            abstract animate(p: cocos_particle_particle_Particle, dt?: number): void;
        }
        export class cocos_particle_animator_color_overtime_default extends cocos_particle_particle_ParticleModuleBase {
            _enable: boolean;
            get enable(): boolean;
            set enable(val: boolean);
            /**
             * @zh 颜色随时间变化的参数，各个 key 之间线性差值变化。
             */
            color: cocos_particle_animator_gradient_range_default;
            name: string;
            animate(particle: cocos_particle_particle_Particle): void;
        }
        export class cocos_particle_emitter_shape_module_default {
            get position(): math.Vec3;
            set position(val: math.Vec3);
            get rotation(): math.Vec3;
            set rotation(val: math.Vec3);
            get scale(): math.Vec3;
            set scale(val: math.Vec3);
            get arc(): number;
            set arc(val: number);
            get angle(): number;
            set angle(val: number);
            get enable(): boolean;
            set enable(val: boolean);
            /**
             * @zh 粒子发射器类型 [[ShapeType]]。
             */
            _shapeType: number;
            get shapeType(): number;
            set shapeType(val: number);
            /**
             * @zh 粒子从发射器哪个部位发射 [[EmitLocation]]。
             */
            emitFrom: number;
            /**
             * @zh 根据粒子的初始方向决定粒子的移动方向。
             */
            alignToDirection: boolean;
            /**
             * @zh 粒子生成方向随机设定。
             */
            randomDirectionAmount: number;
            /**
             * @zh 表示当前发射方向与当前位置到结点中心连线方向的插值。
             */
            sphericalDirectionAmount: number;
            /**
             * @zh 粒子生成位置随机设定（设定此值为非 0 会使粒子生成位置超出生成器大小范围）。
             */
            randomPositionAmount: number;
            /**
             * @zh 粒子发射器半径。
             */
            radius: number;
            /**
             * @zh 粒子发射器发射位置（对 Box 类型的发射器无效）：<bg>
             * - 0 表示从表面发射；
             * - 1 表示从中心发射；
             * - 0 ~ 1 之间表示在中心到表面之间发射。
             */
            radiusThickness: number;
            /**
             * @zh 粒子在扇形范围内的发射方式 [[ArcMode]]。
             */
            arcMode: number;
            /**
             * @zh 控制可能产生粒子的弧周围的离散间隔。
             */
            arcSpread: number;
            /**
             * @zh 粒子沿圆周发射的速度。
             */
            arcSpeed: cocos_particle_animator_curve_range_default;
            /**
             * @zh 圆锥顶部截面距离底部的轴长<bg>。
             * 决定圆锥发射器的高度。
             */
            length: number;
            /**
             * @zh 粒子发射器发射位置（针对 Box 类型的粒子发射器）。
             */
            boxThickness: math.Vec3;
            constructor();
            onInit(ps: ParticleSystemComponent): void;
            emit(p: any): void;
        }
        export class cocos_particle_animator_size_overtime_default extends cocos_particle_particle_ParticleModuleBase {
            _enable: Boolean;
            get enable(): Boolean;
            set enable(val: Boolean);
            /**
             * @zh 决定是否在每个轴上独立控制粒子大小。
             */
            separateAxes: boolean;
            /**
             * @zh 定义一条曲线来决定粒子在其生命周期中的大小变化。
             */
            size: cocos_particle_animator_curve_range_default;
            /**
             * @zh 定义一条曲线来决定粒子在其生命周期中 X 轴方向上的大小变化。
             */
            x: cocos_particle_animator_curve_range_default;
            /**
             * @zh 定义一条曲线来决定粒子在其生命周期中 Y 轴方向上的大小变化。
             */
            y: cocos_particle_animator_curve_range_default;
            /**
             * @zh 定义一条曲线来决定粒子在其生命周期中 Z 轴方向上的大小变化。
             */
            z: cocos_particle_animator_curve_range_default;
            name: string;
            animate(particle: cocos_particle_particle_Particle, dt: number): void;
        }
        export class cocos_particle_animator_velocity_overtime_default extends cocos_particle_particle_ParticleModuleBase {
            _enable: Boolean;
            get enable(): Boolean;
            set enable(val: Boolean);
            /**
             * @zh X 轴方向上的速度分量。
             */
            x: cocos_particle_animator_curve_range_default;
            /**
             * @zh Y 轴方向上的速度分量。
             */
            y: cocos_particle_animator_curve_range_default;
            /**
             * @zh Z 轴方向上的速度分量。
             */
            z: cocos_particle_animator_curve_range_default;
            /**
             * @zh 速度修正系数（只支持 CPU 粒子）。
             */
            speedModifier: cocos_particle_animator_curve_range_default;
            /**
             * @zh 速度计算时采用的坐标系[[Space]]。
             */
            space: number;
            name: string;
            constructor();
            update(space: number, worldTransform: math.Mat4): void;
            animate(p: cocos_particle_particle_Particle, dt: number): void;
        }
        export class cocos_particle_animator_force_overtime_default extends cocos_particle_particle_ParticleModuleBase {
            _enable: Boolean;
            get enable(): Boolean;
            set enable(val: Boolean);
            /**
             * @zh X 轴方向上的加速度分量。
             */
            x: cocos_particle_animator_curve_range_default;
            /**
             * @zh Y 轴方向上的加速度分量。
             */
            y: cocos_particle_animator_curve_range_default;
            /**
             * @zh Z 轴方向上的加速度分量。
             */
            z: cocos_particle_animator_curve_range_default;
            /**
             * @zh 加速度计算时采用的坐标系 [[Space]]。
             */
            space: number;
            randomized: boolean;
            name: string;
            constructor();
            update(space: any, worldTransform: any): void;
            animate(p: any, dt: any): void;
        }
        export class cocos_particle_animator_limit_velocity_overtime_default extends cocos_particle_particle_ParticleModuleBase {
            _enable: Boolean;
            get enable(): Boolean;
            set enable(val: Boolean);
            /**
             * @zh X 轴方向上的速度下限。
             */
            limitX: cocos_particle_animator_curve_range_default;
            /**
             * @zh Y 轴方向上的速度下限。
             */
            limitY: cocos_particle_animator_curve_range_default;
            /**
             * @zh Z 轴方向上的速度下限。
             */
            limitZ: cocos_particle_animator_curve_range_default;
            /**
             * @zh 速度下限。
             */
            limit: cocos_particle_animator_curve_range_default;
            /**
             * @zh 当前速度与速度下限的插值。
             */
            dampen: number;
            /**
             * @zh 是否三个轴分开限制。
             */
            separateAxes: boolean;
            /**
             * @zh 计算速度下限时采用的坐标系 [[Space]]。
             */
            space: number;
            drag: null;
            multiplyDragByParticleSize: boolean;
            multiplyDragByParticleVelocity: boolean;
            name: string;
            constructor();
            update(space: number, worldTransform: math.Mat4): void;
            animate(p: cocos_particle_particle_Particle, dt: number): void;
        }
        export class cocos_particle_animator_rotation_overtime_default extends cocos_particle_particle_ParticleModuleBase {
            _enable: Boolean;
            get enable(): Boolean;
            set enable(val: Boolean);
            get separateAxes(): boolean;
            set separateAxes(val: boolean);
            /**
             * @zh 绕 X 轴设定旋转。
             */
            x: cocos_particle_animator_curve_range_default;
            /**
             * @zh 绕 Y 轴设定旋转。
             */
            y: cocos_particle_animator_curve_range_default;
            /**
             * @zh 绕 Z 轴设定旋转。
             */
            z: cocos_particle_animator_curve_range_default;
            name: string;
            animate(p: cocos_particle_particle_Particle, dt: number): void;
        }
        export class cocos_particle_animator_texture_animation_default extends cocos_particle_particle_ParticleModuleBase {
            get enable(): boolean;
            set enable(val: boolean);
            get mode(): number;
            set mode(val: number);
            get numTilesX(): number;
            set numTilesX(val: number);
            get numTilesY(): number;
            set numTilesY(val: number);
            /**
             * @zh 动画播放方式 [[Animation]]。
             */
            animation: number;
            /**
             * @zh 一个周期内动画播放的帧与时间变化曲线。
             */
            frameOverTime: cocos_particle_animator_curve_range_default;
            /**
             * @zh 从第几帧开始播放，时间为整个粒子系统的生命周期。
             */
            startFrame: cocos_particle_animator_curve_range_default;
            /**
             * @zh 一个生命周期内播放循环的次数。
             */
            cycleCount: number;
            get flipU(): number;
            set flipU(val: number);
            get flipV(): number;
            set flipV(val: number);
            get uvChannelMask(): number;
            set uvChannelMask(val: number);
            /**
             * @zh 随机从动画贴图中选择一行以生成动画。<br>
             * 此选项仅在动画播放方式为 SingleRow 时生效。
             */
            randomRow: boolean;
            /**
             * @zh 从动画贴图中选择特定行以生成动画。<br>
             * 此选项仅在动画播放方式为 SingleRow 时且禁用 randomRow 时可用。
             */
            rowIndex: number;
            name: string;
            init(p: cocos_particle_particle_Particle): void;
            animate(p: cocos_particle_particle_Particle, dt: number): void;
        }
        export class cocos_particle_renderer_trail_default {
            get enable(): boolean;
            set enable(val: boolean);
            _enable: boolean;
            /**
             * 设定粒子生成轨迹的方式。
             */
            mode: number;
            /**
             * 轨迹存在的生命周期。
             */
            lifeTime: cocos_particle_animator_curve_range_default;
            _minParticleDistance: number;
            get minParticleDistance(): number;
            set minParticleDistance(val: number);
            get space(): number;
            set space(val: number);
            /**
             * 粒子本身是否存在。
             */
            existWithParticles: boolean;
            /**
             * 设定纹理填充方式。
             */
            textureMode: number;
            widthFromParticle: boolean;
            /**
             * 控制轨迹长度的曲线。
             */
            widthRatio: cocos_particle_animator_curve_range_default;
            colorFromParticle: boolean;
            colorOverTrail: cocos_particle_animator_gradient_range_default;
            colorOvertime: cocos_particle_animator_gradient_range_default;
            constructor();
            onInit(ps: any): void;
            onEnable(): void;
            onDisable(): void;
            _attachToScene(): void;
            _detachFromScene(): void;
            destroy(): void;
            clear(): void;
            _updateMaterial(): void;
            update(): void;
            animate(p: cocos_particle_particle_Particle, scaledDt: number): void;
            removeParticle(p: cocos_particle_particle_Particle): void;
            updateRenderData(): void;
            updateIA(count: number): void;
        }
        export class cocos_particle_renderer_particle_system_renderer_data_default {
            get renderMode(): number;
            set renderMode(val: number);
            get velocityScale(): number;
            set velocityScale(val: number);
            get lengthScale(): number;
            set lengthScale(val: number);
            get mesh(): Mesh | null;
            set mesh(val: Mesh | null);
            get particleMaterial(): any;
            set particleMaterial(val: any);
            get trailMaterial(): any;
            set trailMaterial(val: any);
            get useGPU(): boolean;
            set useGPU(val: boolean);
            onInit(ps: any): void;
        }
    }
    import { Component, geometry, math, Material, Mesh, renderer, RenderableComponent, CCObject, Node } from "cc.core";
}
declare module "cc.terrain" {
    export class HeightField {
        data: Uint16Array;
        w: number;
        h: number;
        constructor(w: number, h: number);
        set(i: number, j: number, value: number): void;
        get(i: number, j: number): number;
        getClamp(i: number, j: number): number;
        getAt(x: number, y: number): number;
    }
    export const TERRAIN_MAX_LEVELS = 4;
    export const TERRAIN_MAX_BLEND_LAYERS = 4;
    export const TERRAIN_MAX_LAYER_COUNT = 256;
    export const TERRAIN_BLOCK_TILE_COMPLEXITY = 32;
    export const TERRAIN_BLOCK_VERTEX_COMPLEXITY = 33;
    export const TERRAIN_BLOCK_VERTEX_SIZE = 8;
    export const TERRAIN_HEIGHT_BASE = 32768;
    export const TERRAIN_HEIGHT_FACTORY: number;
    export const TERRAIN_NORTH_INDEX = 0;
    export const TERRAIN_SOUTH_INDEX = 1;
    export const TERRAIN_WEST_INDEX = 2;
    export const TERRAIN_EAST_INDEX = 3;
    /**
     * 地形信息。
     */
    export class TerrainInfo {
        tileSize: number;
        blockCount: number[];
        weightMapSize: number;
        lightMapSize: number;
        get size(): math.Size;
        get tileCount(): number[];
        get vertexCount(): number[];
    }
    export class TerrainLayer {
        detailMap: Texture2D | null;
        tileSize: number;
    }
    export class TerrainVertex {
        position: math.Vec3;
        normal: math.Vec3;
        uv: math.Vec2;
    }
    export class TerrainRenderable extends RenderableComponent {
        _model: renderer.Model | null;
        _meshData: renderer.__private.cocos_core_assets_mesh_RenderingSubMesh | null;
        _brushMaterial: Material | null;
        _currentMaterial: Material | null;
        _currentMaterialLayers: number;
        destroy(): void;
        _invalidMaterial(): void;
        _updateMaterial(block: TerrainBlock, init: boolean): void;
        _onMaterialModified(idx: number, mtl: Material | null): void;
        protected _onRebuildPSO(idx: number, material: Material): void;
        protected _clearMaterials(): void;
    }
    export class TerrainBlockInfo {
        layers: number[];
    }
    export class TerrainBlockLightmapInfo {
        texture: Texture2D | null;
        UOff: number;
        VOff: number;
        UScale: number;
        VScale: number;
    }
    export class TerrainBlock {
        constructor(t: Terrain, i: number, j: number);
        build(): void;
        rebuild(): void;
        destroy(): void;
        update(): void;
        setBrushMaterial(mtl: Material | null): void;
        get layers(): number[];
        get lightmap(): Texture2D | null;
        get lightmapUVParam(): math.Vec4;
        getTerrain(): Terrain;
        getIndex(): number[];
        getRect(): math.Rect;
        setLayer(index: number, layerId: number): void;
        getLayer(index: number): number;
        getMaxLayer(): 1 | 0 | 2 | 3;
        _getMaterialDefines(nlayers: number): renderer.IDefineMap;
        _invalidMaterial(): void;
        _updateMaterial(init: boolean): void;
        _updateHeight(): void;
        _updateWeightMap(): void;
        _updateLightmap(info: TerrainBlockLightmapInfo): void;
    }
    export class Terrain extends Component {
        protected __asset: TerrainAsset | null;
        protected _layers: Array<TerrainLayer | null>;
        protected _blockInfos: TerrainBlockInfo[];
        protected _lightmapInfos: TerrainBlockLightmapInfo[];
        protected _tileSize: number;
        protected _blockCount: number[];
        protected _weightMapSize: number;
        protected _lightMapSize: number;
        protected _heights: Uint16Array;
        protected _weights: Uint8Array;
        protected _normals: number[];
        protected _blocks: TerrainBlock[];
        protected _sharedIndexBuffer: GFXBuffer | null;
        constructor();
        set _asset(value: TerrainAsset | null);
        get _asset(): TerrainAsset | null;
        get size(): math.Size;
        get tileSize(): number;
        get tileCount(): number[];
        get vertexCount(): number[];
        get blockCount(): number[];
        get lightMapSize(): number;
        get weightMapSize(): number;
        get heights(): Uint16Array;
        get weights(): Uint8Array;
        get valid(): boolean;
        get info(): TerrainInfo;
        build(info: TerrainInfo): boolean | undefined;
        rebuild(info: TerrainInfo): void;
        importHeightField(hf: HeightField, heightScale: number): void;
        exportHeightField(hf: HeightField, heightScale: number): void;
        exportAsset(): TerrainAsset;
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        onRestore(): void;
        update(dtime: number): void;
        addLayer(layer: TerrainLayer): number;
        setLayer(i: number, layer: TerrainLayer): void;
        removeLayer(id: number): void;
        getLayer(id: number): TerrainLayer | null;
        getPosition(i: number, j: number): math.Vec3;
        getHeightField(): Uint16Array;
        setHeight(i: number, j: number, h: number): void;
        getHeight(i: number, j: number): number;
        getHeightClamp(i: number, j: number): number;
        getHeightAt(x: number, y: number): number | null;
        _setNormal(i: number, j: number, n: math.Vec3): void;
        getNormal(i: number, j: number): math.Vec3;
        getNormalAt(x: number, y: number): math.Vec3 | null;
        setWeight(i: number, j: number, w: math.Vec4): void;
        getWeight(i: number, j: number): math.Vec4;
        getWeightAt(x: number, y: number): math.Vec4 | null;
        getBlockInfo(i: number, j: number): TerrainBlockInfo;
        getBlock(i: number, j: number): TerrainBlock;
        getBlocks(): TerrainBlock[];
        getSharedIndexBuffer(): GFXBuffer | null;
        _resetLightmap(enble: boolean): void;
        _updateLightmap(blockId: number, tex: Texture2D | null, uoff: number, voff: number, uscale: number, vscale: number): void;
        _getLightmapInfo(i: number, j: number): TerrainBlockLightmapInfo | null;
        rayCheck(start: math.Vec3, dir: math.Vec3, step: number, worldspace?: boolean): math.Vec3 | null;
        _calcuNormal(x: number, z: number): math.Vec3;
        _buildNormals(): void;
    }
    export const TERRAIN_DATA_VERSION = 16842753;
    export const TERRAIN_DATA_VERSION2 = 16842754;
    export const TERRAIN_DATA_VERSION3 = 16842755;
    export const TERRAIN_DATA_VERSION_DEFAULT = 16843025;
    export class TerrainBuffer {
        Length: number;
        Buffer: Uint8Array;
        Reserve(size: number): void;
        Assign(buff: Uint8Array): void;
        WriteInt8(value: number): void;
        WriteInt16(value: number): void;
        WriteInt32(value: number): void;
        WriteIntArray(value: number[]): void;
        WriteFloat(value: number): void;
        WriteFloatArray(value: number[]): void;
        WriteString(value: string): void;
        ReadInt8(): number;
        ReadInt16(): number;
        ReadInt(): number;
        ReadIntArray(value: number[]): number[];
        ReadFloat(): number;
        ReadFloatArray(value: number[]): number[];
        ReadString(): string;
    }
    export class TerrainLayerInfo {
        slot: number;
        tileSize: number;
        detailMap: string;
    }
    export class TerrainAsset extends Asset {
        protected _data: Uint8Array | null;
        protected _tileSize: number;
        protected _blockCount: number[];
        protected _weightMapSize: number;
        protected _lightMapSize: number;
        protected _heights: Uint16Array;
        protected _weights: Uint8Array;
        protected _layerBuffer: number[];
        protected _layerInfos: TerrainLayerInfo[];
        constructor();
        get _nativeAsset(): ArrayBuffer;
        set _nativeAsset(value: ArrayBuffer);
        set tileSize(value: number);
        get tileSize(): number;
        set blockCount(value: number[]);
        get blockCount(): number[];
        set lightMapSize(value: number);
        get lightMapSize(): number;
        set weightMapSize(value: number);
        get weightMapSize(): number;
        set heights(value: Uint16Array);
        get heights(): Uint16Array;
        set weights(value: Uint8Array);
        get weights(): Uint8Array;
        set layerBuffer(value: number[]);
        get layerBuffer(): number[];
        set layerInfos(value: TerrainLayerInfo[]);
        get layerInfos(): TerrainLayerInfo[];
        getLayer(xblock: number, yblock: number, layerId: number): number;
        _setNativeData(_nativeData: Uint8Array): void;
        _loadNativeData(_nativeData: Uint8Array): boolean;
        _exportNativeData(): Uint8Array;
        _exportDefaultNativeData(): Uint8Array;
    }
    import { math, Texture2D, renderer, Material, RenderableComponent, GFXBuffer, Component, Asset } from "cc.core";
}
declare module "cc.tween" {
    /**
     * @en
     * Tween system.
     * @zh
     * 缓动系统。
     */
    export class TweenSystem extends System {
        /**
         * @en
         * The ID flag of the system.
         * @zh
         * 此系统的 ID 标记。
         */
        static readonly ID = "TWEEN";
        /**
         * @en
         * Gets the instance of the tween system.
         * @zh
         * 获取缓动系统的实例。
         */
        static readonly instance: TweenSystem;
        get ActionManager(): __private.cocos_tween_actions_action_manager_ActionManager;
        /**
         * @en
         * The postUpdate will auto execute after all compnents update and lateUpdate.
         * @zh
         * 此方法会在组件 lateUpdate 之后自动执行。
         * @param dt 间隔时间
         */
        postUpdate(dt: number): void;
    }
    /**
     * @en
     * tween is a utility function that helps instantiate Tween instances.
     * @zh
     * tween 是一个工具函数，帮助实例化 Tween 实例。
     * @param target 缓动的目标
     * @returns Tween 实例
     * @example
     * tween(this.node)
     *   .to(1, {scale: new Vec3(2, 2, 2), position: new Vec3(5, 5, 5)})
     *   .call(() => { console.log('This is a callback'); })
     *   .by(1, {scale: new Vec3(-1, -1, -1)}, {easing: 'sineOutIn'})
     *   .start()
     */
    export function tween(target?: object): Tween;
    /**
     * @en
     * tweenUtil is a utility function that helps instantiate Tween instances.
     * @zh
     * tweenUtil 是一个工具函数，帮助实例化 Tween 实例。
     * @deprecated please use `tween` instead.
     */
    export function tweenUtil(target?: object): Tween;
    /**
     * @en
     * Tween provide a simple and flexible way to action, It's transplanted from cocos creator。
     * @zh
     * Tween 提供了一个简单灵活的方法来缓动目标，从 creator 移植而来。
     * @class Tween
     * @param {Object} [target]
     * @example
     * tween(this.node)
     *   .to(1, {scale: new Vec3(2, 2, 2), position: new Vec3(5, 5, 5)})
     *   .call(() => { console.log('This is a callback'); })
     *   .by(1, {scale: new Vec3(-1, -1, -1), position: new Vec3(-5, -5, -5)}, {easing: 'sineOutIn'})
     *   .start()
     */
    export class Tween {
        constructor(target?: object | null);
        /**
         * @en
         * Insert an action or tween to this sequence.
         * @zh
         * 插入一个 tween 到队列中。
         * @method then
         * @param {Tween} other
         * @return {Tween}
         */
        then(other: Tween): Tween;
        /**
         * @en
         * Sets tween target.
         * @zh
         * 设置 tween 的 target。
         * @method target
         * @param {Object} target
         * @return {Tween}
         */
        target(target: object | null): Tween;
        /**
         * @en
         * Start this tween.
         * @zh
         * 运行当前 tween。
         * @method start
         * @return {Tween}
         */
        start(): Tween;
        /**
         * @en
         * Stop this tween.
         * @zh
         * 停止当前 tween。
         * @method stop
         * @return {Tween}
         */
        stop(): Tween;
        /**
         * @en
         * Clone a tween.
         * @zh
         * 克隆当前 tween。
         * @method clone
         * @param {Object} [target]
         * @return {Tween}
         */
        clone(target: object): Tween;
        /**
         * @en
         * Integrate all previous actions to an action.
         * @zh
         * 将之前所有的 action 整合为一个 action。
         * @method union
         * @return {Tween}
         */
        union(): Tween;
        /**
         * @en
         * Add an action which calculate with absolute value.
         * @zh
         * 添加一个对属性进行绝对值计算的 action。
         * @method to
         * @param {number} duration 缓动时间，单位为秒
         * @param {Object} props 缓动的属性列表
         * @param {Object} [opts] 可选的缓动功能
         * @param {Function} [opts.progress]
         * @param {Function|String} [opts.easing]
         * @return {Tween}
         */
        to(duration: number, props: object, opts?: ITweenOption): Tween;
        /**
         * @en
         * Add an action which calculate with relative value.
         * @zh
         * 添加一个对属性进行相对值计算的 action。
         * @method by
         * @param {number} duration 缓动时间，单位为秒
         * @param {Object} props 缓动的属性列表
         * @param {Object} [opts] 可选的缓动功能
         * @param {Function} [opts.progress]
         * @param {Function|String} [opts.easing]
         * @return {Tween}
         */
        by(duration: number, props: object, opts?: ITweenOption): Tween;
        /**
         * @en
         * Directly set target properties.
         * @zh
         * 直接设置 target 的属性。
         * @method set
         * @param {Object} props
         * @return {Tween}
         */
        set(props: object): Tween;
        /**
         * @en
         * Add an delay action.
         * @zh
         * 添加一个延时 action。
         * @method delay
         * @param {number} duration
         * @return {Tween}
         */
        delay(duration: number): Tween;
        /**
         * @en
         * Add an callback action.
         * @zh
         * 添加一个回调 action。
         * @method call
         * @param {Function} callback
         * @return {Tween}
         */
        call(callback: Function): Tween;
        /**
         * @en
         * Add an sequence action.
         * @zh
         * 添加一个队列 action。
         * @method sequence
         * @param {Tween} action
         * @param {Tween} ...actions
         * @return {Tween}
         */
        sequence(...args: Tween[]): Tween;
        /**
         * @en
         * Add an parallel action.
         * @zh
         * 添加一个并行 action。
         * @method parallel
         * @param {Tween} action
         * @param {Tween} ...actions
         * @return {Tween}
         */
        parallel(...args: Tween[]): Tween;
        /**
         * @en
         * Add an repeat action.
         * This action will integrate before actions to a sequence action as their parameters.
         * @zh
         * 添加一个重复 action，这个 action 会将前一个动作作为他的参数。
         * @method repeat
         * @param {number} repeatTimes 重复次数
         * @param {Tween} embedTween 可选，嵌入 Tween
         * @return {Tween}
         */
        repeat(repeatTimes: number, embedTween?: Tween): Tween;
        /**
         * @en
         * Add an repeat forever action.
         * This action will integrate before actions to a sequence action as their parameters.
         * @zh
         * 添加一个永久重复 action，这个 action 会将前一个动作作为他的参数。
         * @method repeatForever
         * @param {Tween} embedTween 可选，嵌入 Tween
         * @return {Tween}
         */
        repeatForever(embedTween?: Tween): Tween;
        /**
         * @en
         * Add an reverse time action.
         * This action will integrate before actions to a sequence action as their parameters.
         * @zh
         * 添加一个倒置时间 action，这个 action 会将前一个动作作为他的参数。
         * @method reverseTime
         * @param {Tween} embedTween 可选，嵌入 Tween
         * @return {Tween}
         */
        reverseTime(embedTween?: Tween): Tween;
        /**
         * @en
         * Add an hide action, only for node target.
         * @zh
         * 添加一个隐藏 action，只适用于 target 是节点类型的。
         * @method hide
         * @return {Tween}
         */
        hide(): Tween;
        /**
         * @en
         * Add an show action, only for node target.
         * @zh
         * 添加一个显示 action，只适用于 target 是节点类型的。
         * @method show
         * @return {Tween}
         */
        show(): Tween;
        /**
         * @en
         * Add an removeSelf action, only for node target.
         * @zh
         * 添加一个移除自己 action，只适用于 target 是节点类型的。
         * @method removeSelf
         * @return {Tween}
         */
        removeSelf(): Tween;
    }
    /**
     * @category tween
     */
    /**
     * @en
     * Built-in string value definition for the cache function.
     * @zh
     * 内置缓动函数的字符串值定义。
     */
    export type TweenEasing = "linear" | "smooth" | "fade" | "quadIn" | "quadOut" | "quadInOut" | "quadOutIn" | "cubicIn" | "cubicOut" | "cubicInOut" | "cubicOutIn" | "quartIn" | "quartOut" | "quartInOut" | "quartOutIn" | "quintIn" | "quintOut" | "quintInOut" | "quintOutIn" | "sineIn" | "sineOut" | "sineInOut" | "sineOutIn" | "expoIn" | "expoOut" | "expoInOut" | "expoOutIn" | "circIn" | "circOut" | "circInOut" | "circOutIn" | "elasticIn" | "elasticOut" | "elasticInOut" | "elasticOutIn" | "backIn" | "backOut" | "backInOut" | "backOutIn" | "bounceIn" | "bounceOut" | "bounceInOut" | "bounceOutIn";
    /**
     * @en
     * The interface of optional property.
     * @zh
     * 缓动的可选属性的接口定义。
     */
    export interface ITweenOption {
        /**
         * @en
         * Easing function, you can pass in a string or custom function.
         * @zh
         * 缓动函数，可以使用已有的，也可以传入自定义的函数。
         */
        easing?: TweenEasing | ((k: number) => number);
        /**
         * @en
         * Interpolation functin, you can pass in a custom function.
         * @zh
         * 插值函数，参数的意义 start:起始值，end:目标值，current:当前值，ratio:当前进度
         */
        progress?: (start: number, end: number, current: number, ratio: number) => number;
        /**
         * @en
         * A callback that is triggered when a tween action is started.
         * @zh
         * 回调，当缓动动作启动时触发。
         */
        onStart?: (target?: object) => void;
        /**
         * @en
         * A callback that is triggered when a tween action is update.
         * @zh
         * 回调，当缓动动作更新时触发。
         */
        onUpdate?: (target?: object, ratio?: number) => void;
        /**
         * @en
         * A callback that is triggered when a tween action is completed.
         * @zh
         * 回调，当缓动动作完成时触发。
         */
        onComplete?: (target?: object) => void;
    }
    export namespace __private {
        /**
         * !#en Base classAction for action classes.
         * !#zh Action 类是所有动作类型的基类。
         * @class Action
         */
        export class cocos_tween_actions_action_Action {
            /**
             * !#en Default Action tag.
             * !#zh 默认动作标签。
             * @property TAG_INVALID
             * @constant
             * @static
             * @type {Number}
             * @default -1
             */
            static TAG_INVALID: number;
            protected originalTarget: Node | null;
            protected target: Node | null;
            protected tag: number;
            /**
             * !#en
             * to copy object with deep copy.
             * returns a clone of action.
             * !#zh 返回一个克隆的动作。
             * @method clone
             * @return {Action}
             */
            clone(): cocos_tween_actions_action_Action;
            /**
             * !#en
             * return true if the action has finished.
             * !#zh 如果动作已完成就返回 true。
             * @method isDone
             * @return {Boolean}
             */
            isDone(): boolean;
            startWithTarget(target: any): void;
            stop(): void;
            step(dt: number): void;
            update(dt: number): void;
            /**
             * !#en get the target.
             * !#zh 获取当前目标节点。
             * @method getTarget
             * @return {object}
             */
            getTarget(): Node | null;
            /**
             * !#en The action will modify the target properties.
             * !#zh 设置目标节点。
             * @method setTarget
             * @param {object} target
             */
            setTarget(target: Node): void;
            /**
             * !#en get the original target.
             * !#zh 获取原始目标节点。
             * @method getOriginalTarget
             * @return {object}
             */
            getOriginalTarget(): Node | null;
            setOriginalTarget(originalTarget: any): void;
            /**
             * !#en get tag number.
             * !#zh 获取用于识别动作的标签。
             * @method getTag
             * @return {Number}
             */
            getTag(): number;
            /**
             * !#en set tag number.
             * !#zh 设置标签，用于识别动作。
             * @method setTag
             * @param {Number} tag
             */
            setTag(tag: number): void;
            /**
             * !#en
             * Returns a reversed action. <br />
             * For example: <br />
             * - The action will be x coordinates of 0 move to 100. <br />
             * - The reversed action will be x of 100 move to 0.
             * - Will be rewritten
             * !#zh 返回一个新的动作，执行与原动作完全相反的动作。
             * @method reverse
             * @return {Action | null}
             */
            reverse(): cocos_tween_actions_action_Action | null;
            retain(): void;
            release(): void;
        }
        /**
         * !#en
         * cc.ActionManager is a class that can manage actions.<br/>
         * Normally you won't need to use this class directly. 99% of the cases you will use the CCNode interface,
         * which uses this class's singleton object.
         * But there are some cases where you might need to use this class. <br/>
         * Examples:<br/>
         * - When you want to run an action where the target is different from a CCNode.<br/>
         * - When you want to pause / resume the actions<br/>
         * !#zh
         * cc.ActionManager 是可以管理动作的单例类。<br/>
         * 通常你并不需要直接使用这个类，99%的情况您将使用 CCNode 的接口。<br/>
         * 但也有一些情况下，您可能需要使用这个类。 <br/>
         * 例如：
         *  - 当你想要运行一个动作，但目标不是 CCNode 类型时。 <br/>
         *  - 当你想要暂停/恢复动作时。 <br/>
         * @class ActionManager
         * @example {@link cocos2d/core/CCActionManager/ActionManager.js}
         */
        export class cocos_tween_actions_action_manager_ActionManager {
            /**
             * !#en
             * Adds an action with a target.<br/>
             * If the target is already present, then the action will be added to the existing target.
             * If the target is not present, a new instance of this target will be created either paused or not, and the action will be added to the newly created target.
             * When the target is paused, the queued actions won't be 'ticked'.
             * !#zh
             * 增加一个动作，同时还需要提供动作的目标对象，目标对象是否暂停作为参数。<br/>
             * 如果目标已存在，动作将会被直接添加到现有的节点中。<br/>
             * 如果目标不存在，将为这一目标创建一个新的实例，并将动作添加进去。<br/>
             * 当目标状态的 paused 为 true，动作将不会被执行
             *
             * @method addAction
             * @param {Action} action
             * @param {object} target
             * @param {Boolean} paused
             */
            addAction(action: cocos_tween_actions_action_Action, target: Node, paused: boolean): void;
            /**
             * !#en Removes all actions from all the targets.
             * !#zh 移除所有对象的所有动作。
             * @method removeAllActions
             */
            removeAllActions(): void;
            /**
             * !#en
             * Removes all actions from a certain target. <br/>
             * All the actions that belongs to the target will be removed.
             * !#zh
             * 移除指定对象上的所有动作。<br/>
             * 属于该目标的所有的动作将被删除。
             * @method removeAllActionsFromTarget
             * @param {Node} target
             * @param {Boolean} forceDelete
             */
            removeAllActionsFromTarget(target: Node, forceDelete: boolean): void;
            /**
             * !#en Removes an action given an action reference.
             * !#zh 移除指定的动作。
             * @method removeAction
             * @param {Action} action
             */
            removeAction(action: cocos_tween_actions_action_Action): void;
            /**
             * !#en Removes an action given its tag and the target.
             * !#zh 删除指定对象下特定标签的一个动作，将删除首个匹配到的动作。
             * @method removeActionByTag
             * @param {Number} tag
             * @param {Node} target
             */
            removeActionByTag(tag: number, target: Node): void;
            /**
             * !#en Gets an action given its tag an a target.
             * !#zh 通过目标对象和标签获取一个动作。
             * @method getActionByTag
             * @param {Number} tag
             * @param {Node} target
             * @return {Action|null}  return the Action with the given tag on success
             */
            getActionByTag(tag: number, target: Node): cocos_tween_actions_action_Action | null;
            /**
             * !#en
             * Returns the numbers of actions that are running in a certain target. <br/>
             * Composable actions are counted as 1 action. <br/>
             * Example: <br/>
             * - If you are running 1 Sequence of 7 actions, it will return 1. <br/>
             * - If you are running 7 Sequences of 2 actions, it will return 7.
             * !#zh
             * 返回指定对象下所有正在运行的动作数量。 <br/>
             * 组合动作被算作一个动作。<br/>
             * 例如：<br/>
             *  - 如果您正在运行 7 个动作组成的序列动作（Sequence），这个函数将返回 1。<br/>
             *  - 如果你正在运行 2 个序列动作（Sequence）和 5 个普通动作，这个函数将返回 7。<br/>
             *
             * @method getNumberOfRunningActionsInTarget
             * @param {Node} target
             * @return {Number}
             */
            getNumberOfRunningActionsInTarget(target: Node): number;
            /**
             * !#en Pauses the target: all running actions and newly added actions will be paused.
             * !#zh 暂停指定对象：所有正在运行的动作和新添加的动作都将会暂停。
             * @method pauseTarget
             * @param {Node} target
             */
            pauseTarget(target: Node): void;
            /**
             * !#en Resumes the target. All queued actions will be resumed.
             * !#zh 让指定目标恢复运行。在执行序列中所有被暂停的动作将重新恢复运行。
             * @method resumeTarget
             * @param {Node} target
             */
            resumeTarget(target: Node): void;
            /**
             * !#en Pauses all running actions, returning a list of targets whose actions were paused.
             * !#zh 暂停所有正在运行的动作，返回一个包含了那些动作被暂停了的目标对象的列表。
             * @method pauseAllRunningActions
             * @return {Array}  a list of targets whose actions were paused.
             */
            pauseAllRunningActions(): Array<any>;
            /**
             * !#en Resume a set of targets (convenience function to reverse a pauseAllRunningActions or pauseTargets call).
             * !#zh 让一组指定对象恢复运行（用来逆转 pauseAllRunningActions 效果的便捷函数）。
             * @method resumeTargets
             * @param {Array} targetsToResume
             */
            resumeTargets(targetsToResume: Array<any>): void;
            /**
             * !#en Pause a set of targets.
             * !#zh 暂停一组指定对象。
             * @method pauseTargets
             * @param {Array} targetsToPause
             */
            pauseTargets(targetsToPause: Array<any>): void;
            /**
             * !#en
             * purges the shared action manager. It releases the retained instance. <br/>
             * because it uses this, so it can not be static.
             * !#zh
             * 清除共用的动作管理器。它释放了持有的实例。 <br/>
             * 因为它使用 this，因此它不能是静态的。
             * @method purgeSharedManager
             */
            purgeSharedManager(): void;
            /**
             * !#en The ActionManager update。
             * !#zh ActionManager 主循环。
             * @method update
             * @param {Number} dt delta time in seconds
             */
            update(dt: number): void;
        }
    }
    import { Node, System } from "cc.core";
}
declare module "cc.ui" {
    export class MeshBuffer {
        static OPACITY_OFFSET: number;
        batcher: renderer.__private.cocos_core_renderer_ui_ui_UI;
        vData: Float32Array | null;
        iData: Uint16Array | null;
        vb: GFXBuffer | null;
        ib: GFXBuffer | null;
        ia: GFXInputAssembler | null;
        byteStart: number;
        byteOffset: number;
        indiceStart: number;
        indiceOffset: number;
        vertexStart: number;
        vertexOffset: number;
        lastByteOffset: number;
        dirty: boolean;
        constructor(batcher: renderer.__private.cocos_core_renderer_ui_ui_UI);
        initialize(attrs: IGFXAttribute[], outofCallback: ((...args: number[]) => void) | null): void;
        request(vertexCount?: number, indiceCount?: number): boolean;
        reset(): void;
        destroy(): void;
        uploadData(): void;
    }
    export namespace UIVertexFormat {
        export const vfmt: {
            name: GFXAttributeName;
            format: GFXFormat;
        }[];
    }
    export class StencilManager {
        static sharedManager: StencilManager | null;
        stage: __private.cocos_core_renderer_ui_stencil_manager_Stage;
        pushMask(mask: any): void;
        clear(): void;
        enterLevel(): void;
        enableMask(): void;
        exitMask(): void;
        handleMaterial(mat: Material): boolean;
        getWriteMask(): number;
        getExitWriteMask(): number;
        getStencilRef(): number;
        reset(): void;
    }
    export class CanvasPool {
        pool: __private.cocos_ui_assembler_label_font_utils_ISharedLabelData[];
        get(): __private.cocos_ui_assembler_label_font_utils_ISharedLabelData;
        put(canvas: __private.cocos_ui_assembler_label_font_utils_ISharedLabelData): void;
    }
    /**
     * barFilled 组装器
     * 可通过 cc.UI.barFilled 获取该组装器。
     */
    export const barFilled: ___private.cocos_core_renderer_ui_base_IAssembler;
    /**
     * radialFilled 组装器
     * 可通过 cc.UI.radialFilled 获取该组装器。
     */
    export const radialFilled: ___private.cocos_core_renderer_ui_base_IAssembler;
    /**
     * simple 组装器
     * 可通过 cc.UI.simple 获取该组装器。
     */
    export const simple: ___private.cocos_core_renderer_ui_base_IAssembler;
    /**
     * sliced 组装器
     * 可通过 cc.UI.sliced 获取该组装器。
     */
    export const sliced: ___private.cocos_core_renderer_ui_base_IAssembler;
    /**
     * ttf 组装器
     * 可通过 cc.UI.ttf 获取该组装器。
     */
    export const ttf: ___private.cocos_core_renderer_ui_base_IAssembler;
    /**
     * bmfont 组装器
     * 可通过 cc.UI.bmfont 获取该组装器。
     */
    export const bmfont: ___private.cocos_core_renderer_ui_base_IAssembler;
    /**
     * letter 组装器
     * 可通过 cc.UI.letter 获取该组装器。
     */
    export const letter: {
        createData(comp: LabelComponent): ___private.cocos_core_renderer_ui_render_data_RenderData;
        fillBuffers(comp: LabelComponent, renderer: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        appendQuad: any;
    };
    export const mask: ___private.cocos_core_renderer_ui_base_IAssembler;
    export const maskEnd: ___private.cocos_core_renderer_ui_base_IAssembler;
    export const spriteAssembler: ___private.cocos_core_renderer_ui_base_IAssemblerManager;
    /**
     * graphics 组装器
     * 可通过 cc.UI.graphicsAssembler 获取该组装器。
     */
    export const graphics: ___private.cocos_core_renderer_ui_base_IAssembler;
    export const labelAssembler: ___private.cocos_core_renderer_ui_base_IAssemblerManager;
    export const graphicsAssembler: ___private.cocos_core_renderer_ui_base_IAssemblerManager;
    /**
     * @en
     * Button has 4 Transition types<br/>
     * When Button state changed:<br/>
     *  If Transition type is Button.Transition.NONE, Button will do nothing<br/>
     *  If Transition type is Button.Transition.COLOR, Button will change target's color<br/>
     *  If Transition type is Button.Transition.SPRITE, Button will change target Sprite's sprite<br/>
     *  If Transition type is Button.Transition.SCALE, Button will change target node's scale<br/>
     *
     * Button will trigger 5 events:<br/>
     *  Button.EVENT_TOUCH_DOWN<br/>
     *  Button.EVENT_TOUCH_UP<br/>
     *  Button.EVENT_HOVER_IN<br/>
     *  Button.EVENT_HOVER_MOVE<br/>
     *  Button.EVENT_HOVER_OUT<br/>
     *  User can get the current clicked node with 'event.target' from event object which is passed as parameter in the callback function of click event.
     *
     * @zh
     * 按钮组件。可以被按下,或者点击。<br/>
     *
     * 按钮可以通过修改 Transition 来设置按钮状态过渡的方式：<br/>
     *   -Button.Transition.NONE   // 不做任何过渡<br/>
     *   -Button.Transition.COLOR  // 进行颜色之间过渡<br/>
     *   -Button.Transition.SPRITE // 进行精灵之间过渡<br/>
     *   -Button.Transition.SCALE // 进行缩放过渡<br/>
     *
     * 按钮可以绑定事件（但是必须要在按钮的 Node 上才能绑定事件）：<br/>
     *   // 以下事件可以在全平台上都触发<br/>
     *   -cc.Node.EventType.TOUCH_START  // 按下时事件<br/>
     *   -cc.Node.EventType.TOUCH_Move   // 按住移动后事件<br/>
     *   -cc.Node.EventType.TOUCH_END    // 按下后松开后事件<br/>
     *   -cc.Node.EventType.TOUCH_CANCEL // 按下取消事件<br/>
     *   // 以下事件只在 PC 平台上触发<br/>
     *   -cc.Node.EventType.MOUSE_DOWN  // 鼠标按下时事件<br/>
     *   -cc.Node.EventType.MOUSE_MOVE  // 鼠标按住移动后事件<br/>
     *   -cc.Node.EventType.MOUSE_ENTER // 鼠标进入目标事件<br/>
     *   -cc.Node.EventType.MOUSE_LEAVE // 鼠标离开目标事件<br/>
     *   -cc.Node.EventType.MOUSE_UP    // 鼠标松开事件<br/>
     *   -cc.Node.EventType.MOUSE_WHEEL // 鼠标滚轮事件<br/>
     *
     * @example
     * ```typescript
     * // Add an event to the button.
     * button.node.on(cc.Node.EventType.TOUCH_START, (event) => {
     *     cc.log("This is a callback after the trigger event");
     * });
     * // You could also add a click event
     * //Note: In this way, you can't get the touch event info, so use it wisely.
     * button.node.on('click', (button) => {
     *    //The event is a custom event, you could get the Button component via first argument
     * })
     * ```
     */
    export class ButtonComponent extends Component {
        get interactable(): boolean;
        set interactable(value: boolean);
        set _resizeToTarget(value: boolean);
        get transition(): __private.cocos_ui_components_button_component_Transition;
        set transition(value: __private.cocos_ui_components_button_component_Transition);
        get normalColor(): Readonly<math.Color>;
        set normalColor(value: Readonly<math.Color>);
        get pressedColor(): Readonly<math.Color>;
        set pressedColor(value: Readonly<math.Color>);
        get hoverColor(): Readonly<math.Color>;
        set hoverColor(value: Readonly<math.Color>);
        get disabledColor(): Readonly<math.Color>;
        set disabledColor(value: Readonly<math.Color>);
        get duration(): number;
        set duration(value: number);
        get zoomScale(): number;
        set zoomScale(value: number);
        get normalSprite(): SpriteFrame | null;
        set normalSprite(value: SpriteFrame | null);
        get pressedSprite(): SpriteFrame | null;
        set pressedSprite(value: SpriteFrame | null);
        get hoverSprite(): SpriteFrame | null;
        set hoverSprite(value: SpriteFrame | null);
        get disabledSprite(): SpriteFrame | null;
        set disabledSprite(value: SpriteFrame | null);
        get target(): Node | null;
        set target(value: Node | null);
        static Transition: typeof __private.cocos_ui_components_button_component_Transition;
        static EventType: typeof __private.cocos_ui_components_button_component_EventType;
        /**
         * @en
         * If Button is clicked, it will trigger event's handler.
         *
         * @zh
         * 按钮的点击事件列表。
         */
        clickEvents: EventHandler[];
        protected _interactable: boolean;
        protected _transition: __private.cocos_ui_components_button_component_Transition;
        protected _normalColor: math.Color;
        protected _hoverColor: math.Color;
        protected _pressColor: math.Color;
        protected _disabledColor: math.Color;
        protected _normalSprite: SpriteFrame | null;
        protected _hoverSprite: SpriteFrame | null;
        protected _pressedSprite: SpriteFrame | null;
        protected _disabledSprite: SpriteFrame | null;
        protected _duration: number;
        protected _zoomScale: number;
        protected _target: Node | null;
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        update(dt: number): void;
        protected _resizeNodeToTargetNode(): void;
        protected _resetState(): void;
        protected _registerEvent(): void;
        protected _getTargetSprite(target: Node | null): SpriteComponent | null;
        protected _applyTarget(): void;
        protected _onTouchBegan(event?: EventTouch): void;
        protected _onTouchMove(event?: EventTouch): false | undefined;
        protected _onTouchEnded(event?: EventTouch): void;
        protected _onTouchCancel(event?: EventTouch): void;
        protected _onMouseMoveIn(event?: EventMouse): void;
        protected _onMouseMoveOut(event?: EventMouse): void;
        protected _updateState(): void;
        protected _getButtonState(): string;
        protected _updateColorTransition(state: string): void;
        protected _updateSpriteTransition(state: string): void;
        protected _updateScaleTransition(state: string): void;
        protected _zoomUp(): void;
        protected _zoomBack(): void;
        protected _applyTransition(state: string): void;
    }
    /**
     * @en
     * cc.EditBoxComponent is a component for inputing text, you can use it to gather small amounts of text from users.
     *
     * @zh
     * EditBoxComponent 组件，用于获取用户的输入文本。
     */
    export class EditBoxComponent extends Component {
        get string(): string;
        set string(value: string);
        get textLabel(): LabelComponent | null;
        set textLabel(oldValue: LabelComponent | null);
        get placeholderLabel(): LabelComponent | null;
        set placeholderLabel(oldValue: LabelComponent | null);
        get backgroundImage(): SpriteFrame | null;
        set backgroundImage(value: SpriteFrame | null);
        get returnType(): __private.cocos_ui_components_editbox_types_KeyboardReturnType;
        set returnType(value: __private.cocos_ui_components_editbox_types_KeyboardReturnType);
        get inputFlag(): __private.cocos_ui_components_editbox_types_InputFlag;
        set inputFlag(value: __private.cocos_ui_components_editbox_types_InputFlag);
        get inputMode(): __private.cocos_ui_components_editbox_types_InputMode;
        set inputMode(oldValue: __private.cocos_ui_components_editbox_types_InputMode);
        get fontSize(): number;
        set fontSize(value: number);
        get lineHeight(): number;
        set lineHeight(value: number);
        get fontColor(): math.Color;
        set fontColor(value: math.Color);
        get placeholder(): string;
        set placeholder(value: string);
        get placeholderFontSize(): number;
        set placeholderFontSize(value: number);
        get placeholderFontColor(): math.Color;
        set placeholderFontColor(value: math.Color);
        get maxLength(): number;
        set maxLength(value: number);
        get stayOnTop(): void;
        set stayOnTop(value: void);
        get tabIndex(): number;
        set tabIndex(value: number);
        static _EditBoxImpl: typeof __private.cocos_ui_components_editbox_edit_box_impl_base_EditBoxImplBase;
        static KeyboardReturnType: typeof __private.cocos_ui_components_editbox_types_KeyboardReturnType;
        static InputFlag: typeof __private.cocos_ui_components_editbox_types_InputFlag;
        static InputMode: typeof __private.cocos_ui_components_editbox_types_InputMode;
        static EventType: typeof __private.cocos_ui_components_editbox_edit_box_component_EventType;
        /**
         * @en
         * The event handler to be called when EditBox began to edit text.
         *
         * @zh
         * 开始编辑文本输入框触发的事件回调。
         */
        editingDidBegan: EventHandler[];
        /**
         * @en
         * The event handler to be called when EditBox text changes.
         *
         * @zh
         * 编辑文本输入框时触发的事件回调。
         */
        textChanged: EventHandler[];
        /**
         * @en
         * The event handler to be called when EditBox edit ends.
         *
         * @zh
         * 结束编辑文本输入框时触发的事件回调。
         */
        editingDidEnded: EventHandler[];
        /**
         * @en
         * The event handler to be called when return key is pressed. Windows is not supported.
         *
         * @zh
         * 当用户按下回车按键时的事件回调，目前不支持 windows 平台
         */
        editingReturn: EventHandler[];
        _impl: __private.cocos_ui_components_editbox_edit_box_impl_base_EditBoxImplBase | null;
        _background: SpriteComponent | null;
        protected _textLabel: LabelComponent | null;
        protected _placeholderLabel: LabelComponent | null;
        protected _returnType: __private.cocos_ui_components_editbox_types_KeyboardReturnType;
        protected _useOriginalSize: boolean;
        protected _string: string;
        protected _tabIndex: number;
        protected _backgroundImage: SpriteFrame | null;
        protected _inputFlag: __private.cocos_ui_components_editbox_types_InputFlag;
        protected _inputMode: __private.cocos_ui_components_editbox_types_InputMode;
        protected _maxLength: number;
        __preload(): void;
        onEnable(): void;
        update(): void;
        onDisable(): void;
        onDestroy(): void;
        /**
         * @en Let the EditBox get focus
         * @zh 让当前 EditBox 获得焦点。
         */
        setFocus(): void;
        /**
         * @en Let the EditBox get focus
         * @zh 让当前 EditBox 获得焦点
         */
        focus(): void;
        /**
         * @en Let the EditBox lose focus
         * @zh 让当前 EditBox 失去焦点
         */
        blur(): void;
        /**
         * @en Determine whether EditBox is getting focus or not.
         * @zh 判断 EditBox 是否获得了焦点。
         * Note: only available on Web at the moment.
         */
        isFocused(): boolean;
        _editBoxEditingDidBegan(): void;
        _editBoxEditingDidEnded(): void;
        _editBoxTextChanged(text: string): void;
        _editBoxEditingReturn(): void;
        _showLabels(): void;
        _hideLabels(): void;
        protected _onTouchBegan(event: EventTouch): void;
        protected _onTouchCancel(event: EventTouch): void;
        protected _onTouchEnded(event: EventTouch): void;
        protected _init(): void;
        protected _createBackgroundSprite(): void;
        protected _updateTextLabel(): void;
        protected _updatePlaceholderLabel(): void;
        protected _syncSize(): void;
        protected _updateLabels(): void;
        protected _updateString(text: string): void;
        protected _updateLabelStringStyle(text: string, ignorePassword?: boolean): string;
        protected _registerEvent(): void;
        protected _unregisterEvent(): void;
        protected _updateLabelPosition(size: math.Size): void;
        protected _resizeChildNodes(): void;
    }
    /**
     * @en
     * The Layout is a container component, use it to arrange child elements easily.<br>
     * Note：<br>
     * 1.Scaling and rotation of child nodes are not considered.<br>
     * 2.After setting the Layout, the results need to be updated until the next frame,unless you manually call.[[updateLayout]]
     *
     * @zh
     * Layout 组件相当于一个容器，能自动对它的所有子节点进行统一排版。<br>
     * 注意：<br>
     * 1.不会考虑子节点的缩放和旋转。<br>
     * 2.对 Layout 设置后结果需要到下一帧才会更新，除非你设置完以后手动调用。[[updateLayout]]
     */
    export class LayoutComponent extends Component {
        get type(): __private.cocos_ui_components_layout_component_Type;
        set type(value: __private.cocos_ui_components_layout_component_Type);
        get resizeMode(): __private.cocos_ui_components_layout_component_ResizeMode;
        set resizeMode(value: __private.cocos_ui_components_layout_component_ResizeMode);
        get cellSize(): Readonly<math.Size>;
        set cellSize(value: Readonly<math.Size>);
        get startAxis(): __private.cocos_ui_components_layout_component_AxisDirection;
        set startAxis(value: __private.cocos_ui_components_layout_component_AxisDirection);
        get paddingLeft(): number;
        set paddingLeft(value: number);
        get paddingRight(): number;
        set paddingRight(value: number);
        get paddingTop(): number;
        set paddingTop(value: number);
        get paddingBottom(): number;
        set paddingBottom(value: number);
        get spacingX(): number;
        set spacingX(value: number);
        get spacingY(): number;
        set spacingY(value: number);
        get verticalDirection(): __private.cocos_ui_components_layout_component_VerticalDirection;
        set verticalDirection(value: __private.cocos_ui_components_layout_component_VerticalDirection);
        get horizontalDirection(): __private.cocos_ui_components_layout_component_HorizontalDirection;
        set horizontalDirection(value: __private.cocos_ui_components_layout_component_HorizontalDirection);
        get padding(): number;
        set padding(value: number);
        get affectedByScale(): boolean;
        set affectedByScale(value: boolean);
        static Type: typeof __private.cocos_ui_components_layout_component_Type;
        static VerticalDirection: typeof __private.cocos_ui_components_layout_component_VerticalDirection;
        static HorizontalDirection: typeof __private.cocos_ui_components_layout_component_HorizontalDirection;
        static ResizeMode: typeof __private.cocos_ui_components_layout_component_ResizeMode;
        static AxisDirection: typeof __private.cocos_ui_components_layout_component_AxisDirection;
        protected _resizeMode: __private.cocos_ui_components_layout_component_ResizeMode;
        protected _N$layoutType: __private.cocos_ui_components_layout_component_Type;
        protected _N$padding: number;
        protected _cellSize: math.Size;
        protected _startAxis: __private.cocos_ui_components_layout_component_AxisDirection;
        protected _paddingLeft: number;
        protected _paddingRight: number;
        protected _paddingTop: number;
        protected _paddingBottom: number;
        protected _spacingX: number;
        protected _spacingY: number;
        protected _verticalDirection: __private.cocos_ui_components_layout_component_VerticalDirection;
        protected _horizontalDirection: __private.cocos_ui_components_layout_component_HorizontalDirection;
        protected _affectedByScale: boolean;
        protected _layoutSize: math.Size;
        protected _layoutDirty: boolean;
        protected _isAlign: boolean;
        /**
         * @en
         * Perform the layout update.
         *
         * @zh
         * 立即执行更新布局。
         *
         * @example
         * ```typescript
         * layout.type = cc.LayoutComponent.HORIZONTAL;
         * layout.node.addChild(childNode);
         * cc.log(childNode.x); // not yet changed
         * layout.updateLayout();
         * cc.log(childNode.x); // changed
         * ```
         */
        updateLayout(): void;
        protected onEnable(): void;
        protected onDisable(): void;
        protected _migratePaddingData(): void;
        protected _addEventListeners(): void;
        protected _removeEventListeners(): void;
        protected _addChildrenEventListeners(): void;
        protected _removeChildrenEventListeners(): void;
        protected _childAdded(child: Node): void;
        protected _childRemoved(child: Node): void;
        protected _resized(): void;
        protected _doLayoutHorizontally(baseWidth: number, rowBreak: boolean, fnPositionY: Function, applyChildren: boolean): number;
        protected _doLayoutVertically(baseHeight: number, columnBreak: boolean, fnPositionX: Function, applyChildren: boolean): number;
        protected _doLayoutBasic(): void;
        protected _doLayoutGridAxisHorizontal(layoutAnchor: any, layoutSize: any): void;
        protected _doLayoutGridAxisVertical(layoutAnchor: math.Vec2, layoutSize: math.Size): void;
        protected _doLayoutGrid(): void;
        protected _getHorizontalBaseWidth(children: Readonly<Node[]>): number;
        protected _getVerticalBaseHeight(children: Readonly<Node[]>): number;
        protected _doLayout(): void;
        protected _getUsedScaleValue(value: any): number;
        protected _transformDirty(type: ___private.cocos_core_scene_graph_node_enum_TransformBit): void;
        protected _doLayoutDirty(): void;
        protected _doScaleDirty(type: ___private.cocos_core_scene_graph_node_enum_TransformBit): void;
    }
    /**
     * @en
     * The Mask Component.
     *
     * @zh
     * 遮罩组件。
     */
    export class MaskComponent extends UIRenderComponent {
        get type(): __private.cocos_ui_components_mask_component_MaskType;
        set type(value: __private.cocos_ui_components_mask_component_MaskType);
        get inverted(): boolean;
        set inverted(value: boolean);
        get segments(): number;
        set segments(value: number);
        get graphics(): GraphicsComponent | null;
        get clearGraphics(): GraphicsComponent | null;
        get dstBlendFactor(): import("cocos/core").GFXBlendFactor;
        set dstBlendFactor(value: import("cocos/core").GFXBlendFactor);
        get srcBlendFactor(): import("cocos/core").GFXBlendFactor;
        set srcBlendFactor(value: import("cocos/core").GFXBlendFactor);
        get color(): Readonly<math.Color>;
        set color(value: Readonly<math.Color>);
        static Type: typeof __private.cocos_ui_components_mask_component_MaskType;
        protected _type: __private.cocos_ui_components_mask_component_MaskType;
        protected _inverted: boolean;
        protected _segments: number;
        protected _graphics: GraphicsComponent | null;
        protected _clearGraphics: GraphicsComponent | null;
        constructor();
        onLoad(): void;
        /**
         * @zh
         * 图形内容重塑。
         */
        onRestore(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        /**
         * @zh
         * 根据屏幕坐标计算点击事件。
         *
         * @param cameraPt  屏幕点转换到相机坐标系下的点。
         */
        isHit(cameraPt: math.Vec2): boolean;
        protected _render(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        protected _postRender(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        protected _nodeStateChange(type: ___private.cocos_core_scene_graph_node_enum_TransformBit): void;
        protected _resolutionChanged(): void;
        protected _canRender(): boolean;
        protected _flushAssembler(): void;
        protected _createGraphics(): void;
        protected _updateClearGraphics(): void;
        protected _updateGraphics(): void;
        protected _enableGraphics(): void;
        protected _disableGraphics(): void;
        protected _removeGraphics(): void;
    }
    /**
     * @en
     * Visual indicator of progress in some operation.
     * Displays a bar to the user representing how far the operation has progressed.
     *
     * @zh
     * 进度条组件，可用于显示加载资源时的进度。
     *
     * @example
     * ```typescript
     * // update progressBar
     * update(dt) {
     *     var progress = progressBar.progress;
     *     if (progress > 0) {
     *         progress += dt;
     *     }
     *     else {
     *         progress = 1;
     *     }
     *     progressBar.progress = progress;
     * }
     * ```
     */
    export class ProgressBarComponent extends Component {
        get barSprite(): SpriteComponent | null;
        set barSprite(value: SpriteComponent | null);
        get mode(): __private.cocos_ui_components_progress_bar_component_Mode;
        set mode(value: __private.cocos_ui_components_progress_bar_component_Mode);
        get totalLength(): number;
        set totalLength(value: number);
        get progress(): number;
        set progress(value: number);
        get reverse(): boolean;
        set reverse(value: boolean);
        static Mode: typeof __private.cocos_ui_components_progress_bar_component_Mode;
        protected _barSprite: SpriteComponent | null;
        protected _mode: __private.cocos_ui_components_progress_bar_component_Mode;
        protected _totalLength: number;
        protected _progress: number;
        protected _reverse: boolean;
        protected _initBarSprite(): void;
        protected _updateBarStatus(): void;
    }
    /**
     * @en
     * The RichText Component.
     *
     * @zh
     * 富文本组件。
     */
    export class RichTextComponent extends UIComponent {
        get string(): string;
        set string(value: string);
        get horizontalAlign(): HorizontalTextAlignment;
        set horizontalAlign(value: HorizontalTextAlignment);
        get fontSize(): number;
        set fontSize(value: number);
        get font(): TTFFont | null;
        set font(value: TTFFont | null);
        get maxWidth(): number;
        set maxWidth(value: number);
        get lineHeight(): number;
        set lineHeight(value: number);
        get imageAtlas(): SpriteAtlas | null;
        set imageAtlas(value: SpriteAtlas | null);
        get handleTouchEvent(): boolean;
        set handleTouchEvent(value: boolean);
        static HorizontalAlign: typeof HorizontalTextAlignment;
        static VerticalAlign: typeof VerticalTextAlignment;
        protected _lineHeight: number;
        protected _string: string;
        protected _horizontalAlign: HorizontalTextAlignment;
        protected _fontSize: number;
        protected _maxWidth: number;
        protected _font: TTFFont | null;
        protected _imageAtlas: SpriteAtlas | null;
        protected _handleTouchEvent: boolean;
        protected _textArray: IHtmlTextParserResultObj[];
        protected _labelSegments: __private.cocos_ui_components_rich_text_component_ILabelSegment[];
        protected _labelSegmentsCache: __private.cocos_ui_components_rich_text_component_ILabelSegment[];
        protected _linesWidth: number[];
        protected _lineCount: number;
        protected _labelWidth: number;
        protected _labelHeight: number;
        protected _layoutDirty: boolean;
        protected _lineOffsetX: number;
        protected _updateRichTextStatus: () => void;
        constructor();
        onEnable(): void;
        onDisable(): void;
        start(): void;
        onRestore(): void;
        onDestroy(): void;
        protected _addEventListeners(): void;
        protected _removeEventListeners(): void;
        protected _updateLabelSegmentTextAttributes(): void;
        protected _createFontLabel(str: string): any;
        protected _onTTFLoaded(): void;
        protected _measureText(styleIndex: number, string?: string): number | ((s: string) => number);
        protected _onTouchEnded(event: EventTouch): void;
        protected _containsTouchLocation(label: __private.cocos_ui_components_rich_text_component_ILabelSegment, point: math.Vec2): boolean;
        protected _resetState(): void;
        protected _activateChildren(active: any): void;
        protected _addLabelSegment(stringToken: string, styleIndex: number): __private.cocos_ui_components_rich_text_component_ILabelSegment;
        protected _updateRichTextWithMaxWidth(labelString: string, labelWidth: number, styleIndex: number): void;
        protected _isLastComponentCR(stringToken: any): boolean;
        protected _updateLineInfo(): void;
        protected _needsUpdateTextLayout(newTextArray: IHtmlTextParserResultObj[]): boolean;
        protected _addRichTextImageElement(richTextElement: IHtmlTextParserResultObj): void;
        protected _updateRichText(): void;
        protected _getFirstWordLen(text: string, startIndex: number, textLen: number): number;
        protected _updateRichTextPosition(): void;
        protected _convertLiteralColorValue(color: string): any;
        protected _applyTextAttribute(labelSeg: __private.cocos_ui_components_rich_text_component_ILabelSegment): void;
    }
    /**
     * @en
     * The ScrollBar control allows the user to scroll an image or other view that is too large to see completely.
     *
     * @zh
     * 滚动条组件。
     */
    export class ScrollBarComponent extends Component {
        get handle(): SpriteComponent | null;
        set handle(value: SpriteComponent | null);
        get direction(): __private.cocos_ui_components_scroll_bar_component_Direction;
        set direction(value: __private.cocos_ui_components_scroll_bar_component_Direction);
        get enableAutoHide(): boolean;
        set enableAutoHide(value: boolean);
        get autoHideTime(): number;
        set autoHideTime(value: number);
        static Direction: typeof __private.cocos_ui_components_scroll_bar_component_Direction;
        protected _scrollView: ScrollViewComponent | null;
        protected _handle: SpriteComponent | null;
        protected _direction: __private.cocos_ui_components_scroll_bar_component_Direction;
        protected _enableAutoHide: boolean;
        protected _autoHideTime: number;
        protected _touching: boolean;
        protected _opacity: number;
        protected _autoHideRemainingTime: number;
        /**
         * @en
         * Hide ScrollBar.
         *
         * @zh
         * 滚动条隐藏。
         */
        hide(): void;
        /**
         * @en
         * Show ScrollBar.
         *
         * @zh
         * 滚动条显示。
         */
        show(): void;
        /**
         * @en
         * Reset the position of ScrollBar.
         *
         * @zh
         * 重置滚动条位置。
         *
         * @param outOfBoundary - 滚动位移。
         */
        onScroll(outOfBoundary: math.Vec3): void;
        /**
         * @zh
         * 滚动视窗设置。
         *
         * @param scrollView - 滚动视窗。
         */
        setScrollView(scrollView: ScrollViewComponent): void;
        onTouchBegan(): void;
        onTouchEnded(): void;
        protected onEnable(): void;
        protected start(): void;
        protected update(dt: any): void;
        protected _convertToScrollViewSpace(content: Node): math.Vec3;
        protected _setOpacity(opacity: number): void;
        protected _updateHandlerPosition(position: math.Vec3): void;
        protected _fixupHandlerPosition(): math.Vec3;
        protected _conditionalDisableScrollBar(contentSize: math.Size, scrollViewSize: math.Size): boolean;
        protected _calculateLength(contentMeasure: number, scrollViewMeasure: number, handleNodeMeasure: number, outOfBoundary: number): number;
        protected _calculatePosition(contentMeasure: number, scrollViewMeasure: number, handleNodeMeasure: number, contentPosition: number, outOfBoundary: number, actualLenth: number): math.Vec3;
        protected _updateLength(length: number): void;
        protected _processAutoHide(deltaTime: number): void;
    }
    /**
     * @en
     * Layout container for a view hierarchy that can be scrolled by the user,
     * allowing it to be larger than the physical display.
     *
     * @zh
     * 滚动视图组件。
     */
    export class ScrollViewComponent extends ViewGroupComponent {
        get content(): Node | null;
        set content(value: Node | null);
        get horizontalScrollBar(): ScrollBarComponent | null;
        set horizontalScrollBar(value: ScrollBarComponent | null);
        get verticalScrollBar(): ScrollBarComponent | null;
        set verticalScrollBar(value: ScrollBarComponent | null);
        get view(): Node | null;
        static EventType: typeof __private.cocos_ui_components_scroll_view_component_EventType;
        /**
         * @en
         * Enable horizontal scroll.
         *
         * @zh
         * 是否开启水平滚动。
         */
        horizontal: boolean;
        /**
         * @en
         * Enable vertical scroll.
         *
         * @zh
         * 是否开启垂直滚动。
         */
        vertical: boolean;
        /**
         * @en
         * When inertia is set, the content will continue to move when touch ended.
         *
         * @zh
         * 是否开启滚动惯性。
         */
        inertia: boolean;
        /**
         * @en
         * It determines how quickly the content stop moving. A value of 1 will stop the movement immediately.
         * A value of 0 will never stop the movement until it reaches to the boundary of scrollview.
         *
         * @zh
         * 开启惯性后，在用户停止触摸后滚动多快停止，0表示永不停止，1表示立刻停止。
         */
        brake: number;
        /**
         * @en
         * When elastic is set, the content will be bounce back when move out of boundary.
         *
         * @zh
         * 是否允许滚动内容超过边界，并在停止触摸后回弹。
         */
        elastic: boolean;
        /**
         * @en
         * The elapse time of bouncing back. A value of 0 will bounce back immediately.
         *
         * @zh
         * 回弹持续的时间，0 表示将立即反弹。
         */
        bounceDuration: number;
        /**
         * @en
         * Scrollview events callback.
         *
         * @zh
         * 滚动视图的事件回调函数。
         */
        scrollEvents: EventHandler[];
        /**
         * @en
         * If cancelInnerEvents is set to true, the scroll behavior will cancel touch events on inner content nodes
         * It's set to true by default.
         *
         * @zh
         * 如果这个属性被设置为 true，那么滚动行为会取消子节点上注册的触摸事件，默认被设置为 true。<br/>
         * 注意，子节点上的 touchstart 事件仍然会触发，触点移动距离非常短的情况下 touchmove 和 touchend 也不会受影响。
         */
        cancelInnerEvents: boolean;
        protected _autoScrolling: boolean;
        protected _scrolling: boolean;
        protected _content: Node | null;
        protected _horizontalScrollBar: ScrollBarComponent | null;
        protected _verticalScrollBar: ScrollBarComponent | null;
        protected _topBoundary: number;
        protected _bottomBoundary: number;
        protected _leftBoundary: number;
        protected _rightBoundary: number;
        protected _touchMoveDisplacements: math.Vec3[];
        protected _touchMoveTimeDeltas: number[];
        protected _touchMovePreviousTimestamp: number;
        protected _touchMoved: boolean;
        protected _autoScrollAttenuate: boolean;
        protected _autoScrollStartPosition: math.Vec3;
        protected _autoScrollTargetDelta: math.Vec3;
        protected _autoScrollTotalTime: number;
        protected _autoScrollAccumulatedTime: number;
        protected _autoScrollCurrentlyOutOfBoundary: boolean;
        protected _autoScrollBraking: boolean;
        protected _autoScrollBrakingStartPosition: math.Vec3;
        protected _outOfBoundaryAmount: math.Vec3;
        protected _outOfBoundaryAmountDirty: boolean;
        protected _stopMouseWheel: boolean;
        protected _mouseWheelEventElapsedTime: number;
        protected _isScrollEndedWithThresholdEventFired: boolean;
        protected _scrollEventEmitMask: number;
        protected _isBouncing: boolean;
        protected _contentPos: math.Vec3;
        protected _deltaPos: math.Vec3;
        /**
         * @en
         * Scroll the content to the bottom boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图底部。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到底部边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to the bottom of the view.
         * scrollView.scrollToBottom(0.1);
         * ```
         */
        scrollToBottom(timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll the content to the top boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图顶部。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到顶部边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to the top of the view.
         * scrollView.scrollToTop(0.1);
         * ```
         */
        scrollToTop(timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll the content to the left boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图左边。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到左边边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to the left of the view.
         * scrollView.scrollToLeft(0.1);
         * ```
         */
        scrollToLeft(timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll the content to the right boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图右边。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到右边边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to the right of the view.
         * scrollView.scrollToRight(0.1);
         * ```
         */
        scrollToRight(timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll the content to the top left boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图左上角。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到左上边边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to the upper left corner of the view.
         * scrollView.scrollToTopLeft(0.1);
         * ```
         */
        scrollToTopLeft(timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll the content to the top right boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图右上角。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到右上边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to the top right corner of the view.
         * scrollView.scrollToTopRight(0.1);
         * ```
         */
        scrollToTopRight(timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll the content to the bottom left boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图左下角。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到左下边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to the lower left corner of the view.
         * scrollView.scrollToBottomLeft(0.1);
         * ```
         */
        scrollToBottomLeft(timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll the content to the bottom right boundary of ScrollView.
         *
         * @zh
         * 视图内容将在规定时间内滚动到视图右下角。
         *
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到右边下边界。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to the lower right corner of the view.
         * scrollView.scrollToBottomRight(0.1);
         * ```
         */
        scrollToBottomRight(timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll with an offset related to the ScrollView's top left origin, if timeInSecond is omitted, then it will jump to the specific offset immediately.
         *
         * @zh
         * 视图内容在规定时间内将滚动到 ScrollView 相对左上角原点的偏移位置, 如果 timeInSecond 参数不传，则立即滚动到指定偏移位置。
         *
         * @param offset - 指定移动偏移量。
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到指定偏移量处。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to middle position in 0.1 second in x-axis
         * let maxScrollOffset = this.getMaxScrollOffset();
         * scrollView.scrollToOffset(new Vec3(maxScrollOffset.x / 2, 0, 0), 0.1);
         * ```
         */
        scrollToOffset(offset: math.Vec3, timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Get the positive offset value corresponds to the content's top left boundary.
         *
         * @zh
         * 获取滚动视图相对于左上角原点的当前滚动偏移。
         *
         * @return - 当前滚动偏移量。
         */
        getScrollOffset(): math.Vec3;
        /**
         * @en
         * Get the maximize available  scroll offset.
         *
         * @zh
         * 获取滚动视图最大可以滚动的偏移量。
         *
         * @return - 最大可滚动偏移量。
         */
        getMaxScrollOffset(): math.Vec3;
        /**
         * @en
         * Scroll the content to the horizontal percent position of ScrollView.
         *
         * @zh
         * 视图内容在规定时间内将滚动到 ScrollView 水平方向的百分比位置上。
         *
         * @param percent - 0 - 之间的百分比。
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到指定水平百分比位置。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Scroll to middle position.
         * scrollView.scrollToBottomRight(0.5, 0.1);
         * ```
         */
        scrollToPercentHorizontal(percent: number, timeInSecond: number, attenuated: boolean): void;
        /**
         * @en
         * Scroll the content to the percent position of ScrollView in any direction.
         *
         * @zh
         * 视图内容在规定时间内进行垂直方向和水平方向的滚动，并且滚动到指定百分比位置上。
         *
         * @param anchor - 在 new Vec2(0,0) and new Vec2(1,1) 上取差值的一个点。
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到指定水平或垂直百分比位置。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * // Vertical scroll to the bottom of the view.
         * scrollView.scrollTo(new Vec2(0, 1), 0.1);
         *
         * // Horizontal scroll to view right.
         * scrollView.scrollTo(new Vec2(1, 0), 0.1);
         * ```
         */
        scrollTo(anchor: math.Vec2, timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Scroll the content to the vertical percent position of ScrollView.
         *
         * @zh
         * 视图内容在规定时间内滚动到 ScrollView 垂直方向的百分比位置上。
         *
         * @param percent - 0 - 1 之间的百分比。
         * @param timeInSecond - 滚动时间（s）。 如果超时，内容将立即跳到指定垂直百分比位置。
         * @param attenuated - 滚动加速是否衰减，默认为 true。
         * @example
         * ```typescript
         * scrollView.scrollToPercentVertical(0.5, 0.1);
         * ```
         */
        scrollToPercentVertical(percent: number, timeInSecond?: number, attenuated?: boolean): void;
        /**
         * @en
         * Stop auto scroll immediately.
         *
         * @zh
         * 停止自动滚动, 调用此 API 可以让 ScrollView 立即停止滚动。
         */
        stopAutoScroll(): void;
        /**
         * @en
         * Modify the content position.
         *
         * @zh
         * 设置当前视图内容的坐标点。
         *
         * @param position - 当前视图坐标点.
         */
        setContentPosition(position: math.Vec3): void;
        /**
         * @en
         * Query the content's position in its parent space.
         *
         * @zh
         * 获取当前视图内容的坐标点。
         *
         * @returns - 当前视图内容的坐标点.
         */
        getContentPosition(): math.Vec3;
        /**
         * @en
         * Query whether the user is currently dragging the ScrollView to scroll it.
         *
         * @zh
         * 用户是否在拖拽当前滚动视图。
         *
         * @returns - 是否在拖拽当前滚动视图。
         */
        isScrolling(): boolean;
        /**
         * @en
         * Query whether the ScrollView is currently scrolling because of a bounceback or inertia slowdown.
         *
         * @zh
         * 当前滚动视图是否在惯性滚动。
         *
         * @returns - 滚动视图是否在惯性滚动。
         */
        isAutoScrolling(): boolean;
        getScrollEndedEventTiming(): number;
        start(): void;
        onEnable(): void;
        update(dt: number): void;
        onDisable(): void;
        protected _registerEvent(): void;
        protected _unregisterEvent(): void;
        protected _onMouseWheel(event: EventMouse, captureListeners?: Node[]): void;
        protected _onTouchBegan(event: EventTouch, captureListeners?: Node[]): void;
        protected _onTouchMoved(event: EventTouch, captureListeners?: Node[]): void;
        protected _onTouchEnded(event: EventTouch, captureListeners?: Node[]): void;
        protected _onTouchCancelled(event: EventTouch, captureListeners?: Node[]): void;
        protected _calculateBoundary(): void;
        protected _hasNestedViewGroup(event: Event, captureListeners?: Node[]): boolean | undefined;
        protected _startInertiaScroll(touchMoveVelocity: math.Vec3): void;
        protected _calculateAttenuatedFactor(distance: number): number;
        protected _startAttenuatingAutoScroll(deltaMove: math.Vec3, initialVelocity: math.Vec3): void;
        protected _calculateAutoScrollTimeByInitialSpeed(initialSpeed: number): number;
        protected _startAutoScroll(deltaMove: math.Vec3, timeInSecond: number, attenuated?: boolean): void;
        protected _calculateTouchMoveVelocity(): math.Vec3;
        protected _flattenVectorByDirection(vector: math.Vec3): math.Vec3;
        protected _moveContent(deltaMove: math.Vec3, canStartBounceBack?: boolean): void;
        protected _getContentLeftBoundary(): number;
        protected _getContentRightBoundary(): number;
        protected _getContentTopBoundary(): number;
        protected _getContentBottomBoundary(): number;
        protected _getHowMuchOutOfBoundary(addition?: math.Vec3): math.Vec3;
        protected _updateScrollBar(outOfBoundary: math.Vec3): void;
        protected _onScrollBarTouchBegan(): void;
        protected _onScrollBarTouchEnded(): void;
        protected _dispatchEvent(event: string): void;
        protected _adjustContentOutOfBoundary(): void;
        protected _hideScrollBar(): void;
        protected _showScrollBar(): void;
        protected _stopPropagationIfTargetIsMe(event: Event): void;
        protected _processDeltaMove(deltaMove: math.Vec3): void;
        protected _handleMoveLogic(touch: Touch): void;
        protected _handleReleaseLogic(touch: Touch): void;
        protected _getLocalAxisAlignDelta(touch: Touch): math.Vec3;
        protected _scrollChildren(deltaMove: math.Vec3): void;
        protected _handlePressLogic(): void;
        protected _clampDelta(delta: math.Vec3): math.Vec3;
        protected _gatherTouchMove(delta: math.Vec3): void;
        protected _startBounceBackIfNeeded(): boolean;
        protected _processInertiaScroll(): void;
        protected _isOutOfBoundary(): boolean;
        protected _isNecessaryAutoScrollBrake(): boolean;
        protected _processAutoScrolling(dt: any): void;
        protected _checkMouseWheel(dt: number): void;
        protected _calculateMovePercentDelta(options: any): math.Vec3;
        protected _moveContentToTopLeft(scrollViewSize: math.Size): void;
        protected _scaleChanged(value: ___private.cocos_core_scene_graph_node_enum_TransformBit): void;
    }
    /**
     * @en
     * The Slider Control.
     *
     * @zh
     * 滑动器组件。
     */
    export class SliderComponent extends Component {
        get handle(): SpriteComponent | null;
        set handle(value: SpriteComponent | null);
        get direction(): number;
        set direction(value: number);
        get progress(): number;
        set progress(value: number);
        static Direction: typeof __private.cocos_ui_components_slider_component_Direction;
        /**
         * @en
         * The slider slide events' callback array.
         *
         * @zh
         * 滑动器组件事件回调函数。
         */
        slideEvents: EventHandler[];
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        protected _onHandleDragStart(event?: EventTouch): void;
        protected _onTouchBegan(event?: EventTouch): void;
        protected _onTouchMoved(event?: EventTouch): void;
        protected _onTouchEnded(event?: EventTouch): void;
        protected _onTouchCancelled(event?: EventTouch): void;
        protected _handleSliderLogic(touch: Touch | null): void;
        protected _emitSlideEvent(): void;
        protected _updateProgress(touch: Touch | null): void;
        protected _updateHandlePosition(): void;
    }
    /**
     * @en
     * Renders a sprite in the scene.
     *
     * @zh
     * 渲染精灵组件。
     */
    export class SpriteComponent extends UIRenderComponent {
        get spriteAtlas(): SpriteAtlas | null;
        set spriteAtlas(value: SpriteAtlas | null);
        get spriteFrame(): SpriteFrame | null;
        set spriteFrame(value: SpriteFrame | null);
        get type(): __private.cocos_ui_components_sprite_component_SpriteType;
        set type(value: __private.cocos_ui_components_sprite_component_SpriteType);
        get fillType(): __private.cocos_ui_components_sprite_component_FillType;
        set fillType(value: __private.cocos_ui_components_sprite_component_FillType);
        get fillCenter(): math.Vec2;
        set fillCenter(value: math.Vec2);
        get fillStart(): number;
        set fillStart(value: number);
        get fillRange(): number;
        set fillRange(value: number);
        get trim(): boolean;
        set trim(value: boolean);
        get grayscale(): boolean;
        set grayscale(value: boolean);
        get sizeMode(): __private.cocos_ui_components_sprite_component_SizeMode;
        set sizeMode(value: __private.cocos_ui_components_sprite_component_SizeMode);
        static FillType: typeof __private.cocos_ui_components_sprite_component_FillType;
        static Type: typeof __private.cocos_ui_components_sprite_component_SpriteType;
        static SizeMode: typeof __private.cocos_ui_components_sprite_component_SizeMode;
        static EventType: typeof __private.cocos_ui_components_sprite_component_EventType;
        protected _spriteFrame: SpriteFrame | null;
        protected _type: __private.cocos_ui_components_sprite_component_SpriteType;
        protected _fillType: __private.cocos_ui_components_sprite_component_FillType;
        protected _sizeMode: __private.cocos_ui_components_sprite_component_SizeMode;
        protected _fillCenter: math.Vec2;
        protected _fillStart: number;
        protected _fillRange: number;
        protected _isTrimmedMode: boolean;
        protected _useGrayscale: boolean;
        protected _atlas: SpriteAtlas | null;
        __preload(): void;
        onEnable(): void;
        onDestroy(): void;
        /**
         * @en
         * Quickly switch to other sprite frame in the sprite atlas.
         * If there is no atlas, the switch fails.
         *
         * @zh
         * 精灵图集内的精灵替换
         *
         * @returns
         */
        changeSpriteFrameFromAtlas(name: string): void;
        protected _render(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        protected _canRender(): boolean;
        protected _flushAssembler(): void;
    }
    /**
     * @en
     * The toggle component is a CheckBox, when it used together with a ToggleGroup,
     * it could be treated as a RadioButton.
     *
     * @zh
     * Toggle 是一个 CheckBox，当它和 ToggleGroup 一起使用的时候，可以变成 RadioButton。
     */
    export class ToggleComponent extends ButtonComponent {
        get isChecked(): boolean;
        set isChecked(value: boolean);
        get toggleGroup(): ToggleContainerComponent | null;
        set toggleGroup(value: ToggleContainerComponent | null);
        get checkMark(): SpriteComponent | null;
        set checkMark(value: SpriteComponent | null);
        set _resizeToTarget(value: boolean);
        get _toggleContainer(): null;
        static EventType: typeof __private.cocos_ui_components_toggle_component_EventType & typeof __private.cocos_ui_components_button_component_EventType;
        /**
         * @en
         * If Toggle is clicked, it will trigger event's handler.
         *
         * @zh
         * Toggle 按钮的点击事件列表。
         */
        checkEvents: EventHandler[];
        onEnable(): void;
        onDisable(): void;
        /**
         * @en
         * Toggle switch.
         *
         * @zh
         * toggle 按钮切换。
         */
        toggle(): void;
        /**
         * @en
         * Make the toggle button checked.
         *
         * @zh
         * 使 toggle 按钮处于选中状态。
         */
        check(): void;
        /**
         * @en
         * Make the toggle button unchecked.
         *
         * @zh
         * 取消 toggle 按钮选中状态。
         */
        uncheck(): void;
    }
    /**
     * @en
     * ToggleContainer is not a visible UI component but a way to modify the behavior of a set of Toggles. <br/>
     * Toggles that belong to the same group could only have one of them to be switched on at a time.<br/>
     * Note: All the first layer child node containing the toggle component will auto be added to the container.
     *
     * @zh
     * ToggleGroup 不是一个可见的 UI 组件，它可以用来修改一组 Toggle  组件的行为。当一组 Toggle 属于同一个 ToggleGroup 的时候，<br/>
     * 任何时候只能有一个 Toggle 处于选中状态。
     */
    export class ToggleContainerComponent extends Component {
        /**
         * @en
         * If Toggle is clicked, it will trigger event's handler.
         *
         * @zh
         * Toggle 按钮的点击事件列表。
         */
        checkEvents: EventHandler[];
        protected _allowSwitchOff: boolean;
        get allowSwitchOff(): boolean;
        set allowSwitchOff(value: boolean);
        get toggleItems(): ToggleComponent[];
        start(): void;
        /**
         * @en
         * Refresh the state of the managed toggles.
         *
         * @zh
         * 刷新管理的 toggle 状态。
         *
         * @param toggle - 需要被更新的 toggle。
         */
        updateToggles(toggle: ToggleComponent): void;
        /**
         * @en
         * Add toggle that needs to be managed.
         *
         * @zh
         * 添加需要被控制的 toggle。
         *
         * @param toggle - 被控制的 toggle。
         */
        addToggle(toggle: ToggleComponent): void;
        /**
         * @en
         * Remove toggle that needs to be managed.
         *
         * @zh
         * 移除 toggle。
         *
         * @param toggle - 被移除控制的 toggle。
         */
        removeToggle(toggle: ToggleComponent): void;
    }
    /**
     * @en
     * The component of model.
     * When you place particles or models in the UI, you must add this component to render.
     * The component must be placed on a node with the modelComponent or the particleComponent.
     *
     * @zh
     * UI 模型基础组件。
     * 当你在 UI 中放置模型或者粒子的时候，必须添加该组件才能渲染。该组件必须放置在带有 modelComponent 或者 particleComponent 组件的节点上。
     */
    export class UIModelComponent extends UIComponent {
        get modelComponent(): RenderableComponent | null;
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        updateAssembler(render: renderer.__private.cocos_core_renderer_ui_ui_UI): boolean;
        update(): void;
    }
    export class ViewGroupComponent extends Component {
    }
    /**
     * @en
     * cc.WebView is a component for display web pages in the game.
     *
     * @zh
     * WebView 组件，用于在游戏中显示网页。
     */
    export class WebviewComponent extends UIComponent {
        get url(): string;
        set url(url: string);
        static EventType: typeof __private.cocos_ui_components_webview_webview_impl_WebViewEventType;
        /**
         * @en
         * The webview's event callback , it will be triggered when certain webview event occurs.
         *
         * @zh
         * WebView 的回调事件，当网页加载过程中，加载完成后或者加载出错时都会回调此函数。
         */
        webviewEvents: EventHandler[];
        constructor();
        onRestore(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        update(dt: any): void;
        /**
         * @en
         * Set javascript interface scheme (see also setOnJSCallback). <br/>
         * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br/>
         * Please refer to the official documentation for more details.
         *
         * @zh
         * 设置 JavaScript 接口方案（与 'setOnJSCallback' 配套使用）。<br/>
         * 注意：只支持 Android 和 iOS ，Web 端用法请前往官方文档查看。<br/>
         * 详情请参阅官方文档
         * @param scheme - 接口方案。
         */
        setJavascriptInterfaceScheme(scheme: string): void;
        /**
         * @en
         * This callback called when load URL that start with javascript
         * interface scheme (see also setJavascriptInterfaceScheme). <br/>
         * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br/>
         * Please refer to the official documentation for more details.
         *
         * @zh
         * 当加载 URL 以 JavaScript 接口方案开始时调用这个回调函数。<br/>
         * 注意：只支持 Android 和 iOS，Web 端用法请前往官方文档查看。
         * 详情请参阅官方文档
         *
         * @param callback
         */
        setOnJSCallback(callback: Function): void;
        /**
         * @en
         * Evaluates JavaScript in the context of the currently displayed page. <br/>
         * Please refer to the official document for more details <br/>
         * Note: Cross domain issues need to be resolved by yourself <br/>
         *
         * @zh
         * 执行 WebView 内部页面脚本（详情请参阅官方文档）。 <br/>
         * 注意：需要自行解决跨域问题
         *
         * @param str
         */
        evaluateJS(str: string): void;
    }
    /**
     * @en
     * Stores and manipulate the anchoring based on its parent.
     * Widget are used for GUI but can also be used for other things.
     * Widget will adjust current node's position and size automatically,
     * but the results after adjustment can not be obtained until the next frame unless you call [[updateAlignment]] manually.
     *
     * @zh Widget 组件，用于设置和适配其相对于父节点的边距，Widget 通常被用于 UI 界面，也可以用于其他地方。<br/>
     * Widget 会自动调整当前节点的坐标和宽高，不过目前调整后的结果要到下一帧才能在脚本里获取到，除非你先手动调用 [[updateAlignment]]。
     */
    export class WidgetComponent extends Component {
        get target(): Node | null;
        set target(value: Node | null);
        get isAlignTop(): boolean;
        set isAlignTop(value: boolean);
        get isAlignBottom(): boolean;
        set isAlignBottom(value: boolean);
        get isAlignLeft(): boolean;
        set isAlignLeft(value: boolean);
        get isAlignRight(): boolean;
        set isAlignRight(value: boolean);
        get isAlignVerticalCenter(): boolean;
        set isAlignVerticalCenter(value: boolean);
        get isAlignHorizontalCenter(): boolean;
        set isAlignHorizontalCenter(value: boolean);
        get isStretchWidth(): boolean;
        get isStretchHeight(): boolean;
        get top(): number;
        set top(value: number);
        get editorTop(): number;
        set editorTop(value: number);
        get bottom(): number;
        set bottom(value: number);
        get editorBottom(): number;
        set editorBottom(value: number);
        get left(): number;
        set left(value: number);
        get editorLeft(): number;
        set editorLeft(value: number);
        get right(): number;
        set right(value: number);
        get editorRight(): number;
        set editorRight(value: number);
        get horizontalCenter(): number;
        set horizontalCenter(value: number);
        get editorHorizontalCenter(): number;
        set editorHorizontalCenter(value: number);
        get verticalCenter(): number;
        set verticalCenter(value: number);
        get editorVerticalCenter(): number;
        set editorVerticalCenter(value: number);
        get isAbsoluteTop(): boolean;
        set isAbsoluteTop(value: boolean);
        get isAbsoluteBottom(): boolean;
        set isAbsoluteBottom(value: boolean);
        get isAbsoluteLeft(): boolean;
        set isAbsoluteLeft(value: boolean);
        get isAbsoluteRight(): boolean;
        set isAbsoluteRight(value: boolean);
        get alignMode(): __private.cocos_ui_components_widget_component_AlignMode;
        set alignMode(value: __private.cocos_ui_components_widget_component_AlignMode);
        get isAbsoluteHorizontalCenter(): boolean;
        set isAbsoluteHorizontalCenter(value: boolean);
        get isAbsoluteVerticalCenter(): boolean;
        set isAbsoluteVerticalCenter(value: boolean);
        get alignFlags(): number;
        set alignFlags(value: number);
        static AlignMode: typeof __private.cocos_ui_components_widget_component_AlignMode;
        _lastPos: math.Vec3;
        _lastSize: math.Size;
        _dirty: boolean;
        /**
         * @en
         * Immediately perform the widget alignment. You need to manually call this method only if
         * you need to get the latest results after the alignment before the end of current frame.
         *
         * @zh
         * 立刻执行 widget 对齐操作。这个接口一般不需要手工调用。
         * 只有当你需要在当前帧结束前获得 widget 对齐后的最新结果时才需要手动调用这个方法。
         *
         * @example
         * ```typescript
         * widget.top = 10;       // change top margin
         * cc.log(widget.node.y); // not yet changed
         * widget.updateAlignment();
         * cc.log(widget.node.y); // changed
         * ```
         */
        updateAlignment(): void;
        _validateTargetInDEV(): void;
        setDirty(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        _adjustWidgetToAllowMovingInEditor(eventType: ___private.cocos_core_scene_graph_node_enum_TransformBit): void;
        _adjustWidgetToAllowResizingInEditor(): void;
        _adjustWidgetToAnchorChanged(): void;
        _adjustTargetToParentChanged(oldParent: Node): void;
        protected _registerEvent(): void;
        protected _unregisterEvent(): void;
        protected _removeParentEvent(): void;
        protected _autoChangedValue(flag: __private.cocos_ui_components_widget_component_AlignFlags, isAbs: boolean): void;
        protected _registerTargetEvents(): void;
        protected _unregisterTargetEvents(): void;
        protected _unregisterOldParentEvents(oldParent: Node): void;
        protected _targetChangedOperation(): void;
    }
    /**
     * @en
     * Outline effect used to change the display, only for system fonts or TTF fonts.
     *
     * @zh
     * 描边效果组件,用于字体描边,只能用于系统字体。
     *
     * @example
     * ```typescript
     *
     *  // Create a new node and add label components.
     *  var node = new cc.Node("New Label");
     *  var label = node.addComponent(cc.LabelComponent);
     *  var outline = node.addComponent(cc.LabelOutlineComponent);
     *  node.parent = this.node;
     * ```
     */
    export class LabelOutlineComponent extends Component {
        protected _color: math.Color;
        protected _width: number;
        get color(): Readonly<math.Color>;
        set color(value: Readonly<math.Color>);
        get width(): number;
        set width(value: number);
        protected _updateRenderData(): void;
    }
    /**
     * @en
     * Graphics component.
     *
     * @zh
     * 自定义图形类
     */
    export class GraphicsComponent extends UIRenderComponent {
        get lineWidth(): number;
        set lineWidth(value: number);
        get lineJoin(): __private.cocos_ui_assembler_graphics_types_LineJoin;
        set lineJoin(value: __private.cocos_ui_assembler_graphics_types_LineJoin);
        get lineCap(): __private.cocos_ui_assembler_graphics_types_LineCap;
        set lineCap(value: __private.cocos_ui_assembler_graphics_types_LineCap);
        get strokeColor(): Readonly<math.Color>;
        set strokeColor(value: Readonly<math.Color>);
        get fillColor(): Readonly<math.Color>;
        set fillColor(value: Readonly<math.Color>);
        get miterLimit(): number;
        set miterLimit(value: number);
        get color(): math.Color;
        set color(value: math.Color);
        static LineJoin: typeof __private.cocos_ui_assembler_graphics_types_LineJoin;
        static LineCap: typeof __private.cocos_ui_assembler_graphics_types_LineCap;
        impl: __private.cocos_ui_assembler_graphics_webgl_impl_Impl | null;
        model: renderer.Model | null;
        protected _lineWidth: number;
        protected _strokeColor: math.Color;
        protected _lineJoin: __private.cocos_ui_assembler_graphics_types_LineJoin;
        protected _lineCap: __private.cocos_ui_assembler_graphics_types_LineCap;
        protected _fillColor: math.Color;
        protected _miterLimit: number;
        constructor();
        onRestore(): void;
        __preload(): void;
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        _activateMaterial(): void;
        /**
         * @en
         * Move path start point to (x,y).
         *
         * @zh
         * 移动路径起点到坐标(x, y)。
         *
         * @param x - 移动坐标 x 轴。
         * @param y - 移动坐标 y 轴。
         */
        moveTo(x: number, y: number): void;
        /**
         * @en
         * Adds a straight line to the path.
         *
         * @zh
         * 绘制直线路径。
         *
         * @param x - 绘制路径坐标 x 轴。
         * @param y - 绘制路径坐标 y 轴。
         */
        lineTo(x: number, y: number): void;
        /**
         * @en
         * Adds a cubic Bézier curve to the path.
         *
         * @zh
         * 绘制三次贝赛尔曲线路径。
         *
         * @param c1x - 第一个控制点的坐标 x 轴。
         * @param c1y - 第一个控制点的坐标 y 轴。
         * @param c2x - 第二个控制点的坐标 x 轴。
         * @param c2y - 第二个控制点的坐标 y 轴。
         * @param x - 最后一个控制点的坐标 x 轴。
         * @param y - 最后一个控制点的坐标 y 轴。
         */
        bezierCurveTo(c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number): void;
        /**
         * @en
         * Adds a quadratic Bézier curve to the path.
         *
         * @zh
         * 绘制二次贝赛尔曲线路径。
         *
         * @param cx - 起始控制点的坐标 x 轴。
         * @param cy - 起始控制点的坐标 y 轴。
         * @param x - 终点控制点的坐标 x 轴。
         * @param y - 终点控制点的坐标 x 轴。
         */
        quadraticCurveTo(cx: number, cy: number, x: number, y: number): void;
        /**
         * @en
         * Adds an arc to the path which is centered at (cx, cy) position with radius r starting at startAngle
         * and ending at endAngle going in the given direction by counterclockwise (defaulting to false).
         *
         * @zh
         * 绘制圆弧路径。圆弧路径的圆心在 (cx, cy) 位置，半径为 r ，根据 counterclockwise （默认为false）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
         *
         * @param cx - 中心控制点的坐标 x 轴。
         * @param cy - 中心控制点的坐标 y 轴。
         * @param r - 圆弧弧度。
         * @param startAngle - 开始弧度，从正 x 轴顺时针方向测量。
         * @param endAngle - 结束弧度，从正 x 轴顺时针方向测量。
         * @param counterclockwise 如果为真，在两个角度之间逆时针绘制。默认顺时针。
         */
        arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, counterclockwise: boolean): void;
        /**
         * @en
         * Adds an ellipse to the path.
         *
         * @zh
         * 绘制椭圆路径。
         *
         * @param cx - 中心点的坐标 x 轴。
         * @param cy - 中心点的坐标 y 轴。
         * @param rx - 椭圆 x 轴半径。
         * @param ry - 椭圆 y 轴半径。
         */
        ellipse(cx: number, cy: number, rx: number, ry: number): void;
        /**
         * @en
         * Adds a circle to the path.
         *
         * @zh
         * 绘制圆形路径。
         *
         * @param cx - 中心点的坐标 x 轴。
         * @param cy - 中心点的坐标 y 轴。
         * @param r - 圆半径。
         */
        circle(cx: number, cy: number, r: number): void;
        /**
         * @en
         * Adds a rectangle to the path.
         *
         * @zh
         * 绘制矩形路径。
         *
         * @param x - 矩形起始坐标 x 轴。
         * @param y - 矩形起始坐标 y 轴。
         * @param w - 矩形宽度。
         * @param h - 矩形高度。
         */
        rect(x: number, y: number, w: number, h: number): void;
        /**
         * @en
         * Adds a round corner rectangle to the path.
         *
         * @zh
         * 绘制圆角矩形路径。
         *
         * @param x - 矩形起始坐标 x 轴。
         * @param y - 矩形起始坐标 y 轴。
         * @param w - 矩形宽度。
         * @param h - 矩形高度。
         * @param r - 矩形圆角半径。
         */
        roundRect(x: number, y: number, w: number, h: number, r: number): void;
        /**
         * @en
         * Draws a filled rectangle.
         *
         * @zh
         * 绘制填充矩形。
         *
         * @param x - 矩形起始坐标 x 轴。
         * @param y - 矩形起始坐标 y 轴。
         * @param w - 矩形宽度。
         * @param h - 矩形高度。
         */
        fillRect(x: any, y: any, w: any, h: any): void;
        /**
         * @en
         * Erasing any previously drawn content.
         *
         * @zh
         * 擦除之前绘制的所有内容的方法。
         */
        clear(clean?: boolean): void;
        /**
         * @en
         * Causes the point of the pen to move back to the start of the current path.
         * It tries to add a straight line from the current point to the start.
         *
         * @zh
         * 将笔点返回到当前路径起始点的。它尝试从当前点到起始点绘制一条直线。
         */
        close(): void;
        /**
         * @en
         * Strokes the current or given path with the current stroke style.
         *
         * @zh
         * 根据当前的画线样式，绘制当前或已经存在的路径。
         */
        stroke(): void;
        /**
         * @en
         * Fills the current or given path with the current fill style.
         *
         * @zh
         * 根据当前的画线样式，填充当前或已经存在的路径。
         */
        fill(): void;
        /**
         * @en
         * Manual instance material.
         *
         * @zh
         * 辅助材质实例化。可用于只取数据而无实体情况下渲染使用。特殊情况可参考：[[instanceMaterial]]
         */
        helpInstanceMaterial(): void;
        protected _render(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        protected _instanceMaterial(): void;
        protected _flushAssembler(): void;
        protected _canRender(): boolean;
        protected _attachToScene(): void;
        protected _detachFromScene(): void;
    }
    /**
     * @zh
     * UI 及 UI 模型渲染基类。
     * @deprecated 会在 1.2 的版本移除
     */
    export class UIReorderComponent extends UIComponent {
    }
    /**
     * @en
     * The PageView control.
     *
     * @zh
     * 页面视图组件
     */
    export class PageViewComponent extends ScrollViewComponent {
        get sizeMode(): __private.cocos_ui_components_page_view_component_SizeMode;
        set sizeMode(value: __private.cocos_ui_components_page_view_component_SizeMode);
        get direction(): __private.cocos_ui_components_page_view_component_Direction;
        set direction(value: __private.cocos_ui_components_page_view_component_Direction);
        get scrollThreshold(): number;
        set scrollThreshold(value: number);
        get pageTurningEventTiming(): number;
        set pageTurningEventTiming(value: number);
        get indicator(): PageViewIndicatorComponent | null;
        set indicator(value: PageViewIndicatorComponent | null);
        get curPageIdx(): number;
        static SizeMode: typeof __private.cocos_ui_components_page_view_component_SizeMode;
        static Direction: typeof __private.cocos_ui_components_page_view_component_Direction;
        static EventType: typeof __private.cocos_ui_components_page_view_component_EventType & typeof __private.cocos_ui_components_scroll_view_component_EventType;
        /**
         * @en
         * Auto page turning velocity threshold. When users swipe the PageView quickly,
         * it will calculate a velocity based on the scroll distance and time,
         * if the calculated velocity is larger than the threshold, then it will trigger page turning.
         *
         * @zh
         * 快速滑动翻页临界值。
         * 当用户快速滑动时，会根据滑动开始和结束的距离与时间计算出一个速度值，
         * 该值与此临界值相比较，如果大于临界值，则进行自动翻页。
         */
        autoPageTurningThreshold: number;
        get verticalScrollBar(): ScrollBarComponent | null;
        get horizontalScrollBar(): ScrollBarComponent | null;
        horizontal: boolean;
        vertical: boolean;
        cancelInnerEvents: boolean;
        scrollEvents: EventHandler[];
        /**
         * @en The time required to turn over a page. unit: second
         * @zh 每个页面翻页时所需时间。单位：秒
         * @property {Number} pageTurningSpeed
         */
        pageTurningSpeed: number;
        /**
         * @en PageView events callback
         * @zh 滚动视图的事件回调函数
         */
        pageEvents: EventHandler[];
        protected _sizeMode: __private.cocos_ui_components_page_view_component_SizeMode;
        protected _direction: __private.cocos_ui_components_page_view_component_Direction;
        protected _scrollThreshold: number;
        protected _pageTurningEventTiming: number;
        protected _indicator: PageViewIndicatorComponent | null;
        protected _curPageIdx: number;
        protected _lastPageIdx: number;
        protected _pages: Node[];
        protected _initContentPos: math.Vec3;
        protected _scrollCenterOffsetX: number[];
        protected _scrollCenterOffsetY: number[];
        protected _touchBeganPosition: math.Vec3;
        protected _touchEndPosition: math.Vec3;
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        onLoad(): void;
        onDestroy(): void;
        /**
         * @en
         * Returns current page index.
         *
         * @zh
         * 返回当前页面索引。
         *
         * @returns 当前页面索引。
         */
        getCurrentPageIndex(): number;
        /**
         * @en
         * Set current page index.
         *
         * @zh
         * 设置当前页面索引。
         * @param index 索引。
         */
        setCurrentPageIndex(index: number): void;
        /**
         * @en
         * Returns all pages of pageview.
         *
         * @zh
         * 返回视图中的所有页面。
         *
         * @returns 输=视图所有页面。
         */
        getPages(): Node[];
        /**
         * @en
         * At the end of the current page view to insert a new view.
         *
         * @zh
         * 在当前页面视图的尾部插入一个新视图。
         *
         * @param page 新视图。
         */
        addPage(page: Node): void;
        /**
         * @en
         * Inserts a page in the specified location.
         *
         * @zh
         * 将页面插入指定位置中。
         *
         * @param page 新视图。
         * @param index 指定位置。
         */
        insertPage(page: Node, index: number): void;
        /**
         * @en
         * Removes a page from PageView.
         *
         * @zh
         * 移除指定页面。
         *
         * @param page 指定页面。
         */
        removePage(page: Node): void;
        /**
         * @en
         * Removes a page at index of PageView.
         *
         * @zh
         * 移除指定下标的页面。
         *
         * @param index 页面下标。
         */
        removePageAtIndex(index: number): void;
        /**
         * @en
         * Removes all pages from PageView.
         *
         * @zh
         * 移除所有页面。
         */
        removeAllPages(): void;
        /**
         * @en
         * Scroll PageView to index.
         *
         * @zh
         * 滚动到指定页面
         *
         * @param idx index of page.
         * @param timeInSecond scrolling time.
         */
        scrollToPage(idx: number, timeInSecond?: number): void;
        getScrollEndedEventTiming(): number;
        protected _updatePageView(): void;
        protected _updateAllPagesSize(): void;
        protected _handleReleaseLogic(): void;
        protected _onTouchBegan(event: EventTouch, captureListeners: any): void;
        protected _onTouchMoved(event: EventTouch, captureListeners: any): void;
        protected _onTouchEnded(event: EventTouch, captureListeners: any): void;
        protected _onTouchCancelled(event: EventTouch, captureListeners: any): void;
        protected _onMouseWheel(): void;
        protected _syncScrollDirection(): void;
        protected _syncSizeMode(): void;
        protected _initPages(): void;
        protected _dispatchPageTurningEvent(): void;
        protected _isQuicklyScrollable(touchMoveVelocity: math.Vec3): boolean;
        protected _moveOffsetValue(idx: number): math.Vec3;
        protected _getDragDirection(moveOffset: math.Vec3): 1 | 0 | -1;
        protected _isScrollable(offset: math.Vec3, index: number, nextIndex: number): boolean | undefined;
        protected _autoScrollToPage(): void;
    }
    /**
     * @en
     * The Page View Indicator Component.
     *
     * @zh
     * 页面视图每页标记组件
     */
    export class PageViewIndicatorComponent extends Component {
        get spriteFrame(): SpriteFrame | null;
        set spriteFrame(value: SpriteFrame | null);
        get direction(): __private.cocos_ui_components_page_view_indicator_component_Direction;
        set direction(value: __private.cocos_ui_components_page_view_indicator_component_Direction);
        get cellSize(): math.Size;
        set cellSize(value: math.Size);
        static Direction: typeof __private.cocos_ui_components_page_view_indicator_component_Direction;
        /**
         * @en
         * The distance between each element.
         *
         * @zh
         * 每个页面标记之间的边距
         */
        spacing: number;
        protected _spriteFrame: SpriteFrame | null;
        protected _direction: __private.cocos_ui_components_page_view_indicator_component_Direction;
        protected _cellSize: math.Size;
        protected _layout: LayoutComponent | null;
        protected _pageView: PageViewComponent | null;
        protected _indicators: Node[];
        onLoad(): void;
        /**
         * @en
         * Set Page View.
         *
         * @zh
         * 设置页面视图
         *
         * @param target 页面视图对象
         */
        setPageView(target: PageViewComponent): void;
        _updateLayout(): void;
        _createIndicator(): Node;
        _changedState(): void;
        _refresh(): void;
    }
    /**
     * @en
     * Static batch component of UI.
     * This component is placed on the root node of all node objects that need to be batch.
     * Only sprites and label participate in the batch.
     * Static batch must be enabled manually, otherwise dynamic batch is still used.
     * Note: Do not place mask, Graphics, and objects such as UI models or particles under child nodes,
     * otherwise rendering will be skipped after static batching is enabled.
     *
     * @zh
     * UI 静态合批组件。
     * 该组件放在所有需要被静态合批的节点对象的根节点上，子节点放置对象必须是精灵和文本，其余对象不参与静态合批。
     * 用户必须通过手动方式启用收集静态合批数据[[markAsDirty]]，否则合批方式仍然采用动态合批（采集数据的流程相同）。此后渲染的内容是采用收集到的合批渲染数据，子节点的任何修改将不再有效。
     * 注意：子节点下不要放置 Mask，Graphics，以及 UI 模型或者粒子之类对象，否则会在启用完静态合批后跳过渲染。
     */
    export class UIStaticBatchComponent extends UIRenderComponent {
        get dstBlendFactor(): GFXBlendFactor;
        set dstBlendFactor(value: GFXBlendFactor);
        get srcBlendFactor(): GFXBlendFactor;
        set srcBlendFactor(value: GFXBlendFactor);
        get color(): Readonly<math.Color>;
        set color(value: Readonly<math.Color>);
        get sharedMaterial(): Material | null;
        set sharedMaterial(value: Material | null);
        get drawBatchList(): __private.cocos_core_renderer_ui_ui_draw_batch_UIDrawBatch[];
        protected _init: boolean;
        protected _meshBuffer: MeshBuffer | null;
        protected _dirty: boolean;
        onLoad(): void;
        onDestroy(): void;
        updateAssembler(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        postUpdateAssembler(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        /**
         * @en
         * Recollect data tags.
         * The render data will be recollected during the render phase of the current frame, and the next frame will be rendered using fixed data.
         * Note: 尽量不要频繁调用此接口, 会有一定内存损耗.
         *
         * @zh
         * 重新采集数据标记，会在当前帧的渲染阶段重新采集渲染数据，下一帧开始将会使用固定数据进行渲染。
         * 注意：尽量不要频繁调用此接口，因为会清空原先存储的 ia 数据重新采集，会有一定内存损耗。
         */
        markAsDirty(): void;
        _requireDrawBatch(): __private.cocos_core_renderer_ui_ui_draw_batch_UIDrawBatch;
        protected _clearData(): void;
        protected _getUI(): renderer.__private.cocos_core_renderer_ui_ui_UI | null;
        protected _arrivalMaxBuffer(): void;
    }
    /**
     * @en
     * Set the UI transparency component.
     * This component can be used to influence subsequent render nodes.
     * Nodes that already have a rendering component can modify the alpha channel of color directly.
     *
     * @zh
     * UI 透明度设置组件。可以通过该组件设置透明度来影响后续的渲染节点。已经带有渲染组件的节点可以直接修改 color 的 alpha 通道。
     */
    export class UIOpacityComponent extends Component {
        get opacity(): number;
        set opacity(value: number);
        protected _opacity: number;
        onEnable(): void;
        onDisable(): void;
    }
    export const widgetManager: {
        isAligning: boolean;
        _nodesOrderDirty: boolean;
        _activeWidgetsIterator: js.array.MutableForwardIterator<WidgetComponent>;
        animationState: {
            previewing: boolean;
            time: number;
            animatedSinceLastFrame: boolean;
        } | null;
        init(director: any): void;
        add(widget: WidgetComponent): void;
        remove(widget: WidgetComponent): void;
        onResized(): void;
        refreshWidgetOnResized(node: Node): void;
        updateOffsetsToStayPut(widget: WidgetComponent, e?: __private.cocos_ui_components_widget_component_AlignFlags | undefined): void;
        updateAlignment: typeof __private.cocos_ui_components_widget_manager_updateAlignment;
        AlignMode: typeof __private.cocos_ui_components_widget_component_AlignMode;
        AlignFlags: typeof __private.cocos_ui_components_widget_component_AlignFlags;
    };
    /**
     * @en Enum for horizontal text alignment.
     *
     * @zh 文本横向对齐类型。
     */
    export enum HorizontalTextAlignment {
        LEFT = 0,
        CENTER = 1,
        RIGHT = 2
    }
    /**
     * @en Enum for vertical text alignment.
     *
     * @zh 文本垂直对齐类型。
     */
    export enum VerticalTextAlignment {
        TOP = 0,
        CENTER = 1,
        BOTTOM = 2
    }
    /**
     * @en Enum for Overflow.
     *
     * @zh 文本超载类型。
     */
    export enum Overflow {
        NONE = 0,
        CLAMP = 1,
        SHRINK = 2,
        RESIZE_HEIGHT = 3
    }
    /**
     * @en Enum for cache mode.
     *
     * @zh 文本图集缓存类型。
     */
    export enum CacheMode {
        NONE = 0,
        BITMAP = 1,
        CHAR = 2
    }
    /**
     * @zh
     * Type 类型。
     */
    /**
     * @zh
     * TTF字体。
     */
    /**
     * @zh
     * 位图字体。
     */
    /**
     * @zh
     * 系统字体。
     */
    /**
     * @en
     * The Label Component.
     *
     * @zh
     * 文字标签组件。
     */
    export class LabelComponent extends UIRenderComponent {
        get string(): string;
        set string(value: string);
        get horizontalAlign(): HorizontalTextAlignment;
        set horizontalAlign(value: HorizontalTextAlignment);
        get verticalAlign(): VerticalTextAlignment;
        set verticalAlign(value: VerticalTextAlignment);
        get actualFontSize(): number;
        set actualFontSize(value: number);
        get fontSize(): number;
        set fontSize(value: number);
        get fontFamily(): string;
        set fontFamily(value: string);
        get lineHeight(): number;
        set lineHeight(value: number);
        get overflow(): Overflow;
        set overflow(value: Overflow);
        get enableWrapText(): boolean;
        set enableWrapText(value: boolean);
        get font(): Font | null;
        set font(value: Font | null);
        get useSystemFont(): boolean;
        set useSystemFont(value: boolean);
        get cacheMode(): CacheMode;
        set cacheMode(value: CacheMode);
        get spriteFrame(): SpriteFrame | __private.cocos_ui_assembler_label_letter_font_LetterRenderTexture | null;
        get isBold(): boolean;
        set isBold(value: boolean);
        get isItalic(): boolean;
        set isItalic(value: boolean);
        get isUnderline(): boolean;
        set isUnderline(value: boolean);
        get assemblerData(): __private.cocos_ui_assembler_label_font_utils_ISharedLabelData | null;
        get fontAtlas(): __private.cocos_ui_assembler_label_bmfontUtils_FontAtlas | null;
        set fontAtlas(value: __private.cocos_ui_assembler_label_bmfontUtils_FontAtlas | null);
        get spacingX(): number;
        set spacingX(value: number);
        get _bmFontOriginalSize(): number;
        static HorizontalAlign: typeof HorizontalTextAlignment;
        static VerticalAlign: typeof VerticalTextAlignment;
        static Overflow: typeof Overflow;
        static CacheMode: typeof CacheMode;
        static _canvasPool: CanvasPool;
        protected _useOriginalSize: boolean;
        protected _string: string;
        protected _horizontalAlign: HorizontalTextAlignment;
        protected _verticalAlign: VerticalTextAlignment;
        protected _actualFontSize: number;
        protected _fontSize: number;
        protected _fontFamily: string;
        protected _lineHeight: number;
        protected _overflow: Overflow;
        protected _enableWrapText: boolean;
        protected _font: Font | null;
        protected _isSystemFontUsed: boolean;
        protected _spacingX: number;
        protected _isItalic: boolean;
        protected _isBold: boolean;
        protected _isUnderline: boolean;
        protected _cacheMode: CacheMode;
        protected _N$file: Font | null;
        protected _texture: SpriteFrame | __private.cocos_ui_assembler_label_letter_font_LetterRenderTexture | null;
        protected _ttfSpriteFrame: SpriteFrame | null;
        protected _userDefinedFont: Font | null;
        protected _assemblerData: __private.cocos_ui_assembler_label_font_utils_ISharedLabelData | null;
        protected _fontAtlas: __private.cocos_ui_assembler_label_bmfontUtils_FontAtlas | null;
        protected _letterTexture: __private.cocos_ui_assembler_label_letter_font_LetterRenderTexture | null;
        constructor();
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        updateRenderData(force?: boolean): void;
        protected _render(render: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        protected _updateColor(): void;
        protected _canRender(): boolean;
        protected _flushAssembler(): void;
        protected _flushMaterial(): void;
        protected _applyFontTexture(): void;
    }
    export namespace __private {
        export enum cocos_core_renderer_ui_stencil_manager_Stage {
            DISABLED = 0,
            CLEAR = 1,
            ENTER_LEVEL = 2,
            ENABLED = 3,
            EXIT_LEVEL = 4
        }
        /**
         * @hidden
         */
        export interface cocos_ui_assembler_label_font_utils_ISharedLabelData {
            canvas: HTMLCanvasElement;
            context: CanvasRenderingContext2D | null;
        }
        /**
         * @en Enum for transition type.
         *
         * @zh 过渡类型。
         */
        export enum cocos_ui_components_button_component_Transition {
            NONE = 0,
            COLOR = 1,
            SPRITE = 2,
            SCALE = 3
        }
        export enum cocos_ui_components_button_component_EventType {
            CLICK = "click"
        }
        /**
         * 键盘的返回键类型。
         * @readonly
         * @enum EditBox.KeyboardReturnType
         */
        export enum cocos_ui_components_editbox_types_KeyboardReturnType {
            DEFAULT = 0,
            DONE = 1,
            SEND = 2,
            SEARCH = 3,
            GO = 4,
            NEXT = 5
        }
        /**
         * 定义了一些用于设置文本显示和文本格式化的标志位。
         * @readonly
         * @enum EditBox.InputFlag
         */
        export enum cocos_ui_components_editbox_types_InputFlag {
            PASSWORD = 0,
            SENSITIVE = 1,
            INITIAL_CAPS_WORD = 2,
            INITIAL_CAPS_SENTENCE = 3,
            INITIAL_CAPS_ALL_CHARACTERS = 4,
            DEFAULT = 5
        }
        /**
         * 输入模式。
         * @readonly
         * @enum EditBox.InputMode
         */
        export enum cocos_ui_components_editbox_types_InputMode {
            ANY = 0,
            EMAIL_ADDR = 1,
            NUMERIC = 2,
            PHONE_NUMBER = 3,
            URL = 4,
            DECIMAL = 5,
            SINGLE_LINE = 6
        }
        export class cocos_ui_components_editbox_edit_box_impl_base_EditBoxImplBase {
            _editing: boolean;
            _delegate: EditBoxComponent | null;
            init(delegate: EditBoxComponent): void;
            onEnable(): void;
            update(): void;
            onDisable(): void;
            clear(): void;
            setTabIndex(index: number): void;
            setSize(width: number, height: number): void;
            setFocus(value: any): void;
            isFocused(): boolean;
            beginEditing(): void;
            endEditing(): void;
        }
        export enum cocos_ui_components_editbox_edit_box_component_EventType {
            EDITING_DID_BEGAN = "editing-did-began",
            EDITING_DID_ENDED = "editing-did-ended",
            TEXT_CHANGED = "text-changed",
            EDITING_RETURN = "editing-return"
        }
        /**
         * @en Enum for layout.
         *
         * @zh 布局类型。
         */
        export enum cocos_ui_components_layout_component_Type {
            NONE = 0,
            HORIZONTAL = 1,
            VERTICAL = 2,
            GRID = 3
        }
        /**
         * @en Enum for Layout Resize Mode.
         *
         * @zh 缩放模式。
         */
        export enum cocos_ui_components_layout_component_ResizeMode {
            NONE = 0,
            CONTAINER = 1,
            CHILDREN = 2
        }
        /**
         * @en Enum for Grid Layout start axis direction.
         *
         * @zh 布局轴向，只用于 GRID 布局。
         */
        export enum cocos_ui_components_layout_component_AxisDirection {
            HORIZONTAL = 0,
            VERTICAL = 1
        }
        /**
         * @en Enum for vertical layout direction.
         *
         * @zh 垂直方向布局方式。
         */
        export enum cocos_ui_components_layout_component_VerticalDirection {
            BOTTOM_TO_TOP = 0,
            TOP_TO_BOTTOM = 1
        }
        /**
         * @en Enum for horizontal layout direction.
         *
         * @zh 水平方向布局方式。
         */
        export enum cocos_ui_components_layout_component_HorizontalDirection {
            LEFT_TO_RIGHT = 0,
            RIGHT_TO_LEFT = 1
        }
        /**
         * @en The type for mask.
         *
         * @zh 遮罩组件类型。
         */
        export enum cocos_ui_components_mask_component_MaskType {
            RECT = 0,
            ELLIPSE = 1,
            GRAPHICS_STENCIL = 2
        }
        /**
         * @en
         * Enum for ProgressBar mode.
         *
         * @zh
         * 进度条模式。
         */
        export enum cocos_ui_components_progress_bar_component_Mode {
            HORIZONTAL = 0,
            VERTICAL = 1,
            FILLED = 2
        }
        export interface cocos_ui_components_rich_text_component_ILabelSegment {
            node: PrivateNode;
            comp: UIRenderComponent | null;
            clickHandler: "";
            styleIndex: number;
            lineCount: number;
        }
        /**
         * @en
         * Enum for ScrollBar direction.
         *
         * @zh
         * 滚动条方向。
         */
        export enum cocos_ui_components_scroll_bar_component_Direction {
            HORIZONTAL = 0,
            VERTICAL = 1
        }
        /**
         * @en
         * Enum for ScrollView event type.
         *
         * @zh
         * 滚动视图事件类型
         */
        export enum cocos_ui_components_scroll_view_component_EventType {
            SCROLL_TO_TOP = "scroll-to-top",
            SCROLL_TO_BOTTOM = "scroll-to-bottom",
            SCROLL_TO_LEFT = "scroll-to-left",
            SCROLL_TO_RIGHT = "scroll-to-right",
            SCROLL_BEGAN = "scroll-began",
            SCROLL_ENDED = "scroll-ended",
            BOUNCE_TOP = "bounce-top",
            BOUNCE_BOTTOM = "bounce-bottom",
            BOUNCE_LEFT = "bounce-left",
            BOUNCE_RIGHT = "bounce-right",
            SCROLLING = "scrolling",
            SCROLL_ENG_WITH_THRESHOLD = "scroll-ended-with-threshold",
            TOUCH_UP = "touch-up"
        }
        /**
         * @en
         * The Slider Direction.
         *
         * @zh
         * 滑动器方向。
         */
        export enum cocos_ui_components_slider_component_Direction {
            Horizontal = 0,
            Vertical = 1
        }
        /**
         * @en
         * Enum for sprite type.
         *
         * @zh
         * Sprite 类型。
         */
        export enum cocos_ui_components_sprite_component_SpriteType {
            SIMPLE = 0,
            SLICED = 1,
            TILED = 2,
            FILLED = 3
        }
        /**
         * @en
         * Enum for fill type.
         *
         * @zh
         * 填充类型。
         */
        export enum cocos_ui_components_sprite_component_FillType {
            HORIZONTAL = 0,
            VERTICAL = 1,
            RADIAL = 2
        }
        /**
         * @en
         * Sprite Size can track trimmed size, raw size or none.
         *
         * @zh
         * 精灵尺寸调整模式。
         */
        export enum cocos_ui_components_sprite_component_SizeMode {
            CUSTOM = 0,
            TRIMMED = 1,
            RAW = 2
        }
        export enum cocos_ui_components_sprite_component_EventType {
            SPRITE_FRAME_CHANGED = "spriteframe-changed"
        }
        export enum cocos_ui_components_toggle_component_EventType {
            TOGGLE = "toggle"
        }
        export enum cocos_ui_components_webview_webview_impl_WebViewEventType {
            LOADING = 0,
            LOADED = 1,
            ERROR = 2,
            JS_EVALUATED = 3
        }
        /**
         * @en Enum for Widget's alignment mode, indicating when the widget should refresh.
         *
         * @zh Widget 的对齐模式，表示 Widget 应该何时刷新。
         */
        export enum cocos_ui_components_widget_component_AlignMode {
            ONCE = 0,
            ALWAYS = 1,
            ON_WINDOW_RESIZE = 2
        }
        /**
         * @en Enum for Widget's alignment flag, indicating when the widget select alignment.
         *
         * @zh Widget 的对齐标志，表示 Widget 选择对齐状态。
         */
        export enum cocos_ui_components_widget_component_AlignFlags {
            TOP = 1,
            MID = 2,
            BOT = 4,
            LEFT = 8,
            CENTER = 16,
            RIGHT = 32,
            HORIZONTAL = 56,
            VERTICAL = 7
        }
        /**
         * @en Enum for LineJoin.
         * @zh 线段拐角属性
         * @enum Graphics.LineJoin
         */
        export enum cocos_ui_assembler_graphics_types_LineJoin {
            BEVEL = 0,
            ROUND = 1,
            MITER = 2
        }
        /**
         * @en Enum for LineCap.
         * @zh 线段末端属性
         * @enum Graphics.LineCap
         */
        export enum cocos_ui_assembler_graphics_types_LineCap {
            BUTT = 0,
            ROUND = 1,
            SQUARE = 2
        }
        export class cocos_ui_assembler_graphics_webgl_impl_Point extends math.Vec2 {
            dx: number;
            dy: number;
            dmx: number;
            dmy: number;
            flags: number;
            len: number;
            constructor(x: number, y: number);
            reset(): void;
        }
        export class cocos_ui_assembler_graphics_webgl_impl_Path {
            closed: boolean;
            nbevel: number;
            complex: boolean;
            points: cocos_ui_assembler_graphics_webgl_impl_Point[];
            constructor();
            reset(): void;
        }
        export class cocos_core_renderer_ui_render_data_MeshRenderData extends ___private.cocos_core_renderer_ui_render_data_BaseRenderData {
            vData: Float32Array;
            iData: Uint16Array;
            vertexStart: number;
            indiceStart: number;
            byteStart: number;
            byteCount: number;
            request(vertexCount: number, indiceCount: number): boolean;
            reset(): void;
        }
        export enum cocos_ui_assembler_graphics_types_PointFlags {
            PT_CORNER = 1,
            PT_LEFT = 2,
            PT_BEVEL = 4,
            PT_INNERBEVEL = 8
        }
        export class cocos_ui_assembler_graphics_webgl_impl_Impl {
            dataOffset: number;
            updatePathOffset: boolean;
            pathLength: number;
            pathOffset: number;
            paths: cocos_ui_assembler_graphics_webgl_impl_Path[];
            tessTol: number;
            distTol: number;
            fillColor: math.Color;
            lineCap: cocos_ui_assembler_graphics_types_LineCap;
            strokeColor: math.Color;
            lineJoin: cocos_ui_assembler_graphics_types_LineJoin;
            lineWidth: number;
            pointsOffset: number;
            moveTo(x: number, y: number): void;
            lineTo(x: number, y: number): void;
            bezierCurveTo(c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number): void;
            quadraticCurveTo(cx: number, cy: number, x: number, y: number): void;
            arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, counterclockwise: boolean): void;
            ellipse(cx: number, cy: number, rx: number, ry: number): void;
            circle(cx: number, cy: number, r: number): void;
            rect(x: number, y: number, w: number, h: number): void;
            roundRect(x: number, y: number, w: number, h: number, r: number): void;
            clear(clean?: boolean): void;
            close(): void;
            requestRenderData(): cocos_core_renderer_ui_render_data_MeshRenderData;
            getRenderDatas(): cocos_core_renderer_ui_render_data_MeshRenderData[];
            addPoint(x: number, y: number, flags: cocos_ui_assembler_graphics_types_PointFlags): void;
        }
        /**
         * @en Enum for Page View Size Mode.
         *
         * @zh 页面视图每个页面统一的大小类型
         */
        export enum cocos_ui_components_page_view_component_SizeMode {
            Unified = 0,
            Free = 1
        }
        /**
         * @en Enum for Page View Direction.
         *
         * @zh 页面视图滚动类型
         */
        export enum cocos_ui_components_page_view_component_Direction {
            Horizontal = 0,
            Vertical = 1
        }
        /**
         * @en Enum for ScrollView event type.
         *
         * @zh 滚动视图事件类型
         */
        export enum cocos_ui_components_page_view_component_EventType {
            PAGE_TURNING = "page-turning"
        }
        /**
         * @en Enum for PageView Indicator direction.
         *
         * @zh 页面视图指示器的摆放方向
         *
         * @enum PageViewIndicator.Direction
         */
        export enum cocos_ui_components_page_view_indicator_component_Direction {
            HORIZONTAL = 0,
            VERTICAL = 1
        }
        export class cocos_core_renderer_ui_ui_draw_batch_UIDrawBatch {
            camera: renderer.Camera | null;
            bufferBatch: MeshBuffer | null;
            model: renderer.Model | null;
            material: Material | null;
            texView: GFXTextureView | null;
            sampler: GFXSampler | null;
            firstIdx: number;
            idxCount: number;
            pipelineState: GFXPipelineState | null;
            bindingLayout: GFXBindingLayout | null;
            useLocalData: Node | null;
            isStatic: boolean;
            destroy(ui: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
            clear(ui: renderer.__private.cocos_core_renderer_ui_ui_UI): void;
        }
        function cocos_ui_components_widget_manager_updateAlignment(node: Node): void;
        export class cocos_ui_assembler_label_letter_font_LetterRenderTexture extends Texture2D {
            /**
             * @en
             * Init the render texture with size.
             * @zh
             * 初始化 render texture。
             * @param [width]
             * @param [height]
             * @param [string]
             */
            initWithSize(width: number, height: number, format?: number): void;
            /**
             * @en Draw a texture to the specified position
             * @zh 将指定的图片渲染到指定的位置上。
             * @param {Texture2D} image
             * @param {Number} x
             * @param {Number} y
             */
            drawTextureAt(image: ImageAsset, x: number, y: number): void;
        }
        export class cocos_ui_assembler_label_bmfontUtils_FontLetterDefinition {
            u: number;
            v: number;
            width: number;
            height: number;
            offsetX: number;
            offsetY: number;
            textureID: number;
            validDefinition: boolean;
            xAdvance: number;
        }
        export interface cocos_ui_assembler_label_bmfontUtils_ILetterDefinition {
            [key: string]: cocos_ui_assembler_label_bmfontUtils_FontLetterDefinition;
        }
        export class cocos_ui_assembler_label_bmfontUtils_FontAtlas {
            get letterDefinitions(): cocos_ui_assembler_label_bmfontUtils_ILetterDefinition;
            addLetterDefinitions(letter: string, letterDefinition: cocos_ui_assembler_label_bmfontUtils_FontLetterDefinition): void;
            cloneLetterDefinition(): cocos_ui_assembler_label_bmfontUtils_ILetterDefinition;
            assignLetterDefinitions(letterDefinition: cocos_ui_assembler_label_bmfontUtils_ILetterDefinition): void;
            scaleFontLetterDefinition(scaleFactor: number): void;
            getLetterDefinitionForChar(char: string): cocos_ui_assembler_label_bmfontUtils_FontLetterDefinition;
        }
    }
    import { renderer, GFXBuffer, GFXInputAssembler, IGFXAttribute, GFXAttributeName, GFXFormat, Material, __private as ___private, math, SpriteFrame, Node, EventHandler, EventTouch, EventMouse, Component, UIRenderComponent, TTFFont, SpriteAtlas, IHtmlTextParserResultObj, PrivateNode, UIComponent, Event, Touch, RenderableComponent, GFXBlendFactor, GFXTextureView, GFXSampler, GFXPipelineState, GFXBindingLayout, js, Font, ImageAsset, Texture2D } from "cc.core";
}
