"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, t, a, r) {
		var n,
			i = arguments.length,
			o =
				i < 3
					? t
					: null === r
						? (r = Object.getOwnPropertyDescriptor(t, a))
						: r;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			o = Reflect.decorate(e, t, a, r);
		else
			for (var g = e.length - 1; 0 <= g; g--)
				(n = e[g]) && (o = (i < 3 ? n(o) : 3 < i ? n(t, a, o) : n(t, a)) || o);
		return 3 < i && o && Object.defineProperty(t, a, o), o;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseTagComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
	RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
	GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	CharacterTagContainer_1 = require("../../Character/Common/Component/Abilities/CharacterTagContainer");
class TagSwitchedTask {
	constructor() {
		(this.Xir = 0), (this.B7 = void 0), (this.Xte = void 0);
	}
	StartTask(e, t, a, r) {
		(this.Xir = e),
			(this.B7 = (e, a) => {
				t(e, a);
			}),
			(this.Xte = a),
			this.Xte?.AddTagAddOrRemoveListener(this.Xir, this.B7);
	}
	EndTask() {
		this.Xte?.RemoveTagAddOrRemoveListener(this.Xir, this.B7);
	}
}
class TagChangedTask {
	constructor() {
		(this.Xir = 0), (this.B7 = void 0), (this.Xte = void 0);
	}
	StartTask(e, t, a) {
		(this.Xir = e),
			(this.B7 = (e) => {
				t(e);
			}),
			(this.Xte = a),
			this.Xte?.AddTagChangedListener(this.Xir, this.B7);
	}
	EndTask() {
		this.Xte?.RemoveTagChangedListener(this.Xir, this.B7);
	}
}
let BaseTagComponent = class extends EntityComponent_1.EntityComponent {
	constructor() {
		super(...arguments),
			(this.TagSwitchedCallbacks = new Map()),
			(this.TagChangedCallbacks = new Map()),
			(this.TagContainer = new CharacterTagContainer_1.TagContainer());
	}
	OnInit() {
		return (
			this.TagContainer.AddAnyTagListener((e, t, a) => {
				this.OnAnyTagChanged(e, t, a);
			}),
			!0
		);
	}
	OnStart() {
		var e = this.Entity.GetComponent(3)?.Actor?.AbilitySystemComponent;
		return e?.IsValid() && this.TagContainer.BindTsTagContainer(e), !0;
	}
	OnEnd() {
		return this.TagContainer.Clear(), !0;
	}
	Emit(e, t, ...a) {
		if (void 0 !== e && void 0 !== t) {
			var r = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
			for (const n of [...t])
				try {
					n(...a);
				} catch (e) {
					e instanceof Error
						? Log_1.Log.CheckError() &&
							Log_1.Log.ErrorWithStack(
								"Event",
								20,
								"tag事件回调执行异常",
								e,
								["tag", r],
								["error", e.message],
							)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Event",
								20,
								"tag事件回调执行异常",
								["tag", r],
								["error", e],
							);
				}
		}
	}
	AddTag(e) {
		void 0 !== e && this.TagContainer.AddExactTag(1, e);
	}
	AddTagById(e) {
		this.AddTag(e);
	}
	RemoveTag(e) {
		return (
			void 0 !== e &&
			(this.TagContainer.RemoveTag(1, e), this.TagContainer.RemoveTag(4, e), !0)
		);
	}
	RemoveTagById(e) {
		return this.RemoveTag(e);
	}
	HasTag(e) {
		return this.TagContainer.ContainsTag(e);
	}
	ContainsTagById(e) {
		return this.HasTag(e);
	}
	HasAnyTag(e) {
		for (const t of e) if (this.HasTag(t)) return !0;
		return !1;
	}
	ContainsAnyTag(e) {
		return this.HasAnyTag(e);
	}
	HasAllTag(e) {
		for (const t of e) if (!this.HasTag(t)) return !1;
		return !0;
	}
	ContainsAllTag(e) {
		return this.HasAllTag(e);
	}
	GetTagCountById(e) {
		return void 0 === e ? 0 : this.TagContainer.GetTagCount(e);
	}
	ListenForTagAddOrRemove(e, t, a) {
		var r;
		if (void 0 !== e && t)
			return (r = new TagSwitchedTask()).StartTask(e, t, this, a), r;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Character", 20, "回调函数添加失败", [
				"tag",
				GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
			]);
	}
	AddTagAddOrRemoveListener(e, t) {
		if (void 0 !== e && t) {
			let a = this.TagSwitchedCallbacks.get(e);
			a || this.TagSwitchedCallbacks.set(e, (a = new Set())),
				a.has(t)
					? Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Character",
							20,
							"重复添加回调函数",
							["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)],
							["callbackName", t.name],
						)
					: a.add(t);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Character",
					20,
					"回调函数添加失败",
					["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)],
					["callbackName", t?.name],
				);
	}
	RemoveTagAddOrRemoveListener(e, t) {
		(e = this.TagSwitchedCallbacks.get(e)) && e.delete(t);
	}
	ListenForTagAnyCountChanged(e, t) {
		var a;
		if (void 0 !== e && t)
			return (a = new TagChangedTask()).StartTask(e, t, this), a;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Character", 20, "回调函数添加失败", [
				"tag",
				GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
			]);
	}
	AddTagChangedListener(e, t) {
		if (void 0 !== e && t) {
			let a = this.TagChangedCallbacks.get(e);
			a || this.TagChangedCallbacks.set(e, (a = new Set())),
				a.has(t)
					? Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Character",
							20,
							"重复添加回调函数",
							["tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)],
							["callbackName", t.name],
						)
					: a.add(t);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Character", 20, "回调函数添加失败", [
					"tag",
					GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e),
				]);
	}
	RemoveTagChangedListener(e, t) {
		(e = this.TagChangedCallbacks.get(e)) && e.delete(t);
	}
	GetTagDebugStrings() {
		return this.TagContainer?.GetDebugString() ?? "";
	}
	OnAnyTagChanged(e, t, a) {
		var r;
		void 0 !== e &&
			a !== t &&
			((r = 0 < t),
			(0 === a) != (0 === t) &&
				this.Emit(e, this.TagSwitchedCallbacks.get(e), e, r),
			this.Emit(e, this.TagChangedCallbacks.get(e), t),
			EventSystem_1.EventSystem.EmitWithTarget(
				this.Entity,
				EventDefine_1.EEventName.OnGameplayTagChanged,
				e,
				a,
				t,
			),
			(r = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e)) &&
				EventSystem_1.EventSystem.EmitWithTarget(
					r,
					EventDefine_1.EEventName.OnGlobalGameplayTagChanged,
					this.Entity.Id,
					e,
					a,
					t,
				),
			this.Entity.GetComponent(187)?.OnTagChanged(e));
	}
};
(BaseTagComponent = __decorate(
	[(0, RegisterComponent_1.RegisterComponent)(185)],
	BaseTagComponent,
)),
	(exports.BaseTagComponent = BaseTagComponent);
