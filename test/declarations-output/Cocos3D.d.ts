/// <reference types="./@types/globals"/>
/// <reference types="./@types/ammo.js"/>
/// <reference types="./cocos/gfx/webgl/WebGL"/>
/// <reference types="./cocos/gfx/webgl2/WebGL2"/>
declare module "Cocos3D" {
    namespace renderer {
        export function createIA(device: any, data: any): any;
        var addStage: (name: any) => void;
        export enum RenderQueue {
            OPAQUE,
            TRANSPARENT,
            OVERLAY
        }
        export enum PassStage {
            DEFAULT,
            FORWARD,
            SHADOWCAST
        }
        export class Pass {
            static getBindingTypeFromHandle: (handle: number) => number;
            static getTypeFromHandle: (handle: number) => number;
            static getBindingFromHandle: (handle: number) => number;
            static getIndexFromHandle: (handle: number) => number;
            protected _buffers: Record<number, __unexported.cocos_gfx_buffer_GFXBuffer>;
            protected _samplers: Record<number, __unexported.cocos_gfx_sampler_GFXSampler>;
            protected _textureViews: Record<number, __unexported.cocos_gfx_texture_view_GFXTextureView>;
            protected _resources: __unexported.cocos_renderer_core_pass_IPassResources[];
            protected _idxInTech: number;
            protected _programName: string;
            protected _priority: __unexported.cocos_pipeline_define_RenderPriority;
            protected _primitive: __unexported.cocos_gfx_define_GFXPrimitiveMode;
            protected _stage: __unexported.cocos_pipeline_define_RenderPassStage;
            protected _bindings: __unexported.cocos_gfx_binding_layout_IGFXBinding[];
            protected _bs: __unexported.cocos_gfx_pipeline_state_GFXBlendState;
            protected _dss: __unexported.cocos_gfx_pipeline_state_GFXDepthStencilState;
            protected _rs: __unexported.cocos_gfx_pipeline_state_GFXRasterizerState;
            protected _dynamicStates: __unexported.cocos_gfx_define_GFXDynamicState[];
            protected _dynamics: __unexported.cocos_renderer_core_pass_IPassDynamics;
            protected _customizations: string[];
            protected _handleMap: Record<string, number>;
            protected _blocks: __unexported.cocos_renderer_core_pass_IBlock[];
            protected _shaderInfo: __unexported.cocos_3d_assets_effect_asset_IShaderInfo;
            protected _defines: __unexported.cocos_renderer_core_pass_IDefineMap;
            protected _phase: number;
            protected _device: __unexported.cocos_gfx_device_GFXDevice;
            protected _renderPass: __unexported.cocos_gfx_render_pass_GFXRenderPass | null;
            protected _shader: __unexported.cocos_gfx_shader_GFXShader | null;
            initialize(info: __unexported.cocos_renderer_core_pass_IPassInfoFull): void;
            getHandle(name: string): number;
            getBinding(name: string): number;
            setUniform(handle: number, value: any): void;
            setUniformArray(handle: number, value: any[]): void;
            bindBuffer(binding: number, value: __unexported.cocos_gfx_buffer_GFXBuffer): void;
            bindTextureView(binding: number, value: __unexported.cocos_gfx_texture_view_GFXTextureView): void;
            bindSampler(binding: number, value: __unexported.cocos_gfx_sampler_GFXSampler): void;
            setDynamicState(state: __unexported.cocos_gfx_define_GFXDynamicState, value: any): void;
            overridePipelineStates(original: __unexported.cocos_3d_assets_effect_asset_IPassInfo, overrides: __unexported.cocos_renderer_core_pass_PassOverrides): void;
            update(): void;
            destroy(): void;
            tryCompile(defineOverrides?: __unexported.cocos_renderer_core_pass_IDefineMap): boolean;
            createPipelineState(): __unexported.cocos_gfx_pipeline_state_GFXPipelineState | null;
            destroyPipelineState(pipelineStates: __unexported.cocos_gfx_pipeline_state_GFXPipelineState): void;
            serializePipelineStates(): string;
            protected _fillinPipelineInfo(info: __unexported.cocos_renderer_core_pass_PassOverrides): void;
            readonly idxInTech: number;
            readonly programName: string;
            readonly priority: __unexported.cocos_pipeline_define_RenderPriority;
            readonly primitive: __unexported.cocos_gfx_define_GFXPrimitiveMode;
            readonly stage: __unexported.cocos_pipeline_define_RenderPassStage;
            readonly phase: number;
            readonly bindings: __unexported.cocos_gfx_binding_layout_IGFXBinding[];
            readonly blendState: __unexported.cocos_gfx_pipeline_state_GFXBlendState;
            readonly depthStencilState: __unexported.cocos_gfx_pipeline_state_GFXDepthStencilState;
            readonly rasterizerState: __unexported.cocos_gfx_pipeline_state_GFXRasterizerState;
            readonly dynamics: __unexported.cocos_renderer_core_pass_IPassDynamics;
            readonly customizations: string[];
            readonly shader: __unexported.cocos_gfx_shader_GFXShader;
        }
        export class Effect {
            static getPassesInfo(effect: EffectAsset, techIdx: number): __unexported.cocos_3d_assets_effect_asset_IPassInfo[];
            static parseEffect(effect: EffectAsset, info: __unexported.cocos_renderer_core_effect_IEffectInfo): Pass[];
        }
        var programLib: __unexported.cocos_renderer_core_program_lib_ProgramLib;
        var samplerLib: __unexported.cocos_renderer_core_sampler_lib_SamplerLib;
        export class Light {
            enabled: any;
            color: Vec3;
            useColorTemperature: boolean;
            colorTemperature: number;
            readonly colorTemperatureRGB: Vec3;
            node: any;
            readonly type: __unexported.cocos_renderer_scene_light_LightType;
            readonly name: string;
            protected _enabled: boolean;
            protected _color: Vec3;
            protected _useColorTemp: boolean;
            protected _colorTemp: number;
            protected _colorTempRGB: Vec3;
            protected _scene: __unexported.cocos_renderer_scene_render_scene_RenderScene;
            protected _node: Node;
            protected _type: __unexported.cocos_renderer_scene_light_LightType;
            protected _name: string;
            update(): void;
        }
        export class Camera {
            private _scene;
            private _name;
            private _enabled;
            private _proj;
            private _isWindowSize;
            private _width;
            private _height;
            private _screenScale;
            private _aspect;
            private _orthoHeight;
            private _fov;
            private _nearClip;
            private _farClip;
            private _clearStencil;
            private _clearDepth;
            private _clearFlag;
            private _clearColor;
            private _viewport;
            private _isProjDirty;
            private _matView;
            private _matProj;
            private _matViewProj;
            private _matViewProjInv;
            private _frustum;
            private _forward;
            private _position;
            private _node;
            private _view;
            private _visibility;
            private _priority;
            private _aperture;
            private _apertureValue;
            private _shutter;
            private _shutterValue;
            private _iso;
            private _isoValue;
            private _ec;
            private _exposure;
            destroy(): void;
            resize(width: number, height: number): void;
            setFixedSize(width: number, height: number): void;
            update(): void;
            getSplitFrustum(out: geometry.frustum, nearClip: number, farClip: number): void;
            screenScale: any;
            enabled: any;
            readonly view: __unexported.cocos_pipeline_render_view_RenderView;
            node: Node;
            readonly isWindowSize: boolean;
            orthoHeight: any;
            projectionType: any;
            viewport: Rect;
            fov: any;
            nearClip: any;
            farClip: any;
            clearColor: any;
            clearDepth: any;
            clearStencil: any;
            clearFlag: any;
            readonly scene: __unexported.cocos_renderer_scene_render_scene_RenderScene;
            readonly name: string;
            readonly width: number;
            readonly height: number;
            readonly aspect: number;
            readonly matView: Mat4;
            readonly matProj: Mat4;
            readonly matViewProj: Mat4;
            readonly matViewProjInv: Mat4;
            readonly frustum: geometry.frustum;
            readonly forward: Vec3;
            readonly position: Vec3;
            visibility: any;
            priority: number;
            aperture: __unexported.cocos_renderer_scene_camera_CameraAperture;
            readonly apertureValue: number;
            shutter: __unexported.cocos_renderer_scene_camera_CameraShutter;
            readonly shutterValue: number;
            iso: __unexported.cocos_renderer_scene_camera_CameraISO;
            readonly isoValue: number;
            ec: number;
            readonly exposure: number;
            changeTargetDisplay(val: number): void;
            /**
                     * transform a screen position to a world space ray
                     */ screenPointToRay(out: geometry.ray, x: number, y: number): geometry.ray;
            /**
                     * transform a screen position to world space
                     */ screenToWorld(out: vmath.vec3, screenPos: vmath.vec3): vmath.vec3;
            /**
                     * transform a world space position to screen space
                     */ worldToScreen(out: vmath.vec3, worldPos: vmath.vec3): vmath.vec3;
            private updateExposure;
        }
        /**
             * A representation of a model
             */ export class Model {
            scene: __unexported.cocos_renderer_scene_render_scene_RenderScene;
            readonly id: number;
            readonly subModelNum: number;
            readonly inited: boolean;
            enabled: any;
            /**
                     * Get the hosting node of this camera
                     * @returns the hosting node
                     */ /**
                    * Set the hosting node of this model
                    * @param {Node} node the hosting node
                    */ node: Node;
            readonly worldBounds: geometry.aabb | null;
            readonly modelBounds: geometry.aabb | null;
            viewID: number;
            /**
                     * Set the user key
                     * @param {number} key
                     */ userKey: number;
            readonly uboLocal: __unexported.cocos_pipeline_define_UBOLocal;
            readonly localUBO: __unexported.cocos_gfx_buffer_GFXBuffer | null;
            readonly localBindings: Map<string, __unexported.cocos_pipeline_define_IInternalBindingInst>;
            protected _type: string;
            protected _device: __unexported.cocos_gfx_device_GFXDevice;
            protected _scene: __unexported.cocos_renderer_scene_render_scene_RenderScene;
            protected _node: Node;
            protected _id: number;
            protected _enabled: boolean;
            protected _viewID: number;
            protected _cameraID: number;
            protected _userKey: number;
            protected _worldBounds: geometry.aabb | null;
            protected _modelBounds: geometry.aabb | null;
            protected _subModels: __unexported.cocos_renderer_scene_submodel_SubModel[];
            protected _matPSORecord: Map<Material, __unexported.cocos_gfx_pipeline_state_GFXPipelineState[]>;
            protected _matRefCount: Map<Material, number>;
            protected _uboLocal: __unexported.cocos_pipeline_define_UBOLocal;
            protected _localUBO: __unexported.cocos_gfx_buffer_GFXBuffer | null;
            protected _localBindings: Map<string, __unexported.cocos_pipeline_define_IInternalBindingInst>;
            protected _inited: boolean;
            protected _uboUpdated: boolean;
            destroy(): void;
            getSubModel(idx: number): __unexported.cocos_renderer_scene_submodel_SubModel;
            updateTransform(): void;
            _resetUBOUpdateFlag(): void;
            updateUBOs(): void;
            /**
                     * Create the bounding shape of this model
                     * @param {vec3} minPos the min position of the model
                     * @param {vec3} maxPos the max position of the model
                     */ createBoundingShape(minPos?: Vec3, maxPos?: Vec3): void;
            initSubModel(idx: number, subMeshData: __unexported.cocos_3d_assets_mesh_IRenderingSubmesh, mat: Material): void;
            setSubModelMesh(idx: number, subMeshData: __unexported.cocos_3d_assets_mesh_IRenderingSubmesh): void;
            setSubModelMaterial(idx: number, mat: Material | null): void;
            onPipelineChange(): void;
            protected createPipelineState(mat: Material): __unexported.cocos_gfx_pipeline_state_GFXPipelineState[];
            protected destroyPipelineState(mat: Material, pso: __unexported.cocos_gfx_pipeline_state_GFXPipelineState[]): void;
            protected _doCreatePSO(pass: Pass): __unexported.cocos_gfx_pipeline_state_GFXPipelineState;
            protected onSetLocalBindings(mat: Material): void;
            protected initLocalBindings(mat: Material | null): void;
            private allocatePSO;
            private releasePSO;
        }
        export class ParticleBatchModel extends Model {
            private _capacity;
            private _vertAttrs;
            private _vertSize;
            private _vBuffer;
            private _vertAttrsFloatCount;
            private _vdataF32;
            private _vdataUint32;
            private _iaInfo;
            private _iaInfoBuffer;
            private _subMeshData;
            private _mesh;
            private _vertCount;
            private _indexCount;
            setCapacity(capacity: number): void;
            setVertexAttributes(mesh: Mesh | null, attrs: __unexported.cocos_gfx_input_assembler_IGFXAttribute[]): void;
            _createSubMeshData(): ArrayBuffer;
            setSubModelMaterial(idx: number, mat: Material | null): void;
            addParticleVertexData(index: number, pvdata: any[]): void;
            updateIA(count: number): void;
            clear(): void;
            destroy(): void;
            private destroySubMeshData;
        }
        export class SkinningModel extends Model {
            private _binded;
            isTextureStorage(): boolean | null;
            bindSkeleton(skeleton: Skeleton): void;
            updateJointMatrix(iMatrix: number, matrix: vmath.mat4): void;
            commitJointMatrices(): void;
            protected _doCreatePSO(pass: Pass): __unexported.cocos_gfx_pipeline_state_GFXPipelineState;
            private _destroyJointStorage;
        }
    }
    namespace vmath {
        namespace bits {
            /**
                 * Returns -1, 0, +1 depending on sign of x.
                 *
                 * @param v
                 * @return
                 */ export function sign(v: number): number;
            /**
                 * Computes absolute value of integer.
                 *
                 * @param v
                 * @return
                 */ export function abs(v: number): number;
            /**
                 * Computes minimum of integers x and y.
                 *
                 * @param x
                 * @param y
                 * @return
                 */ export function min(x: number, y: number): number;
            /**
                 * Computes maximum of integers x and y.
                 *
                 * @param x
                 * @param y
                 * @return
                 */ export function max(x: number, y: number): number;
            /**
                 * Checks if a number is a power of two.
                 *
                 * @param v
                 * @return
                 */ export function isPow2(v: number): boolean;
            /**
                 * Computes log base 2 of v.
                 *
                 * @param v
                 * @return
                 */ export function log2(v: number): number;
            /**
                 * Computes log base 10 of v.
                 *
                 * @param v
                 * @return
                 */ export function log10(v: number): 1 | 0 | 2 | 4 | 5 | 3 | 8 | 9 | 7 | 6;
            /**
                 * Counts number of bits.
                 *
                 * @param v
                 * @return
                 */ export function popCount(v: number): number;
            /**
                 * Counts number of trailing zeros.
                 *
                 * @param v
                 * @return
                 */ export function countTrailingZeros(v: number): number;
            /**
                 * Rounds to next power of 2.
                 *
                 * @param v
                 * @return
                 */ export function nextPow2(v: number): number;
            /**
                 * Rounds down to previous power of 2.
                 *
                 * @param v
                 * @return
                 */ export function prevPow2(v: number): number;
            /**
                 * Computes parity of word.
                 *
                 * @param v
                 * @return
                 */ export function parity(v: number): number;
            /**
                 * Reverse bits in a 32 bit word.
                 *
                 * @param v
                 * @return
                 */ export function reverse(v: number): number;
            /**
                 * Interleave bits of 2 coordinates with 16 bits. Useful for fast quadtree codes.
                 *
                 * @param x
                 * @param y
                 * @return
                 */ export function interleave2(x: number, y: number): number;
            /**
                 * Extracts the nth interleaved component.
                 *
                 * @param v
                 * @param n
                 * @return
                 */ export function deinterleave2(v: number, n: number): number;
            /**
                 * Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes.
                 *
                 * @param x
                 * @param y
                 * @param z
                 * @return
                 */ export function interleave3(x: number, y: number, z: number): number;
            /**
                 * Extracts nth interleaved component of a 3-tuple.
                 *
                 * @param v
                 * @param n
                 * @return
                 */ export function deinterleave3(v: number, n: number): number;
            /**
                 * Computes next combination in colexicographic order (this is
                 * mistakenly called nextPermutation on the bit twiddling hacks page).
                 *
                 * @param v
                 * @return
                 */ export function nextCombination(v: number): number;
            var INT_BITS;
            var INT_MAX;
            var INT_MIN: number;
        }
        /**
             * Mathematical 2-dimensional vector.
             *
             * x, y is alias of the first, second component of vector, respectively.
             */ export class vec2 {
            static ZERO: vec2;
            static ONE: vec2;
            static NEG_ONE: vec2;
            /**
                     * Creates a vector, with components specified separately.
                     *
                     * @param x - Value assigned to x component.
                     * @param y - Value assigned to y component.
                     * @return The newly created vector.
                     */ static create(x?: number, y?: number): vec2;
            /**
                     * Creates a zero vector.
                     *
                     * @return The newly created vector.
                     */ static zero<Out extends vec2>(out: Out): Out;
            /**
                     * Clone a vector.
                     *
                     * @param a - Vector to clone.
                     * @return The newly created vector.
                     */ static clone(a: vec2): vec2;
            /**
                     * Copy content of a vector into another.
                     *
                     * @param out - The vector to modified.
                     * @param a - The specified vector.
                     * @return out.
                     */ static copy<Out extends vec2>(out: Out, a: vec2): Out;
            /**
                     * Sets the components of a vector to the given values.
                     *
                     * @param out - The vector to modified.
                     * @param x - Value set to x component.
                     * @param y - Value set to y component.
                     * @return out.
                     */ static set<Out extends vec2>(out: Out, x: number, y: number): Out;
            /**
                     * Add two vectors.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Subtract two vectors.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static subtract<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Alias of {@link vec2.subtract}.
                     */ static sub<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Performs multiply on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Alias of {@link vec2.multiply}.
                     */ static mul<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Performs division on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static divide<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Alias of {@link vec2.divide}.
                     */ static div<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Performs Math.ceil on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static ceil<Out extends vec2>(out: Out, a: vec2): Out;
            /**
                     * Performs Math.floor on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static floor<Out extends vec2>(out: Out, a: vec2): Out;
            /**
                     * Performs Math.min on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static min<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Performs Math.min on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static max<Out extends vec2>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Performs Math.round on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static round<Out extends vec2>(out: Out, a: vec2): Out;
            /**
                     * Scales a vector with a number.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to scale.
                     * @param b - The scale number.
                     * @return out.
                     */ static scale<Out extends vec2>(out: Out, a: vec2, b: number): Out;
            /**
                     * Add two vectors after scaling the second operand by a number.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param scale - The scale number before adding.
                     * @return out.
                     */ static scaleAndAdd<Out extends vec2>(out: Out, a: vec2, b: vec2, scale: number): Out;
            /**
                     * Calculates the euclidian distance between two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Distance between a and b.
                     */ static distance(a: vec2, b: vec2): number;
            /**
                     * Alias of {@link vec2.distance}.
                     */ static dist(a: vec2, b: vec2): number;
            /**
                     * Calculates the squared euclidian distance between two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Squared distance between a and b.
                     */ static squaredDistance(a: vec2, b: vec2): number;
            /**
                     * Alias of {@link vec2.squaredDistance}.
                     */ static sqrDist(a: vec2, b: vec2): number;
            /**
                     * Calculates the length of a vector.
                     *
                     * @param a - The vector.
                     * @return Length of the vector.
                     */ static magnitude(a: vec2): number;
            /**
                     * Alias of {@link vec2.magnitude}.
                     */ static mag(a: vec2): number;
            /**
                     * Calculates the squared length of a vector.
                     *
                     * @param a - The vector.
                     * @return Squared length of the vector.
                     */ static squaredMagnitude(a: vec2): number;
            /**
                     * Alias of {@link vec2.squaredMagnitude}
                     */ static sqrMag(a: vec2): number;
            /**
                     * Negates each component of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to negate.
                     * @return out.
                     */ static negate<Out extends vec2>(out: Out, a: vec2): Out;
            /**
                     * Invert the components of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to invert.
                     * @return out.
                     */ static inverse<Out extends vec2>(out: Out, a: vec2): Out;
            /**
                     * Safely invert the components of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to invert.
                     * @return out.
                     */ static inverseSafe<Out extends vec2>(out: Out, a: vec2): Out;
            /**
                     * Normalizes a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to normalize.
                     * @return out.
                     */ static normalize<Out extends vec2>(out: Out, a: vec2): Out;
            /**
                     * Calculates the dot product of two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Dot product of a and b.
                     */ static dot(a: vec2, b: vec2): number;
            /**
                     * Calculate the cross product of two vectors.
                     * Note that the cross product must by definition produce a 3D vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static cross<Out extends vec3>(out: Out, a: vec2, b: vec2): Out;
            /**
                     * Performs a linear interpolation between two vectors.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static lerp<Out extends vec2>(out: Out, a: vec2, b: vec2, t: number): Out;
            /**
                     * Generates a random vector uniformly distributed on a circle centered at the origin.
                     *
                     * @param out - Vector to store result.
                     * @param [scale] Length of the resulting vector. If ommitted, a unit length vector will be returned.
                     * @return out.
                     */ static random<Out extends vec2>(out: Out, scale: number): Out;
            /**
                     * Transforms a vector with a 2x2 matrix.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param m - The matrix.
                     * @return out.
                     */ static transformMat2<Out extends vec2>(out: Out, a: vec2, m: mat2): Out;
            /**
                     * Transforms a vector with a 2x3 matrix.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param m - The matrix.
                     * @return out.
                     */ static transformMat23<Out extends vec2>(out: Out, a: vec2, m: mat23): Out;
            /**
                     * Transforms a vector with a 3x3 matrix.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param m - The matrix.
                     * @return out.
                     */ static transformMat3<Out extends vec2>(out: Out, a: vec2, m: mat3): Out;
            /**
                     * Transforms a vector with a 4x4 matrix.
                     * 3rd vector component is implicitly '0'.
                     * 4th vector component is implicitly '1'.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param m - The matrix.
                     * @return out.
                     */ static transformMat4<Out extends vec2>(out: Out, a: vec2, m: mat4): Out;
            /**
                     * Returns string representation of a vector.
                     *
                     * @param a - The vector.
                     * @return - String representation of this vector.
                     */ static str(a: vec2): string;
            /**
                     * Store components of a vector into array.
                     *
                     * @param out - Array to store result.
                     * @param v - The vector.
                     * @return out.
                     */ static array<Out extends IWritableArrayLike<number>>(out: Out, v: vec2, ofs?: number): Out;
            /**
                     * Returns whether the specified vectors are equal. (Compared using ===)
                     *
                     * @param a - The first vector.
                     * @param b - The second vector.
                     * @return True if the vectors are equal, false otherwise.
                     */ static exactEquals(a: vec2, b: vec2): boolean;
            /**
                     * Returns whether the specified vectors are approximately equal.
                     *
                     * @param a The first vector.
                     * @param b The second vector.
                     * @return True if the vectors are approximately equal, false otherwise.
                     */ static equals(a: vec2, b: vec2): boolean;
            /**
                     * Returns the angle between the two vectors.
                     *
                     * @param a The first vector.
                     * @param b The second vector.
                     * @return The angle in radians.
                     */ static angle(a: vec2, b: vec2): number;
            /**
                     * The x component.
                     */ x: number;
            /**
                     * The y component.
                     */ y: number;
        }
        /**
             * Mathematical 3-dimensional vector.
             *
             * x, y, z is alias of the first, second, third component of vector, respectively.
             */ export class vec3 {
            static UNIT_X: vec3;
            static UNIT_Y: vec3;
            static UNIT_Z: vec3;
            static ZERO: vec3;
            static ONE: vec3;
            static NEG_ONE: vec3;
            /**
                     * Creates a vector, with components specified separately.
                     *
                     * @param x - Value assigned to x component.
                     * @param y - Value assigned to y component.
                     * @param z - Value assigned to z component.
                     * @return The newly created vector.
                     */ static create(x?: number, y?: number, z?: number): vec3;
            /**
                     * Creates a zero vector.
                     *
                     * @return The newly created vector.
                     */ static zero<Out extends vec3>(out: Out): Out;
            /**
                     * Clone a vector.
                     *
                     * @param a - Vector to clone.
                     * @return The newly created vector.
                     */ static clone(a: vec3): vec3;
            /**
                     * Copy content of a vector into another.
                     *
                     * @param out - The vector to modified.
                     * @param a - The specified vector.
                     * @return out.
                     */ static copy<Out extends vec3>(out: Out, a: vec3): Out;
            /**
                     * Sets the components of a vector to the given values.
                     *
                     * @param out - The vector to modified.
                     * @param x - Value set to x component.
                     * @param y - Value set to y component.
                     * @param z - Value set to z component.
                     * @return out.
                     */ static set<Out extends vec3>(out: Out, x: number, y: number, z: number): Out;
            /**
                     * Add two vectors.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Subtract two vectors.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static subtract<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Alias of {@link vec3.subtract}.
                     */ static sub<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Performs multiply on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Alias of {@link vec3.multiply}.
                     */ static mul<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Performs division on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static divide<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Alias of {@link vec3.divide}.
                     */ static div<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Performs Math.ceil on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static ceil<Out extends vec3>(out: Out, a: vec3): Out;
            /**
                     * Performs Math.floor on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static floor<Out extends vec3>(out: Out, a: vec3): Out;
            /**
                     * Performs Math.min on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static min<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Performs Math.min on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static max<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Performs Math.round on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static round<Out extends vec3>(out: Out, a: vec3): Out;
            /**
                     * Scales a vector with a number.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to scale.
                     * @param b - The scale number.
                     * @return out.
                     */ static scale<Out extends vec3>(out: Out, a: vec3, b: number): Out;
            /**
                     * Add two vectors after scaling the second operand by a number.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param scale - The scale number before adding.
                     * @return out.
                     */ static scaleAndAdd<Out extends vec3>(out: Out, a: vec3, b: vec3, scale: number): Out;
            /**
                     * Calculates the euclidian distance between two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Distance between a and b.
                     */ static distance(a: vec3, b: vec3): number;
            /**
                     * Alias of {@link vec3.distance}.
                     */ static dist(a: vec3, b: vec3): number;
            /**
                     * Calculates the squared euclidian distance between two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Squared distance between a and b.
                     */ static squaredDistance(a: vec3, b: vec3): number;
            /**
                     * Alias of {@link vec3.squaredDistance}.
                     */ static sqrDist(a: vec3, b: vec3): number;
            /**
                     * Calculates the length of a vector.
                     *
                     * @param a - The vector.
                     * @return Length of the vector.
                     */ static magnitude(a: vec3): number;
            /**
                     * Alias of {@link vec3.magnitude}.
                     */ static mag(a: vec3): number;
            /**
                     * Calculates the squared length of a vector.
                     *
                     * @param a - The vector.
                     * @return Squared length of the vector.
                     */ static squaredMagnitude(a: vec3): number;
            /**
                     * Alias of {@link vec3.squaredMagnitude}
                     */ static sqrMag(a: vec3): number;
            /**
                     * Negates each component of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to negate.
                     * @return out.
                     */ static negate<Out extends vec3>(out: Out, a: vec3): Out;
            /**
                     * Inverts the components of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to invert.
                     * @return out.
                     */ static inverse<Out extends vec3>(out: Out, a: vec3): Out;
            /**
                     * Safely inverts the components of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to invert.
                     * @return out.
                     */ static inverseSafe<Out extends vec3>(out: Out, a: vec3): Out;
            /**
                     * Normalizes a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to normalize.
                     * @return out.
                     */ static normalize<Out extends vec3>(out: Out, a: vec3): Out;
            /**
                     * Calculates the dot product of two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Dot product of a and b.
                     */ static dot(a: vec3, b: vec3): number;
            /**
                     * Calculates the cross product of two vectors.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static cross<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Performs a linear interpolation between two vectors.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static lerp<Out extends vec3>(out: Out, a: vec3, b: vec3, t: number): Out;
            /**
                     * Performs a hermite interpolation with two control points.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param c - The third operand.
                     * @param d - The fourth operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static hermite<Out extends vec3>(out: Out, a: vec3, b: vec3, c: vec3, d: vec3, t: number): Out;
            /**
                     * Performs a bezier interpolation with two control points.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param c - The third operand.
                     * @param d - The fourth operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static bezier<Out extends vec3>(out: Out, a: vec3, b: vec3, c: vec3, d: vec3, t: number): Out;
            /**
                     * Generates a random vector uniformly distributed on a sphere centered at the origin.
                     *
                     * @param out - Vector to store result.
                     * @param [scale] Length of the resulting vector. If ommitted, a unit length vector will be returned.
                     * @return out.
                     */ static random<Out extends vec3>(out: Out, scale: number): Out;
            /**
                     * Transforms a point vector with a 4x4 matrix,
                     * i.e. 4th vector component is implicitly '1'.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param {mat4} m - The matrix.
                     * @return out.
                     */ static transformMat4<Out extends vec3>(out: Out, a: vec3, m: mat4): Out;
            /**
                     * Transforms a normal vector with a 4x4 matrix,
                     * i.e. 4th vector component is implicitly '0'.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param {mat4} m - The matrix.
                     * @return out.
                     */ static transformMat4Normal<Out extends vec3>(out: Out, a: vec3, m: mat4): Out;
            /**
                     * Transforms a vector with a 3x3 matrix.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param {mat3} m - The matrix.
                     * @return out.
                     */ static transformMat3<Out extends vec3>(out: Out, a: vec3, m: mat3): Out;
            /**
                     * Transforms a vector with a quaternion.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param {quat} q - The quaternion.
                     * @return out.
                     */ static transformQuat<Out extends vec3>(out: Out, a: vec3, q: quat): Out;
            /**
                     * Rotates a 3D vector around the x-axis.
                     * @param out - Vector to store result.
                     * @param a - The point to rotate.
                     * @param b - The origin of the rotation.
                     * @param c - The angle of rotation.
                     * @return out.
                     */ static rotateX<Out extends vec3>(out: Out, a: vec3, b: vec3, c: number): Out;
            /**
                     * Rotates a 3D vector around the y-axis.
                     * @param out - Vector to store result.
                     * @param a - The point to rotate.
                     * @param b - The origin of the rotation.
                     * @param c - The angle of rotation.
                     * @return out.
                     */ static rotateY<Out extends vec3>(out: Out, a: vec3, b: vec3, c: number): Out;
            /**
                     * Rotates a 3D vector around the z-axis.
                     * @param out - Vector to store result.
                     * @param a - The point to rotate.
                     * @param b - The origin of the rotation.
                     * @param c - The angle of rotation.
                     * @return out.
                     */ static rotateZ<Out extends vec3>(out: Out, a: vec3, b: vec3, c: number): Out;
            /**
                     * Returns string representation of a vector.
                     *
                     * @param a - The vector.
                     * @return - String representation of this vector.
                     */ static str(a: vec3): string;
            /**
                     * Store components of a vector into array.
                     *
                     * @param out - Array to store result.
                     * @param v - The vector.
                     * @return out.
                     */ static array<Out extends IWritableArrayLike<number>>(out: Out, v: vec3, ofs?: number): Out;
            /**
                     * Returns whether the specified vectors are equal. (Compared using ===)
                     *
                     * @param a - The first vector.
                     * @param b - The second vector.
                     * @return True if the vectors are equal, false otherwise.
                     */ static exactEquals(a: vec3, b: vec3): boolean;
            /**
                     * Returns whether the specified vectors are approximately equal.
                     *
                     * @param a The first vector.
                     * @param b The second vector.
                     * @return True if the vectors are approximately equal, false otherwise.
                     */ static equals(a: vec3, b: vec3): boolean;
            /**
                     * Gets the angle between two vectors.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return - The angle in radians.
                     */ static angle(a: vec3, b: vec3): number;
            /**
                     * Projects a vector onto a plane represented by its normal.
                     * @param out The result vector.
                     * @param a The vector.
                     * @param n The plane's normal.
                     */ static projectOnPlane<Out extends vec3>(out: Out, a: vec3, n: vec3): Out;
            /**
                     * Projects a vector onto another vector.
                     * @param out The result vector.
                     * @param a The vector to project.
                     * @param b The vector onto which the projection performs.
                     */ static project<Out extends vec3>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * The x component.
                     */ x: number;
            /**
                     * The y component.
                     */ y: number;
            /**
                     * The z component.
                     */ z: number;
        }
        /**
             * Mathematical 4-dimensional vector.
             *
             * x, y, z, w is alias of the first, second, third, fourth component of vector, respectively.
             */ export class vec4 {
            static ZERO: vec4;
            static ONE: vec4;
            static NEG_ONE: vec4;
            /**
                     * Create a vector, with components specified separately.
                     *
                     * @param x - Value assigned to x component.
                     * @param y - Value assigned to y component.
                     * @param z - Value assigned to z component.
                     * @param w - Value assigned to w component.
                     * @return The newly created vector.
                     */ static create(x?: number, y?: number, z?: number, w?: number): vec4;
            /**
                     * Creates a zero vector.
                     *
                     * @return The newly created vector.
                     */ static zero(out: vec4): vec4;
            /**
                     * Clone a vector.
                     *
                     * @param a - Vector to clone.
                     * @return The newly created vector.
                     */ static clone(a: vec4): vec4;
            /**
                     * Copy content of a vector into another.
                     *
                     * @param out - The vector to modified.
                     * @param a - The specified vector.
                     * @return out.
                     */ static copy<Out extends vec4>(out: Out, a: vec4): Out;
            /**
                     * Sets the components of a vector to the given values.
                     *
                     * @param out - The vector to modified.
                     * @param x - Value set to x component.
                     * @param y - Value set to y component.
                     * @param z - Value set to z component.
                     * @param w - Value set to w component.
                     * @return out.
                     */ static set<Out extends vec4>(out: Out, x: number, y: number, z: number, w: number): Out;
            /**
                     * Add two vectors.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Subtract two vectors.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static subtract<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Alias of {@link vec4.subtract}.
                     */ static sub<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Performs multiply on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Alias of {@link vec4.multiply}.
                     */ static mul<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Performs division on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static divide<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Alias of {@link vec4.divide}.
                     */ static div<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Performs Math.ceil on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static ceil<Out extends vec4>(out: Out, a: vec4): Out;
            /**
                     * Performs Math.floor on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static floor<Out extends vec4>(out: Out, a: vec4): Out;
            /**
                     * Performs Math.min on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static min<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Performs Math.min on each component of two vectors respectively.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static max<Out extends vec4>(out: Out, a: vec4, b: vec4): Out;
            /**
                     * Performs Math.round on each component of a vector.
                     *
                     * It doesn't matter that any amount of these parameters refer to same vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to perform operation.
                     * @return out.
                     */ static round<Out extends vec4>(out: Out, a: vec4): Out;
            /**
                     * Scales a vector with a number.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to scale.
                     * @param b - The scale number.
                     * @return out.
                     */ static scale<Out extends vec4>(out: Out, a: vec4, b: number): Out;
            /**
                     * Add two vectors after scaling the second operand by a number.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param scale - The scale number before adding.
                     * @return out.
                     */ static scaleAndAdd<Out extends vec4>(out: Out, a: vec4, b: vec4, scale: number): Out;
            /**
                     * Calculates the euclidian distance between two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Distance between a and b.
                     */ static distance(a: vec4, b: vec4): number;
            /**
                     * Alias of {@link vec4.distance}.
                     */ static dist(a: vec4, b: vec4): number;
            /**
                     * Calculates the squared euclidian distance between two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Squared distance between a and b.
                     */ static squaredDistance(a: vec4, b: vec4): number;
            /**
                     * Alias of {@link vec4.squaredDistance}.
                     */ static sqrDist(a: vec4, b: vec4): number;
            /**
                     * Calculates the length of a vector.
                     *
                     * @param a - The vector.
                     * @return Length of the vector.
                     */ static magnitude(a: vec4): number;
            /**
                     * Alias of {@link vec4.magnitude}.
                     */ static mag(a: vec4): number;
            /**
                     * Calculates the squared length of a vector.
                     *
                     * @param a - The vector.
                     * @return Squared length of the vector.
                     */ static squaredMagnitude(a: vec4): number;
            /**
                     * Alias of {@link vec4.squaredMagnitude}
                     */ static sqrMag(a: vec4): number;
            /**
                     * Negates each component of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to negate.
                     * @return out.
                     */ static negate<Out extends vec4>(out: Out, a: vec4): Out;
            /**
                     * Inverts the components of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to invert.
                     * @return out.
                     */ static inverse<Out extends vec4>(out: Out, a: vec4): Out;
            /**
                     * Safely inverts the components of a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to invert.
                     * @return out.
                     */ static inverseSafe<Out extends vec4>(out: Out, a: vec4): Out;
            /**
                     * Normalizes a vector.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to normalize.
                     * @return out.
                     */ static normalize<Out extends vec4>(out: Out, a: vec4): Out;
            /**
                     * Calculates the dot product of two vectors.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return Dot product of a and b.
                     */ static dot(a: vec4, b: vec4): number;
            /**
                     * Performs a linear interpolation between two vectors.
                     *
                     * @param out - Vector to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static lerp<Out extends vec4>(out: Out, a: vec4, b: vec4, t: number): Out;
            /**
                     * Generates a random vector uniformly distributed on a sphere centered at the origin.
                     *
                     * @param out - Vector to store result.
                     * @param [scale] Length of the resulting vector. If ommitted, a unit length vector will be returned.
                     * @return out.
                     */ static random<Out extends vec4>(out: Out, scale: number): Out;
            /**
                     * Transforms a vector with a 4x4 matrix.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param m - The matrix.
                     * @return out.
                     */ static transformMat4<Out extends vec4>(out: Out, a: vec4, m: mat4): Out;
            /**
                     * Transforms a vector with a quaternion.
                     *
                     * @param out - Vector to store result.
                     * @param a - Vector to transform.
                     * @param q - The quaternion.
                     * @return out.
                     */ static transformQuat<Out extends vec4>(out: Out, a: vec4, q: quat): Out;
            /**
                     * Returns string representation of a vector.
                     *
                     * @param a - The vector.
                     * @return - String representation of this vector.
                     */ static str(a: vec4): string;
            /**
                     * Store components of a vector into array.
                     *
                     * @param out - Array to store result.
                     * @param v - The vector.
                     * @return out.
                     */ static array<Out extends IWritableArrayLike<number>>(out: Out, v: vec4, ofs?: number): Out;
            /**
                     * Returns whether the specified vectors are equal. (Compared using ===)
                     *
                     * @param a - The first vector.
                     * @param b - The second vector.
                     * @return True if the vectors are equal, false otherwise.
                     */ static exactEquals(a: vec4, b: vec4): boolean;
            /**
                     * Returns whether the specified vectors are approximately equal.
                     *
                     * @param a The first vector.
                     * @param b The second vector.
                     * @return True if the vectors are approximately equal, false otherwise.
                     */ static equals(a: vec4, b: vec4): boolean;
            /**
                     * The x component.
                     */ x: number;
            /**
                     * The y component.
                     */ y: number;
            /**
                     * The z component.
                     */ z: number;
            /**
                     * The w component.
                     */ w: number;
        }
        /**
             * Mathematical quaternion.
             *
             * A quaternion is a hypercomplex number represented by w + xi + yj + zk, where
             * x, y, z and w are real numbers(called here its components), and i, j, and k are the fundamental quaternion units.
             */ export class quat {
            static IDENTITY: quat;
            /**
                     * Creates a quaternion, with components specified separately.
                     *
                     * @param x - Value assigned to x component.
                     * @param y - Value assigned to y component.
                     * @param z - Value assigned to z component.
                     * @param w - Value assigned to w component.
                     * @return The newly created quaternion.
                     */ static create(x?: number, y?: number, z?: number, w?: number): quat;
            /**
                     * Clone a quaternion.
                     *
                     * @param a - Quaternion to clone.
                     * @return The newly created quaternion.
                     */ static clone(a: quat): quat;
            /**
                     * Copy content of a quaternion into another.
                     *
                     * @param out - Quaternion to modified.
                     * @param a - The specified quaternion.
                     * @return out.
                     */ static copy<Out extends quat>(out: Out, a: quat): Out;
            /**
                     * Sets the components of a quaternion to the given values.
                     *
                     * @param out - The quaternion to modified.
                     * @param x - Value set to x component.
                     * @param y - Value set to y component.
                     * @param z - Value set to z component.
                     * @param w - Value set to w component.
                     * @return out.
                     */ static set<Out extends quat>(out: Out, x: number, y: number, z: number, w: number): Out;
            /**
                     * Sets a quaternion as identity quaternion.
                     *
                     * @param out - Quaternion to set.
                     * @return out.
                     */ static identity<Out extends quat>(out: Out): Out;
            /**
                     * Sets a quaternion to represent the shortest rotation from one
                     * vector to another.
                     *
                     * Both vectors are assumed to be unit length.
                     *
                     * @param out - Quaternion to set.
                     * @param a - The initial vector.
                     * @param b - The destination vector.
                     * @return out.
                     */ static rotationTo<Out extends quat>(out: Out, a: vec3, b: vec3): Out;
            /**
                     * Gets the rotation axis and angle for a given
                     *  quaternion. If a quaternion is created with
                     *  fromAxisAngle, this method will return the same
                     *  values as provided in the original parameter list
                     *  OR functionally equivalent values.
                     * Example: The quaternion formed by axis [0, 0, 1] and
                     *  angle -90 is the same as the quaternion formed by
                     *  [0, 0, 1] and 270. This method favors the latter.
                     * @param  {vec3} out_axis - Vector to store the rotation axis.
                     * @param  {quat} q - Quaternion to be decomposed.
                     * @return - Angle, in radians, of the rotation.
                     */ static getAxisAngle<Out extends vec3>(outAxis: Out, q: quat): number;
            /**
                     * Multiply two quaternions.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply<Out extends quat>(out: Out, a: quat, b: quat): Out;
            /**
                     * Alias of {@link quat.multiply}.
                     */ static mul<Out extends quat>(out: Out, a: quat, b: quat): Out;
            /**
                     * Scales a quaternion with a number.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - Quaternion to scale.
                     * @param b - The scale number.
                     * @return out.
                     */ static scale<Out extends quat>(out: Out, a: quat, b: number): Out;
            /**
                     * Rotates a quaternion by the given angle about the X axis.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - Quaternion to rotate.
                     * @param rad - Angle (in radians) to rotate.
                     * @return out.
                     */ static rotateX<Out extends quat>(out: Out, a: quat, rad: number): Out;
            /**
                     * Rotates a quaternion by the given angle about the Y axis.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - Quaternion to rotate.
                     * @param rad - Angle (in radians) to rotate.
                     * @return out.
                     */ static rotateY<Out extends quat>(out: Out, a: quat, rad: number): Out;
            /**
                     * Rotates a quaternion by the given angle about the Z axis.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - Quaternion to rotate.
                     * @param rad - Angle (in radians) to rotate.
                     * @return out.
                     */ static rotateZ<Out extends quat>(out: Out, a: quat, rad: number): Out;
            /**
                     * Rotates a quaternion by the given angle about a world space axis.
                     *
                     * @param out - Quaternion to store result.
                     * @param rot - Quaternion to rotate.
                     * @param axis - The axis around which to rotate in world space.
                     * @param rad - Angle (in radians) to rotate.
                     * @return out.
                     */ static rotateAround<Out extends quat>(out: Out, rot: quat, axis: vec3, rad: number): Out;
            /**
                     * Rotates a quaternion by the given angle about a local space axis.
                     *
                     * @param out - Quaternion to store result.
                     * @param rot - Quaternion to rotate.
                     * @param axis - The axis around which to rotate in local space.
                     * @param rad - Angle (in radians) to rotate.
                     * @return out.
                     */ static rotateAroundLocal<Out extends quat>(out: Out, rot: quat, axis: vec3, rad: number): Out;
            /**
                     * Calculates the W component of a quaternion from the X, Y, and Z components.
                     * Assumes that quaternion is 1 unit in length.
                     * Any existing W component will be ignored.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - Quaternion to calculate W.
                     * @return out.
                     */ static calculateW<Out extends quat>(out: Out, a: quat): Out;
            /**
                     * Calculates the dot product of two quaternions.
                     *
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return - The dot product of a and b.
                     */ static dot(a: quat, b: quat): number;
            /**
                     * Performs a linear interpolation between two quaternions.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static lerp<Out extends quat>(out: Out, a: quat, b: quat, t: number): Out;
            /**
                     * Performs a spherical linear interpolation between two quaternions.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static slerp<Out extends quat>(out: Out, a: quat, b: quat, t: number): Out;
            /**
                     * Performs a spherical linear interpolation with two control points.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param c - The third operand.
                     * @param d - The fourth operand.
                     * @param t - The interpolation coefficient.
                     * @return out
                     */ static sqlerp<Out extends quat>(out: Out, a: quat, b: quat, c: quat, d: quat, t: number): Out;
            /**
                     * Calculates the inverse of a quaternion.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - Quaternion to calculate inverse of.
                     * @return out.
                     */ static invert<Out extends quat>(out: Out, a: quat): Out;
            /**
                     * Calculates the conjugate of a quaternion.
                     * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - Quaternion to calculate conjugate of.
                     * @return out.
                     */ static conjugate<Out extends quat>(out: Out, a: quat): Out;
            /**
                     * Calculates the length of a quaternion.
                     *
                     * @param a - The quaternion.
                     * @return Length of the quaternion.
                     */ static magnitude(a: quat): number;
            /**
                     * Alias of {@link quat.magnitude}.
                     */ static mag(a: quat): number;
            /**
                     * Calculates the squared length of a quaternion.
                     *
                     * @param a - The quaternion.
                     * @return Squared length of the quaternion.
                     */ static squaredMagnitude(a: quat): number;
            /**
                     * Alias of {@link quat.squaredMagnitude}
                     */ static sqrMag(a: quat): number;
            /**
                     * Normalizes a quaternion.
                     *
                     * @param out - Quaternion to store result.
                     * @param a - Quaternion to normalize.
                     * @return out.
                     * @function
                     */ static normalize<Out extends quat>(out: Out, a: quat): Out;
            /**
                     * Sets the specified quaternion with values corresponding to the given
                     * axes. Each axis is a vec3 and is expected to be unit length and
                     * perpendicular to all other specified axes.
                     *
                     * @param out - Quaternion to store result.
                     * @param xAxis - Vector representing the local "right" direction.
                     * @param yAxis - Vector representing the local "up" direction.
                     * @param zAxis - Vector representing the viewing direction.
                     * @return out.
                     */ static fromAxes<Out extends quat>(out: Out, xAxis: vec3, yAxis: vec3, zAxis: vec3): Out;
            /**
                     * Calculates a quaternion from view direction and up direction
                     *
                     * @param out - Quaternion to store result.
                     * @param view - View direction (must be normalized).
                     * @param [up] - Up direction, default is (0,1,0) (must be normalized).
                     *
                     * @return out.
                     */ static fromViewUp<Out extends quat>(out: Out, view: vec3, up: vec3): Out;
            /**
                     * Sets a quaternion from the given angle and rotation axis,
                     * then returns it.
                     *
                     * @param out - Quaternion to store result.
                     * @param axis - The axis around which to rotate.
                     * @param rad - The angle in radians.
                     * @return out.
                     */ static fromAxisAngle<Out extends quat>(out: Out, axis: vec3, rad: number): Out;
            /**
                     * Creates a quaternion from the given 3x3 rotation matrix.
                     *
                     * NOTE: The resultant quaternion is not normalized, so you should be sure
                     * to re-normalize the quaternion yourself where necessary.
                     *
                     * @param out - Quaternion to store result.
                     * @param m - The rotation matrix.
                     * @return out.
                     * @function
                     */ static fromMat3<Out extends quat>(out: Out, m: mat3): Out;
            /**
                     * Creates a quaternion from the given euler angle x, y, z.
                     *
                     * @param out - Quaternion to store result.
                     * @param x - Angle to rotate around X axis in degrees.
                     * @param y - Angle to rotate around Y axis in degrees.
                     * @param z - Angle to rotate around Z axis in degrees.
                     * @return out.
                     * @function
                     */ static fromEuler<Out extends quat>(out: Out, x: number, y: number, z: number): Out;
            /**
                     *  Returns the X orthonormal axis defining the quaternion.
                     *
                     * @param out - X axis.
                     * @param q - The quaternion.
                     * @function
                     */ static toAxisX(out: vec3, q: quat): void;
            /**
                     *  Returns the Y orthonormal axis defining the quaternion.
                     *
                     * @param out - Y axis.
                     * @param q - The quaternion.
                     * @function
                     */ static toAxisY(out: vec3, q: quat): void;
            /**
                     *  Returns the Z orthonormal axis defining the quaternion.
                     *
                     * @param out - Z axis.
                     * @param q - The quaternion.
                     * @function
                     */ static toAxisZ(out: vec3, q: quat): void;
            /**
                     * Convert a quaternion back to euler angle (in degrees).
                     *
                     * @param out - Euler angle stored as a vec3
                     * @param q - the quaternion to be converted
                     * @return out.
                     */ static toEuler<Out extends vec3>(out: Out, q: quat): Out;
            /**
                     * Returns string representation of a quaternion.
                     *
                     * @param a - The quaternion.
                     * @return - String representation of this quaternion.
                     */ static str(a: quat): string;
            /**
                     * Store components of a quaternion into array.
                     *
                     * @param out - Array to store result.
                     * @param q - The quaternion.
                     * @return out.
                     */ static array<Out extends IWritableArrayLike<number>>(out: Out, q: quat): Out;
            /**
                     * Returns whether the specified quaternions are equal. (Compared using ===)
                     *
                     * @param a - The first quaternion.
                     * @param b - The second quaternion.
                     * @return True if the quaternions are equal, false otherwise.
                     */ static exactEquals(a: quat, b: quat): boolean;
            /**
                     * Returns whether the specified quaternions are approximately equal.
                     *
                     * @param a The first quaternion.
                     * @param b The second quaternion.
                     * @return True if the quaternions are approximately equal, false otherwise.
                     */ static equals(a: quat, b: quat): boolean;
            /**
                     * The x component.
                     */ x: number;
            /**
                     * The y component.
                     */ y: number;
            /**
                     * The z component.
                     */ z: number;
            /**
                     * The w component.
                     */ w: number;
        }
        /**
             * Mathematical 2x2 matrix.
             */ export class mat2 {
            /**
                     * Creates a matrix, with elements specified separately.
                     *
                     * @param m00 - Value assigned to element at column 0 row 0.
                     * @param m01 - Value assigned to element at column 0 row 1.
                     * @param m02 - Value assigned to element at column 1 row 0.
                     * @param m03 - Value assigned to element at column 1 row 1.
                     * @return The newly created matrix.
                     */ static create(m00?: number, m01?: number, m02?: number, m03?: number): mat2;
            /**
                     * Clone a matrix.
                     *
                     * @param a - Matrix to clone.
                     * @return The newly created matrix.
                     */ static clone(a: mat2): mat2;
            /**
                     * Copy content of a matrix into another.
                     *
                     * @param out - Matrix to modified.
                     * @param a - The specified matrix.
                     * @return out.
                     */ static copy<Out extends mat2>(out: Out, a: mat2): Out;
            /**
                     * Sets a matrix as identity matrix.
                     *
                     * @param out - Matrix to modified.
                     * @return out.
                     */ static identity<Out extends mat2>(out: Out): Out;
            /**
                     * Sets the elements of a matrix to the given values.
                     *
                     * @param out - The matrix to modified.
                     * @param m00 - Value assigned to element at column 0 row 0.
                     * @param m01 - Value assigned to element at column 0 row 1.
                     * @param m10 - Value assigned to element at column 1 row 0.
                     * @param m11 - Value assigned to element at column 1 row 1.
                     * @return out.
                     */ static set<Out extends mat2>(out: Out, m00: number, m01: number, m10: number, m11: number): Out;
            /**
                     * Transposes a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to transpose.
                     * @return out.
                     */ static transpose<Out extends mat2>(out: Out, a: mat2): Out;
            /**
                     * Inverts a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to invert.
                     * @return out.
                     */ static invert<Out extends mat2>(out: Out, a: mat2): Out | null;
            /**
                     * Calculates the adjugate of a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to calculate.
                     * @return out.
                     */ static adjoint<Out extends mat2>(out: Out, a: mat2): Out;
            /**
                     * Calculates the determinant of a matrix.
                     *
                     * @param a - Matrix to calculate.
                     * @return Determinant of a.
                     */ static determinant(a: mat2): number;
            /**
                     * Multiply two matrices explicitly.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply<Out extends mat2>(out: Out, a: mat2, b: mat2): Out;
            /**
                     * Alias of {@link mat2.multiply}.
                     */ static mul<Out extends mat2>(out: Out, a: mat2, b: mat2): Out;
            /**
                     * Rotates a matrix by the given angle.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to rotate.
                     * @param rad - The rotation angle.
                     * @return out
                     */ static rotate<Out extends mat2>(out: Out, a: mat2, rad: number): Out;
            /**
                     * Scales the matrix given by a scale vector.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to scale.
                     * @param v - The scale vector.
                     * @return out
                     */ static scale<Out extends mat2>(out: Out, a: mat2, v: vec2): Out;
            /**
                     * Creates a matrix from a given angle.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat2.set(dest, 1, 0, 0, 1);
                     *     mat2.rotate(dest, dest, rad);
                     *
                     * @param out - Matrix to store result.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static fromRotation<Out extends mat2>(out: Out, rad: number): Out;
            /**
                     * Creates a matrix from a scale vector.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat2.set(dest, 1, 0, 0, 1);
                     *     mat2.scale(dest, dest, vec);
                     *
                     * @param out - Matrix to store result.
                     * @param v - Scale vector.
                     * @return out.
                     */ static fromScaling<Out extends mat2>(out: Out, v: vec2): Out;
            /**
                     * Returns a string representation of a matrix.
                     *
                     * @param a - The matrix.
                     * @return String representation of this matrix.
                     */ static str(a: mat2): string;
            /**
                     * Store elements of a matrix into array.
                     *
                     * @param out - Array to store result.
                     * @param m - The matrix.
                     * @return out.
                     */ static array<Out extends IWritableArrayLike<number>>(out: Out, m: mat2, ofs?: number): Out;
            /**
                     * Returns Frobenius norm of a matrix.
                     *
                     * @param a - Matrix to calculate Frobenius norm of.
                     * @return - The frobenius norm.
                     */ static frob(a: mat2): number;
            /**
                     * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix.
                     * @param L - The lower triangular matrix.
                     * @param D - The diagonal matrix.
                     * @param U - The upper triangular matrix.
                     * @param a - The input matrix to factorize.
                     */ static LDU(L: mat2, D: mat2, U: mat2, a: mat2): void;
            /**
                     * Adds two matrices.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add<Out extends mat2>(out: Out, a: mat2, b: mat2): Out;
            /**
                     * Subtracts matrix b from matrix a.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static subtract<Out extends mat2>(out: Out, a: mat2, b: mat2): Out;
            /**
                     * Alias of {@link mat2.subtract}.
                     */ static sub<Out extends mat2>(out: Out, a: mat2, b: mat2): Out;
            /**
                     * Returns whether the specified matrices are equal. (Compared using ===)
                     *
                     * @param a - The first matrix.
                     * @param b - The second matrix.
                     * @return True if the matrices are equal, false otherwise.
                     */ static exactEquals(a: mat2, b: mat2): boolean;
            /**
                     * Returns whether the specified matrices are approximately equal.
                     *
                     * @param a - The first matrix.
                     * @param b - The second matrix.
                     * @return True if the matrices are equal, false otherwise.
                     */ static equals(a: mat2, b: mat2): boolean;
            /**
                     * Multiply each element of a matrix by a scalar number.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to scale
                     * @param b - The scale number.
                     * @return out.
                     */ static multiplyScalar<Out extends mat2>(out: Out, a: mat2, b: number): Out;
            /**
                     * Adds two matrices after multiplying each element of the second operand by a scalar number.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param scale - The scale number.
                     * @return out.
                     */ static multiplyScalarAndAdd<Out extends mat2>(out: Out, a: mat2, b: mat2, scale: number): Out;
            /**
                     * The element at column 0 row 0.
                     */ m00: number;
            /**
                     * The element at column 0 row 1.
                     */ m01: number;
            /**
                     * The element at column 1 row 0.
                     */ m02: number;
            /**
                     * The element at column 1 row 1.
                     */ m03: number;
        }
        /**
             * Mathematical 2x3 matrix.
             *
             * A mat23 contains six elements defined as:
             * <pre>
             * [a, c, tx,
             *  b, d, ty]
             * </pre>
             * This is a short form for the 3x3 matrix:
             * <pre>
             * [a, c, tx,
             *  b, d, ty,
             *  0, 0, 1]
             * </pre>
             * The last row is ignored so the array is shorter and operations are faster.
             */ class mat23 {
            /**
                     * Creates a matrix, with elements specified separately.
                     *
                     * @param m00 -  Value assigned to element a.
                     * @param m01 -  Value assigned to element b.
                     * @param m02 -  Value assigned to element c.
                     * @param m03 -  Value assigned to element d.
                     * @param m04 -  Value assigned to element tx.
                     * @param m05 -  Value assigned to element ty.
                     * @return The newly created matrix.
                     */ static create(m00?: number, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number): mat23;
            /**
                     * Clone a matrix.
                     *
                     * @param a - Matrix to clone.
                     * @return The newly created matrix.
                     */ static clone(a: mat23): mat23;
            /**
                     * Copy content of a matrix into another.
                     *
                     * @param out - Matrix to modified.
                     * @param a - The specified matrix.
                     * @return out.
                     */ static copy<Out extends mat23>(out: Out, a: mat23): Out;
            /**
                     * Sets a matrix as identity matrix.
                     *
                     * @param out - Matrix to modified.
                     * @return out.
                     */ static identity<Out extends mat23>(out: Out): Out;
            /**
                     * Sets the elements of a matrix to the given values.
                     *
                     * @param out - The matrix to modified.
                     * @param a - Value assigned to element a.
                     * @param b - Value assigned to element b.
                     * @param c - Value assigned to element c.
                     * @param d - Value assigned to element d.
                     * @param tx - Value assigned to element tx.
                     * @param ty - Value assigned to element ty.
                     * @return out.
                     */ static set<Out extends mat23>(out: Out, a: number, b: number, c: number, d: number, tx: number, ty: number): Out;
            /**
                     * Inverts a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to invert.
                     * @return out.
                     */ static invert<Out extends mat23>(out: Out, a: mat23): Out | null;
            /**
                     * Calculates the determinant of a matrix.
                     *
                     * @param a - Matrix to calculate.
                     * @return Determinant of a.
                     */ static determinant(a: mat23): number;
            /**
                     * Multiply two matrices explicitly.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply<Out extends mat23>(out: Out, a: mat23, b: mat23): Out;
            /**
                     * Alias of {@link mat23.multiply}.
                     */ static mul<Out extends mat23>(out: Out, a: mat23, b: mat23): Out;
            /**
                     * Rotates a matrix by the given angle.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to rotate.
                     * @param rad - The rotation angle.
                     * @return out
                     */ static rotate<Out extends mat23>(out: Out, a: mat23, rad: number): Out;
            /**
                     * Multiply a matrix with a scale matrix given by a scale vector.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param v - The scale vector.
                     * @return out
                     */ static scale<Out extends mat23>(out: Out, a: mat23, v: vec2): Out;
            /**
                     * Multiply a matrix with a translation matrix given by a translation offset.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param v - The translation offset.
                     * @return out.
                     */ static translate<Out extends mat23>(out: Out, a: mat23, v: vec2): Out;
            /**
                     * Creates a matrix from a given angle.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat23.identity(dest);
                     *     mat23.rotate(dest, dest, rad);
                     *
                     * @param out - Matrix to store result.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static fromRotation<Out extends mat23>(out: Out, rad: number): Out;
            /**
                     * Creates a matrix from a scale vector.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat23.identity(dest);
                     *     mat23.scale(dest, dest, vec);
                     *
                     * @param out - Matrix to store result.
                     * @param v - Scale vector.
                     * @return out.
                     */ static fromScaling<Out extends mat23>(out: Out, v: mat23): Out;
            /**
                     * Creates a matrix from a translation offset.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat23.identity(dest);
                     *     mat23.translate(dest, dest, vec);
                     *
                     * @param out - Matrix to store result.
                     * @param v - The translation offset.
                     * @return out.
                     */ static fromTranslation<Out extends mat23>(out: Out, v: vec2): Out;
            /**
                     * Creates a matrix from a rotation, translation offset and scale vector.
                     * This is equivalent to (but faster than):
                     *
                     *     mat23.identity(dest);
                     *     mat23.translate(dest, vec);
                     *     let tmp = mat23.create();
                     *     mat23.fromRotation(tmp, rot);
                     *     mat23.multiply(dest, dest, tmp);
                     *     mat23.fromScaling(tmp, scale);
                     *     mat23.multiply(dest, dest, tmp);
                     *
                     * @param out - Matrix to store result.
                     * @param r - Rotation radian.
                     * @param t - Translation offset.
                     * @param s - Scale vector.
                     * @return out.
                     */ static fromRTS<Out extends mat23>(out: Out, r: number, t: vec2, s: vec2): Out;
            /**
                     * Returns a string representation of a matrix.
                     *
                     * @param a - The matrix.
                     * @return String representation of this matrix.
                     */ static str(a: mat23): string;
            /**
                     * Store elements of a matrix into array.
                     *
                     * @param out - Array to store result.
                     * @param m - The matrix.
                     * @return out.
                     */ static array<Out extends IWritableArrayLike<number>>(out: Out, m: mat23): Out;
            /**
                     * Store elements of a matrix into 16 floats array.
                     *
                     * @param out
                     * @param m
                     * @return
                     */ static array4x4<Out extends IWritableArrayLike<number>>(out: Out, m: mat23): Out;
            /**
                     * Returns Frobenius norm of a matrix.
                     *
                     * @param a - Matrix to calculate Frobenius norm of.
                     * @return - The frobenius norm.
                     */ static frob(a: mat23): number;
            /**
                     * Adds two matrices.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add<Out extends mat23>(out: Out, a: mat23, b: mat23): Out;
            /**
                     * Subtracts matrix b from matrix a.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static subtract<Out extends mat23>(out: Out, a: mat23, b: mat23): Out;
            /**
                     * Alias of {@link mat23.subtract}.
                     */ static sub<Out extends mat23>(out: Out, a: mat23, b: mat23): Out;
            /**
                     * Multiply each element of a matrix by a scalar number.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to scale
                     * @param b - The scale number.
                     * @return out.
                     */ static multiplyScalar<Out extends mat23>(out: Out, a: mat23, b: number): Out;
            /**
                     * Adds two matrices after multiplying each element of the second operand by a scalar number.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param scale - The scale number.
                     * @return out.
                     */ static multiplyScalarAndAdd<Out extends mat23>(out: Out, a: mat23, b: mat23, scale: number): Out;
            /**
                     * Returns whether the specified matrices are equal. (Compared using ===)
                     *
                     * @param a - The first matrix.
                     * @param b - The second matrix.
                     * @return True if the matrices are equal, false otherwise.
                     */ static exactEquals(a: mat23, b: mat23): boolean;
            /**
                     * Returns whether the specified matrices are approximately equal.
                     *
                     * @param a - The first matrix.
                     * @param b - The second matrix.
                     * @return True if the matrices are equal, false otherwise.
                     */ static equals(a: mat23, b: mat23): boolean;
            /**
                     * The element a.
                     */ m00: number;
            /**
                     * The element b.
                     */ m01: number;
            /**
                     * The element c.
                     */ m02: number;
            /**
                     * The element d.
                     */ m03: number;
            /**
                     * The element tx.
                     */ m04: number;
            /**
                     * The element ty.
                     */ m05: number;
        }
        /**
             * Mathematical 3x3 matrix.
             *
             * NOTE: we use column-major matrix for all matrix calculation.
             *
             * This may lead to some confusion when referencing OpenGL documentation,
             * however, which represents out all matricies in column-major format.
             * This means that while in code a matrix may be typed out as:
             *
             * [1, 0, 0, 0,
             *  0, 1, 0, 0,
             *  0, 0, 1, 0,
             *  x, y, z, 0]
             *
             * The same matrix in the
             * [OpenGL documentation](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glTranslate.xml)
             * is written as:
             *
             *  1 0 0 x
             *  0 1 0 y
             *  0 0 1 z
             *  0 0 0 0
             *
             * Please rest assured, however, that they are the same thing!
             * This is not unique to glMatrix, either, as OpenGL developers have long been confused by the
             * apparent lack of consistency between the memory layout and the documentation.
             */ class mat3 {
            /**
                     * Creates a matrix, with elements specified separately.
                     *
                     * @param m00 - Value assigned to element at column 0 row 0.
                     * @param m01 - Value assigned to element at column 0 row 1.
                     * @param m02 - Value assigned to element at column 0 row 2.
                     * @param m03 - Value assigned to element at column 1 row 0.
                     * @param m04 - Value assigned to element at column 1 row 1.
                     * @param m05 - Value assigned to element at column 1 row 2.
                     * @param m06 - Value assigned to element at column 2 row 0.
                     * @param m07 - Value assigned to element at column 2 row 1.
                     * @param m08 - Value assigned to element at column 2 row 2.
                     * @return The newly created matrix.
                     */ static create(m00?: number, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number, m06?: number, m07?: number, m08?: number): mat3;
            /**
                     * Clone a matrix.
                     *
                     * @param a - Matrix to clone.
                     * @return The newly created matrix.
                     */ static clone(a: any): mat3;
            /**
                     * Copy content of a matrix into another.
                     *
                     * @param out - Matrix to modified.
                     * @param a - The specified matrix.
                     * @return out.
                     */ static copy(out: any, a: any): any;
            /**
                     * Sets the elements of a matrix to the given values.
                     *
                     * @param out - The matrix to modified.
                     * @param m00 - Value assigned to element at column 0 row 0.
                     * @param m01 - Value assigned to element at column 0 row 1.
                     * @param m02 - Value assigned to element at column 0 row 2.
                     * @param m10 - Value assigned to element at column 1 row 0.
                     * @param m11 - Value assigned to element at column 1 row 1.
                     * @param m12 - Value assigned to element at column 1 row 2.
                     * @param m20 - Value assigned to element at column 2 row 0.
                     * @param m21 - Value assigned to element at column 2 row 1.
                     * @param m22 - Value assigned to element at column 2 row 2.
                     * @return out.
                     */ static set(out: any, m00: any, m01: any, m02: any, m10: any, m11: any, m12: any, m20: any, m21: any, m22: any): any;
            /**
                     * return an identity matrix.
                     *
                     * @return out.
                     */ static identity(out: any): any;
            /**
                     * Transposes a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to transpose.
                     * @return out.
                     */ static transpose(out: any, a: any): any;
            /**
                     * Inverts a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to invert.
                     * @return out.
                     */ static invert(out: any, a: any): any;
            /**
                     * Calculates the adjugate of a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to calculate.
                     * @return out.
                     */ static adjoint(out: any, a: any): any;
            /**
                     * Calculates the determinant of a matrix.
                     *
                     * @param a - Matrix to calculate.
                     * @return Determinant of a.
                     */ static determinant(a: any): number;
            /**
                     * Multiply two matrices explicitly.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply(out: any, a: any, b: any): any;
            /**
                     * Alias of {@link mat3.multiply}.
                     */ static mul(out: any, a: any, b: any): any;
            /**
                     * Multiply a matrix with a translation matrix given by a translation offset.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param v - The translation offset.
                     * @return out.
                     */ static translate(out: any, a: any, v: any): any;
            /**
                     * Rotates a matrix by the given angle.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to rotate.
                     * @param rad - The rotation angle.
                     * @return out
                     */ static rotate(out: any, a: any, rad: any): any;
            /**
                     * Multiply a matrix with a scale matrix given by a scale vector.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param v - The scale vector.
                     * @return out
                     */ static scale(out: any, a: any, v: any): any;
            /**
                     * Copies the upper-left 3x3 values of a 4x4 matrix into a 3x3 matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The 4x4 matrix.
                     * @return out.
                     */ static fromMat4(out: any, a: any): any;
            /**
                     * Creates a matrix from a translation offset.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat3.identity(dest);
                     *     mat3.translate(dest, dest, vec);
                     *
                     * @param out - Matrix to store result.
                     * @param v - The translation offset.
                     * @return out.
                     */ static fromTranslation(out: any, v: any): any;
            /**
                     * Creates a matrix from a given angle.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat3.identity(dest);
                     *     mat3.rotate(dest, dest, rad);
                     *
                     * @param out - Matrix to store result.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static fromRotation(out: any, rad: any): any;
            /**
                     * Creates a matrix from a scale vector.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat3.identity(dest);
                     *     mat3.scale(dest, dest, vec);
                     *
                     * @param out - Matrix to store result.
                     * @param v - Scale vector.
                     * @return out.
                     */ static fromScaling(out: any, v: any): any;
            /**
                     * Copies the values from a 2x3 matrix into a 3x3 matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The 2x3 matrix.
                     * @return out.
                     */ static fromMat2d(out: any, a: any): any;
            /**
                     * Calculates a 3x3 matrix from the given quaternion.
                     *
                     * @param out - Matrix to store result.
                     * @param q - The quaternion.
                     *
                     * @return out.
                     */ static fromQuat(out: any, q: any): any;
            /**
                     * Calculates a 3x3 matrix from view direction and up direction.
                     *
                     * @param out - Matrix to store result.
                     * @param view - View direction (must be normalized).
                     * @param [up] - Up direction, default is (0,1,0) (must be normalized).
                     *
                     * @return out
                     */ static fromViewUp(_out: any, _view: any, _up: any): any;
            /**
                     * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - A 4x4 matrix to derive the normal matrix from.
                     *
                     * @return out.
                     */ static normalFromMat4(out: any, a: any): any;
            /**
                     * Returns a string representation of a matrix.
                     *
                     * @param a - The matrix.
                     * @return String representation of this matrix.
                     */ static str(a: any): string;
            /**
                     * Store elements of a matrix into array.
                     *
                     * @param out - Array to store result.
                     * @param m - The matrix.
                     * @return out.
                     */ static array(out: any, m: any, ofs?: number): any;
            /**
                     * Returns Frobenius norm of a matrix.
                     *
                     * @param a - Matrix to calculate Frobenius norm of.
                     * @return - The frobenius norm.
                     */ static frob(a: any): number;
            /**
                     * Adds two matrices.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add(out: any, a: any, b: any): any;
            /**
                     * Subtracts matrix b from matrix a.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static subtract(out: any, a: any, b: any): any;
            /**
                     * Alias of {@link mat3.subtract}.
                     */ static sub(out: any, a: any, b: any): any;
            /**
                     * Multiply each element of a matrix by a scalar number.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to scale
                     * @param b - The scale number.
                     * @return out.
                     */ static multiplyScalar(out: any, a: any, b: any): any;
            /**
                     * Adds two matrices after multiplying each element of the second operand by a scalar number.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param scale - The scale number.
                     * @return out.
                     */ static multiplyScalarAndAdd(out: any, a: any, b: any, scale: any): any;
            /**
                     * Returns whether the specified matrices are equal. (Compared using ===)
                     *
                     * @param a - The first matrix.
                     * @param b - The second matrix.
                     * @return True if the matrices are equal, false otherwise.
                     */ static exactEquals(a: any, b: any): boolean;
            /**
                     * Returns whether the specified matrices are approximately equal.
                     *
                     * @param a - The first matrix.
                     * @param b - The second matrix.
                     * @return True if the matrices are equal, false otherwise.
                     */ static equals(a: any, b: any): boolean;
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
        /**
             * Mathematical 4x4 matrix.
             *
             * NOTE: we use column-major matrix for all matrix calculation.
             *
             * This may lead to some confusion when referencing OpenGL documentation,
             * however, which represents out all matricies in column-major format.
             * This means that while in code a matrix may be typed out as:
             *
             * [1, 0, 0, 0,
             *  0, 1, 0, 0,
             *  0, 0, 1, 0,
             *  x, y, z, 0]
             *
             * The same matrix in the [OpenGL documentation](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glTranslate.xml)
             * is written as:
             *
             *  1 0 0 x
             *  0 1 0 y
             *  0 0 1 z
             *  0 0 0 0
             *
             * Please rest assured, however, that they are the same thing!
             * This is not unique to glMatrix, either, as OpenGL developers have long been confused by the
             * apparent lack of consistency between the memory layout and the documentation.
             */ class mat4 {
            /**
                     * Inverts a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to invert.
                     * @return out.
                     */ static invert: (out: any, a: any) => any;
            /**
                     * Creates a matrix, with elements specified separately.
                     *
                     * @param m00 - Value assigned to element at column 0 row 0.
                     * @param m01 - Value assigned to element at column 0 row 1.
                     * @param m02 - Value assigned to element at column 0 row 2.
                     * @param m03 - Value assigned to element at column 0 row 3.
                     * @param m04 - Value assigned to element at column 1 row 0.
                     * @param m05 - Value assigned to element at column 1 row 1.
                     * @param m06 - Value assigned to element at column 1 row 2.
                     * @param m07 - Value assigned to element at column 1 row 3.
                     * @param m08 - Value assigned to element at column 2 row 0.
                     * @param m09 - Value assigned to element at column 2 row 1.
                     * @param m10 - Value assigned to element at column 2 row 2.
                     * @param m11 - Value assigned to element at column 2 row 3.
                     * @param m12 - Value assigned to element at column 3 row 0.
                     * @param m13 - Value assigned to element at column 3 row 1.
                     * @param m14 - Value assigned to element at column 3 row 2.
                     * @param m15 - Value assigned to element at column 3 row 3.
                     * @return The newly created matrix.
                     */ static create(m00?: number, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number, m06?: number, m07?: number, m08?: number, m09?: number, m10?: number, m11?: number, m12?: number, m13?: number, m14?: number, m15?: number): mat4;
            /**
                     * Clone a matrix.
                     *
                     * @param a - Matrix to clone.
                     * @return The newly created matrix.
                     */ static clone(a: any): mat4;
            /**
                     * Copy content of a matrix into another.
                     *
                     * @param out - Matrix to modified.
                     * @param a - The specified matrix.
                     * @return out.
                     */ static copy(out: any, a: any): any;
            /**
                     * Sets the elements of a matrix to the given values.
                     *
                     * @param out - The matrix to modified.
                     * @param m00 - Value assigned to element at column 0 row 0.
                     * @param m01 - Value assigned to element at column 0 row 1.
                     * @param m02 - Value assigned to element at column 0 row 2.
                     * @param m03 - Value assigned to element at column 0 row 3.
                     * @param m10 - Value assigned to element at column 1 row 0.
                     * @param m11 - Value assigned to element at column 1 row 1.
                     * @param m12 - Value assigned to element at column 1 row 2.
                     * @param m13 - Value assigned to element at column 1 row 3.
                     * @param m20 - Value assigned to element at column 2 row 0.
                     * @param m21 - Value assigned to element at column 2 row 1.
                     * @param m22 - Value assigned to element at column 2 row 2.
                     * @param m23 - Value assigned to element at column 2 row 3.
                     * @param m30 - Value assigned to element at column 3 row 0.
                     * @param m31 - Value assigned to element at column 3 row 1.
                     * @param m32 - Value assigned to element at column 3 row 2.
                     * @param m33 - Value assigned to element at column 3 row 3.
                     * @return out.
                     */ static set(out: any, m00: any, m01: any, m02: any, m03: any, m10: any, m11: any, m12: any, m13: any, m20: any, m21: any, m22: any, m23: any, m30: any, m31: any, m32: any, m33: any): any;
            /**
                     * Sets a matrix as identity matrix.
                     *
                     * @param out - Matrix to modified.
                     * @return out.
                     */ static identity(out: any): any;
            /**
                     * Transposes a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to transpose.
                     * @return out.
                     */ static transpose(out: any, a: any): any;
            /**
                     * Calculates the adjugate of a matrix.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to calculate.
                     * @return out.
                     */ static adjoint(out: any, a: any): any;
            /**
                     * Calculates the determinant of a matrix.
                     *
                     * @param a - Matrix to calculate.
                     * @return Determinant of a.
                     */ static determinant(a: any): number;
            /**
                     * Multiply two matrices explicitly.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply(out: any, a: any, b: any): any;
            /**
                     * Alias of {@link mat4.multiply}.
                     */ static mul(out: any, a: any, b: any): any;
            /**
                     * Multiply a matrix with a translation matrix given by a translation offset.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param v - The translation offset.
                     * @return out.
                     */ static translate(out: any, a: any, v: any): any;
            /**
                     * Multiply a matrix with a scale matrix given by a scale vector.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param v - The scale vector.
                     * @return out
                     */ static scale(out: any, a: any, v: any): any;
            /**
                     * Multiply a matrix with a rotation matrix denotes by the rotation around arbitrary axis.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param rad - The rotation angle.
                     * @param axis - The rotation axis.
                     * @return out.
                     */ static rotate(out: any, a: any, rad: any, axis: any): any;
            /**
                     * Multiply a matrix with a rotation matrix denotes by the rotation around x-axis.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static rotateX(out: any, a: any, rad: any): any;
            /**
                     * Multiply a matrix with a rotation matrix denotes by the rotation around y-axis.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static rotateY(out: any, a: any, rad: any): any;
            /**
                     * Multiply a matrix with a rotation matrix denotes by the rotation around z-axis.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to multiply.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static rotateZ(out: any, a: any, rad: any): any;
            /**
                     * Create a translation matrix from a translation offset.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.translate(dest, dest, vec);
                     *
                     * @param out - Matrix to store result.
                     * @param v - The translation offset.
                     * @return out.
                     */ static fromTranslation(out: any, v: any): any;
            /**
                     * Creates a scale matrix from a scale vector.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.scale(dest, dest, vec);
                     *
                     * @param out - Matrix to store result.
                     * @param v - The scale vector.
                     * @return out.
                     */ static fromScaling(out: any, v: any): any;
            /**
                     * Creates a rotation matrix from the rotation around arbitrary axis.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.rotate(dest, dest, rad, axis);
                     *
                     * @param out - Matrix to store result.
                     * @param rad - The rotation angle.
                     * @param axis - The rotation axis.
                     * @return out.
                     */ static fromRotation(out: any, rad: any, axis: any): any;
            /**
                     * Creates a rotation matrix from the rotation around x-axis.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.rotateX(dest, dest, rad);
                     *
                     * @param out - Matrix to store result.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static fromXRotation(out: any, rad: any): any;
            /**
                     * Creates a rotation matrix from the rotation around y-axis.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.rotateY(dest, dest, rad);
                     *
                     * @param out - Matrix to store result.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static fromYRotation(out: any, rad: any): any;
            /**
                     * Creates a rotation matrix from the rotation around z-axis.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.rotateZ(dest, dest, rad);
                     *
                     * @param out - Matrix to store result.
                     * @param rad - The rotation angle.
                     * @return out.
                     */ static fromZRotation(out: any, rad: any): any;
            /**
                     * Creates a matrix from a quaternion rotation and a translation offset.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.translate(dest, vec);
                     *     let quatMat = mat4.create();
                     *     quat.toMat4(quat, quatMat);
                     *     mat4.multiply(dest, quatMat);
                     *
                     * @param out - Matrix to store result.
                     * @param q - Rotation quaternion.
                     * @param v - Translation vector.
                     * @return out.
                     */ static fromRT(out: any, q: any, v: any): any;
            /**
                     * Returns the translation vector component of a transformation
                     *  matrix. If a matrix is built with fromRT,
                     *  the returned vector will be the same as the translation offset
                     *  originally supplied.
                     * @param  {vec3} out - Vector to store result.
                     * @param  {mat4} mat - Matrix to be decomposed.
                     * @return out.
                     */ static getTranslation(out: any, mat: any): any;
            /**
                     * Returns the scale component of a transformation
                     *  matrix. If a matrix is built with fromRTS
                     *  with a normalized Quaternion parameter, the returned vector will be
                     *  the same as the scale vector
                     *  originally supplied.
                     * @param  {vec3} out - Vector to store result.
                     * @param  {mat4} mat - Matrix to be decomposed.
                     * @return out.
                     */ static getScaling(out: any, mat: any): any;
            /**
                     * Returns a quaternion representing the rotational component
                     *  of a transformation matrix. If a matrix is built with
                     *  fromRT, the returned quaternion will be the
                     *  same as the quaternion originally supplied.
                     * @param out - Quaternion to store result.
                     * @param mat - Matrix to be decomposed.
                     * @return out.
                     */ static getRotation(out: any, mat: any): any;
            /**
                     * Creates a matrix from a quaternion rotation, translation offset and scale vector.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.translate(dest, vec);
                     *     let quatMat = mat4.create();
                     *     quat.toMat4(quat, quatMat);
                     *     mat4.multiply(dest, quatMat);
                     *     mat4.scale(dest, scale)
                     *
                     * @param out mat4 - Matrix to store result.
                     * @param q - Rotation quaternion.
                     * @param v - Translation offset.
                     * @param s - Scale vector.
                     * @return out.
                     */ static fromRTS(out: any, q: any, v: any, s: any): any;
            /**
                     * Creates a matrix from a quaternion rotation, translation offset and scale vector,
                     * rotating and scaling around the given origin.
                     * This is equivalent to (but much faster than):
                     *
                     *     mat4.identity(dest);
                     *     mat4.translate(dest, vec);
                     *     mat4.translate(dest, origin);
                     *     let quatMat = mat4.create();
                     *     quat.toMat4(quat, quatMat);
                     *     mat4.multiply(dest, quatMat);
                     *     mat4.scale(dest, scale)
                     *     mat4.translate(dest, negativeOrigin);
                     *
                     * @param out mat4 - Matrix to store result.
                     * @param q - Rotation quaternion.
                     * @param v - Translation offset.
                     * @param s - Scale vector.
                     * @param o The origin vector around which to scale and rotate.
                     * @return out.
                     */ static fromRTSOrigin(out: any, q: any, v: any, s: any, o: any): any;
            /**
                     * Calculates a 4x4 matrix from the given quaternion.
                     *
                     * @param out mat4 - Matrix to store result.
                     * @param q - Quaternion to create matrix from.
                     *
                     * @return out.
                     */ static fromQuat(out: any, q: any): any;
            /**
                     * Generates a frustum matrix with the given bounds.
                     *
                     * @param out mat4 - Matrix to store result.
                     * @param left - Left bound of the frustum.
                     * @param right - Right bound of the frustum.
                     * @param bottom - Bottom bound of the frustum.
                     * @param top - Top bound of the frustum.
                     * @param near - Near bound of the frustum.
                     * @param far - Far bound of the frustum.
                     * @return out.
                     */ static frustum(out: any, left: any, right: any, bottom: any, top: any, near: any, far: any): any;
            /**
                     * Generates a perspective projection matrix with the given bounds.
                     *
                     * @param out - Matrix to store result.
                     * @param fovy - Vertical field of view in radians.
                     * @param aspect - Aspect ratio. typically viewport width/height.
                     * @param near - Near bound of the frustum.
                     * @param far - Far bound of the frustum.
                     * @return out.
                     */ static perspective(out: any, fovy: any, aspect: any, near: any, far: any): any;
            /**
                     * Generates a perspective projection matrix with the given field of view.
                     * This is primarily useful for generating projection matrices to be used
                     * with the still experiemental WebVR API.
                     *
                     * @param out - Matrix to store result.
                     * @param fov - Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees.
                     * @param near - Near bound of the frustum.
                     * @param far - Far bound of the frustum.
                     * @return out.
                     */ static perspectiveFromFieldOfView(out: any, fov: any, near: any, far: any): any;
            /**
                     * Generates a orthogonal projection matrix with the given bounds.
                     *
                     * @param out - Matrix to store result.
                     * @param left - Left bound of the frustum.
                     * @param right - Right bound of the frustum.
                     * @param bottom - Bottom bound of the frustum.
                     * @param top - Top bound of the frustum.
                     * @param near - Near bound of the frustum.
                     * @param far - Far bound of the frustum.
                     * @return out.
                     */ static ortho(out: any, left: any, right: any, bottom: any, top: any, near: any, far: any): any;
            /**
                     * Generates a look-at matrix with the given eye position, focal point, and up axis.
                     * `eye - center` mustn't be zero vector or parallel to `up`
                     *
                     * @param out - Matrix to store result.
                     * @param eye - Position of the viewer.
                     * @param center - Point the viewer is looking at.
                     * @param up - Vector pointing up.
                     * @return out
                     */ static lookAt(out: any, eye: any, center: any, up: any): any;
            /**
                     * Returns a string representation of a matrix.
                     *
                     * @param a - The matrix.
                     * @return String representation of this matrix.
                     */ static str(a: any): string;
            /**
                     * Calculates normal matrix (transpose inverse).
                     *
                     * @param out - Matrix to store result.
                     * @param a - A 4x4 matrix to derive the normal matrix from.
                     *
                     * @return out.
                     */ static normalMatrix(out: any, a: any): any;
            /**
                     * Store elements of a matrix into array.
                     *
                     * @param out - Array to store result.
                     * @param m - The matrix.
                     * @return out.
                     */ static array(out: any, m: any, ofs?: number): any;
            /**
                     * Returns Frobenius norm of a matrix.
                     *
                     * @param a - Matrix to calculate Frobenius norm of.
                     * @return - The frobenius norm.
                     */ static frob(a: any): number;
            /**
                     * Adds two matrices.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add(out: any, a: any, b: any): any;
            /**
                     * Subtracts matrix b from matrix a.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static subtract(out: any, a: any, b: any): any;
            /**
                     * Alias of {@link mat4.subtract}.
                     */ static sub(out: any, a: any, b: any): any;
            /**
                     * Multiply each element of a matrix by a scalar number.
                     *
                     * @param out - Matrix to store result.
                     * @param a - Matrix to scale
                     * @param b - The scale number.
                     * @return out.
                     */ static multiplyScalar(out: any, a: any, b: any): any;
            /**
                     * Adds two matrices after multiplying each element of the second operand by a scalar number.
                     *
                     * @param out - Matrix to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param scale - The scale number.
                     * @return out.
                     */ static multiplyScalarAndAdd(out: any, a: any, b: any, scale: any): any;
            /**
                     * Returns whether the specified matrices are equal. (Compared using ===)
                     *
                     * @param a - The first matrix.
                     * @param b - The second matrix.
                     * @return True if the matrices are equal, false otherwise.
                     */ static exactEquals(a: any, b: any): boolean;
            /**
                     * Returns whether the specified matrices are approximately equal.
                     *
                     * @param a - The first matrix.
                     * @param b - The second matrix.
                     * @return True if the matrices are equal, false otherwise.
                     */ static equals(a: any, b: any): boolean;
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
        /**
             * Represents a color with red(r), green(g), blue(b) component of that color.
             */ export class color3 {
            /**
                     * Creates a color, with components specified separately, or a black color if not specified
                     *
                     * @param r - Value assigned to r component.
                     * @param g - Value assigned to g component.
                     * @param b - Value assigned to b component.
                     * @return The newly created color.
                     */ static create(r?: number, g?: number, b?: number): color3;
            /**
                     * Clone a color.
                     *
                     * @param a - Color to clone.
                     * @return The newly created color.
                     */ static clone(a: color3): color3;
            /**
                     * Copy content of a color into another.
                     *
                     * @param out - The color to modified.
                     * @param a - The specified color.
                     * @return out.
                     */ static copy<Out extends color3>(out: Out, a: color3): Out;
            /**
                     * Set the components of a color to the given values.
                     *
                     * @param out - The color to modified.
                     * @param r - Value assigned to r component.
                     * @param g - Value assigned to g component.
                     * @param b - Value assigned to b component.
                     * @return out.
                     */ static set<Out extends color3>(out: Out, r: number, g: number, b: number): Out;
            /**
                     * Converts the hexadecimal formal color into rgb formal.
                     *
                     * @param out - Color to store result.
                     * @param hex - The color's hexadecimal formal.
                     * @return out.
                     * @function
                     */ static fromHex<Out extends color3>(out: Out, hex: number): Out;
            /**
                     * Add components of two colors, respectively.
                     *
                     * @param out - Color to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add<Out extends color3>(out: Out, a: color3, b: color3): Out;
            /**
                     * Subtract components of color b from components of color a, respectively.
                     *
                     * @param out - Color to store result.
                     * @param a - The a.
                     * @param b - The b.
                     * @return out.
                     */ static subtract<Out extends color3>(out: Out, a: color3, b: color3): Out;
            /**
                     * Alias of {@link color3.subtract}.
                     */ static sub<Out extends color3>(out: Out, a: color3, b: color3): Out;
            /**
                     * Multiply components of two colors, respectively.
                     *
                     * @param out - Color to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply<Out extends color3>(out: Out, a: color3, b: color3): Out;
            /**
                     * Alias of {@link color3.multiply}.
                     */ static mul<Out extends color3>(out: Out, a: color3, b: color3): Out;
            /**
                     * Divide components of color a by components of color b, respectively.
                     *
                     * @param out - Color to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static divide<Out extends color3>(out: Out, a: color3, b: color3): Out;
            /**
                     * Alias of {@link color3.divide}.
                     */ static div<Out extends color3>(out: Out, a: color3, b: color3): Out;
            /**
                     * Scales a color by a number.
                     *
                     * @param out - Color to store result.
                     * @param a - Color to scale.
                     * @param b - The scale number.
                     * @return out.
                     */ static scale<Out extends color3>(out: Out, a: color3, b: number): Out;
            /**
                     * Performs a linear interpolation between two colors.
                     *
                     * @param out - Color to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static lerp<Out extends color3>(out: Out, a: color3, b: color3, t: number): Out;
            /**
                     * Returns string representation of a color.
                     *
                     * @param a - The color.
                     * @return - String representation of this color.
                     */ static str(a: color3): string;
            /**
                     * Store components of a color into array.
                     *
                     * @param out - Array to store result.
                     * @param a - The color.
                     * @return out.
                     */ static array<Out extends IWritableArrayLike<number>>(out: Out, a: color3): Out;
            /**
                     * Returns whether the specified colors are equal. (Compared using ===)
                     *
                     * @param a - The first color.
                     * @param b - The second color.
                     * @return True if the colors are equal, false otherwise.
                     */ static exactEquals(a: color3, b: color3): boolean;
            /**
                     * Returns whether the specified colors are approximately equal.
                     *
                     * @param a - The first color.
                     * @param b - The second color.
                     * @return True if the colors are approximately equal, false otherwise.
                     */ static equals(a: color3, b: color3): boolean;
            /**
                     * Converts a color's rgb formal into the hexadecimal one.
                     *
                     * @param a - The color.
                     * @return - The color's hexadecimal formal.
                     */ static hex(a: color3): number;
            /**
                     * The r component.
                     */ r: number;
            /**
                     * The g component.
                     */ g: number;
            /**
                     * The b component.
                     */ b: number;
        }
        /**
             * Represents a color with red(r), green(g), blue(b) component of that color and
             * and an extra alpha(a) component indicating how opaque this color is.
             */ class color4 {
            /**
                     * Creates a white color, or components specified separately.
                     *
                     * @param r - Value assigned to r component.
                     * @param g - Value assigned to g component.
                     * @param b - Value assigned to b component.
                     * @param a - Value assigned to a component.
                     * @return The newly created color.
                     */ static create(r?: number, g?: number, b?: number, a?: number): color4;
            /**
                     * Clone a color.
                     *
                     * @param a - Color to clone.
                     * @return The newly created color.
                     */ static clone(a: color4): color4;
            /**
                     * Copy content of a color into another.
                     *
                     * @param out - The color to modified.
                     * @param a - The specified color.
                     * @return out.
                     */ static copy(out: color4, a: color4): color4;
            /**
                     * Set the components of a color to the given values.
                     *
                     * @param out - The color to modified.
                     * @param r - Value assigned to r component.
                     * @param g - Value assigned to g component.
                     * @param b - Value assigned to b component.
                     * @param a - Value assigned to a component.
                     * @return out.
                     */ static set(out: color4, r: number, g: number, b: number, a: number): color4;
            /**
                     * Converts the hexadecimal formal color into rgb formal.
                     *
                     * @param out - Color to store result.
                     * @param hex - The color's hexadecimal formal.
                     * @return out.
                     * @function
                     */ static fromHex(out: color4, hex: number): color4;
            /**
                     * Add components of two colors, respectively.
                     *
                     * @param out - Color to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static add(out: color4, a: color4, b: color4): color4;
            /**
                     * Subtract components of color b from components of color a, respectively.
                     *
                     * @param out - Color to store result.
                     * @param a - The a.
                     * @param b - The b.
                     * @return out.
                     */ static subtract(out: color4, a: color4, b: color4): color4;
            /**
                     * Alias of {@link color4.subtract}.
                     */ static sub(out: color4, a: color4, b: color4): color4;
            /**
                     * Multiply components of two colors, respectively.
                     *
                     * @param out - Color to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static multiply(out: color4, a: color4, b: color4): color4;
            /**
                     * Alias of {@link color4.multiply}.
                     */ static mul(out: color4, a: color4, b: color4): color4;
            /**
                     * Divide components of color a by components of color b, respectively.
                     *
                     * @param out - Color to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @return out.
                     */ static divide(out: color4, a: color4, b: color4): color4;
            /**
                     * Alias of {@link color4.divide}.
                     */ static div(out: color4, a: color4, b: color4): color4;
            /**
                     * Scales a color by a number.
                     *
                     * @param out - Color to store result.
                     * @param a - Color to scale.
                     * @param b - The scale number.
                     * @return out.
                     */ static scale(out: color4, a: color4, b: number): color4;
            /**
                     * Performs a linear interpolation between two colors.
                     *
                     * @param out - Color to store result.
                     * @param a - The first operand.
                     * @param b - The second operand.
                     * @param t - The interpolation coefficient.
                     * @return out.
                     */ static lerp(out: color4, a: color4, b: color4, t: number): color4;
            /**
                     * Returns string representation of a color.
                     *
                     * @param a - The color.
                     * @return - String representation of this color.
                     */ static str(a: color4): string;
            /**
                     * Store components of a color into array.
                     *
                     * @param out - Array to store result.
                     * @param a - The color.
                     * @return out.
                     */ static array<Out extends IWritableArrayLike<number>>(out: Out, a: color4, ofs?: number): Out;
            /**
                     * Returns whether the specified colors are equal. (Compared using ===)
                     *
                     * @param a - The first color.
                     * @param b - The second color.
                     * @return True if the colors are equal, false otherwise.
                     */ static exactEquals(a: color4, b: color4): boolean;
            /**
                     * Returns whether the specified colors are approximately equal.
                     *
                     * @param a - The first color.
                     * @param b - The second color.
                     * @return True if the colors are equal, false otherwise.
                     */ static equals(a: color4, b: color4): boolean;
            /**
                     * Converts a color's rgb formal into the hexadecimal one.
                     */ static hex(a: color4): number;
            r: number;
            g: number;
            b: number;
            a: number;
        }
        /**
             * Tests whether or not the arguments have approximately the same value, within an absolute
             * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
             * than or equal to 1.0, and a relative tolerance is used for larger values)
             *
             * @param a The first number to test.
             * @param b The second number to test.
             * @return True if the numbers are approximately equal, false otherwise.
             */ export function equals(a: number, b: number): boolean;
        /**
             * Tests whether or not the arguments have approximately the same value by given maxDiff
             *
             * @param a The first number to test.
             * @param b The second number to test.
             * @param maxDiff Maximum difference.
             * @return True if the numbers are approximately equal, false otherwise.
             */ export function approx(a: number, b: number, maxDiff: number): boolean;
        /**
             * Clamps a value between a minimum float and maximum float value.
             *
             * @param val
             * @param min
             * @param max
             */ export function clamp(val: number, min: number, max: number): number;
        /**
             * Clamps a value between 0 and 1.
             *
             * @param val
             */ export function clamp01(val: number): number;
        /**
             * @param from
             * @param to
             * @param ratio - The interpolation coefficient.
             */ export function lerp(from: number, to: number, ratio: number): number;
        /**
             * Convert Degree To Radian
             *
             * @param {Number} a Angle in Degrees
             */ export function toRadian(a: number): number;
        /**
             * Convert Radian To Degree
             *
             * @param {Number} a Angle in Radian
             */ export function toDegree(a: number): number;
        /**
             * Returns a floating-point random number between min (inclusive) and max (exclusive).
             *
             * @method randomRange
             * @param min
             * @param max
             * @return The random number.
             */ export function randomRange(min: number, max: number): number;
        /**
             * Returns a random integer between min (inclusive) and max (exclusive).
             *
             * @param min
             * @param max
             * @return The random integer.
             */ export function randomRangeInt(min: number, max: number): number;
        /**
             * Linear congruential generator using Hull-Dobell Theorem.
             *
             * @param seed The random seed.
             * @return The pseudo random.
             */ export function pseudoRandom(seed: number): number;
        /**
             * Returns a floating-point pseudo-random number between min (inclusive) and max (exclusive).
             *
             * @param seed
             * @param min
             * @param max
             * @return The random number.
             */ export function pseudoRandomRange(seed: number, min: number, max: number): number;
        /**
             * Returns a pseudo-random integer between min (inclusive) and max (exclusive).
             *
             * @param seed
             * @param min
             * @param max
             * @return The random integer.
             */ export function pseudoRandomRangeInt(seed: number, min: number, max: number): number;
        /**
             * Returns the next power of two for the value.
             *
             * @param val
             * @return The the next power of two.
             */ export function nextPow2(val: number): number;
        /**
             * Returns float remainder for t / length.
             *
             * @param t Time start at 0.
             * @param length Time of one cycle.
             * @return The Time wrapped in the first cycle.
             */ export function repeat(t: number, length: number): number;
        /**
             * Returns time wrapped in ping-pong mode.
             *
             * @param t Time start at 0.
             * @param length Time of one cycle.
             * @return The time wrapped in the first cycle.
             */ export function pingPong(t: number, length: number): number;
        /**
             * Returns ratio of a value within a given range.
             *
             * @param from Start value.
             * @param to End value.
             * @param value Given value.
             * @return The ratio between [from, to].
             */ export function inverseLerp(from: number, to: number, value: number): number;
        var EPSILON;
        var random: () => number;
    }
    namespace js {
        /**
             * ID generator for runtime.
             */ export class IDGenerator {
            static global: IDGenerator;
            id: number;
            prefix: string;
            getNewId(): string;
        }
        /**
             * !#en
             * A fixed-length object pool designed for general type.<br>
             * The implementation of this object pool is very simple,
             * it can helps you to improve your game performance for objects which need frequent release and recreate operations<br/>
             * !#zh
             * 长度固定的对象缓存池，可以用来缓存各种对象类型。<br/>
             * 这个对象池的实现非常精简，它可以帮助您提高游戏性能，适用于优化对象的反复创建和销毁。
             * @class js.Pool
             * @example
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
             */ export class Pool<T> {
            /**
                     * !#en
                     * The current number of available objects, the default is 0, it will gradually increase with the recycle of the object,
                     * the maximum will not exceed the size specified when the constructor is called.
                     * !#zh
                     * 当前可用对象数量，一开始默认是 0，随着对象的回收会逐渐增大，最大不会超过调用构造函数时指定的 size。
                     * @default 0
                     */ count: number;
            /**
                     * !#en
                     * Get and initialize an object from pool. This method defaults to null and requires the user to implement it.
                     * !#zh
                     * 获取并初始化对象池中的对象。这个方法默认为空，需要用户自己实现。
                     * @param args - parameters to used to initialize the object
                     */ get: null | ((...args: any[]) => T);
            private _pool;
            private _cleanup;
            /**
                     * !#en
                     * Get an object from pool, if no available object in the pool, null will be returned.
                     * !#zh
                     * 获取对象池中的对象，如果对象池没有可用对象，则返回空。
                     */ _get(): T | null;
            /**
                     * !#en Put an object into the pool.
                     * !#zh 向对象池返还一个不再需要的对象。
                     */ put(obj: T): void;
            /**
                     * !#en Resize the pool.
                     * !#zh 设置对象池容量。
                     */ resize(length: number): void;
        }
        var array: typeof __unexported.cocos_core_utils_array_cocos_core_utils_array;
        /**
             * Check the object whether is number or not
             * If a number is created by using 'new Number(10086)', the typeof it will be "object"...
             * Then you can use this function if you care about this case.
             */ export function isNumber(object: any): boolean;
        /**
             * Check the object whether is string or not.
             * If a string is created by using 'new String("blabla")', the typeof it will be "object"...
             * Then you can use this function if you care about this case.
             */ export function isString(object: any): boolean;
        /**
             * !#en
             * A simple wrapper of `Object.create(null)` which ensures the return object have no prototype (and thus no inherited members).
             * So we can skip `hasOwnProperty` calls on property lookups.
             * It is a worthwhile optimization than the `{}` literal when `hasOwnProperty` calls are necessary.
             * !#zh
             * 该方法是对 `Object.create(null)` 的简单封装。
             * `Object.create(null)` 用于创建无 prototype （也就无继承）的空对象。
             * 这样我们在该对象上查找属性时，就不用进行 `hasOwnProperty` 判断。
             * 在需要频繁判断 `hasOwnProperty` 时，使用这个方法性能会比 `{}` 更高。
             *
             * @param [forceDictMode=false] Apply the delete operator to newly created map object.
             * This causes V8 to put the object in "dictionary mode" and disables creation of hidden classes
             * which are very expensive for objects that are constantly changing shape.
             */ export function createMap(forceDictMode?: boolean): any;
        /**
             * Get class name of the object, if object is just a {} (and which class named 'Object'), it will return "".
             * (modified from <a href="http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class">the code from this stackoverflow post</a>)
             * @param objOrCtor instance or constructor
             */ export function getClassName(objOrCtor: Object | Function): string;
        /**
             * Defines a polyfill field for obsoleted codes.
             * @param object - YourObject or YourClass.prototype
             * @param obsoleted - "OldParam" or "YourClass.OldParam"
             * @param newExpr - "NewParam" or "YourClass.NewParam"
             * @param  [writable=false]
             */ export function obsolete(object: any, obsoleted: string, newExpr: string, writable?: boolean): void;
        /**
             * Defines all polyfill fields for obsoleted codes corresponding to the enumerable properties of props.
             * @method obsoletes
             * @param {any} obj - YourObject or YourClass.prototype
             * @param {any} objName - "YourObject" or "YourClass"
             * @param {Object} props
             * @param {Boolean} [writable=false]
             */ export function obsoletes(obj: any, objName: any, props: any, writable: any): void;
        /**
             * A string tool to construct a string with format string.
             * @param msg - A JavaScript string containing zero or more substitution strings (%s).
             * @param subst - JavaScript objects with which to replace substitution strings within msg.
             * This gives you additional control over the format of the output.
             * @example
             * cc.js.formatStr("a: %s, b: %s", a, b);
             * cc.js.formatStr(a, b, c);
             */ export function formatStr(msg: string | any, ...subst: any[]): any;
        export function shiftArguments(): any[];
        /**
             * Get property descriptor in object and all its ancestors.
             */ export function getPropertyDescriptor(object: any, propertyName: string): PropertyDescriptor | null;
        /**
             * Copy all properties not defined in object from arguments[1...n].
             * @param object Object to extend its properties.
             * @param sources Source object to copy properties from.
             * @return The result object.
             */ export function addon(object?: any, ...sources: any[]): any;
        /**
             * Copy all properties from arguments[1...n] to object.
             * @return The result object.
             */ export function mixin(object?: any, ...sources: any[]): any;
        /**
             * Derive the class from the supplied base class.
             * Both classes are just native javascript constructors, not created by cc.Class, so
             * usually you will want to inherit using {{#crossLink "cc/Class:method"}}cc.Class {{/crossLink}} instead.
             * @param base The baseclass to inherit.
             * @return The result class.
             */ export function extend(cls: Function, base: Function): Function | undefined;
        /**
             * Get super class.
             * @param constructor The constructor of subclass.
             */ export function getSuper(constructor: Function): any;
        /**
             * Checks whether subclass is child of superclass or equals to superclass.
             */ export function isChildClassOf(subclass: Function, superclass: Function): boolean;
        /**
             * Removes all enumerable properties from object.
             */ export function clear(object: {}): void;
        /**
             * Register the class by specified id, if its classname is not defined, the class name will also be set.
             * @method _setClassId
             * @param {String} classId
             * @param {Function} constructor
             * @private
             */ export function _setClassId(id: any, constructor: any): void;
        /**
             * Register the class by specified name manually
             * @method setClassName
             * @param {String} className
             * @param {Function} constructor
             */ export function setClassName(className: any, constructor: any): void;
        /**
             * Unregister a class from fireball.
             *
             * If you dont need a registered class anymore, you should unregister the class so that Fireball will not keep its reference anymore.
             * Please note that its still your responsibility to free other references to the class.
             *
             * @method unregisterClass
             * @param {Function} ...constructor - the class you will want to unregister, any number of classes can be added
             */ export function unregisterClass(...constructors: Function[]): void;
        /**
             * Get the registered class by id
             * @method _getClassById
             * @param {String} classId
             * @return {Function} constructor
             * @private
             */ export function _getClassById(classId: any): any;
        /**
             * Get the registered class by name
             * @method getClassByName
             * @param {String} classname
             * @return {Function} constructor
             */ export function getClassByName(classname: any): any;
        /**
             * Get class id of the object
             * @method _getClassId
             * @param {Object|Function} obj - instance or constructor
             * @param {Boolean} [allowTempId=true] - can return temp id in editor
             * @return {String}
             * @private
             */ export function _getClassId(obj: any, allowTempId: any): any;
        type Getter = () => any;
        type Setter = (value: any) => void;
        var value: (object: Object, propertyName: string, value_: any, writable?: boolean | undefined, enumerable?: boolean | undefined) => void;
        var getset: (object: Object, propertyName: string, getter: Getter, setter?: Setter | undefined, enumerable?: boolean | undefined, configurable?: boolean | undefined) => void;
        var get: (object: Object, propertyName: string, getter: Getter, enumerable?: boolean | undefined, configurable?: boolean | undefined) => void;
        var set: (object: Object, propertyName: string, setter: Setter, enumerable?: boolean | undefined, configurable?: boolean | undefined) => void;
        var _idToClass: {};
        var _nameToClass: {};
    }
    namespace path {
        /**
             * !#en Join strings to be a path.
             * !#zh 拼接字符串为路径。
             * @example {@link cocos2d/core/utils/CCPath/join.js}
             */ export function join(...segments: string[]): string;
        /**
             * !#en Get the ext name of a path including '.', like '.png'.
             * !#zh 返回 Path 的扩展名，包括 '.'，例如 '.png'。
             * @example {@link cocos2d/core/utils/CCPath/extname.js}
             */ export function extname(path: string): string;
        /**
             * !#en Get the main name of a file name.
             * !#zh 获取文件名的主名称。
             * @deprecated
             */ export function mainFileName(fileName: string): string;
        /**
             * !#en Get the file name of a file path.
             * !#zh 获取文件路径的文件名。
             * @example {@link cocos2d/core/utils/CCPath/basename.js}
             */ export function basename(path: string, extName?: string): string;
        /**
             * !#en Get dirname of a file path.
             * !#zh 获取文件路径的目录名。
             * @example {@link cocos2d/core/utils/CCPath/dirname.js}
             */ export function dirname(path: string): string;
        /**
             * !#en Change extname of a file path.
             * !#zh 更改文件路径的扩展名。
             * @example {@link cocos2d/core/utils/CCPath/changeExtname.js}
             */ export function changeExtname(path: string, extName?: string): string;
        /**
             * !#en Change file name of a file path.
             * !#zh 更改文件路径的文件名。
             * @example {@link cocos2d/core/utils/CCPath/changeBasename.js}
             */ export function changeBasename(path: string, baseName: string, isSameExt?: boolean): string;
        export function _normalize(url: any): any;
        export function stripSep(path: string): string;
        export function getSeperator(): "/" | "\\";
    }
    var profiler: {
        isShowingStats(): boolean;
        hideStats(): void;
        showStats(): void;
    };
    /**
         * misc utilities
         * @class misc
         * @static
         */ /**
         * @method propertyDefine
         * @param {Function} ctor
         * @param {Array} sameNameGetSets
         * @param {Object} diffNameGetSets
         */ export function propertyDefine(ctor: any, sameNameGetSets: any, diffNameGetSets: any): void;
    /**
         * @method nextPOT
         * @param {Number} x
         * @return {Number}
         */ export function nextPOT(x: any): any;
    export function pushToMap(map: any, key: any, value: any, pushFront: any): void;
    /**
         * !#en Clamp a value between from and to.
         * !#zh
         * 限定浮点数的最大最小值。<br/>
         * 数值大于 max_inclusive 则返回 max_inclusive。<br/>
         * 数值小于 min_inclusive 则返回 min_inclusive。<br/>
         * 否则返回自身。
         * @method clampf
         * @param {Number} value
         * @param {Number} min_inclusive
         * @param {Number} max_inclusive
         * @return {Number}
         * @example
         * var v1 = cc.misc.clampf(20, 0, 20); // 20;
         * var v2 = cc.misc.clampf(-1, 0, 20); //  0;
         * var v3 = cc.misc.clampf(10, 0, 20); // 10;
         */ export function clampf(value: any, min_inclusive: any, max_inclusive: any): any;
    /**
         * !#en Clamp a value between 0 and 1.
         * !#zh 限定浮点数的取值范围为 0 ~ 1 之间。
         * @method clamp01
         * @param {Number} value
         * @return {Number}
         * @example
         * var v1 = cc.misc.clamp01(20);  // 1;
         * var v2 = cc.misc.clamp01(-1);  // 0;
         * var v3 = cc.misc.clamp01(0.5); // 0.5;
         */ export function clamp01(value: any): any;
    /**
         * Linear interpolation between 2 numbers, the ratio sets how much it is biased to each end
         * @method lerp
         * @param {Number} a number A
         * @param {Number} b number B
         * @param {Number} r ratio between 0 and 1
         * @return {Number}
         * @example {@link utils/api/engine/docs/cocos2d/core/platform/CCMacro/lerp.js}
         */ export function lerp(a: any, b: any, r: any): any;
    /**
         * converts degrees to radians
         * @param {Number} angle
         * @return {Number}
         * @method degreesToRadians
         */ export function degreesToRadians(angle: any): number;
    /**
         * converts radians to degrees
         * @param {Number} angle
         * @return {Number}
         * @method radiansToDegrees
         */ export function radiansToDegrees(angle: any): number;
    export function contains(refNode: any, otherNode: any): any;
    export function isDomNode(obj: any): boolean;
    export function callInNextTick(callback: any, p1: any, p2: any): void;
    export function tryCatchFunctor_EDITOR(funcName: any, forwardArgs: any, afterCall: any, bindArg: any): any;
    export function isPlainEmptyObj_DEV(obj: any): boolean;
    export function cloneable_DEV(obj: any): any;
    var BUILTIN_CLASSID_RE: RegExp;
    var BASE64_VALUES: any[];
    export function isUnicodeCJK(ch: string): boolean;
    export function isUnicodeSpace(ch: string): boolean;
    export function safeMeasureText(ctx: CanvasRenderingContext2D, string: string): number;
    export function fragmentText(stringToken: string, allWidth: number, maxWidth: number, measureText: (string: string) => number): string[];
    /**
         * A utils class for parsing HTML texts. The parsed results will be an object array.
         */ export interface IHtmlTextParserResultObj {
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
        private _specialSymbolArray;
        private _stack;
        private _resultObjectArray;
        parse(htmlString: string): IHtmlTextParserResultObj[];
        private _attributeToObject;
        private _processEventHandler;
        private _addToStack;
        private _processResult;
        private _escapeSpecialSymbol;
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
    namespace _decorator {
        /**
             * 标注属性为 cc 属性。
             * @param options 选项。
             */ export function property(options?: IPropertyOptions): PropertyDecorator;
        /**
             * 标注属性为 cc 属性。
             * 等价于`@property({type})`。
             * @param type cc 属性的类型。
             */ export function property(type: PropertyType): PropertyDecorator;
        /**
             * 标注属性为 cc 属性。
             * 等价于`@property()`。
             */ export function property(target: Object, propertyKey: string | symbol): void;
        /**
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
             *
             * @method mixins
             * @param {Function} ...ctor - constructors to mix, only support ES5 constructors or classes defined by using `cc.Class`,
             *                             not support ES6 Classes.
             * @example
             * const {ccclass, mixins} = cc._decorator;
             *
             * class Animal { ... }
             *
             * const Fly = cc.Class({
             *     constructor () { ... }
             * });
             *
             * &#64;ccclass
             * &#64;mixins(cc.EventTarget, Fly)
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
             * @typescript
             * mixins(ctor: Function, ...rest: Function[]): Function
             */ export function mixins(...constructors: Function[]): (ctor: any) => void;
        var ccclass: (target: any) => any;
        export type SimplePropertyType = Function | string;
        export type PropertyType = SimplePropertyType | SimplePropertyType[];
        /**
             * cc 属性选项。
             */ export interface IPropertyOptions extends __unexported.cocos_core_data_utils_attibute_defines_IExposedAttributes {
        }
        var executeInEditMode: any;
        var requireComponent: any;
        var menu: any;
        var executionOrder: any;
        var disallowMultiple: any;
        var playOnFocus: any;
        var inspector: any;
        var icon: any;
        var help: any;
    }
    /**
         * @module cc
         */ /**
         * !#en Defines a CCClass using the given specification, please see [Class](/docs/editors_and_tools/creator-chapters/scripting/class.html) for details.
         * !#zh 定义一个 CCClass，传入参数必须是一个包含类型参数的字面量对象，具体用法请查阅[类型定义](/docs/creator/scripting/class.html)。
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
        
         // define base class
         var Node = cc.Class();
        
         // define sub class
         var Sprite = cc.Class({
             name: 'Sprite',
             extends: Node,
        
             ctor: function () {
                 this.url = "";
                 this.id = 0;
             },
        
             statics: {
                 // define static members
                 count: 0,
                 getBounds: function (spriteList) {
                     // compute bounds...
                 }
             },
        
             properties {
                 width: {
                     default: 128,
                     type: 'Integer',
                     tooltip: 'The width of sprite'
                 },
                 height: 128,
                 size: {
                     get: function () {
                         return cc.v2(this.width, this.height);
                     }
                 }
             },
        
             load: function () {
                 // load this.url...
             };
         });
        
         // instantiate
        
         var obj = new Sprite();
         obj.url = 'sprite.png';
         obj.load();
         */ function CCClass(options: any): any;
    /****************************************************************************
         Copyright (c) 2013-2016 Chukong Technologies Inc.
         Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
        
         http://www.cocos.com
        
         Permission is hereby granted, free of charge, to any person obtaining a copy
         of this software and associated engine source code (the "Software"), a limited,
          worldwide, royalty-free, non-assignable, revocable and non-exclusive license
         to use Cocos Creator solely to develop games on your target platforms. You shall
          not use Cocos Creator software for developing other software or tools that's
          used for developing games. You are not granted to publish, distribute,
          sublicense, and/or sell copies of Cocos Creator.
        
         The software or tools in this License Agreement are licensed, not sold.
         Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
        
         THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
         IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
         FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
         AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
         LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
         OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
         THE SOFTWARE.
         ****************************************************************************/ /**
         * !#en Base class of all kinds of events.
         * !#zh 包含事件相关信息的对象。
         * @class Event
         */ export class Event {
        /**
                 * !#en Code for event without type.
                 * !#zh 没有类型的事件
                 */ static NO_TYPE: string;
        /**
                 * !#en The type code of Touch event.
                 * !#zh 触摸事件类型
                 */ static TOUCH: string;
        /**
                 * !#en The type code of Mouse event.
                 * !#zh 鼠标事件类型
                 */ static MOUSE: string;
        /**
                 * !#en The type code of Keyboard event.
                 * !#zh 键盘事件类型
                 */ static KEYBOARD: string;
        /**
                 * !#en The type code of Acceleration event.
                 * !#zh 加速器事件类型
                 */ static ACCELERATION: string;
        /**
                 * !#en Events not currently dispatched are in this phase
                 * !#zh 尚未派发事件阶段
                 */ static NONE: number;
        /**
                 * !#en
                 * The capturing phase comprises the journey from the root to the last node before the event target's node
                 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
                 * !#zh 捕获阶段，包括事件目标节点之前从根节点到最后一个节点的过程。
                 */ static CAPTURING_PHASE: number;
        /**
                 * !#en
                 * The target phase comprises only the event target node
                 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
                 * !#zh 目标阶段仅包括事件目标节点。
                 */ static AT_TARGET: number;
        /**
                 * !#en
                 * The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the hierarchy
                 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
                 * !#zh 冒泡阶段， 包括回程遇到到层次根节点的任何后续节点。
                 */ static BUBBLING_PHASE: number;
        /**
                 * !#en The name of the event (case-sensitive), e.g. "click", "fire", or "submit".
                 * !#zh 事件类型。
                 */ type: string;
        /**
                 * !#en Indicate whether the event bubbles up through the tree or not.
                 * !#zh 表示该事件是否进行冒泡。
                 */ bubbles: boolean;
        /**
                 * !#en A reference to the target to which the event was originally dispatched.
                 * !#zh 最初事件触发的目标
                 */ target: Object | null;
        /**
                 * !#en A reference to the currently registered target for the event.
                 * !#zh 当前目标
                 */ currentTarget: Object | null;
        /**
                 * !#en
                 * Indicates which phase of the event flow is currently being evaluated.
                 * Returns an integer value represented by 4 constants:
                 *  - Event.NONE = 0
                 *  - Event.CAPTURING_PHASE = 1
                 *  - Event.AT_TARGET = 2
                 *  - Event.BUBBLING_PHASE = 3
                 * The phases are explained in the [section 3.1, Event dispatch and DOM event flow]
                 * (http://www.w3.org/TR/DOM-Level-3-Events/#event-flow), of the DOM Level 3 Events specification.
                 * !#zh 事件阶段
                 */ eventPhase: number;
        /**
                 * !#en Stops propagation for current event.
                 * !#zh 停止传递当前事件。
                 */ propagationStopped: boolean;
        /**
                 * !#en Stops propagation for current event immediately,
                 * the event won't even be dispatched to the listeners attached in the current target.
                 * !#zh 立即停止当前事件的传递，事件甚至不会被分派到所连接的当前目标。
                 */ propagationImmediateStopped: boolean;
        /**
                 * !#en Reset the event for being stored in the object pool.
                 * !#zh 重置对象池中存储的事件。
                 */ unuse(): void;
        /**
                 * !#en Reuse the event for being used again by the object pool.
                 * !#zh 用于对象池再次使用的事件。
                 */ reuse(type: string, bubbles?: boolean): void;
        /**
                 * !#en Checks whether the event has been stopped.
                 * !#zh 检查该事件是否已经停止传递.
                 */ isStopped(): boolean;
        /**
                 * !#en
                 * <p>
                 *     Gets current target of the event                                                            <br/>
                 *     note: It only be available when the event listener is associated with node.                <br/>
                 *          It returns 0 when the listener is associated with fixed priority.
                 * </p>
                 * !#zh 获取当前目标节点
                 * @returns The target with which the event associates.
                 */ getCurrentTarget(): Object | null;
        /**
                 * !#en Gets the event type.
                 * !#zh 获取事件类型
                 */ getType(): string;
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
         * !#zh
         * 事件目标是事件触发时，分派的事件对象，Node 是最常见的事件目标，
         * 但是其他对象也可以是事件目标。<br/>
         *
         * @class EventTarget
         * @extends CallbacksInvoker
         */ export class EventTarget extends __unexported.cocos_core_event_callbacks_invoker_CallbacksInvoker {
        /**
                 * !#en Checks whether the EventTarget object has any callback registered for a specific type of event.
                 * !#zh 检查事件目标对象是否有为特定类型的事件注册的回调。
                 * @method hasEventListener
                 * @param {String} type - The type of event.
                 * @return {Boolean} True if a callback of the specified type is registered; false otherwise.
                 */ /**
                 * !#en
                 * Register an callback of a specific event type on the EventTarget.
                 * This type of event should be triggered via `emit`.
                 * !#zh
                 * 注册事件目标的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
                 *
                 * @method on
                 * @param {String} type - A string representing the event type to listen for.
                 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
                 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
                 * @param {any} [callback.arg1] arg1
                 * @param {any} [callback.arg2] arg2
                 * @param {any} [callback.arg3] arg3
                 * @param {any} [callback.arg4] arg4
                 * @param {any} [callback.arg5] arg5
                 * @param {Object} [target] - The target (this object) to invoke the callback, can be null
                 * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
                 * @typescript
                 * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
                 * @example
                 * eventTarget.on('fire', function () {
                 *     cc.log("fire in the hole");
                 * }, node);
                 */ on(type: string, callback: Function, target?: Object): Function | undefined;
        /**
                 * !#en
                 * Removes the listeners previously registered with the same type, callback, target and or useCapture,
                 * if only type is passed as parameter, all listeners registered with that type will be removed.
                 * !#zh
                 * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
                 *
                 * @method off
                 * @param {String} type - A string representing the event type being removed.
                 * @param {Function} [callback] - The callback to remove.
                 * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
                 * @example
                 * // register fire eventListener
                 * var callback = eventTarget.on('fire', function () {
                 *     cc.log("fire in the hole");
                 * }, target);
                 * // remove fire event listener
                 * eventTarget.off('fire', callback, target);
                 * // remove all fire event listeners
                 * eventTarget.off('fire');
                 */ off(type: string, callback?: Function, target?: Object): void;
        /**
                 * !#en Removes all callbacks previously registered with the same target (passed as parameter).
                 * This is not for removing all listeners in the current event target,
                 * and this is not for removing all listeners the target parameter have registered.
                 * It's only for removing all listeners (callback and target couple) registered on the current event target by the target parameter.
                 * !#zh 在当前 EventTarget 上删除指定目标（target 参数）注册的所有事件监听器。
                 * 这个函数无法删除当前 EventTarget 的所有事件监听器，也无法删除 target 参数所注册的所有事件监听器。
                 * 这个函数只能删除 target 参数在当前 EventTarget 上注册的所有事件监听器。
                 * @method targetOff
                 * @param {Object} target - The target to be searched for all related listeners
                 */ targetOff(keyOrTarget?: string | Object): void;
        /**
                 * !#en
                 * Register an callback of a specific event type on the EventTarget,
                 * the callback will remove itself after the first time it is triggered.
                 * !#zh
                 * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
                 *
                 * @method once
                 * @param {String} type - A string representing the event type to listen for.
                 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
                 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
                 * @param {any} [callback.arg1] arg1
                 * @param {any} [callback.arg2] arg2
                 * @param {any} [callback.arg3] arg3
                 * @param {any} [callback.arg4] arg4
                 * @param {any} [callback.arg5] arg5
                 * @param {Object} [target] - The target (this object) to invoke the callback, can be null
                 * @example
                 * eventTarget.once('fire', function () {
                 *     cc.log("this is the callback and will be invoked only once");
                 * }, node);
                 */ once(type: string, callback: Function, target?: Object): void;
        /**
                 * !#en
                 * Trigger an event directly with the event name and necessary arguments.
                 * !#zh
                 * 通过事件名发送自定义事件
                 *
                 * @method emit
                 * @param {String} type - event type
                 * @param {*} [arg1] - First argument
                 * @param {*} [arg2] - Second argument
                 * @param {*} [arg3] - Third argument
                 * @param {*} [arg4] - Fourth argument
                 * @param {*} [arg5] - Fifth argument
                 * @example
                 *
                 * eventTarget.emit('fire', event);
                 * eventTarget.emit('fire', message, emitter);
                 */ /**
                 * !#en
                 * Send an event with the event object.
                 * !#zh
                 * 通过事件对象派发事件
                 *
                 * @method dispatchEvent
                 * @param {Event} event
                 */ dispatchEvent(event: any): void;
    }
    var screen: {
        _supportsFullScreen: boolean;
        _preOnFullScreenChange: any;
        _touchEvent: string;
        _fn: any;
        _fnMap: string[][];
        /**
                 * initialize
                 * @method init
                 */ init(): void;
        /**
                 * return true if it's full now.
                 * @method fullScreen
                 * @returns {Boolean}
                 */ fullScreen(): boolean;
        /**
                 * change the screen to full mode.
                 * @method requestFullScreen
                 * @param {Element} element
                 * @param {Function} onFullScreenChange
                 */ requestFullScreen(element: any, onFullScreenChange: any): any;
        /**
                 * exit the full mode.
                 * @method exitFullScreen
                 * @return {Boolean}
                 */ exitFullScreen(): any;
        /**
                 * Automatically request full screen with a touch/click event
                 * @method autoFullScreen
                 * @param {Element} element
                 * @param {Function} onFullScreenChange
                 */ autoFullScreen(element: any, onFullScreenChange: any): void;
    };
    var eventManager: __unexported.cocos_core_platform_event_manager_event_manager_EventManager;
    export class SystemEvent extends EventTarget {
        static EventType: typeof EventType;
        /**
                 * !#en whether enable accelerometer event
                 * !#zh 是否启用加速度计事件
                 * @method setAccelerometerEnabled
                 * @param {Boolean} isEnable
                 */ setAccelerometerEnabled(isEnable: boolean): void;
        /**
                 * !#en set accelerometer interval value
                 * !#zh 设置加速度计间隔值
                 * @method setAccelerometerInterval
                 * @param {Number} interval
                 */ setAccelerometerInterval(interval: number): void;
        on(type: string, callback: Function, target?: Object): Function | undefined;
        off(type: string, callback?: Function, target?: Object): void;
    }
    /**
         * !#en The mouse event
         * !#zh 鼠标事件类型
         * @class Event.EventMouse
         * @extends Event
         */ export class EventMouse extends Event {
        /**
                 * !#en The none event code of mouse event.
                 * !#zh 无。
                 */ static NONE: number;
        /**
                 * !#en The event type code of mouse down event.
                 * !#zh 鼠标按下事件。
                 */ static DOWN: number;
        /**
                 * !#en The event type code of mouse up event.
                 * !#zh 鼠标按下后释放事件。
                 */ static UP: number;
        /**
                 * !#en The event type code of mouse move event.
                 * !#zh 鼠标移动事件。
                 */ static MOVE: number;
        /**
                 * !#en The event type code of mouse scroll event.
                 * !#zh 鼠标滚轮事件。
                 */ static SCROLL: number;
        /**
                 * !#en The tag of Mouse left button.
                 * !#zh 鼠标左键的标签。
                 */ static BUTTON_LEFT: number;
        /**
                 * !#en The tag of Mouse right button  (The right button number is 2 on browser).
                 * !#zh 鼠标右键的标签。
                 */ static BUTTON_RIGHT: number;
        /**
                 * !#en The tag of Mouse middle button  (The right button number is 1 on browser).
                 * !#zh 鼠标中键的标签。
                 */ static BUTTON_MIDDLE: number;
        /**
                 * !#en The tag of Mouse button 4.
                 * !#zh 鼠标按键 4 的标签。
                 */ static BUTTON_4: number;
        /**
                 * !#en The tag of Mouse button 5.
                 * !#zh 鼠标按键 5 的标签。
                 */ static BUTTON_5: number;
        /**
                 * !#en The tag of Mouse button 6.
                 * !#zh 鼠标按键 6 的标签。
                 */ static BUTTON_6: number;
        /**
                 * !#en The tag of Mouse button 7.
                 * !#zh 鼠标按键 7 的标签。
                 */ static BUTTON_7: number;
        /**
                 * !#en The tag of Mouse button 8.
                 * !#zh 鼠标按键 8 的标签。
                 */ static BUTTON_8: number;
        movementX: number;
        movementY: number;
        private _eventType;
        private _button;
        private _x;
        private _y;
        private _prevX;
        private _prevY;
        private _scrollX;
        private _scrollY;
        /**
                 * !#en Sets scroll data.
                 * !#zh 设置鼠标的滚动数据。
                 */ setScrollData(scrollX: number, scrollY: number): void;
        /**
                 * !#en Returns the x axis scroll value.
                 * !#zh 获取鼠标滚动的X轴距离，只有滚动时才有效。
                 */ getScrollX(): number;
        /**
                 * !#en Returns the y axis scroll value.
                 * !#zh 获取滚轮滚动的 Y 轴距离，只有滚动时才有效。
                 */ getScrollY(): number;
        /**
                 * !#en Sets cursor location.
                 * !#zh 设置当前鼠标位置。
                 */ setLocation(x: number, y: number): void;
        /**
                 * !#en Returns cursor location.
                 * !#zh 获取鼠标相对于左下角位置对象，对象包含 x 和 y 属性。
                 */ getLocation(out?: Vec2): Vec2;
        /**
                 * !#en Returns the current cursor location in screen coordinates.
                 * !#zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
                 */ getLocationInView(out?: Vec2): Vec2;
        /**
                 * !#en Returns the current cursor location in ui coordinates.
                 * !#zh 获取当前事件在 UI 窗口内的坐标位置，对象包含 x 和 y 属性。
                 */ getUILocation(out?: Vec2): Vec2;
        _setPrevCursor(x: number, y: number): void;
        /**
                 * !#en Returns the previous touch location.
                 * !#zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
                 */ getPreviousLocation(out?: Vec2): Vec2;
        /**
                 * !#en Returns the previous touch location.
                 * !#zh 获取鼠标点击在上一次事件时的位置对象，对象包含 x 和 y 属性。
                 */ getUIPreviousLocation(out?: Vec2): Vec2;
        /**
                 * !#en Returns the delta distance from the previous location to current location.
                 * !#zh 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
                 */ getDelta(out?: Vec2): Vec2;
        /**
                 * !#en Returns the X axis delta distance from the previous location to current location.
                 * !#zh 获取鼠标距离上一次事件移动的 X 轴距离。
                 */ getDeltaX(): number;
        /**
                 * !#en Returns the Y axis delta distance from the previous location to current location.
                 * !#zh 获取鼠标距离上一次事件移动的 Y 轴距离。
                 */ getDeltaY(): number;
        /**
                 * !#en Returns the delta distance from the previous location to current location.
                 * !#zh 获取鼠标距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
                 */ getUIDelta(out?: Vec2): Vec2;
        /**
                 * !#en Returns the X axis delta distance from the previous location to current location.
                 * !#zh 获取鼠标距离上一次事件移动的 X 轴距离。
                 */ getUIDeltaX(): number;
        /**
                 * !#en Returns the Y axis delta distance from the previous location to current location.
                 * !#zh 获取鼠标距离上一次事件移动的 Y 轴距离。
                 */ getUIDeltaY(): number;
        /**
                 * !#en Sets mouse button.
                 * !#zh 设置鼠标按键。
                 */ setButton(button: number | null): void;
        /**
                 * !#en Returns mouse button.
                 * !#zh 获取鼠标按键。
                 */ getButton(): number | null;
        /**
                 * !#en Returns location X axis data.
                 * !#zh 获取鼠标当前位置 X 轴。
                 */ getLocationX(): number;
        /**
                 * !#en Returns location Y axis data.
                 * !#zh 获取鼠标当前位置 Y 轴。
                 */ getLocationY(): number;
        /**
                 * !#en Returns location X axis data.
                 * !#zh 获取鼠标当前位置 X 轴。
                 */ getUILocationX(): number;
        /**
                 * !#en Returns location Y axis data.
                 * !#zh 获取鼠标当前位置 Y 轴。
                 */ getUILocationY(): number;
    }
    /**
         * !#en The touch event
         * !#zh 触摸事件
         * @class Event.EventTouch
         * @constructor
         * @extends Event
         */ export class EventTouch extends Event {
        /**
                 * !#en The maximum touch numbers
                 * !#zh 最大触摸数量。
                 */ static MAX_TOUCHES: number;
        /**
                 * !#en The event type code of touch began event.
                 * !#zh 开始触摸事件
                 */ static BEGAN: number;
        /**
                 * !#en The event type code of touch moved event.
                 * !#zh 触摸后移动事件
                 */ static MOVED: number;
        /**
                 * !#en The event type code of touch ended event.
                 * !#zh 结束触摸事件
                 */ static ENDED: number;
        /**
                 * !#en The event type code of touch cancelled event.
                 * !#zh 取消触摸事件
                 */ static CANCELLED: number;
        /**
                 * !#en The current touch object
                 * !#zh 当前触点对象
                 */ touch: __unexported.cocos_core_platform_event_manager_CCTouch_default | null;
        currentTouch: __unexported.cocos_core_platform_event_manager_CCTouch_default | null;
        _eventCode: number;
        simulate: boolean;
        private _touches;
        /**
                 * !#en Returns event code.
                 * !#zh 获取事件类型。
                 */ getEventCode(): number;
        /**
                 * !#en Returns touches of event.
                 * !#zh 获取触摸点的列表。
                 */ getTouches(): __unexported.cocos_core_platform_event_manager_CCTouch_default[];
        _setEventCode(eventCode: number): void;
        _setTouches(touches: __unexported.cocos_core_platform_event_manager_CCTouch_default[]): void;
        /**
                 * !#en Sets touch location.
                 * !#zh 设置当前触点位置
                 */ setLocation(x: number, y: number): void;
        /**
                 * !#en Returns touch location.
                 * !#zh 获取触点位置。
                 */ getLocation(out?: Vec2): Vec2;
        /**
                 * !#en Returns the current touch location in screen coordinates.
                 * !#zh 获取当前触点在游戏窗口中的位置。
                 */ getLocationInView(out?: Vec2): Vec2;
        /**
                 * !#en Returns the previous touch location.
                 * !#zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
                 */ getPreviousLocation(out?: Vec2): Vec2;
        /**
                 * !#en Returns the start touch location.
                 * !#zh 获获取触点落下时的位置对象，对象包含 x 和 y 属性。
                 */ getStartLocation(out?: Vec2): Vec2;
        /**
                 * !#en Returns the id of cc.Touch.
                 * !#zh 触点的标识 ID，可以用来在多点触摸中跟踪触点。
                 */ getID(): number | null;
        /**
                 * !#en Returns the delta distance from the previous location to current location.
                 * !#zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
                 */ getDelta(out?: Vec2): Vec2;
        /**
                 * !#en Returns the X axis delta distance from the previous location to current location.
                 * !#zh 获取触点距离上一次事件移动的 x 轴距离。
                 */ getDeltaX(out?: Vec2): number;
        /**
                 * !#en Returns the Y axis delta distance from the previous location to current location.
                 * !#zh 获取触点距离上一次事件移动的 y 轴距离。
                 */ getDeltaY(out?: Vec2): number;
        /**
                 * !#en Returns location X axis data.
                 * !#zh 获取当前触点 X 轴位置。
                 */ getLocationX(): number;
        /**
                 * !#en Returns location Y axis data.
                 * !#zh 获取当前触点 Y 轴位置。
                 */ getLocationY(): number;
    }
    /**
         * !#en The acceleration event
         * !#zh 加速度事件
         * @class Event.EventAcceleration
         * @extends Event
         */ export class EventAcceleration extends Event {
        acc: Object;
    }
    /**
         * !#en The keyboard event
         * !#zh 键盘事件
         * @class Event.EventKeyboard
         * @extends Event
         */ export class EventKeyboard extends Event {
        /**
                 * !#en
                 * The keyCode read-only property represents a system and implementation dependent numerical code
                 * identifying the unmodified value of the pressed key.
                 * This is usually the decimal ASCII (RFC 20) or Windows 1252 code corresponding to the key.
                 * If the key can't be identified, this value is 0.
                 *
                 * !#zh
                 * keyCode 是只读属性它表示一个系统和依赖于实现的数字代码，可以识别按键的未修改值。
                 * 这通常是十进制 ASCII (RFC20) 或者 Windows 1252 代码，所对应的密钥。
                 * 如果无法识别该键，则该值为 0。
                 */ keyCode: number;
        /**
                 * Raw DOM event.
                 */ rawEvent?: KeyboardEvent;
        isPressed: boolean;
    }
    /**
         * !#zh
         * 一般用于系统事件或者节点事件的事件枚举
         */ export enum EventType {
        TOUCH_START,
        TOUCH_MOVE,
        TOUCH_END,
        TOUCH_CANCEL,
        MOUSE_DOWN,
        MOUSE_MOVE,
        MOUSE_UP,
        MOUSE_WHEEL,
        MOUSE_ENTER,
        MOUSE_LEAVE,
        KEY_DOWN,
        KEY_UP,
        DEVICEMOTION,
        TRANSFORM_CHANGED,
        POSITION_PART,
        ROTATION_PART,
        SCALE_PART,
        SCENE_CHANGED_FOR_PERSISTS,
        SIZE_CHANGED,
        ANCHOR_CHANGED,
        CHILD_ADDED,
        CHILD_REMOVED
    }
    /**
         * !#en The base class of all value types.
         * !#zh 所有值类型的基类。
         * @class ValueType
         *
         */ export class ValueType {
        /**
                 * !#en This method returns an exact copy of current value.
                 * !#zh 克隆当前值，该方法返回一个新对象，新对象的值和原对象相等。
                 *
                 */ clone(): ValueType;
        /**
                 * !#en Compares this object with the other one.
                 * !#zh 当前对象是否等于指定对象。
                 * @param other
                 */ equals(other: this): boolean;
        /**
                 * !#en
                 * Linearly interpolates between this value to to value by ratio which is in the range [0, 1].
                 * When ratio = 0 returns this. When ratio = 1 return to. When ratio = 0.5 returns the average of this and to.
                 * !#zh
                 * 线性插值。<br/>
                 * 当 ratio = 0 时返回自身，ratio = 1 时返回目标，ratio = 0.5 返回自身和目标的平均值。。
                 * @param to - the to value
                 * @param ratio - the interpolation coefficient
                 * @returns
                 */ lerp(to: this, ratio: number): ValueType;
        /**
                 * !#en
                 * Copys all the properties from another given object to this value.
                 * !#zh
                 * 从其它对象把所有属性复制到当前对象。
                 * @param source - the source to copy
                 */ set(source: this): void;
        /**
                 * !#en TODO
                 * !#zh 转换为方便阅读的字符串。
                 */ toString(): string;
    }
    /**
         * !#en Representation of 2D vectors and points.
         * !#zh 表示 2D 向量和坐标
         */ export class Vec2 extends ValueType {
        x: number;
        y: number;
        /**
                 * !#en clone a Vec2 object
                 * !#zh 克隆一个 Vec2 对象
                 */ clone(): Vec2;
        /**
                 * !#en Sets vector with another's value
                 * !#zh 设置向量值。
                 * @param newValue - !#en new value to set. !#zh 要设置的新值
                 * @return returns this
                 * @chainable
                 */ set(newValue: Vec2): this;
        /**
                 * !#en Check whether two vector equal
                 * !#zh 当前的向量是否与指定的向量相等。
                 * @param other
                 * @return
                 */ equals(other: Vec2): boolean;
        /**
                 * !#en Check whether two vector equal with some degree of variance.
                 * !#zh
                 * 近似判断两个点是否相等。<br/>
                 * 判断 2 个向量是否在指定数值的范围之内，如果在则返回 true，反之则返回 false。
                 * @param other
                 * @param variance
                 * @return
                 */ fuzzyEquals(other: Vec2, variance: number): boolean;
        /**
                 * !#en Transform to string with vector informations
                 * !#zh 转换为方便阅读的字符串。
                 */ toString(): string;
        /**
                 * !#en Calculate linear interpolation result between this vector and another one with given ratio
                 * !#zh 线性插值。
                 * @param to
                 * @param ratio - the interpolation coefficient
                 * @param [out] - optional, the receiving vector, you can pass the same vec2
                 * to save result to itself, if not provided, a new vec2 will be created
                 * @return
                 */ lerp(to: Vec2, ratio: number, out?: Vec2): Vec2;
        /**
                 * !#en Clamp the vector between from float and to float.
                 * !#zh
                 * 返回指定限制区域后的向量。<br/>
                 * 向量大于 max_inclusive 则返回 max_inclusive。<br/>
                 * 向量小于 min_inclusive 则返回 min_inclusive。<br/>
                 * 否则返回自身。
                 * @param min_inclusive
                 * @param max_inclusive
                 * @return
                 * @example
                 * var min_inclusive = cc.v2(0, 0);
                 * var max_inclusive = cc.v2(20, 20);
                 * var v1 = cc.v2(20, 20).clamp(min_inclusive, max_inclusive); // Vec2 {x: 20, y: 20};
                 * var v2 = cc.v2(0, 0).clamp(min_inclusive, max_inclusive);   // Vec2 {x: 0, y: 0};
                 * var v3 = cc.v2(10, 10).clamp(min_inclusive, max_inclusive); // Vec2 {x: 10, y: 10};
                 */ clampf(min_inclusive: Vec2, max_inclusive: Vec2): this;
        /**
                 * !#en Adds this vector. If you want to save result to another vector, use add() instead.
                 * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
                 * @param vector
                 * @return returns this
                 * @chainable
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.addSelf(cc.v2(5, 5));// return Vec2 {x: 15, y: 15};
                 */ addSelf(vector: Vec2): this;
        /**
                 * !#en Adds two vectors, and returns the new result.
                 * !#zh 向量加法，并返回新结果。
                 * @param vector
                 * @param [out] - optional, the receiving vector, you can pass the same vec2
                 * to save result to itself, if not provided, a new vec2 will be created
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.add(cc.v2(5, 5));      // return Vec2 {x: 15, y: 15};
                 * var v1;
                 * v.add(cc.v2(5, 5), v1);  // return Vec2 {x: 15, y: 15};
                 */ add(vector: Vec2, out?: Vec2): Vec2;
        /**
                 * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
                 * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
                 * @param vector
                 * @return returns this
                 * @chainable
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.subSelf(cc.v2(5, 5));// return Vec2 {x: 5, y: 5};
                 */ subSelf(vector: Vec2): this;
        /**
                 * !#en Subtracts one vector from this, and returns the new result.
                 * !#zh 向量减法，并返回新结果。
                 * @param vector
                 * @param [out] - optional, the receiving vector, you can pass the same vec2
                 * to save result to itself, if not provided, a new vec2 will be created
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};
                 * var v1;
                 * v.sub(cc.v2(5, 5), v1);  // return Vec2 {x: 5, y: 5};
                 */ sub(vector: Vec2, out?: Vec2): Vec2;
        /**
                 * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
                 * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
                 * @param num
                 * @return returns this
                 * @chainable
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.mulSelf(5);// return Vec2 {x: 50, y: 50};
                 */ mulSelf(num: number): this;
        /**
                 * !#en Multiplies by a number, and returns the new result.
                 * !#zh 缩放向量，并返回新结果。
                 * @param num
                 * @param [out] - optional, the receiving vector, you can pass the same vec2
                 * to save result to itself, if not provided, a new vec2 will be created
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.mul(5);      // return Vec2 {x: 50, y: 50};
                 * var v1;
                 * v.mul(5, v1);  // return Vec2 {x: 50, y: 50};
                 */ mul(num: number, out?: Vec2): Vec2;
        /**
                 * !#en Multiplies two vectors.
                 * !#zh 分量相乘。
                 * @param vector
                 * @return returns this
                 * @chainable
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.scaleSelf(cc.v2(5, 5));// return Vec2 {x: 50, y: 50};
                 */ scaleSelf(vector: Vec2): this;
        /**
                 * !#en Multiplies two vectors, and returns the new result.
                 * !#zh 分量相乘，并返回新的结果。
                 *
                 * @param vector
                 * @param [out] - optional, the receiving vector, you can pass the same vec2
                 * to save result to itself, if not provided, a new vec2 will be created
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.scale(cc.v2(5, 5));      // return Vec2 {x: 50, y: 50};
                 * var v1;
                 * v.scale(cc.v2(5, 5), v1);  // return Vec2 {x: 50, y: 50};
                 */ scale(vector: Vec2, out?: Vec2): Vec2;
        /**
                 * !#en Divides by a number. If you want to save result to another vector, use div() instead.
                 * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
                 * @param divisor
                 * @return returns this
                 * @chainable
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.divSelf(5); // return Vec2 {x: 2, y: 2};
                 */ divSelf(num: number): this;
        /**
                 * !#en Divides by a number, and returns the new result.
                 * !#zh 向量除法，并返回新的结果。
                 *
                 * @param divisor
                 * @param [out] - optional, the receiving vector, you can pass the same vec2
                 * to save result to itself, if not provided, a new vec2 will be created
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.div(5);      // return Vec2 {x: 2, y: 2};
                 * var v1;
                 * v.div(5, v1);  // return Vec2 {x: 2, y: 2};
                 */ div(num: number, out?: Vec2): Vec2;
        /**
                 * !#en Negates the components. If you want to save result to another vector, use neg() instead.
                 * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
                 * @return returns this
                 * @chainable
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.negSelf(); // return Vec2 {x: -10, y: -10};
                 */ negSelf(): this;
        /**
                 * !#en Negates the components, and returns the new result.
                 * !#zh 返回取反后的新向量。
                 * @param [out] - optional, the receiving vector, you can pass the same vec2 to
                 * save result to itself, if not provided, a new vec2 will be created
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * var v1;
                 * v.neg(v1);  // return Vec2 {x: -10, y: -10};
                 */ neg(out?: Vec2): Vec2;
        /**
                 * !#en Dot product
                 * !#zh 当前向量与指定向量进行点乘。
                 * @param [vector]
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.dot(cc.v2(5, 5)); // return 100;
                 */ dot(vector: Vec2): number;
        /**
                 * !#en Cross product
                 * !#zh 当前向量与指定向量进行叉乘。
                 * @param [vector]
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.cross(cc.v2(5, 5)); // return 0;
                 */ cross(vector: Vec2): number;
        /**
                 * !#en Returns the length of this vector.
                 * !#zh 返回该向量的长度。
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.mag(); // return 14.142135623730951;
                 */ mag(): number;
        /**
                 * !#en Returns the squared length of this vector.
                 * !#zh 返回该向量的长度平方。
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.magSqr(); // return 200;
                 */ magSqr(): number;
        /**
                 * !#en Make the length of this vector to 1.
                 * !#zh 向量归一化，让这个向量的长度为 1。
                 * @return returns this
                 * @chainable
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.normalizeSelf(); // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
                 */ normalizeSelf(): this;
        /**
                 * !#en
                 * Returns this vector with a magnitude of 1.<br/>
                 * <br/>
                 * Note that the current vector is unchanged and a new normalized vector is returned.
                 * If you want to normalize the current vector, use normalizeSelf function.
                 * !#zh
                 * 返回归一化后的向量。<br/>
                 * <br/>
                 * 注意，当前向量不变，并返回一个新的归一化向量。如果你想来归一化当前向量，可使用 normalizeSelf 函数。
                 * @param [out] - optional, the receiving vector, you can pass the same vec2
                 * to save result to itself, if not provided, a new vec2 will be created
                 * @return result
                 * var v = cc.v2(10, 10);
                 * v.normalize();   // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
                 */ normalize(out?: Vec2): Vec2;
        /**
                 * !#en Get angle in radian between this and vector.
                 * !#zh 夹角的弧度。
                 * @param vector
                 * @return from 0 to Math.PI
                 */ angle(vector: Vec2): number;
        /**
                 * !#en Get angle in radian between this and vector with direction.
                 * !#zh 带方向的夹角的弧度。
                 * @param vector
                 * @return from -MathPI to Math.PI
                 */ signAngle(vector: Vec2): number;
        /**
                 * !#en rotate
                 * !#zh 返回旋转给定弧度后的新向量。
                 * @param radians
                 * @param [out] - optional, the receiving vector, you can pass the same vec2 to
                 * save result to itself, if not provided, a new vec2 will be created
                 * @return the result
                 */ rotate(radians: number, out?: Vec2): Vec2;
        /**
                 * !#en rotate self
                 * !#zh 按指定弧度旋转向量。
                 * @param radians
                 * @return returns this
                 * @chainable
                 */ rotateSelf(radians: number): this;
        /**
                 * !#en Calculates the projection of the current vector over the given vector.
                 * !#zh 返回当前向量在指定 vector 向量上的投影向量。
                 * @param vector
                 * @return
                 * @example
                 * var v1 = cc.v2(20, 20);
                 * var v2 = cc.v2(5, 5);
                 * v1.project(v2); // Vec2 {x: 20, y: 20};
                 */ project(vector: Vec2): Vec2;
        /**
                 * Transforms the vec2 with a mat4. 3rd vector component is implicitly '0', 4th vector component is implicitly '1'
                 * @param m matrix to transform with
                 * @param [out] the receiving vector, you can pass the same vec2
                 * to save result to itself, if not provided, a new vec2 will be created
                 * @returns out
                 */ transformMat4(m: Mat4, out?: Vec2): void;
        /**
                 * !#en return a Vec2 object with x = 1 and y = 1.
                 * !#zh 新 Vec2 对象。
                 */ static readonly ONE: Vec2;
        /**
                 * !#en return a Vec2 object with x = 0 and y = 0.
                 * !#zh 返回 x = 0 和 y = 0 的 Vec2 对象。
                 */ static readonly ZERO: Vec2;
        /**
                 * !#en return a Vec2 object with x = 0 and y = 1.
                 * !#zh 返回 x = 0 和 y = 1 的 Vec2 对象。
                 */ static readonly UP: Vec2;
        /**
                 * !#en return a Vec2 object with x = 1 and y = 0.
                 * !#zh 返回 x = 1 和 y = 0 的 Vec2 对象。
                 */ static readonly RIGHT: Vec2;
    }
    /**
         * !#en Representation of 3D vectors and points.
         * !#zh 表示 3D 向量和坐标
         */ export class Vec3 extends ValueType {
        x: number;
        y: number;
        z: number;
        /**
                 * !#en clone a Vec3 value
                 * !#zh 克隆一个 Vec3 值
                 */ clone(): Vec3;
        /**
                 * !#en Set the current vector value with the given vector.
                 * !#zh 用另一个向量设置当前的向量对象值。
                 *
                 * @param newValue - !#en new value to set. !#zh 要设置的新值
                 * @return returns this
                 * @chainable
                 */ set(newValue: Vec3): this;
        /**
                 * !#en Check whether the vector equals another one
                 * !#zh 当前的向量是否与指定的向量相等。
                 *
                 * @param other
                 * @return
                 */ equals(other: Vec3): boolean;
        /**
                 * !#en Check whether two vector equal with some degree of variance.
                 * !#zh
                 * 近似判断两个点是否相等。<br/>
                 * 判断 2 个向量是否在指定数值的范围之内，如果在则返回 true，反之则返回 false。
                 *
                 * @param other
                 * @param variance
                 * @return
                 */ fuzzyEquals(other: Vec3, variance: number): boolean;
        /**
                 * !#en Transform to string with vector informations
                 * !#zh 转换为方便阅读的字符串。
                 *
                 * @return
                 */ toString(): string;
        /**
                 * !#en Calculate linear interpolation result between this vector and another one with given ratio
                 * !#zh 线性插值。
                 *
                 * @param to
                 * @param ratio - the interpolation coefficient
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return
                 */ lerp(to: Vec3, ratio: number, out?: Vec3): Vec3;
        /**
                 * !#en Clamp the vector between from float and to float.
                 * !#zh
                 * 返回指定限制区域后的向量。<br/>
                 * 向量大于 max_inclusive 则返回 max_inclusive。<br/>
                 * 向量小于 min_inclusive 则返回 min_inclusive。<br/>
                 * 否则返回自身。
                 *
                 * @param min_inclusive
                 * @param max_inclusive
                 * @return
                 */ clampf(min_inclusive: Vec3, max_inclusive: Vec3): this;
        /**
                 * !#en Adds this vector. If you want to save result to another vector, use add() instead.
                 * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
                 *
                 * @param vector
                 * @return returns this
                 * @chainable
                 */ addSelf(vector: Vec3): this;
        /**
                 * !#en Adds two vectors, and returns the new result.
                 * !#zh 向量加法，并返回新结果。
                 *
                 * @param vector
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ add(vector: Vec3, out?: Vec3): Vec3;
        /**
                 * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
                 * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
                 *
                 * @param vector
                 * @return returns this
                 * @chainable
                 */ subSelf(vector: Vec3): this;
        /**
                 * !#en Subtracts one vector from this, and returns the new result.
                 * !#zh 向量减法，并返回新结果。
                 *
                 * @param vector
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ sub(vector: Vec3, out?: Vec3): Vec3;
        /**
                 * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
                 * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
                 *
                 * @param num
                 * @return returns this
                 * @chainable
                 */ mulSelf(num: number): this;
        /**
                 * !#en Multiplies by a number, and returns the new result.
                 * !#zh 缩放向量，并返回新结果。
                 *
                 * @param num
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ mul(num: number, out?: Vec3): Vec3;
        /**
                 * !#en Multiplies two vectors.
                 * !#zh 分量相乘。
                 *
                 * @param vector
                 * @return returns this
                 * @chainable
                 */ scaleSelf(vector: Vec3): this;
        /**
                 * !#en Multiplies two vectors, and returns the new result.
                 * !#zh 分量相乘，并返回新的结果。
                 *
                 * @param vector
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ scale(vector: Vec3, out?: Vec3): Vec3;
        /**
                 * !#en Divides by a number. If you want to save result to another vector, use div() instead.
                 * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
                 *
                 * @param vector
                 * @return returns this
                 * @chainable
                 */ divSelf(num: number): this;
        /**
                 * !#en Divides by a number, and returns the new result.
                 * !#zh 向量除法，并返回新的结果。
                 *
                 * @param vector
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ div(num: number, out?: Vec3): Vec3;
        /**
                 * !#en Negates the components. If you want to save result to another vector, use neg() instead.
                 * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
                 *
                 * @return returns this
                 * @chainable
                 */ negSelf(): this;
        /**
                 * !#en Negates the components, and returns the new result.
                 * !#zh 返回取反后的新向量。
                 *
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ neg(out?: Vec3): Vec3;
        /**
                 * !#en Dot product
                 * !#zh 当前向量与指定向量进行点乘。
                 *
                 * @param [vector]
                 * @return the result
                 */ dot(vector: Vec3): number;
        /**
                 * !#en Cross product
                 * !#zh 当前向量与指定向量进行叉乘。
                 *
                 * @param vector
                 * @param [out]
                 * @return the result
                 */ cross(vector: Vec3, out?: Vec3): Vec3;
        /**
                 * !#en Returns the length of this vector.
                 * !#zh 返回该向量的长度。
                 *
                 * @return the result
                 * @example
                 * var v = cc.v2(10, 10);
                 * v.mag(); // return 14.142135623730951;
                 */ mag(): number;
        /**
                 * !#en Returns the squared length of this vector.
                 * !#zh 返回该向量的长度平方。
                 *
                 * @return the result
                 */ magSqr(): number;
        /**
                 * !#en Make the length of this vector to 1.
                 * !#zh 向量归一化，让这个向量的长度为 1。
                 *
                 * @return returns this
                 * @chainable
                 */ normalizeSelf(): this;
        /**
                 * !#en
                 * Returns this vector with a magnitude of 1.<br/>
                 * <br/>
                 * Note that the current vector is unchanged and a new normalized vector is returned.
                 * If you want to normalize the current vector, use normalizeSelf function.
                 * !#zh
                 * 返回归一化后的向量。<br/>
                 * <br/>
                 * 注意，当前向量不变，并返回一个新的归一化向量。如果你想来归一化当前向量，可使用 normalizeSelf 函数。
                 *
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return result
                 */ normalize(out?: Vec3): Vec3;
        /**
                 * Transforms the vec3 with a mat4. 4th vector component is implicitly '1'
                 *
                 * @param m matrix to transform with
                 * @param [out] The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @returns out
                 */ transformMat4(m: Mat4, out?: Vec3): Vec3;
    }
    /**
         * !#en Representation of 3D vectors and points.
         * !#zh 表示 3D 向量和坐标
         *
         * @class Vec4
         * @extends ValueType
         */ export class Vec4 extends ValueType {
        x: number;
        y: number;
        z: number;
        w: number;
        /**
                 * !#en clone a Vec4 value
                 * !#zh 克隆一个 Vec4 值
                 *
                 * @return
                 */ clone(): Vec4;
        /**
                 * !#en Set the current vector value with the given vector.
                 * !#zh 用另一个向量设置当前的向量对象值。
                 *
                 * @param newValue - !#en new value to set. !#zh 要设置的新值
                 * @return returns this
                 * @chainable
                 */ set(newValue: Vec4): this;
        /**
                 * !#en Check whether the vector equals another one
                 * !#zh 当前的向量是否与指定的向量相等。
                 *
                 * @param other
                 * @return
                 */ equals(other: Vec4): boolean;
        /**
                 * !#en Check whether two vector equal with some degree of variance.
                 * !#zh
                 * 近似判断两个点是否相等。<br/>
                 * 判断 2 个向量是否在指定数值的范围之内，如果在则返回 true，反之则返回 false。
                 *
                 * @param other
                 * @param variance
                 * @return
                 */ fuzzyEquals(other: Vec4, variance: number): boolean;
        /**
                 * !#en Transform to string with vector informations
                 * !#zh 转换为方便阅读的字符串。
                 *
                 * @return
                 */ toString(): string;
        /**
                 * !#en Calculate linear interpolation result between this vector and another one with given ratio
                 * !#zh 线性插值。
                 *
                 * @param to
                 * @param ratio - the interpolation coefficient
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return
                 */ lerp(to: Vec4, ratio: number, out?: Vec4): Vec4;
        /**
                 * !#en Clamp the vector between from float and to float.
                 * !#zh
                 * 返回指定限制区域后的向量。<br/>
                 * 向量大于 max_inclusive 则返回 max_inclusive。<br/>
                 * 向量小于 min_inclusive 则返回 min_inclusive。<br/>
                 * 否则返回自身。
                 *
                 * @param min_inclusive
                 * @param max_inclusive
                 * @return
                 */ clampf(min_inclusive: Vec4, max_inclusive: Vec4): this;
        /**
                 * !#en Adds this vector. If you want to save result to another vector, use add() instead.
                 * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
                 *
                 * @param vector
                 * @return returns this
                 * @chainable
                 */ addSelf(vector: Vec4): this;
        /**
                 * !#en Adds two vectors, and returns the new result.
                 * !#zh 向量加法，并返回新结果。
                 *
                 * @param vector
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ add(vector: Vec4, out?: Vec4): Vec4;
        /**
                 * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
                 * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
                 *
                 * @param vector
                 * @return returns this
                 * @chainable
                 */ subSelf(vector: Vec4): this;
        /**
                 * !#en Subtracts one vector from this, and returns the new result.
                 * !#zh 向量减法，并返回新结果。
                 *
                 * @param vector
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ sub(vector: Vec4, out?: Vec4): Vec4;
        /**
                 * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
                 * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
                 *
                 * @param num
                 * @return returns this
                 * @chainable
                 */ mulSelf(num: number): this;
        /**
                 * !#en Multiplies by a number, and returns the new result.
                 * !#zh 缩放向量，并返回新结果。
                 *
                 * @param num
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ mul(num: number, out?: Vec4): Vec4;
        /**
                 * !#en Multiplies two vectors.
                 * !#zh 分量相乘。
                 *
                 * @param vector
                 * @return returns this
                 * @chainable
                 */ scaleSelf(vector: Vec4): this;
        /**
                 * !#en Multiplies two vectors, and returns the new result.
                 * !#zh 分量相乘，并返回新的结果。
                 *
                 * @param vector
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ scale(vector: Vec4, out?: Vec4): Vec4;
        /**
                 * !#en Divides by a number. If you want to save result to another vector, use div() instead.
                 * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
                 *
                 * @param vector
                 * @return returns this
                 * @chainable
                 */ divSelf(num: number): this;
        /**
                 * !#en Divides by a number, and returns the new result.
                 * !#zh 向量除法，并返回新的结果。
                 *
                 * @param vector
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ div(num: number, out?: Vec4): Vec4;
        /**
                 * !#en Negates the components. If you want to save result to another vector, use neg() instead.
                 * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
                 *
                 * @return returns this
                 * @chainable
                 */ negSelf(): this;
        /**
                 * !#en Negates the components, and returns the new result.
                 * !#zh 返回取反后的新向量。
                 *
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return the result
                 */ neg(out?: Vec4): Vec4;
        /**
                 * !#en Dot product
                 * !#zh 当前向量与指定向量进行点乘。
                 *
                 * @param [vector]
                 * @return the result
                 */ dot(vector: Vec4): number;
        /**
                 * !#en Cross product
                 * !#zh 当前向量与指定向量进行叉乘。
                 *
                 * @param vector
                 * @param [out]
                 * @return the result
                 */ cross(vector: Vec4, out?: Vec4): Vec4;
        /**
                 * !#en Returns the length of this vector.
                 * !#zh 返回该向量的长度。
                 *
                 * @return the result
                 * @example
                 * var v = cc.v4(10, 10);
                 * v.mag(); // return 14.142135623730951;
                 */ mag(): number;
        /**
                 * !#en Returns the squared length of this vector.
                 * !#zh 返回该向量的长度平方。
                 *
                 * @return the result
                 */ magSqr(): number;
        /**
                 * !#en Make the length of this vector to 1.
                 * !#zh 向量归一化，让这个向量的长度为 1。
                 *
                 * @return returns this
                 * @chainable
                 */ normalizeSelf(): this;
        /**
                 * !#en
                 * Returns this vector with a magnitude of 1.<br/>
                 * <br/>
                 * Note that the current vector is unchanged and a new normalized vector is returned.
                 * If you want to normalize the current vector, use normalizeSelf function.
                 * !#zh
                 * 返回归一化后的向量。<br/>
                 * <br/>
                 * 注意，当前向量不变，并返回一个新的归一化向量。如果你想来归一化当前向量，可使用 normalizeSelf 函数。
                 *
                 * @param [out] - The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return result
                 */ normalize(out?: Vec4): Vec4;
        /**
                 * Transforms the vec4 with a mat4. 4th vector component is implicitly '1'
                 *
                 * @param m matrix to transform with
                 * @param [out] The receiving vector, can be `this`; if absent, a new vector would be created.
                 * @return out
                 */ transformMat4(m: Mat4, out?: Vec4): Vec4;
    }
    /**
         * !#en Representation of 2D vectors and points.
         * !#zh 表示 2D 向量和坐标
         */ export class Quat extends ValueType {
        x: number;
        y: number;
        z: number;
        w: number;
        /**
                 * !#en clone a Quat object and return the new object
                 * !#zh 克隆一个四元数并返回
                 *
                 * @return
                 */ clone(): Quat;
        /**
                 * !#en Set values with another quaternion
                 * !#zh 用另一个四元数的值设置到当前对象上。
                 *
                 * @param newValue - !#en new value to set. !#zh 要设置的新值
                 * @return returns this
                 * @chainable
                 */ set(newValue: Quat): this;
        /**
                 * !#en Check whether current quaternion equals another
                 * !#zh 当前的四元数是否与指定的四元数相等。
                 *
                 * @param other
                 * @return
                 */ equals(other: Quat): boolean;
        getEulerAngles(out?: Vec3): Vec3;
        lerp(to: Quat, ratio: number, out?: Quat): Quat;
    }
    /**
         * !#en Representation of 4*4 matrix.
         * !#zh 表示 4*4 矩阵
         */ export class Mat4 extends ValueType {
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
        /**
                 * !#en clone a Mat4 object
                 * !#zh 克隆一个 Mat4 对象
                 *
                 * @return
                 */ clone(): Mat4;
        /**
                 * !#en Sets the matrix with another one's value
                 * !#zh 用另一个矩阵设置这个矩阵的值。
                 *
                 * @param srcObj
                 * @return returns this
                 * @chainable
                 */ set(other: Mat4): this;
        /**
                 * !#en Check whether two matrix equal
                 * !#zh 当前的矩阵是否与指定的矩阵相等。
                 *
                 * @param other
                 * @return
                 */ equals(other: Mat4): boolean;
        /**
                 * !#en Check whether two matrix equal with default degree of variance.
                 * !#zh
                 * 近似判断两个矩阵是否相等。<br/>
                 * 判断 2 个矩阵是否在默认误差范围之内，如果在则返回 true，反之则返回 false。
                 *
                 * @param other
                 * @return
                 */ fuzzyEquals(other: Mat4): boolean;
        /**
                 * !#en Transform to string with matrix informations
                 * !#zh 转换为方便阅读的字符串。
                 *
                 * @return
                 */ toString(): string;
        /**
                 * Set the matrix to the identity matrix
                 *
                 * @return self
                 * @chainable
                 */ identity(): any;
        /**
                 * Transpose the values of a mat4
                 *
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ transpose(out?: Mat4): any;
        /**
                 * Inverts a mat4
                 *
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ invert(out?: Mat4): any;
        /**
                 * Calculates the adjugate of a mat4
                 *
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ adjoint(out?: Mat4): any;
        /**
                 * Calculates the determinant of a mat4
                 *
                 * @return determinant of a
                 */ determinant(): number;
        /**
                 * Adds two Mat4
                 *
                 * @param other the second operand
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ add(other: Mat4, out?: Mat4): any;
        /**
                 * Subtracts the current matrix with another one
                 *
                 * @param other the second operand
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ sub(other: Mat4, out?: Mat4): any;
        /**
                 * Subtracts the current matrix with another one
                 *
                 * @param other the second operand
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ mul(other: Mat4, out?: Mat4): any;
        /**
                 * Multiply each element of the matrix by a scalar.
                 *
                 * @param number amount to scale the matrix's elements by
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ mulScalar(num: number, out?: Mat4): any;
        /**
                 * Translate a mat4 by the given vector
                 *
                 * @param v vector to translate by
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ translate(v: Vec3, out?: Mat4): any;
        /**
                 * Scales the mat4 by the dimensions in the given vec3
                 *
                 * @param v vector to scale by
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ scale(v: Vec3, out?: Mat4): any;
        /**
                 * Rotates a mat4 by the given angle around the given axis
                 *
                 * @param rad the angle to rotate the matrix by
                 * @param axis the axis to rotate around
                 * @param [out] The receiving matrix, can be `this`; if absent, a new matrix would be created.
                 * @return out
                 */ rotate(rad: number, axis: Vec3, out?: Mat4): any;
        /**
                 * Returns the translation vector component of a transformation matrix.
                 *
                 * @param  {Vec3} out Vector to receive translation component, if not provided, a new vec3 will be created
                 * @return out
                 */ getTranslation(out?: Mat4): any;
        /**
                 * Returns the scale factor component of a transformation matrix
                 *
                 * @param out Vector to receive scale component, if not provided, a new vec3 will be created
                 * @return out
                 */ getScale(out: Vec3): any;
        /**
                 * Returns the rotation factor component of a transformation matrix
                 *
                 * @param out Vector to receive rotation component, if not provided, a new quaternion object will be created
                 * @return out
                 */ getRotation(out: Quat): any;
        /**
                 * Restore the matrix values from a quaternion rotation, vector translation and vector scale
                 *
                 * @param q Rotation quaternion
                 * @param v Translation vector
                 * @param s Scaling vector
                 * @return the current mat4 object
                 * @chainable
                 */ fromRTS(q: Quat, v: Vec3, s: Vec3): any;
        /**
                 * Restore the matrix values from a quaternion rotation
                 *
                 * @param q Rotation quaternion
                 * @return the current mat4 object
                 * @chainable
                 */ fromQuat(quat: Quat): any;
    }
    /****************************************************************************
         Copyright (c) 2008-2010 Ricardo Quesada
         Copyright (c) 2011-2012 cocos2d-x.org
         Copyright (c) 2013-2016 Chukong Technologies Inc.
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
         ****************************************************************************/ /**
         * !#en
         * AffineTransform class represent an affine transform matrix. It's composed basically by translation, rotation, scale transformations.<br/>
         * !#zh
         * AffineTransform 类代表一个仿射变换矩阵。它基本上是由平移旋转，缩放转变所组成。<br/>
         */ export class AffineTransform {
        /**
                 * !#en Create a AffineTransform object with all contents in the matrix.
                 * !#zh 用在矩阵中的所有内容创建一个 AffineTransform 对象。
                 */ static create(a: number, b: number, c: number, d: number, tx: number, ty: number): AffineTransform;
        /**
                 * !#en
                 * Create a identity transformation matrix: <br/>
                 * [ 1, 0, 0, <br/>
                 *   0, 1, 0 ]
                 * !#zh
                 * 单位矩阵：<br/>
                 * [ 1, 0, 0, <br/>
                 *   0, 1, 0 ]
                 */ static identity(): AffineTransform;
        /**
                 * !#en Clone a AffineTransform object from the specified transform.
                 * !#zh 克隆指定的 AffineTransform 对象。
                 */ static clone(t: AffineTransform): AffineTransform;
        /**
                 * !#en
                 * Concatenate a transform matrix to another
                 * The results are reflected in the out affine transform
                 * out = t1 * t2
                 * This function is memory free, you should create the output affine transform by yourself and manage its memory.
                 * !#zh
                 * 拼接两个矩阵，将结果保存到 out 矩阵。这个函数不创建任何内存，你需要先创建 AffineTransform 对象用来存储结果，并作为第一个参数传入函数。
                 * out = t1 * t2
                 * @param out Out object to store the concat result
                 * @param t1 The first transform object.
                 * @param t2 The transform object to concatenate.
                 * @return Out object with the result of concatenation.
                 */ static concat(out: AffineTransform, t1: AffineTransform, t2: AffineTransform): AffineTransform;
        /**
                 * !#en Get the invert transform of an AffineTransform object.
                 * This function is memory free, you should create the output affine transform by yourself and manage its memory.
                 * !#zh 求逆矩阵。这个函数不创建任何内存，你需要先创建 AffineTransform 对象用来存储结果，并作为第一个参数传入函数。
                 * @return Out object with inverted result.
                 */ static invert(out: AffineTransform, t: AffineTransform): AffineTransform;
        /**
                 * !#en Get an AffineTransform object from a given matrix 4x4.
                 * This function is memory free, you should create the output affine transform by yourself and manage its memory.
                 * !#zh 从一个 4x4 Matrix 获取 AffineTransform 对象。这个函数不创建任何内存，你需要先创建 AffineTransform 对象用来存储结果，并作为第一个参数传入函数。
                 * @return Out object with inverted result.
                 */ static fromMat4(out: AffineTransform, mat: Mat4): AffineTransform;
        /**
                 * !#en Apply the affine transformation on a point.
                 * This function is memory free, you should create the output Vec2 by yourself and manage its memory.
                 * !#zh 对一个点应用矩阵变换。这个函数不创建任何内存，你需要先创建一个 Vec2 对象用来存储结果，并作为第一个参数传入函数。
                 * @param out The output point to store the result
                 * @param point Point to apply transform.
                 * @param t Transform matrix.
                 */ static transformVec2(out: Vec2, point: Vec2, t: AffineTransform): Vec2;
        /**
                 * !#en Apply the affine transformation on a point.
                 * This function is memory free, you should create the output Vec2 by yourself and manage its memory.
                 * !#zh 对一个点应用矩阵变换。这个函数不创建任何内存，你需要先创建一个 Vec2 对象用来存储结果，并作为第一个参数传入函数。
                 * @param out The output point to store the result
                 * @param x The x.
                 * @param y The y.
                 * @param t Transform matrix.
                 */ static transformVec2(out: Vec2, x: number, y: number, t: AffineTransform): Vec2;
        /**
                 * !#en Apply the affine transformation on a size.
                 * This function is memory free, you should create the output Size by yourself and manage its memory.
                 * !#zh 应用仿射变换矩阵到 Size 上。这个函数不创建任何内存，你需要先创建一个 Size 对象用来存储结果，并作为第一个参数传入函数。
                 * @param out The output point to store the result
                 */ static transformSize(out: Size, size: Size, t: AffineTransform): Size;
        /**
                 * !#en Apply the affine transformation on a rect.
                 * This function is memory free, you should create the output Rect by yourself and manage its memory.
                 * !#zh 应用仿射变换矩阵到 Rect 上。这个函数不创建任何内存，你需要先创建一个 Rect 对象用来存储结果，并作为第一个参数传入函数。
                 */ static transformRect(out: Rect, rect: Rect, t: AffineTransform): Rect;
        /**
                 * !#en Apply the affine transformation on a rect, and truns to an Oriented Bounding Box.
                 * This function is memory free, you should create the output vectors by yourself and manage their memory.
                 * !#zh 应用仿射变换矩阵到 Rect 上, 并转换为有向包围盒。这个函数不创建任何内存，你需要先创建包围盒的四个 Vector 对象用来存储结果，并作为前四个参数传入函数。
                 */ static transformObb(out_bl: Vec2, out_tl: Vec2, out_tr: Vec2, out_br: Vec2, rect: Rect, anAffineTransform: AffineTransform): void;
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
    }
    /**
         * !#en
         * cc.Size is the class for size object,<br/>
         * please do not use its constructor to create sizes,<br/>
         * use {{#crossLink "cc/size:method"}}{{/crossLink}} alias function instead.<br/>
         * It will be deprecated soon, please use cc.Vec2 instead.
         *
         * !#zh
         * cc.Size 是 size 对象的类。<br/>
         * 请不要使用它的构造函数创建的 size，<br/>
         * 使用 {{#crossLink "cc/size:method"}}{{/crossLink}} 别名函数。<br/>
         * 它不久将被取消，请使用cc.Vec2代替。
         *
         * @class Size
         */ export class Size extends ValueType {
        width: number;
        height: number;
        /**
                 * !#en return a Size object with width = 0 and height = 0.
                 * !#zh 返回一个宽度为 0 和高度为 0 的 Size 对象。
                 */ static readonly ZERO: Size;
        /**
                 * !#en Clone a new size object from this one.
                 * !#zh 克隆 size 对象。
                 * @example
                 * var a = new cc.size(10, 10);
                 * a.clone();// return Size {width: 0, height: 0};
                 */ clone(): Size;
        /**
                 * !#en TODO
                 * !#zh 当前 Size 对象是否等于指定 Size 对象。
                 * @example
                 * var a = new cc.size(10, 10);
                 * a.equals(new cc.size(10, 10));// return true;
                 */ equals(other: Size): boolean;
        /**
                 * !#en TODO
                 * !#zh 线性插值。
                 * @param to
                 * @param ratio - the interpolation coefficient.
                 * @param out - optional, the receiving vector.
                 * @example
                 * var a = new cc.size(10, 10);
                 * var b = new cc.rect(50, 50, 100, 100);
                 * update (dt) {
                 *    // method 1;
                 *    var c = a.lerp(b, dt * 0.1);
                 *    // method 2;
                 *    a.lerp(b, dt * 0.1, c);
                 * }
                 */ lerp(to: Size, ratio: number, out?: Size): Size;
        set(source: Size): void;
        /**
                 * !#en TODO
                 * !#zh 转换为方便阅读的字符串。
                 * @example
                 * var a = new cc.size(10, 10);
                 * a.toString();// return "(10.00, 10.00)";
                 */ toString(): string;
    }
    /**
         * !#en A 2D rectangle defined by x, y position and width, height.
         * !#zh 通过位置和宽高定义的 2D 矩形。
         * @class Rect
         * @extends ValueType
         */ export class Rect extends ValueType {
        /**
                 * !#en The minimum x value, equals to rect.x
                 * !#zh 矩形 x 轴上的最小值，等价于 rect.x。
                 */ xMin: number;
        /**
                 * !#en The minimum y value, equals to rect.y
                 * !#zh 矩形 y 轴上的最小值。
                 */ yMin: number;
        /**
                 * !#en The maximum x value.
                 * !#zh 矩形 x 轴上的最大值。
                 */ xMax: number;
        /**
                 * !#en The maximum y value.
                 * !#zh 矩形 y 轴上的最大值。
                 */ yMax: number;
        /**
                 * !#en The position of the center of the rectangle.
                 * !#zh 矩形的中心点。
                 */ center: any;
        /**
                 * !#en The X and Y position of the rectangle.
                 * !#zh 矩形的 x 和 y 坐标。
                 */ origin: any;
        /**
                 * !#en Width and height of the rectangle.
                 * !#zh 矩形的大小。
                 */ size: Size;
        /**
                 * !#en Creates a rectangle from two coordinate values.
                 * !#zh 根据指定 2 个坐标创建出一个矩形区域。
                 * @param v1
                 * @param v2
                 * @return
                 * @example
                 * cc.Rect.fromMinMax(cc.v2(10, 10), cc.v2(20, 20)); // Rect {x: 10, y: 10, width: 10, height: 10};
                 */ static fromMinMax(v1: Vec2, v2: Vec2): Rect;
        x: number;
        y: number;
        width: number;
        height: number;
        /**
                 * !#en TODO
                 * !#zh 克隆一个新的 Rect。
                 * @example
                 * var a = new cc.Rect(0, 0, 10, 10);
                 * a.clone();// Rect {x: 0, y: 0, width: 10, height: 10}
                 */ clone(): Rect;
        /**
                 * !#en TODO
                 * !#zh 是否等于指定的矩形。
                 * @param other
                 * @example
                 * var a = new cc.Rect(0, 0, 10, 10);
                 * var b = new cc.Rect(0, 0, 10, 10);
                 * a.equals(b);// true;
                 */ equals(other: Rect): boolean;
        /**
                 * !#en TODO
                 * !#zh 线性插值
                 *
                 * @param to
                 * @param ratio - the interpolation coefficient.
                 * @param out - optional, the receiving vector.
                 * @example
                 * var a = new cc.Rect(0, 0, 10, 10);
                 * var b = new cc.Rect(50, 50, 100, 100);
                 * update (dt) {
                 *    // method 1;
                 *    var c = a.lerp(b, dt * 0.1);
                 *    // method 2;
                 *    a.lerp(b, dt * 0.1, c);
                 * }
                 */ lerp(to: Rect, ratio: number, out?: Rect): Rect;
        set(source: Rect): void;
        /**
                 * !#en Check whether the current rectangle intersects with the given one
                 * !#zh 当前矩形与指定矩形是否相交。
                 *
                 * @param other
                 * @return
                 * @example
                 * var a = new cc.Rect(0, 0, 10, 10);
                 * var b = new cc.Rect(0, 0, 20, 20);
                 * a.intersects(b);// true
                 */ intersects(other: Rect): boolean;
        /**
                 * !#en Returns the overlapping portion of 2 rectangles.
                 * !#zh 返回 2 个矩形重叠的部分。
                 *
                 * @param out Stores the result
                 * @param rectB
                 * @return Returns the out parameter
                 * @example
                 * var a = new cc.Rect(0, 10, 20, 20);
                 * var b = new cc.Rect(0, 10, 10, 10);
                 * var intersection = new cc.Rect();
                 * a.intersection(intersection, b); // intersection {x: 0, y: 10, width: 10, height: 10};
                 */ intersection(out: Rect, rectB: Rect): Rect;
        /**
                 * !#en Check whether the current rect contains the given point
                 * !#zh 当前矩形是否包含指定坐标点。
                 * Returns true if the point inside this rectangle.
                 * @param point
                 * @example
                 * var a = new cc.Rect(0, 0, 10, 10);
                 * var b = new cc.Vec2(0, 5);
                 * a.contains(b);// true
                 */ contains(point: Vec2): boolean;
        /**
                 * !#en Returns true if the other rect totally inside this rectangle.
                 * !#zh 当前矩形是否包含指定矩形。
                 * @param other
                 * @example
                 * var a = new cc.Rect(0, 0, 20, 20);
                 * var b = new cc.Rect(0, 0, 10, 10);
                 * a.containsRect(b);// true
                 */ containsRect(other: Rect): boolean;
        /**
                 * !#en Returns the smallest rectangle that contains the current rect and the given rect.
                 * !#zh 返回一个包含当前矩形和指定矩形的最小矩形。
                 * @param out Stores the result
                 * @param rectB
                 * @return Returns the out parameter
                 * @example
                 * var a = new cc.Rect(0, 10, 20, 20);
                 * var b = new cc.Rect(0, 10, 10, 10);
                 * var union = new cc.Rect();
                 * a.union(union, b); // union {x: 0, y: 10, width: 20, height: 20};
                 */ union(out: Rect, rectB: Rect): Rect;
        /**
                 * !#en Apply matrix4 to the rect.
                 * !#zh 使用 mat4 对矩形进行矩阵转换。
                 * @param out The output rect
                 * @param mat The matrix4
                 */ transformMat4(out: Rect, mat: Mat4): Rect;
        /**
                 * !#en Output rect informations to string
                 * !#zh 转换为方便阅读的字符串
                 * @example
                 * var a = new cc.Rect(0, 0, 10, 10);
                 * a.toString();// "(0.00, 0.00, 10.00, 10.00)";
                 */ toString(): string;
    }
    /**
         * !#en
         * Representation of RGBA colors.
         *
         * Each color component is a floating point value with a range from 0 to 255.
         *
         * You can also use the convenience method {{#crossLink "cc/color:method"}}cc.color{{/crossLink}} to create a new Color.
         *
         * !#zh
         * cc.Color 用于表示颜色。
         *
         * 它包含 RGBA 四个以浮点数保存的颜色分量，每个的值都在 0 到 255 之间。
         *
         * 您也可以通过使用 {{#crossLink "cc/color:method"}}cc.color{{/crossLink}} 的便捷方法来创建一个新的 Color。
         *
         * @class Color
         * @extends ValueType
         */ export class Color extends ValueType {
        private _val;
        /**
                 * !#en Solid white, RGBA is [255, 255, 255, 255].
                 * !#zh 纯白色，RGBA 是 [255, 255, 255, 255]。
                 */ static readonly WHITE: Color;
        /**
                 * !#en Solid black, RGBA is [0, 0, 0, 255].
                 * !#zh 纯黑色，RGBA 是 [0, 0, 0, 255]。
                 */ static readonly BLACK: Color;
        /**
                 * !#en Transparent, RGBA is [0, 0, 0, 0].
                 * !#zh 透明，RGBA 是 [0, 0, 0, 0]。
                 */ static readonly TRANSPARENT: Color;
        /**
                 * !#en Grey, RGBA is [127.5, 127.5, 127.5].
                 * !#zh 灰色，RGBA 是 [127.5, 127.5, 127.5]。
                 */ static readonly GRAY: Color;
        /**
                 * !#en Solid red, RGBA is [255, 0, 0].
                 * !#zh 纯红色，RGBA 是 [255, 0, 0]。
                 */ static readonly RED: Color;
        /**
                 * !#en Solid green, RGBA is [0, 255, 0].
                 * !#zh 纯绿色，RGBA 是 [0, 255, 0]。
                 */ static readonly GREEN: Color;
        /**
                 * !#en Solid blue, RGBA is [0, 0, 255].
                 * !#zh 纯蓝色，RGBA 是 [0, 0, 255]。
                 */ static readonly BLUE: Color;
        /**
                 * !#en Yellow, RGBA is [255, 235, 4].
                 * !#zh 黄色，RGBA 是 [255, 235, 4]。
                 */ static readonly YELLOW: Color;
        /**
                 * !#en Orange, RGBA is [255, 127, 0].
                 * !#zh 橙色，RGBA 是 [255, 127, 0]。
                 */ static readonly ORANGE: Color;
        /**
                 * !#en Cyan, RGBA is [0, 255, 255].
                 * !#zh 青色，RGBA 是 [0, 255, 255]。
                 */ static readonly CYAN: Color;
        /**
                 * !#en Magenta, RGBA is [255, 0, 255].
                 * !#zh 洋红色（品红色），RGBA 是 [255, 0, 255]。
                 */ static readonly MAGENTA: Color;
        /**
                 * !#en red channel value
                 * !#zh 红色通道值
                 */ r: number;
        /**
                 * !#en green channel value
                 * !#zh 绿色通道值
                 */ g: number;
        /**
                 * !#en blue channel value
                 * !#zh 蓝色通道值
                 */ b: number;
        /**
                 * !#en alpha channel value
                 * !#zh 透明度通道值
                 */ a: number;
        /**
                 * !#en Clone a new color from the current color.
                 * !#zh 克隆当前颜色。
                 *
                 * @return Newly created color.
                 * @example
                 * var color = new cc.Color();
                 * var newColor = color.clone();// Color {r: 0, g: 0, b: 0, a: 255}
                 */ clone(): Color;
        /**
                 * !#en TODO
                 * !#zh 判断两个颜色是否相等。
                 *
                 * @param other
                 * @return
                 * @example
                 * var color1 = cc.Color.WHITE;
                 * var color2 = new cc.Color(255, 255, 255);
                 * cc.log(color1.equals(color2)); // true;
                 * color2 = cc.Color.RED;
                 * cc.log(color2.equals(color1)); // false;
                 */ equals(other: Color): boolean;
        /**
                 * !#en TODO
                 * !#zh 线性插值
                 *
                 * @param to
                 * @param ratio - the interpolation coefficient.
                 * @param [out] - optional, the receiving vector.
                 * @return
                 * @example {@link utils/api/engine/docs/cocos2d/core/value-types/CCColor/lerp.js}
                 */ lerp(to: Color, ratio: number, out?: Color): Color;
        /**
                 * !#en TODO
                 * !#zh 转换为方便阅读的字符串。
                 *
                 * @return
                 * @example
                 * var color = cc.Color.WHITE;
                 * color.toString(); // "rgba(255, 255, 255, 255)"
                 */ toString(): string;
        /**
                 * !#en Convert color to css format.
                 * !#zh 转换为 CSS 格式。
                 *
                 * @param opt - "rgba", "rgb", "#rgb" or "#rrggbb".
                 * @return
                 * @example {@link utils/api/engine/docs/cocos2d/core/value-types/CCColor/toCSS.js}
                 */ toCSS(opt: 'rgba' | 'rgb' | '#rgb' | '#rrggbb'): string;
        /**
                 * !#en Read hex string and store color data into the current color object,
                 * the hex string must be formated as rgba or rgb.
                 * !#zh 读取 16 进制颜色。
                 *
                 * @param hexString
                 * @return
                 * @chainable
                 * @example
                 * var color = cc.Color.BLACK;
                 * color.fromHEX("#FFFF33"); // Color {r: 255, g: 255, b: 51, a: 255};
                 */ fromHEX(hexString: string): this;
        /**
                 * !#en convert Color to HEX color string.
                 * e.g.  cc.color(255,6,255)  to : "#ff06ff"
                 * !#zh 转换为 16 进制。
                 *
                 * @param fmt - "#rgb", "#rrggbb" or "#rrggbbaa".
                 * @return
                 * @example
                 * var color = cc.Color.BLACK;
                 * color.toHEX("#rgb");     // "000";
                 * color.toHEX("#rrggbb");  // "000000";
                 */ toHEX(fmt: '#rgb' | '#rrggbb' | '#rrggbbaa'): string;
        /**
                 * !#en Convert to 24bit rgb value.
                 * !#zh 转换为 24bit 的 RGB 值。
                 *
                 * @return
                 * @example
                 * var color = cc.Color.YELLOW;
                 * color.toRGBValue(); // 16771844;
                 */ toRGBValue(): number;
        /**
                 * !#en Read HSV model color and convert to RGB color
                 * !#zh 读取 HSV（色彩模型）格式。
                 *
                 * @param h
                 * @param s
                 * @param v
                 * @return
                 * @chainable
                 * @example
                 * var color = cc.Color.YELLOW;
                 * color.fromHSV(0, 0, 1); // Color {r: 255, g: 255, b: 255, a: 255};
                 */ fromHSV(h: number, s: number, v: number): this;
        /**
                 * !#en Transform to HSV model color
                 * !#zh 转换为 HSV（色彩模型）格式。
                 *
                 * @return - {h: number, s: number, v: number}.
                 * @example
                 * var color = cc.Color.YELLOW;
                 * color.toHSV(); // Object {h: 0.1533864541832669, s: 0.9843137254901961, v: 1};
                 */ toHSV(): {
            h: number;
            s: number;
            v: number;
        };
        set(c: Color): void;
        mulSelf(c: Color): this;
        mul(c: Color, out?: Color): Color;
        x: number;
        y: number;
        z: number;
        w: number;
    }
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
         */ export class BaseNode extends CCObject {
        /**
                 * If true, the node is an persist node which won't be destroyed during scene transition.
                 * If false, the node will be destroyed automatically when loading a new scene. Default is false.
                 * @property _persistNode
                 * @type {Boolean}
                 * @default false
                 * @protected
                 */ _persistNode: boolean;
        /**
                 * !#en Name of node.
                 * !#zh 该节点名称。
                 * @property name
                 * @type {String}
                 * @example
                 * node.name = "New Node";
                 * cc.log("Node Name: " + node.name);
                 */ name: string;
        /**
                 * !#en The uuid for editor, will be stripped before building project.
                 * !#zh 主要用于编辑器的 uuid，在编辑器下可用于持久化存储，在项目构建之后将变成自增的 id。
                 * @property uuid
                 * @type {String}
                 * @readOnly
                 * @example
                 * cc.log("Node Uuid: " + node.uuid);
                 */ readonly uuid: string;
        /**
                 * !#en All children nodes.
                 * !#zh 节点的所有子节点。
                 * @property children
                 * @type {Node[]}
                 * @readOnly
                 * @example
                 * var children = node.children;
                 * for (var i = 0; i < children.length; ++i) {
                 *     cc.log("Node: " + children[i]);
                 * }
                 */ readonly children: this[];
        /**
                 * !#en All children nodes.
                 * !#zh 节点的子节点数量。
                 * @property childrenCount
                 * @type {Number}
                 * @readOnly
                 * @example
                 * var count = node.childrenCount;
                 * cc.log("Node Children Count: " + count);
                 */ readonly childrenCount: number;
        /**
                 * !#en
                 * The local active state of this node.<br/>
                 * Note that a Node may be inactive because a parent is not active, even if this returns true.<br/>
                 * Use {{#crossLink "Node/activeInHierarchy:property"}}{{/crossLink}}
                 * if you want to check if the Node is actually treated as active in the scene.
                 * !#zh
                 * 当前节点的自身激活状态。<br/>
                 * 值得注意的是，一个节点的父节点如果不被激活，那么即使它自身设为激活，它仍然无法激活。<br/>
                 * 如果你想检查节点在场景中实际的激活状态可以使用 {{#crossLink "Node/activeInHierarchy:property"}}{{/crossLink}}。
                 * @property active
                 * @type {Boolean}
                 * @default true
                 * @example
                 * node.active = false;
                 */ active: boolean;
        /**
                 * !#en Indicates whether this node is active in the scene.
                 * !#zh 表示此节点是否在场景中激活。
                 * @property activeInHierarchy
                 * @type {Boolean}
                 * @example
                 * cc.log("activeInHierarchy: " + node.activeInHierarchy);
                 */ readonly activeInHierarchy: boolean;
        parent: this | null;
        readonly scene: Scene;
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
                 * @default 0
                 */ protected _level: number;
        /**
                 * @default []
                 * @readOnly
                 */ protected _components: Component[];
        /**
                 * The PrefabInfo object
                 * @type {PrefabInfo}
                 */ protected _prefab: any;
        /**
                 * !#en which scene this node belongs to.
                 * !#zh 此节点属于哪个场景。
                 * @type {cc.Scene}}
                 */ protected _scene: Scene;
        protected _activeInHierarchy: boolean;
        protected _id: string;
        /**
                 * Register all related EventTargets,
                 * all event callbacks will be removed in _onPreDestroy
                 * protected __eventTargets: EventTarget[] = [];
                 */ protected __eventTargets: any[];
        /**
                 * !#en Get parent of the node.
                 * !#zh 获取该节点的父节点。
                 * @example
                 * var parent = this.node.getParent();
                 */ getParent(): this | null;
        /**
                 * !#en Set parent of the node.
                 * !#zh 设置该节点的父节点。
                 * @example
                 * node.setParent(newNode);
                 */ setParent(value: this | null, keepWorldTransform?: boolean): any;
        /**
                 * !#en
                 * Properties configuration function <br/>
                 * All properties in attrs will be set to the node, <br/>
                 * when the setter of the node is available, <br/>
                 * the property will be set via setter function.<br/>
                 * !#zh 属性配置函数。在 attrs 的所有属性将被设置为节点属性。
                 * @param attrs - Properties to be set to node
                 * @example
                 * var attrs = { key: 0, num: 100 };
                 * node.attr(attrs);
                 */ attr(attrs: Object): void;
        /**
                 * !#en Returns a child from the container given its uuid.
                 * !#zh 通过 uuid 获取节点的子节点。
                 * @param uuid - The uuid to find the child node.
                 * @return a Node whose uuid equals to the input parameter
                 * @example
                 * var child = node.getChildByUuid(uuid);
                 */ getChildByUuid(uuid: string): this | null;
        /**
                 * !#en Returns a child from the container given its name.
                 * !#zh 通过名称获取节点的子节点。
                 * @param name - A name to find the child node.
                 * @return a CCNode object whose name equals to the input parameter
                 * @example
                 * var child = node.getChildByName("Test Node");
                 */ getChildByName(name: string): this | null;
        /**
                 * !#en Returns a child from the container given its path.
                 * !#zh 通过路径获取节点的子节点。
                 * @param path - A path to find the child node.
                 * @return a CCNode object whose name equals to the input parameter
                 * @example
                 * var child = node.getChildByPath("Test Node");
                 */ getChildByPath(path: string): this | null;
        addChild(child: this): void;
        /**
                 * !#en
                 * Inserts a child to the node at a specified index.
                 * !#zh
                 * 插入子节点到指定位置
                 * @param child - the child node to be inserted
                 * @param siblingIndex - the sibling index to place the child in
                 * @example
                 * node.insertChild(child, 2);
                 */ insertChild(child: this, siblingIndex: number): void;
        /**
                 * !#en Get the sibling index.
                 * !#zh 获取同级索引。
                 * @example
                 * var index = node.getSiblingIndex();
                 */ getSiblingIndex(): number;
        /**
                 * !#en Set the sibling index of this node.
                 * !#zh 设置节点同级索引。
                 * @example
                 * node.setSiblingIndex(1);
                 */ setSiblingIndex(index: number): void;
        /**
                 * !#en Walk though the sub children tree of the current node.
                 * Each node, including the current node, in the sub tree will be visited two times,
                 * before all children and after all children.
                 * This function call is not recursive, it's based on stack.
                 * Please don't walk any other node inside the walk process.
                 * !#zh 遍历该节点的子树里的所有节点并按规则执行回调函数。
                 * 对子树中的所有节点，包含当前节点，会执行两次回调，prefunc 会在访问它的子节点之前调用，postfunc 会在访问所有子节点之后调用。
                 * 这个函数的实现不是基于递归的，而是基于栈展开递归的方式。
                 * 请不要在 walk 过程中对任何其他的节点嵌套执行 walk。
                 * @param prefunc The callback to process node when reach the node for the first time
                 * @param postfunc The callback to process node when re-visit the node after walked all children in its sub tree
                 * @example
                 * node.walk(function (target) {
                 *     console.log('Walked through node ' + target.name + ' for the first time');
                 * }, function (target) {
                 *     console.log('Walked through node ' + target.name + ' after walked all children in its sub tree');
                 * });
                 */ walk(prefunc: (target: this) => void, postfunc?: (target: this) => void): void;
        /**
                 * !#en
                 * Remove itself from its parent node. If cleanup is `true`, then also remove all events and actions. <br/>
                 * If the cleanup parameter is not passed, it will force a cleanup,
                 * so it is recommended that you always pass in the `false` parameter when calling this API.<br/>
                 * If the node orphan, then nothing happens.
                 * !#zh
                 * 从父节点中删除该节点。如果不传入 cleanup 参数或者传入 `true`，那么这个节点上所有绑定的事件、action 都会被删除。<br/>
                 * 因此建议调用这个 API 时总是传入 `false` 参数。<br/>
                 * 如果这个节点是一个孤节点，那么什么都不会发生。
                 * @param [cleanup=true] - true if all actions and callbacks on this node should be removed, false otherwise.
                 * @see cc.Node#removeFromParentAndCleanup
                 * @example
                 * node.removeFromParent();
                 * node.removeFromParent(false);
                 */ removeFromParent(cleanup?: boolean): void;
        /**
                 * !#en
                 * Removes a child from the container.
                 * It will also cleanup all running actions depending on the cleanup parameter. </p>
                 * If the cleanup parameter is not passed, it will force a cleanup. <br/>
                 * "remove" logic MUST only be on this method  <br/>
                 * If a class wants to extend the 'removeChild' behavior it only needs <br/>
                 * to override this method.
                 * !#zh
                 * 移除节点中指定的子节点，是否需要清理所有正在运行的行为取决于 cleanup 参数。<br/>
                 * 如果 cleanup 参数不传入，默认为 true 表示清理。<br/>
                 * @param child - The child node which will be removed.
                 * @param [cleanup=true] - true if all running actions and callbacks on the child node
                 * will be cleanup, false otherwise.
                 * @example
                 * node.removeChild(newNode);
                 * node.removeChild(newNode, false);
                 */ removeChild(child: this, cleanup?: boolean): void;
        /**
                 * !#en
                 * Removes all children from the container and
                 * do a cleanup all running actions depending on the cleanup parameter. <br/>
                 * If the cleanup parameter is not passed, it will force a cleanup.
                 * !#zh
                 * 移除节点所有的子节点，是否需要清理所有正在运行的行为取决于 cleanup 参数。<br/>
                 * 如果 cleanup 参数不传入，默认为 true 表示清理。
                 * @param [cleanup=true] - true if all running actions on all children nodes
                 * should be cleanup, false otherwise.
                 * @example
                 * node.removeAllChildren();
                 * node.removeAllChildren(false);
                 */ removeAllChildren(cleanup?: boolean): void;
        /**
                 * !#en Is this node a child of the given node?
                 * !#zh 是否是指定节点的子节点？
                 * @return True if this node is a child, deep child or identical to the given node.
                 * @example
                 * node.isChildOf(newNode);
                 */ isChildOf(parent: this): boolean;
        /**
                 * !#en
                 * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
                 * You can also get component in the node by passing in the name of the script.
                 * !#zh
                 * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
                 * 传入参数也可以是脚本的名称。
                 * @example
                 * // get sprite component.
                 * var sprite = node.getComponent(cc.Sprite);
                 */ getComponent<T extends Component>(classConstructor: __unexported.cocos_scene_graph_base_node_Constructor<T>): T | null;
        /**
                 * !#en
                 * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
                 * You can also get component in the node by passing in the name of the script.
                 * !#zh
                 * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
                 * 传入参数也可以是脚本的名称。
                 * @example
                 * // get custom test calss.
                 * var test = node.getComponent("Test");
                 */ getComponent(className: string): Component | null;
        /**
                 * !#en Returns all components of supplied type in the node.
                 * !#zh 返回节点上指定类型的所有组件。
                 * @example
                 * var sprites = node.getComponents(cc.Sprite);
                 */ getComponents<T extends Component>(classConstructor: __unexported.cocos_scene_graph_base_node_Constructor<T>): T[];
        /**
                 * !#en Returns all components of supplied type in the node.
                 * !#zh 返回节点上指定类型的所有组件。
                 * @example
                 * var tests = node.getComponents("Test");
                 */ getComponents(className: string): Component[];
        /**
                 * !#en Returns the component of supplied type in any of its children using depth first search.
                 * !#zh 递归查找所有子节点中第一个匹配指定类型的组件。
                 * @example
                 * var sprite = node.getComponentInChildren(cc.Sprite);
                 */ getComponentInChildren<T extends Component>(classConstructor: __unexported.cocos_scene_graph_base_node_Constructor<T>): T | null;
        /**
                 * !#en Returns the component of supplied type in any of its children using depth first search.
                 * !#zh 递归查找所有子节点中第一个匹配指定类型的组件。
                 * @example
                 * var Test = node.getComponentInChildren("Test");
                 */ getComponentInChildren(className: string): Component | null;
        /**
                 * !#en Returns all components of supplied type in self or any of its children.
                 * !#zh 递归查找自身或所有子节点中指定类型的组件
                 * @example
                 * var sprites = node.getComponentsInChildren(cc.Sprite);
                 */ getComponentsInChildren<T extends Component>(classConstructor: __unexported.cocos_scene_graph_base_node_Constructor<T>): T[];
        /**
                 * !#en Returns all components of supplied type in self or any of its children.
                 * !#zh 递归查找自身或所有子节点中指定类型的组件
                 * @example
                 * var tests = node.getComponentsInChildren("Test");
                 */ getComponentsInChildren(className: string): Component[];
        /**
                 * !#en Adds a component class to the node. You can also add component to node by passing in the name of the script.
                 * !#zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
                 * @example
                 * var sprite = node.addComponent(cc.Sprite);
                 */ addComponent<T extends Component>(classConstructor: __unexported.cocos_scene_graph_base_node_Constructor<T>): T | null;
        /**
                 * !#en Adds a component class to the node. You can also add component to node by passing in the name of the script.
                 * !#zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
                 * @example
                 * var test = node.addComponent("Test");
                 */ addComponent(className: string): Component | null;
        /**
                 * !#en
                 * Removes a component identified by the given name or removes the component object given.
                 * You can also use component.destroy() if you already have the reference.
                 * !#zh
                 * 删除节点上的指定组件，传入参数可以是一个组件构造函数或组件名，也可以是已经获得的组件引用。
                 * 如果你已经获得组件引用，你也可以直接调用 component.destroy()
                 * @deprecated please destroy the component to remove it.
                 * @example
                 * node.removeComponent(cc.Sprite);
                 */ removeComponent<T extends Component>(classConstructor: __unexported.cocos_scene_graph_base_node_Constructor<T>): void;
        /**
                 * !#en
                 * Removes a component identified by the given name or removes the component object given.
                 * You can also use component.destroy() if you already have the reference.
                 * !#zh
                 * 删除节点上的指定组件，传入参数可以是一个组件构造函数或组件名，也可以是已经获得的组件引用。
                 * 如果你已经获得组件引用，你也可以直接调用 component.destroy()
                 * @deprecated please destroy the component to remove it.
                 * @example
                 * const sprite = node.getComponent(CC.Sprite);
                 * if (sprite) {
                 *     node.removeComponent(sprite);
                 * }
                 * node.removeComponent('cc.Sprite');
                 */ removeComponent(classNameOrInstance: string | Component): void;
        destroy(): void;
        /**
                 * !#en
                 * Destroy all children from the node, and release all their own references to other objects.<br/>
                 * Actual destruct operation will delayed until before rendering.
                 * !#zh
                 * 销毁所有子节点，并释放所有它们对其它对象的引用。<br/>
                 * 实际销毁操作会延迟到当前帧渲染前执行。
                 * @example
                 * node.destroyAllChildren();
                 */ destroyAllChildren(): void;
        cleanup(): void;
        emit?(type: string, ...args: any[]): void;
        _removeComponent(component: Component): void;
        protected _onSetParent(oldParent: this | null, keepWorldTransform?: boolean): void;
        protected _onPostActivated(): void;
        protected _onBatchRestored(): void;
        protected _onBatchCreated(): void;
        protected _onPreDestroy(): void;
        protected _onHierarchyChanged(oldParent: this | null): void;
        protected _instantiate(cloned: any): any;
        protected _onHierarchyChangedBase(oldParent: this | null): void;
        protected _onPreDestroyBase(): boolean;
        protected _disableChildComps(): void;
        protected _onSiblingIndexChanged?(siblingIndex: number): void;
        protected _registerIfAttached?(attached: boolean): void;
        protected _checkMultipleComp?(constructor: Function): boolean;
    }
    class Node extends BaseNode {
        static EventType: typeof EventType;
        static NodeSpace: typeof __unexported.cocos_scene_graph_node_NodeSpace;
        static isNode(obj: object): boolean;
        _pos: Vec3;
        _rot: Quat;
        _scale: Vec3;
        _mat: Mat4;
        _lpos: Vec3;
        _lrot: Quat;
        _lscale: Vec3;
        protected _layer: number;
        protected _euler: Vec3;
        protected _dirty: boolean;
        protected _hasChanged: boolean;
        protected _matDirty: boolean;
        protected _eulerDirty: boolean;
        protected _eventProcessor: any;
        protected _eventMask: number;
        private _uiTransfromComp;
        eulerAngles: Readonly<Vec3>;
        layer: any;
        readonly hasChanged: boolean;
        uiTransfromComp: UITransformComponent | null;
        width: number;
        height: number;
        anchorX: number;
        anchorY: number;
        readonly eventProcessor: any;
        position: vmath.vec3;
        scale: vmath.vec3;
        rotation: vmath.quat;
        /**
                 * hierarchical events
                 */ setParent(value: this | null, keepWorldTransform?: boolean): void;
        _onSetParent(oldParent: this | null, keepWorldTransform: boolean): void;
        _onBatchCreated(): void;
        _onBatchRestored(): void;
        /**
                 * Translate the node
                 * @param trans - translation
                 * @param ns - the operating space
                 */ translate(trans: Vec3, ns?: __unexported.cocos_scene_graph_node_NodeSpace): void;
        /**
                 * Rotate the node
                 * @param rot - rotation to apply
                 * @param ns - the operating space
                 */ rotate(rot: Quat, ns?: __unexported.cocos_scene_graph_node_NodeSpace): void;
        /**
                 * rotate the node around X axis
                 * @param rad - rotating angle
                 * @param ns - the operating space
                 */ pitch(rad: number, ns?: __unexported.cocos_scene_graph_node_NodeSpace): void;
        /**
                 * rotate the node around Y axis
                 * @param rad - rotating angle
                 * @param ns - the operating space
                 */ yaw(rad: number, ns?: __unexported.cocos_scene_graph_node_NodeSpace): void;
        /**
                 * rotate the node around Z axis
                 * @param rad - rotating angle
                 * @param ns - the operating space
                 */ roll(rad: number, ns?: __unexported.cocos_scene_graph_node_NodeSpace): void;
        direction: Vec3;
        /**
                 * Set rotation by lookAt target point
                 * @param pos - target position
                 * @param up - the up vector, default to (0,1,0)
                 */ lookAt(pos: Vec3, up: Vec3): void;
        /**
                 * Reset the `hasChanged` flag recursively
                 */ resetHasChanged(): void;
        /**
                 * invalidate the world transform information
                 * for this node and all its children recursively
                 */ invalidateChildren(): void;
        /**
                 * update the world transform information if outdated
                 * here we assume all nodes are children of a scene node,
                 * which is always not dirty, has an identity transform and no parent.
                 */ updateWorldTransform(): void;
        updateWorldTransformFull(): void;
        /**
                 * Sets local position.
                 * @param position - The new local position.
                 */ setPosition(position: Vec3): void;
        /**
                 * Sets local position.
                 * @param x - The x component of the new local position.
                 * @param y - The y component of the new local position.
                 * @param z - The z component of the new local position.
                 * @param w - The w component of the new local position.
                 */ setPosition(x: number, y: number, z: number): void;
        /**
                 * get local position
                 * @param out the receiving vector
                 * @returns the resulting vector
                 */ getPosition(out?: Vec3): Vec3;
        readonly localPosition: Readonly<Vec3>;
        /**
                 * Sets local rotation.
                 * @param rotation - The new local rotation.
                 */ setRotation(rotation: Quat): void;
        /**
                 * Sets local rotation.
                 * @param x - The x component of the new local rotation.
                 * @param y - The y component of the new local rotation.
                 * @param z - The z component of the new local rotation.
                 * @param w - The w component of the new local rotation.
                 */ setRotation(x: number, y: number, z: number, w: number): void;
        /**
                 * set local rotation from euler angles
                 * @param x - Angle to rotate around X axis in degrees.
                 * @param y - Angle to rotate around Y axis in degrees.
                 * @param z - Angle to rotate around Z axis in degrees.
                 */ setRotationFromEuler(x: number, y: number, z: number): void;
        /**
                 * get local rotation
                 * @param out - the receiving quaternion
                 * @returns the resulting quaternion
                 */ getRotation(out?: Quat): Quat;
        readonly localRotation: Readonly<Quat>;
        /**
                 * Sets local scale.
                 * @param scale - The new local scale.
                 */ setScale(scale: Vec3): void;
        /**
                 * Sets local scale.
                 * @param x - The x component of the new local scale.
                 * @param y - The y component of the new local scale.
                 * @param z - The z component of the new local scale.
                 */ setScale(x: number, y: number, z: number): void;
        /**
                 * get local scale
                 * @param out - the receiving vector
                 * @returns the resulting vector
                 */ getScale(out?: Vec3): Vec3;
        readonly localScale: Readonly<Vec3>;
        /**
                 * Sets world position.
                 * @param position - The new world position.
                 */ setWorldPosition(position: Vec3): void;
        /**
                 * Sets world position.
                 * @param x - The x component of the new world position.
                 * @param y - The y component of the new world position.
                 * @param z - The z component of the new world position.
                 */ setWorldPosition(x: number, y: number, z: number): void;
        getWorldPosition<Out extends vmath.vec3 = Vec3>(out: Out): Out;
        getWorldPosition(): Vec3;
        readonly worldPosition: Readonly<Vec3>;
        /**
                 * Sets world rotation.
                 * @param rotation - The new world rotation.
                 */ setWorldRotation(rotation: Quat): void;
        /**
                 * Sets world rotation.
                 * @param x - The x component of the new world rotation.
                 * @param y - The y component of the new world rotation.
                 * @param z - The z component of the new world rotation.
                 * @param w - The w component of the new world rotation.
                 */ setWorldRotation(x: number, y: number, z: number, w: number): void;
        /**
                 * set world rotation from euler angles
                 * @param x - Angle to rotate around X axis in degrees.
                 * @param y - Angle to rotate around Y axis in degrees.
                 * @param z - Angle to rotate around Z axis in degrees.
                 */ setWorldRotationFromEuler(x: number, y: number, z: number): void;
        getWorldRotation<Out extends vmath.quat = Quat>(out: Out): Out;
        getWorldRotation(): Quat;
        readonly worldRotation: Readonly<Quat>;
        /**
                 * Sets world scale.
                 * @param scale - The new world scale.
                 */ setWorldScale(scale: Vec3): void;
        /**
                 * Sets world scale.
                 * @param x - The x component of the new world scale.
                 * @param y - The y component of the new world scale.
                 * @param z - The z component of the new world scale.
                 */ setWorldScale(x: number, y: number, z: number): void;
        getWorldScale<Out extends vmath.vec3 = Vec3>(out: Out): Out;
        getWorldScale(): Vec3;
        readonly worldScale: Readonly<Vec3>;
        getWorldMatrix<Out extends vmath.mat4>(out?: Out): Out;
        getWorldMatrix(): Mat4;
        readonly worldMatrix: Readonly<Mat4>;
        /**
                 * get world transform matrix (with only rotation and scale)
                 * @param out - the receiving matrix
                 * @returns the - resulting matrix
                 */ getWorldRS(out?: Mat4): Mat4;
        /**
                 * get world transform matrix (with only rotation and translation)
                 * @param out - the receiving matrix
                 * @returns the - resulting matrix
                 */ getWorldRT(out?: Mat4): Mat4;
        getAnchorPoint(): Vec2;
        setAnchorPoint(point: Vec2 | number, y?: number): void;
        getContentSize(): Size;
        setContentSize(size: Size | number, height?: number): void;
        on(type: string | EventType, callback: Function, target?: Object, useCapture?: any): void;
        off(type: string, callback: Function, target?: Object, useCapture?: any): void;
        once(type: string, callback: Function, target?: Object, useCapture?: any): void;
        emit(type: string, ...args: any[]): void;
        dispatchEvent(event: Event): void;
        hasEventListener(type: string): any;
        targetOff(target: string | Object): void;
        pauseSystemEvents(recursive: boolean): void;
        resumeSystemEvents(recursive: boolean): void;
    }
    /**
         * !#en
         * cc.Scene is a subclass of cc.Node that is used only as an abstract concept.<br/>
         * cc.Scene and cc.Node are almost identical with the difference that users can not modify cc.Scene manually.
         * !#zh
         * cc.Scene 是 cc.Node 的子类，仅作为一个抽象的概念。<br/>
         * cc.Scene 和 cc.Node 有点不同，用户不应直接修改 cc.Scene。
         * @class Scene
         * @extends Node
         */ export class Scene extends Node {
        /**
                 * !#en Indicates whether all (directly or indirectly) static referenced assets of this scene are releasable by default after scene unloading.
                 * !#zh 指示该场景中直接或间接静态引用到的所有资源是否默认在场景切换后自动释放。
                 */ autoReleaseAssets: boolean;
        /**
                 * !#en Per-scene level rendering info
                 * !#zh 场景级别的渲染信息
                 */ _globals: __unexported.cocos_scene_graph_scene_globals_SceneGlobals;
        /**
                 * For internal usage.
                 */ _renderScene: __unexported.cocos_renderer_scene_render_scene_RenderScene | null;
        protected _inited: boolean;
        protected _prefabSyncedInLiveReload: boolean;
        protected dependAssets: null;
        destroy(): void;
        readonly renderScene: __unexported.cocos_renderer_scene_render_scene_RenderScene | null;
        readonly globals: __unexported.cocos_scene_graph_scene_globals_SceneGlobals;
        _onHierarchyChanged(): void;
        protected _instantiate(): void;
        protected _load(): void;
        protected _activate(active: boolean): void;
    }
    /**
         * Entity layer system
         */ export class Layers {
        static Default: number;
        static IgnoreRaycast: number;
        static Gizmos: number;
        static Editor: number;
        static All: number;
        static RaycastMask: number;
        /**
                 * Add a new layer
                 * @param {string} name name of the new layer
                 * @return {number} new layer's index
                 */ static addLayer(name: string): number | undefined;
        /**
                 * Make a layer mask accepting nothing but the listed layers
                 * @param {number[]} includes layers accepted by the mask
                 * @return {number} the specified layer mask
                 */ static makeInclusiveMask(includes: number[]): number;
        /**
                 * Make a layer mask accepting everything but the listed layers
                 * @param {number[]} excludes layers rejected by the mask
                 * @return {number} the specified layer mask
                 */ static makeExclusiveMask(excludes: number[]): number;
        /**
                 * Check a layer is accepted by the mask or not
                 * @param {number} layer the layer number to be tested
                 * @param {number} mask the testing layer mask
                 * @return {boolean} true if accepted
                 */ static check(layer: number, mask: number): boolean;
        private static _nextAvailable;
    }
    /**
         * Finds a node by hierarchy path, the path is case-sensitive.
         * It will traverse the hierarchy by splitting the path using '/' character.
         * This function will still returns the node even if it is inactive.
         * It is recommended to not use this function every frame instead cache the result at startup.
         */ export function find(path: string, referenceNode?: Node): Node | null;
    /**
         * !#en
         * Class of private entities in Cocos Creator scenes.<br/>
         * The PrivateNode is hidden in editor, and completely transparent to users.<br/>
         * It's normally used as Node's private content created by components in parent node.<br/>
         * So in theory private nodes are not children, they are part of the parent node.<br/>
         * Private node have two important characteristics:<br/>
         * 1. It has the minimum z index and cannot be modified, because they can't be displayed over real children.<br/>
         * 2. The positioning of private nodes is also special, they will consider the left bottom corner of the parent node's bounding box as the origin of local coordinates.<br/>
         *    In this way, they can be easily kept inside the bounding box.<br/>
         * Currently, it's used by RichText component and TileMap component.
         * !#zh
         * Cocos Creator 场景中的私有节点类。<br/>
         * 私有节点在编辑器中不可见，对用户透明。<br/>
         * 通常私有节点是被一些特殊的组件创建出来作为父节点的一部分而存在的，理论上来说，它们不是子节点，而是父节点的组成部分。<br/>
         * 私有节点有两个非常重要的特性：<br/>
         * 1. 它有着最小的渲染排序的 Z 轴深度，并且无法被更改，因为它们不能被显示在其他正常子节点之上。<br/>
         * 2. 它的定位也是特殊的，对于私有节点来说，父节点包围盒的左下角是它的局部坐标系原点，这个原点相当于父节点的位置减去它锚点的偏移。这样私有节点可以比较容易被控制在包围盒之中。<br/>
         * 目前在引擎中，RichText 和 TileMap 都有可能生成私有节点。
         * @class PrivateNode
         * @method constructor
         * @param {String} name
         * @extends Node
         */ export class PrivateNode extends Node {
    }
    /**
         * !#en
         * The base class for registering asset types.
         * !#zh
         * 注册用的资源基类。
         *
         * @class RawAsset
         * @extends Object
         */ export class RawAsset extends CCObject {
        /**
                 * For internal usage.
                 */ static isRawAssetType(ctor: Function): boolean;
        /**
                 * For internal usage.
                 */ _uuid: string;
    }
    /**
         * !#en
         * Base class for handling assets used in Creator.<br/>
         *
         * You may want to override:<br/>
         * - createNode<br/>
         * - getset functions of _nativeAsset<br/>
         * - cc.Object._serialize<br/>
         * - cc.Object._deserialize<br/>
         * !#zh
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
         */ export class Asset extends RawAsset {
        /**
                 * !#en
                 * Returns the url of this asset's native object, if none it will returns an empty string.
                 * !#zh
                 * 返回该资源对应的目标平台资源的 URL，如果没有将返回一个空字符串。
                 * @property nativeUrl
                 * @type {String}
                 * @readOnly
                 */ readonly nativeUrl: string;
        /**
                 * The underlying native asset of this asset if one is available.
                 * This property can be used to access additional details or functionality releated to the asset.
                 * This property will be initialized by the loader if `_native` is available.
                 * @property {Object} _nativeAsset
                 * @default null
                 * @private
                 * @type {any}
                 */ _nativeAsset: any;
        /**
                 * !#en Indicates whether its dependent raw assets can support deferred load if the owner scene (or prefab) is marked as `asyncLoadAssets`.
                 * !#zh 当场景或 Prefab 被标记为 `asyncLoadAssets`，禁止延迟加载该资源所依赖的其它 RawAsset。
                 *
                 * @property {Boolean} preventDeferredLoadDependents
                 * @default false
                 * @static
                 */ static preventDeferredLoadDependents: boolean;
        /**
                 * !#en Indicates whether its native object should be preloaded from native url.
                 * !#zh 禁止预加载原生对象。
                 *
                 * @property {Boolean} preventPreloadNativeObject
                 * @default false
                 * @static
                 */ static preventPreloadNativeObject: boolean;
        /**
                 * 应 AssetDB 要求提供这个方法
                 *
                 * @method deserialize
                 * @param {String} data
                 * @return {Asset}
                 * @static
                 * @private
                 */ static deserialize(data: any): any;
        /**
                 * !#en
                 * Whether the asset is loaded or not
                 * !#zh
                 * 该资源是否已经成功加载
                 */ loaded: boolean;
        /**
                 * Serializable url for native asset. For internal usage.
                 * @default ""
                 */ _native: string | undefined;
        /**
                 * Returns the string representation of the object.
                 *
                 * The `Asset` object overrides the `toString()` method of the `Object` object.
                 * JavaScript calls the toString() method automatically when an asset is to
                 * be represented as a text value or when a texture is referred to in a string concatenation.
                 *
                 * For assets of the native type, it will return `this.nativeUrl`.
                 * Otherwise, an empty string is returned.
                 * This method may be overwritten by subclasses.
                 *
                 * @method toString
                 * @return {String}
                 */ toString(): string;
        /**
                 * 应 AssetDB 要求提供这个方法
                 *
                 * @method serialize
                 * @return {String}
                 * @private
                 */ /**
                 * Set native file name for this asset.
                 * @seealso nativeUrl
                 *
                 * @param filename
                 * @param [inLibrary=true]
                 * @private
                 */ _setRawAsset(filename: string, inLibrary?: boolean): void;
        /**
                 * !#en
                 * Create a new node using this asset in the scene.<br/>
                 * If this type of asset dont have its corresponding node type, this method should be null.
                 * !#zh
                 * 使用该资源在场景中创建一个新节点。<br/>
                 * 如果这类资源没有相应的节点类型，该方法应该是空的。
                 */ createNode?(callback: __unexported.cocos_assets_asset_CreateNodeCallback): void;
    }
    /**
         * !#en Class for scene handling.
         * !#zh 场景资源类。
         * @class SceneAsset
         * @extends Asset
         *
         */ export class SceneAsset extends Asset {
        /**
                 * @property {Scene} scene
                 * @default null
                 */ scene: Scene | null;
        /**
                 * !#en Indicates the raw assets of this scene can be load after scene launched.
                 * !#zh 指示该场景依赖的资源可否在场景切换后再延迟加载。
                 * @property {Boolean} asyncLoadAssets
                 * @default false
                 */ asyncLoadAssets: boolean;
    }
    export class SpriteAtlas extends Asset {
        spriteFrames: __unexported.cocos_assets_sprite_atlas_ISpriteFrameList;
        /**
                 * Returns the texture of the sprite atlas
                 * @method getTexture
                 * @returns {Texture2D}
                 */ getTexture(): ImageAsset | null;
        /**
                 * Returns the sprite frame correspond to the given key in sprite atlas.
                 * @method getSpriteFrame
                 * @param {String} key
                 * @returns {SpriteFrame}
                 */ getSpriteFrame(key: string): SpriteFrame | null;
        /**
                 * Returns the sprite frames in sprite atlas.
                 * @method getSpriteFrames
                 * @returns {[SpriteFrame]}
                 */ getSpriteFrames(): (SpriteFrame | null)[];
        _serialize(): {
            name: string;
            spriteFrames: string[];
        };
        _deserialize(serializeData: any, handle: any): void;
    }
    /**
         * !#en Class for text file.
         * !#zh 文本资源类。
         * @class TextAsset
         * @extends Asset
         */ export class TextAsset extends Asset {
        /**
                 * @property {String} text - The text contents of the resource.
                 */ text: string;
        /**
                 * Returns the text content of the asset.
                 *
                 * JavaScript calls the toString() method automatically when an asset is to be represented as a text value or when a texture is referred to in a string concatenation.
                 *
                 * @method toString
                 * @return {String}
                 */ toString(): string;
    }
    /**
         * !#en
         * Class for JSON file. When the JSON file is loaded, this object is returned.
         * The parsed JSON object can be accessed through the `json` attribute in it.<br>
         * If you want to get the original JSON text, you should modify the extname to `.txt`
         * so that it is loaded as a `TextAsset` instead of a `JsonAsset`.
         *
         * !#zh
         * JSON 资源类。JSON 文件加载后，将会返回该对象。可以通过其中的 `json` 属性访问解析后的 JSON 对象。<br>
         * 如果你想要获得 JSON 的原始文本，那么应该修改源文件的后缀为 `.txt`，这样就会加载为一个 `TextAsset` 而不是 `JsonAsset`。
         *
         * @class JsonAsset
         * @extends Asset
         */ export class JsonAsset extends Asset {
        /**
                 * @property json - The loaded JSON object.
                 */ json: object | null;
    }
    /**
         * Class ImageAsset.
         */ export class ImageAsset extends __unexported.cocos_assets_image_asset_ImageAsset_base {
        _nativeAsset: __unexported.cocos_assets_image_asset_ImageSource;
        readonly data: ArrayBufferView | HTMLCanvasElement | HTMLImageElement | null;
        readonly width: number;
        readonly height: number;
        readonly format: __unexported.cocos_assets_asset_enum_PixelFormat;
        /**
                 * !#en
                 * The url of the texture, this could be empty if the texture wasn't created via a file.
                 * !#zh
                 * 图像文件的 url，当图像不是由文件创建时值可能为空
                 */ readonly url: string;
        private static extnames;
        private _nativeData;
        private _url;
        private _exportedExts;
        private _format;
        reset(data: __unexported.cocos_assets_image_asset_ImageSource): void;
        _serialize(): string;
        _deserialize(data: string, handle: any): void;
        _onDataComplete(): void;
    }
    /**
         * Represents a 2-dimension texture.
         */ export class Texture2D extends __unexported.cocos_assets_texture_base_TextureBase {
        /**
                 * Gets the mipmap images.
                 * Note that the result do not contains the auto generated mipmaps.
                 */ /**
                * Sets the mipmaps images.
                */ mipmaps: ImageAsset[];
        /**
                 * Gets the mipmap image at level 0.
                 */ /**
                * Sets the mipmap images as a single mipmap image.
                */ image: ImageAsset | null;
        _mipmaps: ImageAsset[];
        onLoaded(): void;
        /**
                 * Returns the string representation of this texture.
                 */ toString(): string;
        /**
                 * Updates mipmaps at specified range of levels.
                 * @param firstLevel The first level from which the sources update.
                 * @description
                 * If the range specified by [firstLevel, firstLevel + sources.length) exceeds
                 * the actually range of mipmaps this texture contains, only overlaped mipmaps are updated.
                 * Use this method if your mipmap data are modified.
                 */ updateMipmaps(firstLevel?: number, count?: number): void;
        directUpdate(source: HTMLImageElement | HTMLCanvasElement | ArrayBuffer, level?: number): void;
        /**
                 * !#en
                 * HTMLElement Object getter, available only on web.
                 * !#zh 获取当前贴图对应的 HTML Image 或 Canvas 对象，只在 Web 平台下有效。
                 * @method getHtmlElementObj
                 * @return {HTMLImageElement|HTMLCanvasElement}
                 * @deprecated Use this.image.data instead.
                 */ getHtmlElementObj(): HTMLCanvasElement | HTMLImageElement | null;
        /**
                 * !#en
                 * Destory this texture and immediately release its video memory. (Inherit from cc.Object.destroy)<br>
                 * After destroy, this object is not usable any more.
                 * You can use cc.isValid(obj) to check whether the object is destroyed before accessing it.
                 * !#zh
                 * 销毁该贴图，并立即释放它对应的显存。（继承自 cc.Object.destroy）<br/>
                 * 销毁后，该对象不再可用。您可以在访问对象之前使用 cc.isValid(obj) 来检查对象是否已被销毁。
                 */ destroy(): boolean;
        /**
                 * !#en
                 * Description of cc.Texture2D.
                 * !#zh cc.Texture2D 描述。
                 */ description(): string;
        /**
                 * !#en
                 * Release texture, please use destroy instead.
                 * !#zh 释放纹理，请使用 destroy 替代。
                 * @deprecated Since v2.0, use destroy instead.
                 */ releaseTexture(): void;
        _serialize(exporting?: any): any;
        _deserialize(serializedData: any, handle: any): void;
    }
    /**
         * @module cc
         */ /**
         * !#en Class for TTFFont handling.
         * !#zh TTF 字体资源类。
         * @class TTFFont
         * @extends Font
         *
         */ export class TTFFont extends Font {
        _fontFamily: any;
        _nativeAsset: any;
    }
    /**
         * @module cc
         */ /**
         * !#en Class for LabelAtlas handling.
         * !#zh 艺术数字字体资源类。
         * @class LabelAtlas
         * @extends BitmapFont
         *
         */ export class LabelAtlas extends BitmapFont {
    }
    /**
         * !#en Class for BitmapFont handling.
         * !#zh 位图字体资源类。
         * @class BitmapFont
         * @extends Font
         */ export class BitmapFont extends Font {
        fntDataStr: string;
        spriteFrame: SpriteFrame | null;
        fontSize: number;
        fntConfig: __unexported.cocos_assets_bitmap_font_IConfig | null;
    }
    /**
         * !#en Class for Font handling.
         * !#zh 字体资源类。
         * @class Font
         * @extends Asset
         */ export class Font extends Asset {
    }
    /**
         * !#en Class for script handling.
         * !#zh Script 资源类。
         * @class _Script
         * @extends Asset
         *
         * @private
         */ export class Script extends Asset {
    }
    /**
         * !#en Class for JavaScript handling.
         * !#zh JavaScript 资源类。
         * @class _JavaScript
         * @extends Asset
         *
         */ export class JavaScript extends Script {
    }
    /**
         * !#en Class for TypeScript handling.
         * !#zh TypeScript 资源类。
         * @class TypeScript
         * @extends Asset
         *
         */ export class TypeScript extends Script {
    }
    export interface IUV {
        u: number;
        v: number;
    }
    interface IVertices {
        x: any;
        y: any;
        triangles: any;
        nu: number[];
        u: number[];
        nv: number[];
        v: number[];
    }
    interface ISpriteFrameOriginal {
        texture: Texture2D;
        x: number;
        y: number;
    }
    var SpriteFrame_base: {} & typeof Texture2D;
    /**
         * !#en
         * A cc.SpriteFrame has:<br/>
         *  - texture: A cc.Texture2D that will be used by render components<br/>
         *  - rectangle: A rectangle of the texture
         *
         * !#zh
         * 一个 SpriteFrame 包含：<br/>
         *  - 纹理：会被渲染组件使用的 Texture2D 对象。<br/>
         *  - 矩形：在纹理中的矩形区域。
         *
         * @class SpriteFrame
         * @extends Asset
         * @uses EventTarget
         * @example
         * // load a cc.SpriteFrame with image path (Recommend)
         * var self = this;
         * var url = "test assets/PurpleMonster";
         * cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
         *  var node = new cc.Node("New Sprite");
         *  var sprite = node.addComponent(cc.Sprite);
         *  sprite.spriteFrame = spriteFrame;
         *  node.parent = self.node
         * });
         */ export class SpriteFrame extends SpriteFrame_base {
        /**
                 * !#en Top border of the sprite
                 * !#zh sprite 的顶部边框
                 * @property insetTop
                 * @type {Number}
                 * @default 0
                 */ insetTop: number;
        /**
                 * !#en Bottom border of the sprite
                 * !#zh sprite 的底部边框
                 * @property insetBottom
                 * @type {Number}
                 * @default 0
                 */ insetBottom: number;
        /**
                 * !#en Left border of the sprite
                 * !#zh sprite 的左边边框
                 * @property insetLeft
                 * @type {Number}
                 * @default 0
                 */ insetLeft: number;
        /**
                 * !#en Right border of the sprite
                 * !#zh sprite 的左边边框
                 * @property insetRight
                 * @type {Number}
                 * @default 0
                 */ insetRight: number;
        atlasUuid: string;
        readonly original: ISpriteFrameOriginal | null;
        vertices: IVertices | null;
        uv: number[];
        uvSliced: IUV[];
        private _rect;
        private _offset;
        private _originalSize;
        private _rotated;
        private _capInsets;
        private _original;
        private _atlasUuid;
        /**
                 * !#en Returns whether the texture have been loaded
                 * !#zh 返回是否已加载纹理
                 */ textureLoaded(): boolean;
        /**
                 * !#en Returns whether the sprite frame is rotated in the texture.
                 * !#zh 获取 SpriteFrame 是否旋转
                 */ isRotated(): boolean;
        /**
                 * !#en Set whether the sprite frame is rotated in the texture.
                 * !#zh 设置 SpriteFrame 是否旋转
                 * @param value
                 */ setRotated(rotated: boolean): void;
        /**
                 * !#en Returns the rect of the sprite frame in the texture.
                 * !#zh 获取 SpriteFrame 的纹理矩形区域
                 */ getRect(out?: Rect): Rect;
        /**
                 * !#en Sets the rect of the sprite frame in the texture.
                 * !#zh 设置 SpriteFrame 的纹理矩形区域
                 */ setRect(rect: Rect): void;
        /**
                 * !#en Returns the original size of the trimmed image.
                 * !#zh 获取修剪前的原始大小
                 */ getOriginalSize(out?: Size): Size;
        /**
                 * !#en Sets the original size of the trimmed image.
                 * !#zh 设置修剪前的原始大小
                 */ setOriginalSize(size: Size): void;
        _setBorder(l: number, b: number, r: number, t: number): void;
        /**
                 * !#en Returns the texture of the frame.
                 * !#zh 获取使用的纹理实例
                 * @method getTexture
                 * @return {Texture2D}
                 */ _textureLoadedCallback(): void;
        /**
                 * !#en Returns the offset of the frame in the texture.
                 * !#zh 获取偏移量
                 */ getOffset(out?: Vec2): Vec2;
        /**
                 * !#en Sets the offset of the frame in the texture.
                 * !#zh 设置偏移量
                 * @param offsets
                 */ setOffset(offsets: Vec2): void;
        /**
                 * !#en Clone the sprite frame.
                 * !#zh 克隆 SpriteFrame
                 * @method clone
                 * @return {SpriteFrame}
                 */ clone(): SpriteFrame;
        /**
                 * !#en If a loading scene (or prefab) is marked as `asyncLoadAssets`, all the textures of the SpriteFrame which
                 * associated by user's custom Components in the scene, will not preload automatically.
                 * These textures will be load when Sprite component is going to render the SpriteFrames.
                 * You can call this method if you want to load the texture early.
                 * !#zh 当加载中的场景或 Prefab 被标记为 `asyncLoadAssets` 时，用户在场景中由自定义组件关联到的所有 SpriteFrame 的贴图都不会被提前加载。
                 * 只有当 Sprite 组件要渲染这些 SpriteFrame 时，才会检查贴图是否加载。如果你希望加载过程提前，你可以手工调用这个方法。
                 *
                 * @method ensureLoadTexture
                 * @example
                 * if (spriteFrame.textureLoaded()) {
                 *     this._onSpriteFrameLoaded();
                 * }
                 * else {
                 *     spriteFrame.once('load', this._onSpriteFrameLoaded, this);
                 *     spriteFrame.ensureLoadTexture();
                 * }
                 */ ensureLoadTexture(): void;
        checkRect(texture: ImageAsset): void;
        _calculateSlicedUV(): void;
        setDynamicAtlasFrame(frame: SpriteFrame): void;
        resetDynamicAtlasFrame(): void;
        _calculateUV(): void;
        _serialize(exporting?: any): any;
        _deserialize(serializeData: any, handle: any): void;
        onLoaded(): void;
    }
    /**
         * !#en
         * Base class for everything attached to Node(Entity).<br/>
         * <br/>
         * NOTE: Not allowed to use construction parameters for Component's subclasses,
         *       because Component is created by the engine.
         * !#zh
         * 所有附加到节点的基类。<br/>
         * <br/>
         * 注意：不允许使用组件的子类构造参数，因为组件是由引擎创建的。
         *
         * @class Component
         * @extends Object
         */ class Component extends CCObject {
        name: string;
        /**
                 * !#en The uuid for editor.
                 * !#zh 组件的 uuid，用于编辑器。
                 * @property uuid
                 * @type {String}
                 * @readOnly
                 * @example
                 * cc.log(comp.uuid);
                 */ readonly uuid: string;
        readonly __scriptAsset: null;
        /**
                 * !#en indicates whether this component is enabled or not.
                 * !#zh 表示该组件自身是否启用。
                 * @property enabled
                 * @type {Boolean}
                 * @default true
                 * @example
                 * comp.enabled = true;
                 * cc.log(comp.enabled);
                 */ enabled: boolean;
        /**
                 * !#en indicates whether this component is enabled and its node is also active in the hierarchy.
                 * !#zh 表示该组件是否被启用并且所在的节点也处于激活状态。
                 * @property enabledInHierarchy
                 * @type {Boolean}
                 * @readOnly
                 * @example
                 * cc.log(comp.enabledInHierarchy);
                 */ readonly enabledInHierarchy: boolean;
        /**
                 * !#en Returns a value which used to indicate the onLoad get called or not.
                 * !#zh 返回一个值用来判断 onLoad 是否被调用过，不等于 0 时调用过，等于 0 时未调用。
                 * @property _isOnLoadCalled
                 * @type {Number}
                 * @readOnly
                 * @example
                 * cc.log(this._isOnLoadCalled > 0);
                 */ readonly _isOnLoadCalled: number;
        static system: null;
        /**
                 * !#en The node this component is attached to. A component is always attached to a node.
                 * !#zh 该组件被附加到的节点。组件总会附加到一个节点。
                 * @property node
                 * @type {Node}
                 * @example
                 * cc.log(comp.node);
                 */ node: Node;
        /**
                 * @property _enabled
                 * @type {Boolean}
                 * @private
                 */ _enabled: boolean;
        _sceneGetter: null | (() => __unexported.cocos_renderer_scene_render_scene_RenderScene);
        /**
                 * For internal usage.
                 */ _id: string;
        /**
                 * Register all related EventTargets,
                 * all event callbacks will be removed in _onPreDestroy
                 */ private _eventTargets;
        private __scriptUuid;
        _getRenderScene(): __unexported.cocos_renderer_scene_render_scene_RenderScene;
        /**
                 * !#en Adds a component class to the node. You can also add component to node by passing in the name of the script.
                 * !#zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
                 * @example
                 * var sprite = node.addComponent(cc.Sprite);
                 */ addComponent<T extends Component>(classConstructor: Constructor<T>): T | null;
        /**
                 * !#en Adds a component class to the node. You can also add component to node by passing in the name of the script.
                 * !#zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
                 * @example
                 * var test = node.addComponent("Test");
                 */ addComponent(className: string): Component | null;
        /**
                 * !#en
                 * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
                 * You can also get component in the node by passing in the name of the script.
                 * !#zh
                 * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
                 * 传入参数也可以是脚本的名称。
                 * @example
                 * // get sprite component.
                 * var sprite = node.getComponent(cc.Sprite);
                 */ getComponent<T extends Component>(classConstructor: Constructor<T>): T | null;
        /**
                 * !#en
                 * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
                 * You can also get component in the node by passing in the name of the script.
                 * !#zh
                 * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
                 * 传入参数也可以是脚本的名称。
                 * @example
                 * // get custom test calss.
                 * var test = node.getComponent("Test");
                 */ getComponent(className: string): Component | null;
        /**
                 * !#en Returns all components of supplied type in the node.
                 * !#zh 返回节点上指定类型的所有组件。
                 * @example
                 * var sprites = node.getComponents(cc.Sprite);
                 */ getComponents<T extends Component>(classConstructor: Constructor<T>): T[];
        /**
                 * !#en Returns all components of supplied type in the node.
                 * !#zh 返回节点上指定类型的所有组件。
                 * @example
                 * var tests = node.getComponents("Test");
                 */ getComponents(className: string): Component[];
        /**
                 * !#en Returns the component of supplied type in any of its children using depth first search.
                 * !#zh 递归查找所有子节点中第一个匹配指定类型的组件。
                 * @example
                 * var sprite = node.getComponentInChildren(cc.Sprite);
                 */ getComponentInChildren<T extends Component>(classConstructor: Constructor<T>): T | null;
        /**
                 * !#en Returns the component of supplied type in any of its children using depth first search.
                 * !#zh 递归查找所有子节点中第一个匹配指定类型的组件。
                 * @example
                 * var Test = node.getComponentInChildren("Test");
                 */ getComponentInChildren(className: string): Component | null;
        /**
                 * !#en Returns all components of supplied type in self or any of its children.
                 * !#zh 递归查找自身或所有子节点中指定类型的组件
                 * @example
                 * var sprites = node.getComponentsInChildren(cc.Sprite);
                 */ getComponentsInChildren<T extends Component>(classConstructor: Constructor<T>): T[];
        /**
                 * !#en Returns all components of supplied type in self or any of its children.
                 * !#zh 递归查找自身或所有子节点中指定类型的组件
                 * @example
                 * var tests = node.getComponentsInChildren("Test");
                 */ getComponentsInChildren(className: string): Component[];
        destroy(): any;
        _onPreDestroy(): void;
        _instantiate(cloned: any): any;
        /**
                 * !#en
                 * Schedules a custom selector.<br/>
                 * If the selector is already scheduled, then the interval parameter will be updated without scheduling it again.
                 * !#zh
                 * 调度一个自定义的回调函数。<br/>
                 * 如果回调函数已调度，那么将不会重复调度它，只会更新时间间隔参数。
                 * @method schedule
                 * @param {function} callback The callback function
                 * @param {Number} [interval=0]  Tick interval in seconds. 0 means tick every frame.
                 * @param {Number} [repeat=cc.macro.REPEAT_FOREVER]    The selector will be executed (repeat + 1) times, you can use cc.macro.REPEAT_FOREVER for tick infinitely.
                 * @param {Number} [delay=0]     The amount of time that the first tick will wait before execution.
                 * @example
                 * var timeCallback = function (dt) {
                 *   cc.log("time: " + dt);
                 * }
                 * this.schedule(timeCallback, 1);
                 */ schedule(callback: any, interval: any, repeat: any, delay: any): void;
        /**
                 * !#en Schedules a callback function that runs only once, with a delay of 0 or larger.
                 * !#zh 调度一个只运行一次的回调函数，可以指定 0 让回调函数在下一帧立即执行或者在一定的延时之后执行。
                 * @method scheduleOnce
                 * @see cc.Node#schedule
                 * @param {function} callback  A function wrapped as a selector
                 * @param {Number} [delay=0]  The amount of time that the first tick will wait before execution.
                 * @example
                 * var timeCallback = function (dt) {
                 *   cc.log("time: " + dt);
                 * }
                 * this.scheduleOnce(timeCallback, 2);
                 */ scheduleOnce(callback: any, delay: any): void;
        /**
                 * !#en Unschedules a custom callback function.
                 * !#zh 取消调度一个自定义的回调函数。
                 * @method unschedule
                 * @see cc.Node#schedule
                 * @param {function} callback_fn  A function wrapped as a selector
                 * @example
                 * this.unschedule(_callback);
                 */ unschedule(callback_fn: any): void;
        /**
                 * !#en
                 * unschedule all scheduled callback functions: custom callback functions, and the 'update' callback function.<br/>
                 * Actions are not affected by this method.
                 * !#zh 取消调度所有已调度的回调函数：定制的回调函数以及 'update' 回调函数。动作不受此方法影响。
                 * @method unscheduleAllCallbacks
                 * @example
                 * this.unscheduleAllCallbacks();
                 */ unscheduleAllCallbacks(): void;
        /**
                 * !#en Update is called every frame, if the Component is enabled.<br/>
                 * This is a lifecycle method. It may not be implemented in the super class.
                 * You can only call its super class method inside it. It should not be called manually elsewhere.
                 * !#zh 如果该组件启用，则每帧调用 update。<br/>
                 * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
                 * @param dt - the delta time in seconds it took to complete the last frame
                 */ protected update?(dt: number): void;
        /**
                 * !#en LateUpdate is called every frame, if the Component is enabled.<br/>
                 * This is a lifecycle method. It may not be implemented in the super class.
                 * You can only call its super class method inside it. It should not be called manually elsewhere.
                 * !#zh 如果该组件启用，则每帧调用 LateUpdate。<br/>
                 * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
                 */ protected lateUpdate?(): void;
        /**
                 * `__preload` is called before every onLoad.
                 * It is used to initialize the builtin components internally,
                 * to avoid checking whether onLoad is called before every public method calls.
                 * This method should be removed if script priority is supported.
                 * @private
                 */ protected __preload?(): void;
        /**
                 * !#en
                 * When attaching to an active node or its node first activated.
                 * onLoad is always called before any start functions, this allows you to order initialization of scripts.<br/>
                 * This is a lifecycle method. It may not be implemented in the super class.
                 * You can only call its super class method inside it. It should not be called manually elsewhere.
                 * !#zh
                 * 当附加到一个激活的节点上或者其节点第一次激活时候调用。onLoad 总是会在任何 start 方法调用前执行，这能用于安排脚本的初始化顺序。<br/>
                 * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
                 */ protected onLoad?(): void;
        /**
                 * !#en
                 * Called before all scripts' update if the Component is enabled the first time.
                 * Usually used to initialize some logic which need to be called after all components' `onload` methods called.<br/>
                 * This is a lifecycle method. It may not be implemented in the super class.
                 * You can only call its super class method inside it. It should not be called manually elsewhere.
                 * !#zh
                 * 如果该组件第一次启用，则在所有组件的 update 之前调用。通常用于需要在所有组件的 onLoad 初始化完毕后执行的逻辑。<br/>
                 * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
                 */ protected start?(): void;
        /**
                 * !#en Called when this component becomes enabled and its node is active.<br/>
                 * This is a lifecycle method. It may not be implemented in the super class.
                 * You can only call its super class method inside it. It should not be called manually elsewhere.
                 * !#zh 当该组件被启用，并且它的节点也激活时。<br/>
                 * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
                 */ protected onEnable?(): void;
        /**
                 * !#en Called when this component becomes disabled or its node becomes inactive.<br/>
                 * This is a lifecycle method. It may not be implemented in the super class.
                 * You can only call its super class method inside it. It should not be called manually elsewhere.
                 * !#zh 当该组件被禁用或节点变为无效时调用。<br/>
                 * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
                 */ protected onDisable?(): void;
        /**
                 * !#en Called when this component will be destroyed.<br/>
                 * This is a lifecycle method. It may not be implemented in the super class.
                 * You can only call its super class method inside it. It should not be called manually elsewhere.
                 * !#zh 当该组件被销毁时调用<br/>
                 * 该方法为生命周期方法，父类未必会有实现。并且你只能在该方法内部调用父类的实现，不可在其它地方直接调用该方法。
                 */ protected onDestroy?(): void;
        protected onFocusInEditor?(): void;
        protected onLostFocusInEditor?(): void;
        /**
                 * !#en Called to initialize the component or node’s properties when adding the component the first time or when the Reset command is used.
                 * This function is only called in editor.
                 * !#zh 用来初始化组件或节点的一些属性，当该组件被第一次添加到节点上或用户点击了它的 Reset 菜单时调用。这个回调只会在编辑器下调用。
                 */ protected resetInEditor?(): void;
        /**
                 * !#en
                 * If the component's bounding box is different from the node's, you can implement this method to supply
                 * a custom axis aligned bounding box (AABB), so the editor's scene view can perform hit test properly.
                 * !#zh
                 * 如果组件的包围盒与节点不同，您可以实现该方法以提供自定义的轴向对齐的包围盒（AABB），
                 * 以便编辑器的场景视图可以正确地执行点选测试。
                 * @param out_rect - the Rect to receive the bounding box
                 */ protected _getLocalBounds?(out_rect: Rect): void;
        /**
                 * !#en
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
                 * !#zh
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
                 */ protected onRestore?(): void;
    }
    /**
         * !#en
         * Component will register a event to target component's handler.
         * And it will trigger the handler when a certain event occurs.
         *
         * !@zh
         * “EventHandler” 类用来设置场景中的事件回调，
         * 该类允许用户设置回调目标节点，目标组件名，组件方法名，
         * 并可通过 emit 方法调用目标函数。
         * @class Component.EventHandler
         * @example
         * // Create new EventHandler
         * var eventHandler = new cc.Component.EventHandler();
         * eventHandler.target = newTarget;
         * eventHandler.component = "MainMenu";
         * eventHandler.handler = "OnClick";
         * eventHandler.customEventData = "my data";
         */ export class EventHandler {
        _componentName: any;
        /**
                 * @method emitEvents
                 * @param {Component.EventHandler[]} events
                 * @param {any} ...params
                 * @static
                 */ static emitEvents(events: EventHandler[], ...args: any[]): void;
        /**
                 * !#en Event target
                 * !#zh 目标节点
                 * @property target
                 * @type {Node}
                 * @default null
                 */ target: Node | null;
        /**
                 * !#en Component name
                 * !#zh 目标组件名
                 * @property component
                 * @type {String}
                 * @default ''
                 */ component: string;
        _componentId: string;
        /**
                 * !#en Event handler
                 * !#zh 响应事件函数名
                 * @property handler
                 * @type {String}
                 * @default ''
                 */ handler: string;
        /**
                 * !#en Custom Event Data
                 * !#zh 自定义事件数据
                 * @property customEventData
                 * @default ''
                 * @type {String}
                 */ customEventData: string;
        /**
                 * !#en Emit event with params
                 * !#zh 触发目标组件上的指定 handler 函数，该参数是回调函数的参数值（可不填）。
                 * @method emit
                 * @param {Array} params
                 * @example
                 * // Call Function
                 * var eventHandler = new cc.Component.EventHandler();
                 * eventHandler.target = newTarget;
                 * eventHandler.component = "MainMenu";
                 * eventHandler.handler = "OnClick"
                 * eventHandler.emit(["param1", "param2", ....]);
                 */ emit(params: any[]): void;
        private _compName2Id;
        private _compId2Name;
        private _genCompIdIfNeeded;
    }
    /**
         * !#en The animation component is used to play back animations.
         *
         * Animation provide several events to register：
         *  - play : Emit when begin playing animation
         *  - stop : Emit when stop playing animation
         *  - pause : Emit when pause animation
         *  - resume : Emit when resume animation
         *  - lastframe : If animation repeat count is larger than 1, emit when animation play to the last frame
         *  - finished : Emit when finish playing animation
         *
         * !#zh Animation 组件用于播放动画。
         *
         * Animation 提供了一系列可注册的事件：
         *  - play : 开始播放时
         *  - stop : 停止播放时
         *  - pause : 暂停播放时
         *  - resume : 恢复播放时
         *  - lastframe : 假如动画循环次数大于 1，当动画播放到最后一帧时
         *  - finished : 动画播放完成时
         */ export class AnimationComponent extends __unexported.cocos_components_animation_component_AnimationComponent_base {
        /**
                 * !#en Animation will play the default clip when start game.
                 * !#zh 在勾选自动播放或调用 play() 时默认播放的动画剪辑。
                 */ defaultClip: __unexported.cocos_animation_animation_clip_AnimationClip | null;
        /**
                 * !#en Current played clip.
                 * !#zh 当前播放的动画剪辑。
                 */ currentClip: __unexported.cocos_animation_animation_clip_AnimationClip | null;
        clips: (__unexported.cocos_animation_animation_clip_AnimationClip | null)[];
        static EventType: typeof __unexported.cocos_components_animation_component_EventType;
        /**
                 * !#en Whether the animation should auto play the default clip when start game.
                 * !#zh 是否在运行游戏后自动播放默认动画剪辑。
                 */ playOnLoad: boolean;
        private _crossFade;
        private _nameToState;
        private _didInit;
        private _currentClip;
        /**
                 * !#en All the clips used in this animation.
                 * !#zh 通过脚本可以访问并播放的 AnimationClip 列表。
                 */ private _clips;
        private _defaultClip;
        start(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        /**
                 * !#en Get all the clips used in this animation.
                 * !#zh 获取动画组件上的所有动画剪辑。
                 */ getClips(): (__unexported.cocos_animation_animation_clip_AnimationClip | null)[];
        /**
                 * !#en Plays an animation and stop other animations.
                 * !#zh 播放指定的动画，并且停止当前正在播放动画。如果没有指定动画，则播放默认动画。
                 * @param [name] - The name of animation to play. If no name is supplied then the default animation will be played.
                 * @param [startTime] - play an animation from startTime
                 * @return The AnimationState of playing animation. In cases where the animation can't be played
                 * (ie, there is no default animation or no animation with the specified name), the function will return null.
                 * @example
                 * var animCtrl = this.node.getComponent(cc.Animation);
                 * animCtrl.play("linear");
                 */ play(name?: string, startTime?: number): __unexported.cocos_animation_animation_state_AnimationState;
        crossFade(name?: string, duration?: number): __unexported.cocos_animation_animation_state_AnimationState;
        /**
                 * !#en Returns the animation state named name. If no animation with the specified name, the function will return null.
                 * !#zh 获取当前或者指定的动画状态，如果未找到指定动画剪辑则返回 null。
                 */ getAnimationState(name: string): __unexported.cocos_animation_animation_state_AnimationState;
        /**
                 * !#en Adds a clip to the animation with name newName. If a clip with that name already exists it will be replaced with the new clip.
                 * !#zh 添加动画剪辑，并且可以重新设置该动画剪辑的名称。
                 * @param clip the clip to add
                 * @return The AnimationState which gives full control over the animation clip.
                 */ addClip(clip: __unexported.cocos_animation_animation_clip_AnimationClip, newName?: string): __unexported.cocos_animation_animation_state_AnimationState | undefined;
        /**
                 * !#en
                 * Remove clip from the animation list. This will remove the clip and any animation states based on it.
                 * If there are animation states depand on the clip are playing or clip is defaultClip, it will not delete the clip.
                 * But if force is true, then will always remove the clip and any animation states based on it. If clip is defaultClip, defaultClip will be reset to null
                 * !#zh
                 * 从动画列表中移除指定的动画剪辑，<br/>
                 * 如果依赖于 clip 的 AnimationState 正在播放或者 clip 是 defaultClip 的话，默认是不会删除 clip 的。
                 * 但是如果 force 参数为 true，则会强制停止该动画，然后移除该动画剪辑和相关的动画。这时候如果 clip 是 defaultClip，defaultClip 将会被重置为 null。
                 * @param {Boolean} [force=false] - If force is true, then will always remove the clip and any animation states based on it.
                 */ removeClip(clip: __unexported.cocos_animation_animation_clip_AnimationClip, force?: boolean): void;
        /**
                 * !#en
                 * Register animation event callback.
                 * The event arguments will provide the AnimationState which emit the event.
                 * When play an animation, will auto register the event callback to the AnimationState,
                 * and unregister the event callback from the AnimationState when animation stopped.
                 * !#zh
                 * 注册动画事件回调。
                 * 回调的事件里将会附上发送事件的 AnimationState。
                 * 当播放一个动画时，会自动将事件注册到对应的 AnimationState 上，停止播放时会将事件从这个 AnimationState 上取消注册。
                 * @param type - A string representing the event type to listen for.
                 * @param callback - The callback that will be invoked when the event is dispatched.
                 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
                 * @param [target] - The target (this object) to invoke the callback, can be null
                 * @param [useCapture=false] - When set to true, the capture argument prevents callback
                 *                              from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE.
                 *                              When false, callback will NOT be invoked when event's eventPhase attribute value is CAPTURING_PHASE.
                 *                              Either way, callback will be invoked when event's eventPhase attribute value is AT_TARGET.
                 *
                 * @return Just returns the incoming callback so you can save the anonymous function easier.
                 * @typescript
                 * on(type: string, callback: (event: Event.EventCustom) => void, target?: any, useCapture?: boolean): (event: Event.EventCustom) => void
                 * on<T>(type: string, callback: (event: T) => void, target?: any, useCapture?: boolean): (event: T) => void
                 * @example
                 * onPlay: function (type, state) {
                 *     // callback
                 * }
                 *
                 * // register event to all animation
                 * animation.on('play', this.onPlay, this);
                 */ on(type: string, callback: (state: __unexported.cocos_animation_animation_state_AnimationState) => void, target?: Object | null, useCapture?: boolean): __unexported.cocos_core_event_event_target_factory_IEventTargetCallback | undefined;
        /**
                 * !#en
                 * Unregister animation event callback.
                 * !#zh
                 * 取消注册动画事件回调。
                 * @method off
                 * @param {String} type - A string representing the event type being removed.
                 * @param {Function} [callback] - The callback to remove.
                 * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
                 * @param {Boolean} [useCapture=false] - Specifies whether the callback being removed was registered as a capturing callback or not.
                 *                              If not specified, useCapture defaults to false. If a callback was registered twice,
                 *                              one with capture and one without, each must be removed separately. Removal of a capturing callback
                 *                              does not affect a non-capturing version of the same listener, and vice versa.
                 *
                 * @example
                 * // unregister event to all animation
                 * animation.off('play', this.onPlay, this);
                 */ off(type: string, callback: __unexported.cocos_core_event_event_target_factory_IEventTargetCallback, target?: Object | null, useCapture?: boolean): void;
        private _init;
        private _startCrossFade;
        private _createStates;
        private _createState;
    }
    export function createRaycastResult(): __unexported.cocos_3d_physics_raycast_result_RaycastResult;
    namespace utils {
        /**
             * save a color buffer to a PPM file
             */ export function toPPM(buffer: Uint8Array, w: number, h: number): string;
        export function createMesh(geometry: __unexported.cocos_3d_primitive_define_IGeometry, out?: Mesh, options?: ICreateMeshOptions): Mesh;
        export function calculateBoneSpaceBounds(mesh: Mesh, skeleton: Skeleton): (geometry.aabb | null)[];
        /**
             * Finds a node by hierarchy path, the path is case-sensitive.
             * It will traverse the hierarchy by splitting the path using '/' character.
             * This function will still returns the node even if it is inactive.
             * It is recommended to not use this function every frame instead cache the result at startup.
             */ export function find(path: string, referenceNode?: Node): Node | null;
        export interface ICreateMeshOptions {
            calculateBounds?: boolean;
        }
    }
    namespace primitives {
        /**
             * This function generates a box with specified extents and centered at origin,
             * but may be repositioned through `center` option).
             * @param options Options.
             */ export function box(options?: __unexported.cocos_3d_primitive_box_IBoxOptions): __unexported.cocos_3d_primitive_define_IGeometry;
        export function cone(radius?: number, height?: number, opts?: RecursivePartial<__unexported.cocos_3d_primitive_cone_IConeOptions>): __unexported.cocos_3d_primitive_define_IGeometry;
        export function cylinder(radiusTop?: number, radiusBottom?: number, height?: number, opts?: RecursivePartial<__unexported.cocos_3d_primitive_cylinder_ICylinderOptions>): __unexported.cocos_3d_primitive_define_IGeometry;
        /**
             * This function generates a plane on XOZ plane with positive Y direction.
             * @param options Options.
             */ export function plane(options?: __unexported.cocos_3d_primitive_plane_IPlaneOptions): __unexported.cocos_3d_primitive_define_IGeometry;
        /**
             * Generate a quad with width and height both to 1, centered at origin.
             * @param options Options.
             */ export function quad(options?: __unexported.cocos_3d_primitive_define_IGeometryOptions): __unexported.cocos_3d_primitive_define_IGeometry;
        export function sphere(radius?: number, opts?: RecursivePartial<__unexported.cocos_3d_primitive_sphere_ISphereOptions>): __unexported.cocos_3d_primitive_define_IGeometry;
        export function torus(radius?: number, tube?: number, opts?: RecursivePartial<__unexported.cocos_3d_primitive_torus_ITorusOptions>): {
            positions: number[];
            normals: number[];
            uvs: number[];
            indices: number[];
            minPos: vmath.vec3;
            maxPos: vmath.vec3;
            boundingRadius: number;
        };
        export function capsule(radiusTop?: number, radiusBottom?: number, height?: number, opts?: RecursivePartial<__unexported.cocos_3d_primitive_capsule_ICapsuteOptions>): {
            positions: number[];
            normals: number[];
            uvs: number[];
            indices: number[];
            minPos: vmath.vec3;
            maxPos: vmath.vec3;
            boundingRadius: number;
        };
        /**
             * Generate a circle with radius 1, centered at origin.
             * @param options Options.
             */ export function circle(options?: RecursivePartial<__unexported.cocos_3d_primitive_circle_ICircleOptions> | __unexported.cocos_3d_primitive_circle_ICircleOptions): __unexported.cocos_3d_primitive_define_IGeometry;
        export function translate(geometry: __unexported.cocos_3d_primitive_define_IGeometry, offset: {
            x?: number;
            y?: number;
            z?: number;
        }): __unexported.cocos_3d_primitive_define_IGeometry;
        export function scale(geometry: __unexported.cocos_3d_primitive_define_IGeometry, value: {
            x?: number;
            y?: number;
            z?: number;
        }): __unexported.cocos_3d_primitive_define_IGeometry;
        export function wireframed(geometry: __unexported.cocos_3d_primitive_define_IGeometry): __unexported.cocos_3d_primitive_define_IGeometry;
        /**
             * @deprecated
             */ export function wireframe(indices: number[]): number[];
        /**
             * @deprecated
             */ export function invWinding(indices: number[]): number[];
        /**
             * @deprecated
             */ export function toWavefrontOBJ(primitive: __unexported.cocos_3d_primitive_define_IGeometry, scale?: number): string;
        /**
             * @deprecated
             */ export function normals(positions: number[], normals: number[], length?: number): any[];
    }
    namespace geometry {
        var enums: {
            SHAPE_RAY: number;
            SHAPE_LINE: number;
            SHAPE_SPHERE: number;
            SHAPE_AABB: number;
            SHAPE_OBB: number;
            SHAPE_PLANE: number;
            SHAPE_TRIANGLE: number;
            SHAPE_FRUSTUM: number;
            SHAPE_FRUSTUM_ACCURATE: number;
        };
        namespace distance {
            /**
                 * the distance between a point and a plane
                 *
                 * @param {vec3} point
                 * @param {plane} plane
                 * @return
                 */ export function point_plane(point: vmath.vec3, plane_: plane): number;
            /**
                 * the closest point on plane to a given point
                 *
                 * @param out the result point
                 * @param point
                 * @param plane
                 * @return
                 */ export function pt_point_plane(out: vmath.vec3, point: vmath.vec3, plane_: plane): vmath.vec3;
            var pt_point_aabb: (out: vmath.vec3, point: vmath.vec3, aabb_: aabb) => vmath.vec3;
            var pt_point_obb: (out: vmath.vec3, point: vmath.vec3, obb_: obb) => vmath.vec3;
        }
        var intersect: {
            ray_sphere: (ray: any, sphere: any) => number;
            ray_aabb: (ray: any, aabb: any) => number;
            ray_obb: (ray: any, obb: any) => number;
            ray_plane: (ray: any, plane: any) => number;
            ray_triangle: (ray: any, triangle: any, doubleSided: any) => number;
            line_plane: (line: any, plane: any) => number;
            line_triangle: (line: any, triangle: any, outPt: any) => 1 | 0;
            line_quad: (p: any, q: any, a: any, b: any, c: any, d: any, outPt: any) => 1 | 0;
            sphere_sphere: (sphere0: any, sphere1: any) => boolean;
            sphere_aabb: (sphere: any, aabb: any) => boolean;
            sphere_obb: (sphere: any, obb: any) => boolean;
            sphere_plane: (sphere: any, plane: any) => 1 | -1 | 0;
            sphere_frustum: (sphere: any, frustum: any) => 1 | 0;
            sphere_frustum_accurate: (sphere: any, frustum: any) => 1 | 0;
            aabb_aabb: (aabb1: any, aabb2: any) => boolean;
            aabb_obb: (aabb: any, obb: any) => 1 | 0;
            aabb_plane: (aabb: any, plane: any) => 1 | -1 | 0;
            aabb_frustum: (aabb: any, frustum: any) => 1 | 0;
            aabb_frustum_accurate: (aabb: any, frustum: any) => 1 | 0;
            obb_obb: (obb1: any, obb2: any) => 1 | 0;
            obb_plane: (obb: any, plane: any) => 1 | -1 | 0;
            obb_frustum: (obb: any, frustum: any) => 1 | 0;
            obb_frustum_accurate: (obb: any, frustum: any) => 1 | 0;
            obb_point: (obb: any, point: any) => boolean;
            resolve(g1: any, g2: any, outPt?: null): any;
        };
        export class line {
            /**
                     * create a new line
                     *
                     * @param sx start X component
                     * @param sy start Y component
                     * @param sz start Z component
                     * @param ex end X component
                     * @param ey end Y component
                     * @param ez end Z component
                     * @return
                     */ static create(sx: number, sy: number, sz: number, ex: number, ey: number, ez: number): line;
            /**
                     * Creates a new line initialized with values from an existing line
                     *
                     * @param a line to clone
                     * @return a new line
                     */ static clone(a: line): line;
            /**
                     * Copy the values from one line to another
                     *
                     * @param out the receiving line
                     * @param a the source line
                     * @return out
                     */ static copy(out: line, a: line): line;
            /**
                     * create a line from two points
                     *
                     * @param out the receiving line
                     * @param start line start
                     * @param end target position
                     * @return out
                     */ static fromPoints(out: line, start: vmath.vec3, end: vmath.vec3): line;
            /**
                     * Set the components of a vec3 to the given values
                     *
                     * @param out the receiving vector
                     * @param sx start X component
                     * @param sy start Y component
                     * @param sz start Z component
                     * @param ex end X component
                     * @param ey end Y component
                     * @param ez end Z component
                     * @return out
                     */ static set(out: line, sx: number, sy: number, sz: number, ex: number, ey: number, ez: number): line;
            /**
                     * create line from 2 points
                     *
                     * @param a
                     * @return
                     */ static magnitude(a: line): number;
            /**
                     * Alias of {@link line.magnitude}.
                     */ static mag(a: line): number;
            s: vmath.vec3;
            e: vmath.vec3;
            private _type;
        }
        export class plane {
            /**
                     * create a new plane
                     *
                     * @param nx normal X component
                     * @param ny normal Y component
                     * @param nz normal Z component
                     * @param d distance to the origin
                     * @return
                     */ static create(nx: number, ny: number, nz: number, d: number): plane;
            /**
                     * clone a new plane
                     *
                     * @param p a the source plane
                     * @return
                     */ static clone(p: plane): plane;
            /**
                     * copy the values from one plane to another
                     *
                     * @param out the receiving plane
                     * @param p the source plane
                     * @return
                     */ static copy(out: plane, p: plane): plane;
            /**
                     * create a plane from three points
                     *
                     * @param out the receiving plane
                     * @param a
                     * @param b
                     * @param c
                     * @return
                     */ static fromPoints(out: plane, a: vmath.vec3, b: vmath.vec3, c: vmath.vec3): plane;
            /**
                     * Set the components of a plane to the given values
                     *
                     * @param out the receiving plane
                     * @param nx X component of n
                     * @param ny Y component of n
                     * @param nz Z component of n
                     * @param d
                     * @return out
                     */ static set(out: plane, nx: number, ny: number, nz: number, d: number): plane;
            /**
                     * create plane from normal and point
                     *
                     * @param out the receiving plane
                     * @param normal
                     * @param point
                     * @return out
                     */ static fromNormalAndPoint(out: plane, normal: vmath.vec3, point: vmath.vec3): plane;
            /**
                     * normalize a plane
                     *
                     * @param out the receiving plane
                     * @param a plane to normalize
                     * @return out
                     */ static normalize(out: plane, a: plane): plane;
            transform: (mat: vmath.mat4) => void;
            n: vmath.vec3;
            d: number;
            private _type;
        }
        export class ray {
            /**
                     * create a new ray
                     *
                     * @param {number} ox origin X component
                     * @param {number} oy origin Y component
                     * @param {number} oz origin Z component
                     * @param {number} dx dir X component
                     * @param {number} dy dir Y component
                     * @param {number} dz dir Z component
                     * @return {ray}
                     */ static create(ox?: number, oy?: number, oz?: number, dx?: number, dy?: number, dz?: number): ray;
            /**
                     * Creates a new ray initialized with values from an existing ray
                     *
                     * @param {ray} a ray to clone
                     * @return {ray} a new ray
                     */ static clone(a: any): ray;
            /**
                     * Copy the values from one ray to another
                     *
                     * @param {ray} out the receiving ray
                     * @param {ray} a the source ray
                     * @return {ray} out
                     */ static copy(out: any, a: any): any;
            /**
                     * create a ray from two points
                     *
                     * @param {ray} out the receiving ray
                     * @param {vec3} origin ray origin
                     * @param {vec3} target target position
                     * @return {ray} out
                     */ static fromPoints(out: any, origin: any, target: any): any;
            /**
                     * Set the components of a ray to the given values
                     *
                     * @param {ray} out the receiving ray
                     * @param {number} ox origin X component
                     * @param {number} oy origin Y component
                     * @param {number} oz origin Z component
                     * @param {number} dx dir X component
                     * @param {number} dy dir Y component
                     * @param {number} dz dir Z component
                     * @return {ray} out
                     */ static set(out: any, ox: any, oy: any, oz: any, dx: any, dy: any, dz: any): any;
            o: vmath.vec3;
            d: vmath.vec3;
            private _type;
        }
        export class triangle {
            /**
                     * create a new triangle
                     *
                     * @param {number} ax
                     * @param {number} ay
                     * @param {number} az
                     * @param {number} bx
                     * @param {number} by
                     * @param {number} bz
                     * @param {number} cx
                     * @param {number} cy
                     * @param {number} cz
                     * @return {triangle}
                     */ static create(ax?: number, ay?: number, az?: number, bx?: number, by?: number, bz?: number, cx?: number, cy?: number, cz?: number): triangle;
            /**
                     * clone a new triangle
                     *
                     * @param {triangle} t the source plane
                     * @return {triangle}
                     */ static clone(t: any): triangle;
            /**
                     * copy the values from one triangle to another
                     *
                     * @param {triangle} out the receiving triangle
                     * @param {triangle} t the source triangle
                     * @return {triangle}
                     */ static copy(out: any, t: any): any;
            /**
                     * Create a triangle from three points
                     *
                     * @param {triangle} out the receiving triangle
                     * @param {vec3} a
                     * @param {vec3} b
                     * @param {vec3} c
                     * @return {triangle}
                     */ static fromPoints(out: any, a: any, b: any, c: any): any;
            /**
                     * Set the components of a triangle to the given values
                     *
                     * @param {triangle} out the receiving plane
                     * @param {number} ax X component of a
                     * @param {number} ay Y component of a
                     * @param {number} az Z component of a
                     * @param {number} bx X component of b
                     * @param {number} by Y component of b
                     * @param {number} bz Z component of b
                     * @param {number} cx X component of c
                     * @param {number} cy Y component of c
                     * @param {number} cz Z component of c
                     * @return {plane}
                     * @function
                     */ static set(out: any, ax: any, ay: any, az: any, bx: any, by: any, bz: any, cx: any, cy: any, cz: any): any;
            a: vmath.vec3;
            b: vmath.vec3;
            c: vmath.vec3;
            private _type;
        }
        export class sphere {
            /**
                     * create a new sphere
                     *
                     * @return {plane}
                     */ static create(cx: any, cy: any, cz: any, r: any): sphere;
            /**
                     * clone a new sphere
                     *
                     * @param {sphere} p the source sphere
                     * @return {sphere}
                     */ static clone(p: any): sphere;
            /**
                     * copy the values from one sphere to another
                     *
                     * @param {sphere} out the receiving sphere
                     * @param {sphere} p the source sphere
                     * @return {sphere}
                     */ static copy(out: any, p: any): any;
            /**
                     * create a new bounding sphere from two corner points
                     *
                     * @param {sphere} out the receiving sphere
                     * @param {vec3} minPos lower corner of the original shape
                     * @param {vec3} maxPos upper corner of the original shape
                     * @return {sphere}
                     */ static fromPoints(out: any, minPos: any, maxPos: any): any;
            /**
                     * Set the components of a sphere to the given values
                     *
                     * @param {sphere} out the receiving sphere
                     * @param {number} cx X component of c
                     * @param {number} cy Y component of c
                     * @param {number} cz Z component of c
                     * @param {number} r
                     * @return {sphere} out
                     * @function
                     */ static set(out: any, cx: any, cy: any, cz: any, r: any): any;
            c: vmath.vec3;
            r: number;
            private _type;
            clone(): sphere;
            copy(a: sphere): any;
            /**
                     * Get the bounding points of this shape
                     * @param {vec3} minPos
                     * @param {vec3} maxPos
                     */ getBoundary(minPos: any, maxPos: any): void;
            /**
                     * Transform this shape
                     * @param {mat4} m the transform matrix
                     * @param {vec3} pos the position part of the transform
                     * @param {quat} rot the rotation part of the transform
                     * @param {vec3} scale the scale part of the transform
                     * @param {sphere} [out] the target shape
                     */ transform(m: any, pos: any, rot: any, scale: any, out: any): void;
        }
        export class aabb {
            readonly type: number;
            /**
                     * create a new aabb
                     *
                     * @param px - X coordinates for aabb's original point
                     * @param py - Y coordinates for aabb's original point
                     * @param pz - Z coordinates for aabb's original point
                     * @param w - the half of aabb width
                     * @param h - the half of aabb height
                     * @param l - the half of aabb length
                     * @returns the resulting aabb
                     */ static create(px?: number, py?: number, pz?: number, w?: number, h?: number, l?: number): aabb;
            /**
                     * clone a new aabb
                     *
                     * @param a - the source aabb
                     * @returns the cloned aabb
                     */ static clone(a: aabb): aabb;
            /**
                     * copy the values from one aabb to another
                     *
                     * @param {aabb} out the receiving aabb
                     * @param {aabb} a the source aabb
                     * @return {aabb}
                     */ static copy(out: any, a: any): any;
            /**
                     * create a new aabb from two corner points
                     *
                     * @param out - the receiving aabb
                     * @param minPos - lower corner position of the aabb
                     * @param maxPos - upper corner position of the aabb
                     * @returns the resulting aabb
                     */ static fromPoints(out: aabb, minPos: vmath.vec3, maxPos: vmath.vec3): aabb;
            /**
                     * Set the components of a aabb to the given values
                     *
                     * @param {aabb} out the receiving aabb
                     * @param {number} px X coordinates for aabb's original point
                     * @param {number} py Y coordinates for aabb's original point
                     * @param {number} pz Z coordinates for aabb's original point
                     * @param {number} w the half of aabb width
                     * @param {number} h the half of aabb height
                     * @param {number} l the half of aabb length
                     * @return {aabb} out
                     * @function
                     */ static set(out: any, px: any, py: any, pz: any, w: any, h: any, l: any): any;
            static merge(out: aabb, a: aabb, b: aabb): aabb;
            static transform(out: aabb, a: aabb, matrix: vmath.mat4): void;
            center: vmath.vec3;
            halfExtents: vmath.vec3;
            protected _type: number;
            /**
                     * Get the bounding points of this shape
                     * @param {vec3} minPos
                     * @param {vec3} maxPos
                     */ getBoundary(minPos: vmath.vec3, maxPos: vmath.vec3): void;
            /**
                     * Transform this shape
                     * @param m - the transform matrix
                     * @param out - the target shape
                     */ transform(m: any, pos: any, rot: any, scale: any, out: any): void;
            clone(): aabb;
            copy(a: aabb): any;
        }
        export class obb {
            /**
                     * create a new obb
                     *
                     * @param px X coordinates for obb's original point
                     * @param py Y coordinates for obb's original point
                     * @param pz Z coordinates for obb's original point
                     * @param hw the half of obb width
                     * @param hh the half of obb height
                     * @param hl the half of obb length
                     * @param ox_1 orientation matrix coefficient
                     * @param ox_2 orientation matrix coefficient
                     * @param ox_3 orientation matrix coefficient
                     * @param oy_1 orientation matrix coefficient
                     * @param oy_2 orientation matrix coefficient
                     * @param oy_3 orientation matrix coefficient
                     * @param oz_1 orientation matrix coefficient
                     * @param oz_2 orientation matrix coefficient
                     * @param oz_3 orientation matrix coefficient
                     * @return
                     */ static create(px: number, py: number, pz: number, hw: number, hh: number, hl: number, ox_1: number, ox_2: number, ox_3: number, oy_1: number, oy_2: number, oy_3: number, oz_1: number, oz_2: number, oz_3: number): obb;
            /**
                     * clone a new obb
                     *
                     * @param a the source obb
                     * @return
                     */ static clone(a: obb): obb;
            /**
                     * copy the values from one obb to another
                     *
                     * @param out the receiving obb
                     * @param a the source obb
                     * @return
                     */ static copy(out: obb, a: obb): obb;
            /**
                     * create a new obb from two corner points
                     *
                     * @param out the receiving obb
                     * @param minPos lower corner position of the obb
                     * @param maxPos upper corner position of the obb
                     * @return
                     */ static fromPoints(out: obb, minPos: vmath.vec3, maxPos: vmath.vec3): obb;
            /**
                     * Set the components of a obb to the given values
                     *
                     * @param out the receiving obb
                     * @param px X coordinates for obb's original point
                     * @param py Y coordinates for obb's original point
                     * @param pz Z coordinates for obb's original point
                     * @param hw the half of obb width
                     * @param hh the half of obb height
                     * @param hl the half of obb length
                     * @param ox_1 orientation matrix coefficient
                     * @param ox_2 orientation matrix coefficient
                     * @param ox_3 orientation matrix coefficient
                     * @param oy_1 orientation matrix coefficient
                     * @param oy_2 orientation matrix coefficient
                     * @param oy_3 orientation matrix coefficient
                     * @param oz_1 orientation matrix coefficient
                     * @param oz_2 orientation matrix coefficient
                     * @param oz_3 orientation matrix coefficient
                     * @return out
                     */ static set(out: obb, px: number, py: number, pz: number, hw: number, hh: number, hl: number, ox_1: number, ox_2: number, ox_3: number, oy_1: number, oy_2: number, oy_3: number, oz_1: number, oz_2: number, oz_3: number): obb;
            center: vmath.vec3;
            halfExtents: vmath.vec3;
            orientation: vmath.mat3;
            private _type;
            /**
                     * Get the bounding points of this shape
                     * @param minPos
                     * @param maxPos
                     */ getBoundary(minPos: vmath.vec3, maxPos: vmath.vec3): void;
            /**
                     * Transform this shape
                     * @param m the transform matrix
                     * @param pos the position part of the transform
                     * @param rot the rotation part of the transform
                     * @param scale the scale part of the transform
                     * @param [out] the target shape
                     */ transform(m: vmath.mat4, pos: vmath.vec3, rot: vmath.quat, scale: vmath.vec3, out?: obb): void;
        }
        export class frustum {
            /**
                     * Set whether to use accurate intersection testing function on this frustum
                     */ accurate: boolean;
            /**
                     * create a new frustum
                     *
                     * @return {frustum}
                     */ static create(): frustum;
            static createOrtho: (out: frustum, width: number, height: number, near: number, far: number, transform: vmath.mat4) => void;
            /**
                     * Clone a frustum
                     */ static clone(f: frustum): frustum;
            /**
                     * Copy the values from one frustum to another
                     */ static copy(out: frustum, f: frustum): frustum;
            planes: plane[];
            vertices: vmath.vec3[];
            private _type;
            /**
                     * Update the frustum information according to the given transform matrix.
                     * Note that the resulting planes are not normalized under normal mode.
                     *
                     * @param {mat4} m the view-projection matrix
                     * @param {mat4} inv the inverse view-projection matrix
                     */ update(m: vmath.mat4, inv: vmath.mat4): void;
            transform(mat: vmath.mat4): void;
        }
        /**
             * An octree acceleration data structure
             * @example
             * let octree = new Octree();
             * octree.build(models, model => {
             *   return model._boundingShape;
             * });
             * octree.select(enums.SHAPE_FRUSTUM, view._frustum);
             */ export class Octree {
            /**
                     * Create sub blocks and populate them with given entries
                     * @param {vec3} worldMin - min position of the parent bounding box
                     * @param {vec3} worldMax - max position of the parent bounding box
                     * @param {Array<Object>} entries - the entries to be inserted
                     * @param {number} blockCapacity - maximum capacity for each block node
                     * before it's been subdivided, might be exceeded if `maxDepth` is reached
                     * @param {number} curDepth - depth before subdivided
                     * @param {number} maxDepth - maximum depth of this tree
                     * @param {function(entry: Object): Object} getBoundingShape - a function takes an entry and returns its primitive info
                     * @return {OctreeBlock[]} the sub blocks
                     */ static createBlocks(worldMin: any, worldMax: any, entries: any, blockCapacity: any, curDepth: any, maxDepth: any, getBoundingShape: any): __unexported.cocos_3d_geom_utils_octree_OctreeBlock[];
            blockCapacity: number;
            maxDepth: number;
            blocks: __unexported.cocos_3d_geom_utils_octree_OctreeBlock[];
            dynamics: any[];
            private _selection;
            private _getBoundingShape;
            /**
                     * Build this octree from given entries.
                     * Root Boundary is the bounding box of all the entries.
                     * @param {Array<Object>} entries - a collection of entries to be queried later
                     * @param {function(entry: Object): Object} getBoundingShape
                     *  - a function takes an entry and returns its primitive info
                     */ build(entries: any, getBoundingShape: any): void;
            /**
                     * Add an entry to this tree. Should be called after `build`.
                     * @param {Object} entry - the new entry
                     */ addEntry(entry: any): void;
            /**
                     * Remove an entry from this tree. Should be called after `build`.
                     * @param {Object} entry - the entry to be removed
                     */ removeEntry(entry: any): void;
            /**
                     * Select all the entries overlapping the given primitive
                     * @param {Object} shape - the selecting primitive
                     * @return {Set<Object>} the resulting set of entries
                     */ select(shape: any): Set<any>;
            /**
                     * Specialized selection for frustums
                     * @param {Object} frustum - the selecting frustum
                     * @return {Set<Object>} the resulting set of entries
                     */ frustumSelect(frustum: any): Set<any>;
        }
        export class Keyframe {
            time: number;
            value: number;
            inTangent: number;
            outTangent: number;
        }
        export class AnimationCurve {
            keyFrames: Keyframe[] | null;
            preWrapMode: number;
            postWrapMode: number;
            private cachedKey;
            private static defaultKF;
            addKey(keyFrame: Keyframe): void;
            evaluate_slow(time: number): number;
            evaluate(time: number): number;
            calcOptimizedKey(optKey: __unexported.cocos_3d_geom_utils_curve_OptimizedKey, leftIndex: number, rightIndex: number): void;
            private findIndex;
        }
    }
    export class AudioClip extends __unexported.cocos_3d_assets_audio_clip_AudioClip_base {
        _nativeAsset: any;
        readonly loadMode: number;
        readonly state: number;
        static PlayingState: {
            INITIALIZING: number;
            PLAYING: number;
            STOPPED: number;
        };
        static AudioType: {
            UNKNOWN_AUDIO: number;
            WEB_AUDIO: number;
            DOM_AUDIO: number;
            WX_GAME_AUDIO: number;
        };
        protected _duration: number;
        protected _loadMode: number;
        protected _audio: any;
        private _player;
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
    export class EffectAsset extends Asset {
        static register(asset: EffectAsset): void;
        static remove(name: string): void;
        static get(name: string): EffectAsset | null;
        static getAll(): Record<string, EffectAsset>;
        protected static _effects: Record<string, EffectAsset>;
        techniques: __unexported.cocos_3d_assets_effect_asset_ITechniqueInfo[];
        shaders: __unexported.cocos_3d_assets_effect_asset_IShaderInfo[];
        onLoaded(): void;
    }
    export class Material extends Asset {
        static getInstantiatedMaterial(mat: Material, rndCom: RenderableComponent, inEditor: boolean): Material;
        protected _effectAsset: EffectAsset | null;
        protected _techIdx: number;
        protected _defines: __unexported.cocos_renderer_core_pass_IDefineMap[];
        protected _states: __unexported.cocos_renderer_core_pass_PassOverrides[];
        protected _props: Array<Record<string, any>>;
        protected _passes: renderer.Pass[];
        protected _owner: RenderableComponent | null;
        protected _hash: number;
        readonly effectAsset: EffectAsset | null;
        readonly effectName: string;
        readonly technique: number;
        readonly passes: renderer.Pass[];
        readonly hash: number;
        initialize(info: __unexported.cocos_3d_assets_material_IMaterialInfo): void;
        destroy(): void;
        /**
                 * Convenient setter provided for quick material setup.
                 * pass.setUniform should be used instead
                 * if you need to do per-frame property update.
                 */ setProperty(name: string, val: any, passIdx?: number): void;
        getProperty(name: string, passIdx?: number): any;
        copy(mat: Material): void;
        recompileShaders(defineOverrides: __unexported.cocos_renderer_core_pass_IDefineMap | __unexported.cocos_renderer_core_pass_IDefineMap[]): void;
        overridePipelineStates(overrides: __unexported.cocos_renderer_core_pass_PassOverrides, passIdx?: number): void;
        onLoaded(): void;
        protected _prepareInfo(patch: object | object[], cur: object[]): void;
        protected _update(keepProps?: boolean): void;
        protected _uploadProperty(pass: renderer.Pass, name: string, val: any): boolean;
        protected _onPassesChange(): void;
    }
    export class Mesh extends Asset {
        _nativeAsset: ArrayBuffer;
        /**
                 * Submeshes count of this mesh.
                 * @deprecated Use this.renderingMesh.subMeshCount instead.
                 */ readonly subMeshCount: number;
        /**
                 * Min position of this mesh.
                 * @deprecated Use this.struct.minPosition instead.
                 */ readonly minPosition: Vec3 | undefined;
        /**
                 * Max position of this mesh.
                 * @deprecated Use this.struct.maxPosition instead.
                 */ readonly maxPosition: Vec3 | undefined;
        readonly struct: __unexported.cocos_3d_assets_mesh_IMeshStruct;
        readonly data: Uint8Array | null;
        private _struct;
        private _data;
        private _initialized;
        private _renderingMesh;
        /**
                 * Destory this mesh and immediately release its GPU resources.
                 */ destroy(): any;
        /**
                 * Assigns new mesh struct to this.
                 * @param struct The new mesh's struct.
                 * @param data The new mesh's data.
                 */ assign(struct: __unexported.cocos_3d_assets_mesh_IMeshStruct, data: Uint8Array): void;
        /**
                 * Gets the rendering mesh.
                 */ readonly renderingMesh: __unexported.cocos_3d_assets_mesh_RenderingMesh;
        /**
                 * !#en
                 * Gets the specified submesh.
                 * @param index Index of the specified submesh.
                 * @deprecated Use this.renderingMesh.getSubmesh(index).inputAssembler instead.
                 */ getSubMesh(index: number): __unexported.cocos_3d_assets_mesh_IRenderingSubmesh;
        merge(mesh: Mesh, validate?: boolean): boolean;
        validateMergingMesh(mesh: Mesh): boolean;
        readAttribute(primitiveIndex: number, attributeName: __unexported.cocos_gfx_define_GFXAttributeName): Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | null;
        copyAttribute(primitiveIndex: number, attributeName: __unexported.cocos_gfx_define_GFXAttributeName, buffer: ArrayBuffer, stride: number, offset: number): Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | null;
        readIndices(primitiveIndex: number): Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | null;
        copyIndices(primitiveIndex: number, typedArray: any): null | undefined;
        private _init;
        private _createVertexBuffers;
        private _tryDestroyRenderingMesh;
    }
    /**
         * CLASS Skeleton
         * The skeleton class represent a kind of deformation.
         * A skeleton consists of a forest hierachy of nodes.
         * Some of the nodes, called joints, have special meanings.
         * Skeletons are not mutable, but they can be instantiated
         * to produce a skeleton instance. Skeleton instances can be modified,
         * for example, be animated.
         */ export class Skeleton extends Asset {
        /**
                 * The path of joints.
                 */ private _joints;
        /**
                 * The inverse bind matrices of joints.
                 */ private _inverseBindMatrices;
        /**
                 * Gets the bind pose matrices of joints.
                 */ /**
                * Sets the bind pose matrices of joints.
                */ bindposes: Mat4[];
        /**
                 * Gets the paths of joints.
                 */ /**
                * Sets the paths of joints.
                */ joints: string[];
    }
    export class PhysicsMaterial extends Asset {
        _friction: number;
        _restitution: number;
        /**
                 * Friction for this material.
                 * If non-negative, it will be used instead of the friction given by ContactMaterials.
                 * If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used.
                 */ friction: number;
        /**
                 * Restitution for this material.
                 * If non-negative, it will be used instead of the restitution given by ContactMaterials.
                 * If there's no matching ContactMaterial, the value from .defaultContactMaterial in the World will be used
                 */ restitution: number;
    }
    var builtinResMgr: __unexported.cocos_3d_builtin_init_BuiltinResMgr;
    /**
         * A representation of a single audio source,
         * contains basic functionalities like play, pause and stop.
         */ export class AudioSourceComponent extends Component {
        protected _clip: AudioClip | null;
        protected _loop: boolean;
        protected _playOnAwake: boolean;
        protected _volume: number;
        private _cachedCurrentTime;
        /**
                 * @en
                 * The default AudioClip to play
                 * @zh
                 * 设定要播放的音频
                 */ clip: any;
        /**
                 * @en
                 * Is the audio clip looping?
                 * @zh
                 * 是否循环播放音频
                 */ loop: any;
        /**
                 * @en
                 * Is the autoplay enabled? <br>
                 * Note that for the most time now the autoplay will only starts <br>
                 * after a user gesture is received, according to the latest autoplay policy: <br>
                 * https://www.chromium.org/audio-video/autoplay
                 * @zh
                 * 是否启用自动播放 <br>
                 * 请注意，根据最新的自动播放策略，大部分自动播放仅在收到用户指令后生效 <br>
                 * 参看：https://www.chromium.org/audio-video/autoplay
                 */ playOnAwake: any;
        /**
                 * @en
                 * The volume of this audio source (0.0 to 1.0).
                 * @zh
                 * 音频的音量（大小范围为 0.0 到 1.0 ）
                 *
                 * 请注意,在某些平台上，音量控制可能不起效<br>
                 * 请注意,在 ios 平台的 dom 模式下控制音量将无法生效
                 */ volume: any;
        onLoad(): void;
        /**
                 * @en
                 * Plays the clip
                 * @zh
                 * 开始播放音频
                 *
                 * 如果音频处于正在播放状态，将会重新开始播放音频 <br>
                 * 如果音频处于暂停状态，则会继续播放音频
                 */ play(): void;
        /**
                 * @en
                 * Pause the clip
                 * @zh
                 * 暂停播放
                 */ pause(): void;
        /**
                 * @en
                 * Stop the clip
                 * @zh
                 * 停止播放
                 */ stop(): void;
        /**
                 * @en Plays an AudioClip, and scales volume by volumeScale.
                 * @zh 以指定音量播放一个音频一次
                 *
                 * 请注意，视平台不同同时重复播放的音频效果存在差异 <br>
                 * 在 dom 模式下，不支持同时进行多重播放，所以在多重播放时将会产生重新播放的效果 <br>
                 * 在微信模式下，不支持同时进行多重播放，所以在多重播放时将会产生重新播放的效果
                 * @param clip - the clip being played
                 * @param volumeScale - the scale of the volume (0-1).
                 */ playOneShot(clip: AudioClip, volumeScale?: number): void;
        protected _syncStates(): void;
        /**
                 * @en
                 * set current playback time, in seconds
                 * @zh
                 * 以秒为单位设置当前播放时间
                 * @param num the playback time you want to jump to
                 */ /**
                * @en
                * get the current playback time, in seconds
                * @zh
                * 以秒为单位获取当前播放时间
                * @returns time current playback time
                */ currentTime: number;
        /**
                 * @en
                 * get the audio duration, in seconds
                 * @zh
                 * 以秒为单位获取音频持续时间
                 * @returns audio duration
                 */ readonly duration: number;
        /**
                 * @en
                 * get current audio state
                 * @zh
                 * 获取当前音频状态
                 * @returns current audio state
                 */ readonly state: number;
        /**
                 * @en
                 * is the audio currently playing?
                 * @zh
                 * 当前音频是否正在播放
                 */ readonly playing: boolean;
    }
    /**
         * @en The Camera Component
         * @zh 相机组件
         * @class CameraComponent
         * @extends Component
         */ export class CameraComponent extends Component {
        static ProjectionType: any;
        protected _projection: any;
        protected _priority: number;
        protected _fov: number;
        protected _orthoHeight: number;
        protected _near: number;
        protected _far: number;
        protected _color: any;
        protected _depth: number;
        protected _stencil: number;
        protected _clearFlags: any;
        protected _rect: Rect;
        protected _screenScale: number;
        protected _targetDisplay: number;
        protected _camera: renderer.Camera | null;
        /**
                 * @en The projection type of the camera
                 * @zh 相机的投影类型
                 */ projection: any;
        /**
                 * @en The camera field of view
                 * @zh 相机的视角大小
                 */ fov: number;
        /**
                 * @en The camera height when in orthogonal mode
                 * @zh 正交模式下的相机视角大小
                 */ orthoHeight: number;
        /**
                 * @en The near clipping distance of the camera
                 * @zh 相机的近平面
                 */ near: number;
        /**
                 * @en The far clipping distance of the camera
                 * @zh 相机的远平面
                 */ far: number;
        /**
                 * @en The color clearing value of the camera
                 * @zh 相机的颜色缓冲默认值
                 */ color: any;
        /**
                 * @en The depth clearing value of the camera
                 * @zh 相机的深度缓冲默认值
                 */ depth: number;
        /**
                 * @en The stencil clearing value of the camera
                 * @zh 相机的模板缓冲默认值
                 */ stencil: number;
        /**
                 * @en The clearing flags of this camera
                 * @zh 相机的缓冲清除标志位
                 */ clearFlags: any;
        /**
                 * @en The screen viewport of the camera wrt. sceen size
                 * @zh 相机相对屏幕的 viewport
                 */ rect: Rect;
        /**
                 * @en The scale of the interal buffer size,
                 * set to 1 to keep the same with the canvas size
                 * @zh 相机内部缓冲尺寸的缩放值, 1 为与 canvas 尺寸相同
                 */ screenScale: number;
        /**
                 * @en The target display for this Camera.
                 * @zh 相机的目标屏幕序号
                 */ targetDisplay: number;
        onLoad(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        screenPointToRay(x: number, y: number, out?: geometry.ray): geometry.ray;
        worldToScreen(worldPos: Vec3, out?: Vec3): Vec3;
        screenToWorld(screenPos: Vec3, out?: Vec3): Vec3;
        protected _createCamera(): void;
        protected onSceneChanged(scene: Scene): void;
    }
    export class LightComponent extends Component {
        static Type: typeof __unexported.cocos_renderer_scene_light_LightType;
        static PhotometricTerm: any;
        protected _color: Color;
        protected _useColorTemperature: boolean;
        protected _colorTemperature: number;
        protected _type: __unexported.cocos_renderer_scene_light_LightType;
        protected _light: renderer.Light | null;
        /**
                 * @en
                 * The light source color
                 * @zh
                 * 光源颜色
                 */ color: Color;
        /**
                 * @en
                 * Whether to enable light color temperature
                 * @zh
                 * 是否启用光源色温
                 */ useColorTemperature: boolean;
        /**
                 * @en
                 * The light color temperature
                 * @zh
                 * 光源色温
                 */ colorTemperature: number;
        /**
                 * @en
                 * The light type
                 * @zh
                 * 光源类型
                 */ readonly type: __unexported.cocos_renderer_scene_light_LightType;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        protected _createLight(scene?: __unexported.cocos_renderer_scene_render_scene_RenderScene): void;
        protected _destroyLight(scene?: __unexported.cocos_renderer_scene_render_scene_RenderScene): void;
    }
    /**
         * 模型组件
         * @class ModelComponent
         * @extends RenderableComponent
         */ export class ModelComponent extends RenderableComponent {
        /**
                 * @en The mesh of the model
                 * @zh 模型网格
                 * @type {Mesh}
                 */ mesh: Mesh | null;
        /**
                 * @en The shadow casting mode
                 * @zh 投射阴影方式
                 * @type {Number}
                 */ shadowCastingMode: any;
        /**
                 * @en Does this model receive shadows?
                 * @zh 是否接受阴影?
                 * @type {Boolean}
                 */ receiveShadows: boolean;
        readonly model: renderer.Model | null;
        static ShadowCastingMode: any;
        protected _model: renderer.Model | null;
        protected _mesh: Mesh | null;
        private _shadowCastingMode;
        private _receiveShadows;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        protected _updateModels(): void;
        protected _createModel(): void;
        protected _getModelConstructor(): typeof renderer.Model;
        protected _updateModelParams(): void;
        protected _onMaterialModified(idx: number, material: Material | null): void;
        protected _onRebuildPSO(idx: number, material: Material): void;
        protected _onMeshChanged(old: Mesh | null): void;
        protected _clearMaterials(): void;
        private _updateCastShadow;
        private _updateReceiveShadow;
        private _getBuiltinMaterial;
    }
    /**
         * @en The Skinning Model Component
         * @zh 蒙皮模型组件
         */ export class SkinningModelComponent extends ModelComponent {
        /**
                 * @en The bone nodes
                 * @zh 骨骼节点
                 */ skeleton: Skeleton | null;
        /**
                 * 骨骼根节点的引用
                 */ skinningRoot: Node | null;
        private _skeleton;
        private _skinningRoot;
        private _skinningTarget;
        private _boneSpaceBounds;
        onLoad(): void;
        update(dt: any): void;
        onDestroy(): void;
        calculateSkinnedBounds(out?: geometry.aabb): boolean;
        _tryUpdateMatrices(): void;
        _updateModelParams(): void;
        protected _onMeshChanged(old: Mesh | null): void;
        protected _onSkeletonChanged(old: Skeleton | null): void;
        protected _getModelConstructor(): typeof renderer.SkinningModel;
        protected _onMaterialModified(index: number, material: Material): void;
        private _bindSkeleton;
        private _resetSkinningTarget;
    }
    export class BoxColliderComponent extends __unexported.cocos_3d_framework_physics_collider_component_ColliderComponentBase {
        private _size;
        private _shape;
        __preload(): void;
        /**
                 * The size of the box, in local space.
                 * @note Shall not specify size with component 0.
                 */ size: Vec3;
    }
    export class ParticleSystemComponent extends Component {
        private _capacity;
        /**
                 * 粒子系统能生成的最大粒子数量
                 */ capacity: number;
        /**
                 * 粒子初始颜色
                 */ startColor: __unexported.cocos_3d_framework_particle_animator_gradient_range_default;
        /**
                 * 粒子初始大小
                 */ startSize: __unexported.cocos_3d_framework_particle_animator_curve_range_default;
        /**
                 * 粒子初始速度
                 */ startSpeed: __unexported.cocos_3d_framework_particle_animator_curve_range_default;
        /**
                 * 粒子初始旋转角度
                 */ startRotation: __unexported.cocos_3d_framework_particle_animator_curve_range_default;
        /**
                 * 粒子系统开始运行后，延迟粒子发射的时间
                 */ startDelay: __unexported.cocos_3d_framework_particle_animator_curve_range_default;
        /**
                 * 粒子生命周期
                 */ startLifetime: __unexported.cocos_3d_framework_particle_animator_curve_range_default;
        /**
                 * 粒子系统运行时间
                 */ duration: number;
        /**
                 * 粒子系统是否循环播放
                 */ loop: boolean;
        private _prewarm;
        /**
                 * 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效）
                 */ prewarm: boolean;
        private _simulationSpace;
        /**
                 * 选择粒子系统所在的坐标系<br>
                 * 世界坐标（不随其他物体位置改变而变换）<br>
                 * 局部坐标（跟随父节点位置改变而移动）<br>
                 * 自定坐标（跟随自定义节点的位置改变而移动）
                 */ simulationSpace: any;
        /**
                 * 控制整个粒子系统的更新速度
                 */ simulationSpeed: number;
        /**
                 * 粒子系统加载后是否自动开始播放
                 */ playOnAwake: boolean;
        /**
                 * 粒子受重力影响的重力系数
                 */ gravityModifier: __unexported.cocos_3d_framework_particle_animator_curve_range_default;
        /**
                 * 每秒发射的粒子数
                 */ rateOverTime: __unexported.cocos_3d_framework_particle_animator_curve_range_default;
        /**
                 * 每移动单位距离发射的粒子数
                 */ rateOverDistance: __unexported.cocos_3d_framework_particle_animator_curve_range_default;
        /**
                 * 设定在指定时间发射指定数量的粒子的 Brust 的数量
                 */ bursts: any[];
        /**
                 * 颜色控制模块
                 */ colorOverLifetimeModule: __unexported.cocos_3d_framework_particle_animator_color_overtime_default;
        /**
                 * 粒子发射器模块
                 */ shapeModule: __unexported.cocos_3d_framework_particle_emitter_shape_module_default;
        /**
                 * 粒子大小模块
                 */ sizeOvertimeModule: __unexported.cocos_3d_framework_particle_animator_size_overtime_default;
        /**
                 * 粒子速度模块
                 */ velocityOvertimeModule: __unexported.cocos_3d_framework_particle_animator_velocity_overtime_default;
        /**
                 * 粒子加速度模块
                 */ forceOvertimeModule: __unexported.cocos_3d_framework_particle_animator_force_overtime_default;
        /**
                 * 粒子限制速度模块（只支持 CPU 粒子）
                 */ limitVelocityOvertimeModule: __unexported.cocos_3d_framework_particle_animator_limit_velocity_overtime_default;
        /**
                 * 粒子旋转模块
                 */ rotationOvertimeModule: __unexported.cocos_3d_framework_particle_animator_rotation_overtime_default;
        /**
                 * 贴图动画模块
                 */ textureAnimationModule: __unexported.cocos_3d_framework_particle_animator_texture_animation_default;
        /**
                 * 粒子轨迹模块
                 */ trailModule: __unexported.cocos_3d_framework_particle_renderer_trail_default;
        private renderer;
        private _isPlaying;
        private _isPaused;
        private _isStopped;
        private _isEmitting;
        private _time;
        private _emitRateTimeCounter;
        private _emitRateDistanceCounter;
        private _oldWPos;
        private _curWPos;
        private _customData1;
        private _customData2;
        private _subEmitters;
        protected onLoad(): void;
        protected onDestroy(): void;
        protected onEnable(): void;
        protected onDisable(): void;
        /**
                 * 播放粒子效果
                 */ play(): void;
        /**
                 * 暂停播放粒子效果
                 */ pause(): void;
        /**
                 * 停止播放粒子
                 */ stop(): void;
        /**
                 * 将所有粒子从粒子系统中清除
                 */ clear(): void;
        private emit;
        private _prewarmSystem;
        private _emit;
        protected update(dt: any): void;
        private addSubEmitter;
        private removeSubEmitter;
        private addBurst;
        private removeBurst;
        getParticleCount(): number;
        setCustomData1(x: any, y: any): void;
        setCustomData2(x: any, y: any): void;
        readonly isPlaying: boolean;
        readonly isPaused: boolean;
        readonly isStopped: boolean;
        readonly isEmitting: boolean;
        readonly time: number;
    }
    export class RigidBodyComponent extends __unexported.cocos_3d_framework_physics_detail_physics_based_component_PhysicsBasedComponent {
        private _material;
        private _mass;
        private _linearDamping;
        private _angularDamping;
        private _fixedRotation;
        private _triggered;
        private _isKinematic;
        private _useGravity;
        private _velocity;
        __preload(): void;
        onLoad(): void;
        material: PhysicsMaterial | null;
        mass: number;
        isKinematic: boolean;
        useGravity: boolean;
        linearDamping: number;
        angularDamping: number;
        fixedRotation: boolean;
        isTrigger: boolean;
        velocity: Vec3;
        applyForce(force: Vec3, position?: Vec3): void;
        applyImpulse(impulse: Vec3, position?: Vec3): void;
        wakeUp(): void;
        sleep(): void;
        setCollisionFilter(group: number, mask: number): void;
    }
    export class SphereColliderComponent extends __unexported.cocos_3d_framework_physics_collider_component_ColliderComponentBase {
        private _radius;
        private _shape;
        __preload(): void;
        /**
                 * The radius of the sphere.
                 */ radius: number;
    }
    export class RenderableComponent extends Component {
        protected _materials: Array<Material | null>;
        onLoad(): void;
        sharedMaterials: (Material | null)[];
        /**
                 * @en The material of the model
                 * @zh 模型材质
                 * @type {Material[]}
                 */ materials: (Material | null)[];
        /**
                 * @en Returns the material corresponding to the sequence number
                 * @zh 返回相对应序号的材质
                 * @param {Number} idx - Look for the material list number
                 */ getMaterial(idx: number, inEditor?: boolean): Material | null;
        getSharedMaterial(idx: number): Material | null;
        material: Material | null;
        readonly sharedMaterial: Material | null;
        setMaterial(material: Material | null, index: number, notify?: boolean): void;
        protected _onMaterialModified(index: number, material: Material | null): void;
        protected _onRebuildPSO(index: number, material: Material | null): void;
        protected _clearMaterials(): void;
    }
    export class PhysicsSystem {
        private _world;
        private _paused;
        private _singleStep;
        private _deltaTime;
        setSingleStep(b: boolean): void;
        resume(): void;
        pause(): void;
        update(deltaTime: number): void;
        readonly world: __unexported.cocos_3d_physics_api_PhysicsWorldBase;
    }
    export class CircularPool<T = {}> {
        private _cursor;
        private _data;
        request(): T;
    }
    export class FixedArray<T = {}> {
        private _count;
        private _data;
        _resize(size: number): void;
        readonly length: number;
        readonly data: (T | undefined)[];
        reset(): void;
        push(val: any): void;
        pop(): T | undefined;
        fastRemove(idx: any): void;
        indexOf(val: any): number;
        sort(cmp: any): void;
    }
    export class LinkedArray<T = {}> {
        private _fn;
        private _count;
        private _head;
        private _tail;
        private _pool;
        readonly head: __unexported.cocos_3d_memop_linked_array_INode | null;
        readonly tail: __unexported.cocos_3d_memop_linked_array_INode | null;
        readonly length: number;
        add(): __unexported.cocos_3d_memop_linked_array_INode;
        remove(node: any): void;
        forEach(fn: any, binder: any): void;
    }
    export class Pool<T> {
        private _fn;
        private _idx;
        private _frees;
        alloc(): T;
        free(obj: T): void;
        clear(fn: (obj: T) => void): void;
        private _expand;
    }
    export class RecyclePool<T = any> {
        private _fn;
        private _count;
        private _data;
        readonly length: number;
        readonly data: T[];
        reset(): void;
        resize(size: number): void;
        add(): T;
        removeAt(idx: number): void;
        sort(compare: (a: T, b: T) => number): void;
    }
    var TypedArrayPool: {
        alloc_int8(n: any): Int8Array;
        alloc_uint8(n: any): Uint8Array;
        alloc_int16(n: any): Int16Array;
        alloc_uint16(n: any): Uint16Array;
        alloc_int32(n: any): Int32Array;
        alloc_uint32(n: any): Uint32Array;
        alloc_float32(n: any): Float32Array;
        alloc_float64(n: any): Float64Array;
        free(array: any): void;
        reset(): void;
    };
    export class MeshBuffer {
        batcher: __unexported.cocos_renderer_ui_ui_UI;
        vData: Float32Array | null;
        iData: Uint16Array | null;
        vb: __unexported.cocos_gfx_buffer_GFXBuffer | null;
        ib: __unexported.cocos_gfx_buffer_GFXBuffer | null;
        ia: __unexported.cocos_gfx_input_assembler_GFXInputAssembler | null;
        byteStart: number;
        byteOffset: number;
        indiceStart: number;
        indiceOffset: number;
        vertexStart: number;
        vertexOffset: number;
        dirty: boolean;
        private _vertexFormatBytes;
        private _initVDataCount;
        private _initIDataCount;
        private _outofCallback;
        initialize(attrs: __unexported.cocos_gfx_input_assembler_IGFXAttribute[], outofCallback: ((...args: number[]) => void) | null): void;
        request(vertexCount: number, indiceCount: number): boolean;
        reset(): void;
        destroy(): void;
        uploadData(): void;
        private _reallocBuffer;
        private _reallocVData;
        private _reallocIData;
    }
    var maskAssembler: IAssembler;
    var maskEndAssembler: IAssembler;
    export enum Stage {
        DISABLED,
        CLEAR,
        ENTER_LEVEL,
        ENABLED,
        EXIT_LEVEL
    }
    export class StencilManager {
        static sharedManager: StencilManager | null;
        stage: Stage;
        private _maskStack;
        private _stencilPattern;
        private _defaultPipelineState;
        pushMask(mask: MaskComponent): void;
        clear(): void;
        enterLevel(): void;
        enableMask(): void;
        exitMask(): void;
        handleMaterial(mat: Material): void;
        getWriteMask(): number;
        getExitWriteMask(): number;
        getStencilRef(): number;
        getInvertedRef(): number;
        reset(): void;
        private _changed;
    }
    export interface IAssembler {
    }
    export interface IAssemblerManager {
        getAssembler(component: UIRenderComponent): IAssembler;
    }
    /**
         * !#zh: 作为 UI 根节点，为所有子节点提供视窗四边的位置信息以供对齐，另外提供屏幕适配策略接口，方便从编辑器设置。
         * 注：由于本节点的尺寸会跟随屏幕拉伸，所以 anchorPoint 只支持 (0.5, 0.5)，否则适配不同屏幕时坐标会有偏差。
         *
         * @class Canvas
         * @extends Component
         */ export class CanvasComponent extends Component {
        designResolution: Size;
        /**
                 * !#en TODO
                 * !#zh: 是否优先将设计分辨率高度撑满视图高度。
                 * @property {Boolean} fitHeight
                 * @default false
                 */ fitHeight: boolean;
        /**
                 * !#en TODO
                 * !#zh: 是否优先将设计分辨率宽度撑满视图宽度。
                 * @property {Boolean} fitWidth
                 * @default false
                 */ fitWidth: boolean;
        priority: number;
        readonly visibility: number;
        readonly camera: renderer.Camera | null;
        /**
                 * !#en Current active canvas, the scene should only have one active canvas at the same time.
                 * !#zh 当前激活的画布组件，场景同一时间只能有一个激活的画布。
                 * @property {CanvasComponent} instance
                 * @static
                 */ static instance: CanvasComponent | null;
        static views: never[];
        /**
                 * !#en The desigin resolution for current scene.
                 * !#zh 当前场景设计分辨率。
                 * @property {Size} designResolution
                 * @default new cc.Size(960, 640)
                 */ protected _designResolution: any;
        protected _fitWidth: boolean;
        protected _fitHeight: boolean;
        protected _priority: number;
        protected _thisOnResized: () => void;
        protected _camera: renderer.Camera | null;
        private _pos;
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        alignWithScreen(): void;
        applySettings(): void;
    }
    export class DebugCanvasComponent extends CanvasComponent {
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        alignWithScreen(): void;
        applySettings(): void;
    }
    export class UIComponent extends Component {
        /**
                 * !#en render order, render order according to width, and arrange once under the same level node.
                 * !#zh 渲染先后顺序，按照广度渲染排列，同级节点下进行一次排列
                 */ priority: number;
        /**
                 * !#en find the rendered camera
                 * !#zh 查找被渲染相机
                 */ readonly visibility: number;
        protected _priority: number;
        protected _visibility: number;
        updateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): void;
        postUpdateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): void;
    }
    /**
         * !#en
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
         *
         * !#zh
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
         * @class Button
         * @extends Component
         * @example
         *
         * // Add an event to the button.
         * button.node.on(EventType.TOUCH_START, function (event) {
         *     cc.log("This is a callback after the trigger event");
         * });
         * // You could also add a click event
         * //Note: In this way, you can't get the touch event info, so use it wisely.
         * button.node.on('click', function (button) {
         *    //The event is a custom event, you could get the Button component via first argument
         * })
         *
         */ export class ButtonComponent extends Component {
        /**
                 * !#en
                 * Whether the Button is disabled.
                 * If true, the Button will trigger event and do transition.
                 * !#zh
                 * 按钮事件是否被响应，如果为 false，则按钮将被禁用。
                 * @property {Boolean} interactable
                 * @default true
                 */ interactable: boolean;
        _resizeToTarget: boolean;
        /**
                 * !#en When this flag is true, Button target sprite will turn gray when interactable is false.
                 * !#zh 如果这个标记为 true，当 button 的 interactable 属性为 false 的时候，会使用内置 shader 让 button 的 target 节点的 sprite 组件变灰
                 * @property {Boolean} enableAutoGrayEffect
                 */ /**
                 * !#en Transition type
                 * !#zh 按钮状态改变时过渡方式。
                 * @property {Button.Transition} transition
                 * @default Button.Transition.Node
                 */ transition: __unexported.cocos_3d_ui_components_button_component_Transition;
        /**
                 * !#en Normal state color.
                 * !#zh 普通状态下按钮所显示的颜色。
                 * @property {Color} normalColor
                 */ normalColor: Color;
        /**
                 * !#en Pressed state color
                 * !#zh 按下状态时按钮所显示的颜色。
                 * @property {Color} pressedColor
                 */ pressedColor: Color;
        /**
                 * !#en Hover state color
                 * !#zh 悬停状态下按钮所显示的颜色。
                 * @property {Color} hoverColor
                 */ hoverColor: Color;
        /**
                 * !#en Disabled state color
                 * !#zh 禁用状态下按钮所显示的颜色。
                 * @property {Color} disabledColor
                 */ disabledColor: Color;
        /**
                 * !#en Color and Scale transition duration
                 * !#zh 颜色过渡和缩放过渡时所需时间
                 * @property {Number} duration
                 */ duration: number;
        /**
                 * !#en  When user press the button, the button will zoom to a scale.
                 * The final scale of the button  equals (button original scale * zoomScale)
                 * !#zh 当用户点击按钮后，按钮会缩放到一个值，这个值等于 Button 原始 scale * zoomScale
                 * @property {Number} zoomScale
                 */ zoomScale: number;
        /**
                 * !#en Normal state sprite
                 * !#zh 普通状态下按钮所显示的 Sprite 。
                 * @property {SpriteFrame} normalSprite
                 */ normalSprite: SpriteFrame | null;
        /**
                 * !#en Pressed state sprite
                 * !#zh 按下状态时按钮所显示的 Sprite 。
                 * @property {SpriteFrame} pressedSprite
                 */ pressedSprite: SpriteFrame | null;
        /**
                 * !#en Hover state sprite
                 * !#zh 悬停状态下按钮所显示的 Sprite 。
                 * @property {SpriteFrame} hoverSprite
                 */ hoverSprite: SpriteFrame | null;
        /**
                 * !#en Disabled state sprite
                 * !#zh 禁用状态下按钮所显示的 Sprite 。
                 * @return {SpriteFrame}
                 */ disabledSprite: SpriteFrame | null;
        /**
                 * !#en
                 * Transition target.
                 * When Button state changed:
                 *  If Transition type is Button.Transition.NONE, Button will do nothing
                 *  If Transition type is Button.Transition.COLOR, Button will change target's color
                 *  If Transition type is Button.Transition.SPRITE, Button will change target Sprite's sprite
                 * !#zh
                 * 需要过渡的目标。
                 * 当前按钮状态改变规则：
                 * -如果 Transition type 选择 Button.Transition.NONE，按钮不做任何过渡。
                 * -如果 Transition type 选择 Button.Transition.COLOR，按钮会对目标颜色进行颜色之间的过渡。
                 * -如果 Transition type 选择 Button.Transition.Sprite，按钮会对目标 Sprite 进行 Sprite 之间的过渡。
                 * @property {Node} target
                 */ target: Node | null;
        static Transition: typeof __unexported.cocos_3d_ui_components_button_component_Transition;
        /**
                 * !#en If Button is clicked, it will trigger event's handler
                 * !#zh 按钮的点击事件列表。
                 * @property {ComponentEventHandler[]} clickEvents
                 */ clickEvents: EventHandler[];
        private _interactable;
        private _transition;
        private _normalColor;
        private _hoverColor;
        private _pressColor;
        private _disabledColor;
        private _normalSprite;
        private _hoverSprite;
        private _pressedSprite;
        private _disabledSprite;
        private _duration;
        private _zoomScale;
        private _target;
        private _pressed;
        private _hovered;
        private _fromColor;
        private _toColor;
        private _time;
        private _transitionFinished;
        private _fromScale;
        private _toScale;
        private _originalScale;
        private _sprite;
        private _targetScale;
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        update(dt: number): void;
        protected _resizeNodeToTargetNode(): void;
        private _resetState;
        private _registerEvent;
        private _getTargetSprite;
        private _applyTarget;
        private _onTouchBegan;
        private _onTouchMove;
        private _onTouchEnded;
        private _onTouchCancel;
        private _onMouseMoveIn;
        private _onMouseMoveOut;
        private _updateState;
        private _getButtonState;
        private _updateColorTransition;
        private _updateSpriteTransition;
        private _updateScaleTransition;
        private _zoomUp;
        private _zoomBack;
        private _applyTransition;
    }
    /**
         * !#en cc.EditBox is a component for inputing text, you can use it to gather small amounts of text from users.
         * !#zh EditBox 组件，用于获取用户的输入文本。
         * @class EditBox
         * @extends Component
         */ export class EditBoxComponent extends Component {
        /**
                 * !#en Input string of EditBox.
                 * !#zh 输入框的初始输入内容，如果为空则会显示占位符的文本。
                 * @property {String} string
                 */ string: string;
        /**
                 * !#en The background image of EditBox.
                 * !#zh 输入框的背景图片
                 * @property {SpriteFrame} backgroundImage
                 */ backgroundImage: SpriteFrame | null;
        /**
                 * !#en
                 * The return key type of EditBox.
                 * Note: it is meaningless for web platforms and desktop platforms.
                 * !#zh
                 * 指定移动设备上面回车按钮的样式。
                 * 注意：这个选项对 web 平台与 desktop 平台无效。
                 * @property {EditBox.KeyboardReturnType} returnType
                 * @default KeyboardReturnType.DEFAULT
                 */ returnType: __unexported.cocos_3d_ui_components_editbox_types_KeyboardReturnType;
        /**
                 * !#en Set the input flags that are to be applied to the EditBox.
                 * !#zh 指定输入标志位，可以指定输入方式为密码或者单词首字母大写。
                 * @property {EditBox.InputFlag} inputFlag
                 * @default InputFlag.DEFAULT
                 */ inputFlag: __unexported.cocos_3d_ui_components_editbox_types_InputFlag;
        /**
                 * !#en
                 * Set the input mode of the edit box.
                 * If you pass ANY, it will create a multiline EditBox.
                 * !#zh
                 * 指定输入模式: ANY表示多行输入，其它都是单行输入，移动平台上还可以指定键盘样式。
                 * @property {EditBox.InputMode} inputMode
                 * @default InputMode.ANY
                 */ inputMode: __unexported.cocos_3d_ui_components_editbox_types_InputMode;
        /**
                 * !#en Font size of the input text.
                 * !#zh 输入框文本的字体大小
                 * @property {Number} fontSize
                 */ fontSize: number;
        /**
                 * !#en Change the lineHeight of displayed text.
                 * !#zh 输入框文本的行高。
                 * @property {Number} lineHeight
                 */ lineHeight: number;
        /**
                 * !#en Font color of the input text.
                 * !#zh 输入框文本的颜色。
                 * @property {Color} fontColor
                 */ fontColor: Color;
        /**
                 * !#en The display text of placeholder.
                 * !#zh 输入框占位符的文本内容。
                 * @property {String} placeholder
                 */ placeholder: string;
        /**
                 * !#en The font size of placeholder.
                 * !#zh 输入框占位符的字体大小。
                 * @property {Number} placeholderFontSize
                 */ placeholderFontSize: number;
        /**
                 * !#en The font color of placeholder.
                 * !#zh 输入框占位符的字体颜色。
                 * @property {Color} placeholderFontColor
                 */ placeholderFontColor: Color;
        /**
                 * !#en The maximize input length of EditBox.
                 * - If pass a value less than 0, it won't limit the input number of characters.
                 * - If pass 0, it doesn't allow input any characters.
                 * !#zh 输入框最大允许输入的字符个数。
                 * - 如果值为小于 0 的值，则不会限制输入字符个数。
                 * - 如果值为 0，则不允许用户进行任何输入。
                 * @property {Number} maxLength
                 */ maxLength: number;
        /**
                 * !#en The input is always visible and be on top of the game view (only useful on Web).
                 * !zh 输入框总是可见，并且永远在游戏视图的上面（这个属性只有在 Web 上面修改有意义）
                 * Note: only available on Web at the moment.
                 * @property {Boolean} stayOnTop
                 */ stayOnTop: boolean;
        /**
                 * !#en Set the tabIndex of the DOM input element (only useful on Web).
                 * !#zh 修改 DOM 输入元素的 tabIndex（这个属性只有在 Web 上面修改有意义）。
                 * @property {Number} tabIndex
                 */ tabIndex: number;
        static _EditBoxImpl: typeof __unexported.cocos_3d_ui_components_editbox_edit_box_impl_EditBoxImpl;
        static KeyboardReturnType: typeof __unexported.cocos_3d_ui_components_editbox_types_KeyboardReturnType;
        static InputFlag: typeof __unexported.cocos_3d_ui_components_editbox_types_InputFlag;
        static InputMode: typeof __unexported.cocos_3d_ui_components_editbox_types_InputMode;
        /**
                 * !#en The event handler to be called when EditBox began to edit text.
                 * !#zh 开始编辑文本输入框触发的事件回调。
                 * @property {Component.EventHandler[]} editingDidBegan
                 */ editingDidBegan: EventHandler[];
        /**
                 * !#en The event handler to be called when EditBox text changes.
                 * !#zh 编辑文本输入框时触发的事件回调。
                 * @property {Component.EventHandler[]} textChanged
                 */ textChanged: EventHandler[];
        /**
                 * !#en The event handler to be called when EditBox edit ends.
                 * !#zh 结束编辑文本输入框时触发的事件回调。
                 * @property {Component.EventHandler[]} editingDidEnded
                 */ editingDidEnded: EventHandler[];
        /**
                 * !#en The event handler to be called when return key is pressed. Windows is not supported.
                 * !#zh 当用户按下回车按键时的事件回调，目前不支持 windows 平台
                 * @property {Component.EventHandler[]} editingReturn
                 */ editingReturn: EventHandler[];
        _impl: __unexported.cocos_3d_ui_components_editbox_edit_box_impl_EditBoxImpl | null;
        _textLabel: LabelComponent | null;
        _placeholderLabel: LabelComponent | null;
        _background: SpriteComponent | null;
        private _returnType;
        private _useOriginalSize;
        private _string;
        private _tabIndex;
        private _backgroundImage;
        private _inputFlag;
        private _inputMode;
        private _fontSize;
        private _lineHeight;
        private _maxLength;
        private _fontColor;
        private _placeholder;
        private _placeholderFontSize;
        private _placeholderFontColor;
        private _stayOnTop;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        _init(): void;
        __preload(): void;
        _registerEvent(): void;
        _updateStayOnTop(): void;
        _syncSize(): void;
        _updateLabelPosition(size: any): void;
        _createBackgroundSprite(): void;
        _createLabels(): void;
        _resizeChildNodes(): void;
        _showLabels(): void;
        _hideLabels(): void;
        _updateString(text: any): void;
        _updateLabelStringStyle(text: string, ignorePassword?: boolean): string;
        editBoxEditingDidBegan(): void;
        editBoxEditingDidEnded(): void;
        editBoxTextChanged(text: any): void;
        editBoxEditingReturn(): void;
        _onTouchBegan(event: any): void;
        _onTouchCancel(event: any): void;
        _onTouchEnded(event: any): void;
        /**
                 * !#en Let the EditBox get focus
                 * !#zh 让当前 EditBox 获得焦点
                 * @method setFocus
                 */ setFocus(): void;
        /**
                 * !#en Determine whether EditBox is getting focus or not.
                 * !#zh 判断 EditBox 是否获得了焦点
                 * Note: only available on Web at the moment.
                 * @method isFocused
                 */ isFocused(): boolean;
        update(): void;
    }
    /**
         * !#en
         * The Layout is a container component, use it to arrange child elements easily.<br>
         * Note：<br>
         * 1.Scaling and rotation of child nodes are not considered.<br>
         * 2.After setting the Layout, the results need to be updated until the next frame,
         * unless you manually call {{#crossLink "Layout/updateLayout:method"}}{{/crossLink}}。
         * !#zh
         * Layout 组件相当于一个容器，能自动对它的所有子节点进行统一排版。<br>
         * 注意：<br>
         * 1.不会考虑子节点的缩放和旋转。<br>
         * 2.对 Layout 设置后结果需要到下一帧才会更新，除非你设置完以后手动调用 {{#crossLink "Layout/updateLayout:method"}}{{/crossLink}}。
         * @class Layout
         * @extends Component
         */ export class LayoutComponent extends Component {
        /**
                 * !#en The layout type.
                 * !#zh 布局类型
                 * @property {Layout.Type} type
                 * @default Layout.Type.NONE
                 */ type: __unexported.cocos_3d_ui_components_layout_component_Type;
        /**
                 * !#en
                 * The are three resize modes for Layout.
                 * None, resize Container and resize children.
                 * !#zh 缩放模式
                 * @property {Layout.ResizeMode} resizeMode
                 * @default ResizeMode.NONE
                 */ resizeMode: __unexported.cocos_3d_ui_components_layout_component_ResizeMode;
        /**
                 * !#en The cell size for grid layout.
                 * !#zh 每个格子的大小，只有布局类型为 GRID 的时候才有效。
                 * @property {Size} cellSize
                 * @default cc.size(40, 40)
                 */ cellSize: Size;
        /**
                 * !#en
                 * The start axis for grid layout. If you choose horizontal, then children will layout horizontally at first,
                 * and then break line on demand. Choose vertical if you want to layout vertically at first .
                 * !#zh 起始轴方向类型，可进行水平和垂直布局排列，只有布局类型为 GRID 的时候才有效。
                 * @property {Layout.AxisDirection} startAxis
                 */ startAxis: __unexported.cocos_3d_ui_components_layout_component_AxisDirection;
        /**
                 * !#en The left padding of layout, it only effect the layout in one direction.
                 * !#zh 容器内左边距，只会在一个布局方向上生效。
                 * @property {Number} paddingLeft
                 */ paddingLeft: number;
        /**
                 * !#en The right padding of layout, it only effect the layout in one direction.
                 * !#zh 容器内右边距，只会在一个布局方向上生效。
                 * @property {Number} paddingRight
                 */ paddingRight: number;
        /**
                 * !#en The top padding of layout, it only effect the layout in one direction.
                 * !#zh 容器内上边距，只会在一个布局方向上生效。
                 * @property {Number} paddingTop
                 */ paddingTop: number;
        /**
                 * !#en The bottom padding of layout, it only effect the layout in one direction.
                 * !#zh 容器内下边距，只会在一个布局方向上生效。
                 * @property {Number} paddingBottom
                 */ paddingBottom: number;
        /**
                 * !#en The distance in x-axis between each element in layout.
                 * !#zh 子节点之间的水平间距。
                 * @property {Number} spacingX
                 */ spacingX: number;
        /**
                 * !#en The distance in y-axis between each element in layout.
                 * !#zh 子节点之间的垂直间距。
                 * @property {Number} spacingY
                 */ spacingY: number;
        /**
                 * !#en
                 * Only take effect in Vertical layout mode.
                 * This option changes the start element's positioning.
                 * !#zh 垂直排列子节点的方向。
                 * @property {VerticalDirection} verticalDirection
                 */ verticalDirection: __unexported.cocos_3d_ui_components_layout_component_VerticalDirection;
        /**
                 * !#en
                 * Only take effect in Horizontal layout mode.
                 * This option changes the start element's positioning.
                 * !#zh 水平排列子节点的方向。
                 * @property {Layout.HorizontalDirection} horizontalDirection
                 */ horizontalDirection: __unexported.cocos_3d_ui_components_layout_component_HorizontalDirection;
        /**
                 * !#en The padding of layout, it effects the layout in four direction.
                 * !#zh 容器内边距，该属性会在四个布局方向上生效。
                 * @property {Number} padding
                 */ padding: number;
        /**
                 * !#en Adjust the layout if the children scaled.
                 * !#zh 子节点缩放比例是否影响布局。
                 * @property affectedByScale
                 * @type {Boolean}
                 * @default false
                 */ affectedByScale: boolean;
        static Type: typeof __unexported.cocos_3d_ui_components_layout_component_Type;
        static VerticalDirection: typeof __unexported.cocos_3d_ui_components_layout_component_VerticalDirection;
        static HorizontalDirection: typeof __unexported.cocos_3d_ui_components_layout_component_HorizontalDirection;
        static ResizeMode: typeof __unexported.cocos_3d_ui_components_layout_component_ResizeMode;
        static AxisDirection: typeof __unexported.cocos_3d_ui_components_layout_component_AxisDirection;
        private _layoutDirty;
        private _resizeMode;
        private _N$layoutType;
        private _N$padding;
        private _cellSize;
        private _startAxis;
        private _paddingLeft;
        private _paddingRight;
        private _paddingTop;
        private _paddingBottom;
        private _spacingX;
        private _spacingY;
        private _layoutSize;
        private _verticalDirection;
        private _horizontalDirection;
        private _affectedByScale;
        /**
                 * !#en Perform the layout update
                 * !#zh 立即执行更新布局
                 *
                 * @method updateLayout
                 *
                 * @example
                 * layout.type = cc.Layout.HORIZONTAL;
                 * layout.node.addChild(childNode);
                 * cc.log(childNode.x); // not yet changed
                 * layout.updateLayout();
                 * cc.log(childNode.x); // changed
                 */ updateLayout(): void;
        protected onEnable(): void;
        protected onDisable(): void;
        private _migratePaddingData;
        private _addEventListeners;
        private _removeEventListeners;
        private _addChildrenEventListeners;
        private _removeChildrenEventListeners;
        private _childAdded;
        private _childRemoved;
        private _resized;
        private _doLayoutHorizontally;
        private _doLayoutVertically;
        private _doLayoutBasic;
        private _doLayoutGridAxisHorizontal;
        private _doLayoutGridAxisVertical;
        private _doLayoutGrid;
        private _getHorizontalBaseWidth;
        private _getVerticalBaseHeight;
        private _doLayout;
        private _getUsedScaleValue;
        private _doLayoutDirty;
        private _doScaleDirty;
    }
    /**
         * !#en The Mask Component.
         * !#zh 遮罩组件。
         */ export class MaskComponent extends UIRenderComponent {
        /**
                 * !#en The mask type.
                 * !#zh 遮罩类型。
                 */ type: __unexported.cocos_3d_ui_components_mask_component_MaskType;
        /**
                 * !#en The mask image
                 * !#zh 遮罩所需要的贴图
                 */ /**
                 * !#en
                 * The alpha threshold.(Not supported in Canvas Mode) <br/>
                 * The content is drawn only where the stencil have pixel with alpha greater than the alphaThreshold. <br/>
                 * Should be a float between 0 and 1. <br/>
                 * This default to 0 (so alpha test is disabled).
                 * When it's set to 1, the stencil will discard all pixels, nothing will be shown,
                 * In previous version, it act as if the alpha test is disabled, which is incorrect.
                 * !#zh
                 * Alpha 阈值（不支持 Canvas 模式）<br/>
                 * 只有当模板的像素的 alpha 大于 alphaThreshold 时，才会绘制内容。<br/>
                 * 该数值 0 ~ 1 之间的浮点数，默认值为 0（因此禁用 alpha 测试）
                 * 当被设置为 1 时，会丢弃所有蒙版像素，所以不会显示任何内容，在之前的版本中，设置为 1 等同于 0，这种效果其实是不正确的
                 */ /**
                 * !#en Reverse mask(Not supported in Canvas Mode).
                 * !#zh 反向遮罩（不支持 Canvas 模式）。
                 */ /**
                 * TODO: remove segments, not supported by graphics
                 * !#en The segements for ellipse mask.
                 * !#zh 椭圆遮罩的曲线细分数
                 */ segments: number;
        readonly graphics: GraphicsComponent | null;
        readonly clearGraphics: GraphicsComponent | null;
        readonly dstBlendFactor: __unexported.cocos_gfx_define_GFXBlendFactor;
        readonly srcBlendFactor: __unexported.cocos_gfx_define_GFXBlendFactor;
        readonly color: import("cocos/core/value-types").Color;
        static Type: typeof __unexported.cocos_3d_ui_components_mask_component_MaskType;
        private _type;
        private _segments;
        private _graphics;
        private _clearGraphics;
        onLoad(): void;
        onRestore(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        updateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): boolean;
        postUpdateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): void;
        isHit(cameraPt: Vec2): boolean;
        _resizeNodeToTargetNode(): void;
        protected _nodeStateChange(): void;
        protected _canRender(): boolean;
        protected _flushAssembler(): void;
        private _onTextureLoaded;
        private _applySpriteFrame;
        private _createGraphics;
        private _updateGraphics;
        private _removeGraphics;
        private _activateMaterial;
    }
    /**
         * !#en
         * Visual indicator of progress in some operation.
         * Displays a bar to the user representing how far the operation has progressed.
         * !#zh
         * 进度条组件，可用于显示加载资源时的进度。
         * @class ProgressBar
         * @extends Component
         * @example
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
         *
         */ export class ProgressBarComponent extends Component {
        /**
                 * !#en The targeted Sprite which will be changed progressively.
                 * !#zh 用来显示进度条比例的 Sprite 对象。
                 * @property {Sprite} barSprite
                 */ barSprite: SpriteComponent | null;
        /**
                 * !#en The progress mode, there are two modes supported now: horizontal and vertical.
                 * !#zh 进度条的模式
                 * @property {ProgressBar.Mode} mode
                 */ mode: __unexported.cocos_3d_ui_components_progress_bar_component_Mode;
        /**
                 * !#en The total width or height of the bar sprite.
                 * !#zh 进度条实际的总长度
                 * @property {Number} totalLength - range[[0, Number.MAX_VALUE]]
                 */ totalLength: number;
        /**
                 * !#en The current progress of the bar sprite. The valid value is between 0-1.
                 * !#zh 当前进度值，该数值的区间是 0-1 之间。
                 * @property {Number} progress
                 */ progress: number;
        /**
                 * !#en Whether reverse the progress direction of the bar sprite.
                 * !#zh 进度条是否进行反方向变化。
                 * @property {Boolean} reverse
                 */ reverse: boolean;
        static Mode: typeof __unexported.cocos_3d_ui_components_progress_bar_component_Mode;
        private _barSprite;
        private _mode;
        private _totalLength;
        private _progress;
        private _reverse;
        private _initBarSprite;
        private _updateBarStatus;
    }
    /**
         * !#en The RichText Component.
         * !#zh 富文本组件
         * @class RichText
         * @extends Component
         */ export class RichTextComponent extends UIComponent {
        /**
                 * !#en Content string of RichText.
                 * !#zh 富文本显示的文本内容。
                 * @property {String} string
                 */ string: string;
        /**
                 * !#en Horizontal Alignment of each line in RichText.
                 * !#zh 文本内容的水平对齐方式。
                 * @property {macro.TextAlignment} horizontalAlign
                 */ horizontalAlign: HorizontalTextAlignment;
        /**
                 * !#en Font size of RichText.
                 * !#zh 富文本字体大小。
                 * @property {Number} fontSize
                 */ fontSize: number;
        /**
                 * !#en Custom TTF font of RichText
                 * !#zh  富文本定制字体
                 * @property {cc.TTFFont} font
                 */ font: TTFFont | null;
        /**
                 * !#en The maximize width of the RichText
                 * !#zh 富文本的最大宽度
                 * @property {Number} maxWidth
                 */ maxWidth: number;
        /**
                 * !#en Line Height of RichText.
                 * !#zh 富文本行高。
                 * @property {Number} lineHeight
                 */ lineHeight: number;
        /**
                 * !#en The image atlas for the img tag. For each src value in the img tag, there should be a valid spriteFrame in the image atlas.
                 * !#zh 对于 img 标签里面的 src 属性名称，都需要在 imageAtlas 里面找到一个有效的 spriteFrame，否则 img tag 会判定为无效。
                 * @property {SpriteAtlas} imageAtlas
                 */ imageAtlas: SpriteAtlas | null;
        /**
                 * !#en
                 * Once checked, the RichText will block all input events (mouse and touch) within
                 * the bounding box of the node, preventing the input from penetrating into the underlying node.
                 * !#zh
                 * 选中此选项后，RichText 将阻止节点边界框中的所有输入事件（鼠标和触摸），从而防止输入事件穿透到底层节点。
                 * @property {Boolean} handleTouchEvent
                 * @default true
                 */ handleTouchEvent: boolean;
        static HorizontalAlign: typeof HorizontalTextAlignment;
        static VerticalAlign: typeof VerticalTextAlignment;
        private _lineHeight;
        private _string;
        private _horizontalAlign;
        private _fontSize;
        private _maxWidth;
        private _font;
        private _imageAtlas;
        private _handleTouchEvent;
        private _textArray;
        private _labelSegments;
        private _labelSegmentsCache;
        private _linesWidth;
        private _lineCount;
        private _labelWidth;
        private _labelHeight;
        private _layoutDirty;
        private _lineOffsetX;
        private _updateRichTextStatus;
        onEnable(): void;
        onDisable(): void;
        start(): void;
        onRestore(): void;
        onDestroy(): void;
        private _addEventListeners;
        private _removeEventListeners;
        private _updateLabelSegmentTextAttributes;
        private _createFontLabel;
        private _onTTFLoaded;
        private _measureText;
        private _onTouchEnded;
        private _containsTouchLocation;
        private _resetState;
        private _activateChildren;
        private _addLabelSegment;
        private _updateRichTextWithMaxWidth;
        private _isLastComponentCR;
        private _updateLineInfo;
        private _needsUpdateTextLayout;
        private _addRichTextImageElement;
        private _updateRichText;
        private _getFirstWordLen;
        private _updateRichTextPosition;
        private _convertLiteralColorValue;
        private _applyTextAttribute;
    }
    /**
         * !#en
         * The Scrollbar control allows the user to scroll an image or other view that is too large to see completely
         * !#zh 滚动条组件
         * @class Scrollbar
         * @extends Component
         */ export class ScrollBarComponent extends Component {
        /**
                 * !#en The "handle" part of the scrollbar.
                 * !#zh 作为当前滚动区域位置显示的滑块 Sprite。
                 * @property {Sprite} handle
                 */ handle: SpriteComponent | null;
        /**
                 * !#en The direction of scrollbar.
                 * !#zh ScrollBar 的滚动方向。
                 * @property {Scrollbar.Direction} direction
                 */ direction: __unexported.cocos_3d_ui_components_scroll_bar_component_Direction;
        /**
                 * !#en Whether enable auto hide or not.
                 * !#zh 是否在没有滚动动作时自动隐藏 ScrollBar。
                 * @property {Boolean} enableAutoHide
                 */ enableAutoHide: boolean;
        /**
                 * !#en
                 * The time to hide scrollbar when scroll finished.
                 * Note: This value is only useful when enableAutoHide is true.
                 * !#zh
                 * 没有滚动动作后经过多久会自动隐藏。
                 * 注意：只要当 “enableAutoHide” 为 true 时，才有效。
                 * @property {Number} autoHideTime
                 */ autoHideTime: number;
        static Direction: typeof __unexported.cocos_3d_ui_components_scroll_bar_component_Direction;
        private _scrollView;
        private _handle;
        private _direction;
        private _enableAutoHide;
        private _autoHideTime;
        private _touching;
        private _opacity;
        private _autoHideRemainingTime;
        hide(): void;
        show(): void;
        onScroll(outOfBoundary: Vec3): void;
        setScrollView(scrollView: ScrollViewComponent): void;
        onTouchBegan(): void;
        onTouchEnded(): void;
        protected onEnable(): void;
        protected start(): void;
        protected update(dt: any): void;
        private _convertToScrollViewSpace;
        private _setOpacity;
        private _updateHanlderPosition;
        private _fixupHandlerPosition;
        private _conditionalDisableScrollBar;
        private _calculateLength;
        private _calculatePosition;
        private _updateLength;
        private _processAutoHide;
    }
    /**
         * !#en
         * Layout container for a view hierarchy that can be scrolled by the user,
         * allowing it to be larger than the physical display.
         *
         * !#zh
         * 滚动视图组件
         * @class ScrollView
         * @extends Component
         */ export class ScrollViewComponent extends ViewGroupComponent {
        /**
                 * !#en This is a reference to the UI element to be scrolled.
                 * !#zh 可滚动展示内容的节点。
                 * @property {Node} content
                 */ content: Node | null;
        /**
                 * !#en The horizontal scrollbar reference.
                 * !#zh 水平滚动的 ScrollBar。
                 * @property {Scrollbar} horizontalScrollBar
                 */ horizontalScrollBar: ScrollBarComponent | null;
        /**
                 * !#en The vertical scrollbar reference.
                 * !#zh 垂直滚动的 ScrollBar。
                 * @property {Scrollbar} verticalScrollBar
                 */ verticalScrollBar: ScrollBarComponent | null;
        readonly view: Node | null;
        static EventType: typeof __unexported.cocos_3d_ui_components_scroll_view_component_EventType;
        /**
                 * !#en Enable horizontal scroll.
                 * !#zh 是否开启水平滚动。
                 * @property {Boolean} horizontal
                 */ horizontal: boolean;
        /**
                 * !#en Enable vertical scroll.
                 * !#zh 是否开启垂直滚动。
                 * @property {Boolean} vertical
                 */ vertical: boolean;
        /**
                 * !#en When inertia is set, the content will continue to move when touch ended.
                 * !#zh 是否开启滚动惯性。
                 * @property {Boolean} inertia
                 */ inertia: boolean;
        /**
                 * !#en
                 * It determines how quickly the content stop moving. A value of 1 will stop the movement immediately.
                 * A value of 0 will never stop the movement until it reaches to the boundary of scrollview.
                 * !#zh
                 * 开启惯性后，在用户停止触摸后滚动多快停止，0表示永不停止，1表示立刻停止。
                 * @property {Number} brake
                 */ brake: number;
        /**
                 * !#en When elastic is set, the content will be bounce back when move out of boundary.
                 * !#zh 是否允许滚动内容超过边界，并在停止触摸后回弹。
                 */ elastic: boolean;
        /**
                 * !#en The elapse time of bouncing back. A value of 0 will bounce back immediately.
                 * !#zh 回弹持续的时间，0 表示将立即反弹。
                 * @property {Number} bounceDuration
                 */ bounceDuration: number;
        /**
                 * !#en Scrollview events callback
                 * !#zh 滚动视图的事件回调函数
                 * @property {Component.EventHandler[]} scrollEvents
                 */ scrollEvents: EventHandler[];
        /**
                 * !#en If cancelInnerEvents is set to true, the scroll behavior will cancel touch events on inner content nodes
                 * It's set to true by default.
                 * !#zh 如果这个属性被设置为 true，那么滚动行为会取消子节点上注册的触摸事件，默认被设置为 true。
                 * 注意，子节点上的 touchstart 事件仍然会触发，触点移动距离非常短的情况下 touchmove 和 touchend 也不会受影响。
                 * @property {Boolean} cancelInnerEvents
                 */ cancelInnerEvents: boolean;
        private _content;
        private _horizontalScrollBar;
        private _verticalScrollBar;
        private _topBoundary;
        private _bottomBoundary;
        private _leftBoundary;
        private _rightBoundary;
        private _touchMoveDisplacements;
        private _touchMoveTimeDeltas;
        private _touchMovePreviousTimestamp;
        private _touchMoved;
        private _autoScrolling;
        private _autoScrollAttenuate;
        private _autoScrollStartPosition;
        private _autoScrollTargetDelta;
        private _autoScrollTotalTime;
        private _autoScrollAccumulatedTime;
        private _autoScrollCurrentlyOutOfBoundary;
        private _autoScrollBraking;
        private _autoScrollBrakingStartPosition;
        private _outOfBoundaryAmount;
        private _outOfBoundaryAmountDirty;
        private _stopMouseWheel;
        private _mouseWheelEventElapsedTime;
        private _isScrollEndedWithThresholdEventFired;
        private _scrollEventEmitMask;
        private _isBouncing;
        private _scrolling;
        private _contentPos;
        private _deltaPos;
        /**
                 * !#en Scroll the content to the bottom boundary of ScrollView.
                 * !#zh 视图内容将在规定时间内滚动到视图底部。
                 * @method scrollToBottom
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the bottom boundary immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to the bottom of the view.
                 * scrollView.scrollToBottom(0.1);
                 */ scrollToBottom(timeInSecond: number, attenuated: boolean): void;
        /**
                 * !#en Scroll the content to the top boundary of ScrollView.
                 * !#zh 视图内容将在规定时间内滚动到视图顶部。
                 * @method scrollToTop
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the top boundary immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to the top of the view.
                 * scrollView.scrollToTop(0.1);
                 */ scrollToTop(timeInSecond: number, attenuated: boolean): void;
        /**
                 * !#en Scroll the content to the left boundary of ScrollView.
                 * !#zh 视图内容将在规定时间内滚动到视图左边。
                 * @method scrollToLeft
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the left boundary immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to the left of the view.
                 * scrollView.scrollToLeft(0.1);
                 */ scrollToLeft(timeInSecond: number, attenuated: boolean): void;
        /**
                 * !#en Scroll the content to the right boundary of ScrollView.
                 * !#zh 视图内容将在规定时间内滚动到视图右边。
                 * @method scrollToRight
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the right boundary immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to the right of the view.
                 * scrollView.scrollToRight(0.1);
                 */ scrollToRight(timeInSecond: any, attenuated: any): void;
        /**
                 * !#en Scroll the content to the top left boundary of ScrollView.
                 * !#zh 视图内容将在规定时间内滚动到视图左上角。
                 * @method scrollToTopLeft
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the top left boundary immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to the upper left corner of the view.
                 * scrollView.scrollToTopLeft(0.1);
                 */ scrollToTopLeft(timeInSecond: any, attenuated: any): void;
        /**
                 * !#en Scroll the content to the top right boundary of ScrollView.
                 * !#zh 视图内容将在规定时间内滚动到视图右上角。
                 * @method scrollToTopRight
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the top right boundary immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to the top right corner of the view.
                 * scrollView.scrollToTopRight(0.1);
                 */ scrollToTopRight(timeInSecond: any, attenuated: any): void;
        /**
                 * !#en Scroll the content to the bottom left boundary of ScrollView.
                 * !#zh 视图内容将在规定时间内滚动到视图左下角。
                 * @method scrollToBottomLeft
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the bottom left boundary immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to the lower left corner of the view.
                 * scrollView.scrollToBottomLeft(0.1);
                 */ scrollToBottomLeft(timeInSecond: any, attenuated: any): void;
        /**
                 * !#en Scroll the content to the bottom right boundary of ScrollView.
                 * !#zh 视图内容将在规定时间内滚动到视图右下角。
                 * @method scrollToBottomRight
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the bottom right boundary immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to the lower right corner of the view.
                 * scrollView.scrollToBottomRight(0.1);
                 */ scrollToBottomRight(timeInSecond: any, attenuated: any): void;
        /**
                 * !#en Scroll with an offset related to the ScrollView's top left origin, if timeInSecond is omitted, then it will jump to the
                 *       specific offset immediately.
                 * !#zh 视图内容在规定时间内将滚动到 ScrollView 相对左上角原点的偏移位置, 如果 timeInSecond参数不传，则立即滚动到指定偏移位置。
                 * @method scrollToOffset
                 * @param {Vec2} offset - A Vec2, the value of which each axis between 0 and maxScrollOffset
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the specific offset of ScrollView immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to middle position in 0.1 second in x-axis
                 * let maxScrollOffset = this.getMaxScrollOffset();
                 * scrollView.scrollToOffset(new Vec3(maxScrollOffset.x / 2, 0, 0), 0.1);
                 */ scrollToOffset(offset: any, timeInSecond: any, attenuated: any): void;
        /**
                 * !#en  Get the positive offset value corresponds to the content's top left boundary.
                 * !#zh  获取滚动视图相对于左上角原点的当前滚动偏移
                 * @method getScrollOffset
                 * @return {Vec2}  - A Vec2 value indicate the current scroll offset.
                 */ getScrollOffset(): Vec3;
        /**
                 * !#en Get the maximize available  scroll offset
                 * !#zh 获取滚动视图最大可以滚动的偏移量
                 * @method getMaxScrollOffset
                 * @return {Vec2} - A Vec2 value indicate the maximize scroll offset in x and y axis.
                 */ getMaxScrollOffset(): Vec3;
        /**
                 * !#en Scroll the content to the horizontal percent position of ScrollView.
                 * !#zh 视图内容在规定时间内将滚动到 ScrollView 水平方向的百分比位置上。
                 * @method scrollToPercentHorizontal
                 * @param {Number} percent - A value between 0 and 1.
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the horizontal percent position of ScrollView immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Scroll to middle position.
                 * scrollView.scrollToBottomRight(0.5, 0.1);
                 */ scrollToPercentHorizontal(percent: any, timeInSecond: any, attenuated: any): void;
        /**
                 * !#en Scroll the content to the percent position of ScrollView in any direction.
                 * !#zh 视图内容在规定时间内进行垂直方向和水平方向的滚动，并且滚动到指定百分比位置上。
                 * @method scrollTo
                 * @param {Vec2} anchor - A point which will be clamp between new Vec2(0,0) and new Vec2(1,1).
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the percent position of ScrollView immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * @example
                 * // Vertical scroll to the bottom of the view.
                 * scrollView.scrollTo(new Vec2(0, 1), 0.1);
                 *
                 * // Horizontal scroll to view right.
                 * scrollView.scrollTo(new Vec2(1, 0), 0.1);
                 */ scrollTo(anchor: Vec2, timeInSecond: number, attenuated?: boolean): void;
        /**
                 * !#en Scroll the content to the vertical percent position of ScrollView.
                 * !#zh 视图内容在规定时间内滚动到 ScrollView 垂直方向的百分比位置上。
                 * @method scrollToPercentVertical
                 * @param {Number} percent - A value between 0 and 1.
                 * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
                 * the content will jump to the vertical percent position of ScrollView immediately.
                 * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
                 * // Scroll to middle position.
                 * scrollView.scrollToPercentVertical(0.5, 0.1);
                 */ scrollToPercentVertical(percent: number, timeInSecond: number, attenuated?: boolean): void;
        /**
                 * !#en  Stop auto scroll immediately
                 * !#zh  停止自动滚动, 调用此 API 可以让 Scrollview 立即停止滚动
                 * @method stopAutoScroll
                 */ stopAutoScroll(): void;
        /**
                 * !#en Modify the content position.
                 * !#zh 设置当前视图内容的坐标点。
                 * @method setContentPosition
                 * @param {Vec2} position - The position in content's parent space.
                 */ setContentPosition(position: Vec3): void;
        /**
                 * !#en Query the content's position in its parent space.
                 * !#zh 获取当前视图内容的坐标点。
                 * @method getContentPosition
                 * @returns {Position} - The content's position in its parent space.
                 */ getContentPosition(): Vec3;
        /**
                 * !#en Query whether the user is currently dragging the ScrollView to scroll it
                 * !#zh 用户是否在拖拽当前滚动视图
                 * @method isScrolling
                 * @returns {Boolean} - Whether the user is currently dragging the ScrollView to scroll it
                 */ isScrolling(): boolean;
        /**
                 * !#en Query whether the ScrollView is currently scrolling because of a bounceback or inertia slowdown.
                 * !#zh 当前滚动视图是否在惯性滚动
                 * @method isAutoScrolling
                 * @returns {Boolean} - Whether the ScrollView is currently scrolling because of a bounceback or inertia slowdown.
                 */ isAutoScrolling(): boolean;
        _registerEvent(): void;
        _unregisterEvent(): void;
        _onMouseWheel(event: any, captureListeners: any): void;
        _calculateBoundary(): void;
        _hasNestedViewGroup(event?: EventTouch, captureListeners?: any): boolean | undefined;
        getScrollEndedEventTiming(): number;
        _startInertiaScroll(touchMoveVelocity: Vec3): void;
        _calculateAttenuatedFactor(distance: number): number;
        _startAttenuatingAutoScroll(deltaMove: Vec3, initialVelocity: Vec3): void;
        _calculateAutoScrollTimeByInitalSpeed(initalSpeed: any): number;
        _startAutoScroll(deltaMove: Vec3, timeInSecond: number, attenuated?: boolean): void;
        _calculateTouchMoveVelocity(): Vec3;
        _flattenVectorByDirection(vector: Vec3): Vec3;
        _moveContent(deltaMove: Vec3, canStartBounceBack?: boolean): void;
        _getContentLeftBoundary(): number;
        _getContentRightBoundary(): number;
        _getContentTopBoundary(): number;
        _getContentBottomBoundary(): number;
        _getHowMuchOutOfBoundary(addition?: Vec3): Vec3;
        _updateScrollBar(outOfBoundary: Vec3): void;
        _onScrollBarTouchBegan(): void;
        _onScrollBarTouchEnded(): void;
        _dispatchEvent(event: any): void;
        _adjustContentOutOfBoundary(): void;
        start(): void;
        _hideScrollbar(): void;
        _showScrollbar(): void;
        onDisable(): void;
        onEnable(): void;
        update(dt: any): void;
        private _stopPropagationIfTargetIsMe;
        private _onTouchBegan;
        private _onTouchMoved;
        private _onTouchEnded;
        private _onTouchCancelled;
        private _processDeltaMove;
        private _handleMoveLogic;
        private _scrollChildren;
        private _handlePressLogic;
        private _clampDelta;
        private _gatherTouchMove;
        private _startBounceBackIfNeeded;
        private _processInertiaScroll;
        private _handleReleaseLogic;
        private _isOutOfBoundary;
        private _isNecessaryAutoScrollBrake;
        private _processAutoScrolling;
        private _checkMouseWheel;
        private _calculateMovePercentDelta;
        private _moveContentToTopLeft;
    }
    /**
         * !#en The Slider Control
         * !#zh 滑动器组件
         * @class Slider
         * @extends Component
         */ export class SliderComponent extends Component {
        /**
                 * !#en The "handle" part of the slider
                 * !#zh 滑动器滑块按钮部件
                 * @property {Button} handle
                 */ handle: SpriteComponent | null;
        /**
                 * !#en The slider direction
                 * !#zh 滑动器方向
                 * @property {Slider.Direction} direction
                 */ direction: number;
        /**
                 * !#en The current progress of the slider. The valid value is between 0-1
                 * !#zh 当前进度值，该数值的区间是 0-1 之间
                 * @property {Number} progress
                 */ progress: number;
        static Direction: typeof __unexported.cocos_3d_ui_components_slider_component_Direction;
        /**
                 * !#en The slider events callback
                 * !#zh 滑动器组件事件回调函数
                 * @property {ComponentEventHandler[]} slideEvents
                 */ slideEvents: EventHandler[];
        private _handle;
        private _direction;
        private _progress;
        private _offset;
        private _dragging;
        private _touchHandle;
        private _handlelocalPos;
        private _touchPos;
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        private _onHandleDragStart;
        private _onTouchBegan;
        private _onTouchMoved;
        private _onTouchEnded;
        private _onTouchCancelled;
        private _handleSliderLogic;
        private _emitSlideEvent;
        private _updateProgress;
        private _updateHandlePosition;
    }
    export class SpriteComponent extends UIRenderComponent {
        /**
                 * !#en The atlas of the sprite.
                 * !#zh 精灵的图集
                 * @return {SpriteAtlas}
                 */ spriteAtlas: SpriteAtlas | null;
        /**
                 * !#en The sprite frame of the sprite.
                 * !#zh 精灵的精灵帧
                 * @return {SpriteFrame}
                 */ spriteFrame: SpriteFrame | null;
        /**
                 * !#en The sprite render type.
                 * !#zh 精灵渲染类型
                 * @property type
                 * @type {SpriteType}
                 * @example
                 * sprite.type = cc.Sprite.Type.SIMPLE;
                 */ type: __unexported.cocos_3d_ui_components_sprite_component_SpriteType;
        /**
                 * !#en
                 * The fill type, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
                 * !#zh
                 * 精灵填充类型，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
                 * @property fillType
                 * @type {FillType}
                 * @example
                 * sprite.fillType = SpriteComponent.FillType.HORIZONTAL;
                 */ fillType: __unexported.cocos_3d_ui_components_sprite_component_FillType;
        /**
                 * !#en
                 * The fill Center, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
                 * !#zh
                 * 填充中心点，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
                 * @property fillCenter
                 * @type {Vec2}
                 * @example
                 * sprite.fillCenter = new cc.v2(0, 0);
                 */ fillCenter: Vec2;
        /**
                 * !#en
                 * The fill Start, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
                 * !#zh
                 * 填充起始点，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
                 * @property fillStart
                 * @type {Number}
                 * @example
                 * // -1 To 1 between the numbers
                 * sprite.fillStart = 0.5;
                 */ fillStart: number;
        /**
                 * !#en
                 * The fill Range, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
                 * !#zh
                 * 填充范围，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
                 * @property fillRange
                 * @type {Number}
                 * @example
                 * // -1 To 1 between the numbers
                 * sprite.fillRange = 1;
                 */ fillRange: number;
        /**
                 * !#en specify the frame is trimmed or not.
                 * !#zh 是否使用裁剪模式
                 * @property trim
                 * @type {Boolean}
                 * @example
                 * sprite.trim = true;
                 */ trim: boolean;
        /**
                 * !#en specify the size tracing mode.
                 * !#zh 精灵尺寸调整模式
                 * @property sizeMode
                 * @type {Sprite.SizeMode}
                 * @example
                 * sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                 */ sizeMode: __unexported.cocos_3d_ui_components_sprite_component_SizeMode;
        static FillType: typeof __unexported.cocos_3d_ui_components_sprite_component_FillType;
        static Type: typeof __unexported.cocos_3d_ui_components_sprite_component_SpriteType;
        static SizeMode: typeof __unexported.cocos_3d_ui_components_sprite_component_SizeMode;
        private _spriteFrame;
        private _type;
        private _fillType;
        private _sizeMode;
        private _fillCenter;
        private _fillStart;
        private _fillRange;
        private _isTrimmedMode;
        private _atlas;
        __preload(): void;
        onEnable(): void;
        updateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): boolean;
        onDestroy(): void;
        _applySpriteSize(): void;
        _resized(): void;
        protected _canRender(): boolean;
        protected _flushAssembler(): void;
        private _activateMaterial;
        private _applyAtlas;
        private _applySpriteFrame;
    }
    /**
         * !#en The toggle component is a CheckBox, when it used together with a ToggleGroup, it
         * could be treated as a RadioButton.
         * !#zh Toggle 是一个 CheckBox，当它和 ToggleGroup 一起使用的时候，可以变成 RadioButton。
         * @class Toggle
         * @extends Button
         */ export class ToggleComponent extends ButtonComponent {
        /**
                 * !#en When this value is true, the check mark component will be enabled, otherwise
                 * the check mark component will be disabled.
                 * !#zh 如果这个设置为 true，则 check mark 组件会处于 enabled 状态，否则处于 disabled 状态。
                 * @property {Boolean} isChecked
                 */ isChecked: boolean;
        /**
                 * !#en The toggle group which the toggle belongs to, when it is null, the toggle is a CheckBox.
                 * Otherwise, the toggle is a RadioButton.
                 * !#zh Toggle 所属的 ToggleGroup，这个属性是可选的。如果这个属性为 null，则 Toggle 是一个 CheckBox，
                 * 否则，Toggle 是一个 RadioButton。
                 * @property {ToggleGroup} toggleGroup
                 */ toggleGroup: ToggleContainerComponent | null;
        /**
                 * !#en The image used for the checkmark.
                 * !#zh Toggle 处于选中状态时显示的图片
                 * @property {Sprite} checkMark
                 */ checkMark: SpriteComponent | null;
        _resizeToTarget: boolean;
        readonly _toggleContainer: null;
        /**
                 * !#en If Toggle is clicked, it will trigger event's handler
                 * !#zh Toggle 按钮的点击事件列表。
                 * @property {ComponentEventHandler[]} checkEvents
                 */ checkEvents: EventHandler[];
        private _isChecked;
        private _toggleGroup;
        private _checkMark;
        onEnable(): void;
        onDisable(): void;
        _updateCheckMark(): void;
        _registerToggleEvent(): void;
        _unregisterToggleEvent(): void;
        toggle(): void;
        /**
                 * !#en Make the toggle button checked.
                 * !#zh 使 toggle 按钮处于选中状态
                 * @method check
                 */ check(): void;
        /**
                 * !#en Make the toggle button unchecked.
                 * !#zh 使 toggle 按钮处于未选中状态
                 * @method uncheck
                 */ uncheck(): void;
        private _emitToggleEvents;
    }
    /**
         * !#en ToggleGroup is not a visiable UI component but a way to modify the behavior of a set of Toggles.
         * Toggles that belong to the same group could only have one of them to be switched on at a time.
         * !#zh ToggleGroup 不是一个可见的 UI 组件，它可以用来修改一组 Toggle  组件的行为。当一组 Toggle 属于同一个 ToggleGroup 的时候，
         * 任何时候只能有一个 Toggle 处于选中状态。
         * @class ToggleGroup
         * @extends Component
         */ export class ToggleContainerComponent extends Component {
        checkEvents: EventHandler[];
        private _allowSwitchOff;
        private _toggleItems;
        /**
                 * !#en If this setting is true, a toggle could be switched off and on when pressed.
                 * If it is false, it will make sure there is always only one toggle could be switched on
                 * and the already switched on toggle can't be switched off.
                 * !#zh 如果这个设置为 true， 那么 toggle 按钮在被点击的时候可以反复地被选中和未选中。
                 * @property {Boolean} allowSwitchOff
                 */ allowSwitchOff: boolean;
        /**
                 * !#en Read only property, return the toggle items array reference managed by toggleGroup.
                 * !#zh 只读属性，返回 toggleGroup 管理的 toggle 数组引用
                 * @property {Array} toggleItems
                 */ readonly toggleItems: ToggleComponent[];
        start(): void;
        updateToggles(toggle: ToggleComponent): void;
        addToggle(toggle: ToggleComponent): void;
        removeToggle(toggle: ToggleComponent): void;
        private _allowOnlyOneToggleChecked;
        private _makeAtLeastOneToggleChecked;
    }
    export class UIModelComponent extends UIComponent {
        readonly modelComponent: RenderableComponent | null;
        private _modelComponent;
        onLoad(): void;
        onEnable(): void;
        updateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): boolean;
        update(): void;
        private _fitUIRenderQueue;
    }
    /**
         * !#en
         * Base class for components which supports rendering features.
         * !#zh
         * 所有支持渲染的组件的基类
         *
         * @class UIRenderComponent
         * @extends Component
         */ export class UIRenderComponent extends UIComponent {
        /**
                 * !#en specify the source Blend Factor, this will generate a custom material object
                 * please pay attention to the memory cost.
                 * !#zh 指定原图的混合模式，这会克隆一个新的材质对象，注意这带来的
                 * @property srcBlendFactor
                 * sprite.srcBlendFactor = macro.BlendFactor.ONE;
                 */ srcBlendFactor: __unexported.cocos_gfx_define_GFXBlendFactor;
        /**
                 * !#en specify the destination Blend Factor.
                 * !#zh 指定目标的混合模式
                 * @property dstBlendFactor
                 * @type {macro.BlendFactor}
                 * @example
                 * sprite.dstBlendFactor = GFXBlendFactor.ONE;
                 */ dstBlendFactor: __unexported.cocos_gfx_define_GFXBlendFactor;
        /**
                 * !#en render color
                 * !#zh 渲染颜色
                 * @property color
                 */ color: Color;
        /**
                 * !#en render material
                 * !#zh 渲染共用材质
                 * @property material
                 */ sharedMaterial: Material | null;
        readonly material: Material | null;
        readonly renderData: __unexported.cocos_renderer_ui_renderData_RenderData | null;
        static BlendState: typeof __unexported.cocos_gfx_define_GFXBlendFactor;
        static Assembler: IAssemblerManager | null;
        static PostAssembler: IAssemblerManager | null;
        protected _srcBlendFactor: __unexported.cocos_gfx_define_GFXBlendFactor;
        protected _dstBlendFactor: __unexported.cocos_gfx_define_GFXBlendFactor;
        protected _color: Color;
        protected _sharedMaterial: Material | null;
        protected _assembler: IAssembler | null;
        protected _postAssembler: IAssembler | null;
        protected _renderDataPoolID: number;
        protected _renderData: __unexported.cocos_renderer_ui_renderData_RenderData | null;
        protected _renderDataDirty: boolean;
        protected _renderPermit: boolean;
        protected _material: Material | null;
        protected _instanceMaterialType: __unexported.cocos_3d_ui_components_ui_render_component_InstanceMaterialType;
        protected _blendTemplate: {
            blendState: {
                targets: {
                    blendSrc: __unexported.cocos_gfx_define_GFXBlendFactor;
                    blendDst: __unexported.cocos_gfx_define_GFXBlendFactor;
                }[];
            };
            depthStencilState: {};
            rasterizerState: {};
        };
        __preload(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        markForUpdateRenderData(enable?: boolean): void;
        requestRenderData(): __unexported.cocos_renderer_ui_renderData_RenderData;
        destroyRenderData(): void;
        updateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): boolean;
        protected _checkAndUpdateRenderData(): void;
        protected _canRender(): boolean;
        protected _updateColor(): void;
        protected _updateMaterial(material: Material | null): void;
        protected _updateBlendFunc(): void;
        protected _nodeStateChange(): void;
        protected _instanceMaterial(): void;
        protected _flushAssembler?(): void;
    }
    export class UITransformComponent extends Component {
        contentSize: Size;
        width: number;
        height: number;
        anchorPoint: Vec2;
        anchorX: number;
        anchorY: number;
        static EventType: typeof EventType;
        _contentSize: Size;
        _anchorPoint: Vec2;
        __preload(): void;
        onDestroy(): void;
        /**
                 * !#en
                 * Sets the untransformed size of the node.<br/>
                 * The contentSize remains the same no matter the node is scaled or rotated.<br/>
                 * All nodes has a size. Layer and Scene has the same size of the screen.
                 * !#zh 设置节点原始大小，不受该节点是否被缩放或者旋转的影响。
                 * @method setContentSize
                 * @param {Size|Number} size - The untransformed size of the node or The untransformed size's width of the node.
                 * @param {Number} [height] - The untransformed size's height of the node.
                 * @example
                 * node.setContentSize(cc.size(100, 100));
                 * node.setContentSize(100, 100);
                 */ setContentSize(size: Size | number, height?: number): void;
        /**
                 * !#en
                 * Sets the anchor point in percent. <br/>
                 * anchor point is the point around which all transformations and positioning manipulations take place. <br/>
                 * It's like a pin in the node where it is "attached" to its parent. <br/>
                 * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.<br/>
                 * But you can use values higher than (1,1) and lower than (0,0) too.<br/>
                 * The default anchor point is (0.5,0.5), so it starts at the center of the node.
                 * !#zh
                 * 设置锚点的百分比。<br/>
                 * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br/>
                 * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br/>
                 * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br/>
                 * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br/>
                 * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
                 * @method setAnchorPoint
                 * @param {Vec2|Number} point - The anchor point of node or The x axis anchor of node.
                 * @param {Number} [y] - The y axis anchor of node.
                 * @example
                 * node.setAnchorPoint(cc.v2(1, 1));
                 * node.setAnchorPoint(1, 1);
                 */ setAnchorPoint(point: Vec2 | number, y?: number): void;
        isHit(point: Vec2, listener?: __unexported.cocos_core_platform_event_manager_event_listener_EventListener): any;
        /**
                 * !#en
                 * Converts a UI Point to UI Node (Local) Space coordinates in which the anchor point is the origin position.
                 * Conversion of non-UI nodes to UI Node (Local) Space coordinate system, please go cc.pipelineUtils.ConvertWorldToUISpaceAR.
                 * !#zh
                 * 将一个 UI 节点转换到另一个 UI 节点 (局部) 空间坐标系，这个坐标系以锚点为原点。
                 * 非 UI 节点转换到 UI 节点(局部) 空间坐标系，请走 cc.pipelineUtils.ConvertWorldToUISpaceAR
                 * @method convertToNodeSpaceAR
                 * @param {Vec3} worldPoint
                 * @param {Vec3} out
                 * @return {Vec3}
                 * @example
                 * var newVec2 = node.convertToNodeSpaceAR(cc.v2(100, 100));
                 */ convertToNodeSpaceAR(worldPoint: Vec3, out?: Vec3): Vec3;
        /**
                 * !#en
                 * Converts a Point in node coordinates to world space coordinates.
                 * !#zh
                 * 将当前节点坐标系下的一个点转换到世界坐标系。
                 * @method convertToWorldSpaceAR
                 * @param {Vec2} nodePoint
                 * @return {Vec2}
                 * @example
                 * var newVec2 = node.convertToWorldSpaceAR(cc.v2(100, 100));
                 */ convertToWorldSpaceAR(nodePoint: Vec3, out?: Vec3): Vec3;
        /**
                 * !#en
                 * Returns a "local" axis aligned bounding box of the node. <br/>
                 * The returned box is relative only to its parent.
                 * !#zh 返回父节坐标系下的轴向对齐的包围盒。
                 * @method getBoundingBox
                 * @return {Rect} The calculated bounding box of the node
                 * @example
                 * var boundingBox = node.getBoundingBox();
                 */ getBoundingBox(): Rect;
        /**
                 * !#en
                 * Returns a "world" axis aligned bounding box of the node.<br/>
                 * The bounding box contains self and active children's world bounding box.
                 * !#zh
                 * 返回节点在世界坐标系下的对齐轴向的包围盒（AABB）。<br/>
                 * 该边框包含自身和已激活的子节点的世界边框。
                 * @method getBoundingBoxToWorld
                 * @return {Rect}
                 * @example
                 * var newRect = node.getBoundingBoxToWorld();
                 */ getBoundingBoxToWorld(): Rect;
        getBoundingBoxTo(parentMat: Mat4): Rect;
        private _getVisibility;
    }
    export class ViewGroupComponent extends Component {
    }
    /**
         * !#en cc.WebView is a component for display web pages in the game
         * !#zh WebView 组件，用于在游戏中显示网页
         * @class WebView
         * @extends Component
         */ export class WebviewComponent extends UIComponent {
        /**
                 * !#en A given URL to be loaded by the WebView, it should have a http or https prefix.
                 * !#zh 指定 WebView 加载的网址，它应该是一个 http 或者 https 开头的字符串
                 * @property {String} url
                 */ url: string;
        static EventType: typeof __unexported.cocos_3d_ui_components_webview_webview_impl_WebViewEventType;
        /**
                 * !#en The webview's event callback , it will be triggered when certain webview event occurs.
                 * !#zh WebView 的回调事件，当网页加载过程中，加载完成后或者加载出错时都会回调此函数
                 * @property {Component.EventHandler[]} webviewLoadedEvents
                 */ webviewEvents: EventHandler[];
        private _url;
        private _impl;
        onRestore(): void;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        update(dt: any): void;
        /**
                 * !#en
                 * Set javascript interface scheme (see also setOnJSCallback). <br/>
                 * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br/>
                 * Please refer to the official documentation for more details.
                 * !#zh
                 * 设置 JavaScript 接口方案（与 'setOnJSCallback' 配套使用）。<br/>
                 * 注意：只支持 Android 和 iOS ，Web 端用法请前往官方文档查看。<br/>
                 * 详情请参阅官方文档
                 * @method setJavascriptInterfaceScheme
                 * @param {String} scheme
                 */ setJavascriptInterfaceScheme(scheme: string): void;
        /**
                 * !#en
                 * This callback called when load URL that start with javascript
                 * interface scheme (see also setJavascriptInterfaceScheme). <br/>
                 * Note: Supports only on the Android and iOS. For HTML5, please refer to the official documentation.<br/>
                 * Please refer to the official documentation for more details.
                 * !#zh
                 * 当加载 URL 以 JavaScript 接口方案开始时调用这个回调函数。<br/>
                 * 注意：只支持 Android 和 iOS，Web 端用法请前往官方文档查看。
                 * 详情请参阅官方文档
                 * @method setOnJSCallback
                 * @param {Function} callback
                 */ setOnJSCallback(callback: Function): void;
        /**
                 * !#en
                 * Evaluates JavaScript in the context of the currently displayed page. <br/>
                 * Please refer to the official document for more details <br/>
                 * Note: Cross domain issues need to be resolved by yourself <br/>
                 * !#zh
                 * 执行 WebView 内部页面脚本（详情请参阅官方文档） <br/>
                 * 注意：需要自行解决跨域问题
                 * @method evaluateJS
                 * @param {String} str
                 */ evaluateJS(str: string): void;
        private _onWebViewLoaded;
        private _onWebViewLoading;
        private _onWebViewLoadError;
    }
    /**
         * !#en
         * Stores and manipulate the anchoring based on its parent.
         * Widget are used for GUI but can also be used for other things.
         * Widget will adjust current node's position and size automatically, but the results after adjustment can not be obtained until the next frame
         * unless you call {{#crossLink "Widget/updateAlignment:method"}}{{/crossLink}} manually.
         * !#zh
         * Widget 组件，用于设置和适配其相对于父节点的边距，Widget 通常被用于 UI 界面，也可以用于其他地方。
         * Widget 会自动调整当前节点的坐标和宽高，不过目前调整后的结果要到下一帧才能在脚本里获取到，除非你先手动调用 {{#crossLink "Widget/updateAlignment:method"}}{{/crossLink}}。
         *
         * @class Widget
         * @extends Component
         */ export class WidgetComponent extends Component {
        /**
                 * !#en Specifies an alignment target that can only be one of the parent nodes of the current node.
                 * The default value is null, and when null, indicates the current parent.
                 * !#zh 指定一个对齐目标，只能是当前节点的其中一个父节点，默认为空，为空时表示当前父节点。
                 * @property {Node} target
                 */ target: Node | null;
        /**
                 * !#en Whether to align the top.
                 * !#zh 是否对齐上边。
                 * @property isAlignTop
                 * @type {Boolean}
                 * @default false
                 */ isAlignTop: boolean;
        /**
                 * !#en Whether to align the bottom.
                 * !#zh 是否对齐下边。
                 * @property isAlignBottom
                 * @type {Boolean}
                 * @default false
                 */ isAlignBottom: boolean;
        /**
                 * !#en Whether to align the left.
                 * !#zh 是否对齐左边
                 * @property isAlignLeft
                 * @type {Boolean}
                 * @default false
                 */ isAlignLeft: boolean;
        /**
                 * !#en Whether to align the right.
                 * !#zh 是否对齐右边。
                 * @property isAlignRight
                 * @type {Boolean}
                 * @default false
                 */ isAlignRight: boolean;
        /**
                 * !#en
                 * Vertically aligns the midpoint, This will open the other vertical alignment options cancel.
                 * !#zh
                 * 是否垂直方向对齐中点，开启此项会将垂直方向其他对齐选项取消。
                 * @property isAlignVerticalCenter
                 * @type {Boolean}
                 * @default false
                 */ isAlignVerticalCenter: boolean;
        /**
                 * !#en
                 * Horizontal aligns the midpoint. This will open the other horizontal alignment options canceled.
                 * !#zh
                 * 是否水平方向对齐中点，开启此选项会将水平方向其他对齐选项取消。
                 * @property isAlignHorizontalCenter
                 * @type {Boolean}
                 * @default false
                 */ isAlignHorizontalCenter: boolean;
        /**
                 * !#en
                 * Whether the stretched horizontally, when enable the left and right alignment will be stretched horizontally,
                 * the width setting is invalid (read only).
                 * !#zh
                 * 当前是否水平拉伸。当同时启用左右对齐时，节点将会被水平拉伸，此时节点的宽度只读。
                 * @property isStretchWidth
                 * @type {Boolean}
                 * @default false
                 * @readOnly
                 */ readonly isStretchWidth: boolean;
        /**
                 * !#en
                 * Whether the stretched vertically, when enable the left and right alignment will be stretched vertically,
                 * then height setting is invalid (read only)
                 * !#zh
                 * 当前是否垂直拉伸。当同时启用上下对齐时，节点将会被垂直拉伸，此时节点的高度只读。
                 * @property isStretchHeight
                 * @type {Boolean}
                 * @default false
                 * @readOnly
                 */ readonly isStretchHeight: boolean;
        /**
                 * !#en
                 * The margins between the top of this node and the top of parent node,
                 * the value can be negative, Only available in 'isAlignTop' open.
                 * !#zh
                 * 本节点顶边和父节点顶边的距离，可填写负值，只有在 isAlignTop 开启时才有作用。
                 * @property top
                 * @type {Number}
                 * @default 0
                 */ top: number;
        /**
                 * !#en
                 * The margins between the bottom of this node and the bottom of parent node,
                 * the value can be negative, Only available in 'isAlignBottom' open.
                 * !#zh
                 * 本节点底边和父节点底边的距离，可填写负值，只有在 isAlignBottom 开启时才有作用。
                 * @property bottom
                 * @type {Number}
                 * @default 0
                 */ bottom: number;
        /**
                 * !#en
                 * The margins between the left of this node and the left of parent node,
                 * the value can be negative, Only available in 'isAlignLeft' open.
                 * !#zh
                 * 本节点左边和父节点左边的距离，可填写负值，只有在 isAlignLeft 开启时才有作用。
                 * @property left
                 * @type {Number}
                 * @default 0
                 */ left: number;
        /**
                 * !#en
                 * The margins between the right of this node and the right of parent node,
                 * the value can be negative, Only available in 'isAlignRight' open.
                 * !#zh
                 * 本节点右边和父节点右边的距离，可填写负值，只有在 isAlignRight 开启时才有作用。
                 * @property right
                 * @type {Number}
                 * @default 0
                 */ right: number;
        /**
                 * !#en
                 * Horizontal aligns the midpoint offset value,
                 * the value can be negative, Only available in 'isAlignHorizontalCenter' open.
                 * !#zh 水平居中的偏移值，可填写负值，只有在 isAlignHorizontalCenter 开启时才有作用。
                 * @property horizontalCenter
                 * @type {Number}
                 * @default 0
                 */ horizontalCenter: number;
        /**
                 * !#en
                 * Vertical aligns the midpoint offset value,
                 * the value can be negative, Only available in 'isAlignVerticalCenter' open.
                 * !#zh 垂直居中的偏移值，可填写负值，只有在 isAlignVerticalCenter 开启时才有作用。
                 * @property verticalCenter
                 * @type {Number}
                 * @default 0
                 */ verticalCenter: number;
        /**
                 * !#en
                 * If true, top is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's height.
                 * !#zh
                 * 如果为 true，"top" 将会以像素作为边距，否则将会以相对父物体高度的百分比（0 到 1）作为边距。
                 * @property isAbsoluteTop
                 * @type {Boolean}
                 * @default true
                 */ isAbsoluteTop: boolean;
        /**
                 * !#en
                 * If true, bottom is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's height.
                 * !#zh
                 * 如果为 true，"bottom" 将会以像素作为边距，否则将会以相对父物体高度的百分比（0 到 1）作为边距。
                 * @property isAbsoluteBottom
                 * @type {Boolean}
                 * @default true
                 */ isAbsoluteBottom: boolean;
        /**
                 * !#en
                 * If true, left is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's width.
                 * !#zh
                 * 如果为 true，"left" 将会以像素作为边距，否则将会以相对父物体宽度的百分比（0 到 1）作为边距。
                 * @property isAbsoluteLeft
                 * @type {Boolean}
                 * @default true
                 */ isAbsoluteLeft: boolean;
        /**
                 * !#en
                 * If true, right is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's width.
                 * !#zh
                 * 如果为 true，"right" 将会以像素作为边距，否则将会以相对父物体宽度的百分比（0 到 1）作为边距。
                 * @property isAbsoluteRight
                 * @type {Boolean}
                 * @default true
                 */ isAbsoluteRight: boolean;
        /**
                 * !#en Specifies the alignment mode of the Widget, which determines when the widget should refresh.
                 * !#zh 指定 Widget 的对齐模式，用于决定 Widget 应该何时刷新。
                 * @property {Widget.AlignMode} alignMode
                 * @example
                 * widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
                 */ alignMode: __unexported.cocos_3d_ui_components_widget_component_AlignMode;
        /**
                 * !#en If true, horizontalCenter is pixel margin, otherwise is percentage (0 - 1) margin.
                 * !#zh 如果为 true，"horizontalCenter" 将会以像素作为偏移值，反之为百分比（0 到 1）。
                 * @property isAbsoluteHorizontalCenter
                 * @type {Boolean}
                 * @default true
                 */ isAbsoluteHorizontalCenter: boolean;
        /**
                 * !#en If true, verticalCenter is pixel margin, otherwise is percentage (0 - 1) margin.
                 * !#zh 如果为 true，"verticalCenter" 将会以像素作为偏移值，反之为百分比（0 到 1）。
                 * @property isAbsoluteVerticalCenter
                 * @type {Boolean}
                 * @default true
                 */ isAbsoluteVerticalCenter: boolean;
        /**
                 * !#zh: 对齐开关，由 AlignFlags 组成
                 * @property _alignFlags
                 * @type {Number}
                 * @default 0
                 * @private
                 */ alignFlags: number;
        static AlignMode: typeof __unexported.cocos_3d_ui_components_widget_component_AlignMode;
        private _alignFlags;
        private _target;
        private _left;
        private _right;
        private _top;
        private _bottom;
        private _horizontalCenter;
        private _verticalCenter;
        private _isAbsLeft;
        private _isAbsRight;
        private _isAbsTop;
        private _isAbsBottom;
        private _isAbsHorizontalCenter;
        private _isAbsVerticalCenter;
        private _originalWidth;
        private _originalHeight;
        private _alignMode;
        /**
                 * !#en
                 * Immediately perform the widget alignment. You need to manually call this method only if
                 * you need to get the latest results after the alignment before the end of current frame.
                 * !#zh
                 * 立刻执行 widget 对齐操作。这个接口一般不需要手工调用。
                 * 只有当你需要在当前帧结束前获得 widget 对齐后的最新结果时才需要手动调用这个方法。
                 *
                 * @method updateAlignment
                 *
                 * @example
                 * widget.top = 10;       // change top margin
                 * cc.log(widget.node.y); // not yet changed
                 * widget.updateAlignment();
                 * cc.log(widget.node.y); // changed
                 */ updateAlignment(): void;
        protected onLoad(): void;
        protected onEnable(): void;
        protected onDisable(): void;
        private _setAlign;
    }
    export class LabelOutlineComponent extends Component {
        private _color;
        private _width;
        /**
                 * !#en Change the outline color
                 * !#zh 改变描边的颜色
                 * @property color
                 * @type {Color}
                 * @example
                 * outline.color = new cc.Color(0.5, 0.3, 0.7, 1.0);;
                 */ color: Color;
        /**
                 * !#en Change the outline width
                 * !#zh 改变描边的宽度
                 * @property width
                 * @type {Number}
                 * @example
                 * outline.width = 3;
                 */ width: number;
        private _updateRenderData;
    }
    /**
         * @class Graphics
         * @extends Component
         */ export class GraphicsComponent extends UIRenderComponent {
        /**
                 * !#en
                 * Current line width.
                 * !#zh
                 * 当前线条宽度
                 * @property {Number} lineWidth
                 * @default 1
                 */ lineWidth: number;
        /**
                 * !#en
                 * lineJoin determines how two connecting segments (of lines, arcs or curves) with non-zero lengths in a shape are joined together.
                 * !#zh
                 * lineJoin 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性。
                 * @property {Graphics.LineJoin} lineJoin
                 * @default LineJoin.MITER
                 */ lineJoin: __unexported.cocos_3d_ui_assembler_graphics_types_LineJoin;
        /**
                 * !#en
                 * lineCap determines how the end points of every line are drawn.
                 * !#zh
                 * lineCap 指定如何绘制每一条线段末端。
                 * @property {Graphics.LineCap} lineCap
                 * @default LineCap.BUTT
                 */ lineCap: __unexported.cocos_3d_ui_assembler_graphics_types_LineCap;
        /**
                 * !#en
                 * stroke color
                 * !#zh
                 * 线段颜色
                 * @property {Color} strokeColor
                 * @default Color.BLACK
                 */ strokeColor: Color;
        /**
                 * !#en
                 * fill color
                 * !#zh
                 * 填充颜色
                 * @property {Color} fillColor
                 * @default Color.WHITE
                 */ fillColor: Color;
        /**
                 * !#en
                 * Sets the miter limit ratio
                 * !#zh
                 * 设置斜接面限制比例
                 * @property {Number} miterLimit
                 * @default 10
                 */ miterLimit: number;
        readonly color: Color;
        static LineJoin: typeof __unexported.cocos_3d_ui_assembler_graphics_types_LineJoin;
        static LineCap: typeof __unexported.cocos_3d_ui_assembler_graphics_types_LineCap;
        impl: __unexported.cocos_3d_ui_assembler_graphics_webgl_impl_Impl | null;
        private _lineWidth;
        private _strokeColor;
        private _lineJoin;
        private _lineCap;
        private _fillColor;
        private _miterLimit;
        onRestore(): void;
        __preload(): void;
        onEnable(): void;
        onDestroy(): void;
        _activateMaterial(): void;
        /**
                 * !#en Move path start point to (x,y).
                 * !#zh 移动路径起点到坐标(x, y)
                 * @method moveTo
                 * @param {Number} [x] The x axis of the coordinate for the end point.
                 * @param {Number} [y] The y axis of the coordinate for the end point.
                 */ moveTo(x: number, y: number): void;
        /**
                 * !#en Adds a straight line to the path
                 * !#zh 绘制直线路径
                 * @method lineTo
                 * @param {Number} [x] The x axis of the coordinate for the end point.
                 * @param {Number} [y] The y axis of the coordinate for the end point.
                 */ lineTo(x: number, y: number): void;
        /**
                 * !#en Adds a cubic Bézier curve to the path
                 * !#zh 绘制三次贝赛尔曲线路径
                 * @method bezierCurveTo
                 * @param {Number} [c1x] The x axis of the coordinate for the first control point.
                 * @param {Number} [c1y] The y axis of the coordinate for first control point.
                 * @param {Number} [c2x] The x axis of the coordinate for the second control point.
                 * @param {Number} [c2y] The y axis of the coordinate for the second control point.
                 * @param {Number} [x] The x axis of the coordinate for the end point.
                 * @param {Number} [y] The y axis of the coordinate for the end point.
                 */ bezierCurveTo(c1x: number, c1y: number, c2x: number, c2y: number, x: number, y: number): void;
        /**
                 * !#en Adds a quadratic Bézier curve to the path
                 * !#zh 绘制二次贝赛尔曲线路径
                 * @method quadraticCurveTo
                 * @param {Number} [cx] The x axis of the coordinate for the control point.
                 * @param {Number} [cy] The y axis of the coordinate for the control point.
                 * @param {Number} [x] The x axis of the coordinate for the end point.
                 * @param {Number} [y] The y axis of the coordinate for the end point.
                 */ quadraticCurveTo(cx: number, cy: number, x: number, y: number): void;
        /**
                 * !#en Adds an arc to the path which is centered at (cx, cy) position with radius r starting at startAngle
                 * and ending at endAngle going in the given direction by counterclockwise (defaulting to false).
                 * !#zh 绘制圆弧路径。圆弧路径的圆心在 (cx, cy) 位置，半径为 r ，根据 counterclockwise （默认为false）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
                 * @method arc
                 * @param {Number} [cx] The x axis of the coordinate for the center point.
                 * @param {Number} [cy] The y axis of the coordinate for the center point.
                 * @param {Number} [r] The arc's radius.
                 * @param {Number} [startAngle] The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
                 * @param {Number} [endAngle] The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
                 * @param {Boolean} [counterclockwise] An optional Boolean which, if true, causes the arc to be drawn counter-clockwise between the two angles.
                 * By default it is drawn clockwise.
                 */ arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, counterclockwise: boolean): void;
        /**
                 * !#en Adds an ellipse to the path.
                 * !#zh 绘制椭圆路径。
                 * @method ellipse
                 * @param {Number} [cx] The x axis of the coordinate for the center point.
                 * @param {Number} [cy] The y axis of the coordinate for the center point.
                 * @param {Number} [rx] The ellipse's x-axis radius.
                 * @param {Number} [ry] The ellipse's y-axis radius.
                 */ ellipse(cx: number, cy: number, rx: number, ry: number): void;
        /**
                 * !#en Adds an circle to the path.
                 * !#zh 绘制圆形路径。
                 * @method circle
                 * @param {Number} [cx] The x axis of the coordinate for the center point.
                 * @param {Number} [cy] The y axis of the coordinate for the center point.
                 * @param {Number} [r] The circle's radius.
                 */ circle(cx: number, cy: number, r: number): void;
        /**
                 * !#en Adds an rectangle to the path.
                 * !#zh 绘制矩形路径。
                 * @method rect
                 * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
                 * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
                 * @param {Number} [w] The rectangle's width.
                 * @param {Number} [h] The rectangle's height.
                 */ rect(x: number, y: number, w: number, h: number): void;
        /**
                 * !#en Adds an round corner rectangle to the path.
                 * !#zh 绘制圆角矩形路径。
                 * @method roundRect
                 * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
                 * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
                 * @param {Number} [w] The rectangles width.
                 * @param {Number} [h] The rectangle's height.
                 * @param {Number} [r] The radius of the rectangle.
                 */ roundRect(x: number, y: number, w: number, h: number, r: number): void;
        /**
                 * !#en Draws a filled rectangle.
                 * !#zh 绘制填充矩形。
                 * @method fillRect
                 * @param {Number} [x] The x axis of the coordinate for the rectangle starting point.
                 * @param {Number} [y] The y axis of the coordinate for the rectangle starting point.
                 * @param {Number} [w] The rectangle's width.
                 * @param {Number} [h] The rectangle's height.
                 */ fillRect(x: any, y: any, w: any, h: any): void;
        /**
                 * !#en Erasing any previously drawn content.
                 * !#zh 擦除之前绘制的所有内容的方法。
                 * @method clear
                 * @param {Boolean} [clean] Whether to clean the graphics inner cache.
                 */ clear(): void;
        /**
                 * !#en Causes the point of the pen to move back to the start of the current path. It tries to add a straight line from the current point to the start.
                 * !#zh 将笔点返回到当前路径起始点的。它尝试从当前点到起始点绘制一条直线。
                 * @method close
                 */ close(): void;
        /**
                 * !#en Strokes the current or given path with the current stroke style.
                 * !#zh 根据当前的画线样式，绘制当前或已经存在的路径。
                 * @method stroke
                 */ stroke(): void;
        /**
                 * !#en Fills the current or given path with the current fill style.
                 * !#zh 根据当前的画线样式，填充当前或已经存在的路径。
                 * @method fill
                 */ fill(): void;
        updateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): boolean;
        helpInstanceMaterial(): void;
        protected _flushAssembler(): void;
    }
    var widgetManager: {
        isAligning: boolean;
        _nodesOrderDirty: boolean;
        _activeWidgetsIterator: __unexported.cocos_core_utils_mutable_forward_iterator_default<WidgetComponent>;
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
        updateOffsetsToStayPut(widget: WidgetComponent, e?: __unexported.cocos_3d_ui_components_widget_component_AlignFlags | undefined): void;
        updateAlignment: typeof __unexported.cocos_3d_ui_components_widget_manager_updateAlignment;
        AlignMode: typeof __unexported.cocos_3d_ui_components_widget_component_AlignMode;
        AlignFlags: typeof __unexported.cocos_3d_ui_components_widget_component_AlignFlags;
    };
    /**
         * !#en Enum for vertical text alignment.
         * !#zh 文本横向对齐类型
         * @enum Label.HorizontalTextAlignment
         */ export enum HorizontalTextAlignment {
        LEFT,
        CENTER,
        RIGHT
    }
    /**
         * !#en Enum for vertical text alignment.
         * !#zh 文本垂直对齐类型
         * @enum Label.VerticalTextAlignment
         */ export enum VerticalTextAlignment {
        TOP,
        CENTER,
        BOTTOM
    }
    /**
         * !#en Enum for Overflow.
         * !#zh Overflow 类型
         * @enum Label.Overflow
         */ /**
         * !#en NONE.
         * !#zh 不做任何限制。
         * @property {Number} NONE
         */ /**
         * !#en In CLAMP mode, when label content goes out of the bounding box, it will be clipped.
         * !#zh CLAMP 模式中，当文本内容超出边界框时，多余的会被截断。
         * @property {Number} CLAMP
         */ /**
         * !#en In SHRINK mode, the font size will change dynamically to adapt the content size.
         * !#zh SHRINK 模式，字体大小会动态变化，以适应内容大小。
         * @property {Number} SHRINK
         */ /**
         * !#en In RESIZE_HEIGHT mode, you can only change the width of label and the height is changed automatically.
         * !#zh 在 RESIZE_HEIGHT 模式下，只能更改文本的宽度，高度是自动改变的。
         * @property {Number} RESIZE_HEIGHT
         */ export enum Overflow {
        NONE,
        CLAMP,
        SHRINK,
        RESIZE_HEIGHT
    }
    /**
         * !#en Do not do any caching.
         * !#zh 不做任何缓存。
         * @property {Number} NONE
         */ /**
         * !#en In BITMAP mode, cache the label as a static image and add it to the dynamic atlas for batch rendering,
         * and can batching with Sprites using broken images.
         * !#zh BITMAP 模式，将 label 缓存成静态图像并加入到动态图集，以便进行批次合并，可与使用碎图的 Sprite 进行合批（注：动态图集在 Chrome 以及微信小游戏暂时关闭，该功能无效）。
         * @property {Number} BITMAP
         */ /**
         * !#en In CHAR mode, split text into characters and cache characters into a dynamic atlas which the size of 2048*2048.
         * !#zh CHAR 模式，将文本拆分为字符，并将字符缓存到一张单独的大小为 2048*2048 的图集中进行重复使用，不再使用动态图集（注：当图集满时将不再进行缓存，暂时不支持 SHRINK 自适应文本尺寸（后续完善））。
         * @property {Number} CHAR
         */ enum CacheMode {
        NONE,
        BITMAP,
        CHAR
    }
    /**
         * !#en Enum for font type.
         * !#zh Type 类型
         * @enum Label.Type
         */ /**
         * !#en The TTF font type.
         * !#zh TTF字体
         * @property {Number} TTF
         */ /**
         * !#en The bitmap font type.
         * !#zh 位图字体
         * @property {Number} BMFont
         */ /**
         * !#en The system font type.
         * !#zh 系统字体
         * @property {Number} SystemFont
         */ /**
         * !#en The Label Component.
         * !#zh 文字标签组件
         * @class Label
         * @extends UIRenderComponent
         */ export class LabelComponent extends UIRenderComponent {
        /**
                 * !#en Content string of label.
                 * !#zh 标签显示的文本内容。
                 * @property {String} string
                 */ string: string;
        /**
                 * !#en Horizontal Alignment of label.
                 * !#zh 文本内容的水平对齐方式。
                 * @property {Label.HorizontalAlign} horizontalAlign
                 */ horizontalAlign: HorizontalTextAlignment;
        /**
                 * !#en Vertical Alignment of label.
                 * !#zh 文本内容的垂直对齐方式。
                 * @property {Label.VerticalAlign} VerticalTextAlignment
                 */ verticalAlign: VerticalTextAlignment;
        /**
                 * !#en The actual rendering font size in shrink mode
                 * !#zh SHRINK 模式下面文本实际渲染的字体大小
                 * @property {Number} actualFontSize
                 */ actualFontSize: number;
        /**
                 * !#en Font size of label.
                 * !#zh 文本字体大小。
                 * @property {Number} fontSize
                 */ fontSize: number;
        /**
                 * !#en Font family of label, only take effect when useSystemFont property is true.
                 * !#zh 文本字体名称, 只在 useSystemFont 属性为 true 的时候生效。
                 * @property {String} fontFamily
                 */ fontFamily: string;
        /**
                 * !#en Line Height of label.
                 * !#zh 文本行高。
                 * @property {Number} lineHeight
                 */ lineHeight: number;
        /**
                 * !#en Overflow of label.
                 * !#zh 文字显示超出范围时的处理方式。
                 * @property {Overflow} overflow
                 */ overflow: Overflow;
        /**
                 * !#en Whether auto wrap label when string width is large than label width.
                 * !#zh 是否自动换行。
                 * @property {Boolean} enableWrapText
                 */ enableWrapText: boolean;
        /**
                 * !#en The font of label.
                 * !#zh 文本字体。
                 * @property {Font} font
                 */ font: Font | null;
        /**
                 * !#en Whether use system font name or not.
                 * !#zh 是否使用系统字体。
                 * @property {Boolean} isSystemFontUsed
                 */ useSystemFont: boolean;
        /**
                 * !#en The cache mode of label. This mode only supports system fonts.
                 * !#zh 文本缓存模式, 该模式只支持系统字体。
                 * @property {Label.CacheMode} cacheMode
                 */ cacheMode: CacheMode;
        readonly spriteFrame: SpriteFrame | __unexported.cocos_3d_ui_assembler_label_letter_font_LetterRenderTexture | null;
        /**
                 * !#en Whether the font is bold or not.
                 * !#zh 字体是否加粗。
                 * @property {Boolean} isBold
                 */ isBold: boolean;
        /**
                 * !#en Whether the font is tilted or not.
                 * !#zh 字体是否倾斜。
                 * @property {Boolean} isItalic
                 */ isItalic: boolean;
        /**
                 * !#en Whether the font is underlined.
                 * !#zh 字体是否加下划线。
                 * @property {Boolean} isUnderline
                 */ isUnderline: boolean;
        readonly assemblerData: __unexported.cocos_3d_ui_assembler_label_font_utils_ISharedLabelData | null;
        fontAtlas: __unexported.cocos_3d_ui_assembler_label_bmfontUtils_FontAtlas | null;
        spacingX: number;
        readonly _bmFontOriginalSize: number;
        static HorizontalAlign: typeof HorizontalTextAlignment;
        static VerticalAlign: typeof VerticalTextAlignment;
        static Overflow: typeof Overflow;
        static CacheMode: typeof CacheMode;
        static CanvasPool: __unexported.cocos_3d_ui_assembler_label_font_utils_CanvasPool;
        private _useOriginalSize;
        private _string;
        private _horizontalAlign;
        private _verticalAlign;
        private _actualFontSize;
        private _fontSize;
        private _fontFamily;
        private _lineHeight;
        private _overflow;
        private _enableWrapText;
        private _font;
        private _isSystemFontUsed;
        private _spacingX;
        private _isItalic;
        private _isBold;
        private _isUnderline;
        private _cacheMode;
        private _N$file;
        private _texture;
        private _ttfTexture;
        private _userDefinedFont;
        private _assemblerData;
        private _fontAtlas;
        private _letterTexture;
        onEnable(): void;
        onDisable(): void;
        onDestroy(): void;
        updateRenderData(force?: boolean): void;
        updateAssembler(render: __unexported.cocos_renderer_ui_ui_UI): boolean;
        protected _updateColor(): void;
        protected _canRender(): boolean;
        protected _flushAssembler(): void;
        private _checkStringEmpty;
        private _flushMaterial;
        private _applyFontTexture;
    }
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
         ****************************************************************************/ type Constructor<T = {}> = new (...args: any[]) => T;
    interface IPoolHandlerComponent extends Component {
        unuse(): void;
        reuse(...args: any[]): void;
    }
    /**
         * !#en
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
         * !#zh
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
         */ export class NodePool {
        /**
                 * !#en The pool handler component, it could be the class name or the constructor.
                 * !#zh 缓冲池处理组件，用于节点的回收和复用逻辑，这个属性可以是组件类名或组件的构造函数。
                 */ poolHandlerComp?: Constructor<IPoolHandlerComponent> | string;
        private _pool;
        /**
                 * !#en The current available size in the pool
                 * !#zh 获取当前缓冲池的可用对象数量
                 */ size(): number;
        /**
                 * !#en Destroy all cached nodes in the pool
                 * !#zh 销毁对象池中缓存的所有节点
                 */ clear(): void;
        /**
                 * !#en Put a new Node into the pool.
                 * It will automatically remove the node from its parent without cleanup.
                 * It will also invoke unuse method of the poolHandlerComp if exist.
                 * !#zh 向缓冲池中存入一个不再需要的节点对象。
                 * 这个函数会自动将目标节点从父节点上移除，但是不会进行 cleanup 操作。
                 * 这个函数会调用 poolHandlerComp 的 unuse 函数，如果组件和函数都存在的话。
                 * @example
                 *   let myNode = cc.instantiate(this.template);
                 *   this.myPool.put(myNode);
                 */ put(obj: Node): void;
        /**
                 * !#en Get a obj from pool, if no available object in pool, null will be returned.
                 * This function will invoke the reuse function of poolHandlerComp if exist.
                 * !#zh 获取对象池中的对象，如果对象池没有可用对象，则返回空。
                 * 这个函数会调用 poolHandlerComp 的 reuse 函数，如果组件和函数都存在的话。
                 * @param args - !#en Params to pass to 'reuse' method in poolHandlerComp !#zh 向 poolHandlerComp 中的 'reuse' 函数传递的参数
                 * @example
                 *   let newNode = this.myPool.get();
                 */ get(...args: any[]): Node | null;
    }
    namespace __unexported {
        export enum cocos_gfx_define_GFXBufferUsageBit {
            NONE,
            TRANSFER_SRC,
            TRANSFER_DST,
            INDEX,
            VERTEX,
            UNIFORM,
            STORAGE,
            INDIRECT
        }
        export type cocos_gfx_define_GFXBufferUsage = cocos_gfx_define_GFXBufferUsageBit;
        export enum cocos_gfx_define_GFXMemoryUsageBit {
            NONE,
            DEVICE,
            HOST
        }
        export type cocos_gfx_define_GFXMemoryUsage = cocos_gfx_define_GFXMemoryUsageBit;
        export enum cocos_gfx_device_GFXAPI {
            UNKNOWN,
            WEBGL,
            WEBGL2
        }
        export enum cocos_gfx_define_GFXQueueType {
            GRAPHICS,
            COMPUTE,
            TRANSFER
        }
        export interface cocos_gfx_queue_IGFXQueueInfo {
            type: cocos_gfx_define_GFXQueueType;
        }
        export enum cocos_gfx_define_GFXCommandBufferType {
            PRIMARY,
            SECONDARY
        }
        export interface cocos_gfx_command_allocator_IGFXCommandAllocatorInfo {
        }
        export enum cocos_gfx_define_GFXObjectType {
            UNKNOWN,
            BUFFER,
            TEXTURE,
            TEXTURE_VIEW,
            RENDER_PASS,
            FRAMEBUFFER,
            SAMPLER,
            SHADER,
            PIPELINE_LAYOUT,
            PIPELINE_STATE,
            BINDING_LAYOUT,
            INPUT_ASSEMBLER,
            COMMAND_ALLOCATOR,
            COMMAND_BUFFER,
            QUEUE,
            WINDOW
        }
        export enum cocos_gfx_define_GFXStatus {
            UNREADY,
            FAILED,
            SUCCESS
        }
        export class cocos_gfx_define_GFXObject {
            readonly gfxType: cocos_gfx_define_GFXObjectType;
            readonly status: cocos_gfx_define_GFXStatus;
            protected _gfxType: cocos_gfx_define_GFXObjectType;
            protected _status: cocos_gfx_define_GFXStatus;
        }
        export abstract class cocos_gfx_command_allocator_GFXCommandAllocator extends cocos_gfx_define_GFXObject {
            protected _device: cocos_gfx_device_GFXDevice;
            abstract initialize(info: cocos_gfx_command_allocator_IGFXCommandAllocatorInfo): boolean;
            abstract destroy(): any;
        }
        export interface cocos_gfx_command_buffer_IGFXCommandBufferInfo {
            allocator: cocos_gfx_command_allocator_GFXCommandAllocator;
            type: cocos_gfx_define_GFXCommandBufferType;
        }
        export enum cocos_gfx_define_GFXFormat {
            UNKNOWN,
            A8,
            L8,
            LA8,
            R8,
            R8SN,
            R8UI,
            R8I,
            R16F,
            R16UI,
            R16I,
            R32F,
            R32UI,
            R32I,
            RG8,
            RG8SN,
            RG8UI,
            RG8I,
            RG16F,
            RG16UI,
            RG16I,
            RG32F,
            RG32UI,
            RG32I,
            RGB8,
            SRGB8,
            RGB8SN,
            RGB8UI,
            RGB8I,
            RGB16F,
            RGB16UI,
            RGB16I,
            RGB32F,
            RGB32UI,
            RGB32I,
            RGBA8,
            SRGB8_A8,
            RGBA8SN,
            RGBA8UI,
            RGBA8I,
            RGBA16F,
            RGBA16UI,
            RGBA16I,
            RGBA32F,
            RGBA32UI,
            RGBA32I,
            R5G6B5,
            R11G11B10F,
            RGB5A1,
            RGBA4,
            RGB10A2,
            RGB10A2UI,
            RGB9E5,
            D16,
            D16S8,
            D24,
            D24S8,
            D32F,
            D32F_S8,
            BC1,
            BC1_ALPHA,
            BC1_SRGB,
            BC1_SRGB_ALPHA,
            BC2,
            BC2_SRGB,
            BC3,
            BC3_SRGB,
            BC4,
            BC4_SNORM,
            BC5,
            BC5_SNORM,
            BC6H_UF16,
            BC6H_SF16,
            BC7,
            BC7_SRGB,
            ETC_RGB8,
            ETC2_RGB8,
            ETC2_SRGB8,
            ETC2_RGB8_A1,
            ETC2_SRGB8_A1,
            ETC2_RGBA8,
            ETC2_SRGB8_A8,
            EAC_R11,
            EAC_R11SN,
            EAC_RG11,
            EAC_RG11SN,
            PVRTC_RGB2,
            PVRTC_RGBA2,
            PVRTC_RGB4,
            PVRTC_RGBA4,
            PVRTC2_2BPP,
            PVRTC2_4BPP
        }
        export enum cocos_gfx_define_GFXLoadOp {
            LOAD,
            CLEAR,
            DISCARD
        }
        export enum cocos_gfx_define_GFXStoreOp {
            STORE,
            DISCARD
        }
        export enum cocos_gfx_define_GFXTextureLayout {
            UNDEFINED,
            GENERAL,
            COLOR_ATTACHMENT_OPTIMAL,
            DEPTH_STENCIL_ATTACHMENT_OPTIMAL,
            DEPTH_STENCIL_READONLY_OPTIMAL,
            SHADER_READONLY_OPTIMAL,
            TRANSFER_SRC_OPTIMAL,
            TRANSFER_DST_OPTIMAL,
            PREINITIALIZED,
            PRESENT_SRC
        }
        export class cocos_gfx_render_pass_GFXColorAttachment {
            format: cocos_gfx_define_GFXFormat;
            loadOp: cocos_gfx_define_GFXLoadOp;
            storeOp: cocos_gfx_define_GFXStoreOp;
            sampleCount: number;
            beginLayout: cocos_gfx_define_GFXTextureLayout;
            endLayout: cocos_gfx_define_GFXTextureLayout;
        }
        export class cocos_gfx_render_pass_GFXDepthStencilAttachment {
            format: cocos_gfx_define_GFXFormat;
            depthLoadOp: cocos_gfx_define_GFXLoadOp;
            depthStoreOp: cocos_gfx_define_GFXStoreOp;
            stencilLoadOp: cocos_gfx_define_GFXLoadOp;
            stencilStoreOp: cocos_gfx_define_GFXStoreOp;
            sampleCount: number;
            beginLayout: cocos_gfx_define_GFXTextureLayout;
            endLayout: cocos_gfx_define_GFXTextureLayout;
        }
        export interface cocos_gfx_render_pass_IGFXRenderPassInfo {
            colorAttachments?: cocos_gfx_render_pass_GFXColorAttachment[];
            depthStencilAttachment?: cocos_gfx_render_pass_GFXDepthStencilAttachment;
        }
        export abstract class cocos_gfx_render_pass_GFXRenderPass extends cocos_gfx_define_GFXObject {
            protected _device: cocos_gfx_device_GFXDevice;
            protected _colorInfos: cocos_gfx_render_pass_GFXColorAttachment[];
            protected _depthStencilInfo: cocos_gfx_render_pass_GFXDepthStencilAttachment | null;
            abstract initialize(info: cocos_gfx_render_pass_IGFXRenderPassInfo): boolean;
            abstract destroy(): void;
        }
        export enum cocos_gfx_define_GFXTextureType {
            TEX1D,
            TEX2D,
            TEX3D
        }
        export enum cocos_gfx_define_GFXTextureUsageBit {
            NONE,
            TRANSFER_SRC,
            TRANSFER_DST,
            SAMPLED,
            STORAGE,
            COLOR_ATTACHMENT,
            DEPTH_STENCIL_ATTACHMENT,
            TRANSIENT_ATTACHMENT,
            INPUT_ATTACHMENT
        }
        export type cocos_gfx_define_GFXTextureUsage = cocos_gfx_define_GFXTextureUsageBit;
        export enum cocos_gfx_define_GFXSampleCount {
            X1,
            X2,
            X4,
            X8,
            X16,
            X32,
            X64
        }
        export enum cocos_gfx_define_GFXTextureFlagBit {
            NONE,
            GEN_MIPMAP,
            CUBEMAP,
            BAKUP_BUFFER
        }
        export type cocos_gfx_define_GFXTextureFlags = cocos_gfx_define_GFXTextureFlagBit;
        export interface cocos_gfx_texture_IGFXTextureInfo {
            type: cocos_gfx_define_GFXTextureType;
            usage: cocos_gfx_define_GFXTextureUsage;
            format: cocos_gfx_define_GFXFormat;
            width: number;
            height: number;
            depth?: number;
            arrayLayer?: number;
            mipLevel?: number;
            samples?: cocos_gfx_define_GFXSampleCount;
            flags?: cocos_gfx_define_GFXTextureFlags;
        }
        export abstract class cocos_gfx_texture_GFXTexture extends cocos_gfx_define_GFXObject {
            readonly type: cocos_gfx_define_GFXTextureType;
            readonly usage: cocos_gfx_define_GFXTextureUsage;
            readonly format: cocos_gfx_define_GFXFormat;
            readonly width: number;
            readonly height: number;
            readonly depth: number;
            readonly arrayLayer: number;
            readonly mipLevel: number;
            readonly samples: cocos_gfx_define_GFXSampleCount;
            readonly flags: cocos_gfx_define_GFXTextureFlags;
            readonly size: number;
            readonly buffer: ArrayBuffer | null;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _type: cocos_gfx_define_GFXTextureType;
            protected _usage: cocos_gfx_define_GFXTextureUsage;
            protected _format: cocos_gfx_define_GFXFormat;
            protected _width: number;
            protected _height: number;
            protected _depth: number;
            protected _arrayLayer: number;
            protected _mipLevel: number;
            protected _samples: cocos_gfx_define_GFXSampleCount;
            protected _flags: cocos_gfx_define_GFXTextureFlags;
            protected _isPowerOf2: boolean;
            protected _size: number;
            protected _buffer: ArrayBuffer | null;
            abstract initialize(info: cocos_gfx_texture_IGFXTextureInfo): boolean;
            abstract destroy(): any;
            abstract resize(width: number, height: number): any;
        }
        export enum cocos_gfx_define_GFXTextureViewType {
            TV1D,
            TV2D,
            TV3D,
            CUBE,
            TV1D_ARRAY,
            TV2D_ARRAY
        }
        export interface cocos_gfx_texture_view_IGFXTextureViewInfo {
            texture: cocos_gfx_texture_GFXTexture;
            type: cocos_gfx_define_GFXTextureViewType;
            format: cocos_gfx_define_GFXFormat;
            baseLevel?: number;
            levelCount?: number;
            baseLayer?: number;
            layerCount?: number;
        }
        export abstract class cocos_gfx_texture_view_GFXTextureView extends cocos_gfx_define_GFXObject {
            readonly texture: cocos_gfx_texture_GFXTexture;
            readonly type: cocos_gfx_define_GFXTextureViewType;
            readonly format: cocos_gfx_define_GFXFormat;
            readonly baseLevel: number;
            readonly levelCount: number;
            readonly baseLayer: number;
            readonly layerCount: number;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _texture: cocos_gfx_texture_GFXTexture | null;
            protected _type: cocos_gfx_define_GFXTextureViewType;
            protected _format: cocos_gfx_define_GFXFormat;
            protected _baseLevel: number;
            protected _levelCount: number;
            protected _baseLayer: number;
            protected _layerCount: number;
            abstract initialize(info: cocos_gfx_texture_view_IGFXTextureViewInfo): boolean;
            abstract destroy(): void;
        }
        export interface cocos_gfx_framebuffer_IGFXFramebufferInfo {
            renderPass: cocos_gfx_render_pass_GFXRenderPass;
            colorViews: cocos_gfx_texture_view_GFXTextureView[];
            depthStencilView: cocos_gfx_texture_view_GFXTextureView | null;
            isOffscreen?: boolean;
        }
        export abstract class cocos_gfx_framebuffer_GFXFramebuffer extends cocos_gfx_define_GFXObject {
            readonly renderPass: cocos_gfx_render_pass_GFXRenderPass | null;
            readonly colorViews: cocos_gfx_texture_view_GFXTextureView[];
            readonly depthStencilView: cocos_gfx_texture_view_GFXTextureView | null;
            readonly isOffscreen: boolean;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _renderPass: cocos_gfx_render_pass_GFXRenderPass | null;
            protected _colorViews: cocos_gfx_texture_view_GFXTextureView[];
            protected _depthStencilView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _isOffscreen: boolean;
            abstract initialize(info: cocos_gfx_framebuffer_IGFXFramebufferInfo): boolean;
            abstract destroy(): void;
        }
        export interface cocos_gfx_define_IGFXRect {
            x: number;
            y: number;
            width: number;
            height: number;
        }
        export enum cocos_gfx_define_GFXClearFlag {
            NONE,
            COLOR,
            DEPTH,
            STENCIL,
            DEPTH_STENCIL,
            ALL
        }
        export interface cocos_gfx_define_IGFXColor {
            r: number;
            g: number;
            b: number;
            a: number;
        }
        export enum cocos_gfx_define_GFXShaderType {
            VERTEX,
            HULL,
            DOMAIN,
            GEOMETRY,
            FRAGMENT,
            COMPUTE,
            COUNT
        }
        export interface cocos_gfx_shader_IGFXShaderMacro {
            macro: string;
            value: string;
        }
        export interface cocos_gfx_shader_IGFXShaderStage {
            type: cocos_gfx_define_GFXShaderType;
            source: string;
            macros?: cocos_gfx_shader_IGFXShaderMacro[];
        }
        export enum cocos_gfx_define_GFXType {
            UNKNOWN,
            BOOL,
            BOOL2,
            BOOL3,
            BOOL4,
            INT,
            INT2,
            INT3,
            INT4,
            UINT,
            UINT2,
            UINT3,
            UINT4,
            FLOAT,
            FLOAT2,
            FLOAT3,
            FLOAT4,
            MAT2,
            MAT2X3,
            MAT2X4,
            MAT3X2,
            MAT3,
            MAT3X4,
            MAT4X2,
            MAT4X3,
            MAT4,
            SAMPLER1D,
            SAMPLER1D_ARRAY,
            SAMPLER2D,
            SAMPLER2D_ARRAY,
            SAMPLER3D,
            SAMPLER_CUBE,
            COUNT
        }
        export class cocos_gfx_shader_GFXUniform {
            name: string;
            type: cocos_gfx_define_GFXType;
            count: number;
        }
        export class cocos_gfx_shader_GFXUniformBlock {
            binding: number;
            name: string;
            members: cocos_gfx_shader_GFXUniform[];
        }
        export class cocos_gfx_shader_GFXUniformSampler {
            binding: number;
            name: string;
            type: cocos_gfx_define_GFXType;
            count: number;
        }
        export interface cocos_gfx_shader_IGFXShaderInfo {
            name: string;
            stages: cocos_gfx_shader_IGFXShaderStage[];
            blocks?: cocos_gfx_shader_GFXUniformBlock[];
            samplers?: cocos_gfx_shader_GFXUniformSampler[];
        }
        export abstract class cocos_gfx_shader_GFXShader extends cocos_gfx_define_GFXObject {
            readonly id: number;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _id: number;
            protected _name: string;
            protected _stages: cocos_gfx_shader_IGFXShaderStage[];
            protected _blocks: cocos_gfx_shader_GFXUniformBlock[];
            protected _samplers: cocos_gfx_shader_GFXUniformSampler[];
            abstract initialize(info: cocos_gfx_shader_IGFXShaderInfo): boolean;
            abstract destroy(): any;
            readonly name: string;
        }
        export enum cocos_gfx_define_GFXPrimitiveMode {
            POINT_LIST,
            LINE_LIST,
            LINE_STRIP,
            LINE_LOOP,
            LINE_LIST_ADJACENCY,
            LINE_STRIP_ADJACENCY,
            ISO_LINE_LIST,
            TRIANGLE_LIST,
            TRIANGLE_STRIP,
            TRIANGLE_FAN,
            TRIANGLE_LIST_ADJACENCY,
            TRIANGLE_STRIP_ADJACENCY,
            TRIANGLE_PATCH_ADJACENCY,
            QUAD_PATCH_LIST
        }
        export enum cocos_gfx_define_GFXPolygonMode {
            FILL,
            POINT,
            LINE
        }
        export enum cocos_gfx_define_GFXShadeModel {
            GOURAND,
            FLAT
        }
        export enum cocos_gfx_define_GFXCullMode {
            NONE,
            FRONT,
            BACK
        }
        export class cocos_gfx_pipeline_state_GFXRasterizerState {
            isDiscard: boolean;
            polygonMode: cocos_gfx_define_GFXPolygonMode;
            shadeModel: cocos_gfx_define_GFXShadeModel;
            cullMode: cocos_gfx_define_GFXCullMode;
            isFrontFaceCCW: boolean;
            depthBias: number;
            depthBiasClamp: number;
            depthBiasSlop: number;
            isDepthClip: boolean;
            isMultisample: boolean;
            lineWidth: number;
            compare(state: cocos_gfx_pipeline_state_GFXRasterizerState): boolean;
        }
        export enum cocos_gfx_define_GFXComparisonFunc {
            NEVER,
            LESS,
            EQUAL,
            LESS_EQUAL,
            GREATER,
            NOT_EQUAL,
            GREATER_EQUAL,
            ALWAYS
        }
        export enum cocos_gfx_define_GFXStencilOp {
            ZERO,
            KEEP,
            REPLACE,
            INCR,
            DECR,
            INVERT,
            INCR_WRAP,
            DECR_WRAP
        }
        export class cocos_gfx_pipeline_state_GFXDepthStencilState {
            depthTest: boolean;
            depthWrite: boolean;
            depthFunc: cocos_gfx_define_GFXComparisonFunc;
            stencilTestFront: boolean;
            stencilFuncFront: cocos_gfx_define_GFXComparisonFunc;
            stencilReadMaskFront: number;
            stencilWriteMaskFront: number;
            stencilFailOpFront: cocos_gfx_define_GFXStencilOp;
            stencilZFailOpFront: cocos_gfx_define_GFXStencilOp;
            stencilPassOpFront: cocos_gfx_define_GFXStencilOp;
            stencilRefFront: number;
            stencilTestBack: boolean;
            stencilFuncBack: cocos_gfx_define_GFXComparisonFunc;
            stencilReadMaskBack: number;
            stencilWriteMaskBack: number;
            stencilFailOpBack: cocos_gfx_define_GFXStencilOp;
            stencilZFailOpBack: cocos_gfx_define_GFXStencilOp;
            stencilPassOpBack: cocos_gfx_define_GFXStencilOp;
            stencilRefBack: number;
            compare(state: cocos_gfx_pipeline_state_GFXDepthStencilState): boolean;
        }
        export enum cocos_gfx_define_GFXBlendFactor {
            ZERO,
            ONE,
            SRC_ALPHA,
            DST_ALPHA,
            ONE_MINUS_SRC_ALPHA,
            ONE_MINUS_DST_ALPHA,
            SRC_COLOR,
            DST_COLOR,
            ONE_MINUS_SRC_COLOR,
            ONE_MINUS_DST_COLOR,
            SRC_ALPHA_SATURATE,
            CONSTANT_COLOR,
            ONE_MINUS_CONSTANT_COLOR,
            CONSTANT_ALPHA,
            ONE_MINUS_CONSTANT_ALPHA
        }
        export enum cocos_gfx_define_GFXBlendOp {
            ADD,
            SUB,
            REV_SUB,
            MIN,
            MAX
        }
        export enum cocos_gfx_define_GFXColorMask {
            NONE,
            R,
            G,
            B,
            A,
            ALL
        }
        export class cocos_gfx_pipeline_state_GFXBlendTarget {
            blend: boolean;
            blendSrc: cocos_gfx_define_GFXBlendFactor;
            blendDst: cocos_gfx_define_GFXBlendFactor;
            blendEq: cocos_gfx_define_GFXBlendOp;
            blendSrcAlpha: cocos_gfx_define_GFXBlendFactor;
            blendDstAlpha: cocos_gfx_define_GFXBlendFactor;
            blendAlphaEq: cocos_gfx_define_GFXBlendOp;
            blendColorMask: cocos_gfx_define_GFXColorMask;
            compare(state: cocos_gfx_pipeline_state_GFXBlendTarget): boolean;
        }
        export class cocos_gfx_pipeline_state_GFXBlendState {
            isA2C: boolean;
            isIndepend: boolean;
            blendColor: number[];
            targets: cocos_gfx_pipeline_state_GFXBlendTarget[];
        }
        export enum cocos_gfx_define_GFXDynamicState {
            VIEWPORT,
            SCISSOR,
            LINE_WIDTH,
            DEPTH_BIAS,
            BLEND_CONSTANTS,
            DEPTH_BOUNDS,
            STENCIL_WRITE_MASK,
            STENCIL_COMPARE_MASK
        }
        export enum cocos_gfx_define_GFXBindingType {
            UNKNOWN,
            UNIFORM_BUFFER,
            SAMPLER,
            STORAGE_BUFFER
        }
        export enum cocos_gfx_define_GFXFilter {
            NONE,
            POINT,
            LINEAR,
            ANISOTROPIC
        }
        export enum cocos_gfx_define_GFXAddress {
            WRAP,
            MIRROR,
            CLAMP,
            BORDER
        }
        export class cocos_gfx_sampler_GFXSamplerState {
            name: string;
            minFilter: cocos_gfx_define_GFXFilter;
            magFilter: cocos_gfx_define_GFXFilter;
            mipFilter: cocos_gfx_define_GFXFilter;
            addressU: cocos_gfx_define_GFXAddress;
            addressV: cocos_gfx_define_GFXAddress;
            addressW: cocos_gfx_define_GFXAddress;
            maxAnisotropy: number;
            cmpFunc: cocos_gfx_define_GFXComparisonFunc;
            borderColor: cocos_gfx_define_IGFXColor;
            minLOD: number;
            maxLOD: number;
            mipLODBias: number;
            compare(state: cocos_gfx_sampler_GFXSamplerState): boolean;
        }
        export interface cocos_gfx_sampler_IGFXSamplerInfo {
            name?: string;
            minFilter?: cocos_gfx_define_GFXFilter;
            magFilter?: cocos_gfx_define_GFXFilter;
            mipFilter?: cocos_gfx_define_GFXFilter;
            addressU?: cocos_gfx_define_GFXAddress;
            addressV?: cocos_gfx_define_GFXAddress;
            addressW?: cocos_gfx_define_GFXAddress;
            maxAnisotropy?: number;
            cmpFunc?: cocos_gfx_define_GFXComparisonFunc;
            borderColor?: cocos_gfx_define_IGFXColor;
            minLOD?: number;
            maxLOD?: number;
            mipLODBias?: number;
        }
        export abstract class cocos_gfx_sampler_GFXSampler extends cocos_gfx_define_GFXObject {
            readonly state: cocos_gfx_sampler_GFXSamplerState;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _state: cocos_gfx_sampler_GFXSamplerState;
            abstract initialize(info: cocos_gfx_sampler_IGFXSamplerInfo): boolean;
            abstract destroy(): void;
        }
        export class cocos_gfx_binding_layout_GFXBindingUnit {
            binding: number;
            type: cocos_gfx_define_GFXBindingType;
            name: string;
            buffer: cocos_gfx_buffer_GFXBuffer | null;
            texView: cocos_gfx_texture_view_GFXTextureView | null;
            sampler: cocos_gfx_sampler_GFXSampler | null;
        }
        export interface cocos_gfx_binding_layout_IGFXBinding {
            binding: number;
            type: cocos_gfx_define_GFXBindingType;
            name: string;
        }
        export interface cocos_gfx_binding_layout_IGFXBindingLayoutInfo {
            bindings: cocos_gfx_binding_layout_IGFXBinding[];
        }
        export abstract class cocos_gfx_binding_layout_GFXBindingLayout extends cocos_gfx_define_GFXObject {
            protected _device: cocos_gfx_device_GFXDevice;
            protected _bindingUnits: cocos_gfx_binding_layout_GFXBindingUnit[];
            protected _isDirty: boolean;
            abstract initialize(info: cocos_gfx_binding_layout_IGFXBindingLayoutInfo): boolean;
            abstract destroy(): any;
            abstract update(): any;
            bindBuffer(binding: number, buffer: cocos_gfx_buffer_GFXBuffer): void;
            bindSampler(binding: number, sampler: cocos_gfx_sampler_GFXSampler): void;
            bindTextureView(binding: number, texView: cocos_gfx_texture_view_GFXTextureView): void;
            getBindingUnit(binding: number): cocos_gfx_binding_layout_GFXBindingUnit | null;
        }
        export interface cocos_gfx_pipeline_layout_IGFXPushConstantRange {
            shaderType: cocos_gfx_define_GFXShaderType;
            offset: number;
            count: number;
        }
        export interface cocos_gfx_pipeline_layout_IGFXPipelineLayoutInfo {
            pushConstantsRanges?: cocos_gfx_pipeline_layout_IGFXPushConstantRange[];
            layouts: cocos_gfx_binding_layout_GFXBindingLayout[];
        }
        export abstract class cocos_gfx_pipeline_layout_GFXPipelineLayout extends cocos_gfx_define_GFXObject {
            readonly layouts: cocos_gfx_binding_layout_GFXBindingLayout[];
            protected _device: cocos_gfx_device_GFXDevice;
            protected _pushConstantsRanges: cocos_gfx_pipeline_layout_IGFXPushConstantRange[];
            protected _layouts: cocos_gfx_binding_layout_GFXBindingLayout[];
            abstract initialize(info: cocos_gfx_pipeline_layout_IGFXPipelineLayoutInfo): boolean;
            abstract destroy(): any;
        }
        export interface cocos_gfx_input_assembler_IGFXAttribute {
            name: string;
            format: cocos_gfx_define_GFXFormat;
            isNormalized?: boolean;
            stream?: number;
            isInstanced?: boolean;
        }
        export class cocos_gfx_pipeline_state_GFXInputState {
            attributes: cocos_gfx_input_assembler_IGFXAttribute[];
        }
        export interface cocos_gfx_pipeline_state_IGFXPipelineStateInfo {
            primitive: cocos_gfx_define_GFXPrimitiveMode;
            shader: cocos_gfx_shader_GFXShader;
            is: cocos_gfx_pipeline_state_GFXInputState;
            rs: cocos_gfx_pipeline_state_GFXRasterizerState;
            dss: cocos_gfx_pipeline_state_GFXDepthStencilState;
            bs: cocos_gfx_pipeline_state_GFXBlendState;
            dynamicStates?: cocos_gfx_define_GFXDynamicState[];
            layout: cocos_gfx_pipeline_layout_GFXPipelineLayout;
            renderPass: cocos_gfx_render_pass_GFXRenderPass;
        }
        export abstract class cocos_gfx_pipeline_state_GFXPipelineState extends cocos_gfx_define_GFXObject {
            readonly shader: cocos_gfx_shader_GFXShader;
            readonly primitive: cocos_gfx_define_GFXPrimitiveMode;
            readonly rasterizerState: cocos_gfx_pipeline_state_GFXRasterizerState;
            readonly depthStencilState: cocos_gfx_pipeline_state_GFXDepthStencilState;
            readonly blendState: cocos_gfx_pipeline_state_GFXBlendState;
            readonly dynamicStates: cocos_gfx_define_GFXDynamicState[];
            readonly pipelineLayout: cocos_gfx_pipeline_layout_GFXPipelineLayout;
            readonly renderPass: cocos_gfx_render_pass_GFXRenderPass;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _shader: cocos_gfx_shader_GFXShader | null;
            protected _primitive: cocos_gfx_define_GFXPrimitiveMode;
            protected _is: cocos_gfx_pipeline_state_GFXInputState | null;
            protected _rs: cocos_gfx_pipeline_state_GFXRasterizerState | null;
            protected _dss: cocos_gfx_pipeline_state_GFXDepthStencilState | null;
            protected _bs: cocos_gfx_pipeline_state_GFXBlendState | null;
            protected _dynamicStates: cocos_gfx_define_GFXDynamicState[];
            protected _layout: cocos_gfx_pipeline_layout_GFXPipelineLayout | null;
            protected _renderPass: cocos_gfx_render_pass_GFXRenderPass | null;
            abstract initialize(info: cocos_gfx_pipeline_state_IGFXPipelineStateInfo): boolean;
            abstract destroy(): void;
        }
        export interface cocos_gfx_input_assembler_IGFXInputAssemblerInfo {
            attributes: cocos_gfx_input_assembler_IGFXAttribute[];
            vertexBuffers: cocos_gfx_buffer_GFXBuffer[];
            indexBuffer?: cocos_gfx_buffer_GFXBuffer;
            indirectBuffer?: cocos_gfx_buffer_GFXBuffer;
        }
        export interface cocos_gfx_buffer_IGFXDrawInfo {
            vertexCount: number;
            firstVertex: number;
            indexCount: number;
            firstIndex: number;
            vertexOffset: number;
            instanceCount: number;
            firstInstance: number;
        }
        export interface cocos_gfx_buffer_IGFXIndirectBuffer {
            drawInfos: cocos_gfx_buffer_IGFXDrawInfo[];
        }
        export type cocos_gfx_buffer_GFXBufferSource = ArrayBuffer | cocos_gfx_buffer_IGFXIndirectBuffer;
        export abstract class cocos_gfx_input_assembler_GFXInputAssembler extends cocos_gfx_define_GFXObject {
            readonly vertexBuffers: cocos_gfx_buffer_GFXBuffer[];
            readonly indexBuffer: cocos_gfx_buffer_GFXBuffer | null;
            readonly attributes: cocos_gfx_input_assembler_IGFXAttribute[];
            vertexCount: number;
            firstVertex: number;
            indexCount: number;
            firstIndex: number;
            vertexOffset: number;
            instanceCount: number;
            firstInstance: number;
            readonly isIndirect: boolean;
            readonly indirectBuffer: cocos_gfx_buffer_GFXBuffer | null;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _attributes: cocos_gfx_input_assembler_IGFXAttribute[];
            protected _vertexBuffers: cocos_gfx_buffer_GFXBuffer[];
            protected _indexBuffer: cocos_gfx_buffer_GFXBuffer | null;
            protected _vertexCount: number;
            protected _firstVertex: number;
            protected _indexCount: number;
            protected _firstIndex: number;
            protected _vertexOffset: number;
            protected _instanceCount: number;
            protected _firstInstance: number;
            protected _isIndirect: boolean;
            protected _indirectBuffer: cocos_gfx_buffer_GFXBuffer | null;
            abstract initialize(info: cocos_gfx_input_assembler_IGFXInputAssemblerInfo): boolean;
            abstract destroy(): void;
            getVertexBuffer(stream?: number): cocos_gfx_buffer_GFXBuffer | null;
            extractDrawInfo(drawInfo: cocos_gfx_buffer_IGFXDrawInfo): void;
            /**
                     * update VB data on the fly.
                     * @param vbuffer - an ArrayBuffer containing the full VB
                     * @param attr - name of the attribute to update (default names are specified in GFXAttributeName)
                     * @param data - the new VB attribute data to be uploaded
                     * @example
                     * // get VB array buffer from mesh, better to cache this somewhere convenient
                     * const vbInfo = mesh.struct.vertexBundles[0].data;
                     * const vbuffer = mesh.data.buffer.slice(vbInfo.offset, vbInfo.offset + vbInfo.length);
                     * const submodel = someModelComponent.model.getSubModel(0);
                     * // say the new positions is stored in 'data' as a plain array
                     * submodel.inputAssembler.updateVertexBuffer(vbuffer, cc.GFXAttributeName.ATTR_POSITION, data);
                     */ updateVertexAttr(vbuffer: cocos_gfx_buffer_GFXBufferSource, attr: string, data: number[]): void;
            /**
                     * update IB data on the fly.
                     * need to call submodel.updateCommandBuffer after this if index count changed
                     * @param ibuffer - an ArrayBuffer containing the full IB
                     * @param data - the new IB data to be uploaded
                     * @example
                     * // get IB array buffer from mesh, better to cache this somewhere convenient
                     * const ibInfo = mesh.struct.primitives[0].indices.range;
                     * const ibuffer = mesh.data.buffer.slice(ibInfo.offset, ibInfo.offset + ibInfo.length);
                     * const submodel = someModelComponent.model.getSubModel(0);
                     * submodel.inputAssembler.updateIndexBuffer(ibuffer, [0, 1, 2]);
                     * submodel.updateCommandBuffer(); // index count changed
                     */ updateIndexBuffer(ibuffer: cocos_gfx_buffer_GFXBufferSource, data: number[]): void;
        }
        export interface cocos_gfx_define_IGFXViewport {
            left: number;
            top: number;
            width: number;
            height: number;
            minDepth: number;
            maxDepth: number;
        }
        export enum cocos_gfx_define_GFXStencilFace {
            FRONT,
            BACK,
            ALL
        }
        export interface cocos_gfx_define_IGFXOffset {
            x: number;
            y: number;
            z: number;
        }
        export interface cocos_gfx_define_IGFXExtent {
            width: number;
            height: number;
            depth: number;
        }
        export class cocos_gfx_define_GFXTextureSubres {
            baseMipLevel: number;
            levelCount: number;
            baseArrayLayer: number;
            layerCount: number;
        }
        export class cocos_gfx_define_GFXBufferTextureCopy {
            buffOffset: number;
            buffStride: number;
            buffTexHeight: number;
            texOffset: cocos_gfx_define_IGFXOffset;
            texExtent: cocos_gfx_define_IGFXExtent;
            texSubres: cocos_gfx_define_GFXTextureSubres;
        }
        export abstract class cocos_gfx_command_buffer_GFXCommandBuffer extends cocos_gfx_define_GFXObject {
            readonly type: cocos_gfx_define_GFXCommandBufferType;
            readonly numDrawCalls: number;
            readonly numTris: number;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _allocator: cocos_gfx_command_allocator_GFXCommandAllocator | null;
            protected _type: cocos_gfx_define_GFXCommandBufferType;
            protected _numDrawCalls: number;
            protected _numTris: number;
            abstract initialize(info: cocos_gfx_command_buffer_IGFXCommandBufferInfo): boolean;
            abstract destroy(): any;
            abstract begin(): any;
            abstract end(): any;
            abstract beginRenderPass(framebuffer: cocos_gfx_framebuffer_GFXFramebuffer, renderArea: cocos_gfx_define_IGFXRect, clearFlag: cocos_gfx_define_GFXClearFlag, clearColors: cocos_gfx_define_IGFXColor[], clearDepth: number, clearStencil: number): any;
            abstract endRenderPass(): any;
            abstract bindPipelineState(pipelineState: cocos_gfx_pipeline_state_GFXPipelineState): any;
            abstract bindBindingLayout(bindingLayout: cocos_gfx_binding_layout_GFXBindingLayout): any;
            abstract bindInputAssembler(inputAssembler: cocos_gfx_input_assembler_GFXInputAssembler): any;
            abstract setViewport(viewport: cocos_gfx_define_IGFXViewport): any;
            abstract setScissor(scissor: cocos_gfx_define_IGFXRect): any;
            abstract setLineWidth(lineWidth: number): any;
            abstract setDepthBias(depthBiasConstantFacotr: number, depthBiasClamp: number, depthBiasSlopeFactor: number): any;
            abstract setBlendConstants(blendConstants: number[]): any;
            abstract setDepthBound(minDepthBounds: number, maxDepthBounds: number): any;
            abstract setStencilWriteMask(face: cocos_gfx_define_GFXStencilFace, writeMask: number): any;
            abstract setStencilCompareMask(face: cocos_gfx_define_GFXStencilFace, reference: number, compareMask: number): any;
            abstract draw(inputAssembler: cocos_gfx_input_assembler_GFXInputAssembler): any;
            abstract updateBuffer(buffer: cocos_gfx_buffer_GFXBuffer, data: ArrayBuffer, offset?: number): any;
            abstract copyBufferToTexture(srcBuff: cocos_gfx_buffer_GFXBuffer, dstTex: cocos_gfx_texture_GFXTexture, dstLayout: cocos_gfx_define_GFXTextureLayout, regions: cocos_gfx_define_GFXBufferTextureCopy[]): any;
            abstract execute(cmdBuffs: cocos_gfx_command_buffer_GFXCommandBuffer[], count: number): any;
        }
        export abstract class cocos_gfx_queue_GFXQueue extends cocos_gfx_define_GFXObject {
            readonly type: number;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _type: cocos_gfx_define_GFXQueueType;
            abstract initialize(info: cocos_gfx_queue_IGFXQueueInfo): boolean;
            abstract destroy(): any;
            abstract submit(cmdBuffs: cocos_gfx_command_buffer_GFXCommandBuffer[], fence?: any): any;
        }
        export interface cocos_gfx_window_IGFXWindowInfo {
            title?: string;
            left?: number;
            top?: number;
            width: number;
            height: number;
            colorFmt: cocos_gfx_define_GFXFormat;
            depthStencilFmt: cocos_gfx_define_GFXFormat;
            isOffscreen?: boolean;
        }
        export abstract class cocos_gfx_window_GFXWindow extends cocos_gfx_define_GFXObject {
            readonly width: number;
            readonly height: number;
            readonly colorFormat: cocos_gfx_define_GFXFormat;
            readonly detphStencilFormat: cocos_gfx_define_GFXFormat;
            readonly renderPass: cocos_gfx_render_pass_GFXRenderPass;
            readonly colorTexView: cocos_gfx_texture_view_GFXTextureView | null;
            readonly depthStencilTexView: cocos_gfx_texture_view_GFXTextureView | null;
            readonly framebuffer: cocos_gfx_framebuffer_GFXFramebuffer;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _title: string;
            protected _left: number;
            protected _top: number;
            protected _width: number;
            protected _height: number;
            protected _nativeWidth: number;
            protected _nativeHeight: number;
            protected _colorFmt: cocos_gfx_define_GFXFormat;
            protected _depthStencilFmt: cocos_gfx_define_GFXFormat;
            protected _isOffscreen: boolean;
            protected _renderPass: cocos_gfx_render_pass_GFXRenderPass | null;
            protected _colorTex: cocos_gfx_texture_GFXTexture | null;
            protected _colorTexView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _depthStencilTex: cocos_gfx_texture_GFXTexture | null;
            protected _depthStencilTexView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _framebuffer: cocos_gfx_framebuffer_GFXFramebuffer | null;
            abstract initialize(info: cocos_gfx_window_IGFXWindowInfo): boolean;
            abstract destroy(): any;
            abstract resize(width: number, height: number): any;
        }
        export interface cocos_gfx_device_IGFXDeviceInfo {
            canvasElm: HTMLElement;
            isAntialias?: boolean;
            isPremultipliedAlpha?: boolean;
            debug?: boolean;
            devicePixelRatio?: number;
            nativeWidth?: number;
            nativeHeight?: number;
        }
        export interface cocos_gfx_buffer_IGFXBufferInfo {
            usage: cocos_gfx_define_GFXBufferUsage;
            memUsage: cocos_gfx_define_GFXMemoryUsage;
            size: number;
            stride?: number;
        }
        export enum cocos_gfx_device_GFXFeature {
            COLOR_FLOAT,
            COLOR_HALF_FLOAT,
            TEXTURE_FLOAT,
            TEXTURE_HALF_FLOAT,
            TEXTURE_FLOAT_LINEAR,
            TEXTURE_HALF_FLOAT_LINEAR,
            FORMAT_R11G11B10F,
            FORMAT_D24S8,
            FORMAT_ETC1,
            FORMAT_ETC2,
            FORMAT_DXT,
            FORMAT_PVRTC,
            MSAA,
            COUNT
        }
        export abstract class cocos_gfx_device_GFXDevice {
            readonly canvas: HTMLCanvasElement;
            readonly canvas2D: HTMLCanvasElement;
            readonly gfxAPI: cocos_gfx_device_GFXAPI;
            readonly queue: cocos_gfx_queue_GFXQueue;
            readonly devicePixelRatio: number;
            readonly width: number;
            readonly height: number;
            readonly nativeWidth: number;
            readonly nativeHeight: number;
            readonly mainWindow: cocos_gfx_window_GFXWindow;
            readonly commandAllocator: cocos_gfx_command_allocator_GFXCommandAllocator;
            readonly renderer: string;
            readonly vendor: string;
            readonly maxVertexAttributes: number;
            readonly maxVertexUniformVectors: number;
            readonly maxFragmentUniformVectors: number;
            readonly maxTextureUnits: number;
            readonly maxVertexTextureUnits: number;
            readonly maxUniformBufferBindings: number;
            readonly maxUniformBlockSize: number;
            readonly maxCombinedUniformBlocks: number;
            readonly depthBits: number;
            readonly stencilBits: number;
            readonly colorFormat: cocos_gfx_define_GFXFormat;
            readonly depthStencilFormat: cocos_gfx_define_GFXFormat;
            readonly macros: Map<string, string>;
            readonly numDrawCalls: number;
            readonly numTris: number;
            protected _canvas: HTMLCanvasElement | null;
            protected _canvas2D: HTMLCanvasElement | null;
            protected _gfxAPI: cocos_gfx_device_GFXAPI;
            protected _deviceName: string;
            protected _renderer: string;
            protected _vendor: string;
            protected _version: string;
            protected _features: boolean[];
            protected _queue: cocos_gfx_queue_GFXQueue | null;
            protected _devicePixelRatio: number;
            protected _width: number;
            protected _height: number;
            protected _nativeWidth: number;
            protected _nativeHeight: number;
            protected _mainWindow: cocos_gfx_window_GFXWindow | null;
            protected _cmdAllocator: cocos_gfx_command_allocator_GFXCommandAllocator | null;
            protected _maxVertexAttributes: number;
            protected _maxVertexUniformVectors: number;
            protected _maxFragmentUniformVectors: number;
            protected _maxTextureUnits: number;
            protected _maxVertexTextureUnits: number;
            protected _maxUniformBufferBindings: number;
            protected _maxUniformBlockSize: number;
            protected _maxCombinedUniformBlocks: number;
            protected _depthBits: number;
            protected _stencilBits: number;
            protected _colorFmt: cocos_gfx_define_GFXFormat;
            protected _depthStencilFmt: cocos_gfx_define_GFXFormat;
            protected _shaderIdGen: number;
            protected _macros: Map<string, string>;
            protected _numDrawCalls: number;
            protected _numTris: number;
            abstract initialize(info: cocos_gfx_device_IGFXDeviceInfo): boolean;
            abstract destroy(): void;
            abstract resize(width: number, height: number): any;
            abstract createBuffer(info: cocos_gfx_buffer_IGFXBufferInfo): cocos_gfx_buffer_GFXBuffer;
            abstract createTexture(info: cocos_gfx_texture_IGFXTextureInfo): cocos_gfx_texture_GFXTexture;
            abstract createTextureView(info: cocos_gfx_texture_view_IGFXTextureViewInfo): cocos_gfx_texture_view_GFXTextureView;
            abstract createSampler(info: cocos_gfx_sampler_IGFXSamplerInfo): cocos_gfx_sampler_GFXSampler;
            abstract createBindingLayout(info: cocos_gfx_binding_layout_IGFXBindingLayoutInfo): cocos_gfx_binding_layout_GFXBindingLayout;
            abstract createShader(info: cocos_gfx_shader_IGFXShaderInfo): cocos_gfx_shader_GFXShader;
            abstract createInputAssembler(info: cocos_gfx_input_assembler_IGFXInputAssemblerInfo): cocos_gfx_input_assembler_GFXInputAssembler;
            abstract createRenderPass(info: cocos_gfx_render_pass_IGFXRenderPassInfo): cocos_gfx_render_pass_GFXRenderPass;
            abstract createFramebuffer(info: cocos_gfx_framebuffer_IGFXFramebufferInfo): cocos_gfx_framebuffer_GFXFramebuffer;
            abstract createPipelineLayout(info: cocos_gfx_pipeline_layout_IGFXPipelineLayoutInfo): cocos_gfx_pipeline_layout_GFXPipelineLayout;
            abstract createPipelineState(info: cocos_gfx_pipeline_state_IGFXPipelineStateInfo): cocos_gfx_pipeline_state_GFXPipelineState;
            abstract createCommandAllocator(info: cocos_gfx_command_allocator_IGFXCommandAllocatorInfo): cocos_gfx_command_allocator_GFXCommandAllocator;
            abstract createCommandBuffer(info: cocos_gfx_command_buffer_IGFXCommandBufferInfo): cocos_gfx_command_buffer_GFXCommandBuffer;
            abstract createQueue(info: cocos_gfx_queue_IGFXQueueInfo): cocos_gfx_queue_GFXQueue;
            abstract createWindow(info: cocos_gfx_window_IGFXWindowInfo): cocos_gfx_window_GFXWindow;
            abstract present(): any;
            abstract copyBuffersToTexture(buffers: ArrayBuffer[], texture: cocos_gfx_texture_GFXTexture, regions: cocos_gfx_define_GFXBufferTextureCopy[]): any;
            abstract copyTexImagesToTexture(texImages: TexImageSource[], texture: cocos_gfx_texture_GFXTexture, regions: cocos_gfx_define_GFXBufferTextureCopy[]): any;
            abstract copyFramebufferToBuffer(srcFramebuffer: cocos_gfx_framebuffer_GFXFramebuffer, dstBuffer: ArrayBuffer, regions: cocos_gfx_define_GFXBufferTextureCopy[]): any;
            abstract blitFramebuffer(src: cocos_gfx_framebuffer_GFXFramebuffer, dst: cocos_gfx_framebuffer_GFXFramebuffer, srcRect: cocos_gfx_define_IGFXRect, dstRect: cocos_gfx_define_IGFXRect, filter: cocos_gfx_define_GFXFilter): any;
            hasFeature(feature: cocos_gfx_device_GFXFeature): boolean;
            genShaderId(): number;
            defineMacro(macro: string, value?: string): void;
        }
        export abstract class cocos_gfx_buffer_GFXBuffer extends cocos_gfx_define_GFXObject {
            readonly usage: cocos_gfx_define_GFXBufferUsage;
            readonly memUsage: cocos_gfx_define_GFXMemoryUsage;
            readonly size: number;
            readonly stride: number;
            readonly count: number;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _usage: cocos_gfx_define_GFXBufferUsage;
            protected _memUsage: cocos_gfx_define_GFXMemoryUsage;
            protected _size: number;
            protected _stride: number;
            protected _count: number;
            abstract initialize(info: cocos_gfx_buffer_IGFXBufferInfo): boolean;
            abstract destroy(): void;
            abstract resize(size: number): any;
            abstract update(buffer: cocos_gfx_buffer_GFXBufferSource, offset?: number, size?: number): any;
        }
        interface cocos_renderer_core_pass_IPassResources {
            bindingLayout: cocos_gfx_binding_layout_GFXBindingLayout;
            pipelineLayout: cocos_gfx_pipeline_layout_GFXPipelineLayout;
            pipelineState: cocos_gfx_pipeline_state_GFXPipelineState;
        }
        export enum cocos_pipeline_define_RenderPriority {
            MIN,
            MAX,
            DEFAULT
        }
        export enum cocos_pipeline_define_RenderPassStage {
            DEFAULT
        }
        interface cocos_renderer_core_pass_IPassDynamics {
        }
        interface cocos_renderer_core_pass_IBlock {
            buffer: ArrayBuffer;
            views: Float32Array[];
            dirty: boolean;
        }
        export interface cocos_3d_assets_effect_asset_IBuiltinInfo {
            blocks: string[];
            samplers: string[];
        }
        export interface cocos_3d_assets_effect_asset_IDefineInfo {
            name: string;
            type: string;
            range?: number[];
            options?: string[];
            defines?: string[];
        }
        export interface cocos_3d_assets_effect_asset_IBlockMember {
            size: number;
            name: string;
            type: cocos_gfx_define_GFXType;
            count: number;
        }
        export interface cocos_3d_assets_effect_asset_IBlockInfo {
            defines: string[];
            size: number;
            binding: number;
            name: string;
            members: cocos_3d_assets_effect_asset_IBlockMember[];
        }
        export interface cocos_3d_assets_effect_asset_ISamplerInfo {
            defines: string[];
            binding: number;
            name: string;
            type: cocos_gfx_define_GFXType;
            count: number;
        }
        export interface cocos_3d_assets_effect_asset_IShaderInfo {
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
                globals: cocos_3d_assets_effect_asset_IBuiltinInfo;
                locals: cocos_3d_assets_effect_asset_IBuiltinInfo;
            };
            defines: cocos_3d_assets_effect_asset_IDefineInfo[];
            blocks: cocos_3d_assets_effect_asset_IBlockInfo[];
            samplers: cocos_3d_assets_effect_asset_ISamplerInfo[];
            dependencies: Record<string, string>;
        }
        export interface cocos_renderer_core_pass_IDefineMap {
        }
        export interface cocos_3d_assets_effect_asset_IPassStates {
            priority?: number;
            primitive?: cocos_gfx_define_GFXPrimitiveMode;
            stage?: cocos_pipeline_define_RenderPassStage;
            rasterizerState?: cocos_gfx_pipeline_state_GFXRasterizerState;
            depthStencilState?: cocos_gfx_pipeline_state_GFXDepthStencilState;
            blendState?: cocos_gfx_pipeline_state_GFXBlendState;
            dynamics?: cocos_gfx_define_GFXDynamicState[];
            customizations?: string[];
            phase?: string;
        }
        export interface cocos_3d_assets_effect_asset_IPropertyInfo {
            type: number;
            value?: number[] | string;
            sampler?: number[];
        }
        export interface cocos_3d_assets_effect_asset_IPassInfo extends cocos_3d_assets_effect_asset_IPassStates {
            program: string;
            switch?: string;
            properties?: Record<string, cocos_3d_assets_effect_asset_IPropertyInfo>;
        }
        export type cocos_renderer_core_pass_PassOverrides = RecursivePartial<cocos_3d_assets_effect_asset_IPassStates>;
        export interface cocos_renderer_core_pass_IPassInfoFull extends cocos_3d_assets_effect_asset_IPassInfo {
            idxInTech: number;
            curDefs: cocos_renderer_core_pass_IDefineMap;
            states: cocos_renderer_core_pass_PassOverrides;
        }
        export interface cocos_renderer_core_effect_IEffectInfo {
            techIdx: number;
            defines: cocos_renderer_core_pass_IDefineMap[];
            states: cocos_renderer_core_pass_PassOverrides[];
        }
        interface cocos_renderer_core_program_lib_IDefineRecord extends cocos_3d_assets_effect_asset_IDefineInfo {
            _map: (value: any) => number;
            _offset: number;
        }
        interface cocos_renderer_core_program_lib_IProgramInfo extends cocos_3d_assets_effect_asset_IShaderInfo {
            id: number;
            defines: cocos_renderer_core_program_lib_IDefineRecord[];
            globalsInited: boolean;
            localsInited: boolean;
        }
        export interface cocos_renderer_core_program_lib_IDefineValue {
            name: string;
            result: string | number;
        }
        export class cocos_renderer_scene_ambient_Ambient {
            static SUN_ILLUM: number;
            static SKY_ILLUM: number;
            enabled: any;
            skyColor: Float32Array;
            skyIllum: number;
            groundAlbedo: Float32Array;
            protected _enabled: boolean;
            protected _skyColor: Float32Array;
            protected _skyIllum: number;
            protected _groundAlbedo: Float32Array;
            protected _scene: cocos_renderer_scene_render_scene_RenderScene;
            update(): void;
        }
        interface cocos_3d_assets_texture_cube_ITextureCubeMipmap {
            front: ImageAsset;
            back: ImageAsset;
            left: ImageAsset;
            right: ImageAsset;
            top: ImageAsset;
            bottom: ImageAsset;
        }
        interface cocos_3d_assets_texture_cube_ITextureCubeSerializeData {
            base: string;
            mipmaps: Array<{
                front: string;
                back: string;
                left: string;
                right: string;
                top: string;
                bottom: string;
            }>;
        }
        /**
             * The texture pixel format, default value is RGBA8888,
             * you should note that textures loaded by normal image files (png, jpg) can only support RGBA8888 format,
             * other formats are supported by compressed file types or raw data.
             * @enum {number}
             */ export enum cocos_assets_asset_enum_PixelFormat {
            RGB565,
            RGB5A1,
            RGBA4444,
            RGB888,
            RGBA8888,
            RGBA32F,
            A8,
            I8,
            AI8,
            RGB_PVRTC_2BPPV1,
            RGBA_PVRTC_2BPPV1,
            RGB_PVRTC_4BPPV1,
            RGBA_PVRTC_4BPPV1,
            RGB_ETC1,
            RGB_ETC2,
            RGBA_ETC2
        }
        /**
             * The texture wrap mode.
             * @enum {number}
             */ export enum cocos_assets_asset_enum_WrapMode {
            REPEAT,
            CLAMP_TO_EDGE,
            MIRRORED_REPEAT,
            CLAMP_TO_BORDER
        }
        /**
             * The texture filter mode
             * @enum {number}
             */ export enum cocos_assets_asset_enum_Filter {
            NONE,
            LINEAR,
            NEAREST
        }
        var cocos_assets_texture_base_TextureBase_base: {} & typeof Asset;
        export class cocos_assets_texture_base_TextureBase extends cocos_assets_texture_base_TextureBase_base {
            /**
                     * !#en
                     * Texture width, in pixels.
                     * For 2D texture, the width of texture is equal to its very first mipmap's width;
                     * For Cubemap texture, the width of texture is equal to its every sides's very first mipmaps's width.
                     * !#zh
                     * 贴图像素宽度
                     */ readonly width: number;
            /**
                     * !#en
                     * Texture height, in pixels.
                     * For 2D texture, the height of texture is equal to its very first mipmap's height;
                     * For Cubemap texture, the height of texture is equal to its every sides's very first mipmaps's height.
                     * !#zh
                     * 贴图像素高度
                     */ readonly height: number;
            static PixelFormat: typeof cocos_assets_asset_enum_PixelFormat;
            static WrapMode: typeof cocos_assets_asset_enum_WrapMode;
            static Filter: typeof cocos_assets_asset_enum_Filter;
            /**
                     *
                     * @param texture
                     */ static _isCompressed(texture: cocos_assets_texture_base_TextureBase): boolean;
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
            protected _texture: cocos_gfx_texture_GFXTexture | null;
            protected _textureView: cocos_gfx_texture_view_GFXTextureView | null;
            private _potientialWidth;
            private _potientialHeight;
            private _mipmapLevel;
            private _id;
            private _samplerInfo;
            create(width: number, height: number, format?: cocos_assets_asset_enum_PixelFormat, mipmapLevel?: number): void;
            /**
                     * Gets the underlying texture object.
                     * @deprecated Use getGfxTexture() instead.
                     */ getImpl(): cocos_gfx_texture_GFXTexture | null;
            getId(): string;
            /**
                     * !#en
                     * Pixel format of the texture.
                     * !#zh 获取纹理的像素格式。
                     * @return
                     */ getPixelFormat(): number;
            /**
                     * !#en
                     * Whether or not the texture has their Alpha premultiplied.
                     * !#zh 检查纹理在上传 GPU 时预乘选项是否开启。
                     * @return
                     */ hasPremultipliedAlpha(): boolean;
            /**
                     * !#en Anisotropy of the texture.
                     * !#zh 获取纹理的各向异性。
                     * @return
                     */ getAnisotropy(): number;
            /**
                     * !#en Sets the wrap s and wrap t options. <br/>
                     * If the texture size is NPOT (non power of 2), then in can only use gl.CLAMP_TO_EDGE in gl.TEXTURE_WRAP_{S,T}.
                     * !#zh 设置纹理包装模式。
                     * 若纹理贴图尺寸是 NPOT（non power of 2），则只能使用 Texture2D.WrapMode.CLAMP_TO_EDGE。
                     * @param wrapS
                     * @param wrapT
                     * @param wrapR
                     */ setWrapMode(wrapS: cocos_assets_asset_enum_WrapMode, wrapT: cocos_assets_asset_enum_WrapMode, wrapR?: cocos_assets_asset_enum_WrapMode): void;
            /**
                     * !#en Sets the minFilter and magFilter options
                     * !#zh 设置纹理贴图缩小和放大过滤器算法选项。
                     * @param minFilter
                     * @param magFilter
                     */ setFilters(minFilter: cocos_assets_asset_enum_Filter, magFilter: cocos_assets_asset_enum_Filter): void;
            /**
                     * !#en Sets the mipFilter options
                     * !#zh 设置纹理Mipmap过滤算法选项。
                     * @param mipFilter
                     */ setMipFilter(mipFilter: cocos_assets_asset_enum_Filter): void;
            /**
                     * !#en
                     * Sets the flipY options
                     * !#zh 设置贴图的纵向翻转选项。
                     * @param flipY
                     */ setFlipY(flipY: boolean): void;
            /**
                     * !#en
                     * Sets the premultiply alpha options
                     * !#zh 设置贴图的预乘选项。
                     * @param premultiply
                     */ setPremultiplyAlpha(premultiply: boolean): void;
            /**
                     * !#en Sets the anisotropy of the texture
                     * !#zh 设置贴图的各向异性。
                     * @param anisotropy
                     */ setAnisotropy(anisotropy: number): void;
            destroy(): boolean;
            getGFXTexture(): cocos_gfx_texture_GFXTexture | null;
            getGFXTextureView(): cocos_gfx_texture_view_GFXTextureView | null;
            getGFXSamplerInfo(): number[];
            /**
                     * @return
                     */ _serialize(exporting?: any): any;
            /**
                     *
                     * @param data
                     */ _deserialize(serializedData: any, handle: any): void;
            /**
                     * Updates mipmaps at level 0.
                     */ updateImage(): void;
            /**
                     * Updates mipmaps at specified range of levels.
                     * @param firstLevel The first level from which the sources update.
                     * @description
                     * If the range specified by [firstLevel, firstLevel + sources.length) exceeds
                     * the actually range of mipmaps this texture contains, only overlaped mipmaps are updated.
                     * Use this method if your mipmap data are modified.
                     */ updateMipmaps(firstLevel?: number, count?: number): void;
            protected _getGlobalDevice(): cocos_gfx_device_GFXDevice | null;
            protected _assignImage(image: ImageAsset, level: number, arrayIndex?: number): void;
            protected _uploadData(source: HTMLCanvasElement | HTMLImageElement | ArrayBuffer, level: number, arrayIndex?: number): void;
            protected _getTextureCreateInfo(): cocos_gfx_texture_IGFXTextureInfo;
            protected _getTextureViewCreateInfo(): cocos_gfx_texture_view_IGFXTextureViewInfo;
            protected _recreateTexture(): void;
            private _destroyTexture;
        }
        export class cocos_3d_assets_texture_cube_TextureCube extends cocos_assets_texture_base_TextureBase {
            /**
                     * Gets the mipmap images.
                     * Note that the result do not contains the auto generated mipmaps.
                     */ /**
                    * Sets the mipmaps images.
                    */ mipmaps: cocos_3d_assets_texture_cube_ITextureCubeMipmap[];
            /**
                     * Gets the mipmap image at level 0.
                     */ /**
                    * Sets the mipmap images as a single mipmap image.
                    */ image: cocos_3d_assets_texture_cube_ITextureCubeMipmap | null;
            /**
                     * convenient util for cubemap creation (even with custom mipmaps)
                     * @param texture - texture asset array containing six faces in a row
                     * @param out - the resulting texture cube asset
                     */ static fromTexture2DArray(textures: Texture2D[], out?: cocos_3d_assets_texture_cube_TextureCube): cocos_3d_assets_texture_cube_TextureCube;
            _mipmaps: cocos_3d_assets_texture_cube_ITextureCubeMipmap[];
            onLoaded(): void;
            /**
                     * Updates mipmaps at specified range of levels.
                     * @param firstLevel The first level from which the sources update.
                     * @description
                     * If the range specified by [firstLevel, firstLevel + sources.length) exceeds
                     * the actually range of mipmaps this texture contains, only overlaped mipmaps are updated.
                     * Use this method if your mipmap data are modified.
                     */ updateMipmaps(firstLevel?: number, count?: number): void;
            /**
                     * !#en
                     * Destory this texture and immediately release its video memory. (Inherit from cc.Object.destroy)<br>
                     * After destroy, this object is not usable any more.
                     * You can use cc.isValid(obj) to check whether the object is destroyed before accessing it.
                     * !#zh
                     * 销毁该贴图，并立即释放它对应的显存。（继承自 cc.Object.destroy）<br/>
                     * 销毁后，该对象不再可用。您可以在访问对象之前使用 cc.isValid(obj) 来检查对象是否已被销毁。
                     */ destroy(): boolean;
            /**
                     * !#en
                     * Release texture, please use destroy instead.
                     * !#zh 释放纹理，请使用 destroy 替代。
                     * @deprecated Since v2.0.
                     */ releaseTexture(): void;
            _serialize(): {
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
            _deserialize(serializedData: cocos_3d_assets_texture_cube_ITextureCubeSerializeData, handle: any): void;
            protected _getTextureCreateInfo(): cocos_gfx_texture_IGFXTextureInfo;
            protected _getTextureViewCreateInfo(): cocos_gfx_texture_view_IGFXTextureViewInfo;
        }
        export class cocos_renderer_scene_skybox_Skybox extends renderer.Model {
            cubemap: cocos_3d_assets_texture_cube_TextureCube | null;
            isRGBE: boolean;
            protected _default: cocos_3d_assets_texture_cube_TextureCube;
            protected _cubemap: cocos_3d_assets_texture_cube_TextureCube;
            protected _isRGBE: boolean;
            protected _material: Material;
            protected _initMaterial(): void;
            protected _updateBindingLayout(): void;
        }
        export class cocos_renderer_scene_sphere_light_SphereLight extends renderer.Light {
            readonly position: Vec3;
            size: number;
            range: number;
            luminance: number;
            readonly aabb: geometry.aabb;
            protected _size: number;
            protected _range: number;
            protected _luminance: number;
            protected _pos: Vec3;
            protected _aabb: geometry.aabb;
            update(): void;
        }
        export class cocos_renderer_scene_directional_light_DirectionalLight extends renderer.Light {
            protected _dir: Vec3;
            protected _illum: number;
            direction: Vec3;
            illuminance: number;
            update(): void;
        }
        export class cocos_renderer_scene_planar_shadow_PlanarShadow {
            enabled: boolean;
            normal: Vec3;
            distance: number;
            shadowColor: Color;
            readonly matLight: Mat4;
            readonly data: Float32Array;
            protected _scene: cocos_renderer_scene_render_scene_RenderScene;
            protected _enabled: boolean;
            protected _normal: Vec3;
            protected _distance: number;
            protected _matLight: Mat4;
            protected _data: Float32Array;
            updateSphereLight(light: cocos_renderer_scene_sphere_light_SphereLight): void;
            updateDirLight(light: cocos_renderer_scene_directional_light_DirectionalLight): void;
        }
        export class cocos_renderer_scene_spot_light_SpotLight extends renderer.Light {
            protected _dir: Vec3;
            protected _size: number;
            protected _range: number;
            protected _luminance: number;
            protected _spotAngle: number;
            protected _pos: Vec3;
            protected _aabb: geometry.aabb;
            protected _frustum: geometry.frustum;
            protected _angle: number;
            readonly position: Vec3;
            size: number;
            range: number;
            luminance: number;
            readonly direction: Vec3;
            spotAngle: number;
            readonly aabb: geometry.aabb;
            readonly frustum: geometry.frustum;
            update(): void;
        }
        export interface cocos_renderer_scene_render_scene_IRenderSceneInfo {
            name: string;
        }
        export interface cocos_renderer_scene_camera_ICameraInfo {
            name: string;
            node: Node;
            projection: number;
            targetDisplay: number;
            priority: number;
            pipeline?: string;
            isUI?: boolean;
            flows?: string[];
        }
        export interface cocos_renderer_scene_render_scene_IRaycastResult {
            node: Node;
            distance: number;
        }
        export class cocos_renderer_scene_render_scene_RenderScene {
            readonly root: cocos_core_root_Root;
            readonly name: string;
            readonly cameras: renderer.Camera[];
            readonly ambient: cocos_renderer_scene_ambient_Ambient;
            readonly skybox: cocos_renderer_scene_skybox_Skybox;
            readonly planarShadow: cocos_renderer_scene_planar_shadow_PlanarShadow;
            readonly defaultMainLightNode: Node;
            readonly mainLight: cocos_renderer_scene_directional_light_DirectionalLight;
            readonly sphereLights: cocos_renderer_scene_sphere_light_SphereLight[];
            readonly spotLights: cocos_renderer_scene_spot_light_SpotLight[];
            readonly models: renderer.Model[];
            static registerCreateFunc(root: cocos_core_root_Root): void;
            private _root;
            private _name;
            private _cameras;
            private _ambient;
            private _skybox;
            private _planarShadow;
            private _mainLight;
            private _defaultMainLightNode;
            private _sphereLights;
            private _spotLights;
            private _models;
            private _modelId;
            initialize(info: cocos_renderer_scene_render_scene_IRenderSceneInfo): boolean;
            destroy(): void;
            createCamera(info: cocos_renderer_scene_camera_ICameraInfo): renderer.Camera;
            destroyCamera(camera: renderer.Camera): void;
            destroyCameras(): void;
            createSphereLight(name: string, node: Node): cocos_renderer_scene_sphere_light_SphereLight | null;
            destroySphereLight(light: cocos_renderer_scene_sphere_light_SphereLight): void;
            createSpotLight(name: string, node: Node): cocos_renderer_scene_spot_light_SpotLight | null;
            destroySpotLight(light: cocos_renderer_scene_spot_light_SpotLight): void;
            destroyPointLights(): void;
            destroySpotLights(): void;
            createModel<T extends renderer.Model>(clazz: new (scene: cocos_renderer_scene_render_scene_RenderScene, node: Node) => T, node: Node): T;
            destroyModel(model: renderer.Model): void;
            destroyModels(): void;
            onPipelineChange(): void;
            generateModelId(): number;
            /**
                     * Cast a ray into the scene, record all the intersected models in the result array
                     * @param worldRay - the testing ray
                     * @param mask - the layer mask to filter the models
                     * @returns the results array
                     */ raycast(worldRay: geometry.ray, mask?: number): cocos_renderer_scene_render_scene_IRaycastResult[];
        }
        export interface cocos_renderer_ui_ui_material_IUIMaterialInfo {
            material: Material;
        }
        export class cocos_renderer_ui_ui_material_UIMaterial {
            readonly material: Material;
            readonly pass: renderer.Pass;
            protected _material: Material | null;
            protected _pass: renderer.Pass | null;
            private _psos;
            initialize(info: cocos_renderer_ui_ui_material_IUIMaterialInfo): boolean;
            getPipelineState(): cocos_gfx_pipeline_state_GFXPipelineState;
            revertPipelineState(pso: cocos_gfx_pipeline_state_GFXPipelineState): void;
            destroy(): void;
        }
        export class cocos_renderer_ui_ui_UI {
            private _root;
            readonly renderScene: cocos_renderer_scene_render_scene_RenderScene;
            readonly currBufferBatch: MeshBuffer | null;
            debugScreen: CanvasComponent | null;
            device: cocos_gfx_device_GFXDevice;
            private _screens;
            private _debugScreen;
            private _bufferBatchPool;
            private _drawBatchPool;
            private _cmdBuff;
            private _scene;
            private _attributes;
            private _meshBuffers;
            private _meshBufferUseCount;
            private _uiMaterials;
            private _batches;
            private _sortChildList;
            private _uiModelPool;
            private _modelInUse;
            private _emptyMaterial;
            private _currMeshBuffer;
            private _currMaterial;
            private _currTexView;
            private _currCanvas;
            initialize(): boolean;
            destroy(): void;
            getRenderSceneGetter(): () => any;
            _getUIMaterial(mat: Material): cocos_renderer_ui_ui_material_UIMaterial;
            _removeUIMaterial(hash: number): void;
            addScreen(comp: CanvasComponent): void;
            getScreen(visibility: number): CanvasComponent | null;
            removeScreen(comp: CanvasComponent): void;
            update(dt: number): void;
            render(): void;
            commitComp(comp: UIComponent, frame?: cocos_gfx_texture_view_GFXTextureView | null, assembler?: IAssembler): void;
            autoMergeBatches(): void;
            forceMergeBatches(material: Material, sprite: SpriteFrame | null): void;
            private _deleteUIMaterial;
            private _destroyUIMaterials;
            private _walk;
            private _defineNodeOrder;
            private _renderScreens;
            private _recursiveScreenNode;
            private _reset;
            private _createMeshBuffer;
            private _requireBufferBatch;
        }
        export interface cocos_pipeline_render_stage_IRenderStageInfo {
            name?: string;
            priority: number;
            framebuffer?: cocos_gfx_framebuffer_GFXFramebuffer;
        }
        export abstract class cocos_pipeline_render_stage_RenderStage {
            readonly flow: cocos_pipeline_render_flow_RenderFlow;
            readonly pipeline: cocos_pipeline_render_pipeline_RenderPipeline;
            readonly priority: number;
            readonly framebuffer: cocos_gfx_framebuffer_GFXFramebuffer | null;
            protected _flow: cocos_pipeline_render_flow_RenderFlow;
            protected _pipeline: cocos_pipeline_render_pipeline_RenderPipeline;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _name: string;
            protected _priority: number;
            protected _framebuffer: cocos_gfx_framebuffer_GFXFramebuffer | null;
            protected _cmdBuff: cocos_gfx_command_buffer_GFXCommandBuffer | null;
            protected _clearColors: cocos_gfx_define_IGFXColor[];
            protected _clearDepth: number;
            protected _clearStencil: number;
            protected _renderArea: cocos_gfx_define_IGFXRect;
            protected _pass: renderer.Pass | null;
            protected _pso: cocos_gfx_pipeline_state_GFXPipelineState | null;
            abstract initialize(info: cocos_pipeline_render_stage_IRenderStageInfo): boolean;
            abstract destroy(): any;
            abstract render(view: cocos_pipeline_render_view_RenderView): any;
            abstract resize(width: number, height: number): any;
            abstract rebuild(): any;
            setClearColor(color: cocos_gfx_define_IGFXColor): void;
            setClearColors(colors: cocos_gfx_define_IGFXColor[]): void;
            setClearDepth(depth: number): void;
            setClearStencil(stencil: number): void;
            setRenderArea(width: number, height: number): void;
        }
        export interface cocos_pipeline_render_flow_IRenderFlowInfo {
            name?: string;
            priority: number;
        }
        export abstract class cocos_pipeline_render_flow_RenderFlow {
            readonly device: cocos_gfx_device_GFXDevice;
            readonly pipeline: cocos_pipeline_render_pipeline_RenderPipeline;
            readonly name: string;
            readonly priority: number;
            readonly stages: cocos_pipeline_render_stage_RenderStage[];
            readonly material: Material;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _pipeline: cocos_pipeline_render_pipeline_RenderPipeline;
            protected _name: string;
            protected _priority: number;
            protected _stages: cocos_pipeline_render_stage_RenderStage[];
            protected _material: Material;
            abstract initialize(info: cocos_pipeline_render_flow_IRenderFlowInfo): boolean;
            abstract destroy(): any;
            abstract rebuild(): any;
            resize(width: number, height: number): void;
            render(view: cocos_pipeline_render_view_RenderView): void;
            createStage<T extends cocos_pipeline_render_stage_RenderStage>(clazz: new (flow: cocos_pipeline_render_flow_RenderFlow) => T, info: cocos_pipeline_render_stage_IRenderStageInfo): cocos_pipeline_render_stage_RenderStage | null;
            destroyStages(): void;
        }
        export interface cocos_pipeline_render_view_IRenderViewInfo {
            camera: renderer.Camera;
            name: string;
            priority: number;
            isUI: boolean;
            flows?: string[];
        }
        export class cocos_pipeline_render_view_RenderView {
            readonly name: string;
            window: cocos_gfx_window_GFXWindow | null;
            priority: number;
            visibility: any;
            readonly camera: renderer.Camera;
            readonly isEnable: boolean;
            readonly isUI: boolean;
            readonly flows: cocos_pipeline_render_flow_RenderFlow[];
            static registerCreateFunc(root: cocos_core_root_Root): void;
            private _root;
            private _name;
            private _window;
            private _priority;
            private _visibility;
            private _camera;
            private _isEnable;
            private _isUI;
            private _flows;
            initialize(info: cocos_pipeline_render_view_IRenderViewInfo): boolean;
            destroy(): void;
            enable(isEnable: boolean): void;
        }
        export interface cocos_core_root_IRootInfo {
            enableHDR?: boolean;
        }
        export class cocos_core_root_Root {
            readonly device: cocos_gfx_device_GFXDevice;
            readonly mainWindow: cocos_gfx_window_GFXWindow | null;
            readonly curWindow: cocos_gfx_window_GFXWindow | null;
            readonly windows: cocos_gfx_window_GFXWindow[];
            readonly pipeline: cocos_pipeline_render_pipeline_RenderPipeline;
            readonly ui: cocos_renderer_ui_ui_UI;
            readonly scenes: cocos_renderer_scene_render_scene_RenderScene[];
            readonly views: cocos_pipeline_render_view_RenderView[];
            readonly frameTime: number;
            readonly frameCount: number;
            readonly fps: number;
            _createSceneFun: any;
            _createViewFun: any;
            private _device;
            private _windows;
            private _mainWindow;
            private _curWindow;
            private _pipeline;
            private _ui;
            private _scenes;
            private _views;
            private _frameTime;
            private _fpsTime;
            private _frameCount;
            private _fps;
            initialize(info: cocos_core_root_IRootInfo): boolean;
            destroy(): void;
            resize(width: number, height: number): void;
            activeWindow(window: cocos_gfx_window_GFXWindow): void;
            frameMove(deltaTime: number): void;
            createWindow(info: cocos_gfx_window_IGFXWindowInfo): cocos_gfx_window_GFXWindow | null;
            destroyWindow(window: cocos_gfx_window_GFXWindow): void;
            destroyWindows(): void;
            createScene(info: cocos_renderer_scene_render_scene_IRenderSceneInfo): cocos_renderer_scene_render_scene_RenderScene;
            destroyScene(scene: cocos_renderer_scene_render_scene_RenderScene): void;
            destroyScenes(): void;
            createView(info: cocos_pipeline_render_view_IRenderViewInfo): cocos_pipeline_render_view_RenderView;
            destroyView(view: cocos_pipeline_render_view_RenderView): void;
            destroyViews(): void;
        }
        export interface cocos_pipeline_define_IRenderObject {
            model: renderer.Model;
            depth: number;
        }
        export interface cocos_pipeline_define_IInternalBindingDesc {
            type: cocos_gfx_define_GFXBindingType;
            blockInfo?: cocos_gfx_shader_GFXUniformBlock;
            samplerInfo?: cocos_gfx_shader_GFXUniformSampler;
        }
        export interface cocos_pipeline_define_IInternalBindingInst extends cocos_pipeline_define_IInternalBindingDesc {
            buffer?: cocos_gfx_buffer_GFXBuffer;
            sampler?: cocos_gfx_sampler_GFXSampler;
            textureView?: cocos_gfx_texture_view_GFXTextureView;
        }
        export class cocos_pipeline_define_UBOGlobal {
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
            static BLOCK: cocos_gfx_shader_GFXUniformBlock;
            view: Float32Array;
        }
        export interface cocos_pipeline_render_pipeline_IRenderPipelineInfo {
            enablePostProcess?: boolean;
            enableHDR?: boolean;
            enableMSAA?: boolean;
            enableSMAA?: boolean;
        }
        export abstract class cocos_pipeline_render_pipeline_RenderPipeline {
            readonly root: cocos_core_root_Root;
            readonly device: cocos_gfx_device_GFXDevice;
            readonly name: string;
            readonly renderObjects: cocos_pipeline_define_IRenderObject[];
            readonly flows: cocos_pipeline_render_flow_RenderFlow[];
            readonly usePostProcess: boolean;
            readonly isHDRSupported: boolean;
            readonly isHDR: boolean;
            readonly shadingScale: number;
            lightMeterScale: number;
            readonly depthStencilTexView: cocos_gfx_texture_view_GFXTextureView;
            readonly curShadingTexView: cocos_gfx_texture_view_GFXTextureView;
            readonly prevShadingTexView: cocos_gfx_texture_view_GFXTextureView;
            readonly curShadingFBO: cocos_gfx_framebuffer_GFXFramebuffer;
            readonly prevShadingFBO: cocos_gfx_framebuffer_GFXFramebuffer;
            readonly msaaShadingFBO: cocos_gfx_framebuffer_GFXFramebuffer;
            readonly useMSAA: boolean;
            readonly useSMAA: boolean;
            readonly smaaEdgeTexView: cocos_gfx_texture_view_GFXTextureView;
            readonly smaaEdgeFBO: cocos_gfx_framebuffer_GFXFramebuffer;
            readonly smaaBlendTexView: cocos_gfx_texture_view_GFXTextureView;
            readonly smaaBlendFBO: cocos_gfx_framebuffer_GFXFramebuffer;
            readonly quadIA: cocos_gfx_input_assembler_GFXInputAssembler;
            readonly globalBindings: Map<string, cocos_pipeline_define_IInternalBindingInst>;
            readonly defaultTexture: cocos_gfx_texture_GFXTexture;
            readonly fpScale: number;
            readonly fpScaleInv: number;
            readonly macros: cocos_renderer_core_pass_IDefineMap;
            readonly defaultGlobalUBOData: Float32Array;
            protected _root: cocos_core_root_Root;
            protected _device: cocos_gfx_device_GFXDevice;
            protected _name: string;
            protected _renderObjects: cocos_pipeline_define_IRenderObject[];
            protected _renderPasses: Map<number, cocos_gfx_render_pass_GFXRenderPass>;
            protected _flows: cocos_pipeline_render_flow_RenderFlow[];
            protected _isHDRSupported: boolean;
            protected _isHDR: boolean;
            protected _lightMeterScale: number;
            protected _shadingPass: cocos_gfx_render_pass_GFXRenderPass | null;
            protected _fboCount: number;
            protected _msaaShadingTex: cocos_gfx_texture_GFXTexture | null;
            protected _msaaShadingTexView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _msaaDepthStencilTex: cocos_gfx_texture_GFXTexture | null;
            protected _msaaDepthStencilTexView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _msaaShadingFBO: cocos_gfx_framebuffer_GFXFramebuffer | null;
            protected _colorFmt: cocos_gfx_define_GFXFormat;
            protected _depthStencilFmt: cocos_gfx_define_GFXFormat;
            protected _shadingTextures: cocos_gfx_texture_GFXTexture[];
            protected _shadingTexViews: cocos_gfx_texture_view_GFXTextureView[];
            protected _depthStencilTex: cocos_gfx_texture_GFXTexture | null;
            protected _depthStencilTexView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _shadingFBOs: cocos_gfx_framebuffer_GFXFramebuffer[];
            protected _shadingWidth: number;
            protected _shadingHeight: number;
            protected _shadingScale: number;
            protected _curIdx: number;
            protected _prevIdx: number;
            protected _usePostProcess: boolean;
            protected _useMSAA: boolean;
            protected _useSMAA: boolean;
            protected _smaaPass: cocos_gfx_render_pass_GFXRenderPass | null;
            protected _smaaEdgeFBO: cocos_gfx_framebuffer_GFXFramebuffer | null;
            protected _smaaEdgeTex: cocos_gfx_texture_GFXTexture | null;
            protected _smaaEdgeTexView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _smaaBlendFBO: cocos_gfx_framebuffer_GFXFramebuffer | null;
            protected _smaaBlendTex: cocos_gfx_texture_GFXTexture | null;
            protected _smaaBlendTexView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _quadVB: cocos_gfx_buffer_GFXBuffer | null;
            protected _quadIB: cocos_gfx_buffer_GFXBuffer | null;
            protected _quadIA: cocos_gfx_input_assembler_GFXInputAssembler | null;
            protected _defaultUboGlobal: cocos_pipeline_define_UBOGlobal;
            protected _globalBindings: Map<string, cocos_pipeline_define_IInternalBindingInst>;
            protected _defaultTex: cocos_gfx_texture_GFXTexture | null;
            protected _defaultTexView: cocos_gfx_texture_view_GFXTextureView | null;
            protected _fpScale: number;
            protected _fpScaleInv: number;
            protected _macros: cocos_renderer_core_pass_IDefineMap;
            abstract initialize(info: cocos_pipeline_render_pipeline_IRenderPipelineInfo): boolean;
            abstract destroy(): any;
            rebuild(): void;
            resize(width: number, height: number): void;
            render(view: cocos_pipeline_render_view_RenderView): void;
            swapFBOs(): void;
            addRenderPass(stage: number, renderPass: cocos_gfx_render_pass_GFXRenderPass): void;
            getRenderPass(stage: number): cocos_gfx_render_pass_GFXRenderPass | null;
            removeRenderPass(stage: number): void;
            clearRenderPasses(): void;
            createFlow<T extends cocos_pipeline_render_flow_RenderFlow>(clazz: new (pipeline: cocos_pipeline_render_pipeline_RenderPipeline) => T, info: cocos_pipeline_render_flow_IRenderFlowInfo): cocos_pipeline_render_flow_RenderFlow | null;
            destroyFlows(): void;
            getFlow(name: string): cocos_pipeline_render_flow_RenderFlow | null;
            protected _initialize(info: cocos_pipeline_render_pipeline_IRenderPipelineInfo): boolean;
            protected _destroy(): void;
            protected resizeFBOs(width: number, height: number): void;
            protected updateMacros(): void;
            protected createQuadInputAssembler(): boolean;
            protected destroyQuadInputAssembler(): void;
            protected createUBOs(): boolean;
            protected destroyUBOs(): void;
            protected updateUBOs(view: cocos_pipeline_render_view_RenderView): void;
            protected sceneCulling(view: cocos_pipeline_render_view_RenderView): void;
            protected addVisibleModel(model: renderer.Model, camera: renderer.Camera): void;
        }
        class cocos_renderer_core_program_lib_ProgramLib {
            protected _templates: Record<string, cocos_renderer_core_program_lib_IProgramInfo>;
            protected _cache: Record<string, cocos_gfx_shader_GFXShader>;
            /**
                     * @example:
                     *   // this object is auto-generated from your actual shaders
                     *   let program = {
                     *     name: 'foobar',
                     *     glsl1: { vert: '// shader source', frag: '// shader source' },
                     *     glsl3: { vert: '// shader source', frag: '// shader source' },
                     *     defines: [
                     *       { name: 'shadow', type: 'boolean', defines: [] },
                     *       { name: 'lightCount', type: 'number', range: [1, 4], defines: [] }
                     *     ],
                     *     blocks: [{ name: 'Constants', binding: 0, members: [
                     *       { name: 'color', type: 'vec4', count: 1, size: 16 }], defines: [], size: 16 }
                     *     ],
                     *     samplers: [],
                     *     dependencies: { 'USE_NORMAL_TEXTURE': 'OES_standard_derivatives' },
                     *   };
                     *   programLib.define(program);
                     */ define(prog: cocos_3d_assets_effect_asset_IShaderInfo): void;
            getTemplate(name: string): cocos_renderer_core_program_lib_IProgramInfo;
            /**
                     * Does this library has the specified program?
                     */ hasProgram(name: string): boolean;
            getKey(name: string, defines: cocos_renderer_core_pass_IDefineMap): number;
            destroyShaderByDefines(defines: cocos_renderer_core_pass_IDefineMap): void;
            getShaderInstaceName(name: string, defines: cocos_renderer_core_pass_IDefineMap, defs?: cocos_renderer_core_program_lib_IDefineValue[]): string;
            getGFXShader(device: cocos_gfx_device_GFXDevice, name: string, defines: cocos_renderer_core_pass_IDefineMap, pipeline: cocos_pipeline_render_pipeline_RenderPipeline): cocos_gfx_shader_GFXShader;
        }
        class cocos_renderer_core_sampler_lib_SamplerLib {
            protected _cache: Record<string, cocos_gfx_sampler_GFXSampler>;
            getSampler(device: cocos_gfx_device_GFXDevice, info: number[]): cocos_gfx_sampler_GFXSampler;
        }
        export enum cocos_renderer_scene_light_LightType {
            DIRECTIONAL,
            SPHERE,
            SPOT,
            UNKNOWN
        }
        export enum cocos_renderer_scene_camera_CameraAperture {
            F1_8,
            F2_0,
            F2_2,
            F2_5,
            F2_8,
            F3_2,
            F3_5,
            F4_0,
            F4_5,
            F5_0,
            F5_6,
            F6_3,
            F7_1,
            F8_0,
            F9_0,
            F10_0,
            F11_0,
            F13_0,
            F14_0,
            F16_0,
            F18_0,
            F20_0,
            F22_0
        }
        export enum cocos_renderer_scene_camera_CameraShutter {
            D1,
            D2,
            D4,
            D8,
            D15,
            D30,
            D60,
            D125,
            D250,
            D500,
            D1000,
            D2000,
            D4000
        }
        export enum cocos_renderer_scene_camera_CameraISO {
            ISO100,
            ISO200,
            ISO400,
            ISO800
        }
        export class cocos_pipeline_define_UBOLocal {
            static MAT_WORLD_OFFSET: number;
            static MAT_WORLD_IT_OFFSET: number;
            static COUNT: number;
            static SIZE: number;
            static BLOCK: cocos_gfx_shader_GFXUniformBlock;
            view: Float32Array;
        }
        export type cocos_3d_assets_mesh_IBArray = Uint8Array | Uint16Array | Uint32Array;
        export interface cocos_3d_assets_mesh_IGeometricInfo {
            positions: Float32Array;
            indices: cocos_3d_assets_mesh_IBArray;
            doubleSided?: boolean;
        }
        export interface cocos_3d_assets_mesh_IRenderingSubmesh {
            vertexBuffers: cocos_gfx_buffer_GFXBuffer[];
            indexBuffer: cocos_gfx_buffer_GFXBuffer | null;
            indirectBuffer?: cocos_gfx_buffer_GFXBuffer;
            attributes: cocos_gfx_input_assembler_IGFXAttribute[];
            primitiveMode: cocos_gfx_define_GFXPrimitiveMode;
            geometricInfo?: cocos_3d_assets_mesh_IGeometricInfo;
        }
        export class cocos_renderer_scene_submodel_SubModel {
            protected _subMeshObject: cocos_3d_assets_mesh_IRenderingSubmesh | null;
            protected _inputAssembler: cocos_gfx_input_assembler_GFXInputAssembler | null;
            private _material;
            private _cmdBuffers;
            private _psos;
            private _castShadow;
            private _priority;
            initialize(subMesh: cocos_3d_assets_mesh_IRenderingSubmesh, mat: Material, psos: cocos_gfx_pipeline_state_GFXPipelineState[]): void;
            destroy(): void;
            priority: cocos_pipeline_define_RenderPriority;
            subMeshData: cocos_3d_assets_mesh_IRenderingSubmesh;
            psos: cocos_gfx_pipeline_state_GFXPipelineState[];
            material: Material | null;
            readonly inputAssembler: cocos_gfx_input_assembler_GFXInputAssembler | null;
            castShadow: boolean;
            updateCommandBuffer(): void;
            protected recordCommandBuffer(index: number): void;
            readonly passes: renderer.Pass[];
            readonly commandBuffers: cocos_gfx_command_buffer_GFXCommandBuffer[];
        }
        /**
             * Removes the array item at the specified index.
             */ export function cocos_core_utils_array_removeAt<T>(array: T[], index: number): void;
        /**
             * Removes the array item at the specified index.
             * It's faster but the order of the array will be changed.
             */ export function cocos_core_utils_array_fastRemoveAt<T>(array: T[], index: number): void;
        /**
             * Removes the first occurrence of a specific object from the array.
             */ export function cocos_core_utils_array_remove<T>(array: T[], value: T): boolean;
        /**
             * Removes the first occurrence of a specific object from the array.
             * It's faster but the order of the array will be changed.
             */ export function cocos_core_utils_array_fastRemove<T>(array: T[], value: T): void;
        export function cocos_core_utils_array_removeIf<T>(array: T[], predicate: (value: T) => boolean): T | undefined;
        /**
             * Verify array's Type.
             */ export function cocos_core_utils_array_verifyType<T>(array: T[], type: Function): boolean;
        /**
             * Removes from array all values in minusArr. For each Value in minusArr, the first matching instance in array will be removed.
             * @param array Source Array
             * @param minusArr minus Array
             */ export function cocos_core_utils_array_removeArray<T>(array: T[], minusArr: T[]): void;
        /**
             * Inserts some objects at index.
             */ export function cocos_core_utils_array_appendObjectsAt<T>(array: T[], addObjs: T[], index: number): T[];
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
             */ export function cocos_core_utils_array_indexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
        /**
             * Determines whether the array contains a specific value.
             */ export function cocos_core_utils_array_contains<T>(array: T[], value: T): boolean;
        /**
             * Copy an array's item to a new array (its performance is better than Array.slice)
             */ export function cocos_core_utils_array_copy<T>(array: T[]): any[];
        /****************************************************************************
             Copyright (c) 2013-2016 Chukong Technologies Inc.
             Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
            
             http://www.cocos.com
            
             Permission is hereby granted, free of charge, to any person obtaining a copy
             of this software and associated engine source code (the "Software"), a limited,
             worldwide, royalty-free, non-assignable, revocable and non-exclusive license
             to use Cocos Creator solely to develop games on your target platforms. You shall
             not use Cocos Creator software for developing other software or tools that's
             used for developing games. You are not granted to publish, distribute,
             sublicense, and/or sell copies of Cocos Creator.
            
             The software or tools in this License Agreement are licensed, not sold.
             Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
            
             THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             THE SOFTWARE.
             ****************************************************************************/ /**
             * @class js.array.MutableForwardIterator
             * @example
             * var array = [0, 1, 2, 3, 4];
             * var iterator = new cc.js.array.MutableForwardIterator(array);
             * for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
             *     var item = array[iterator.i];
             *     ...
             * }
             */ export class cocos_core_utils_mutable_forward_iterator_default<T> {
            array: T[];
            i: number;
            length: number;
            remove(value: T): void;
            removeAt(i: number): void;
            fastRemove(value: T): void;
            fastRemoveAt(i: number): void;
            push(item: T): void;
        }
        namespace cocos_core_utils_array_cocos_core_utils_array {
            /**
                 * Removes the array item at the specified index.
                 */ export function cocos_core_utils_array_removeAt<T>(array: T[], index: number): void;
            /**
                 * Removes the array item at the specified index.
                 * It's faster but the order of the array will be changed.
                 */ export function cocos_core_utils_array_fastRemoveAt<T>(array: T[], index: number): void;
            /**
                 * Removes the first occurrence of a specific object from the array.
                 */ export function cocos_core_utils_array_remove<T>(array: T[], value: T): boolean;
            /**
                 * Removes the first occurrence of a specific object from the array.
                 * It's faster but the order of the array will be changed.
                 */ export function cocos_core_utils_array_fastRemove<T>(array: T[], value: T): void;
            export function cocos_core_utils_array_removeIf<T>(array: T[], predicate: (value: T) => boolean): T | undefined;
            /**
                 * Verify array's Type.
                 */ export function cocos_core_utils_array_verifyType<T>(array: T[], type: Function): boolean;
            /**
                 * Removes from array all values in minusArr. For each Value in minusArr, the first matching instance in array will be removed.
                 * @param array Source Array
                 * @param minusArr minus Array
                 */ export function cocos_core_utils_array_removeArray<T>(array: T[], minusArr: T[]): void;
            /**
                 * Inserts some objects at index.
                 */ export function cocos_core_utils_array_appendObjectsAt<T>(array: T[], addObjs: T[], index: number): T[];
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
                 */ export function cocos_core_utils_array_indexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
            /**
                 * Determines whether the array contains a specific value.
                 */ export function cocos_core_utils_array_contains<T>(array: T[], value: T): boolean;
            /**
                 * Copy an array's item to a new array (its performance is better than Array.slice)
                 */ export function cocos_core_utils_array_copy<T>(array: T[]): any[];
            /****************************************************************************
                 Copyright (c) 2013-2016 Chukong Technologies Inc.
                 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
                
                 http://www.cocos.com
                
                 Permission is hereby granted, free of charge, to any person obtaining a copy
                 of this software and associated engine source code (the "Software"), a limited,
                 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
                 to use Cocos Creator solely to develop games on your target platforms. You shall
                 not use Cocos Creator software for developing other software or tools that's
                 used for developing games. You are not granted to publish, distribute,
                 sublicense, and/or sell copies of Cocos Creator.
                
                 The software or tools in this License Agreement are licensed, not sold.
                 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
                
                 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                 THE SOFTWARE.
                 ****************************************************************************/ /**
                 * @class js.array.MutableForwardIterator
                 * @example
                 * var array = [0, 1, 2, 3, 4];
                 * var iterator = new cc.js.array.MutableForwardIterator(array);
                 * for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
                 *     var item = array[iterator.i];
                 *     ...
                 * }
                 */ export class cocos_core_utils_mutable_forward_iterator_default<T> {
                array: T[];
                i: number;
                length: number;
                remove(value: T): void;
                removeAt(i: number): void;
                fastRemove(value: T): void;
                fastRemoveAt(i: number): void;
                push(item: T): void;
            }
        }
        export interface cocos_core_data_utils_attibute_defines_IExposedAttributes {
            /**
                     * 指定属性的类型。
                     */ type?: any;
            /**
                     * ???
                     */ url?: string;
            /**
                     * 控制是否在编辑器中显示该属性。
                     */ visible?: boolean | (() => boolean);
            /**
                     * 该属性在编辑器中的显示名称。
                     */ displayName?: string;
            /**
                     * ???
                     */ displayOrder?: number;
            /**
                     * 该属性在编辑器中的工具提示内容。
                     */ tooltip?: string;
            /**
                     * ???
                     */ multiline?: boolean;
            /**
                     * 指定该属性是否为可读的。
                     */ readonly?: boolean;
            /**
                     * 当该属性为数值类型时，指定了该属性允许的最小值。
                     */ min?: number;
            /**
                     * 当该属性为数值类型时，指定了该属性允许的最大值。
                     */ max?: number;
            /**
                     * 当该属性为数值类型时并在编辑器中提供了滑动条时，指定了滑动条的步长。
                     */ step?: number;
            /**
                     * 当该属性为数值类型时，指定了该属性允许的范围。
                     */ range?: number[];
            /**
                     * 当该属性为数值类型时，是否在编辑器中提供滑动条来调节值。
                     */ slide?: boolean;
            /**
                     * 该属性是否参与序列化和反序列化。
                     */ serializable?: boolean;
            /**
                     * 该属性的曾用名。
                     */ formerlySerializedAs?: string;
            /**
                     * 该属性是否仅仅在编辑器环境中生效。
                     */ editorOnly?: boolean;
            /**
                     * 是否覆盖基类中的同名属性。
                     */ override?: boolean;
            /**
                     * ???
                     */ animatable?: boolean;
            /**
                     * ???
                     */ unit?: string;
        }
        export class cocos_core_event_callbacks_invoker_CallbackList {
            callbacks: Array<Function | null>;
            targets: Array<Object | null>;
            isInvoking: boolean;
            containCanceled: boolean;
            removeBy(array: any[], value: any): void;
            cancel(index: number): void;
            cancelAll(): void;
            purgeCanceled(): void;
        }
        /**
             * The CallbacksHandler is an abstract class that can register and unregister callbacks by key.
             * Subclasses should implement their own methods about how to invoke the callbacks.
             * @class _CallbacksHandler
             *
             * @private
             */ export class cocos_core_event_callbacks_invoker_CallbacksHandler {
            protected _callbackTable: Map<string, cocos_core_event_callbacks_invoker_CallbackList>;
            /**
                     * @method add
                     * @param {String} key
                     * @param {Function} callback
                     * @param {Object} [target] - can be null
                     */ add(key: string, callback: Function, target?: Object): void;
            /**
                     * Check if the specified key has any registered callback. If a callback is also specified,
                     * it will only return true if the callback is registered.
                     * @method hasEventListener
                     * @param {String} key
                     * @param {Function} [callback]
                     * @param {Object} [target]
                     * @return {Boolean}
                     */ hasEventListener(key: string, callback?: Function, target?: Object): boolean;
            /**
                     * Removes all callbacks registered in a certain event type or all callbacks registered with a certain target
                     * @method removeAll
                     * @param {String|Object} keyOrTarget - The event key to be removed or the target to be removed
                     */ removeAll(keyOrTarget?: string | Object): void;
            /**
                     * @method remove
                     * @param {String} key
                     * @param {Function} callback
                     * @param {Object} [target]
                     */ remove(key: string, callback?: Function, target?: Object): void;
        }
        /**
             * !#en The callbacks invoker to handle and invoke callbacks by key.
             * !#zh CallbacksInvoker 用来根据 Key 管理并调用回调方法。
             * @class CallbacksInvoker
             *
             * @extends _CallbacksHandler
             */ export class cocos_core_event_callbacks_invoker_CallbacksInvoker extends cocos_core_event_callbacks_invoker_CallbacksHandler {
            /**
                     * @method emit
                     * @param {String} key
                     * @param {any} [p1]
                     * @param {any} [p2]
                     * @param {any} [p3]
                     * @param {any} [p4]
                     * @param {any} [p5]
                     */ emit(key: string, ...args: any[]): void;
        }
        export interface cocos_core_platform_event_manager_event_listener_IEventListenerCreateInfo {
            event?: number;
        }
        export interface cocos_core_platform_event_manager_event_listener_ILinstenerMask {
            index: number;
            node: Node;
        }
        /**
             * !#en
             * <p>
             *     The base class of event listener.                                                                        <br/>
             *     If you need custom listener which with different callback, you need to inherit this class.               <br/>
             *     For instance, you could refer to EventListenerAcceleration, EventListenerKeyboard,                       <br/>
             *      EventListenerTouchOneByOne, EventListenerCustom.
             * </p>
             *
             * !#zh
             * 封装用户的事件处理逻辑。
             * 注意：这是一个抽象类，开发者不应该直接实例化这个类，请参考 {{#crossLink "EventListener/create:method"}}cc.EventListener.create{{/crossLink}}。
             */ export class cocos_core_platform_event_manager_event_listener_EventListener {
            readonly onEvent: ((...args: any[]) => any) | null;
            /**
                     * !#en The type code of unknown event listener.
                     * !#zh 未知的事件监听器类型
                     */ static UNKNOWN: number;
            static TOUCH_ONE_BY_ONE: number;
            static TOUCH_ALL_AT_ONCE: number;
            /**
                     * !#en The type code of keyboard event listener.
                     * !#zh 键盘事件监听器类型
                     */ static KEYBOARD: number;
            static MOUSE: number;
            /**
                     * !#en The type code of acceleration event listener.
                     * !#zh 加速器事件监听器类型
                     */ static ACCELERATION: number;
            static CUSTOM: number;
            static ListenerID: {
                MOUSE: string;
                TOUCH_ONE_BY_ONE: string;
                TOUCH_ALL_AT_ONCE: string;
                KEYBOARD: string;
                ACCELERATION: string;
            };
            /**
                     * !#en
                     * Create a EventListener object with configuration including the event type, handlers and other parameters.
                     * In handlers, this refer to the event listener object itself.
                     * You can also pass custom parameters in the configuration object,
                     * all custom parameters will be polyfilled into the event listener object and can be accessed in handlers.
                     * !#zh 通过指定不同的 Event 对象来设置想要创建的事件监听器。
                     * @param {Object} argObj a json object
                     * @example {@link cocos2d/core/event-manager/CCEventListener/create.js}
                     */ static create(argObj: cocos_core_platform_event_manager_event_listener_IEventListenerCreateInfo): cocos_core_platform_event_manager_event_listener_EventListener;
            owner: Object | null;
            mask: cocos_core_platform_event_manager_event_listener_ILinstenerMask | null;
            _previousIn?: boolean;
            _target: any;
            protected _onEvent: ((...args: any[]) => any) | null;
            private _type;
            private _listenerID;
            private _registered;
            private _fixedPriority;
            private _node;
            private _paused;
            private _isEnabled;
            /**
                     * <p>
                     *     Sets paused state for the listener
                     *     The paused state is only used for scene graph priority listeners.
                     *     `EventDispatcher::resumeAllEventListenersForTarget(node)` will set the paused state to `true`,
                     *     while `EventDispatcher::pauseAllEventListenersForTarget(node)` will set it to `false`.
                     *     @note 1) Fixed priority listeners will never get paused. If a fixed priority doesn't want to receive events,
                     *              call `setEnabled(false)` instead.
                     *            2) In `Node`'s onEnter and onExit, the `paused state` of the listeners
                     *              which associated with that node will be automatically updated.
                     * </p>
                     * @private
                     */ _setPaused(paused: boolean): void;
            /**
                     * Checks whether the listener is paused.
                     * @private
                     */ _isPaused(): boolean;
            /**
                     * Marks the listener was registered by EventDispatcher.
                     * @private
                     */ _setRegistered(registered: boolean): void;
            /**
                     * Checks whether the listener was registered by EventDispatcher
                     * @private
                     */ _isRegistered(): boolean;
            /**
                     * Gets the type of this listener
                     * @note It's different from `EventType`, e.g.
                     * TouchEvent has two kinds of event listeners - EventListenerOneByOne, EventListenerAllAtOnce
                     * @private
                     */ _getType(): number;
            /**
                     * Gets the listener ID of this listener
                     * When event is being dispatched, listener ID is used as key for searching listeners according to event type.
                     * @private
                     */ _getListenerID(): string;
            /**
                     * Sets the fixed priority for this listener
                     * @note This method is only used for `fixed priority listeners`,
                     *   it needs to access a non-zero value. 0 is reserved for scene graph priority listeners
                     * @private
                     */ _setFixedPriority(fixedPriority: number): void;
            /**
                     * Gets the fixed priority of this listener
                     * @return 0 if it's a scene graph priority listener, non-zero for fixed priority listener
                     * @private
                     */ _getFixedPriority(): number;
            /**
                     * Sets scene graph priority for this listener
                     * @private
                     * @param {Node} node
                     */ _setSceneGraphPriority(node: any): void;
            /**
                     * Gets scene graph priority of this listener
                     * @return if it's a fixed priority listener, non-null for scene graph priority listener
                     * @private
                     */ _getSceneGraphPriority(): any;
            /**
                     * !#en Checks whether the listener is available.
                     * !#zh 检测监听器是否有效
                     */ checkAvailable(): boolean;
            /**
                     * !#en Clones the listener, its subclasses have to override this method.
                     * !#zh 克隆监听器,它的子类必须重写此方法。
                     */ clone(): cocos_core_platform_event_manager_event_listener_EventListener | null;
            /**
                     *  !#en Enables or disables the listener
                     *  !#zh 启用或禁用监听器。
                     *  @note Only listeners with `enabled` state will be able to receive events.
                     *          When an listener was initialized, it's enabled by default.
                     *          An event listener can receive events when it is enabled and is not paused.
                     *          paused state is always false when it is a fixed priority listener.
                     */ setEnabled(enabled: boolean): void;
            /**
                     * !#en Checks whether the listener is enabled
                     * !#zh 检查监听器是否可用。
                     */ isEnabled(): boolean;
        }
        class cocos_core_platform_event_manager_event_manager_EventManager {
            private _listenersMap;
            private _priorityDirtyFlagMap;
            private _nodeListenersMap;
            private _nodePriorityMap;
            private _globalZOrderNodeMap;
            private _toAddedListeners;
            private _toRemovedListeners;
            private _dirtyNodes;
            private _inDispatch;
            private _isEnabled;
            private _nodePriorityIndex;
            private _internalCustomListenerIDs;
            /**
                     * !#en Pauses all listeners which are associated the specified target.
                     * !#zh 暂停传入的 node 相关的所有监听器的事件响应。
                     * @param {Node} node
                     * @param [recursive=false]
                     */ pauseTarget(node: any, recursive?: boolean): void;
            /**
                     * !#en Resumes all listeners which are associated the specified target.
                     * !#zh 恢复传入的 node 相关的所有监听器的事件响应。
                     * @param {Node} node
                     * @param [recursive=false]
                     */ resumeTarget(node: any, recursive?: boolean): void;
            frameUpdateListeners(): void;
            /**
                     * !#en Query whether the specified event listener id has been added.
                     * !#zh 查询指定的事件 ID 是否存在
                     * @param listenerID - The listener id.
                     * @return true or false
                     */ hasEventListener(listenerID: string | number): boolean;
            /**
                     * !#en
                     * <p>
                     * Adds a event listener for a specified event.<br/>
                     * if the parameter "nodeOrPriority" is a node,
                     * it means to add a event listener for a specified event with the priority of scene graph.<br/>
                     * if the parameter "nodeOrPriority" is a Number,
                     * it means to add a event listener for a specified event with the fixed priority.<br/>
                     * </p>
                     * !#zh
                     * 将事件监听器添加到事件管理器中。<br/>
                     * 如果参数 “nodeOrPriority” 是节点，优先级由 node 的渲染顺序决定，显示在上层的节点将优先收到事件。<br/>
                     * 如果参数 “nodeOrPriority” 是数字，优先级则固定为该参数的数值，数字越小，优先级越高。<br/>
                     *
                     * @method addListener
                     * @param listener - The listener of a specified event or a object of some event parameters.
                     * @param nodeOrPriority - The priority of the listener is based on the draw order of this node or fixedPriority The fixed priority of the listener.
                     * @note  The priority of scene graph will be fixed value 0. So the order of listener item in the vector will be ' <0, scene graph (0 priority), >0'.
                     *         A lower priority will be called before the ones that have a higher value. 0 priority is forbidden for fixed priority since it's used for scene graph based priority.
                     *         The listener must be a cc.EventListener object when adding a fixed priority listener, because we can't remove a fixed priority listener without the listener handler,
                     *         except calls removeAllListeners().
                     * @return {EventListener} Return the listener. Needed in order to remove the event from the dispatcher.
                     */ addListener(listener: cocos_core_platform_event_manager_event_listener_EventListener, nodeOrPriority: any | number): any;
            /**
                     * !#en Adds a Custom event listener. It will use a fixed priority of 1.
                     * !#zh 向事件管理器添加一个自定义事件监听器。
                     * @param eventName
                     * @param callback
                     * @return the generated event. Needed in order to remove the event from the dispatcher
                     */ addCustomListener(eventName: string, callback: Function): cocos_core_platform_event_manager_event_listener_EventListener;
            /**
                     * !#en Remove a listener.
                     * !#zh 移除一个已添加的监听器。
                     * @param listener - an event listener or a registered node target
                     * @example {@link cocos2d/core/event-manager/CCEventManager/removeListener.js}
                     */ removeListener(listener: cocos_core_platform_event_manager_event_listener_EventListener): void;
            /**
                     * !#en Removes all listeners with the same event listener type or removes all listeners of a node.
                     * !#zh
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
                     * @method removeListeners
                     * @param {Number|Node} listenerType - listenerType or a node
                     * @param [recursive=false]
                     */ removeListeners(listenerType: number | any, recursive?: boolean): void;
            removeCustomListeners(customEventName: any): void;
            /**
                     * !#en Removes all listeners
                     * !#zh 移除所有事件监听器。
                     * @method removeAllListeners
                     */ removeAllListeners(): void;
            /**
                     * !#en Sets listener's priority with fixed value.
                     * !#zh 设置 FixedPriority 类型监听器的优先级。
                     * @method setPriority
                     * @param {EventListener} listener
                     * @param {Number} fixedPriority
                     */ setPriority(listener: any, fixedPriority: any): void;
            /**
                     * !#en Whether to enable dispatching events
                     * !#zh 启用或禁用事件管理器，禁用后不会分发任何事件。
                     * @method setEnabled
                     * @param {Boolean} enabled
                     */ setEnabled(enabled: any): void;
            /**
                     * !#en Checks whether dispatching events is enabled
                     * !#zh 检测事件管理器是否启用。
                     * @method isEnabled
                     * @returns {Boolean}
                     */ isEnabled(): boolean;
            dispatchEvent(event: any): void;
            _onListenerCallback(listener: cocos_core_platform_event_manager_event_listener_EventListener, event: any): any;
            dispatchCustomEvent(eventName: any, optionalUserData: any): void;
            private _setDirtyForNode;
            private _addListener;
            private _forceAddEventListener;
            private _getListeners;
            private _updateDirtyFlagForSceneGraph;
            private _removeAllListenersInVector;
            private _removeListenersForListenerID;
            private _sortEventListeners;
            private _sortListenersOfSceneGraphPriority;
            private _sortEventListenersOfSceneGraphPriorityDes;
            private _sortListenersOfFixedPriority;
            private _sortListenersOfFixedPriorityAsc;
            private _onUpdateListeners;
            private _updateTouchListeners;
            private _cleanToRemovedListeners;
            private _onTouchEventCallback;
            private _dispatchTouchEvent;
            private _onTouchesEventCallback;
            private _associateNodeAndEventListener;
            private _dissociateNodeAndEventListener;
            private _dispatchEventToListeners;
            private _setDirty;
            private _visitTarget;
            private _sortNumberAsc;
            private _removeListenerInCallback;
            private _removeListenerInVector;
        }
        /**
             * !#en The touch event class
             * !#zh 封装了触摸相关的信息。
             * @class Touch
             *
             * @param {Number} x
             * @param {Number} y
             * @param {Number} id
             */ export class cocos_core_platform_event_manager_CCTouch_default {
            _point: Vec2;
            _prevPoint: Vec2;
            _lastModified: number;
            private _id;
            private _startPoint;
            private _startPointCaptured;
            /**
                     * !#en Returns the current touch location in OpenGL coordinates.、
                     * !#zh 获取当前触点位置。
                     */ getLocation(out?: Vec2): Vec2;
            /**
                     * !#en Returns X axis location value.
                     * !#zh 获取当前触点 X 轴位置。
                     */ getLocationX(): number;
            /**
                     * !#en Returns Y axis location value.
                     * !#zh 获取当前触点 Y 轴位置。
                     */ getLocationY(): number;
            /**
                     * !#en Returns the current touch location in OpenGL coordinates.、
                     * !#zh 获取当前触点位置。
                     */ getUILocation(out?: Vec2): Vec2;
            /**
                     * !#en Returns X axis location value.
                     * !#zh 获取当前触点 X 轴位置。
                     */ getUILocationX(): number;
            /**
                     * !#en Returns Y axis location value.
                     * !#zh 获取当前触点 Y 轴位置。
                     */ getUILocationY(): number;
            /**
                     * !#en Returns the previous touch location in OpenGL coordinates.
                     * !#zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
                     */ getPreviousLocation(out?: Vec2): Vec2;
            /**
                     * !#en Returns the previous touch location in OpenGL coordinates.
                     * !#zh 获取触点在上一次事件时的位置对象，对象包含 x 和 y 属性。
                     */ getUIPreviousLocation(out?: Vec2): Vec2;
            /**
                     * !#en Returns the start touch location in OpenGL coordinates.
                     * !#zh 获获取触点落下时的位置对象，对象包含 x 和 y 属性。
                     */ getStartLocation(out?: Vec2): Vec2;
            /**
                     * !#en Returns the start touch location in OpenGL coordinates.
                     * !#zh 获获取触点落下时的位置对象，对象包含 x 和 y 属性。
                     */ getUIStartLocation(out?: Vec2): Vec2;
            /**
                     * !#en Returns the delta distance from the previous touche to the current one in screen coordinates.
                     * !#zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
                     */ getDelta(out?: Vec2): Vec2;
            /**
                     * !#en Returns the delta distance from the previous touche to the current one in screen coordinates.
                     * !#zh 获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性。
                     */ getUIDelta(out?: Vec2): Vec2;
            /**
                     * !#en Returns the current touch location in screen coordinates.
                     * !#zh 获取当前事件在游戏窗口内的坐标位置对象，对象包含 x 和 y 属性。
                     */ getLocationInView(out?: Vec2): Vec2;
            /**
                     * !#en Returns the previous touch location in screen coordinates.
                     * !#zh 获取触点在上一次事件时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
                     */ getPreviousLocationInView(out?: Vec2): Vec2;
            /**
                     * !#en Returns the start touch location in screen coordinates.
                     * !#zh 获取触点落下时在游戏窗口中的位置对象，对象包含 x 和 y 属性。
                     */ getStartLocationInView(out?: Vec2): Vec2;
            /**
                     * !#en Returns the id of cc.Touch.
                     * !#zh 触点的标识 ID，可以用来在多点触摸中跟踪触点。
                     */ getID(): number | null;
            /**
                     * !#en Sets information to touch.
                     * !#zh 设置触摸相关的信息。用于监控触摸事件。
                     */ setTouchInfo(id?: number | null, x?: number, y?: number): void;
            _setPoint(point: Vec2): void;
            _setPoint(x: number, y: number): void;
            _setPrevPoint(point: Vec2): void;
            _setPrevPoint(x: number, y: number): void;
        }
        type cocos_scene_graph_base_node_Constructor<T = {}> = new (...args: any[]) => T;
        enum cocos_scene_graph_node_NodeSpace {
            LOCAL,
            WORLD
        }
        export class cocos_scene_graph_scene_globals_AmbientInfo {
            protected _skyColor: Color;
            protected _skyIllum: number;
            protected _groundAlbedo: Color;
            protected _resource: cocos_renderer_scene_ambient_Ambient | null;
            skyColor: Color;
            skyIllum: number;
            groundAlbedo: Color;
            renderScene: cocos_renderer_scene_render_scene_RenderScene;
        }
        export class cocos_scene_graph_scene_globals_SkyboxInfo {
            protected _cubemap: cocos_3d_assets_texture_cube_TextureCube | null;
            protected _isRGBE: boolean;
            protected _enabled: boolean;
            protected _resource: cocos_renderer_scene_skybox_Skybox | null;
            enabled: any;
            cubemap: any;
            isRGBE: any;
            renderScene: cocos_renderer_scene_render_scene_RenderScene;
        }
        export class cocos_scene_graph_scene_globals_PlanarShadowInfo {
            protected _enabled: boolean;
            protected _normal: Vec3;
            protected _distance: number;
            protected _shadowColor: Color;
            protected _resource: cocos_renderer_scene_planar_shadow_PlanarShadow | null;
            enabled: boolean;
            normal: Vec3;
            distance: number;
            shadowColor: Color;
            setPlaneFromNode(node: Node): void;
            renderScene: cocos_renderer_scene_render_scene_RenderScene;
        }
        export class cocos_scene_graph_scene_globals_SceneGlobals {
            ambient: cocos_scene_graph_scene_globals_AmbientInfo;
            skybox: cocos_scene_graph_scene_globals_SkyboxInfo;
            planarShadow: cocos_scene_graph_scene_globals_PlanarShadowInfo;
            renderScene: cocos_renderer_scene_render_scene_RenderScene;
        }
        /**
             * @param error - null or the error info
             * @param node - the created node or null
             */ type cocos_assets_asset_CreateNodeCallback = (error: Error | null, node: Node) => void;
        interface cocos_assets_sprite_atlas_ISpriteFrameList {
        }
        export interface cocos_assets_image_asset_IMemoryImageSource {
            _data: ArrayBufferView | null;
            _compressed: boolean;
            width: number;
            height: number;
            format: number;
        }
        export type cocos_assets_image_asset_ImageSource = HTMLCanvasElement | HTMLImageElement | cocos_assets_image_asset_IMemoryImageSource;
        var cocos_assets_image_asset_ImageAsset_base: {} & typeof Asset;
        export interface cocos_assets_bitmap_font_IConfig {
        }
        /**
             * !#en Specifies how time is treated when it is outside of the keyframe range of an Animation.
             * !#zh 动画使用的循环模式。
             */ export enum cocos_animation_types_WrapMode {
            Default,
            Normal,
            Reverse,
            Loop,
            LoopReverse,
            PingPong,
            PingPongReverse
        }
        interface cocos_animation_animation_clip_IAnimationEvent {
            frame: number;
            func: string;
            params: string[];
        }
        export interface cocos_animation_animation_curve_ICurveTarget {
        }
        export type cocos_animation_animation_curve_CurveValue = any;
        export function cocos_animation_easing_constant(): number;
        export function cocos_animation_easing_linear(k: number): number;
        export function cocos_animation_easing_quadIn(k: number): number;
        export function cocos_animation_easing_quadOut(k: number): number;
        export function cocos_animation_easing_quadInOut(k: number): number;
        export function cocos_animation_easing_cubicIn(k: number): number;
        export function cocos_animation_easing_cubicOut(k: number): number;
        export function cocos_animation_easing_cubicInOut(k: number): number;
        export function cocos_animation_easing_quartIn(k: number): number;
        export function cocos_animation_easing_quartOut(k: number): number;
        export function cocos_animation_easing_quartInOut(k: number): number;
        export function cocos_animation_easing_quintIn(k: number): number;
        export function cocos_animation_easing_quintOut(k: number): number;
        export function cocos_animation_easing_quintInOut(k: number): number;
        export function cocos_animation_easing_sineIn(k: number): number;
        export function cocos_animation_easing_sineOut(k: number): number;
        export function cocos_animation_easing_sineInOut(k: number): number;
        export function cocos_animation_easing_expoIn(k: number): number;
        export function cocos_animation_easing_expoOut(k: number): number;
        export function cocos_animation_easing_expoInOut(k: number): number;
        export function cocos_animation_easing_circIn(k: number): number;
        export function cocos_animation_easing_circOut(k: number): number;
        export function cocos_animation_easing_circInOut(k: number): number;
        export function cocos_animation_easing_elasticIn(k: number): number;
        export function cocos_animation_easing_elasticOut(k: number): number;
        export function cocos_animation_easing_elasticInOut(k: number): number;
        export function cocos_animation_easing_backIn(k: number): number;
        export function cocos_animation_easing_backOut(k: number): number;
        export function cocos_animation_easing_backInOut(k: number): number;
        export function cocos_animation_easing_bounceIn(k: number): number;
        export function cocos_animation_easing_bounceOut(k: number): number;
        export function cocos_animation_easing_bounceInOut(k: number): number;
        export function cocos_animation_easing_smooth(k: number): number;
        export function cocos_animation_easing_fade(k: number): number;
        var cocos_animation_easing_quadOutIn: (k: number) => number;
        var cocos_animation_easing_cubicOutIn: (k: number) => number;
        var cocos_animation_easing_quartOutIn: (k: number) => number;
        var cocos_animation_easing_quintOutIn: (k: number) => number;
        var cocos_animation_easing_sineOutIn: (k: number) => number;
        var cocos_animation_easing_expoOutIn: (k: number) => number;
        var cocos_animation_easing_circOutIn: (k: number) => number;
        var cocos_animation_easing_backOutIn: (k: number) => number;
        var cocos_animation_easing_bounceOutIn: (k: number) => number;
        namespace cocos_animation_easing_cocos_animation_easing {
            export function cocos_animation_easing_constant(): number;
            export function cocos_animation_easing_linear(k: number): number;
            export function cocos_animation_easing_quadIn(k: number): number;
            export function cocos_animation_easing_quadOut(k: number): number;
            export function cocos_animation_easing_quadInOut(k: number): number;
            export function cocos_animation_easing_cubicIn(k: number): number;
            export function cocos_animation_easing_cubicOut(k: number): number;
            export function cocos_animation_easing_cubicInOut(k: number): number;
            export function cocos_animation_easing_quartIn(k: number): number;
            export function cocos_animation_easing_quartOut(k: number): number;
            export function cocos_animation_easing_quartInOut(k: number): number;
            export function cocos_animation_easing_quintIn(k: number): number;
            export function cocos_animation_easing_quintOut(k: number): number;
            export function cocos_animation_easing_quintInOut(k: number): number;
            export function cocos_animation_easing_sineIn(k: number): number;
            export function cocos_animation_easing_sineOut(k: number): number;
            export function cocos_animation_easing_sineInOut(k: number): number;
            export function cocos_animation_easing_expoIn(k: number): number;
            export function cocos_animation_easing_expoOut(k: number): number;
            export function cocos_animation_easing_expoInOut(k: number): number;
            export function cocos_animation_easing_circIn(k: number): number;
            export function cocos_animation_easing_circOut(k: number): number;
            export function cocos_animation_easing_circInOut(k: number): number;
            export function cocos_animation_easing_elasticIn(k: number): number;
            export function cocos_animation_easing_elasticOut(k: number): number;
            export function cocos_animation_easing_elasticInOut(k: number): number;
            export function cocos_animation_easing_backIn(k: number): number;
            export function cocos_animation_easing_backOut(k: number): number;
            export function cocos_animation_easing_backInOut(k: number): number;
            export function cocos_animation_easing_bounceIn(k: number): number;
            export function cocos_animation_easing_bounceOut(k: number): number;
            export function cocos_animation_easing_bounceInOut(k: number): number;
            export function cocos_animation_easing_smooth(k: number): number;
            export function cocos_animation_easing_fade(k: number): number;
            var cocos_animation_easing_quadOutIn: (k: number) => number;
            var cocos_animation_easing_cubicOutIn: (k: number) => number;
            var cocos_animation_easing_quartOutIn: (k: number) => number;
            var cocos_animation_easing_quintOutIn: (k: number) => number;
            var cocos_animation_easing_sineOutIn: (k: number) => number;
            var cocos_animation_easing_expoOutIn: (k: number) => number;
            var cocos_animation_easing_circOutIn: (k: number) => number;
            var cocos_animation_easing_backOutIn: (k: number) => number;
            var cocos_animation_easing_bounceOutIn: (k: number) => number;
        }
        export type cocos_animation_animation_curve_EasingMethodName = keyof (typeof cocos_animation_easing_cocos_animation_easing);
        type cocos_animation_animation_clip_EasingMethod = cocos_animation_animation_curve_EasingMethodName | number[];
        export type cocos_animation_motion_path_helper_MotionPath = Vec2[];
        interface cocos_animation_animation_clip_IPropertyCurveDataDetail {
            keys: number;
            values: cocos_animation_animation_curve_CurveValue[];
            easingMethod?: cocos_animation_animation_clip_EasingMethod;
            easingMethods?: cocos_animation_animation_clip_EasingMethod[];
            motionPaths?: cocos_animation_motion_path_helper_MotionPath | cocos_animation_motion_path_helper_MotionPath[];
        }
        type cocos_animation_animation_clip_PropertyCurveData = cocos_animation_animation_clip_IPropertyCurveDataDetail;
        export class cocos_animation_animation_curve_RatioSampler {
            ratios: number[];
            private _lastSampleRatio;
            private _lastSampleResult;
            private _findRatio;
            sample(ratio: number): number;
        }
        export type cocos_animation_animation_curve_LinearType = null;
        export type cocos_animation_animation_curve_BezierType = [number, number, number, number];
        export type cocos_animation_animation_curve_CurveType = cocos_animation_animation_curve_LinearType | cocos_animation_animation_curve_BezierType | cocos_animation_animation_curve_EasingMethodName;
        export type cocos_animation_animation_curve_LerpFunction<T = any> = (from: T, to: T, t: number) => T;
        export type cocos_animation_animation_blend_state_PropertyBlendState<T = any> = {
            name: string;
            weight: number;
            value?: T;
            refCount: number;
        };
        /**
             * If propertyBlendState.weight equals to zero, the propertyBlendState.value is dirty.
             * You shall handle this situation correctly.
             */ export type cocos_animation_animation_curve_BlendFunction<T> = (value: T, weight: number, propertyBlendState: cocos_animation_animation_blend_state_PropertyBlendState) => T;
        /**
             * 动画数据类，相当于 AnimationClip。
             * 虽然叫做 AnimCurve，但除了曲线，可以保存任何类型的值。
             */ export class cocos_animation_animation_curve_AnimCurve {
            onTimeChangedManually?(time: number, state: any): void;
            /**
                     * @param time
                     * @param ratio The normalized time specified as a number between 0.0 and 1.0 inclusive.
                     * @param state
                     */ sample(time: number, ratio: number, state: cocos_animation_animation_state_AnimationState): void;
        }
        /**
             * For internal
             */ export class cocos_animation_types_WrappedInfo {
            ratio: number;
            time: number;
            direction: number;
            stopped: boolean;
            iterations: number;
            frameIndex: number;
            set(info: cocos_animation_types_WrappedInfo): void;
        }
        export class cocos_animation_animation_blend_state_AnimationBlendState {
            private _blendTargets;
            refPropertyBlendTarget(target: cocos_animation_animation_curve_ICurveTarget, propertyName: string): cocos_animation_animation_blend_state_PropertyBlendState<any>;
            derefPropertyBlendTarget(target: cocos_animation_animation_curve_ICurveTarget, propertyName: string): void;
            apply(): void;
            clear(): void;
        }
        export class cocos_animation_playable_Playable {
            /**
                     * !#en Is playing or paused in play mode?
                     * !#zh 当前是否正在播放。
                     * @default false
                     */ readonly isPlaying: boolean;
            /**
                     * !#en Is currently paused? This can be true even if in edit mode(isPlaying == false).
                     * !#zh 当前是否正在暂停
                     * @default false
                     */ readonly isPaused: boolean;
            private _isPlaying;
            private _isPaused;
            private _stepOnce;
            /**
                     * !#en Play this animation.
                     * !#zh 播放动画。
                     */ play(): void;
            /**
                     * !#en Stop this animation.
                     * !#zh 停止动画播放。
                     */ stop(): void;
            /**
                     * !#en Pause this animation.
                     * !#zh 暂停动画。
                     */ pause(): void;
            /**
                     * !#en Resume this animation.
                     * !#zh 重新播放动画。
                     */ resume(): void;
            /**
                     * !#en Perform a single frame step.
                     * !#zh 执行一帧动画。
                     */ step(): void;
            update(deltaTime: number): void;
            protected onPlay(): void;
            protected onPause(): void;
            protected onResume(): void;
            protected onStop(): void;
            protected onError(message: string): void;
        }
        /**
             * !#en
             * The AnimationState gives full control over animation playback process.
             * In most cases the Animation Component is sufficient and easier to use. Use the AnimationState if you need full control.
             * !#zh
             * AnimationState 完全控制动画播放过程。<br/>
             * 大多数情况下 动画组件 是足够和易于使用的。如果您需要更多的动画控制接口，请使用 AnimationState。
             *
             */ export class cocos_animation_animation_state_AnimationState extends cocos_animation_playable_Playable {
            /**
                     * !#en The clip that is being played by this animation state.
                     * !#zh 此动画状态正在播放的剪辑。
                     */ readonly clip: cocos_animation_animation_clip_AnimationClip;
            /**
                     * !#en The name of the playing animation.
                     * !#zh 动画的名字
                     */ readonly name: string;
            readonly length: number;
            curveLoaded: boolean;
            /**
                     * !#en
                     * Wrapping mode of the playing animation.
                     * Notice : dynamic change wrapMode will reset time and repeatCount property
                     * !#zh
                     * 动画循环方式。
                     * 需要注意的是，动态修改 wrapMode 时，会重置 time 以及 repeatCount
                     * @default: WrapMode.Normal
                     */ wrapMode: cocos_animation_types_WrapMode;
            /**
                     * !#en The animation's iteration count property.
                     *
                     * A real number greater than or equal to zero (including positive infinity) representing the number of times
                     * to repeat the animation node.
                     *
                     * Values less than zero and NaN values are treated as the value 1.0 for the purpose of timing model
                     * calculations.
                     *
                     * !#zh 迭代次数，指动画播放多少次后结束, normalize time。 如 2.5（2次半）
                     *
                     * @property repeatCount
                     * @type {Number}
                     * @default 1
                     */ repeatCount: number;
            /**
                     * !#en The start delay which represents the number of seconds from an animation's start time to the start of
                     * the active interval.
                     * !#zh 延迟多少秒播放。
                     * @default 0
                     */ delay: number;
            /**
                     * !#en The curves list.
                     * !#zh 曲线列表。
                     */ curves: cocos_animation_animation_curve_AnimCurve[];
            /**
                     * !#en The iteration duration of this animation in seconds. (length)
                     * !#zh 单次动画的持续时间，秒。
                     * @readOnly
                     */ duration: number;
            /**
                     * !#en The animation's playback speed. 1 is normal playback speed.
                     * !#zh 播放速率。
                     * @default: 1.0
                     */ speed: number;
            /**
                     * !#en The current time of this animation in seconds.
                     * !#zh 动画当前的时间，秒。
                     * @default 0
                     */ time: number;
            /**
                     * The weight.
                     */ weight: number;
            frameRate: number;
            _lastframeEventOn: boolean;
            private _wrapMode;
            private _repeatCount;
            /**
                     * Mark whether the current frame is played.
                     * When set new time to animation state, we should ensure the frame at the specified time being played at next update.
                     */ private _currentFramePlayed;
            private _delay;
            private _delayTime;
            private _wrappedInfo;
            private _lastWrappedInfo;
            private _process;
            private _target;
            private _clip;
            private _name;
            private _lastIterations?;
            initialize(root: Node): void;
            _emit(type: any, state: any): void;
            emit(...restargs: any[]): void;
            on(type: any, callback: any, target: any): void | null;
            once(type: any, callback: any, target: any): void | null;
            off(type: any, callback: any, target: any): void;
            _setEventTarget(target: any): void;
            setTime(time: number): void;
            update(delta: number): void;
            _needReverse(currentIterations: number): boolean;
            getWrappedInfo(time: number, info?: cocos_animation_types_WrappedInfo): cocos_animation_types_WrappedInfo;
            sample(): cocos_animation_types_WrappedInfo;
            process(): void;
            simpleProcess(): void;
            attachToBlendState(blendState: cocos_animation_animation_blend_state_AnimationBlendState): void;
            detachFromBlendState(blendState: cocos_animation_animation_blend_state_AnimationBlendState): void;
            protected onPlay(): void;
            protected onStop(): void;
            protected onResume(): void;
            protected onPause(): void;
        }
        export class cocos_animation_animation_curve_DynamicAnimCurve extends cocos_animation_animation_curve_AnimCurve {
            static Linear: null;
            static Bezier(controlPoints: number[]): [number, number, number, number];
            /**
                     * The object being animated.
                     */ target: cocos_animation_animation_curve_ICurveTarget | null;
            /**
                     * The name of the property being animated.
                     */ prop: string;
            /**
                     * The values of the keyframes. (y)
                     */ values: cocos_animation_animation_curve_CurveValue[];
            /**
                     * The keyframe ratio of the keyframe specified as a number between 0.0 and 1.0 inclusive. (x)
                     * A null ratio indicates a zero or single frame curve.
                     */ ratioSampler: cocos_animation_animation_curve_RatioSampler | null;
            types?: cocos_animation_animation_curve_CurveType[];
            type?: cocos_animation_animation_curve_CurveType;
            /**
                     * Lerp function used. If undefined, no lerp is performed.
                     */ _lerp: cocos_animation_animation_curve_LerpFunction | undefined;
            _blendFunction: cocos_animation_animation_curve_BlendFunction<any> | undefined;
            private _propertyBlendTarget;
            setPropertyBlendTarget(value: cocos_animation_animation_blend_state_PropertyBlendState<any> | null): void;
            sample(time: number, ratio: number, state: cocos_animation_animation_state_AnimationState): void;
        }
        interface cocos_animation_animation_clip_ICurveData {
            props?: {};
            comps?: {};
        }
        export class cocos_animation_animation_clip_AnimationClip extends Asset {
            static WrapMode: typeof cocos_animation_types_WrapMode;
            /**
                     * !#en Duration of this animation.
                     * !#zh 动画的持续时间。
                     */ readonly duration: number;
            /**
                     * !#en Crate clip with a set of sprite frames
                     * !#zh 使用一组序列帧图片来创建动画剪辑
                     * @example
                     * const clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);
                     *
                     */ static createWithSpriteFrames(spriteFrames: SpriteFrame[], sample: number): cocos_animation_animation_clip_AnimationClip | null;
            /**
                     * !#en FrameRate of this animation.
                     * !#zh 动画的帧速率。
                     */ sample: number;
            /**
                     * !#en Speed of this animation.
                     * !#zh 动画的播放速度。
                     */ speed: number;
            /**
                     * !#en WrapMode of this animation.
                     * !#zh 动画的循环模式。
                     */ wrapMode: cocos_animation_types_WrapMode;
            /**
                     * !#en Curve data.
                     * !#zh 曲线数据。
                     * @example {@link cocos2d/core/animation-clip/curve-data.js}
                     */ curveDatas: {};
            /**
                     * !#en Event data.
                     * !#zh 事件数据。
                     * @example {@link cocos2d/core/animation-clip/event-data.js}
                     * @typescript events: {frame: number, func: string, params: string[]}[]
                     */ events: cocos_animation_animation_clip_IAnimationEvent[];
            private _duration;
            private _keys;
            private _ratioSamplers;
            private frameRate;
            onLoad(): void;
            createPropCurve(target: cocos_animation_animation_curve_ICurveTarget, propPath: string, propertyCurveData: cocos_animation_animation_clip_PropertyCurveData): cocos_animation_animation_curve_DynamicAnimCurve;
            createTargetCurves(target: cocos_animation_animation_curve_ICurveTarget, curveData: cocos_animation_animation_clip_ICurveData, curves: cocos_animation_animation_curve_DynamicAnimCurve[]): void;
            createCurves(state: cocos_animation_animation_state_AnimationState, root: Node): cocos_animation_animation_curve_DynamicAnimCurve[];
        }
        /**
             * !#en The event type supported by Animation
             * !#zh Animation 支持的事件类型
             */ export enum cocos_components_animation_component_EventType {
            PLAY,
            STOP,
            PAUSE,
            RESUME,
            LASTFRAME,
            FINISHED
        }
        export type cocos_core_event_event_target_factory_IEventTargetCallback = (...args: any[]) => void;
        var cocos_components_animation_component_AnimationComponent_base: {} & typeof Component;
        export interface cocos_3d_physics_api_ShapeBase {
            setCenter(center: Vec3): void;
            setScale(scale: Vec3): void;
            setRotation(rotation: Quat): void;
            getUserData(): any;
            setUserData(data: any): void;
            getCollisionResponse(): boolean;
            setCollisionResponse(value: boolean): void;
        }
        export enum cocos_3d_physics_physic_enum_ERigidBodyType {
            DYNAMIC,
            STATIC,
            KINEMATIC
        }
        export type cocos_3d_physics_api_BeforeStepCallback = () => void;
        export type cocos_3d_physics_api_AfterStepCallback = () => void;
        export interface cocos_3d_physics_api_IRaycastOptions {
            collisionFilterMask?: number;
            collisionFilterGroup?: number;
            queryTriggerInteraction?: boolean;
        }
        export interface cocos_3d_physics_api_PhysicsWorldBase {
            step(deltaTime: number): void;
            addBeforeStep(cb: cocos_3d_physics_api_BeforeStepCallback): void;
            removeBeforeStep(cb: cocos_3d_physics_api_BeforeStepCallback): void;
            addAfterStep(cb: cocos_3d_physics_api_AfterStepCallback): void;
            removeAfterStep(cb: cocos_3d_physics_api_AfterStepCallback): void;
            /**
                     * Ray cast, and return information of the closest hit.
                     * @return True if any body was hit.
                     */ raycastClosest(from: Vec3, to: Vec3, options: cocos_3d_physics_api_IRaycastOptions, result: cocos_3d_physics_raycast_result_RaycastResult): boolean;
            /**
                     * Ray cast, and stop at the first result. Note that the order is random - but the method is fast.
                     * @return True if any body was hit.
                     */ raycastAny(from: Vec3, to: Vec3, options: cocos_3d_physics_api_IRaycastOptions, result: cocos_3d_physics_raycast_result_RaycastResult): boolean;
            /**
                     * Ray cast against all bodies. The provided callback will be executed for each hit with a RaycastResult as single argument.
                     * @return True if any body was hit.
                     */ raycastAll(from: Vec3, to: Vec3, options: cocos_3d_physics_api_IRaycastOptions, callback: (result: cocos_3d_physics_raycast_result_RaycastResult) => void): boolean;
        }
        export interface cocos_3d_physics_api_ICollisionEvent {
            source: cocos_3d_physics_api_RigidBodyBase;
            target: cocos_3d_physics_api_RigidBodyBase;
        }
        export type cocos_3d_physics_api_ICollisionCallback = (event: cocos_3d_physics_api_ICollisionEvent) => void;
        export interface cocos_3d_physics_api_RigidBodyBase {
            /** 获取/设置刚体类型 : ERigidBodyType */ getType(): cocos_3d_physics_physic_enum_ERigidBodyType;
            setType(v: cocos_3d_physics_physic_enum_ERigidBodyType): void;
            /** 唤醒/睡眠刚体 */ wakeUp(): void;
            sleep(): void;
            addShape(shape: cocos_3d_physics_api_ShapeBase): void;
            removeShape(shape: cocos_3d_physics_api_ShapeBase): void;
            getMass(): number;
            setMass(value: number): void;
            applyForce(force: Vec3, position?: Vec3): void;
            applyImpulse(impulse: Vec3, position?: Vec3): void;
            getIsKinematic(): boolean;
            setIsKinematic(value: boolean): void;
            getLinearDamping(): number;
            setLinearDamping(value: number): void;
            getAngularDamping(): number;
            setAngularDamping(value: number): void;
            getUseGravity(): boolean;
            setUseGravity(value: boolean): void;
            getIsTrigger(): boolean;
            setIsTrigger(value: boolean): void;
            getVelocity(): Vec3;
            setVelocity(value: Vec3): void;
            getFreezeRotation(): boolean;
            setFreezeRotation(value: boolean): void;
            /**
                     * Set the collision filter of this body, remember that they are tested bitwise.
                     * @param group The group which this body will be put into.
                     * @param mask The groups which this body can collide with.
                     */ setCollisionFilter(group: number, mask: number): void;
            setWorld(world: cocos_3d_physics_api_PhysicsWorldBase | null): void;
            commitShapeUpdates(): void;
            isPhysicsManagedTransform(): boolean;
            getPosition(out: Vec3): void;
            setPosition(value: Vec3): void;
            getRotation(out: Quat): void;
            setRotation(out: Quat): void;
            scaleAllShapes(scale: Vec3): void;
            addCollisionCallback(callback: cocos_3d_physics_api_ICollisionCallback): void;
            removeCollisionCllback(callback: cocos_3d_physics_api_ICollisionCallback): void;
            getUserData(): any;
            setUserData(data: any): void;
        }
        export class cocos_3d_physics_raycast_result_RaycastResult {
            readonly hitPoint: Vec3;
            readonly distance: number;
            readonly collider: Component;
            readonly node: Node;
            private _hitPoint;
            private _distance;
            private _collidier;
            private _node;
            _assign(hitPoint: vmath.vec3, distance: number, shape: cocos_3d_physics_api_ShapeBase, body: cocos_3d_physics_api_RigidBodyBase): void;
        }
        export interface cocos_3d_primitive_define_IGeometry {
            /**
                     * Vertex positions.
                     */ positions: number[];
            /**
                     * Min position.
                     */ minPos?: {
                x: number;
                y: number;
                z: number;
            };
            /**
                     * Max position.
                     */ maxPos?: {
                x: number;
                y: number;
                z: number;
            };
            /**
                     * Bounding sphere radius.
                     */ boundingRadius?: number;
            /**
                     * Gemetry indices, if one needs indexed-draw.
                     */ indices?: number[];
            /**
                     * Vertex normals.
                     */ normals?: number[];
            /**
                     * Texture coordinates.
                     */ uvs?: number[];
            /**
                     * Vertex colors.
                     */ colors?: number[];
            /**
                     * Topology of the geometry vertices. Default is TRIANGLE_LIST.
                     */ primitiveMode?: cocos_gfx_define_GFXPrimitiveMode;
            /**
                     * whether rays casting from the back face of this geometry could collide with it
                     */ doubleSided?: boolean;
            /**
                     * specify vertex attributes, use (positions|normals|uvs|colors) as keys
                     */ attributes?: cocos_gfx_input_assembler_IGFXAttribute[];
        }
        export interface cocos_3d_primitive_define_IGeometryOptions {
            /**
                     * Whether to include normal. Default to true.
                     */ includeNormal: boolean;
            /**
                     * Whether to include uv. Default to true.
                     */ includeUV: boolean;
        }
        interface cocos_3d_primitive_box_IBoxOptions extends RecursivePartial<cocos_3d_primitive_define_IGeometryOptions> {
            /**
                     * Box extent on X-axis.
                     */ width?: number;
            /**
                     * Box extent on Y-axis.
                     */ height?: number;
            /**
                     * Box extent on Z-axis.
                     */ length?: number;
            /**
                     * Segment count on X-axis.
                     */ widthSegments?: number;
            /**
                     * Segment count on Y-axis.
                     */ heightSegments?: number;
            /**
                     * Segment count on Z-axis.
                     */ lengthSegments?: number;
        }
        export interface cocos_3d_primitive_cylinder_ICylinderOptions extends cocos_3d_primitive_define_IGeometryOptions {
            radialSegments: number;
            heightSegments: number;
            capped: boolean;
            arc: number;
        }
        type cocos_3d_primitive_cone_IConeOptions = cocos_3d_primitive_cylinder_ICylinderOptions;
        interface cocos_3d_primitive_plane_IPlaneOptions extends RecursivePartial<cocos_3d_primitive_define_IGeometryOptions> {
            /**
                     * Plane extent on X-axis.
                     */ width: number;
            /**
                     * Plane extent on Z-axis.
                     */ length: number;
            /**
                     * Segment count on X-axis.
                     */ widthSegments: number;
            /**
                     * Segment count on Z-axis.
                     */ lengthSegments: number;
        }
        interface cocos_3d_primitive_sphere_ISphereOptions extends cocos_3d_primitive_define_IGeometryOptions {
            segments: number;
        }
        interface cocos_3d_primitive_torus_ITorusOptions extends cocos_3d_primitive_define_IGeometryOptions {
            radialSegments: number;
            tubularSegments: number;
            arc: number;
        }
        export interface cocos_3d_primitive_capsule_ICapsuteOptions {
            sides: number;
            heightSegments: number;
            capped: boolean;
            arc: number;
        }
        interface cocos_3d_primitive_circle_ICircleOptions extends cocos_3d_primitive_define_IGeometryOptions {
            segments: number;
        }
        class cocos_3d_geom_utils_octree_OctreeBlock {
            minPos: vmath.vec3;
            maxPos: vmath.vec3;
            boundingBox: geometry.aabb;
            capacity: number;
            depth: number;
            maxDepth: number;
            blocks: null | cocos_3d_geom_utils_octree_OctreeBlock[];
            entries: FixedArray;
            private _getBoundingShape;
            addEntry(entry: any): void;
            removeEntry(entry: any): void;
            select(out: any, shape: any): void;
            frustumSelect(out: any, frustum: any): void;
        }
        export class cocos_3d_geom_utils_curve_OptimizedKey {
            index: number;
            time: number;
            endTime: number;
            coefficient: Float32Array;
            evaluate(T: number): number;
        }
        var cocos_3d_assets_audio_clip_AudioClip_base: {} & typeof Asset;
        export interface cocos_3d_assets_effect_asset_ITechniqueInfo {
            passes: cocos_3d_assets_effect_asset_IPassInfo[];
            name?: string;
        }
        export interface cocos_3d_assets_material_IMaterialInfo {
            technique?: number;
            defines?: cocos_renderer_core_pass_IDefineMap | cocos_renderer_core_pass_IDefineMap[];
            states?: cocos_renderer_core_pass_PassOverrides | cocos_renderer_core_pass_PassOverrides[];
            effectAsset?: EffectAsset | null;
            effectName?: string;
        }
        /****************************************************************************
             Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
            
             http://www.cocos.com
            
             Permission is hereby granted, free of charge, to any person obtaining a copy
             of this software and associated engine source code (the "Software"), a limited,
              worldwide, royalty-free, non-assignable, revocable and non-exclusive license
             to use Cocos Creator solely to develop games on your target platforms. You shall
              not use Cocos Creator software for developing other software or tools that's
              used for developing games. You are not granted to publish, distribute,
              sublicense, and/or sell copies of Cocos Creator.
            
             The software or tools in this License Agreement are licensed, not sold.
             Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
            
             THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
             THE SOFTWARE.
             ****************************************************************************/ export interface cocos_3d_assets_utils_buffer_view_IBufferView {
            offset: number;
            length: number;
            count: number;
            stride: number;
        }
        export interface cocos_3d_assets_mesh_IVertexBundle {
            /**
                     * The data view of this bundle.
                     * This range of data is essentially mapped to a GPU vertex buffer.
                     */ view: cocos_3d_assets_utils_buffer_view_IBufferView;
            /**
                     * Attributes.
                     */ attributes: cocos_gfx_input_assembler_IGFXAttribute[];
        }
        /**
             * A primitive is a geometry constituted with a list of
             * same topology primitive graphic(such as points, lines or triangles).
             */ export interface cocos_3d_assets_mesh_IPrimitive {
            /**
                     * The vertex bundles that this primitive use.
                     */ vertexBundelIndices: number[];
            /**
                     * This primitive's topology.
                     */ primitiveMode: cocos_gfx_define_GFXPrimitiveMode;
            indexView?: cocos_3d_assets_utils_buffer_view_IBufferView;
            /**
                     * Geometric info for raycast purposes.
                     */ geometricInfo?: {
                doubleSided?: boolean;
                view: cocos_3d_assets_utils_buffer_view_IBufferView;
            };
        }
        /**
             * Describes a mesh.
             */ export interface cocos_3d_assets_mesh_IMeshStruct {
            /**
                     * The vertex bundles that this mesh owns.
                     */ vertexBundles: cocos_3d_assets_mesh_IVertexBundle[];
            /**
                     * The primitives that this mesh owns.
                     */ primitives: cocos_3d_assets_mesh_IPrimitive[];
            /**
                     * The min position of this mesh's vertices.
                     */ minPosition?: Vec3;
            /**
                     * The max position of this mesh's vertices.
                     */ maxPosition?: Vec3;
        }
        export class cocos_3d_assets_mesh_RenderingMesh {
            private _subMeshes;
            private _vertexBuffers;
            private _indexBuffers;
            readonly subMeshes: cocos_3d_assets_mesh_IRenderingSubmesh[];
            readonly subMeshCount: number;
            getSubmesh(index: number): cocos_3d_assets_mesh_IRenderingSubmesh;
            destroy(): void;
        }
        export enum cocos_gfx_define_GFXAttributeName {
            ATTR_POSITION,
            ATTR_NORMAL,
            ATTR_TANGENT,
            ATTR_BITANGENT,
            ATTR_WEIGHTS,
            ATTR_JOINTS,
            ATTR_COLOR,
            ATTR_COLOR1,
            ATTR_COLOR2,
            ATTR_TEX_COORD,
            ATTR_TEX_COORD1,
            ATTR_TEX_COORD2,
            ATTR_TEX_COORD3,
            ATTR_TEX_COORD4,
            ATTR_TEX_COORD5,
            ATTR_TEX_COORD6,
            ATTR_TEX_COORD7,
            ATTR_TEX_COORD8
        }
        class cocos_3d_builtin_init_BuiltinResMgr {
            protected _device: cocos_gfx_device_GFXDevice | null;
            protected _resources: Record<string, Asset>;
            initBuiltinRes(device: cocos_gfx_device_GFXDevice): void;
            get<T extends Asset>(uuid: string): T;
        }
        export enum cocos_3d_physics_physic_enum_ETransformSource {
            SCENE,
            PHYSIC
        }
        class cocos_3d_framework_physics_detail_physics_based_component_SharedRigidBody {
            private _body;
            private _refCount;
            private _actived;
            private _world;
            private _node;
            private _worldScale;
            private _beforeStepCallback;
            private _afterStepCallback;
            private _onCollidedCallback;
            private _transformInitialized;
            /** 是否只有Collider组件 */ private _isShapeOnly;
            /** 上一次的缩放 */ private _prevScale;
            readonly body: cocos_3d_physics_api_RigidBodyBase;
            /** 设置场景与物理之间的同步关系 */ transfromSource: cocos_3d_physics_physic_enum_ETransformSource;
            ref(): void;
            deref(): void;
            enable(): void;
            disable(): void;
            syncPhysWithScene(node: Node): void;
            /**
                     * Push the rigidbody's transform information back to node.
                     */ private _syncSceneWithPhys;
            private _activeBody;
            private _deactiveBody;
            private _onCollided;
            private _beforeStep;
            private _afterStep;
        }
        export class cocos_3d_framework_physics_detail_physics_based_component_PhysicsBasedComponent extends Component {
            protected readonly _body: cocos_3d_physics_api_RigidBodyBase | null;
            protected readonly sharedBody: cocos_3d_framework_physics_detail_physics_based_component_SharedRigidBody | null;
            private _sharedBody;
            __preload(): void;
            onEnable(): void;
            onDisable(): void;
            destroy(): void;
            private _refSharedBody;
        }
        export class cocos_3d_framework_physics_collider_component_ColliderComponentBase extends cocos_3d_framework_physics_detail_physics_based_component_PhysicsBasedComponent {
            protected _shapeBase: cocos_3d_physics_api_ShapeBase;
            private _triggered;
            isTrigger: boolean;
            private _center;
            /**
                     * The center of the collider, in local space.
                     */ center: Vec3;
            __preload(): void;
            onLoad(): void;
            onEnable(): void;
            onDisable(): void;
            destroy(): void;
        }
        export class cocos_3d_framework_particle_animator_gradient_ColorKey {
            color: any;
            time: number;
        }
        export class cocos_3d_framework_particle_animator_gradient_AlphaKey {
            alpha: number;
            time: number;
        }
        export class cocos_3d_framework_particle_animator_gradient_default {
            colorKeys: cocos_3d_framework_particle_animator_gradient_ColorKey[];
            alphaKeys: cocos_3d_framework_particle_animator_gradient_AlphaKey[];
            mode: any;
            private _color;
            setKeys(colorKeys: cocos_3d_framework_particle_animator_gradient_ColorKey[], alphaKeys: cocos_3d_framework_particle_animator_gradient_AlphaKey[]): void;
            sortKeys(): void;
            private getRGB;
            private getAlpha;
            evaluate(time: number): Color;
            randomColor(): Color;
        }
        export class cocos_3d_framework_particle_animator_gradient_range_default {
            private _mode;
            mode: any;
            color: any;
            colorMin: any;
            colorMax: any;
            gradient: cocos_3d_framework_particle_animator_gradient_default;
            gradientMin: cocos_3d_framework_particle_animator_gradient_default;
            gradientMax: cocos_3d_framework_particle_animator_gradient_default;
            evaluate(time: number, rndRatio: number): any;
        }
        export class cocos_3d_framework_particle_animator_curve_range_default {
            mode: any;
            curve: geometry.AnimationCurve;
            curveMin: geometry.AnimationCurve;
            curveMax: geometry.AnimationCurve;
            constant: number;
            constantMin: number;
            constantMax: number;
            multiplier: number;
            evaluate(time: number, rndRatio: number): number | undefined;
            getMax(): number;
        }
        export class cocos_3d_framework_particle_particle_default {
            particleSystem: ParticleSystemComponent;
            position: vmath.vec3;
            velocity: vmath.vec3;
            animatedVelocity: vmath.vec3;
            ultimateVelocity: vmath.vec3;
            angularVelocity: vmath.vec3;
            axisOfRotation: vmath.vec3;
            rotation: vmath.vec3;
            startSize: vmath.vec3;
            size: vmath.vec3;
            startColor: Color;
            color: any;
            randomSeed: number;
            remainingLifetime: number;
            startLifetime: number;
            emitAccumulator0: number;
            emitAccumulator1: number;
            frameIndex: number;
        }
        export class cocos_3d_framework_particle_animator_color_overtime_default {
            /**
                     * 是否启用
                     */ enable: boolean;
            /**
                     * 颜色随时间变化的参数，各个 key 之间线性差值变化
                     */ color: cocos_3d_framework_particle_animator_gradient_range_default;
            animate(particle: cocos_3d_framework_particle_particle_default): void;
        }
        export class cocos_3d_framework_particle_emitter_shape_module_default {
            /**
                     * 是否启用
                     */ enable: boolean;
            /**
                     * 粒子发射器类型
                     */ shapeType: any;
            /**
                     * 粒子从发射器哪个部位发射
                     */ emitFrom: any;
            private _position;
            /**
                     * 粒子发射器位置
                     */ position: Vec3;
            private _rotation;
            /**
                     * 粒子发射器旋转角度
                     */ rotation: Vec3;
            private _scale;
            /**
                     * 粒子发射器缩放比例
                     */ scale: Vec3;
            /**
                     * 根据粒子的初始方向决定粒子的移动方向
                     */ alignToDirection: boolean;
            /**
                     * 粒子生成方向随机设定
                     */ randomDirectionAmount: number;
            /**
                     * 表示当前发射方向与当前位置到结点中心连线方向的插值
                     */ sphericalDirectionAmount: number;
            /**
                     * 粒子生成位置随机设定（设定此值为非 0 会使粒子生成位置超出生成器大小范围）
                     */ randomPositionAmount: number;
            /**
                     * 粒子发射器半径
                     */ radius: number;
            /**
                     * 粒子发射器发射位置（对 Box 类型的发射器无效）<bg>
                     * 0 表示从表面发射
                     * 1 表示从中心发射
                     * 0 ~ 1 之间表示在中心到表面之间发射
                     */ radiusThickness: number;
            private _arc;
            /**
                     * 粒子发射器在一个扇形范围内发射
                     */ arc: number;
            /**
                     * 粒子在扇形范围内的发射方式
                     */ arcMode: any;
            /**
                     * 控制可能产生粒子的弧周围的离散间隔。
                     */ arcSpread: number;
            /**
                     * 粒子沿圆周发射的速度
                     */ arcSpeed: cocos_3d_framework_particle_animator_curve_range_default;
            private _angle;
            /**
                     * 圆锥的轴与母线的夹角<bg>
                     * 决定圆锥发射器的开合程度
                     */ angle: number;
            /**
                     * 圆锥顶部截面距离底部的轴长<bg>
                     * 决定圆锥发射器的高度
                     */ length: number;
            /**
                     * 粒子发射器发射位置（针对 Box 类型的粒子发射器）
                     */ boxThickness: Vec3;
            private mat;
            private quat;
            private particleSystem;
            private lastTime;
            private totalAngle;
            onInit(ps: ParticleSystemComponent): void;
            private constructMat;
            emit(p: any): void;
            private generateArcAngle;
        }
        export class cocos_3d_framework_particle_animator_size_overtime_default {
            /**
                     * 是否启用
                     */ enable: boolean;
            /**
                     * 决定是否在每个轴上独立控制粒子大小
                     */ separateAxes: boolean;
            /**
                     * 定义一条曲线来决定粒子在其生命周期中的大小变化
                     */ size: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 定义一条曲线来决定粒子在其生命周期中 X 轴方向上的大小变化
                     */ x: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 定义一条曲线来决定粒子在其生命周期中 Y 轴方向上的大小变化
                     */ y: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 定义一条曲线来决定粒子在其生命周期中 Z 轴方向上的大小变化
                     */ z: cocos_3d_framework_particle_animator_curve_range_default;
            animate(particle: cocos_3d_framework_particle_particle_default): void;
        }
        export class cocos_3d_framework_particle_animator_velocity_overtime_default {
            /**
                     * 是否启用
                     */ enable: boolean;
            /**
                     * X 轴方向上的速度分量
                     */ x: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * Y 轴方向上的速度分量
                     */ y: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * Z 轴方向上的速度分量
                     */ z: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 速度修正系数（只支持 CPU 粒子）
                     */ speedModifier: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 速度计算时采用的坐标系
                     */ space: any;
            private rotation;
            private needTransform;
            update(space: number, worldTransform: vmath.mat4): void;
            animate(p: cocos_3d_framework_particle_particle_default): void;
        }
        export class cocos_3d_framework_particle_animator_force_overtime_default {
            /**
                     * 是否启用
                     */ enable: boolean;
            /**
                     * X 轴方向上的加速度分量
                     */ x: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * Y 轴方向上的加速度分量
                     */ y: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * Z 轴方向上的加速度分量
                     */ z: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 加速度计算时采用的坐标系
                     */ space: any;
            randomized: boolean;
            private rotation;
            private needTransform;
            update(space: any, worldTransform: any): void;
            animate(p: any, dt: any): void;
        }
        export class cocos_3d_framework_particle_animator_limit_velocity_overtime_default {
            /**
                     * 是否启用
                     */ enable: boolean;
            /**
                     * X 轴方向上的速度下限
                     */ limitX: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * Y 轴方向上的速度下限
                     */ limitY: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * Z 轴方向上的速度下限
                     */ limitZ: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 速度下限
                     */ limit: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 当前速度与速度下限的插值
                     */ dampen: number;
            /**
                     * 是否三个轴分开限制
                     */ separateAxes: boolean;
            /**
                     * 计算速度下限时采用的坐标系
                     */ space: any;
            drag: null;
            multiplyDragByParticleSize: boolean;
            multiplyDragByParticleVelocity: boolean;
            animate(p: cocos_3d_framework_particle_particle_default): void;
        }
        export class cocos_3d_framework_particle_animator_rotation_overtime_default {
            /**
                     * 是否启用
                     */ enable: boolean;
            private _separateAxes;
            /**
                     * 是否三个轴分开设定旋转（暂不支持）
                     */ separateAxes: boolean;
            /**
                     * 绕 X 轴设定旋转
                     */ x: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 绕 Y 轴设定旋转
                     */ y: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 绕 X 轴设定旋转
                     */ z: cocos_3d_framework_particle_animator_curve_range_default;
            animate(p: cocos_3d_framework_particle_particle_default, dt: number): void;
        }
        export class cocos_3d_framework_particle_animator_texture_animation_default {
            private _enable;
            /**
                     * 是否启用
                     */ enable: boolean;
            private _mode;
            /**
                     * 设定粒子贴图动画的类型（暂只支持 Grid 模式）
                     */ mode: any;
            /**
                     * X 方向动画帧数
                     */ numTilesX: number;
            /**
                     * Y 方向动画帧数
                     */ numTilesY: number;
            /**
                     * 动画播放方式
                     */ animation: any;
            /**
                     * 一个周期内动画播放的帧与时间变化曲线
                     */ frameOverTime: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 从第几帧开始播放，时间为整个粒子系统的生命周期
                     */ startFrame: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 一个生命周期内播放循环的次数
                     */ cycleCount: number;
            private _flipU;
            flipU: number;
            private _flipV;
            flipV: number;
            private _uvChannelMask;
            uvChannelMask: number;
            /**
                     * 随机从动画贴图中选择一行以生成动画
                     * 此选项仅在动画播放方式为 SingleRow 时生效
                     */ randomRow: boolean;
            /**
                     * 从动画贴图中选择特定行以生成动画
                     * 此选项仅在动画播放方式为 SingleRow 时且禁用 randomRow 时可用
                     */ rowIndex: number;
            private ps;
            onInit(ps: ParticleSystemComponent): void;
            animate(p: cocos_3d_framework_particle_particle_default): void;
        }
        export class cocos_3d_framework_particle_renderer_trail_default {
            /**
                     * 是否启用
                     */ enable: boolean;
            _enable: boolean;
            /**
                     * 设定粒子生成轨迹的方式
                     */ mode: any;
            /**
                     * 设定粒子中生成轨迹的比例
                     */ ratio: number;
            /**
                     * 轨迹存在的生命周期
                     */ lifeTime: cocos_3d_framework_particle_animator_curve_range_default;
            /**
                     * 每个轨迹粒子之间的最小间距
                     */ minParticleDistance: number;
            _minParticleDistance: number;
            /**
                     * 轨迹设定时的坐标系
                     */ space: any;
            /**
                     * 粒子本身是否存在
                     */ existWithParticles: boolean;
            /**
                     * 设定纹理填充方式
                     */ textureMode: any;
            /**
                     * 控制轨迹长度的曲线
                     */ widthRatio: cocos_3d_framework_particle_animator_curve_range_default;
            private _particleSystem;
            private _minSquaredDistance;
            private _vertSize;
            private _trailNum;
            private _trailLifetime;
            private vbOffset;
            private ibOffset;
            private _trailSegments;
            private _particleTrail;
            private _trailModel;
            private _iaInfo;
            private _iaInfoBuffer;
            private _subMeshData;
            private _vertAttrs;
            private _vbF32;
            private _vbUint32;
            private _iBuffer;
            init(ps: any): void;
            onEnable(): void;
            onDisable(): void;
            destroy(): void;
            private _createModel;
            _updateMaterial(): void;
            update(): void;
            animate(p: cocos_3d_framework_particle_particle_default, scaledDt: number): void;
            private _updateTrailElement;
            removeParticle(p: cocos_3d_framework_particle_particle_default): void;
            updateRenderData(): void;
            private _fillVertexBuffer;
            updateIA(count: number): void;
        }
        interface cocos_3d_memop_linked_array_INode {
            _prev: cocos_3d_memop_linked_array_INode;
            _next: cocos_3d_memop_linked_array_INode;
        }
        /**
             * !#en Enum for transition type.
             * !#zh 过渡类型
             * @enum Button.Transition
             */ enum cocos_3d_ui_components_button_component_Transition {
            NONE,
            COLOR,
            SPRITE,
            SCALE
        }
        /**
             * !#en Enum for keyboard return types
             * !#zh 键盘的返回键类型
             * @readonly
             * @enum EditBox.KeyboardReturnType
             */ export enum cocos_3d_ui_components_editbox_types_KeyboardReturnType {
            DEFAULT,
            DONE,
            SEND,
            SEARCH,
            GO,
            NEXT
        }
        /**
             * !#en Enum for the EditBox's input flags
             * !#zh 定义了一些用于设置文本显示和文本格式化的标志位。
             * @readonly
             * @enum EditBox.InputFlag
             */ export enum cocos_3d_ui_components_editbox_types_InputFlag {
            PASSWORD,
            SENSITIVE,
            INITIAL_CAPS_WORD,
            INITIAL_CAPS_SENTENCE,
            INITIAL_CAPS_ALL_CHARACTERS,
            DEFAULT
        }
        /**
             * !#en The EditBox's InputMode defines the type of text that the user is allowed to enter.
             * !#zh 输入模式
             * @readonly
             * @enum EditBox.InputMode
             */ export enum cocos_3d_ui_components_editbox_types_InputMode {
            ANY,
            EMAIL_ADDR,
            NUMERIC,
            PHONE_NUMBER,
            URL,
            DECIMAL,
            SINGLE_LINE
        }
        export class cocos_3d_ui_components_editbox_edit_box_impl_EditBoxImpl {
            _delegate: EditBoxComponent | null;
            _inputMode: number;
            _inputFlag: number;
            _returnType: cocos_3d_ui_components_editbox_types_KeyboardReturnType;
            _maxLength: number;
            _text: string;
            _placeholderText: string;
            _alwaysOnTop: boolean;
            _size: Size;
            _node: Node | null;
            _editing: boolean;
            __eventListeners: any;
            __fullscreen: boolean;
            __autoResize: boolean;
            __rotateScreen: boolean;
            __orientationChanged: any;
            _edTxt: HTMLInputElement | HTMLTextAreaElement | null;
            _textColor: Color;
            _edFontSize: number;
            text: string;
            readonly textColor: Color;
            readonly fontSize: number;
            returnType: cocos_3d_ui_components_editbox_types_KeyboardReturnType;
            readonly alwayOnTop: boolean;
            editing: boolean;
            readonly delegate: EditBoxComponent | null;
            readonly eventListeners: any;
            onEnable(): void;
            onDisable(): void;
            setTabIndex(index: any): void;
            setFocus(): void;
            isFocused(): boolean;
            stayOnTop(flag: any): void;
            setMaxLength(maxLength: any): void;
            setString(text: any): void;
            getString(): string;
            setPlaceholderText(text: string): void;
            getPlaceholderText(): string;
            setDelegate(delegate: EditBoxComponent | null): void;
            setInputMode(inputMode: cocos_3d_ui_components_editbox_types_InputMode): void;
            setInputFlag(inputFlag: cocos_3d_ui_components_editbox_types_InputFlag): void;
            setReturnType(returnType: cocos_3d_ui_components_editbox_types_KeyboardReturnType): void;
            setFontSize(fontSize: number): void;
            setFontColor(color: Color): void;
            setSize(width: number, height: number): void;
            setNode(node: Node): void;
            update(): void;
            clear(): void;
            _onTouchBegan(touch: any): void;
            _onTouchEnded(): void;
            _beginEditing(): void;
            _endEditing(): void;
            _updateDomInputType(): void;
            _updateSize(newWidth: any, newHeight: any): void;
            _updateMatrix(): false | undefined;
            _adjustEditBoxPosition(): void;
            createInput(): void;
            _beginEditingOnMobile(): void;
            _endEditingOnMobile(): void;
            _createDomInput(): HTMLInputElement;
            _createDomTextArea(): HTMLTextAreaElement;
            _addDomToGameContainer(): void;
            removeDom(): void;
        }
        /**
             * !#en Enum for Layout type
             * !#zh 布局类型
             * @enum Layout.Type
             */ enum cocos_3d_ui_components_layout_component_Type {
            NONE,
            HORIZONTAL,
            VERTICAL,
            GRID
        }
        /**
             * !#en Enum for Layout Resize Mode
             * !#zh 缩放模式
             * @enum Layout.ResizeMode
             */ enum cocos_3d_ui_components_layout_component_ResizeMode {
            NONE,
            CONTAINER,
            CHILDREN
        }
        /**
             * !#en Enum for Grid Layout start axis direction.
             * The items in grid layout will be arranged in each axis at first.;
             * !#zh 布局轴向，只用于 GRID 布局。
             * @enum Layout.AxisDirection
             */ enum cocos_3d_ui_components_layout_component_AxisDirection {
            HORIZONTAL,
            VERTICAL
        }
        /**
             * !#en Enum for vertical layout direction.
             *  Used in Grid Layout together with AxisDirection is VERTICAL
             * !#zh 垂直方向布局方式
             * @enum Layout.VerticalDirection
             */ enum cocos_3d_ui_components_layout_component_VerticalDirection {
            BOTTOM_TO_TOP,
            TOP_TO_BOTTOM
        }
        /**
             * !#en Enum for horizontal layout direction.
             *  Used in Grid Layout together with AxisDirection is HORIZONTAL
             * !#zh 水平方向布局方式
             * @enum Layout.HorizontalDirection
             */ enum cocos_3d_ui_components_layout_component_HorizontalDirection {
            LEFT_TO_RIGHT,
            RIGHT_TO_LEFT
        }
        /**
             * !#en the type for mask.
             * !#zh 遮罩组件类型
             */ export enum cocos_3d_ui_components_mask_component_MaskType {
            RECT,
            ELLIPSE
        }
        /**
             * !#en Enum for ProgressBar mode
             * !#zh 进度条模式
             * @enum ProgressBar.Mode
             */ enum cocos_3d_ui_components_progress_bar_component_Mode {
            HORIZONTAL,
            VERTICAL,
            FILLED
        }
        /**
             * Enum for Scrollbar direction
             * @enum Scrollbar.Direction
             */ enum cocos_3d_ui_components_scroll_bar_component_Direction {
            HORIZONTAL,
            VERTICAL
        }
        /**
             * !#en Enum for ScrollView event type.
             * !#zh 滚动视图事件类型
             * @enum ScrollView.EventType
             */ enum cocos_3d_ui_components_scroll_view_component_EventType {
            SCROLL_TO_TOP,
            SCROLL_TO_BOTTOM,
            SCROLL_TO_LEFT,
            SCROLL_TO_RIGHT,
            SCROLLING,
            BOUNCE_TOP,
            BOUNCE_BOTTOM,
            BOUNCE_LEFT,
            BOUNCE_RIGHT,
            SCROLL_ENDED,
            TOUCH_UP,
            AUTOSCROLL_ENDED_WITH_THRESHOLD,
            SCROLL_BEGAN
        }
        /**
             * !#en The Slider Direction
             * !#zh 滑动器方向
             * @enum Slider.Direction
             */ enum cocos_3d_ui_components_slider_component_Direction {
            Horizontal,
            Vertical
        }
        /**
             * !#en Enum for sprite type.
             * !#zh Sprite 类型
             * @enum Sprite.Type
             */ enum cocos_3d_ui_components_sprite_component_SpriteType {
            SIMPLE,
            SLICED,
            FILLED
        }
        /**
             * !#en Enum for fill type.
             * !#zh 填充类型
             * @enum Sprite.FillType
             */ enum cocos_3d_ui_components_sprite_component_FillType {
            HORIZONTAL,
            VERTICAL,
            RADIAL
        }
        /**
             * !#en Sprite Size can track trimmed size, raw size or none.
             * !#zh 精灵尺寸调整模式
             * @enum Sprite.SizeMode
             */ enum cocos_3d_ui_components_sprite_component_SizeMode {
            CUSTOM,
            TRIMMED,
            RAW
        }
        export interface cocos_renderer_ui_renderData_IRenderData {
            x: number;
            y: number;
            z: number;
            u: number;
            v: number;
            color: Color;
        }
        export class cocos_renderer_ui_renderData_BaseRenderData {
            material: Material | null;
            vertexCount: number;
            indiceCount: number;
        }
        export class cocos_renderer_ui_renderData_RenderData extends cocos_renderer_ui_renderData_BaseRenderData {
            dataLength: number;
            readonly datas: cocos_renderer_ui_renderData_IRenderData[];
            static add(): {
                pooID: number;
                data: cocos_renderer_ui_renderData_RenderData;
            };
            static remove(idx: number): void;
            uvDirty: boolean;
            vertDirty: boolean;
            private _datas;
            private _indices;
            private _pivotX;
            private _pivotY;
            private _width;
            private _height;
            updateSizeNPivot(width: number, height: number, pivotX: number, pivotY: number): void;
            clear(): void;
        }
        export enum cocos_3d_ui_components_ui_render_component_InstanceMaterialType {
            ADDCOLOR,
            ADDCOLORANDTEXTURE
        }
        export enum cocos_3d_ui_components_webview_webview_impl_WebViewEventType {
            LOADING,
            LOADED,
            ERROR,
            JS_EVALUATED
        }
        /**
             * !#en Enum for Widget's alignment mode, indicating when the widget should refresh.
             * !#zh Widget 的对齐模式，表示 Widget 应该何时刷新。
             * @enum Widget.AlignMode
             */ /**
             * !#en
             * Only align once when the Widget is enabled for the first time.
             * This will allow the script or animation to continue controlling the current node.
             * It will only be aligned once before the end of frame when onEnable is called,
             * then immediately disables the Widget.
             * !#zh
             * 仅在 Widget 第一次激活时对齐一次，便于脚本或动画继续控制当前节点。
             * 开启后会在 onEnable 时所在的那一帧结束前对齐一次，然后立刻禁用该 Widget。
             * @property {Number} ONCE
             */ /**
             * !#en Align first from the beginning as ONCE, and then realign it every time the window is resized.
             * !#zh 一开始会像 ONCE 一样对齐一次，之后每当窗口大小改变时还会重新对齐。
             * @property {Number} ON_WINDOW_RESIZE
             */ /**
             * !#en Keep aligning all the way.
             * !#zh 始终保持对齐。
             * @property {Number} ALWAYS
             */ export enum cocos_3d_ui_components_widget_component_AlignMode {
            ONCE,
            ON_WINDOW_RESIZE,
            ALWAYS
        }
        /**
             * !#en Enum for LineJoin.
             * !#zh 线段拐角属性
             * @enum Graphics.LineJoin
             */ export enum cocos_3d_ui_assembler_graphics_types_LineJoin {
            BEVEL,
            ROUND,
            MITER
        }
        /**
             * !#en Enum for LineCap.
             * !#zh 线段末端属性
             * @enum Graphics.LineCap
             */ export enum cocos_3d_ui_assembler_graphics_types_LineCap {
            BUTT,
            ROUND,
            SQUARE
        }
        export class cocos_3d_ui_assembler_graphics_webgl_impl_Point extends Vec2 {
            dx: number;
            dy: number;
            dmx: number;
            dmy: number;
            flags: number;
            len: number;
            reset(): void;
        }
        export class cocos_3d_ui_assembler_graphics_webgl_impl_Path {
            closed: boolean;
            nbevel: number;
            complex: boolean;
            points: cocos_3d_ui_assembler_graphics_webgl_impl_Point[];
            reset(): void;
        }
        export class cocos_renderer_ui_renderData_IARenderData extends cocos_renderer_ui_renderData_BaseRenderData {
            vData: Float32Array;
            iData: Uint16Array;
            vertexStart: number;
            indiceStart: number;
            byteStart: number;
            byteCount: number;
            private _formatByte;
            request(vertexCount: number, indiceCount: number): boolean;
            reset(): void;
        }
        export enum cocos_3d_ui_assembler_graphics_types_PointFlags {
            PT_CORNER,
            PT_LEFT,
            PT_BEVEL,
            PT_INNERBEVEL
        }
        export class cocos_3d_ui_assembler_graphics_webgl_impl_Impl {
            dataOffset: number;
            updatePathOffset: boolean;
            pathLength: number;
            pathOffset: number;
            paths: cocos_3d_ui_assembler_graphics_webgl_impl_Path[];
            tessTol: number;
            distTol: number;
            fillColor: Color;
            lineCap: cocos_3d_ui_assembler_graphics_types_LineCap;
            strokeColor: Color;
            lineJoin: cocos_3d_ui_assembler_graphics_types_LineJoin;
            lineWidth: number;
            pointsOffset: number;
            private _commandx;
            private _commandy;
            private _points;
            private _renderDatasPool;
            private _renderDatas;
            private _curPath;
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
            requestRenderData(): cocos_renderer_ui_renderData_IARenderData;
            getRenderDatas(): cocos_renderer_ui_renderData_IARenderData[];
            addPoint(x: number, y: number, flags: cocos_3d_ui_assembler_graphics_types_PointFlags): void;
            private _addPath;
        }
        export enum cocos_3d_ui_components_widget_component_AlignFlags {
            TOP,
            MID,
            BOT,
            LEFT,
            CENTER,
            RIGHT,
            HORIZONTAL,
            VERTICAL
        }
        function cocos_3d_ui_components_widget_manager_updateAlignment(node: Node): void;
        export class cocos_3d_ui_assembler_label_letter_font_LetterRenderTexture extends Texture2D {
            /**
                     * !#en
                     * Init the render texture with size.
                     * !#zh
                     * 初始化 render texture
                     * @param [width]
                     * @param [height]
                     * @param [string]
                     * @method initWithSize
                     */ initWithSize(width: number, height: number, format?: cocos_gfx_define_GFXFormat): void;
            /**
                     * !#en Draw a texture to the specified position
                     * !#zh 将指定的图片渲染到指定的位置上
                     * @param {Texture2D} texture
                     * @param {Number} x
                     * @param {Number} y
                     */ drawTextureAt(texture: SpriteFrame, x: number, y: number): void;
        }
        export interface cocos_3d_ui_assembler_label_font_utils_ISharedLabelData {
            canvas: HTMLCanvasElement;
            context: CanvasRenderingContext2D | null;
        }
        interface cocos_3d_ui_assembler_label_bmfontUtils_ILetterDefinition {
        }
        class cocos_3d_ui_assembler_label_bmfontUtils_FontLetterDefinition {
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
        export class cocos_3d_ui_assembler_label_bmfontUtils_FontAtlas {
            readonly letterDefinitions: cocos_3d_ui_assembler_label_bmfontUtils_ILetterDefinition;
            private _letterDefinitions;
            addLetterDefinitions(letter: string, letterDefinition: cocos_3d_ui_assembler_label_bmfontUtils_FontLetterDefinition): void;
            cloneLetterDefinition(): cocos_3d_ui_assembler_label_bmfontUtils_ILetterDefinition;
            assignLetterDefinitions(letterDefinition: cocos_3d_ui_assembler_label_bmfontUtils_ILetterDefinition): void;
            scaleFontLetterDefinition(scaleFactor: number): void;
            getLetterDefinitionForChar(char: string): any;
        }
        export class cocos_3d_ui_assembler_label_font_utils_CanvasPool {
            pool: cocos_3d_ui_assembler_label_font_utils_ISharedLabelData[];
            get(): cocos_3d_ui_assembler_label_font_utils_ISharedLabelData;
            put(canvas: cocos_3d_ui_assembler_label_font_utils_ISharedLabelData): void;
        }
    }
}