"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NiagaraComponentHandle = void 0);
class NiagaraComponentHandle {
	constructor() {
		(this.Upe = void 0),
			(this.Ape = void 0),
			(this.Ppe = void 0),
			(this.xpe = void 0),
			(this.wpe = void 0),
			(this.bForceSolo = void 0);
	}
	IsValid() {
		return !0;
	}
	SetNiagaraVariableFloat(e, t) {
		this.Upe || (this.Upe = new Map()), this.Upe.set(e, t);
	}
	SetNiagaraVariableVec3(e, t) {
		this.Ape || (this.Ape = new Map()), this.Ape.set(e, t);
	}
	SetIntParameter(e, t) {
		this.Ppe || (this.Ppe = new Map()), this.Ppe.set(e, t);
	}
	SetFloatParameter(e, t) {
		this.xpe || (this.xpe = new Map()), this.xpe.set(e, t);
	}
	SetColorParameter(e, t) {
		this.wpe || (this.wpe = new Map()), this.wpe.set(e, t);
	}
	InitNiagaraComponent(e) {
		if (e) {
			if (this.Upe)
				for (var [t, a] of this.Upe) e.SetNiagaraVariableFloat(t, a);
			if (this.Ape) for (var [i, o] of this.Ape) e.SetNiagaraVariableVec3(i, o);
			if (this.Ppe) for (var [r, s] of this.Ppe) e.SetIntParameter(r, s);
			if (this.xpe) for (var [p, h] of this.xpe) e.SetFloatParameter(p, h);
			if (this.wpe) for (var [n, l] of this.wpe) e.SetColorParameter(n, l);
			void 0 !== this.bForceSolo && (e.bForceSolo = this.bForceSolo);
		}
	}
}
exports.NiagaraComponentHandle = NiagaraComponentHandle;
